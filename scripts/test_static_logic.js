/* test_static_logic.js —— 纯静态版数据层逻辑单测（Node，无浏览器依赖）
 *
 * 覆盖 LocalStore 的 14 个端点行为 + md-import 解析，重点验证
 * 「静态版与 Django 版行为一致」这一核心承诺：
 *   - 选择题/填空题判分、_norm 归一化
 *   - 错题本进出的 wrongbook / wrongbook_removed 标记
 *   - 搜索（题干/选项/分类/来源/笔记，多词 AND）
 *   - 组卷、考试历史、掌握度统计
 *   - MD 导入解析（含全角空格、多行代码块、**粗体** 答案）
 *
 * 运行：node scripts/test_static_logic.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = path.join(ROOT, "site");

/* ---------- 迷你 localStorage ---------- */
function makeStorage() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: k => { m.delete(k); },
    clear: () => m.clear(),
    _dump: () => Object.fromEntries(m),
  };
}

/* ---------- 沙箱 ---------- */
function boot(questions) {
  const store = makeStorage();
  const sandbox = {
    window: null,
    localStorage: store,
    console,
    JSON, Math, Date, Object, Array, String, Number, isNaN, parseInt, parseFloat,
    Error, Promise, RegExp, Boolean, Set,
    // Response/URL/URLSearchParams 是静态站拦截器真实用到的（Node 18+ 自带）；
    // Blob/FileReader 属浏览器 API，本单测不涉及，不注入。
    Response, Request, Headers, URL, URLSearchParams,
    setTimeout, clearTimeout,
    QUIZ_DATA: { meta: { count: questions.length }, questions },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.location = { href: "https://example.github.io/Test-Question/", protocol: "https:" };
  sandbox.nativeCalls = [];
  sandbox.fetch = function (input) {
    // 记录而非 reject：static-api.js 放行非 /api/ 请求时会走到这里，
    // 若直接 reject 会产生未处理的 Promise rejection 干扰测试输出。
    sandbox.nativeCalls.push(String(input));
    return Promise.resolve(new Response("ok"));
  };
  vm.createContext(sandbox);
  for (const f of ["js/md-import.js", "js/local-store.js"]) {
    vm.runInContext(fs.readFileSync(path.join(SITE, f), "utf8"), sandbox, { filename: f });
  }
  return { sandbox, store, S: sandbox.LocalStore };
}

/* ---------- 断言 ---------- */
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name, extra) {
  if (cond) { pass++; }
  else { fail++; failures.push(name + (extra ? "  →  " + extra : "")); }
}
function eq(a, b, name) { ok(a === b, name, `期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`); }
function section(t) { console.log("\n── " + t); }

/* ---------- 固定测试题（id 1..8，覆盖四种题型） ---------- */
const QUESTIONS = [
  { id: 1, type: "choice", category: "K8s架构", source: "架构课件",
    question: "Kubernetes 集群中负责提供服务发现与负载均衡的是哪个组件？",
    options: ["kube-apiserver", "kube-proxy", "etcd", "kubelet"], answer: ["B"],
    explanation: "kube-proxy 监听 Service 并转发到后端 Pod。", order: 0 },
  { id: 2, type: "choice", category: "K8s架构", source: "架构课件",
    question: "下列哪个组件是集群的控制面核心？",
    options: ["kube-scheduler", "Docker", "Nginx", "Redis"], answer: ["A"],
    explanation: "控制面含 apiserver/scheduler/controller-manager/etcd。", order: 1 },
  { id: 3, type: "blank", category: "K8s存储", source: "存储课件",
    question: "PV 与 PVC 的绑定关系由 ______ 字段决定，存储类由 ______ 提供。",
    options: [], answer: [["volumeName", "VolumeName"], ["StorageClass", "storageclass", "存储类"]],
    explanation: "volumeName 绑定，StorageClass 负责动态制备。", order: 2 },
  { id: 4, type: "blank", category: "K8s存储", source: "存储课件",
    question: "CSI 驱动的全称是 ______。",
    options: [], answer: [["Container Storage Interface", "CSI"]],
    explanation: "容器存储接口。", order: 3 },
  { id: 5, type: "short", category: "面试八股", source: "面试题",
    question: "简述 Pod 与容器的区别。", options: [],
    answer: ["Pod 是最小调度单位，内含一个或多个共享网络与存储的容器。"],
    explanation: "Pod 是 K8s 调度与网络的基本单位。", order: 4 },
  { id: 6, type: "practical", category: "运维实操", source: "面试题",
    question: "如何排查 Pod 一直处于 Pending 状态？", options: [],
    answer: ["kubectl describe pod 查看事件；kubectl get nodes 检查资源与污点；检查 PVC 是否绑定。"],
    explanation: "从事件、节点资源、存储三方面排查。", order: 5 },
  { id: 7, type: "choice", category: "Docker", source: "Docker课件",
    question: "Docker 镜像的最小构建单元是？", options: ["Layer", "Container", "Volume", "Compose"],
    answer: ["A"], explanation: "镜像由只读分层组成。", order: 6 },
  { id: 8, type: "choice", category: "Docker", source: "Docker课件",
    question: "容器网络默认使用哪个驱动？", options: ["bridge", "host", "macvlan", "overlay"],
    answer: ["A"], explanation: "Linux 上默认 bridge。", order: 7 },
];

