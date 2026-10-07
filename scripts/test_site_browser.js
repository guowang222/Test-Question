/* test_site_browser.js —— 纯静态站端到端冒烟（Node，无浏览器）
 *
 * 验证「从 index.html 出发、按其 script 顺序加载、app.js 能否真正跑起来」：
 *   - 脚本加载顺序（数据 → 数据层 → 拦截器 → app）
 *   - app.js 用到的 14 个端点全部可路由，返回字段与后端契约一致
 *   - site/index.html 里的每个 <script src> 文件真实存在且非空
 *   - 静态站不应包含 config.js（Django 版专用）
 *
 * 与 test_static_logic.js 的分工：那个测数据层函数，这个测**装配**与契约。
 *
 * 运行：node scripts/test_site_browser.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = path.join(ROOT, "site");

let pass = 0, fail = 0;
const failures = [];
const ok = (c, n, e) => c ? pass++ : (fail++, failures.push(n + (e ? "  →  " + e : "")));
const eq = (a, b, n) => ok(a === b, n, `期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`);
const section = t => console.log("\n── " + t);

/* ---------- 1. index.html 装配检查 ---------- */
section("index.html 装配");
const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
console.log("   脚本顺序：" + scripts.join(" → "));

ok(scripts.length >= 6, "脚本数量足够");
const idx = n => scripts.indexOf(n);
ok(idx("js/questions.data.js") >= 0, "引入题库数据");
ok(idx("js/questions.data.js") < idx("js/local-store.js"), "题库数据先于数据层加载");
ok(idx("js/local-store.js") < idx("js/static-api.js"), "数据层先于拦截器加载");
ok(idx("js/static-api.js") < idx("js/app.js"), "拦截器先于 app.js（必须，否则 API 不会被接管）");
ok(idx("js/vue.global.prod.js") < idx("js/app.js"), "Vue 先于 app.js");
ok(idx("js/vue.global.prod.js") === 0, "Vue 是第一个脚本");

for (const s of scripts) {
  const p = path.join(SITE, s);
  ok(fs.existsSync(p) && fs.statSync(p).size > 0, `产物存在且非空：${s}`);
}
const cssHref = (html.match(/<link rel="stylesheet" href="([^"]+)"/) || [])[1];
ok(!!cssHref && fs.existsSync(path.join(SITE, cssHref)), `样式表存在：${cssHref}`);
ok(!fs.existsSync(path.join(SITE, "js/config.js")), "静态站不含 config.js（Django 版专用）");
ok(!/js\/config\.js/.test(html), "index.html 不引用 config.js");
ok(/<div id="app">/.test(html), "存在 Vue 挂载点");

/* ---------- 2. 契约字段检查（静态版必须与后端同构） ---------- */
section("接口契约字段");
function makeStorage() {
  const m = new Map();
  return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)),
           removeItem: k => m.delete(k), clear: () => m.clear() };
}
// 题库数据：直接在独立沙箱里 eval 该 JS 文件取 window.QUIZ_DATA。
// 不要用正则剥壳解析——文件是 CRLF + 分号结尾，正则很容易因转义吃掉尾部字符。
const dataSandbox = { window: {} };
dataSandbox.window.QUIZ_DATA = undefined;
vm.createContext(dataSandbox);
vm.runInContext(fs.readFileSync(path.join(SITE, "js/questions.data.js"), "utf8"),
                dataSandbox, { filename: "questions.data.js" });
const QUESTIONS = dataSandbox.window.QUIZ_DATA;
ok(!!QUESTIONS && Array.isArray(QUESTIONS.questions) && QUESTIONS.questions.length > 0,
   "questions.data.js 定义了 window.QUIZ_DATA.questions");
ok(QUESTIONS.questions.length === QUESTIONS.meta.count,
   `meta.count 与实际题数一致（${QUESTIONS.meta.count}）`);

const sandbox = {
  window: null, console, JSON, Math, Date, Object, Array, String, Number,
  isNaN, parseInt, parseFloat, Error, Promise, RegExp, Boolean, Set, Map,
  Response, URL, URLSearchParams, localStorage: makeStorage(),
  setTimeout, clearTimeout,
  location: { href: "https://guowang222.github.io/Test-Question/", protocol: "https:" },
  nativeFetchCalls: [],
};
sandbox.window = sandbox; sandbox.globalThis = sandbox;
sandbox.fetch = function (u) { sandbox.nativeFetchCalls.push(String(u)); return Promise.resolve(new Response("ok")); };
vm.createContext(sandbox);

