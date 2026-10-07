/* local-store.js —— 纯静态版的本地数据层（替代 Django 后端 14 个 API 端点）
 *
 * 设计要点：
 * 1. **只在这里**实现判分/统计/搜索逻辑，字段与字段名 1:1 对齐 backend/quizapp/views.py，
 *    保证同一份 app.js 在 Django 版与静态版下行为一致。
 * 2. 题库本体（只读）来自 window.QUIZ_DATA（由 scripts/export_site_data.py 生成）；
 *    用户产生的数据（作答统计/笔记/星标/错题本/考试档案/导入的新题）存 localStorage。
 * 3. 写入统一走 commit()，批量改动只在末尾落盘一次，避免逐题 setItem 卡顿。
 * 4. 导出的 submit()/gradeQuestions() 与后端 _grade() 逻辑等价，包括
 *    _norm() 的填空归一化和 wrongbook_removed（本次答对且原在错题本）标记。
 */
(function (global) {
  "use strict";

  var NS = "k8squiz.v1.";
  var K_STAT = NS + "stats";      // {qid: {attempts,correct_count,wrong_count,wrong_streak,in_wrongbook,last_correct,updated_at}}
  var K_NOTE = NS + "notes";      // {qid: "内容"}
  var K_STAR = NS + "stars";      // [qid]
  var K_SESS = NS + "sessions";   // [TrainingSession 字典]
  var K_EXTRA = NS + "extra";     // 本地导入的题目（追加在题库之后）
  var K_SEQ = NS + "seq";         // 自增 session_id
  var SESSION_CAP = 200;          // 考试档案上限，超出丢弃最旧的（后端只返回最近 10 场）

  var TYPE_LABELS = { choice: "选择题", blank: "填空题", short: "简答题", practical: "实战操作题" };
  var VALID_TYPES = ["choice", "blank", "short", "practical"];
  var TYPE_ORDER = ["choice", "blank", "short", "practical"]; // 后端 TYPE_CHOICES 顺序

  /* ---------------- 题库（只读 + 本地追加） ---------------- */
  /* 注意：**不要**在模块加载时就快照 window.QUIZ_DATA。
     那样只要 questions.data.js 的加载顺序稍晚于本文件（缓存命中、defer、测试里
     动态注入等），BASE 会被永久固定成空数组，且不报错——表现为「题库 0 题」这种
     极难定位的问题。这里改为每次通过 base() 惰性读取。 */
  function base() { return global.QUIZ_DATA || { questions: [] }; }

  var cache = null;

  function allQuestions() {
    if (!cache) {
      var extra = readJSON(K_EXTRA, []);
      var qs = base().questions || [];
      cache = extra.length ? qs.concat(extra) : qs;
    }
    return cache;
  }
  function invalidate() { cache = null; }

  /* ---------------- storage 封装 ---------------- */
  function readJSON(key, dflt) {
    try {
      var raw = global.localStorage.getItem(key);
      if (raw === null) return dflt;
      var v = JSON.parse(raw);
      return v === null || v === undefined ? dflt : v;
    } catch (e) { return dflt; }
  }
  function writeJSON(key, val) {
    try { global.localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) {
      // 配额超限：明确报错，别静默丢数据
      throw new Error("浏览器本地存储空间不足，请清理笔记/考试档案后重试");
    }
  }

  var state = null;
  function S() {
    if (!state) {
      state = {
        stats: readJSON(K_STAT, {}),
        notes: readJSON(K_NOTE, {}),
        stars: readJSON(K_STAR, []),
        sessions: readJSON(K_SESS, []),
        seq: readJSON(K_SEQ, 1),
      };
    }
    return state;
  }
  function commit(what) {
    var s = S();
    if (!what || what === "stat") writeJSON(K_STAT, s.stats);
    if (!what || what === "note") writeJSON(K_NOTE, s.notes);
    if (!what || what === "star") writeJSON(K_STAR, s.stars);
    if (!what || what === "session") writeJSON(K_SESS, s.sessions);
  }
  function nextSeq() { var s = S(); return s.seq++; }

  /* ---------------- 工具 ---------------- */
  function norm(s) {
    // 与后端 _norm() 等价：去首尾空白/全角空格、转小写、去尾部标点
    return String(s == null ? "" : s)
      .replace(/^[\s　]+|[\s　]+$/g, "")
      .toLowerCase()
      .replace(/[。，,.;；:：]+$/, "");
  }
  function hasText(s) { return String(s == null ? "" : s).trim() !== ""; }
  function isAnswered(type, raw) {
    if (raw === null || raw === undefined) return false;
    if (type === "choice") return String(raw).trim() !== "";
    if (type === "blank") {
      var vals = Array.isArray(raw) ? raw : [raw];
      return vals.some(function (v) { return String(v).trim() !== ""; });
    }
    return String(raw).trim() !== "";
  }
  function qDict(q, withAnswer) {
    var d = {
      id: q.id, type: q.type, type_label: TYPE_LABELS[q.type] || q.type,
      category: q.category || "", source: q.source || "",
      question: q.question, options: q.options || [],
      starred: S().stars.indexOf(q.id) >= 0,
    };
    if (q.type === "blank") d.blanks = (q.answer || []).length; // 只暴露空格数量，不暴露答案
    if (withAnswer) { d.answer = q.answer; d.explanation = q.explanation || ""; }
    return d;
  }
  function byId(id) {
    var qs = allQuestions();
    for (var i = 0; i < qs.length; i++) if (qs[i].id === id) return qs[i];
    return null;
  }
  /* 排序：与后端 Meta.ordering = ["order","id"] 一致 */
  function sorted(list) {
    return list.slice().sort(function (a, b) {
      var oa = a.order || 0, ob = b.order || 0;
      return oa !== ob ? oa - ob : a.id - b.id;
    });
  }
  function cmpOpt(o) { return { v: o == null ? 0 : o }; }

  /* 随机抽取 n 个（Fisher-Yates，与 SQL order_by("?") 语义等价：等概率无放回） */
  function sample(list, n) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr.slice(0, Math.max(0, n));
  }

  /* ---------------- 搜索（对齐 _keyword_filter：多词 AND，命中任一字段） ---------------- */
  function matchKw(q, kw) {
    var k = String(kw).toLowerCase();
    if (String(q.question || "").toLowerCase().indexOf(k) >= 0) return true;
    if (String(q.explanation || "").toLowerCase().indexOf(k) >= 0) return true;
    if (String(q.category || "").toLowerCase().indexOf(k) >= 0) return true;
    if (String(q.source || "").toLowerCase().indexOf(k) >= 0) return true;
    if (String(S().notes[q.id] || "").toLowerCase().indexOf(k) >= 0) return true;
    var opts = q.options || [];
    for (var i = 0; i < opts.length; i++) {
      if (String(opts[i]).toLowerCase().indexOf(k) >= 0) return true; // 对应后端 json_each 展开
    }
    return false;
  }
  function keywordFilter(list, kws) {
    var out = list;
    for (var i = 0; i < kws.length; i++) {
      var kw = kws[i];
      out = out.filter(function (q) { return matchKw(q, kw); });
    }
    return out;
  }

  /* ---------------- 端点实现 ---------------- */

  /** GET /api/stats/ */
  function stats() {
    var qs = allQuestions();
    var s = S();
    var byType = {}, byCategory = {}, bySource = {};
    var q, i;
    for (i = 0; i < qs.length; i++) {
      q = qs[i];
      var lbl = TYPE_LABELS[q.type] || q.type;
      byType[lbl] = (byType[lbl] || 0) + 1;
      var cat = q.category || "";
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      if (q.source) bySource[q.source] = (bySource[q.source] || 0) + 1;
    }
    var srcNames = Object.keys(bySource).sort(function (a, b) { return bySource[b] - bySource[a]; });
    var srcOrdered = {};
    srcNames.forEach(function (n) { srcOrdered[n] = bySource[n]; });

    function masteryOf(keyFn) {
      var acc = {}; // key -> {tried, attempts, correct}
      for (var id in s.stats) {
        if (!Object.prototype.hasOwnProperty.call(s.stats, id)) continue;
        var st = s.stats[id];
        if (!st || !st.attempts) continue;
        var qq = byId(Number(id));
        if (!qq) continue;
        var key = keyFn(qq);
        if (!acc[key]) acc[key] = { tried: 0, attempts: 0, correct: 0 };
        acc[key].tried += 1;
        acc[key].attempts += st.attempts || 0;
        acc[key].correct += st.correct_count || 0;
      }
      return acc;
    }
    var catM = masteryOf(function (x) { return x.category || ""; });
    var srcM = masteryOf(function (x) { return x.source || ""; });
    function merge(total, m) {
      m = m || { tried: 0, attempts: 0, correct: 0 };
      return {
        total: total, tried: m.tried, attempts: m.attempts, correct: m.correct,
        rate: m.attempts ? Math.round(m.correct / m.attempts * 1000) / 10 : null,
      };
    }

    var agg = { tried: 0, attempts: 0, correct: 0 }, wb = 0;
    for (var k in s.stats) {
      if (!Object.prototype.hasOwnProperty.call(s.stats, k)) continue;
      var t = s.stats[k];
      if (!t) continue;
      if (t.in_wrongbook) wb += 1;
      if (t.attempts) { agg.tried += 1; agg.attempts += t.attempts; agg.correct += t.correct_count || 0; }
    }

    var byCatMastery = {}, bySrcMastery = {};
    Object.keys(byCategory).forEach(function (c) { byCatMastery[c] = merge(byCategory[c], catM[c]); });
    Object.keys(srcOrdered).forEach(function (x) { bySrcMastery[x] = merge(srcOrdered[x], srcM[x]); });

    return {
      total: qs.length,
      starred: s.stars.length,
      by_type: byType,
      by_category: byCategory,
      by_source: srcOrdered,
      wrongbook: wb,
      overall: {
        total: qs.length, tried: agg.tried, attempts: agg.attempts, correct: agg.correct,
        rate: agg.attempts ? Math.round(agg.correct / agg.attempts * 1000) / 10 : null,
      },
      category_mastery: byCatMastery,
      source_mastery: bySrcMastery,
    };
  }

  /** GET /api/sources/ */
  function sources() {
    var st = stats();
    var out = [];
    Object.keys(st.by_source).forEach(function (n) {
      var m = st.source_mastery[n] || {};
      out.push({ name: n, count: st.by_source[n], total: st.by_source[n],
                 tried: m.tried || 0, attempts: m.attempts || 0,
                 correct: m.correct || 0, rate: m.rate === undefined ? null : m.rate });
    });
    return { sources: out };
  }

  /** GET /api/questions/?... */
  function questionList(params) {
    var qs = allQuestions();
    var t = params.get("type");
    var c = params.get("category");
    var src = params.get("source");
    if (t && VALID_TYPES.indexOf(t) >= 0) qs = qs.filter(function (q) { return q.type === t; });
    if (c && c !== "all") qs = qs.filter(function (q) { return q.category === c; });
    if (src && src !== "all") qs = qs.filter(function (q) { return q.source === src; });

    var mode = params.get("mode") || "all";
    var s = S();
    if (mode === "wrong") {
      var wids = {};
      for (var id in s.stats) {
        if (Object.prototype.hasOwnProperty.call(s.stats, id) && s.stats[id] && s.stats[id].in_wrongbook) {
          wids[id] = s.stats[id].updated_at || 0;
        }
      }
      qs = qs.filter(function (q) { return wids[q.id] !== undefined; });
    } else if (mode === "starred") {
      qs = qs.filter(function (q) { return s.stars.indexOf(q.id) >= 0; });
    }

    var kws = (params.get("q") || "").split(/\s+/).filter(Boolean);
    if (kws.length) qs = keywordFilter(qs, kws);

    var total;
    if (mode === "wrong") {
      // -stat__updated_at
      qs = qs.slice().sort(function (a, b) {
        var ta = (s.stats[a.id] || {}).updated_at || 0, tb = (s.stats[b.id] || {}).updated_at || 0;
        return tb - ta;
      });
    } else if (mode === "starred") {
      qs = qs.slice().sort(function (a, b) { return b.id - a.id; });
    } else if (mode === "random") {
      qs = sample(qs, qs.length);
    } else {
      qs = sorted(qs);
    }

    var n = toInt(params.get("count")) || toInt(params.get("limit")) || 0;
    var offset = toInt(params.get("offset")) || 0;
    var paged = n > 0 || offset > 0;
    total = (paged || kws.length || mode === "random") ? qs.length : qs.length;

    var page = n > 0 ? qs.slice(offset, offset + n)
              : offset > 0 ? qs.slice(offset)
              : qs;
    return {
      count: page.length,
      total: total,
      questions: page.map(function (q) { return qDict(q, false); }),
    };
  }

  function toInt(v) { var n = parseInt(v, 10); return isNaN(n) ? null : n; }

  /* 统计更新（等价后端 QuestionStat.apply_result，纯内存） */
  function touchStat(qid, correct, now) {
    var s = S();
    var st = s.stats[qid];
    if (!st) {
      st = s.stats[qid] = { attempts: 0, correct_count: 0, wrong_count: 0,
                            wrong_streak: 0, in_wrongbook: false, last_correct: null, updated_at: 0 };
    }
    var wasIn = !!st.in_wrongbook;
    st.attempts += 1;
    if (correct) {
      st.correct_count += 1;
      st.wrong_streak = 0;
      st.in_wrongbook = false;
    } else {
      st.wrong_count += 1;
      st.wrong_streak += 1;
      st.in_wrongbook = true;
    }
    st.last_correct = correct;
    st.updated_at = now; // 用题号无关的单调时间戳，保证同一批内顺序稳定
    return { st: st, removed: wasIn && correct };
  }

  /**
   * 判分核心，等价后端 _grade()。返回 {results, summary}。
   * qs 已按 (order,id) 排好；只判已作答的题。
   */
  function gradeQuestions(qs, answers, now) {
    var s = S();
    var results = [];
    var objGraded = 0, objCorrect = 0, subj = 0, unanswered = 0;
    var dirty = false;

    for (var i = 0; i < qs.length; i++) {
      var q = qs[i];
      var raw = Object.prototype.hasOwnProperty.call(answers, String(q.id))
        ? answers[String(q.id)] : answers[q.id];
      if (!isAnswered(q.type, raw)) { unanswered += 1; continue; }
      var base = { id: q.id, type: q.type, explanation: q.explanation || "" };

      if (q.type === "choice") {
        var ua = String(raw).trim().toUpperCase();
        var ans = q.answer || [];
        var ca = ans.length ? String(ans[0]).trim().toUpperCase() : "";
        var ok = !!ua && ua === ca;
        var t1 = touchStat(q.id, ok, now + i * 0.001); dirty = true;
        results.push(Object.assign({}, base, {
          correct: ok, user_answer: ua, correct_answer: ca,
          wrongbook: !ok, wrongbook_removed: t1.removed,
        }));
        objGraded += 1; objCorrect += ok ? 1 : 0;

      } else if (q.type === "blank") {
        var given = Array.isArray(raw) ? raw : (hasText(raw) ? [raw] : []);
        var ansList = q.answer || [];
        var detail = [], okAll = true;
        for (var b = 0; b < ansList.length; b++) {
          var accepted = Array.isArray(ansList[b]) ? ansList[b] : [ansList[b]];
          var g = b < given.length ? String(given[b]) : "";
          var hit = false;
          for (var a2 = 0; a2 < accepted.length; a2++) {
            if (norm(g) === norm(accepted[a2])) { hit = true; break; }
          }
          detail.push({ ok: hit, given: g, accepted: accepted.slice() });
          okAll = okAll && hit;
        }
        var t2 = touchStat(q.id, okAll, now + i * 0.001); dirty = true;
        results.push(Object.assign({}, base, {
          correct: okAll, blank_detail: detail,
          correct_answer: ansList.map(function (x) { return Array.isArray(x) ? (x[0] || "") : (x || ""); }),
          wrongbook: !okAll, wrongbook_removed: t2.removed,
        }));
        objGraded += 1; objCorrect += okAll ? 1 : 0;

      } else { // short / practical：前端自评后走 /api/feedback/
        subj += 1;
        results.push(Object.assign({}, base, {
          correct: null, reference: (q.answer || []).slice(),
        }));
      }
    }
    if (dirty) commit("stat");
    return {
      results: results,
      summary: {
        total_graded: objGraded,
        total_correct: objCorrect,
        score_pct: objGraded ? Math.round(objCorrect / objGraded * 1000) / 10 : 0,
        subjective_count: subj,
        unanswered: unanswered,
        wrongbook_added: results.filter(function (r) { return r.wrongbook; }).length,
        wrongbook_removed: results.filter(function (r) { return r.wrongbook_removed; }).length,
      },
    };
  }

  function nowTs() { return Date.now(); }

  /** POST /api/submit/ */
  function submit(body) {
    var answers = (body && body.answers) || {};
    if (typeof answers !== "object" || Array.isArray(answers)) throw httpErr(400, "answers 必须是对象");
    var ids = Object.keys(answers).map(function (k) { return Number(k); })
      .filter(function (n) { return !isNaN(n); });
    var picked = {};
    ids.forEach(function (id) { var q = byId(id); if (q) picked[id] = q; });
    var qs = sorted(Object.keys(picked).map(function (k) { return picked[k]; }));
    return gradeQuestions(qs, answers, nowTs());
  }

  /** POST /api/star/ */
  function star(body) {
    var q = byId(Number(body.id));
    if (!q) throw httpErr(404, "题目不存在");
    var s = S();
    var idx = s.stars.indexOf(q.id);
    var want = Object.prototype.hasOwnProperty.call(body, "starred") ? !!body.starred : idx < 0;
    if (want && idx < 0) s.stars.push(q.id);
    if (!want && idx >= 0) s.stars.splice(idx, 1);
    commit("star");
    return { id: q.id, starred: want, starred_total: s.stars.length };
  }

  /** GET/POST /api/note/ */
  function noteGet(id) {
    if (id === null) return { id: null, content: "" };
    return { id: id, content: S().notes[id] || "" };
  }
  function notePost(body) {
    var q = byId(Number(body.id));
    if (!q) throw httpErr(404, "题目不存在");
    var s = S();
    var content = String(body.content || "");
    if (content.trim()) s.notes[q.id] = content; else delete s.notes[q.id];
    commit("note");
    return { id: q.id, content: content };
  }

  /** GET/POST /api/wrongbook/ */
  function wrongbookGet(params) {
    var s = S();
    var qs = allQuestions().filter(function (q) {
      var st = s.stats[q.id];
      return st && st.in_wrongbook;
    });
    var kws = (params.get("q") || "").split(/\s+/).filter(Boolean);
    if (kws.length) qs = keywordFilter(qs, kws);
    qs = qs.slice().sort(function (a, b) {
      var ta = (s.stats[a.id] || {}).updated_at || 0, tb = (s.stats[b.id] || {}).updated_at || 0;
      return tb - ta;
    });
    return {
      count: qs.length,
      questions: qs.map(function (q) {
        var st = s.stats[q.id] || {};
        var d = qDict(q, false);
        d.attempts = st.attempts || 0;
        d.wrong = st.wrong_count || 0;
        d.wrong_streak = st.wrong_streak || 0;
        return d;
      }),
    };
  }
  function wrongbookPost(body) {
    var s = S();
    var total = 0, id;
    for (id in s.stats) {
      if (Object.prototype.hasOwnProperty.call(s.stats, id) && s.stats[id] && s.stats[id].in_wrongbook) total += 1;
    }
    if (body.action === "clear") {
      var cleared = 0;
      for (id in s.stats) {
        if (Object.prototype.hasOwnProperty.call(s.stats, id) && s.stats[id] && s.stats[id].in_wrongbook) {
          s.stats[id].in_wrongbook = false;
          s.stats[id].wrong_streak = 0;
          cleared += 1;
        }
      }
      commit("stat");
      return { cleared: cleared, wrongbook: 0 };
    }
    if (body.action === "remove") {
      var st = s.stats[Number(body.id)];
      if (st && st.in_wrongbook) { st.in_wrongbook = false; st.wrong_streak = 0; total -= 1; }
      commit("stat");
      return { removed: 1, wrongbook: total };
    }
    throw httpErr(400, "未知操作，支持 remove / clear");
  }

  /** POST /api/feedback/ */
  function feedback(body) {
    if (body.id === undefined || typeof body.correct !== "boolean") {
      throw httpErr(400, "需要参数 id 与 correct(bool)");
    }
    var q = byId(Number(body.id));
    if (!q) throw httpErr(404, "题目不存在");
    var s = S();
    if (!s.stats[q.id]) {
      s.stats[q.id] = { attempts: 0, correct_count: 0, wrong_count: 0,
                        wrong_streak: 0, in_wrongbook: false, last_correct: null, updated_at: 0 };
    }
    var t = touchStat(q.id, body.correct, nowTs());
    commit("stat");
    var total = 0;
    for (var id in s.stats) {
      if (Object.prototype.hasOwnProperty.call(s.stats, id) && s.stats[id] && s.stats[id].in_wrongbook) total += 1;
    }
    return { in_wrongbook: t.st.in_wrongbook, wrongbook: total };
  }

  /* ---------------- 考试 ---------------- */
  function pickExam(source, counts) {
    var qs = allQuestions();
    if (source && source !== "all") qs = qs.filter(function (q) { return q.source === source; });
    var picked = [];
    TYPE_ORDER.forEach(function (t) {
      var pool = qs.filter(function (q) { return q.type === t; });
      picked = picked.concat(sample(pool, Number(counts[t] || 0)));
    });
    return picked;
  }

  /** POST /api/exam/start/ */
  function examStart(body) {
    var source = String(body.source || "all").trim();
    var counts = {};
    TYPE_ORDER.forEach(function (t) { counts[t] = toInt(body[t]) || 0; });
    var sum = TYPE_ORDER.reduce(function (a, t) { return a + counts[t]; }, 0);
    if (sum <= 0) throw httpErr(400, "请至少为一种题型配置题目数量");
    var minutes = toInt(body.minutes) || 0;

    var picked = pickExam(source, counts);
    if (!picked.length) throw httpErr(400, "该来源下可用题目不足，请调整蓝图");

    var s = S();
    var sid = nextSeq();
    var durationS = minutes > 0 ? minutes * 60 : picked.length * 90;
    var startedIso = new Date().toISOString();
    s.sessions.push({
      id: sid, mode: "exam",
      scope: { source: source, choice: counts.choice, blank: counts.blank,
               short: counts.short, practical: counts.practical,
               counts: counts, qids: picked.map(function (q) { return q.id; }) },
      total: picked.length, graded: 0, correct: 0, subjective: 0, score: 0,
      duration_s: 0, started_at: startedIso, finished_at: null,
    });
    if (s.sessions.length > SESSION_CAP) s.sessions = s.sessions.slice(-SESSION_CAP);
    commit("session"); writeJSON(K_SEQ, s.seq);

    var plan = { source: source };
    TYPE_ORDER.forEach(function (t) { plan[t] = counts[t]; });
    return {
      session_id: sid, duration_s: durationS, auto_timed: minutes <= 0,
      blueprint: plan, count: picked.length,
      questions: picked.map(function (q) { return qDict(q, false); }),
    };
  }

  /** POST /api/exam/submit/ */
  function examSubmit(body) {
    var s = S();
    var sess = null;
    for (var i = 0; i < s.sessions.length; i++) {
      if (s.sessions[i].id === Number(body.session_id) && s.sessions[i].mode === "exam") {
        sess = s.sessions[i]; break;
      }
    }
    if (!sess) throw httpErr(404, "考试会话不存在");
    if (sess.finished_at) throw httpErr(400, "该场考试已交卷");

    var answers = (body && typeof body.answers === "object" && body.answers) || {};
    var qids = sess.scope.qids || [];
    var map = {};
    qids.forEach(function (id) { var q = byId(id); if (q) map[id] = q; });
    var qs = sorted(Object.keys(map).map(function (k) { return map[k]; }));
    var out = gradeQuestions(qs, answers, nowTs());

    sess.graded = out.summary.total_graded;
    sess.correct = out.summary.total_correct;
    sess.subjective = out.summary.subjective_count;
    sess.score = out.summary.score_pct;
    sess.duration_s = toInt(body.duration_s) || 0;
    sess.finished_at = new Date().toISOString();
    commit("session");

    return { summary: out.summary, results: out.results, session: sess };
  }

  /** POST /api/exam/abandon/ */
  function examAbandon(body) {
    var s = S();
    var before = s.sessions.length;
    s.sessions = s.sessions.filter(function (x) {
      return !(x.id === Number(body.session_id) && x.mode === "exam" && !x.finished_at);
    });
    commit("session");
    return { abandoned: s.sessions.length !== before };
  }

  /** GET /api/exams/ */
  function exams() {
    var done = S().sessions.filter(function (x) { return x.mode === "exam" && x.finished_at; });
    var best = null, sum = 0;
    done.forEach(function (x) {
      if (best === null || x.score > best) best = x.score;
      sum += x.score;
    });
    var recent = done.slice().sort(function (a, b) {
      return a.started_at < b.started_at ? 1 : (a.started_at > b.started_at ? -1 : 0);
    }).slice(0, 10);
    return {
      count: done.length,
      best: best,
      avg: done.length ? Math.round(sum / done.length * 10) / 10 : null,
      recent: recent,
    };
  }

  /* ---------------- 导入 ---------------- */
  function normalizeImported(t, answer) {
    if (t === "choice") return answer ? [String(answer).trim().toUpperCase()] : [];
    if (t === "blank") {
      return (answer || []).map(function (b) { return Array.isArray(b) ? b : [b]; });
    }
    return typeof answer === "string" ? [answer] : (answer || []).slice();
  }

  function importItems(items, defaultCategory, source) {
    var src = String(source || defaultCategory).trim();
    var existing = Object.create(null);
    allQuestions().forEach(function (q) { existing[q.question] = true; });
    var seen = Object.create(null);
    var s = S();
    var extra = readJSON(K_EXTRA, []);
    var maxId = 0;
    extra.forEach(function (q) { if (q.id > maxId) maxId = q.id; });
    allQuestions().forEach(function (q) { if (q.id > maxId) maxId = q.id; });

    var added = [], skipped = 0;
    items.forEach(function (it) {
      if (!it || typeof it !== "object") return;
      var text = String(it.question || "").trim();
      if (!text || VALID_TYPES.indexOf(it.type) < 0) return;
      if (existing[text] || seen[text]) { skipped += 1; return; }
      seen[text] = true;
      maxId += 1;
      added.push({
        id: maxId, type: it.type,
        category: String(it.category || defaultCategory).trim(),
        source: src, question: text,
        options: it.options || [],
        answer: it.answer, explanation: it.explanation || "",
        order: 0,
      });
    });
    if (added.length) {
      extra = extra.concat(added);
      writeJSON(K_EXTRA, extra);
      invalidate();
    }
    s.stats = s.stats; // no-op，保持结构清晰
    return { added: added.length, skipped: skipped };
  }

  /** POST /api/import/json/ */
  function importJson(body) {
    var raw = body.questions;
    if (!Array.isArray(raw)) throw httpErr(400, "questions 必须是数组");
    var category = String(body.category || "JSON导入").trim();
    var source = String(body.source || "").trim() || category;
    var items = [];
    raw.forEach(function (it) {
      if (!it || typeof it !== "object") return;
      var t = it.type;
      if (VALID_TYPES.indexOf(t) < 0) return;
      items.push({
        type: t, category: it.category || category,
        question: it.question || "", options: it.options || [],
        answer: normalizeImported(t, it.answer),
        explanation: it.explanation || "",
      });
    });
    if (!items.length) throw httpErr(400, "没有可导入的题目");
    var r = importItems(items, category, source);
    return { added: r.added, skipped: r.skipped, parsed: items.length, source: source, category: category };
  }

  /** POST /api/import/md/（文件内容已在拦截器里读成字符串传进来） */
  function importMd(qtext, atext, category, source) {
    category = String(category || "MD导入").trim();
    source = String(source || "").trim() || category;
    if (!global.QuizMD) throw httpErr(500, "MD 解析器未加载");
    var items = global.QuizMD.buildQuestions(
      global.QuizMD.parseQuestionMd(qtext),
      global.QuizMD.parseAnswerMd(atext),
      category);
    if (!items.length) throw httpErr(400, "未从文件中解析出题目，请检查文件格式");
    var r = importItems(items, category, source);
    return { added: r.added, skipped: r.skipped, parsed: items.length, source: source, category: category };
  }

  function httpErr(status, msg) {
    var e = new Error(msg);
    e.status = status;
    e.isHttp = true;
    return e;
  }

  /* ---------------- 数据导出/导入（跨设备迁移） ---------------- */
  function exportAll() {
    var s = S();
    return {
      app: "k8s-quiz", version: 1, exported_at: new Date().toISOString(),
      stats: s.stats, notes: s.notes, stars: s.stars, sessions: s.sessions,
      extra: readJSON(K_EXTRA, []),
    };
  }
  function importAll(data) {
    if (!data || data.app !== "k8s-quiz") throw httpErr(400, "不是本应用导出的数据文件");
    var s = S();
    s.stats = data.stats || {};
    s.notes = data.notes || {};
    s.stars = data.stars || [];
    s.sessions = data.sessions || [];
    writeJSON(K_EXTRA, data.extra || []);
    invalidate();
    commit();
    return { ok: true, questions: (data.extra || []).length };
  }
  function resetAll() {
    var s = S();
    s.stats = {}; s.notes = {}; s.stars = []; s.sessions = [];
    try { global.localStorage.removeItem(K_EXTRA); } catch (e) { /* ignore */ }
    invalidate();
    commit();
    return { ok: true };
  }

  global.LocalStore = {
    stats: stats, sources: sources, questionList: questionList,
    submit: submit, star: star, noteGet: noteGet, notePost: notePost,
    wrongbookGet: wrongbookGet, wrongbookPost: wrongbookPost, feedback: feedback,
    examStart: examStart, examSubmit: examSubmit, examAbandon: examAbandon, exams: exams,
    importJson: importJson, importMd: importMd,
    exportAll: exportAll, importAll: importAll, resetAll: resetAll,
    _gradeQuestions: gradeQuestions, _norm: norm, _invalidate: invalidate,
    /* 仅供单测断言内部落库状态（后端无对应端点，UI 不用） */
    _raw: function () { return { stats: S().stats, notes: S().notes, stars: S().stars, sessions: S().sessions }; },
  };
})(typeof window !== "undefined" ? window : globalThis);