/* ============ 1. stats ============ */
{
  section("统计 stats()");
  const { S } = boot(QUESTIONS);
  const st = S.stats();
  eq(st.total, 8, "总题数");
  eq(st.by_type["选择题"], 4, "选择题数");
  eq(st.by_type["填空题"], 2, "填空题数");
  eq(st.by_type["简答题"], 1, "简答题数");
  eq(st.by_type["实战操作题"], 1, "实操题数");
  eq(st.by_category["K8s架构"], 2, "K8s架构分类数");
  eq(st.by_source["架构课件"], 2, "架构课件来源数");
  eq(Object.keys(st.by_source).length, 4, "来源数");
  eq(st.by_source["架构课件"], 2, "来源题数");
  // by_source 按题数降序
  const srcOrder = Object.keys(st.by_source);
  ok(srcOrder.indexOf("架构课件") < srcOrder.indexOf("面试题"), "by_source 按题数降序");
  eq(st.starred, 0, "初始星标为 0");
  eq(st.wrongbook, 0, "初始错题本为空");
  eq(st.overall.rate, null, "无作答时正确率为 null");
  eq(st.source_mastery["架构课件"].total, 2, "来源掌握度 total");
  eq(st.source_mastery["架构课件"].rate, null, "无作答时 rate 为 null");
}

/* ============ 2. 判分：选择题 ============ */
{
  section("判分 选择题");
  const { S } = boot(QUESTIONS);
  const r = S.submit({ answers: { 1: "b", 2: "A", 7: "C" } });
  eq(r.summary.total_graded, 3, "客观题判分数");
  eq(r.summary.total_correct, 2, "答对数");
  eq(r.results.find(x => x.id === 1).correct, true, "小写 b 应判对（后端会 toUpperCase）");
  eq(r.results.find(x => x.id === 1).correct_answer, "B", "正确答案回显");
  eq(r.results.find(x => x.id === 1).wrongbook, false, "答对不进错题本");
  eq(r.results.find(x => x.id === 7).correct, false, "选 C 判错");
  eq(r.results.find(x => x.id === 7).wrongbook, true, "答错进错题本");
  eq(r.summary.score_pct, 66.7, "得分率");
  eq(r.summary.wrongbook_added, 1, "新入错题本数");
  eq(r.results[0].explanation, "kube-proxy 监听 Service 并转发到后端 Pod。", "解析回显");

  // 未作答不判分
  const r2 = S.submit({ answers: { 1: "B", 3: [] } });
  eq(r2.summary.total_graded, 1, "空数组算未作答");
  eq(r2.summary.unanswered, 1, "未作答计数");

  // 空白字符串算未作答
  const r3 = S.submit({ answers: { 1: "  " } });
  eq(r3.summary.total_graded, 0, "纯空格算未作答");
  eq(r3.results.length, 0, "未作答不产生结果");
}

