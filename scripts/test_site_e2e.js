/* test_site_e2e.js —— 静态站真实浏览器端到端验证（playwright-core + 系统 Edge）
 *
 * 前面三个 Node 测试都在 vm 沙箱里跑，验证不了「Vue 真的把页面渲染出来了」。
 * 本脚本用真实浏览器走一遍用户主流程：
 *   首屏渲染 → 开始全量刷题 → 选择答案 → 交卷看成绩单 → 题库搜索
 *   → 星标/笔记 → 错题本 → 考试模式 → 刷新后数据仍在（localStorage 持久化）
 *
 * 不依赖 Playwright 自带的 Chromium：直接用系统已安装的 Edge（channel: 'msedge'），
 * 省掉约 500 MB 的浏览器下载。找不到 Edge/Chrome 时脚本跳过（exit 0），不阻塞回归。
 *
 * 运行：node scripts/test_site_e2e.js [baseUrl]
 */
"use strict";
const path = require("path");
const http = require("http");
const fs = require("fs");

const SITE = path.resolve(__dirname, "..", "site");
const BASE = process.argv[2] || "";
const PORT = 8917;

let pass = 0, fail = 0, skipped = false;
const failures = [];
const ok = (c, n, e) => c ? pass++ : (fail++, failures.push(n + (e ? "  →  " + e : "")));
const eq = (a, b, n) => ok(a === b, n, `期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`);
const section = t => console.log("\n── " + t);

/* ---------- 极简静态服务器（避免依赖外部 http.server 进程） ---------- */
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
               ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json" };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    const file = path.join(SITE, p);
    if (!file.startsWith(SITE) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end("not found"); return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
  }).listen(PORT);
}

/* ---------- 启动浏览器 ---------- */
async function launch() {
  let chromium;
  try {
    ({ chromium } = require("playwright-core"));
  } catch (e) {
    return null; // playwright-core 不可用
  }
  for (const opts of [{ channel: "msedge" }, { channel: "chrome" }, {}]) {
    try {
      return await chromium.launch({ headless: true, ...opts });
    } catch (e) { /* 试下一个 */ }
  }
  return null;
}

