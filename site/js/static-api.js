/* static-api.js —— fetch 拦截器：把 /api/* 路由到 localStorage 数据层
 *
 * 这是「纯静态版」与「Django 版」共用同一份 app.js 的关键：
 * app.js 里 14 处 apiJson()/postJson() 调用**一行都不用改**，
 * 这里在 fetch 层把请求接住，本地算完再返回与后端同构的 JSON。
 *
 * 拦截范围仅限 /api/ 前缀；其它 fetch（题库 JSON 加载等）原样放行。
 */
(function (global) {
  "use strict";

  if (!global.LocalStore) throw new Error("static-api.js 需在 local-store.js 之后加载");
  var S = global.LocalStore;

  function jsonResponse(data, status) {
    return new Response(JSON.stringify(data), {
      status: status || 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
  function errResponse(e) {
    var status = e && e.status ? e.status : 500;
    var msg = e && e.message ? e.message : "内部错误";
    return new Response(JSON.stringify({ error: msg }), {
      status: status, headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  function parseBody(init) {
    if (!init || !init.body) return {};
    try { return JSON.parse(init.body); } catch (e) { return null; }
  }

  var nativeFetch = global.fetch ? global.fetch.bind(global) : null;

  async function handle(url, init) {
    var u = new URL(url, global.location ? global.location.href : "http://localhost/");
    var p = u.pathname;
    var method = (init && init.method ? init.method : "GET").toUpperCase();
    var params = u.searchParams;
    var body = null;

    if (method !== "GET") {
      body = parseBody(init);
      if (body === null) return jsonResponse({ error: "无效的 JSON" }, 400);
    }

    /* ---- 读接口 ---- */
    if (p === "/api/stats/")    return jsonResponse(S.stats());
    if (p === "/api/sources/")  return jsonResponse(S.sources());
    if (p === "/api/questions/") return jsonResponse(S.questionList(params));
    if (p === "/api/exams/")    return jsonResponse(S.exams());
    if (p === "/api/wrongbook/") {
      return method === "GET"
        ? jsonResponse(S.wrongbookGet(params))
        : jsonResponse(S.wrongbookPost(body));
    }
    if (p === "/api/note/") {
      if (method === "GET") {
        var raw = params.get("id");
        var id = raw === null ? null : parseInt(raw, 10);
        return jsonResponse(S.noteGet(isNaN(id) ? null : id));
      }
      return jsonResponse(S.notePost(body));
    }

    /* ---- 写接口 ---- */
    if (p === "/api/submit/")        return jsonResponse(S.submit(body));
    if (p === "/api/star/")          return jsonResponse(S.star(body));
    if (p === "/api/feedback/")      return jsonResponse(S.feedback(body));
    if (p === "/api/exam/start/")    return jsonResponse(S.examStart(body));
    if (p === "/api/exam/submit/")   return jsonResponse(S.examSubmit(body));
    if (p === "/api/exam/abandon/")  return jsonResponse(S.examAbandon(body));
    if (p === "/api/import/json/")   return jsonResponse(S.importJson(body));

    if (p === "/api/import/md/") {
      // body 是 FormData（浏览器 multipart），不在这里解析，交给 FileReader
      var fd = init.body;
      if (!fd || typeof fd.get !== "function") {
        return jsonResponse({ error: "请同时上传题目 MD 文件和答案解析 MD 文件" }, 400);
      }
      var qf = fd.get("question_file"), af = fd.get("answer_file");
      if (!qf || !af) {
        return jsonResponse({ error: "请同时上传题目 MD 文件和答案解析 MD 文件" }, 400);
      }
      var qtext = await qf.text(), atext = await af.text();
      return jsonResponse(S.importMd(qtext, atext, fd.get("category"), fd.get("source")));
    }

    return jsonResponse({ error: "静态版未实现该接口：" + method + " " + p }, 404);
  }

  global.fetch = function (input, init) {
    var url = typeof input === "string" ? input
            : (input && input.url ? input.url : String(input));
    if (url.indexOf("/api/") >= 0) {
      return handle(url, init || {}).catch(errResponse);
    }
    if (!nativeFetch) return Promise.reject(new Error("当前环境没有 fetch"));
    return nativeFetch(input, init);
  };
})(typeof window !== "undefined" ? window : globalThis);