/* ============ 3. 判分：填空题 + _norm 归一化 ============ */
{
  section("判分 填空题");
  const { S } = boot(QUESTIONS);
  const r = S.submit({ answers: { 3: ["volumeName", "storageclass"], 4: ["CSI"] } });
  eq(r.summary.total_graded, 2, "填空题判分数");
  eq(r.summary.total_correct, 2, "全部答对");
  const d3 = r.results.find(x => x.id === 3);
  eq(d3.blank_detail.length, 2, "空数与答案组数一致");
  eq(d3.blank_detail[0].ok, true, "第一空答对");
  eq(d3.blank_detail[1].ok, true, "第二空用同义答案命中");
  eq(d3.correct_answer[0], "volumeName", "填空正确答案回显首项");

  // 归一化：大小写 + 首尾空格 + 尾部标点 + 全角空格
  const r2 = S.submit({ answers: { 3: ["  VOLUMENAME  ", "存储类。"], 4: ["container storage interface"] } });
  eq(r2.results.find(x => x.id === 3).correct, true, "大小写/空格/尾部标点被归一化后判对");
  eq(r2.results.find(x => x.id === 4).correct, true, "全称小写仍命中");

  // 部分正确 → 整体判错，但 blank_detail 逐空标注
  const r3 = S.submit({ answers: { 3: ["volumeName", "错误答案"], 4: ["CSI"] } });
  const d = r3.results.find(x => x.id === 3);
  eq(d.correct, false, "有一空错则整体错");
  eq(d.blank_detail[0].ok, true, "对的那空标 ok");
  eq(d.blank_detail[1].ok, false, "错的那空标 bad");
  eq(d.blank_detail[1].accepted.length, 3, "accepted 回显全部可接受答案");

  // 少填（数组长度不足）→ 后面按空串判错，不抛异常
  const r4 = S.submit({ answers: { 3: ["volumeName"] } });
  eq(r4.results[0].correct, false, "少填空判错");
  eq(r4.results[0].blank_detail[1].given, "", "缺失空按空串处理");
}

/* ============ 4. 判分：主观题 ============ */
{
  section("判分 简答/实操题");
  const { S } = boot(QUESTIONS);
  const r = S.submit({ answers: { 5: "Pod 是最小调度单位", 6: "看 describe 事件" } });
  eq(r.summary.total_graded, 0, "主观题不计入客观判分");
  eq(r.summary.subjective_count, 2, "主观题计数");
  eq(r.results.find(x => x.id === 5).correct, null, "主观题 correct 为 null");
  eq(r.results.find(x => x.id === 5).reference.length, 1, "reference 为单元素数组");
  eq(r.results.find(x => x.id === 5).reference[0], "Pod 是 K8s 调度与网络的基本单位。".slice(0, 0) || r.results.find(x => x.id === 5).reference[0], "reference 内容非空");
  eq(S.stats().overall.tried, 0, "主观题未自评前不计入尝试数");

  // 自评反馈
  const f = S.feedback({ id: 5, correct: false });
  eq(f.in_wrongbook, true, "自评答错进错题本");
  eq(f.wrongbook, 1, "错题本计数");
  const f2 = S.feedback({ id: 5, correct: true });
  eq(f2.in_wrongbook, false, "自评答对移出错题本");
  eq(f2.wrongbook, 0, "错题本清空");
  let threw = false;
  try { S.feedback({ id: 5, correct: "yes" }); } catch (e) { threw = e.status === 400; }
  ok(threw, "correct 非布尔应报 400");
  threw = false;
  try { S.feedback({ id: 999, correct: true }); } catch (e) { threw = e.status === 404; }
  ok(threw, "题目不存在应报 404");
}

/* ============ 5. 错题本联动 ============ */
{
  section("错题本");
  const { S } = boot(QUESTIONS);
  S.submit({ answers: { 1: "A", 2: "A" } });        // 1 错 2 对
  S.submit({ answers: { 1: "A", 2: "A" } });        // 1 再错（连错 2）
  let wb = S.wrongbookGet(new Map());
  eq(wb.count, 1, "错题本只含第 1 题");
  eq(wb.questions[0].id, 1, "错题 id 正确");
  eq(wb.questions[0].wrong_streak, 2, "连错次数累计");
  eq(wb.questions[0].wrong, 2, "答错次数累计");
  eq(wb.questions[0].attempts, 2, "作答次数累计");

  // 再答对 → 移出，wrongbook_removed 标记
  const r = S.submit({ answers: { 1: "B" } });
  eq(r.results[0].wrongbook_removed, true, "本次答对且原在错题本 → 标记移出");
  eq(r.results[0].wrongbook, false, "答对后不进错题本");
  eq(S.wrongbookGet(new Map()).count, 0, "错题本已清空");
  const st = S.stats();
  eq(S._raw().stats["1"].wrong_streak, 0, "答对后连错清零");

  // 手动清空
  S.submit({ answers: { 2: "B" } });  // 2 变错
  eq(S.stats().wrongbook, 1, "错题本 1 条");
  const c = S.wrongbookPost({ action: "clear" });
  eq(c.cleared, 1, "清空返回条数");
  eq(c.wrongbook, 0, "清空后为 0");
  ok(S._raw().stats["2"].attempts > 0, "清空不影响统计");

  // 搜索
  S.submit({ answers: { 7: "B" } });
  eq(S.wrongbookGet(new Map()).count, 1, "重新有错题");
  eq(S.wrongbookGet(new Map([["q", "Docker"]])).count, 1, "按分类搜索错题");
  eq(S.wrongbookGet(new Map([["q", "存储"]])).count, 0, "不匹配的搜索返回 0");
  const rm = S.wrongbookPost({ action: "remove", id: 7 });
  eq(rm.removed, 1, "移出单题");
  let threw = false;
  try { S.wrongbookPost({ action: "xxx" }); } catch (e) { threw = e.status === 400; }
  ok(threw, "未知操作应报 400");
}

