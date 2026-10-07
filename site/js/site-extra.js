/* site-extra.js —— 纯静态版专属：本地数据管理面板
 *
 * 静态版的作答统计/笔记/星标/错题本/考试档案全在浏览器 localStorage 里，
 * 清缓存会丢、换设备不会跟着走，所以必须给用户一条明确的导出/导入路径。
 * Django 版没有这一层（数据在 SQLite 里），故此文件只被 site/index.html 引用。
 */
(function (global) {
  "use strict";

  var NS = "k8squiz.v1.";
  var KEYS = [NS + "stats", NS + "notes", NS + "stars", NS + "sessions", NS + "extra", NS + "seq"];

  function bytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
    return (n / 1024 / 1024).toFixed(2) + " MB";
  }
  function usage() {
    var total = 0;
    KEYS.forEach(function (k) {
      var v = global.localStorage.getItem(k);
      if (v) total += v.length * 2; // UTF-16，粗估
    });
    // localStorage 常见上限 5MB，部分浏览器 10MB
    var quota = 5 * 1024 * 1024;
    return { used: total, quota: quota, pct: Math.min(100, Math.round(total / quota * 100)) };
  }
  function toast(msg, isErr) {
    var el = document.createElement("div");
    el.textContent = msg;
    el.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);" +
      "padding:10px 18px;border-radius:8px;font-size:14px;z-index:9999;" +
      "box-shadow:0 4px 16px rgba(0,0,0,.18);color:#fff;background:" +
      (isErr ? "#c0392b" : "#27ae60") + ";max-width:80vw;text-align:center";
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function download(name, text) {
    var blob = new Blob([text], { type: "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 200);
  }

  function doExport() {
    try {
      var data = global.LocalStore.exportAll();
      var d = new Date();
      var stamp = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") +
                  String(d.getDate()).padStart(2, "0");
      download("k8s-quiz-备份-" + stamp + ".json", JSON.stringify(data, null, 2));
      toast("已导出：" + data.sessions.length + " 场考试记录");
    } catch (e) { toast("导出失败：" + e.message, true); }
  }

  function doImport(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var r = global.LocalStore.importAll(JSON.parse(reader.result));
        toast("导入成功：" + r.questions + " 道自导入题目");
        setTimeout(function () { global.location.reload(); }, 900);
      } catch (e) { toast("导入失败：" + e.message, true); }
    };
    reader.onerror = function () { toast("读取文件失败", true); };
    reader.readAsText(file, "utf-8");
  }

  function buildPanel() {
    var u = usage();
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<button id="kqz-btn" title="本地数据管理">⚙️</button>' +
      '<div id="kqz-panel" style="display:none">' +
      '  <h4>本地数据</h4>' +
      '  <p class="kqz-usage">已用 <b>' + bytes(u.used) + '</b> / 约 ' + bytes(u.quota) +
        '（' + u.pct + '%）</p>' +
      '  <p class="kqz-tip">统计、笔记、星标、错题本与考试档案都保存在本浏览器里。' +
        '清除浏览器数据会丢失，建议定期导出备份。</p>' +
      '  <div class="kqz-actions">' +
      '    <button id="kqz-exp" class="btn">⬇ 导出备份</button>' +
      '    <button id="kqz-imp" class="btn">⬆ 导入备份</button>' +
      '    <button id="kqz-clr" class="btn danger">清空本地数据</button>' +
      '  </div>' +
      '  <input type="file" id="kqz-file" accept=".json,application/json" style="display:none">' +
      '  <p class="kqz-ver">题库 ' + (global.QUIZ_DATA ? global.QUIZ_DATA.meta.count : 0) + ' 题（内置，只读）</p>' +
      '</div>';
    document.body.appendChild(wrap);

    var btn = document.getElementById("kqz-btn");
    var panel = document.getElementById("kqz-panel");
    var file = document.getElementById("kqz-file");
    btn.onclick = function () {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    };
    document.getElementById("kqz-exp").onclick = doExport;
    document.getElementById("kqz-imp").onclick = function () { file.click(); };
    file.onchange = function () {
      if (file.files && file.files[0]) doImport(file.files[0]);
      file.value = "";
    };
    document.getElementById("kqz-clr").onclick = function () {
      if (!confirm("确定清空本浏览器保存的全部学习数据吗？\n（统计/笔记/星标/错题本/考试档案/自导入题目，题库本体不受影响）\n此操作不可撤销，建议先导出备份。")) return;
      if (!confirm("再确认一次：真的要清空吗？")) return;
      try { global.LocalStore.resetAll(); toast("已清空本地数据"); setTimeout(function () { location.reload(); }, 800); }
      catch (e) { toast("清空失败：" + e.message, true); }
    };

    var s = document.createElement("style");
    s.textContent = [
      '#kqz-btn{position:fixed;right:14px;bottom:14px;width:40px;height:40px;border-radius:50%;',
      'border:1px solid #dfe4ea;background:#fff;font-size:17px;cursor:pointer;z-index:9998;',
      'box-shadow:0 2px 10px rgba(0,0,0,.12)}',
      '#kqz-btn:hover{background:#f2f6fa}',
      '#kqz-panel{position:fixed;right:14px;bottom:62px;width:290px;background:#fff;z-index:9998;',
      'border:1px solid #dfe4ea;border-radius:10px;padding:14px 16px;',
      'box-shadow:0 6px 24px rgba(0,0,0,.14);font-size:13px;color:#2c3e50}',
      '#kqz-panel h4{margin:0 0 8px;font-size:14px}',
      '#kqz-panel p{margin:6px 0;line-height:1.6}',
      '.kqz-tip{color:#7f8c8d;font-size:12px}',
      '.kqz-ver{color:#95a5a6;font-size:12px}',
      '.kqz-actions{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}',
      '#kqz-panel .btn{padding:6px 10px;font-size:12px;cursor:pointer}',
      '#kqz-panel .btn.danger{color:#c0392b;border-color:#f0c4bf}',
    ].join("");
    document.head.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPanel);
  } else {
    buildPanel();
  }
})(window);