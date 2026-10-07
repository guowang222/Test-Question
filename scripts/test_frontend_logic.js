/* 前端逻辑单元测试（无需浏览器）
 *
 * 做法：把 frontend/js/app.js 放进 Node 的 vm 里执行，注入一个"迷你 Vue"
 * （ref/reactive/computed/onMounted 的最小实现）与可控的 fetch，
 * 然后直接调用 setup() 暴露出来的函数做行为断言。
 *
 * 覆盖本次重构的关键点：
 *   - apiJson 把「HTTP 错误 / 非 JSON 响应」转成可读错误
 *   - loadStats 只发 1 个请求，并从 stats 推导 sources（原先发 2 个重复请求）
 *   - resetSession 统一重置：题目/可见数/判分缓存/作答容器
 *   - 渐进渲染 visibleQuestions / hasMore / showMoreQuestions 的切片与步进
 *   - pick 在已揭示答案后拒绝改选
 *   - doExamSubmit 防重入（到时自动交卷与手动交卷并发只提交一次）
 *
 * 用法：node scripts/test_frontend_logic.js   退出码 0=全过，1=有失败
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'frontend', 'js', 'app.js');

/* ---------------- 迷你 Vue ---------------- */
const ref = (v) => ({ value: v });
const reactive = (o) => o;
const computed = (fn) => ({ get value() { return fn(); } });

let setupResult = null;
let template = '';
const mountedFns = [];

const Vue = {
  createApp(opts) {
    return { mount() { setupResult = opts.setup(); template = opts.template || ''; return {}; } };
  },
  ref, reactive, computed,
  onMounted(fn) { mountedFns.push(fn); },
};

/* ---------------- 可控 fetch ---------------- */
const calls = [];            // { url, opts }
let responder = null;        // (url, opts) => ({status, text}) | Promise

function makeResponse(status, body) {
  const text = typeof body === 'string' ? body : JSON.stringify(body);
  return { ok: status >= 200 && status < 300, status, text: async () => text };
}

const fetchStub = (url, opts = {}) => {
  calls.push({ url: String(url), opts });
  const r = responder ? responder(String(url), opts) : makeResponse(200, {});
  return Promise.resolve(r).then((x) =>
    x && typeof x.text === 'function' ? x : makeResponse(x.status ?? 200, x.body ?? {}));
};