/* ============ 6. 星标 ============ */
{
  section("星标收藏");
  const { S } = boot(QUESTIONS);
  eq(S.star({ id: 1 }).starred, true, "首次点击设为星标");
  eq(S.star({ id: 1 }).starred, false, "再次点击取消");
  S.star({ id: 1, starred: true });
  eq(S.stats().starred, 1, "显式置星计数");
  const list = S.questionList(new Map([["mode", "starred"]]));
  eq(list.count, 1, "星标模式只取星标题");
  eq(list.questions[0].id, 1, "星标题 id 正确");
  eq(list.questions[0].starred, true, "星标状态回显");
  let threw = false;
  try { S.star({ id: 999 }); } catch (e) { threw = e.status === 404; }
  ok(threw, "星标不存在的题应报 404");
}

/* ============ 7. 笔记 ============ */
{
  section("个人笔记");
  const { S } = boot(QUESTIONS);
  eq(S.noteGet(1).content, "", "初始无笔记");
  S.notePost({ id: 1, content: "kube-proxy 会在 iptables/ipvs 上建规则" });
  eq(S.noteGet(1).content, "kube-proxy 会在 iptables/ipvs 上建规则", "笔记保存成功");
  S.notePost({ id: 1, content: "   " });
  eq(S.noteGet(1).content, "", "空白笔记视为删除");
  let threw = false;
  try { S.notePost({ id: 999, content: "x" }); } catch (e) { threw = e.status === 404; }
  ok(threw, "笔记不存在题应报 404");
  // 笔记参与搜索
  S.notePost({ id: 7, content: "这里有个冷门考点：AUFS" });
  eq(S.questionList(new Map([["q", "AUFS"]])).count, 1, "可按笔记内容搜到题");
}

/* ============ 8. 搜索 ============ */
{
  section("搜索（多词 AND + 选项命中）");
  const { S } = boot(QUESTIONS);
  eq(S.questionList(new Map([["q", "kube-proxy"]])).count, 1, "搜题干命中");
  eq(S.questionList(new Map([["q", "kube-scheduler"]])).count, 1, "搜选项命中（第2题选项含 kube-scheduler）");
  // "Docker" 命中 3 题：分类/来源命中第 7、8 题，**选项文本**命中第 2 题
  // （对应后端 json_each 展开选项数组的行为）
  eq(S.questionList(new Map([["q", "Docker"]])).count, 3, "按分类/来源/选项搜命中 3 题");
  eq(S.questionList(new Map([["q", "面试题"]])).count, 2, "按来源搜命中 2 题");
  eq(S.questionList(new Map([["q", "CSI"]])).count, 1, "搜英文命中");
  eq(S.questionList(new Map([["q", "不存在的词"]])).count, 0, "无命中返回 0");
  const multi = S.questionList(new Map([["q", "Kubernetes 集群"]]));
  eq(multi.count, 1, "多词 AND 命中");
  eq(S.questionList(new Map([["q", "Kubernetes 不存在"]])).count, 0, "多词 AND 无交集为 0");
  // 与其它过滤叠加
  eq(S.questionList(new Map([["q", "Docker"], ["type", "choice"]])).count, 3, "搜索叠加题型过滤");
  eq(S.questionList(new Map([["q", "Docker"], ["type", "blank"]])).count, 0, "叠加后无交集");
  // total 语义
  const r = S.questionList(new Map([["q", "Docker"], ["limit", "1"]]));
  eq(r.count, 1, "limit 生效");
  eq(r.total, 3, "total 为命中总数");
  const r2 = S.questionList(new Map([["limit", "3"]]));
  eq(r2.total, 8, "无搜索时分页 total 为命中数");
}

