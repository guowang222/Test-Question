/* md-import.js —— 《测试题》+《答案解析》两个 Markdown 的解析器
 *
 * 这是 backend/quizapp/md_import.py 的逐行对应实现（154 行 Python 的 JS 移植），
 * 用于「纯静态版」（GitHub Pages）没有后端时的本地导入。
 *
 * 移植原则：**严格对齐，不做"顺手优化"**，包括以下容易出错的细节：
 *   - Python str.strip() 会去掉全角空格 U+3000，JS trim() 也包含（ES WhiteSpace）✓
 *   - Python re.split(r"　\s*") 中 \s 在 Unicode 模式下含 U+3000，JS 的 \s 同样含 ✓
 *   - Python str.replace(x, "", 1) 只替换**第一次**，JS replace(searchStr, "") 语义相同 ✓
 *   - Python str.lstrip(chars) 按**字符集合**剥离，JS 用正则字符类 [chars]+ ✓
 *   - Python str.rstrip() 同样按空白剥离，JS replace(/\s+$/, "") ✓
 *   - NUM_RE 用 re.match（从头匹配），JS 无 m 标志的 ^ 等价 ✓
 *   - 注意 `practical` 分支**不检查**题干是否为空，而 blank/short 检查——
 *     这个不对称是原实现的行为（编号行即新题），照搬不改。
 *
 * 回归验证见 scripts/test_static_logic.js：与 Python 版对拍同一批 MD 文件。
 */
