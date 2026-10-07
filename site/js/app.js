/* 答题知识库 v4-P1 - Vue3 应用（前端独立目录，API 地址见 js/config.js）
   训练模式：全量/随机/专项/文档/错题重练/星标收藏/考试模式（蓝图组卷·限时·答题卡） */
const { createApp, ref, reactive, computed, onMounted } = Vue;

const API = window.API_BASE || "";  // 后端 API 基地址（同源为空串，跨域为 http://127.0.0.1:8000）

const KEYS = ["A", "B", "C", "D", "E", "F"];
const TYPE_NAMES = { choice: "选择题", blank: "填空题", short: "简答题", practical: "实战操作题" };

/* 统一请求封装：把「HTTP 错误 / 非 JSON 响应」转成可读错误。
   原先各处直接 .then(r => r.json())，后端一旦返回 HTML 错误页就会抛出
   SyntaxError: Unexpected token '<'，难以定位。 */
async function apiJson(path, opts) {
  const res = await fetch(API + path, opts);
  const text = await res.text();
  let data = {};
  if (text) {
    try { data = JSON.parse(text); }
    catch (e) { throw new Error(`HTTP ${res.status}：服务返回了非 JSON 响应`); }
  }
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
const postJson = (path, payload) => apiJson(path, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
/* 大题库列表渐进渲染步长：首屏只挂载 RENDER_STEP 张卡片，"加载更多"再追加，
   避免一次挂载 2000+ 张卡导致首屏卡顿（数据仍一次取回，语义不变）。 */
const RENDER_STEP = 50;

createApp({
  setup() {
    /* ---------- 全局 ---------- */
    const tab = ref("quiz");              // quiz | import
    const screen = ref("setup");          // setup | quiz
    const loading = ref(false);
    const err = ref("");
    const stats = ref({});
    const sources = ref([]);

    async function loadStats() {
      try {
        // /api/stats/ 已含 by_source + source_mastery，来源列表可直接推导，
        // 不再额外请求 /api/sources/（原先两个请求的数据完全重复）。
        const s = await apiJson("/api/stats/");
        stats.value = s;
        const counts = s.by_source || {};
        const mastery = s.source_mastery || {};
        sources.value = Object.keys(counts).map(name => ({
          name, count: counts[name],
          total: mastery[name] ? mastery[name].total : counts[name],
          rate: mastery[name] ? mastery[name].rate : null,
        }));
      } catch (e) { err.value = "无法连接后端服务，请确认已启动。"; }
    }
    onMounted(loadStats);

    /* ---------- 训练设置 ---------- */
    const trainMode = ref("all");         // all|random|category|source|wrong
    const randCount = ref(10);
    const wrongCount = ref("all");        // "all" | 5/10/20
    const categorySel = ref("");
    const sourceSel = ref("");
    const qtype = ref("all");
    const shuffle = ref(false);

    const MODES = [
      { key: "all",      icon: "📚", name: "全量刷题", desc: "按顺序过完所选范围全部题目" },
      { key: "random",   icon: "🎲", name: "随机抽题", desc: "随机抽取指定数量的题目自测" },
      { key: "category", icon: "🎯", name: "专项训练", desc: "按知识点分类突破，附掌握度" },
      { key: "source",   icon: "📄", name: "文档训练", desc: "按导入的文档题集专属训练" },
      { key: "wrong",    icon: "🔁", name: "错题重练", desc: "专练错题，答对自动移出错题本" },
      { key: "starred",  icon: "⭐", name: "星标收藏", desc: "只练星标过的重点题目" },
      { key: "exam",     icon: "📝", name: "考试模式", desc: "蓝图组卷 · 限时答题 · 成绩单" },
    ];

    const categoryChips = computed(() => {
      const counts = stats.value.by_category || {};
      const m = stats.value.category_mastery || {};
      return Object.keys(counts).map(c => ({
        name: c, count: counts[c],
        rate: m[c] ? m[c].rate : null,
      }));
    });
    const wrongTotal = computed(() => stats.value.wrongbook || 0);
    const overall = computed(() => stats.value.overall || { total: 0, tried: 0, rate: null });

    function masteryClass(rate) {
      if (rate === null || rate === undefined) return "";
      if (rate >= 80) return "good";
      if (rate >= 50) return "mid";
      return "bad";
    }
    function pickCategory(c) { categorySel.value = categorySel.value === c ? "" : c; }
    function pickSource(s) { sourceSel.value = sourceSel.value === s ? "" : s; }
    function goWrong() {
      tab.value = "quiz";
      trainMode.value = "wrong";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function goStarred() {
      tab.value = "quiz";
      trainMode.value = "starred";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ---------- 会话重置与渐进渲染 ---------- */
    /* 统一重置：清空上一次的作答与判分缓存并装载新题目列表。
       原先 startExam / startQuiz / startWithQuestions / retryQuiz 四处各写一遍。 */
    function resetSession(list) {
      questions.value = list;
      visibleCount.value = Math.min(RENDER_STEP, list.length);
      for (const k of Object.keys(results)) delete results[k];
      for (const k of Object.keys(selfJudge)) delete selfJudge[k];
      for (const k of Object.keys(rDone)) delete rDone[k];
      for (const q of list) {
        answers[q.id] = q.type === "blank" ? Array(q.blanks).fill("") : "";
      }
    }
    const visibleCount = ref(0);
    // 只挂载前 visibleCount 张卡片；idx 取的是切片前的真实下标，题号仍连续
    const visibleQuestions = computed(() => questions.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < questions.value.length);
    function showMoreQuestions() {
      visibleCount.value = Math.min(visibleCount.value + RENDER_STEP, questions.value.length);
    }

    /* ---------- 考试模式（v4-P1） ---------- */
    const examSource = ref("all");
    const examCounts = reactive({ choice: 10, blank: 5, short: 2, practical: 0 });
    const examMinutes = ref(0);            // 0 = 自动（题数 × 90 秒）
    const examActive = ref(false);         // 考试进行中（计时）
    const examSession = ref(null);
    const examTimeLeft = ref(0);
    const examDuration = ref(0);
    const examIdx = ref(0);
    const examFlagged = reactive({});      // q.id -> true 已标记
    const examScorePct = ref(0);           // 交卷后客观题得分率
    const examJustDone = ref(false);       // 成绩单弹窗区分考试/练习
    const examHistory = ref(null);
    let examTimer = null;

    const examPlanCount = computed(() =>
      Object.values(examCounts).reduce((a, b) => a + Number(b || 0), 0));
    const examPlanTime = computed(() => examMinutes.value > 0
      ? examMinutes.value + " 分钟"
      : Math.max(1, Math.round(examPlanCount.value * 90 / 60)) + " 分钟（自动）");
    const examQ = computed(() => questions.value[examIdx.value] || null);
    const starredTotal = computed(() => stats.value.starred || 0);

    function fmtTime(s) {
      const m = Math.floor(Math.max(0, s) / 60), ss = Math.max(0, s) % 60;
      return String(m).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
    }
    async function loadExamHistory() {
      try { examHistory.value = await apiJson("/api/exams/"); }
      catch (e) { /* 静默 */ }
    }

    async function startExam() {
      err.value = "";
      if (examPlanCount.value <= 0) { err.value = "请先在蓝图里配置各题型数量。"; return; }
      loading.value = true;
      try {
        const res = await postJson("/api/exam/start/",
          { source: examSource.value, ...examCounts, minutes: examMinutes.value });
        resetSession(res.questions);
        for (const k of Object.keys(examFlagged)) delete examFlagged[k];
        examSession.value = res.session_id;
        examDuration.value = res.duration_s;
        examTimeLeft.value = res.duration_s;
        examIdx.value = 0;
        examScorePct.value = 0;
        examJustDone.value = false;
        submitted.value = false;
        showResult.value = false;
        examActive.value = true;
        screen.value = "quiz";
        startExamTimer();
        window.scrollTo({ top: 0 });
      } catch (e) { err.value = "开考失败：" + e.message; }
      loading.value = false;
    }

    function startExamTimer() {
      clearInterval(examTimer);
      examTimer = setInterval(() => {
        if (submitting.value) return;          // 交卷进行中：停表，避免重复触发
        examTimeLeft.value--;
        if (examTimeLeft.value <= 0) { examTimeLeft.value = 0; doExamSubmit(true); }
      }, 1000);
    }
    function examGoto(i) {
      if (i >= 0 && i < questions.value.length) {
        examIdx.value = i;
        window.scrollTo({ top: 0 });
      }
    }
    function examToggleFlag() {
      const q = examQ.value;
      if (q) examFlagged[q.id] = !examFlagged[q.id];
    }
    function gridCellClass(i) {
      const q = questions.value[i];
      if (!q) return "gcell";
      const cls = ["gcell"];
      if (i === examIdx.value) cls.push("cur");
      const a = answers[q.id];
      const answered = q.type === "blank"
        ? (Array.isArray(a) && a.some(x => String(x || "").trim() !== ""))
        : (a !== undefined && a !== null && String(a).trim() !== "");
      if (answered) cls.push("done");
      if (examFlagged[q.id]) cls.push("flag");
      return cls.join(" ");
    }

    async function doExamSubmit(auto = false) {
      if (submitting.value) return;          // 防重入：到时自动交卷与手动交卷可能并发
      clearInterval(examTimer);
      const un = questions.value.length - answeredCount.value;
      if (!auto) {
        const tip = un > 0 ? `还有 ${un} 题未作答，确定交卷吗？` : "确定交卷吗？";
        if (!confirm(tip)) { startExamTimer(); return; }
      }
      submitting.value = true;
      try {
        const res = await postJson("/api/exam/submit/", {
          session_id: examSession.value,
          answers: { ...answers },
          duration_s: Math.max(0, examDuration.value - examTimeLeft.value),
        });
        for (const r of res.results) results[r.id] = r;
        examScorePct.value = res.summary.score_pct;
        examJustDone.value = true;
        examActive.value = false;
        examSession.value = null;
        submitted.value = true;
        showResult.value = true;
        loadStats(); loadExamHistory();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        err.value = "交卷失败：" + e.message;
        startExamTimer();
      }
      submitting.value = false;
    }

    async function abandonExam() {
      if (!confirm("确定放弃本场考试吗？本场不计成绩。")) return;
      clearInterval(examTimer);
      try {
        if (examSession.value) {
          await postJson("/api/exam/abandon/", { session_id: examSession.value });
        }
      } catch (e) { /* 静默 */ }
      examActive.value = false;
      examSession.value = null;
      submitting.value = false;
      screen.value = "setup";
      window.scrollTo({ top: 0 });
    }

    /* 考试快捷键：A-E / 1-5 选项，←→/Enter 切题，F 标记，Ctrl+Enter 交卷 */
    function onKeydown(e) {
      if (!examActive.value || submitted.value) return;
      const tag = (e.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea";
      if (e.ctrlKey && e.key === "Enter") { e.preventDefault(); doExamSubmit(); return; }
      if (typing) return;
      const q = examQ.value;
      if (!q) return;
      const k = e.key.toUpperCase();
      if (q.type === "choice" && q.options && q.options.length) {
        const ki = KEYS.indexOf(k);
        const ni = "12345".indexOf(e.key);
        if (ki >= 0 && ki < q.options.length) { answers[q.id] = k; e.preventDefault(); return; }
        if (ni >= 0 && ni < q.options.length) { answers[q.id] = KEYS[ni]; e.preventDefault(); return; }
      }
      if (e.key === "Enter" || e.key === "ArrowRight") { examGoto(examIdx.value + 1); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { examGoto(examIdx.value - 1); e.preventDefault(); }
      else if (k === "F") { examToggleFlag(); e.preventDefault(); }
    }
    onMounted(() => window.addEventListener("keydown", onKeydown));
    onMounted(loadExamHistory);

    /* ---------- 逐题判分（练习模式开关） ---------- */
    const instantMode = ref(false);
    const rDone = reactive({});            // q.id -> true（该题已即时判分）
    async function submitOne(q) {
      if (submitted.value || rDone[q.id]) return;
      try {
        const res = await postJson("/api/submit/", { answers: { [q.id]: answers[q.id] } });
        for (const r of res.results) results[r.id] = r;
        rDone[q.id] = true;
        loadStats();
      } catch (e) { err.value = "判分失败：" + e.message; }
    }
    function isRevealed(q) { return submitted.value || !!rDone[q.id]; }

    /* ---------- 星标 / 笔记 / 题库搜索（v4-P1） ---------- */
    const bankKw = ref("");
    const bankResults = ref([]);
    const bankSearched = ref(false);
    const bankLoading = ref(false);
    const bankTotal = ref(0);              // 命中总数（可能大于实际展示条数）
    const BANK_LIMIT = 200;                // 单次搜索最多展示条数，防止超大结果拖慢渲染
    const noteDraft = ref("");
    const noteFor = ref(0);                // 正在编辑笔记的题目 id，0=收起

    async function bankSearch() {
      const kw = bankKw.value.trim();
      if (!kw) return;
      bankLoading.value = true;
      err.value = "";
      try {
        const res = await apiJson("/api/questions/?limit=" + BANK_LIMIT +
                                  "&q=" + encodeURIComponent(kw));
        bankResults.value = res.questions;
        bankTotal.value = res.total;
        bankSearched.value = true;
      } catch (e) { err.value = "搜索失败：" + e.message; }
      bankLoading.value = false;
    }
    async function toggleStar(q) {
      try {
        const res = await postJson("/api/star/", { id: q.id });
        q.starred = res.starred;
        stats.value.starred = res.starred_total;
      } catch (e) { err.value = "操作失败：" + e.message; }
    }
    function openNote(q) {
      if (noteFor.value === q.id) { noteFor.value = 0; return; }
      noteFor.value = q.id;
      noteDraft.value = "";
      apiJson("/api/note/?id=" + q.id)
        .then(res => { if (noteFor.value === q.id) noteDraft.value = res.content || ""; })
        .catch(() => {});
    }
    async function saveNote(q) {
      try {
        await postJson("/api/note/", { id: q.id, content: noteDraft.value });
        noteFor.value = 0;
      } catch (e) { err.value = "笔记保存失败：" + e.message; }
    }
    function startWithQuestions(list) {
      if (!list || !list.length) return;
      resetSession(list);
      submitted.value = false;
      showResult.value = false;
      examActive.value = false;
      examJustDone.value = false;
      screen.value = "quiz";
      window.scrollTo({ top: 0 });
    }

    /* ---------- 答题 ---------- */
    const questions = ref([]);
    const answers = reactive({});
    const results = reactive({});
    const selfJudge = reactive({});
    const submitted = ref(false);
    const submitting = ref(false);
    const showResult = ref(false);

    const answeredCount = computed(() =>
      questions.value.filter(q => {
        const a = answers[q.id];
        if (a === undefined || a === null) return false;
        if (Array.isArray(a)) return a.some(x => String(x || "").trim() !== "");
        return String(a).trim() !== "";
      }).length
    );

    const objectiveScore = computed(() => {
      let c = 0, n = 0;
      for (const q of questions.value) {
        const r = results[q.id];
        if (r && r.correct !== null && r.correct !== undefined) { n++; if (r.correct) c++; }
      }
      return { c, n };
    });
    const subjectiveCorrect = computed(() => Object.values(selfJudge).filter(v => v === true).length);
    const subjectiveTotal = computed(() =>
      questions.value.filter(q => q.type === "short" || q.type === "practical").length
    );
    const finalScore = computed(() => {
      const total = questions.value.length || 1;
      return Math.round((objectiveScore.value.c + subjectiveCorrect.value) / total * 100);
    });

    const trainLabel = computed(() => {
      const names = { all: "全量刷题", random: "随机抽题", category: "专项训练", source: "文档训练", wrong: "错题重练", starred: "星标收藏", exam: "考试模式" };
      let s = names[trainMode.value] || "练习";
      if (trainMode.value === "category" && categorySel.value) s += " · " + categorySel.value;
      if (trainMode.value === "source" && sourceSel.value) s += " · " + sourceSel.value;
      if (qtype.value !== "all") s += " · " + TYPE_NAMES[qtype.value];
      return s;
    });

    async function startQuiz() {
      err.value = "";
      if (trainMode.value === "exam") { startExam(); return; }
      if (trainMode.value === "category" && !categorySel.value) { err.value = "请先选择一个知识点分类。"; return; }
      if (trainMode.value === "source" && !sourceSel.value) { err.value = "请先选择一个文档题集。"; return; }
      loading.value = true;
      try {
        const p = new URLSearchParams();
        if (trainMode.value === "all") p.set("mode", shuffle.value ? "random" : "all");
        if (trainMode.value === "random") { p.set("mode", "random"); p.set("count", randCount.value); }
        if (trainMode.value === "category") { p.set("mode", shuffle.value ? "random" : "all"); p.set("category", categorySel.value); }
        if (trainMode.value === "source") { p.set("mode", shuffle.value ? "random" : "all"); p.set("source", sourceSel.value); }
        if (trainMode.value === "wrong") { p.set("mode", "wrong"); if (wrongCount.value !== "all") p.set("count", wrongCount.value); }
        if (trainMode.value === "starred") p.set("mode", "starred");
        if (qtype.value !== "all") p.set("type", qtype.value);
        const res = await apiJson("/api/questions/?" + p.toString());
        if (!res.questions.length) {
          err.value = trainMode.value === "wrong"
            ? "错题本目前是空的，先去答题吧！"
            : (trainMode.value === "starred"
              ? "还没有星标任何题目，去题库或答题回看里点 ⭐ 收藏吧。"
              : "该筛选条件下没有题目，请调整设置。");
          loading.value = false;
          return;
        }
        resetSession(res.questions);
        submitted.value = false;
        showResult.value = false;
        examJustDone.value = false;
        screen.value = "quiz";
        window.scrollTo({ top: 0 });
      } catch (e) {
        err.value = "获取题目失败：" + e.message;
      }
      loading.value = false;
    }

    function backToSetup() {
      screen.value = "setup";
      window.scrollTo({ top: 0 });
    }
    function nextBatch() {
      // 随机/错题/打乱顺序 → 直接换一批；顺序模式 → 返回设置
      if (trainMode.value === "random" || trainMode.value === "wrong" || shuffle.value) startQuiz();
      else backToSetup();
    }

    function pick(q, key) {
      // 已交卷、或逐题模式下该题已判分（答案已揭示）后不再允许改选，
      // 避免选项高亮与已揭示结果不一致（原实现只挡了整卷交卷的情况）。
      if (isRevealed(q)) return;
      answers[q.id] = key;
    }

    async function submitAll() {
      submitting.value = true;
      try {
        const res = await postJson("/api/submit/", { answers: { ...answers } });
        for (const r of res.results) results[r.id] = r;
        submitted.value = true;
        showResult.value = true;
        loadStats();  // 刷新错题本数与掌握度
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        err.value = "提交失败：" + e.message;
      }
      submitting.value = false;
    }

    async function judge(q, correct) {
      // 简答/实操自评：同步到后端（错题本联动）
      selfJudge[q.id] = correct;
      try {
        const res = await postJson("/api/feedback/", { id: q.id, correct });
        if (res && typeof res.wrongbook === "number") stats.value.wrongbook = res.wrongbook;
      } catch (e) { /* 静默 */ }
    }

    function retryQuiz() {
      resetSession(questions.value);   // 复用统一重置（题目不变，仅清作答与判分缓存）
      submitted.value = false;
      showResult.value = false;
      examJustDone.value = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function optClass(q, key) {
      const r = results[q.id];
      if (!isRevealed(q)) return answers[q.id] === key ? "opt selected" : "opt";
      if (r && key === r.correct_answer) return "opt correct";
      if (r && answers[q.id] === key) return "opt wrong";
      return "opt";
    }
    function blankClass(q, i) {
      const r = results[q.id];
      if (!isRevealed(q) || !r || !r.blank_detail) return "";
      return r.blank_detail[i] && r.blank_detail[i].ok ? "ok" : "bad";
    }
    function resultClass(q) {
      const r = results[q.id];
      if (!r) return "";
      if (r.correct === true) return "feedback ok";
      if (r.correct === false) return "feedback bad";
      return "feedback info";
    }
    function resultTitle(q) {
      const r = results[q.id];
      if (!r) return "";
      if (r.correct === true) return "✓ 回答正确";
      if (r.correct === false) return "✗ 回答错误";
      return "※ 简答/实操题：请对照参考答案自评";
    }

    function parseExpl(expl) {
      const s = String(expl || "");
      const idx = s.indexOf("【衍生知识点】");
      if (idx >= 0) {
        return [s.slice(0, idx).trim(), s.slice(idx + "【衍生知识点】".length).trim()];
      }
      return [s, ""];
    }

    /* ---------- 导入 ---------- */
    const questionFile = ref(null);
    const answerFile = ref(null);
    const importCategory = ref("MD导入");
    const importSource = ref("");
    const jsonSource = ref("");
    const importing = ref(false);
    const importMsg = ref("");
    const importErr = ref("");
    const lastImported = ref("");
    const jsonText = ref("");

    function onQFile(e) { questionFile.value = e.target.files[0] || null; }
    function onAFile(e) { answerFile.value = e.target.files[0] || null; }

    function goSourceTraining(name) {
      tab.value = "quiz";
      trainMode.value = "source";
      sourceSel.value = name;
      startQuiz();
    }

    async function doImportMd() {
      importMsg.value = ""; importErr.value = ""; lastImported.value = "";
      if (!questionFile.value || !answerFile.value) {
        importErr.value = "请同时选择题目文件和答案解析文件。"; return;
      }
      importing.value = true;
      try {
        const fd = new FormData();
        fd.append("question_file", questionFile.value);
        fd.append("answer_file", answerFile.value);
        fd.append("category", importCategory.value || "MD导入");
        if (importSource.value.trim()) fd.append("source", importSource.value.trim());
        // 不设 Content-Type，交给浏览器带 multipart boundary
        const res = await apiJson("/api/import/md/", { method: "POST", body: fd });
        importMsg.value = `导入完成：解析出 ${res.parsed} 道题，新增 ${res.added} 道，跳过重复 ${res.skipped} 道。已归入文档「${res.source}」。`;
        if (res.added > 0) lastImported.value = res.source;
        loadStats();
      } catch (e) { importErr.value = "导入失败：" + e.message; }
      importing.value = false;
    }

    async function doImportJson() {
      importMsg.value = ""; importErr.value = ""; lastImported.value = "";
      if (!jsonText.value.trim()) { importErr.value = "请粘贴 JSON 题库内容。"; return; }
      let payload;
      try { payload = JSON.parse(jsonText.value); }
      catch { importErr.value = "JSON 格式有误，请检查。"; return; }
      if (jsonSource.value.trim()) payload.source = jsonSource.value.trim();
      importing.value = true;
      try {
        const res = await postJson("/api/import/json/", payload);
        importMsg.value = `导入完成：解析出 ${res.parsed} 道题，新增 ${res.added} 道，跳过重复 ${res.skipped} 道。已归入文档「${res.source}」。`;
        if (res.added > 0) lastImported.value = res.source;
        loadStats();
      } catch (e) { importErr.value = "导入失败：" + e.message; }
      importing.value = false;
    }

    async function clearWrongbook() {
      if (!confirm("确定清空错题本吗？（仅移出错题本，不影响题目与统计）")) return;
      try {
        await postJson("/api/wrongbook/", { action: "clear" });
        loadStats();
      } catch (e) { err.value = "操作失败：" + e.message; }
    }

    return {
      tab, screen, loading, err, stats, sources, loadStats,
      trainMode, MODES, randCount, wrongCount, categorySel, sourceSel, qtype, shuffle,
      categoryChips, wrongTotal, overall, masteryClass, pickCategory, pickSource, goWrong,
      goStarred, starredTotal,
      questions, answers, results, selfJudge, submitted, submitting, showResult,
      visibleQuestions, hasMore, showMoreQuestions,
      answeredCount, objectiveScore, subjectiveCorrect, subjectiveTotal, finalScore, trainLabel,
      startQuiz, backToSetup, nextBatch, pick, submitAll, judge, retryQuiz,
      optClass, blankClass, resultClass, resultTitle, parseExpl, KEYS,
      /* 考试模式 */
      examSource, examCounts, examMinutes, examActive, examTimeLeft, examDuration, examIdx,
      examFlagged, examScorePct, examJustDone, examHistory, examPlanCount, examPlanTime,
      examQ, fmtTime, startExam, examGoto, examToggleFlag, gridCellClass,
      doExamSubmit, abandonExam,
      /* 逐题判分 */
      instantMode, rDone, submitOne, isRevealed,
      /* 题库 / 星标 / 笔记 */
      bankKw, bankResults, bankSearched, bankLoading, bankTotal, BANK_LIMIT, noteDraft, noteFor,
      bankSearch, toggleStar, openNote, saveNote, startWithQuestions,
      questionFile, answerFile, importCategory, importSource, jsonSource,
      importing, importMsg, importErr, lastImported, jsonText,
      onQFile, onAFile, doImportMd, doImportJson, goSourceTraining, clearWrongbook,
    };
  },

  template: `
  <div class="container">
    <div class="header">
      <div class="logo">题库</div>
      <div style="flex:1">
        <h1>答题知识库 · 专属训练</h1>
        <p>题库共 {{ stats.total || 0 }} 题 · 七种训练 · 考试模拟 · 错题管理</p>
      </div>
      <div class="tabs">
        <button class="tab" :class="{active: tab==='quiz'}" @click="tab='quiz'">训练</button>
        <button class="tab" :class="{active: tab==='bank'}" @click="tab='bank'">题库</button>
        <button class="tab" :class="{active: tab==='import'}" @click="tab='import'">导入题库</button>
      </div>
    </div>

    <div class="quick-bar">
      <button class="chip wb" @click="goWrong">🔁 错题本 {{ wrongTotal }}</button>
      <button class="chip st" @click="goStarred">⭐ 星标 {{ starredTotal }}</button>
      <span class="quick-tip" v-if="overall.tried">已练 {{ overall.tried }}/{{ overall.total }} 题 · 总正确率 {{ overall.rate === null ? '—' : overall.rate + '%' }}</span>
      <span class="quick-tip" v-else>还没有作答记录，开始第一次训练吧</span>
    </div>

    <div v-if="err" class="feedback bad" style="margin-bottom:12px">{{ err }}</div>

    <!-- ============ 导入页 ============ -->
    <div v-if="tab==='import'">
      <div class="q-card">
        <div class="q-head"><span class="badge choice">方式一</span><span class="q-no">Markdown 文件导入</span></div>
        <div class="q-text">上传《测试题》与《答案解析》两个 MD 文件，系统自动解析题目、答案与解析并入库（按题干自动去重）。导入后可一键开始该文档的专属训练。</div>
        <div class="import-grid">
          <label class="file-box">
            <span>📄 题目文件（如 K8s资源对象-测试题.md）</span>
            <input type="file" accept=".md,.markdown,.txt" @change="onQFile">
          </label>
          <label class="file-box">
            <span>🔑 答案解析文件（如 …-答案解析.md）</span>
            <input type="file" accept=".md,.markdown,.txt" @change="onAFile">
          </label>
        </div>
        <div class="import-row">
          <label>文档名称（用于文档训练）：</label>
          <input class="mini-input" v-model="importSource" placeholder="例如：K8s 名称空间讲义">
        </div>
        <div class="import-row">
          <label>知识点分类：</label>
          <input class="mini-input" v-model="importCategory" placeholder="例如：MD导入">
          <button class="btn" :disabled="importing" @click="doImportMd">{{ importing ? '导入中…' : '开始导入' }}</button>
        </div>
        <div v-if="lastImported" class="import-row">
          <button class="btn green" @click="goSourceTraining(lastImported)">🎯 开始《{{ lastImported }}》专属训练</button>
        </div>
      </div>

      <div class="q-card">
        <div class="q-head"><span class="badge blank">方式二</span><span class="q-no">JSON 导入</span></div>
        <div class="q-text">粘贴 JSON 题库，格式：{ "category": "分类", "questions": [ { "type": "choice/blank/short/practical", "question": "题干", "options": ["A项","B项","C项","D项"], "answer": "B 或 [["答案1","同义答案"],...], "explanation": "解析" } ] }</div>
        <textarea class="ta json" v-model="jsonText" placeholder='在此粘贴 JSON，例如：
{ "category": "自定义补充", "questions": [ {"type":"choice","question":"示例题干","options":["A","B","C","D"],"answer":"B","explanation":"解析"} ] }'></textarea>
        <div class="import-row">
          <label>文档名称（用于文档训练）：</label>
          <input class="mini-input" v-model="jsonSource" placeholder="例如：面试八股文">
          <button class="btn" :disabled="importing" @click="doImportJson">{{ importing ? '导入中…' : '导入 JSON' }}</button>
        </div>
        <div v-if="lastImported" class="import-row">
          <button class="btn green" @click="goSourceTraining(lastImported)">🎯 开始《{{ lastImported }}》专属训练</button>
        </div>
      </div>

      <div v-if="importMsg" class="feedback ok">{{ importMsg }}</div>
      <div v-if="importErr" class="feedback bad">{{ importErr }}</div>
    </div>

    <!-- ============ 题库页（搜索 / 星标 / 笔记） ============ -->
    <div v-else-if="tab==='bank'">
      <div class="q-card">
        <div class="q-head"><span class="badge choice">🔍</span><span class="q-no">题库搜索</span></div>
        <div class="q-text">搜索题干 / 选项 / 解析 / 笔记（空格分隔多个关键词）。搜到后可一键以此开练。</div>
        <div class="import-row">
          <input class="mini-input bank-kw" v-model="bankKw" placeholder="例如：pod 回收 ｜ SM-2 ｜ 列表推导式" @keyup.enter="bankSearch">
          <button class="btn" :disabled="bankLoading" @click="bankSearch">{{ bankLoading ? '搜索中…' : '搜索' }}</button>
        </div>
      </div>

      <div v-if="bankSearched && !bankResults.length" class="empty">没有匹配「{{ bankKw }}」的题目</div>

      <div v-if="bankSearched && bankResults.length" class="quick-tip" style="margin:4px 0 10px">
        共命中 {{ bankTotal }} 道<template v-if="bankTotal > bankResults.length">，仅显示前 {{ bankResults.length }} 道（可加关键词缩小范围）</template>
      </div>

      <div v-for="q in bankResults" :key="q.id" class="q-card bank-card">
        <div class="q-head">
          <span class="badge" :class="q.type">{{ q.type_label }}</span>
          <span class="badge cat">{{ q.category }}</span>
          <span class="badge src" v-if="q.source">📄 {{ q.source }}</span>
          <span class="q-no">#{{ q.id }}</span>
          <button class="star-btn" :class="{on: q.starred}" @click="toggleStar(q)" title="星标收藏">⭐</button>
        </div>
        <div class="q-text">{{ q.question }}</div>
        <div v-if="q.options && q.options.length" class="bank-opts">
          <span v-for="(opt, i) in q.options" :key="i" class="bank-opt">{{ KEYS[i] }}. {{ opt }}</span>
        </div>
        <div class="bank-actions">
          <button class="btn small" @click="startWithQuestions([q])">▶ 单题开练</button>
          <button class="btn ghost small" @click="openNote(q)">📝 笔记</button>
        </div>
        <div v-if="noteFor === q.id" class="note-box">
          <textarea class="ta" v-model="noteDraft" placeholder="写点笔记（Markdown 纯文本），参与题库搜索…"></textarea>
          <div class="note-actions">
            <button class="btn small green" @click="saveNote(q)">保存笔记</button>
            <button class="btn ghost small" @click="noteFor = 0">收起</button>
          </div>
        </div>
      </div>

      <div class="q-card" v-if="bankSearched && bankResults.length > 1">
        <div class="bank-actions">
          <button class="btn big" @click="startWithQuestions(bankResults)">🎯 以这 {{ bankResults.length }} 道搜索结果为范围开练</button>
        </div>
      </div>
    </div>

    <!-- ============ 训练设置页 ============ -->
    <div v-else-if="screen==='setup'">
      <div class="mode-grid v3">
        <div v-for="m in MODES" :key="m.key" class="mode-card" :class="{active: trainMode===m.key}" @click="trainMode=m.key">
          <div class="mode-icon">{{ m.icon }}</div>
          <div class="mode-name">{{ m.name }}<span v-if="m.key==='wrong' && wrongTotal" class="mode-count">{{ wrongTotal }}</span><span v-if="m.key==='starred' && starredTotal" class="mode-count star">{{ starredTotal }}</span></div>
          <div class="mode-desc">{{ m.desc }}</div>
        </div>
      </div>

      <div class="q-card setup-card">
        <!-- 专项训练：知识点 chips -->
        <div v-if="trainMode==='category'" class="setup-col">
          <div class="setup-label">选择知识点分类（含掌握度）：</div>
          <div class="chip-cloud">
            <button v-for="c in categoryChips" :key="c.name" class="chip"
                    :class="[{active: categorySel===c.name}, masteryClass(c.rate)]"
                    @click="pickCategory(c.name)">
              {{ c.name }} · {{ c.count }}题<template v-if="c.rate!==null"> · 掌握{{ c.rate }}%</template>
            </button>
          </div>
        </div>

        <!-- 文档训练：来源 chips -->
        <div v-if="trainMode==='source'" class="setup-col">
          <div class="setup-label">选择文档题集：</div>
          <div class="chip-cloud" v-if="sources.length">
            <button v-for="s in sources" :key="s.name" class="chip"
                    :class="[{active: sourceSel===s.name}, masteryClass(s.rate)]"
                    @click="pickSource(s.name)">
              📄 {{ s.name }} · {{ s.count }}题<template v-if="s.rate!==null"> · 掌握{{ s.rate }}%</template>
            </button>
          </div>
          <div class="empty" v-else>还没有文档题集，去「导入题库」上传一份 MD 题库吧</div>
        </div>

        <!-- 错题重练 -->
        <div v-if="trainMode==='wrong'" class="setup-col">
          <div class="setup-label">错题本共 <b>{{ wrongTotal }}</b> 题，答对后自动移出。</div>
          <div class="count-chips">
            <button class="chip" :class="{active: wrongCount==='all'}" @click="wrongCount='all'">全部</button>
            <button v-for="n in [5,10,20]" :key="n" class="chip" :class="{active: wrongCount===n}" @click="wrongCount=n">{{ n }} 题</button>
            <button class="chip static" style="margin-left:auto" @click="clearWrongbook">🗑 清空错题本</button>
          </div>
        </div>

        <!-- 星标收藏 -->
        <div v-if="trainMode==='starred'" class="setup-col">
          <div class="setup-label">已星标 <b>{{ starredTotal }}</b> 题。在题库页或答题回看里点 ⭐ 可收藏重点题。</div>
        </div>

        <!-- 考试模式：蓝图配置 -->
        <div v-if="trainMode==='exam'" class="setup-col">
          <div class="setup-label">① 考试范围：</div>
          <div class="chip-cloud">
            <button class="chip" :class="{active: examSource==='all'}" @click="examSource='all'">📚 全部题库</button>
            <button v-for="s in sources" :key="s.name" class="chip"
                    :class="{active: examSource===s.name}" @click="examSource=s.name">
              📄 {{ s.name }} · {{ s.count }}题
            </button>
          </div>
          <div class="setup-label">② 各题型数量：</div>
          <div class="blueprint-grid">
            <div class="bp-row" v-for="t in [['choice','选择题'],['blank','填空题'],['short','简答题'],['practical','实操题']]" :key="t[0]">
              <span class="bp-name">{{ t[1] }}</span>
              <div class="count-chips">
                <button v-for="n in [0,5,10,15,20]" :key="n" class="chip sm"
                        :class="{active: examCounts[t[0]]===n}" @click="examCounts[t[0]]=n">{{ n === 0 ? '不考' : n + ' 题' }}</button>
              </div>
            </div>
          </div>
          <div class="setup-label">③ 限时：</div>
          <div class="count-chips">
            <button class="chip" :class="{active: examMinutes===0}" @click="examMinutes=0">自动（题数×90秒）</button>
            <button v-for="n in [10,20,30,45,60]" :key="n" class="chip" :class="{active: examMinutes===n}" @click="examMinutes=n">{{ n }} 分钟</button>
          </div>
          <div class="bp-summary">本场蓝图：共 <b>{{ examPlanCount }}</b> 题 · 限时 <b>{{ examPlanTime }}</b> · 考中不显示答案，到时自动交卷</div>
          <div class="exam-history" v-if="examHistory && examHistory.count">
            <div class="setup-label">📊 考试成绩（最高 {{ examHistory.best }} 分 · 平均 {{ examHistory.avg }} 分）：</div>
            <div class="exam-hist-list">
              <div v-for="h in examHistory.recent" :key="h.id" class="exam-hist-row">
                <span class="eh-score" :class="h.score >= 80 ? 'good' : (h.score >= 60 ? 'mid' : 'bad')">{{ h.score }}分</span>
                <span class="eh-meta">{{ h.total }} 题 · {{ h.graded }} 判分对 {{ h.correct }} · 用时 {{ fmtTime(h.duration_s) }}</span>
                <span class="eh-time">{{ (h.finished_at || '').slice(0, 16).replace('T', ' ') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="setup-row" v-if="trainMode!=='exam'">
          <label>题型：</label>
          <select v-model="qtype">
            <option value="all">全部题型</option>
            <option value="choice">选择题（{{ (stats.by_type||{})['选择题'] || 0 }}）</option>
            <option value="blank">填空题（{{ (stats.by_type||{})['填空题'] || 0 }}）</option>
            <option value="short">简答题（{{ (stats.by_type||{})['简答题'] || 0 }}）</option>
            <option value="practical">实战操作题（{{ (stats.by_type||{})['实战操作题'] || 0 }}）</option>
          </select>
          <label v-if="trainMode==='random'">抽取数量：</label>
          <div class="count-chips" v-if="trainMode==='random'">
            <button v-for="n in [5,10,20,30]" :key="n" class="chip" :class="{active: randCount===n}" @click="randCount=n">{{ n }} 题</button>
          </div>
          <label v-if="['all','category','source'].includes(trainMode)" class="checkbox-row">
            <input type="checkbox" v-model="shuffle"> 打乱顺序
          </label>
          <label v-if="trainMode!=='exam'" class="checkbox-row">
            <input type="checkbox" v-model="instantMode"> 逐题判分
          </label>
        </div>
        <div class="setup-row">
          <button class="btn big" :class="{exam: trainMode==='exam'}" :disabled="loading" @click="startQuiz">
            {{ loading ? (trainMode==='exam' ? '正在组卷…' : '正在出题…') : (trainMode==='exam' ? '🔔 开始考试 →' : '开始训练 →') }}
          </button>
        </div>
      </div>

      <div class="q-card stat-card">
        <div class="q-text" style="margin-bottom:8px">📊 题库概览</div>
        <div class="overall-line" v-if="overall.tried">
          <span>已练 <b>{{ overall.tried }}</b> / {{ overall.total }} 题</span>
          <span>累计作答 <b>{{ overall.attempts }}</b> 次</span>
          <span>总正确率 <b>{{ overall.rate === null ? '—' : overall.rate + '%' }}</b></span>
          <span>错题本 <b>{{ wrongTotal }}</b> 题</span>
        </div>
        <div class="stat-chips">
          <span class="chip static" v-for="(n, t) in stats.by_type||{}" :key="t">{{ t }} {{ n }}</span>
          <span class="chip static" v-for="s in sources" :key="s.name">📄 {{ s.name }} {{ s.count }}</span>
        </div>
      </div>
    </div>

    <!-- ============ 答题页 ============ -->
    <div v-else>
      <!-- 考试进行中：单题视图 + 答题卡 -->
      <template v-if="examActive">
        <div class="exam-topbar">
          <button class="btn ghost small" @click="abandonExam">← 放弃考试</button>
          <span class="exam-title">📝 {{ trainLabel }}</span>
          <span class="exam-clock" :class="{urgent: examTimeLeft <= 60}">⏱ {{ fmtTime(examTimeLeft) }}</span>
          <button class="btn small exam" :disabled="submitting" @click="doExamSubmit()">{{ submitting ? '判分中…' : '交卷 (Ctrl+Enter)' }}</button>
        </div>
        <div class="exam-body">
          <div class="answer-sheet">
            <div class="sheet-title">答题卡 · 已答 {{ answeredCount }}/{{ questions.length }}</div>
            <div class="sheet-grid">
              <button v-for="(q, i) in questions" :key="q.id" :class="gridCellClass(i)" @click="examGoto(i)">{{ i + 1 }}</button>
            </div>
            <div class="sheet-legend">
              <span><i class="lg cur"></i>当前</span><span><i class="lg done"></i>已答</span>
              <span><i class="lg flag"></i>标记</span><span><i class="lg"></i>未答</span>
            </div>
          </div>
          <div class="exam-main" v-if="examQ">
            <div class="q-card">
              <div class="q-head">
                <span class="badge" :class="examQ.type">{{ examQ.type_label }}</span>
                <span class="badge cat">{{ examQ.category }}</span>
                <span class="badge src" v-if="examQ.source">📄 {{ examQ.source }}</span>
                <span class="q-no">第 {{ examIdx + 1 }} 题 / 共 {{ questions.length }} 题</span>
                <button class="btn ghost small flag-btn" :class="{on: examFlagged[examQ.id]}" @click="examToggleFlag">🚩 {{ examFlagged[examQ.id] ? '已标记' : '标记' }} (F)</button>
              </div>
              <div class="q-text">{{ examQ.question }}</div>
              <div v-if="examQ.type === 'choice'">
                <div v-for="(opt, i) in examQ.options" :key="i">
                  <div class="opt" :class="optClass(examQ, KEYS[i])" @click="pick(examQ, KEYS[i])">
                    <span class="opt-key">{{ KEYS[i] }}</span>
                    <span>{{ opt }}</span>
                  </div>
                </div>
                <div class="kbd-hint">⌨ 快捷键：A-{{ KEYS[Math.max(0, examQ.options.length - 1)] }} 或 1-{{ examQ.options.length }} 选项 · ← → 切题 · F 标记 · Ctrl+Enter 交卷</div>
              </div>
              <div v-if="examQ.type === 'blank'">
                <div v-for="b in examQ.blanks" :key="b" class="blank-input">
                  <label>空格 {{ b }}：</label>
                  <input v-model="answers[examQ.id][b-1]" placeholder="请输入答案">
                </div>
              </div>
              <div v-if="examQ.type === 'short' || examQ.type === 'practical'">
                <textarea class="ta" v-model="answers[examQ.id]"
                          :placeholder="examQ.type === 'short' ? '请输入你的回答…' : '请写出命令或 YAML 清单…'"></textarea>
              </div>
            </div>
            <div class="exam-nav">
              <button class="btn ghost" :disabled="examIdx === 0" @click="examGoto(examIdx - 1)">← 上一题</button>
              <span class="exam-pos">{{ examIdx + 1 }} / {{ questions.length }}</span>
              <button class="btn" :disabled="examIdx >= questions.length - 1" @click="examGoto(examIdx + 1)">下一题 →</button>
            </div>
          </div>
        </div>
      </template>

      <!-- 练习模式 / 考试交卷后逐题回看 -->
      <template v-else>
      <div class="quiz-topbar">
        <button class="btn ghost small" @click="backToSetup">← 返回设置</button>
        <span class="quiz-meta">{{ trainLabel }}</span>
      </div>

      <div v-for="(q, idx) in visibleQuestions" :key="q.id" class="q-card">
        <div class="q-head">
          <span class="badge" :class="q.type">{{ q.type_label }}</span>
          <span class="badge cat">{{ q.category }}</span>
          <span class="badge src" v-if="q.source">📄 {{ q.source }}</span>
          <span class="q-no">第 {{ idx + 1 }} 题 / #{{ q.id }}</span>
          <button class="star-btn" :class="{on: q.starred}" @click="toggleStar(q)" title="星标收藏">⭐</button>
        </div>
        <div class="q-text">{{ q.question }}</div>

        <div v-if="q.type === 'choice'">
          <div v-for="(opt, i) in q.options" :key="i">
            <div class="opt" :class="optClass(q, KEYS[i])" @click="pick(q, KEYS[i])">
              <span class="opt-key">{{ KEYS[i] }}</span>
              <span>{{ opt }}</span>
            </div>
          </div>
        </div>

        <div v-if="q.type === 'blank'">
          <div v-for="b in q.blanks" :key="b" class="blank-input">
            <label>空格 {{ b }}：</label>
            <input v-model="answers[q.id][b-1]" :class="blankClass(q, b-1)"
                   :disabled="submitted || rDone[q.id]" placeholder="请输入答案">
          </div>
        </div>

        <div v-if="q.type === 'short' || q.type === 'practical'">
          <textarea class="ta" v-model="answers[q.id]" :disabled="submitted || rDone[q.id]"
                    :placeholder="q.type === 'short' ? '请输入你的回答…' : '请写出命令或 YAML 清单…'"></textarea>
        </div>

        <div v-if="instantMode && !submitted && !rDone[q.id] && !results[q.id]" class="instant-row">
          <button class="btn small" @click="submitOne(q)">⚡ 判此题</button>
        </div>

        <div v-if="isRevealed(q) && results[q.id]" class="feedback" :class="resultClass(q)">
          <div class="fb-title">{{ resultTitle(q) }}</div>
          <template v-if="q.type === 'choice'">
            <div>你的答案：{{ results[q.id].user_answer || '未作答' }} ｜ 正确答案：{{ results[q.id].correct_answer }}</div>
          </template>
          <template v-if="q.type === 'blank'">
            <div>正确答案：<span v-for="(a,i) in results[q.id].correct_answer" :key="i">第{{ i+1 }}空「{{ a }}」 </span></div>
          </template>
          <div v-if="q.type === 'short' || q.type === 'practical'" class="ref">
            参考答案：
{{ results[q.id].reference[0] }}
          </div>
          <div v-if="parseExpl(results[q.id].explanation)[0]">📖 解析：{{ parseExpl(results[q.id].explanation)[0] }}</div>
          <div v-if="parseExpl(results[q.id].explanation)[1]" class="derived">🌿 衍生知识点：{{ parseExpl(results[q.id].explanation)[1] }}</div>
          <span v-if="results[q.id].wrongbook" class="fb-tag">✗ 已记入错题本，可在「错题重练」中巩固</span>
          <span v-if="results[q.id].wrongbook_removed" class="fb-tag ok-tag">✓ 已从错题本移出</span>
          <div v-if="(q.type === 'short' || q.type === 'practical') && !selfJudge.hasOwnProperty(q.id)" class="self-judge">
            <button class="btn green" @click="judge(q, true)">我答对了</button>
            <button class="btn red" @click="judge(q, false)">我答错了</button>
          </div>
        </div>
      </div>

      <!-- 大题库渐进渲染：首屏挂载 RENDER_STEP 张，其余按需追加（题号仍连续） -->
      <div class="load-more" v-if="hasMore">
        <button class="btn ghost" @click="showMoreQuestions">
          加载更多（已显示 {{ visibleQuestions.length }} / {{ questions.length }} 题）
        </button>
      </div>

      <div class="footer-bar" v-if="questions.length">
        <div class="footer-inner">
          <div class="progress-wrap">
            <div class="progress"><div :style="{width: (answeredCount / questions.length * 100) + '%'}"></div></div>
            <div class="progress-text">已答 {{ answeredCount }} / {{ questions.length }} 题
              <template v-if="submitted"> · 客观题正确 {{ objectiveScore.c }}/{{ objectiveScore.n }} · 总分 {{ finalScore }} 分</template>
              <template v-else-if="instantMode"> · 逐题判分中，判过的题已计入统计</template>
            </div>
          </div>
          <button v-if="!submitted" class="btn" :disabled="submitting" @click="submitAll">
            {{ submitting ? '判分中…' : (instantMode ? '整卷交卷' : '交卷判分') }}
          </button>
          <button v-else class="btn ghost" @click="retryQuiz">重新作答</button>
          <button v-if="submitted" class="btn ghost" @click="nextBatch">{{ (trainMode==='random'||trainMode==='wrong'||trainMode==='starred'||shuffle) ? '换一批题' : '返回设置' }}</button>
        </div>
      </div>
      </template>

      <div class="mask" v-if="showResult" @click.self="showResult = false">
        <div class="modal">
          <h2>{{ examJustDone ? '🔔 考试结束' : '🎉 交卷成功' }}</h2>
          <div class="score">{{ examJustDone ? examScorePct : finalScore }}<span style="font-size:22px"> 分</span>
            <span v-if="examJustDone" class="score-sub">客观题得分率</span>
          </div>
          <div class="row" v-if="examJustDone">
            <span><b>{{ objectiveScore.c }} / {{ objectiveScore.n }}</b>客观题正确</span>
            <span><b>{{ fmtTime(examDuration - examTimeLeft) }}</b>用时</span>
            <span><b>{{ subjectiveTotal }}</b>主观题待自评</span>
          </div>
          <div class="row" v-else>
            <span><b>{{ objectiveScore.c }}</b>客观题正确</span>
            <span><b>{{ subjectiveCorrect }} / {{ subjectiveTotal }}</b>简答自评正确</span>
            <span><b>{{ questions.length }}</b>题目总数</span>
          </div>
          <div class="row wb-row">
            <span><b>+{{ (Object.values(results).filter(r=>r.wrongbook)||[]).length }}</b>新入错题本</span>
            <span><b>{{ (Object.values(results).filter(r=>r.wrongbook_removed)||[]).length }}</b>移出错题本</span>
          </div>
          <button class="btn" @click="showResult = false">查看逐题解析</button>
        </div>
      </div>
    </div>
  </div>
  `,
}).mount("#app");