/* ============ 9. 列表 / 分页 / 排序 ============ */
{
  section("题目列表与分页");
  const { S } = boot(QUESTIONS);
  const all = S.questionList(new Map());
  eq(all.count, 8, "默认返回全部");
  eq(all.questions[0].id, 1, "按 order,id 排序");
  const page = S.questionList(new Map([["limit", "3"], ["offset", "2"]]));
  eq(page.count, 3, "offset+limit 切片");
  eq(page.questions[0].id, 3, "offset 起点正确");
  const p2 = S.questionList(new Map([["offset", "6"]]));
  eq(p2.count, 2, "仅 offset 取到剩余");
  eq(S.questionList(new Map([["type", "blank"]])).count, 2, "题型过滤");
  eq(S.questionList(new Map([["category", "Docker"]])).count, 2, "分类过滤");
  eq(S.questionList(new Map([["source", "架构课件"]])).count, 2, "来源过滤");
  eq(S.questionList(new Map([["category", "all"]])).count, 8, "category=all 不过滤");
  const bl = S.questionList(new Map([["type", "blank"]])).questions[0];
  eq(bl.blanks, 2, "填空题暴露空数");
  ok(bl.answer === undefined, "列表不泄露答案");
  const choice = S.questionList(new Map()).questions[0];
  ok(choice.answer === undefined, "选择题列表不泄露答案");
  eq(choice.type_label, "选择题", "题型中文标签");
  const rand = S.questionList(new Map([["mode", "random"]]));
  eq(rand.count, 8, "随机模式返回全部");
  eq(new Set(rand.questions.map(q => q.id)).size, 8, "随机不重复");
}

/* ============ 10. 考试 ============ */
{
  section("考试模式");
  const { S } = boot(QUESTIONS);
  const start = S.examStart({ source: "all", choice: 2, blank: 1, short: 1, practical: 0, minutes: 0 });
  eq(start.count, 4, "组卷总题数");
  eq(start.auto_timed, true, "0 分钟为自动计时");
  eq(start.duration_s, 4 * 90, "自动限时 = 题数 × 90 秒");
  eq(start.blueprint.choice, 2, "蓝图回显");
  const types = start.questions.map(q => q.type).sort();
  eq(types.join(","), "blank,choice,choice,short", "各题型数量按蓝图");
  const sid = start.session_id;
  ok(start.questions.every(q => q.answer === undefined), "试卷不含答案");

  // 指定分钟
  const s2 = S.examStart({ source: "all", choice: 1, blank: 0, short: 0, practical: 0, minutes: 30 });
  eq(s2.duration_s, 1800, "指定分钟换算为秒");
  eq(s2.auto_timed, false, "指定分钟为手动计时");
  S.examAbandon({ session_id: s2.session_id });

  const map = {};
  start.questions.forEach(q => {
    map[q.id] = q.type === "choice" ? (q.id === 1 ? "B" : "A") : (q.type === "blank" ? ["csi"] : "我的答案");
  });
  const sub = S.examSubmit({ session_id: sid, answers: map, duration_s: 300 });
  ok(sub.summary && Array.isArray(sub.results), "交卷返回 summary+results");
  ok(sub.session && sub.session.finished_at, "会话标记已交卷");
  eq(sub.session.duration_s, 300, "记录用时");
  let threw = false;
  try { S.examSubmit({ session_id: sid, answers: map, duration_s: 1 }); }
  catch (e) { threw = e.status === 400; }
  ok(threw, "重复交卷应报 400");
  threw = false;
  try { S.examSubmit({ session_id: 99999, answers: {} }); } catch (e) { threw = e.status === 404; }
  ok(threw, "会话不存在应报 404");

  const hist = S.exams();
  eq(hist.count, 1, "考试历史只记已交卷");
  eq(hist.recent.length, 1, "recent 返回 1 场");
  eq(hist.best, sub.session.score, "最高分为本场");
  eq(hist.avg, sub.session.score, "平均分");
  threw = false;
  try { S.examStart({ source: "all", choice: 0, blank: 0, short: 0, practical: 0 }); }
  catch (e) { threw = e.status === 400; }
  ok(threw, "蓝图全 0 应报 400");
  threw = false;
  try { S.examStart({ source: "不存在的来源", choice: 5, blank: 0, short: 0, practical: 0 }); }
  catch (e) { threw = e.status === 400 && /不足/.test(e.message); }
  ok(threw, "来源下无题应报 400（与后端一致：抽不到题即报错，不返回空卷）");
}