(async () => {
  const server = serve();
  const base = BASE || `http://127.0.0.1:${PORT}`;
  let browser = null;
  try { browser = await launch(); } catch (e) { /* ignore */ }
  if (!browser) {
    skipped = true;
    console.log("\n（未找到可用的 Edge/Chrome 浏览器，跳过真实浏览器端到端验证）");
    console.log(" 其余静态站测试已覆盖数据层与接口契约；装好浏览器后可重跑本项。");
    server.close();
    process.exit(0);
  }

  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [], requests = [];
  // 每一步独立记录失败点：page.click 默认 30s 超时会把后面的步骤全吞掉，
  // 定位时看不出到底哪一步挂的。统一用短超时 + try，失败立即暴露步骤名。
  let step = "初始化";
  page.setDefaultTimeout(8000);
  page.on("pageerror", e => errors.push(String(e.message).split("\n")[0]));
  page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
  page.on("request", r => requests.push(r.url()));
  /* 交卷/放弃/清空都会弹 confirm()。必须**全局**处理，且必须挂在最早——
     否则某个 confirm 无人应答会挂住页面，后续所有交互都被卡死
     （症状是「点了按钮但界面没变」，很容易误判成应用 bug）。
     局部 page.once 会互相抢同一个 dialog，导致 accept 报 already handled。 */
  const dialogs = [];
  page.on("dialog", async d => {
    dialogs.push(d.message().replace(/\s+/g, " ").slice(0, 50));
    try { await d.accept(); } catch (e) { /* 已处理 */ }
  });

  try {
    /* ============ 1. 首屏渲染 ============ */
    section("首屏渲染"); step = '首屏渲染';
    await page.goto(base, { waitUntil: "load" });
    await page.waitForSelector(".q-card, .setup-card, .container", { timeout: 20000 });
    await page.waitForTimeout(1200);

    const h1 = await page.textContent("h1").catch(() => "");
    ok(/答题知识库/.test(h1 || ""), "标题渲染", h1);
    const header = await page.textContent(".header p").catch(() => "");
    const total = Number((header || "").replace(/[^\d]/g, ""));
    eq(total, 2024, "首屏显示题库总数 2024");

    // /api/stats/ 是本地算的，不应有真实网络请求
    const apiReqs = requests.filter(u => /\/api\//.test(u));
    eq(apiReqs.length, 0, "零 /api/ 网络请求（全部由本地数据层处理）",
       JSON.stringify(apiReqs.slice(0, 3)));

    /* ============ 2. 开始全量刷题 ============ */
    section("全量刷题"); step = '全量刷题';
    await page.click(".mode-card:has-text('全量刷题')");
    await page.waitForTimeout(300);
    await page.click(".btn.big");           // 「开始训练 →」
    await page.waitForSelector(".q-card", { timeout: 20000 });
    await page.waitForTimeout(800);

    const cardCount = await page.locator(".q-card").count();
    ok(cardCount > 0 && cardCount <= 50, `渐进渲染首屏只挂载 ${cardCount} 张卡（≤50）`);
    const hasLoadMore = await page.locator(".load-more").count();
    ok(hasLoadMore > 0, "存在「加载更多」按钮");
    const bodyText = await page.textContent("body");
    ok(!/NaN/.test(bodyText), "页面无 NaN");

    /* ============ 3. 作答 + 交卷 ============ */
    section("作答与交卷"); step = '作答与交卷';
    // 前 3 题选第一个选项（填空题/简答题填内容）
    for (let i = 0; i < 3; i++) {
      const opt = page.locator(".q-card").nth(i).locator(".opt").first();
      if (await opt.count()) { await opt.click(); await page.waitForTimeout(120); continue; }
      const ta = page.locator(".q-card").nth(i).locator("input[type=text], textarea").first();
      if (await ta.count()) { await ta.fill("测试作答"); await page.waitForTimeout(120); }
    }
    
    await page.click(".btn:has-text('交卷')").catch(() => {});
    await page.waitForTimeout(1500);

    const after = await page.textContent("body");
    ok(/得分|正确|错题本|成绩/.test(after), "交卷后展示判分结果");
    const wbBadge = await page.textContent(".chip.wb").catch(() => "");
    ok(/\d/.test(wbBadge || ""), "错题本计数已更新", wbBadge);

    /* ============ 4. 刷新后数据仍在 ============ */
    section("localStorage 持久化"); step = '刷新持久化';
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector(".container", { timeout: 20000 });
    await page.waitForTimeout(1500);
    const wbAfter = await page.textContent(".chip.wb").catch(() => "");
    ok(/[1-9]/.test(wbAfter || ""), "刷新后错题本仍保留（localStorage 持久化生效）", wbAfter);
    const quick = await page.textContent(".quick-tip").catch(() => "");
    ok(/已练\s*\d+/.test(quick || ""), "刷新后总正确率仍显示", quick);

    /* ============ 5. 题库搜索 ============ */
    section("题库搜索"); step = '题库搜索';
    await page.click(".tab:has-text('题库')").catch(() => {});
    await page.waitForTimeout(400);
    await page.fill(".search-input input, input.mini-input", "kube-proxy").catch(async () => {
      await page.fill("input[type=text]", "kube-proxy");
    });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1200);
    const bankText = await page.textContent("body");
    ok(/共命中\s*\d+\s*道/.test(bankText), "搜索返回命中数");
    const hitCards = await page.locator(".q-card").count();
    ok(hitCards > 0, `搜索命中 ${hitCards} 张卡片`);

    /* ============ 6. 星标 ============ */
    const starBtn = page.locator(".q-card .star, .q-card .icon-btn").first();
    if (await starBtn.count()) {
      await starBtn.click();
      await page.waitForTimeout(600);
      const st = await page.textContent(".chip.st").catch(() => "");
      ok(/[1-9]/.test(st || ""), "星标计数增加", st);
    }

    /* ============ 7. 考试模式 ============ */
    section("考试模式"); step = '考试模式';
    // 先回到训练页：上一节结束时停在「题库」页，那里既没有 mode-card 也没有「返回设置」
    await page.click(".tab:has-text('训练')");
    await page.waitForTimeout(500);
    // 若还停在答题页（screen==='quiz'），先退回设置页
    if (await page.locator(".btn.ghost:has-text('返回设置')").count()) {
      await page.click(".btn.ghost:has-text('返回设置')");
      await page.waitForTimeout(500);
    }
    await page.click(".mode-card:has-text('考试模式')");
    await page.waitForTimeout(600);
    // 蓝图：默认 choice10/blank5/short2，点底部「开始训练 →」即开考（无独立开考按钮）
    const bp = await page.textContent(".bp-summary").catch(() => "");
    ok(/共\s*\d+\s*题/.test(bp || ""), "蓝图摘要显示题数与限时", bp);
    await page.click(".btn.big");
    await page.waitForTimeout(2500);
    const examText = await page.textContent("body");
    ok(/交卷/.test(examText), "考试界面出现交卷入口");
    ok(!/NaN/.test(examText), "考试界面无 NaN（examDuration 正常暴露）");
    ok(/Ctrl\+Enter|标记/.test(examText), "考试界面提供快捷键与标记提示");
    // 计时器文本形如 "⏱ 25:28"（含 emoji 前缀，不能用 ^\d{2}:\d{2} 锚定）
    const timer = (await page.textContent(".exam-clock").catch(() => "")) || "";
    ok(/\d{2}:\d{2}/.test(timer), "计时器显示剩余时间 mm:ss", timer);
    ok(!/NaN/.test(timer), "计时器无 NaN", timer);
    const cells = await page.locator(".gcell").count();
    eq(cells, 17, "答题卡格子数 = 蓝图总题数 17（10选择+5填空+2简答）");

    // 考试页快捷键：按 A 应选中第一个选项
    await page.keyboard.press("a");
    await page.waitForTimeout(300);
    const answeredCells = await page.locator(".gcell.done").count();
    ok(answeredCells >= 1, `快捷键作答生效（已答 ${answeredCells} 格）`);

    // 交卷（按钮真实类名 .btn.small.exam）
    await page.click(".btn.small.exam:has-text('交卷')");
    await page.waitForTimeout(2000);
    const examDone = await page.textContent("body");
    ok(/考试结束/.test(examDone), "考试交卷弹出成绩单");
    ok(/客观题得分率/.test(examDone), "成绩单含客观题得分率");
    ok(/\d+\s*分/.test(examDone), "成绩单含总分");
    // 成绩单里时间在「用时」之前（如 "00:02用时"），故分别断言两者
    ok(/用时/.test(examDone), "成绩单含用时标签");
    ok(/\d{2}:\d{2}\s*用时/.test(examDone), "成绩单用时格式为 mm:ss", examDone.match(/\d{2}:\d{2}/)?.[0]);
    ok(/新入错题本/.test(examDone), "成绩单含错题本变化统计");
    ok(!/NaN/.test(examDone), "成绩单无 NaN（用时计算正常）");

    
    /* ============ 8. 本地数据面板 ============ */
    section("本地数据管理面板"); step = '数据面板';
    await page.click("#kqz-btn").catch(() => {});
    await page.waitForTimeout(500);
    const panel = await page.textContent("#kqz-panel").catch(() => "");
    ok(/本地数据/.test(panel || ""), "数据面板可打开");
    ok(/导出备份/.test(panel || ""), "面板含导出备份入口");
    ok(/\d+\s*(B|KB|MB)/.test(panel || ""), "面板显示存储用量", panel);

    /* ============ 9. 无脚本错误 ============ */
    section("运行期错误"); step = '运行期错误';
    const realErrors = errors.filter(e =>
      !/favicon|ERR_FAILED.*favicon|Failed to load resource.*404/i.test(e));
    eq(realErrors.length, 0, "无 JS 运行期错误", JSON.stringify(realErrors.slice(0, 3)));
  } catch (e) {
    fail++;
    failures.push(`[${step}] 执行异常：${e.message.split("\n")[0]}`);
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n" + "=".repeat(58));
  if (skipped) process.exit(0);
  console.log(`静态站真实浏览器端到端：${pass} 通过 / ${fail} 失败`);
  if (fail) {
    console.log("\n失败明细：");
    failures.forEach(f => console.log("  ✗ " + f));
    process.exit(1);
  }
  console.log("全部通过 ✓");
})();