/* ---------------- 沙箱 ---------------- */
const win = {
  API_BASE: 'http://test.local',
  scrollTo() {},
  addEventListener() {},
};
const sandbox = {
  Vue, fetch: fetchStub, window: win, document: {},
  confirm: () => true,
  console,
  setInterval: () => 0, clearInterval: () => {},
  setTimeout, clearTimeout,
  URLSearchParams, FormData: class { append() {} },
  encodeURIComponent, decodeURIComponent, JSON, Math, Object, Array, String, Number, Date, Boolean,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

/* ---------------- 载入 app.js ---------------- */
const code = fs.readFileSync(APP, 'utf8');
try {
  vm.runInContext(code, sandbox, { filename: 'app.js' });
} catch (e) {
  console.error('!! app.js 执行失败：', e.message);
  process.exit(1);
}
if (!setupResult) {
  console.error('!! 未能取得 setup() 返回值');
  process.exit(1);
}
const S = setupResult;

/* ---------------- 断言工具 ---------------- */
let pass = 0, fail = 0;
const fails = [];
function check(name, ok, detail) {
  if (ok) { pass++; console.log('  ✓ ' + name); }
  else { fail++; fails.push(name + (detail ? ` — ${detail}` : '')); console.log('  ✗ ' + name + (detail ? `  → ${detail}` : '')); }
}
function section(t) { console.log('\n── ' + t + ' ' + '─'.repeat(Math.max(0, 66 - t.length))); }

/* ---------------- 测试数据 ---------------- */
function mkQ(id, type, blanks) {
  const q = { id, type, type_label: type, category: 'C', source: 'S', question: 'Q' + id, options: [], starred: false };
  if (type === 'blank') q.blanks = blanks || 2;
  return q;
}

(async () => {
  /* 1. apiJson 错误归一化 */
  section('1. apiJson 错误归一化');
  responder = () => makeResponse(500, '<html>Server Error</html>');
  let threw = null;
  try { await S.loadStats(); } catch (e) { threw = e; }
  // loadStats 内部自己 catch，不往外抛；改为直接构造一次 apiJson 场景
  responder = () => makeResponse(200, '<html>not json</html>');
  calls.length = 0;
  let err1 = null;
  try { await S.bankSearch.call(null); } catch (e) { err1 = e; }
  // bankSearch 需要关键词；直接放关键词再试
  S.bankKw.value = 'pod';
  err1 = null;
  await S.bankSearch();
  check('非 JSON 响应转成可读错误（提示"非 JSON"）',
        String(S.err.value).includes('非 JSON'), `err=${S.err.value}`);

  responder = () => makeResponse(400, { error: '参数不合法' });
  await S.bankSearch();
  check('HTTP 4xx 时透出后端 error 文案',
        String(S.err.value).includes('参数不合法'), `err=${S.err.value}`);

  /* 2. loadStats 单请求 + 推导 sources */
  section('2. loadStats：合并重复请求并推导 sources');
  calls.length = 0;
  S.err.value = '';
  responder = () => makeResponse(200, {
    total: 10, starred: 1, wrongbook: 0, by_type: { 选择题: 10 },
    by_category: { C: 10 }, by_source: { S1: 6, S2: 4 },
    overall: { total: 10, tried: 3, rate: 66.7 },
    category_mastery: { C: { total: 10, tried: 3, rate: 66.7 } },
    source_mastery: { S1: { total: 6, tried: 3, rate: 66.7 }, S2: { total: 4, tried: 0, rate: null } },
  });
  await S.loadStats();
  check('只发 1 个请求（不再请求 /api/sources/）', calls.length === 1, `实际 ${calls.length} 个`);
  check('请求的是 /api/stats/', calls[0] && calls[0].url.endsWith('/api/stats/'), calls[0] && calls[0].url);
  check('sources 数量 == by_source 条目数', S.sources.value.length === 2, `实际 ${S.sources.value.length}`);
  check('sources 含 count/total/rate', S.sources.value.every(s =>
        typeof s.count === 'number' && typeof s.total === 'number' && 'rate' in s));
  check('未作答来源 rate 为 null', S.sources.value.find(s => s.name === 'S2').rate === null);

  /* 3. resetSession 统一重置 */
  section('3. resetSession 统一重置会话');
  S.questions.value = [mkQ(1, 'choice'), mkQ(2, 'blank', 3), mkQ(3, 'short')];
  S.results[1] = { correct: true };
  S.selfJudge[3] = true;
  S.rDone[1] = true;
  S.answers[1] = 'A';
  const list = [mkQ(11, 'choice'), mkQ(12, 'blank', 4), mkQ(13, 'short')];
  // resetSession 是内部函数（未暴露）→ 通过 startWithQuestions 间接验证
  S.startWithQuestions(list);
  check('questions 被替换为新列表', S.questions.value.length === 3 && S.questions.value[0].id === 11);
  check('可见数初始化为 min(50, 题数)', S.visibleQuestions.value.length === 3);
  check('旧判分缓存 results 被清空', Object.keys(S.results).length === 0);
  check('旧自评 selfJudge 被清空', Object.keys(S.selfJudge).length === 0);
  check('旧逐题判分 rDone 被清空', Object.keys(S.rDone).length === 0);
  check('填空题作答容器按 blanks 数初始化',
        Array.isArray(S.answers[12]) && S.answers[12].length === 4,
        `answers[12]=${JSON.stringify(S.answers[12])}`);
  check('选择题作答容器初始为空串', S.answers[11] === '');

  /* 4. 渐进渲染 */
  section('4. 渐进渲染：可见切片 / hasMore / 加载更多');
  const big = Array.from({ length: 130 }, (_, i) => mkQ(1000 + i, 'choice'));
  S.startWithQuestions(big);
  check('首屏只挂载 50 张', S.visibleQuestions.value.length === 50, `实际 ${S.visibleQuestions.value.length}`);
  check('hasMore 为真', S.hasMore.value === true);
  check('切片首元素是第 1 题', S.visibleQuestions.value[0].id === 1000);
  S.showMoreQuestions();
  check('加载更多后 100 张', S.visibleQuestions.value.length === 100);
  S.showMoreQuestions();
  check('触顶后不超过总数（130）', S.visibleQuestions.value.length === 130);
  check('触顶后 hasMore 为假', S.hasMore.value === false);
  check('题号连续（首尾对齐）',
        S.visibleQuestions.value[0].id === 1000 && S.visibleQuestions.value[129].id === 1129);
  // 边界：空列表
  S.startWithQuestions([]);
  check('startWithQuestions([]) 直接返回、不破坏现状',
        S.questions.value.length === 130, `questions=${S.questions.value.length}`);

  /* 5. pick 已揭示后禁止改选 */
  section('5. pick：已揭示答案后禁止改选');
  S.startWithQuestions([mkQ(1, 'choice'), mkQ(2, 'choice')]);
  S.pick(S.questions.value[0], 'A');
  check('未揭示时可选', S.answers[1] === 'A');
  S.rDone[2] = true;                       // 第 2 题已逐题判分 → 已揭示
  S.pick(S.questions.value[1], 'C');
  check('逐题判分后拒绝改选', S.answers[2] === '', `answers[2]=${JSON.stringify(S.answers[2])}`);
  S.rDone[2] = false; delete S.rDone[2];
  S.submitted.value = true;                // 整卷已交卷
  S.pick(S.questions.value[1], 'D');
  check('整卷交卷后拒绝改选', S.answers[2] === '', `answers[2]=${JSON.stringify(S.answers[2])}`);
  S.submitted.value = false;

  /* 6. 交卷防重入 */
  section('6. doExamSubmit 防重入');
  S.startWithQuestions([mkQ(1, 'choice')]);
  S.examActive.value = true;
  S.examDuration.value = 600;
  S.examTimeLeft.value = 570;
  S.submitting.value = false;
  S.questions.value = [mkQ(1, 'choice')];
  let resolveFetch;
  const pending = new Promise((res) => { resolveFetch = res; });
  let submitPosts = 0;
  responder = (url) => {
    if (url.includes('/api/exam/submit/')) {
      submitPosts++;
      return pending.then(() => makeResponse(200, {
        summary: { score_pct: 100 }, results: [], session: {},
      }));
    }
    return makeResponse(200, {});
  };
  const p1 = S.doExamSubmit(true);
  const p2 = S.doExamSubmit(true);     // 并发第二次：应被 submitting 挡下
  resolveFetch();
  await Promise.all([p1, p2]);
  check('并发交卷只提交一次', submitPosts === 1, `实际提交 ${submitPosts} 次`);
  check('交卷后 submitted 置真', S.submitted.value === true);
  check('交卷后 examActive 置假', S.examActive.value === false);

  /* 7. retryQuiz 保留题目、重置状态 */
  section('7. retryQuiz：保留题目、仅重置作答');
  S.startWithQuestions([mkQ(1, 'choice'), mkQ(2, 'blank', 2)]);
  S.answers[1] = 'B';
  S.results[1] = { correct: true };
  S.submitted.value = true;
  S.retryQuiz();
  check('题目数量不变', S.questions.value.length === 2);
  check('submitted 复位', S.submitted.value === false);
  check('作答被清空', S.answers[1] === '', `answers[1]=${JSON.stringify(S.answers[1])}`);
  check('判分缓存被清空', Object.keys(S.results).length === 0);
  check('填空题容器重新按 blanks 初始化',
        Array.isArray(S.answers[2]) && S.answers[2].length === 2);

  /* 8. examDuration 已暴露（历史 bug：模板用了但没暴露 → NaN:NaN） */
  section('8. 模板依赖的考试状态字段可访问');
  check('examDuration 已暴露且为 ref', S.examDuration && 'value' in S.examDuration,
        `typeof=${typeof S.examDuration}`);
  check('fmtTime(空转) 输出 00:00', S.fmtTime(0) === '00:00', S.fmtTime(0));
  check('fmtTime(90) 输出 01:30', S.fmtTime(90) === '01:30', S.fmtTime(90));

  /* ---------------- 汇总 ---------------- */
  console.log('\n' + '='.repeat(70));
  if (fail === 0) console.log(`前端逻辑测试：全部通过（${pass} 项）`);
  else {
    console.log(`前端逻辑测试：${pass} 通过 / ${fail} 失败`);
    fails.forEach((f) => console.log('   ✗ ' + f));
  }
  console.log('='.repeat(70));
  process.exit(fail === 0 ? 0 : 1);
})();