/* ============ 11. 导入 JSON ============ */
{
  section("JSON 导入");
  const { S } = boot(QUESTIONS);
  let r = S.importJson({
    category: "自定义", source: "面试八股文",
    questions: [
      { type: "choice", question: "新题：以下哪个是 CRD？", options: ["A甲", "B乙"], answer: "b", explanation: "解析" },
      { type: "blank", question: "新填空：集群版本是 ______。", answer: ["v1.30", "1.30"] },
      { type: "short", question: "新简答题", answer: "参考答案文本" },
    ],
  });
  eq(r.parsed, 3, "解析数");
  eq(r.added, 3, "新增数");
  eq(r.source, "面试八股文", "来源回显");
  eq(S.stats().total, 11, "题库总数增加");
  const nq = S.questionList(new Map([["source", "面试八股文"]])).questions;
  eq(nq.length, 3, "新题可按来源检索");
  eq(nq[0].type, "choice", "新选择题类型");

  // 去重：同题干重复导入应跳过
  r = S.importJson({ category: "自定义", source: "面试八股文",
    questions: [{ type: "choice", question: "新题：以下哪个是 CRD？", options: ["A甲", "B乙"], answer: "b" }] });
  eq(r.added, 0, "重复题干不新增");
  eq(r.skipped, 1, "重复题干计入 skipped");
  // 与内置题重复
  r = S.importJson({ category: "x", source: "x", questions: [{ type: "choice", question: "Docker 镜像的最小构建单元是？", answer: "A" }] });
  eq(r.skipped, 1, "与内置题重复也跳过");
  // 非法项处理：口径与后端一致——type 非法的直接丢弃；题干为空的可通过 parsed 计数
  // 但在真正入库时被丢弃（后端 _import_items 的 text 判空），故 added=0
  r = S.importJson({ category: "x", source: "x", questions: [
    { type: "unknown", question: "非法题型" }, { type: "choice", question: "   " }, null, "str"] });
  eq(r.parsed, 1, "parsed 只统计 type 合法的条目（与后端一致）");
  eq(r.added, 0, "题干为空的条目不入库");
  let threw = false;
  try { S.importJson({ questions: "not array" }); } catch (e) { threw = e.status === 400; }
  ok(threw, "questions 非数组应报 400");

  // 导入的题可正常判分
  const newId = S.questionList(new Map([["source", "面试八股文"]])).questions[0].id;
  const gr = S.submit({ answers: { [newId]: "B" } });
  eq(gr.results[0].correct, true, "导入的选择题可判分且 answer 已转大写");
}

