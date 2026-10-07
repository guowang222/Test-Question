import mimetypes
import re
from pathlib import Path

from django.http import FileResponse, Http404
from django.urls import path, re_path

from django.conf import settings

from quizapp import views

# 前端项目根目录（与 backend/ 平级），实现前后端文件夹分离
FRONTEND_DIR = (settings.BASE_DIR.parent / "frontend").resolve()

# 显式 content-type，避免 Windows 注册表 mimetypes 把 .js 判成 text/plain
CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
}


def frontend_file(request, path="index.html"):
    """serve frontend/ 目录下的静态文件（带目录穿越防护）。"""
    target = (FRONTEND_DIR / path).resolve()
    try:
        target.relative_to(FRONTEND_DIR.resolve())
    except ValueError:
        raise Http404
    if not target.is_file():
        raise Http404
    ctype = CONTENT_TYPES.get(target.suffix.lower()) \
        or mimetypes.guess_type(target.name)[0] \
        or "application/octet-stream"
    resp = FileResponse(target.open("rb"), content_type=ctype)
    resp["Cache-Control"] = "no-cache"  # 本地开发：改完即生效
    return resp


urlpatterns = [
    path("", frontend_file, {"path": "index.html"}),
    path("favicon.ico", frontend_file, {"path": "favicon.svg"}),
    # 题库 API
    path("api/questions/", views.question_list),
    path("api/submit/", views.submit),
    path("api/stats/", views.stats),
    path("api/sources/", views.sources),
    path("api/wrongbook/", views.wrongbook),
    path("api/feedback/", views.feedback),
    # 考试模式 API
    path("api/exam/start/", views.exam_start),
    path("api/exam/submit/", views.exam_submit),
    path("api/exam/abandon/", views.exam_abandon),
    path("api/exams/", views.exams),
    # 星标 / 笔记 API
    path("api/star/", views.star),
    path("api/note/", views.note),
    # 导入 API
    path("api/import/md/", views.import_md),
    path("api/import/json/", views.import_json),
    # 前端静态资源兜底（js/ css/ index.html 等，非 api 开头的全部交给前端目录）
    re_path(r"^(?!api/)(?P<path>.+)$", frontend_file),
]
