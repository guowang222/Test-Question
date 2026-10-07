/* 前后端分离配置：后端 API 地址
 *
 * 三种使用方式：
 * 1. 通过后端访问（推荐）：浏览器打开 http://127.0.0.1:8000
 *    —— 同源，API_BASE 留空 "" 即可（脚本会自动按协议处理）。
 * 2. 前端独立静态服务器：例如
 *      cd frontend && python -m http.server 5500
 *    打开 http://127.0.0.1:5500 —— 请把下面 API_BASE 改为 "http://127.0.0.1:8000"。
 * 3. 双击 index.html（file:// 打开）—— 脚本自动切换到默认后端 8000。
 */
window.API_BASE = window.API_BASE
  || (location.protocol === "file:" ? "http://127.0.0.1:8000" : "");
