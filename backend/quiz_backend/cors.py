"""零依赖 CORS 中间件：放行 /api/ 跨域访问。

用于前后端分离部署：前端可运行在独立静态服务器或 file:// 下
（file:// 的 Origin 为 null），直接调用本机 8000 端口的后端 API。
非 /api/ 路径不受影响。"""
from django.http import HttpResponse

ALLOW_METHODS = "GET, POST, OPTIONS"
ALLOW_HEADERS = "Content-Type, X-Requested-With"


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS" and request.path.startswith("/api/"):
            resp = HttpResponse(status=204)  # 预检请求直接应答
        else:
            resp = self.get_response(request)
        if request.path.startswith("/api/"):
            resp["Access-Control-Allow-Origin"] = "*"
            resp["Access-Control-Allow-Methods"] = ALLOW_METHODS
            resp["Access-Control-Allow-Headers"] = ALLOW_HEADERS
            resp["Access-Control-Max-Age"] = "86400"
        return resp