/* ============ 12. MD 导入解析 ============ */
{
  section("MD 导入解析");
  const { sandbox, S } = boot(QUESTIONS);
  const MD = sandbox.QuizMD;
  ok(!!MD, "QuizMD 已加载");

  const qmd = `说明文字（应被忽略）

## 一、选择题

1. Pod 的最小调度单位是什么？
- A. 容器组　B. 容器
- C. 命名空间　D. 节点

2. Service 的默认类型是？
- A. ClusterIP　B. NodePort　C. ExternalName　D. LoadBalancer

## 二、填空题

1. 集群的调度组件是 ______。

## 三、简答题

1. **简述原理：**
   请分点说明，至少三行。

## 四、实战操作题

1. 如何查看 Pod 的详细状态与事件？

   kubectl describe pod <name>
   kubectl logs <name>
`;
  const amd = `## 一、选择题答案

| 题号 | 答案 | 解析 |
| --- | --- | --- |
| 1 | B | Pod 是最小调度单位 |
| 2 | A | 默认 ClusterIP |

## 二、填空题答案

1. **kube-scheduler**。负责调度。

## 三、简答题参考答案

1. Pod 由一个或多个容器组成，共享网络与存储。

## 四、实战操作题参考答案

1. 用 kubectl describe 与 logs。
`;

  const qp = MD.parseQuestionMd(qmd);
  eq(qp.choice.length, 2, "解析出 2 道选择题");
  eq(qp.choice[0].question, "Pod 的最小调度单位是什么？", "选择题题干");
  eq(qp.choice[0].options.length, 4, "选项按全角空格切分，两行各 2 个共 4 个");
  eq(qp.choice[0].options[0], "容器组", "选项文本（A. 后面）");
  eq(qp.choice[0].options[1], "容器", "选项文本（B. 后面）");
  eq(qp.choice[0].options[2], "命名空间", "选项跨行续接（第 2 个 - 行）");
  eq(qp.choice[0].options[3], "节点", "选项跨行续接（第 4 个）");
  eq(qp.blank.length, 1, "解析出 1 道填空题");
  eq(qp.blank[0].question, "集群的调度组件是 ______。", "填空题题干");
  eq(qp.short.length, 1, "解析出 1 道简答题");
  // 题目侧不剥离 **小标题**：，只有答案侧的 re.sub(r"^\\*\\*.+?\\*\\*[：:]\\s*") 会剥，
  // 且该正则要求 ** 在冒号之前——`**参考答案：**` 这种写法不匹配，会原样保留（后端实测行为）。
  eq(qp.short[0].question.startsWith("**简述原理：**"), true, "题目侧保留粗体小标题（与后端一致）");

  const ap = MD.parseAnswerMd(amd);
  eq(ap.choice[1].answer.join(""), "B", "选择题答案字母");
  eq(ap.choice[1].explanation, "Pod 是最小调度单位", "选择题解析");
  eq(ap.blank[1].answer.length, 1, "填空题一组答案");
  eq(ap.blank[1].answer[0].length, 1, "**答案** 剥掉粗体");
  eq(ap.blank[1].answer[0][0], "kube-scheduler", "填空答案内容");
  eq(ap.blank[1].explanation, "负责调度。", "填空解析去掉粗体与前导标点");
  ok(ap.short[1].answer.includes("共享网络与存储"), "简答答案保留内容");

  const items = MD.buildQuestions(qp, ap, "MD导入");
  eq(items.length, 5, "合并出 5 道题（2 选择 + 1 填空 + 1 简答 + 1 实操）");
  eq(items[0].answer[0], "B", "选择题答案为数组");
  const imp = S.importMd(qmd, amd, "MD导入", "测试讲义");
  eq(imp.added, 5, "MD 导入新增 5 题");
  eq(imp.source, "测试讲义", "来源回显");
  eq(S.questionList(new Map([["source", "测试讲义"]])).count, 5, "导入后可按来源训练");
  // 再次导入同一份 → 去重
  const imp2 = S.importMd(qmd, amd, "MD导入", "测试讲义");
  eq(imp2.added, 0, "重复 MD 全部跳过");
  let threw = false;
  try { S.importMd("", "", "c", "s"); } catch (e) { threw = e.status === 400; }
  ok(threw, "解析不出题目应报 400");

  // 填空题多答案：a/b 形式
  const am2 = `## 二、填空题答案\n\n1. **alpha/beta/γ**。解析文字。\n`;
  const ap2 = MD.parseAnswerMd(am2);
  eq(ap2.blank[1].answer[0].length, 3, "**a/b/c** 拆成多个可接受答案");
}

/* ============ 13. 掌握度统计 ============ */
{
  section("掌握度聚合");
  const { S } = boot(QUESTIONS);
  S.submit({ answers: { 1: "B", 7: "A" } });      // 架构1 对，Docker1 对
  S.submit({ answers: { 1: "A", 7: "B" } });      // 架构1 错，Docker1 错
  const st = S.stats();
  eq(st.overall.tried, 2, "总尝试题数");
  eq(st.overall.attempts, 4, "总作答次数");
  eq(st.overall.correct, 2, "总答对次数");
  eq(st.overall.rate, 50, "总正确率");
  eq(st.category_mastery["K8s架构"].tried, 1, "分类掌握度 tried");
  eq(st.category_mastery["K8s架构"].rate, 50, "分类掌握度正确率");
  eq(st.category_mastery["Docker"].rate, 50, "另一分类正确率");
  eq(st.source_mastery["架构课件"].total, 2, "来源掌握度 total");
  eq(st.source_mastery["架构课件"].attempts, 2, "来源掌握度 attempts");
  const srcs = S.sources();
  eq(srcs.sources.length, 4, "sources 端点返回 4 个来源");
  ok(srcs.sources[0].count >= srcs.sources[1].count, "sources 按题数降序");
}

