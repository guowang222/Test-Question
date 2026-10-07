"""
Django settings for k8s 资源对象答题知识库.
前后端分离：backend 仅提供 JSON API；前端位于 ../frontend，
由 urls.py 直接 serve（也可用任意静态服务器独立部署，见 frontend/js/config.js）。
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def _env_bool(name, default):
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() not in ("0", "false", "no", "off", "")


# 本地单用户应用的默认值保持原样（开箱即用）；
# 部署到局域网/公网时用环境变量覆盖，避免把 DEBUG 与通配 HOST 带上线：
#   QUIZ_DEBUG=0 QUIZ_ALLOWED_HOSTS=192.168.1.10 QUIZ_SECRET_KEY=<随机串>
SECRET_KEY = os.environ.get("QUIZ_SECRET_KEY",
                            "k8s-quiz-local-secret-key-not-for-production")

DEBUG = _env_bool("QUIZ_DEBUG", True)

ALLOWED_HOSTS = [h.strip() for h in
                 os.environ.get("QUIZ_ALLOWED_HOSTS", "*").split(",") if h.strip()]

INSTALLED_APPS = [
    "quizapp",
]

MIDDLEWARE = [
    "quiz_backend.cors.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "quiz_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {"context_processors": []},
    },
]

WSGI_APPLICATION = "quiz_backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

LANGUAGE_CODE = "zh-hans"
TIME_ZONE = "Asia/Shanghai"
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