(function (global) {
  "use strict";

  var QUESTION_SECTIONS = [
    ["一、选择题", "choice"],
    ["二、填空题", "blank"],
    ["三、简答题", "short"],
    ["四、实战操作题", "practical"],
  ];
  var ANSWER_SECTIONS = [
    ["一、选择题答案", "choice"],
    ["二、填空题答案", "blank"],
    ["三、简答题参考答案", "short"],
    ["四、实战操作题参考答案", "practical"],
  ];

  var NUM_RE = /^(\d+)[.、]\s*(.*)$/;
  var OPT_RE = /^([A-F])[.、]\s*(.*)$/;

  /* Python str.splitlines() 的近似切分：覆盖 \r\n \r \n 以及
     Python 会切、JS \s 也会切的那几个 Unicode 行边界（\v \f NEL U+2028 U+2029）。
     必须用 new RegExp 构造——U+2028/U+2029 是 JS 的行分隔符，
     直接写进正则字面量会把源码截断（SyntaxError: missing /）。 */
  var LINES_RE = new RegExp("\\r\\n|[\\n\\r\\v\\f\\u0085\\u2028\\u2029]");

  function splitLines(text) {
    return String(text).split(LINES_RE);
  }

  function rstrip(s) {
    return String(s).replace(/\s+$/, "");
  }

  function lstripChars(s, chars) {
    return String(s).replace(new RegExp("^[" + chars + "]+"), "");
  }

  /* 按 '## 标记' 切分文档，返回 {题型: 该节内容}（按出现位置排序） */
  function splitSections(text, markers) {
    var found = [];
    for (var i = 0; i < markers.length; i++) {
      var idx = String(text).indexOf("## " + markers[i][0]);
      if (idx >= 0) found.push([idx, markers[i][1]]);
    }
    found.sort(function (a, b) { return a[0] - b[0]; });
    var sections = {};
    for (var j = 0; j < found.length; j++) {
      var end = j + 1 < found.length ? found[j + 1][0] : text.length;
      sections[found[j][1]] = text.slice(found[j][0], end);
    }
    return sections;
  }

  function newOut() {
    return { choice: [], blank: [], short: [], practical: [] };
  }

  /* ---------- 题目侧 ---------- */
  function parseQuestionMd(text) {
    var sections = splitSections(text, QUESTION_SECTIONS);
    var out = newOut();

    /* 选择题：编号行 = 题干（可多行），随后的 "- A. xx　B. xx" 行 = 选项 */
    (function () {
      var lines = splitLines(sections.choice || "");
      var cur = null;
      for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        var m = NUM_RE.exec(s);
        if (m) {
          cur = { type: "choice", question: m[2].trim(), options: [] };
          out.choice.push(cur);
        } else if (s.indexOf("- ") === 0 && cur !== null) {
          var parts = s.slice(2).trim().split(/　\s*/);
          for (var p = 0; p < parts.length; p++) {
            var om = OPT_RE.exec(parts[p].trim());
            if (om) cur.options.push(om[2].trim());
          }
        } else if (cur !== null && s) {
          cur.question += "\n" + rstrip(lines[i]); // 题干续行（保留缩进的代码片段）
        }
      }
    })();

    /* 填空 / 简答：编号行 + 续行即题目（支持多行题干，保留缩进） */
    ["blank", "short"].forEach(function (t) {
      var lines = splitLines(sections[t] || "");
      var cur = null;
      for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        var m = NUM_RE.exec(s);
        if (m && m[2].trim()) {
          cur = { type: t, question: m[2].trim() };
          out[t].push(cur);
        } else if (cur !== null && s) {
          cur.question += "\n" + rstrip(lines[i]);
        }
      }
    });

    /* 实操：编号行 + 后续内容（代码块等）直到下一个编号 */
    (function () {
      var lines = splitLines(sections.practical || "");
      var cur = null;
      for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        var m = NUM_RE.exec(s);
        if (m) {
          if (cur) out.practical.push(cur);
          cur = { type: "practical", question: m[2].trim() };
        } else if (cur !== null && s) {
          cur.question += "\n" + rstrip(lines[i]);
        }
      }
      if (cur) out.practical.push(cur);
    })();

    return out;
  }

  /* ---------- 答案侧 ---------- */
  function parseAnswerMd(text) {
    var sections = splitSections(text, ANSWER_SECTIONS);
    var ans = { choice: {}, blank: {}, short: {}, practical: {} };

    /* 选择题：Markdown 表格 | 题号 | 答案 | 解析 | */
    splitLines(sections.choice || "").forEach(function (line) {
      var s = line.trim();
      if (s.indexOf("|") !== 0) return;
      var parts = s.replace(/^\|+/, "").replace(/\|+$/, "").split("|").map(function (p) { return p.trim(); });
      if (parts.length >= 3 && /^\d+$/.test(parts[0])) {
        var letters = parts[1].split("").filter(function (c) { return "ABCDEF".indexOf(c) >= 0; });
        ans.choice[Number(parts[0])] = { answer: letters, explanation: parts[2].trim() };
      }
    });

    /* 填空题：编号行中 **答案1/答案2**；**答案3**。解析... */
    splitLines(sections.blank || "").forEach(function (line) {
      var s = line.trim();
      var m = NUM_RE.exec(s);
      if (!m) return;
      var num = Number(m[1]), rest = m[2];
      var bolds = [];
      var boldRe = /\*\*(.+?)\*\*/g, bm;
      while ((bm = boldRe.exec(rest)) !== null) bolds.push(bm[1]);
      var answerLists = bolds.map(function (b) {
        return b.split(/\s*\/\s*/).filter(function (x) { return x.trim(); }).map(function (x) { return x.trim(); });
      });
      var expl = rest;
      bolds.forEach(function (b) {
        expl = expl.replace("**" + b + "**", ""); // 只替换第一次，与 Python replace(.., 1) 一致
      });
      expl = lstripChars(expl, "。；;、， ").trim();
      ans.blank[num] = { answer: answerLists, explanation: expl };
    });

    /* 简答 / 实操：编号行 + 后续内容；去掉 **小标题**：；续行仅剥掉 3 空格列表标记，保留代码缩进 */
    ["short", "practical"].forEach(function (t) {
      var lines = splitLines(sections[t] || "");
      var curNum = null, buf = [];
      for (var i = 0; i < lines.length; i++) {
        var s = lines[i].trim();
        var m = NUM_RE.exec(s);
        if (m) {
          if (curNum !== null) ans[t][curNum] = { answer: buf.join("\n").trim() };
          curNum = Number(m[1]);
          buf = [m[2].replace(/^\*\*.+?\*\*[：:]\s*/, "")];
        } else if (curNum !== null && s) {
          var raw = rstrip(lines[i]);
          if (raw.indexOf("   ") === 0) raw = raw.slice(3); // 剥掉 Markdown 列表缩进，保留原有代码缩进
          buf.push(raw);
        }
      }
      if (curNum !== null) ans[t][curNum] = { answer: buf.join("\n").trim() };
    });

    return ans;
  }

  /* ---------- 合并 ---------- */
  function buildQuestions(qparsed, aparsed, category) {
    category = category || "MD导入";
    var items = [];
    var i, a;
    for (i = 0; i < qparsed.choice.length; i++) {
      a = aparsed.choice[i + 1];
      var q = qparsed.choice[i];
      if (!a || !q.options.length) continue;
      items.push({
        type: "choice", category: category, question: q.question,
        options: q.options, answer: a.answer, explanation: a.explanation,
      });
    }
    ["blank", "short", "practical"].forEach(function (t) {
      for (i = 0; i < qparsed[t].length; i++) {
        var qt = qparsed[t][i];
        var at = aparsed[t][i + 1];
        if (!at || !at.answer) continue;
        items.push({
          type: t, category: category, question: qt.question,
          options: [],
          answer: t === "blank" ? at.answer : [at.answer],
          explanation: at.explanation || "",
        });
      }
    });
    return items;
  }

  global.QuizMD = {
    parseQuestionMd: parseQuestionMd,
    parseAnswerMd: parseAnswerMd,
    buildQuestions: buildQuestions,
  };
})(typeof window !== "undefined" ? window : globalThis);