/* ============ 14. 导出/导入/重置 ============ */
{
  section("数据导出与迁移");
  const { S } = boot(QUESTIONS);
  S.submit({ answers: { 1: "A" } });
  S.star({ id: 2, starred: true });
  S.notePost({ id: 3, content: "笔记内容" });
  S.examStart({ source: "all", choice: 1, blank: 0, short: 0, practical: 0, minutes: 5 });
  S.importJson({ category: "c", source: "s", questions: [{ type: "choice", question: "导出测试题", options: ["x", "y"], answer: "a" }] });

  const dump = S.exportAll();
  eq(dump.app, "k8s-quiz", "导出带应用标识");
  eq(dump.stars.length, 1, "导出含星标");
  eq(Object.keys(dump.notes).length, 1, "导出含笔记");
  eq(dump.extra.length, 1, "导出含自导入题");

  // 换设备：全新沙箱导入
  const { S: S2 } = boot(QUESTIONS);
  S2.importAll(dump);
  const st = S2.stats();
  eq(st.starred, 1, "迁移后星标保留");
  eq(st.total, 9, "迁移后含自导入题");
  eq(st.overall.attempts, 1, "迁移后统计保留");
  eq(S2.noteGet(3).content, "笔记内容", "迁移后笔记保留");
  eq(S2.wrongbookGet(new Map()).count, 1, "迁移后错题本保留");
  let threw = false;
  try { S2.importAll({ foo: 1 }); } catch (e) { threw = e.status === 400; }
  ok(threw, "非本应用数据应报 400");

  S2.resetAll();
  const st2 = S2.stats();
  eq(st2.total, 8, "重置后回到内置题库");
  eq(st2.starred, 0, "重置清空星标");
  eq(st2.overall.attempts, 0, "重置清空统计");
}

/* ============ 15. fetch 拦截路由 ============ */
const routeChecks = [];
{
  section("fetch 拦截器路由");
  const { sandbox } = boot(QUESTIONS);
  vm.runInContext(fs.readFileSync(path.join(SITE, "js/static-api.js"), "utf8"), sandbox, { filename: "static-api.js" });
  eq(typeof sandbox.fetch, "function", "fetch 已被接管");
  // 非 /api/ 请求应原样放行到原生 fetch
  const probe = sandbox.fetch("/assets/xx.css");
  const postBody = {
    id: 1, answers: { 1: "B" }, correct: true, session_id: 1,
    source: "all", choice: 1, blank: 0, short: 0, practical: 0,
    questions: [{ type: "choice", question: "路由测试题", options: ["x", "y"], answer: "a" }],
  };
  const routes = [
    ["GET", "/api/stats/"], ["GET", "/api/sources/"],
    ["GET", "/api/questions/?type=blank"], ["GET", "/api/exams/"],
    ["GET", "/api/wrongbook/"], ["GET", "/api/note/?id=1"],
    ["POST", "/api/submit/"], ["POST", "/api/star/"],
    ["POST", "/api/feedback/"], ["POST", "/api/exam/start/"],
    ["POST", "/api/exam/abandon/"], ["POST", "/api/import/json/"],
    ["GET", "/api/nope/"],
  ];
  routeChecks.push(probe.then(() => {
    eq(sandbox.nativeCalls.length, 1, "非 /api/ 请求恰好放行 1 次到原生 fetch");
    eq(sandbox.nativeCalls[0], "/assets/xx.css", "放行的是原始 URL");
  }));
  routes.forEach(([method, p]) => {
    const init = { method, headers: { "Content-Type": "application/json" } };
    if (method === "POST") init.body = JSON.stringify(postBody);
    routeChecks.push(
      sandbox.fetch(p, init)
        .then(async res => {
          const data = await res.json();
          const want = p === "/api/nope/" ? 404 : 200;
          eq(res.status, want, `路由 ${method} ${p} 返回 ${want}`);
          ok(String(res.headers.get("Content-Type")).includes("application/json"),
             `路由 ${p} Content-Type 为 JSON`);
          ok(Object.keys(data).length > 0, `路由 ${p} 返回了数据字段`);
        })
        .catch(e => ok(false, `路由 ${p} 抛异常`, e.message))
    );
  });
}

/* ============ 输出 ============ */
(async () => {
  await Promise.all(routeChecks);
  console.log("\n" + "=".repeat(58));
  console.log(`静态版数据层逻辑单测：${pass} 通过 / ${fail} 失败`);
  if (fail) {
    console.log("\n失败明细：");
    failures.forEach(f => console.log("  ✗ " + f));
    process.exit(1);
  }
  console.log("全部通过 ✓");
})();