const nativeCalls = sandbox.nativeFetchCalls;
// 按 site/index.html 的真实顺序加载（顺序本身就是被测对象，见上方断言）
for (const f of ["js/questions.data.js", "js/md-import.js", "js/local-store.js", "js/static-api.js"]) {
  vm.runInContext(fs.readFileSync(path.join(SITE, f), "utf8"), sandbox, { filename: f });
}
eq(nativeCalls.length, 0, "加载拦截器本身不发起任何网络请求");
eq(sandbox.QUIZ_DATA.questions.length, QUESTIONS.questions.length,
   "同一沙箱内题库数据可用（模拟浏览器真实加载顺序）");

const get = async (p) => {
  const r = await sandbox.fetch(p);
  return { status: r.status, data: await r.json() };
};
const post = async (p, body) => {
  const r = await sandbox.fetch(p, { method: "POST", headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body) });
  return { status: r.status, data: await r.json() };
};

(async () => {
  /* /api/stats/ —— app.js 用到 total / by_source / source_mastery / by_category /
                    category_mastery / wrongbook / overall / starred / by_type */
  let r = await get("/api/stats/");
  const need = ["total", "starred", "by_type", "by_category", "by_source", "wrongbook",
                "overall", "category_mastery", "source_mastery"];
  need.forEach(k => ok(k in r.data, `stats 含字段 ${k}`));
  eq(r.data.total, QUESTIONS.questions.length, "stats.total 等于题库总数");
  // overall 只有 5 个字段（与后端 _merge 契约一致）
  ["total", "tried", "attempts", "correct", "rate"]
    .forEach(k => ok(k in r.data.overall, `overall 含字段 ${k}`));
  eq(Object.keys(r.data.by_source).length, Object.keys(QUESTIONS.meta.by_source).length,
     "by_source 覆盖全部来源");

  /* /api/questions/ —— app.js 用 count / total / questions[]；
     每题用 id/type/type_label/category/source/question/options/starred，填空题另有 blanks */
  r = await get("/api/questions/?limit=5");
  eq(r.data.count, 5, "questions.count");
  eq(typeof r.data.total, "number", "questions.total 是数字");
  ok(Array.isArray(r.data.questions), "questions.questions 是数组");
  const q0 = r.data.questions[0];
  ["id", "type", "type_label", "category", "source", "question", "options", "starred"]
    .forEach(k => ok(k in q0, `题目含字段 ${k}`));
  ok(!("answer" in q0), "题目不泄露答案");
  ok(!("explanation" in q0), "列表不含解析");
  const blank = (await get("/api/questions/?type=blank&limit=1")).data.questions[0];
  ok("blanks" in blank && typeof blank.blanks === "number" && blank.blanks > 0, "填空题带 blanks 空数");

  /* /api/submit/ —— app.js 用 results[].{correct,correct_answer,blank_detail,
     reference,wrongbook,wrongbook_removed,explanation} 与 summary.{total_graded,
     total_correct,score_pct,subjective_count,unanswered} */
  const cid = q0.id, correctLetter = (QUESTIONS.questions.find(q => q.id === cid).answer[0]);
  r = await post("/api/submit/", { answers: { [cid]: correctLetter } });
  ok(Array.isArray(r.data.results), "submit.results 是数组");
  ok("summary" in r.data, "submit 含 summary");
  ["total_graded", "total_correct", "score_pct", "subjective_count", "unanswered"]
    .forEach(k => ok(k in r.data.summary, `summary 含字段 ${k}`));
  const res0 = r.data.results[0];
  ["id", "type", "correct", "explanation", "wrongbook", "wrongbook_removed"]
    .forEach(k => ok(k in res0, `结果含字段 ${k}`));
  eq(res0.correct, true, "用标准答案提交判对");
  eq(res0.correct_answer, correctLetter.toUpperCase(), "回显正确答案");

  /* 简答题结果必须带 reference 数组（模板用 reference[0]） */
  const sid = QUESTIONS.questions.find(q => q.type === "short").id;
  r = await post("/api/submit/", { answers: { [sid]: "我的作答" } });
  const sres = r.data.results[0];
  eq(sres.correct, null, "主观题 correct 为 null");
  ok(Array.isArray(sres.reference) && sres.reference.length === 1,
     "主观题 reference 为单元素数组（模板只渲染 reference[0]）");
  ok(typeof sres.reference[0] === "string" && sres.reference[0].length > 0, "reference[0] 是非空字符串");

  /* /api/note/ GET */
  r = await get("/api/note/?id=" + cid);
  ok("content" in r.data, "note GET 含 content");
  r = await post("/api/note/", { id: cid, content: "静态版笔记" });
  eq(r.data.content, "静态版笔记", "note POST 回显");

  /* /api/star/ */
  r = await post("/api/star/", { id: cid });
  ok("starred" in r.data && "starred_total" in r.data, "star 含 starred/starred_total");

  /* /api/wrongbook/ —— app.js 用 count / questions[] */
  await post("/api/submit/", { answers: { [cid]: "Z" } });   // 故意答错进错题本
  r = await get("/api/wrongbook/");
  ok("count" in r.data && Array.isArray(r.data.questions), "wrongbook 含 count/questions");
  ok(r.data.questions[0] && "wrong_streak" in r.data.questions[0], "错题含 wrong_streak");

  /* /api/feedback/ */
  r = await post("/api/feedback/", { id: sid, correct: true });
  ok("in_wrongbook" in r.data && "wrongbook" in r.data, "feedback 含 in_wrongbook/wrongbook");

  /* /api/exam/start/ —— app.js 用 session_id/duration_s/questions */
  r = await post("/api/exam/start/", { source: "all", choice: 3, blank: 2, short: 1, practical: 0, minutes: 0 });
  ["session_id", "duration_s", "auto_timed", "blueprint", "count", "questions"]
    .forEach(k => ok(k in r.data, `exam/start 含字段 ${k}`));
  eq(r.data.count, r.data.questions.length, "exam/start count 与试卷长度一致");
  eq(r.data.duration_s, 6 * 90, "自动限时 = 题数 × 90 秒");

  /* /api/exam/submit/ —— 用 results/summary/session */
  const ans = {};
  r.data.questions.forEach(q => {
    ans[q.id] = q.type === "choice" ? (QUESTIONS.questions.find(x => x.id === q.id).answer[0])
             : q.type === "blank" ? (QUESTIONS.questions.find(x => x.id === q.id).answer[0])
             : "作答";
  });
  r = await post("/api/exam/submit/", { session_id: r.data.session_id, answers: ans, duration_s: 120 });
  ok("summary" in r.data && Array.isArray(r.data.results), "exam/submit 含 summary/results");
  ok(r.data.session && r.data.session.finished_at, "exam/submit 回填已交卷会话");

  /* /api/exams/ —— app.js 用 count/best/avg/recent[] */
  r = await get("/api/exams/");
  ["count", "best", "avg", "recent"].forEach(k => ok(k in r.data, `exams 含字段 ${k}`));
  ok(Array.isArray(r.data.recent), "exams.recent 是数组");
  if (r.data.recent[0]) {
    ["id", "score", "duration_s", "started_at", "finished_at"]
      .forEach(k => ok(k in r.data.recent[0], `考试记录含字段 ${k}`));
  }

  /* /api/sources/ */
  r = await get("/api/sources/");
  ok(Array.isArray(r.data.sources) && r.data.sources[0] && "name" in r.data.sources[0],
     "sources 含 name 的对象数组");

  /* 未知接口返回 404 JSON 而非 HTML（app.json() 依赖这一点） */
  r = await get("/api/unknown/");
  eq(r.status, 404, "未知 /api/ 返回 404");
  ok(typeof r.data.error === "string", "404 返回 error 字段");

  /* 非法 JSON 体返回 400 */
  const bad = await sandbox.fetch("/api/submit/", { method: "POST", body: "{oops" });
  eq(bad.status, 400, "非法 JSON 体返回 400");

  eq(nativeCalls.length, 0, "整个静态站运行期间零真实网络请求（完全离线可用）");

  console.log("\n" + "=".repeat(58));
  console.log(`静态站装配与契约冒烟：${pass} 通过 / ${fail} 失败`);
  if (fail) {
    console.log("\n失败明细：");
    failures.forEach(f => console.log("  ✗ " + f));
    process.exit(1);
  }
  console.log("全部通过 ✓");
})().catch(e => { console.error("\n未捕获异常：", e); process.exit(1); });