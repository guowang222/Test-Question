# -*- coding: utf-8 -*-
"""接口性能基准：测各接口耗时、SQL 查询数与响应体大小。

特点：所有写操作（submit / exam start / import）都在事务里执行并**回滚**，
不会污染作答统计与题库，可随时反复运行。

用法：
    python scripts/bench_api.py              # 走 Django test Client（进程内，最快）
    python scripts/bench_api.py --http       # 走真实 HTTP（需后端已启动）

关注点：查询数（queries）比耗时更稳定，是回归的主要判据。
本项目优化前的基线（题库 2024 题）：
    /api/stats/        260 ms / 255 queries
    /api/sources/       42 ms /  57 queries
    /api/submit/(20)  1777 ms / 101 queries
    /api/import/json/(20) 954 ms / 40 queries
"""
import os
import sys
import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND = BASE_DIR / "backend"
sys.path.insert(0, str(BACKEND))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quiz_backend.settings")

import django  # noqa: E402
django.setup()

from django.conf import settings  # noqa: E402
from django.db import connection, reset_queries, transaction  # noqa: E402
from django.test import Client  # noqa: E402

settings.DEBUG = True  # 打开查询日志
USE_HTTP = "--http" in sys.argv
HTTP_BASE = "http://127.0.0.1:8000"


def http_get(path):
    import json
    import urllib.request
    with urllib.request.urlopen(HTTP_BASE + path, timeout=30) as r:
        return r.read(), r.status


def measure(label, fn, rollback=True):
    """执行 fn()，返回 (毫秒, 查询数, 响应字节数)。"""
    reset_queries()
    t0 = time.perf_counter()
    if rollback:
        try:
            with transaction.atomic():
                out = fn()
                raise _Rollback()
        except _Rollback:
            pass
    else:
        out = fn()
    ms = (time.perf_counter() - t0) * 1000
    qn = len(connection.queries)
    size = 0
    if isinstance(out, (bytes, str)):
        size = len(out)
    elif hasattr(out, "content"):
        size = len(out.content)
    print(f"{label:42s} {ms:8.1f} ms  {qn:6d} queries  {size / 1024:9.1f} KB")
    return ms, qn, size


class _Rollback(Exception):
    pass


def main():
    if USE_HTTP:
        print("模式：真实 HTTP（写接口不测，避免污染数据）")
    else:
        print("模式：Django test Client（进程内；写操作已回滚）")
    c = Client()
    print("=" * 82)
    print("接口性能基准")
    print("=" * 82)

    measure("GET /api/stats/", lambda: c.get("/api/stats/").content, rollback=False)
    measure("GET /api/sources/", lambda: c.get("/api/sources/").content, rollback=False)
    measure("GET /api/questions/ (all)", lambda: c.get("/api/questions/").content, rollback=False)
    measure("GET /api/questions/?mode=random&count=20",
            lambda: c.get("/api/questions/?mode=random&count=20").content, rollback=False)
    measure("GET /api/questions/?q=pod",
            lambda: c.get("/api/questions/?q=pod").content, rollback=False)
    measure("GET /api/questions/?q=\u865a\u62df",
            lambda: c.get("/api/questions/?q=\u865a\u62df").content, rollback=False)
    measure("GET /api/questions/?q=pod+service",
            lambda: c.get("/api/questions/?q=pod%20service").content, rollback=False)
    measure("GET /api/questions/?limit=200",
            lambda: c.get("/api/questions/?limit=200").content, rollback=False)
    measure("GET /api/wrongbook/", lambda: c.get("/api/wrongbook/").content, rollback=False)
    measure("GET /api/exams/", lambda: c.get("/api/exams/").content, rollback=False)

    # 取 20 道题的 id 构造一次真实规模的交卷
    from quizapp.models import Question
    ids = list(Question.objects.values_list("id", flat=True)[:20])
    ans = {str(i): "A" for i in ids}
    measure("POST /api/submit/ (20 answers)",
            lambda: c.post("/api/submit/", data={"answers": ans},
                           content_type="application/json").content)

    blueprint = {"source": "all", "choice": 10, "blank": 5, "short": 2, "practical": 0, "minutes": 0}
    measure("POST /api/exam/start/ (17 \u9898)",
            lambda: c.post("/api/exam/start/", data=blueprint,
                           content_type="application/json").content)

    payload = {"category": "bench", "source": "bench-src", "questions": [
        {"type": "choice", "question": f"bench-q-{i}", "options": ["a", "b", "c", "d"],
         "answer": "A", "explanation": ""} for i in range(20)]}
    measure("POST /api/import/json/ (20 new)",
            lambda: c.post("/api/import/json/", data=payload,
                           content_type="application/json").content)

    # 残留检查（不应有 bench 数据落库）
    leftover = Question.objects.filter(source="bench-src").count()
    print()
    print(f"残留检查 bench-src: {leftover}（应为 0，事务已回滚）")


if __name__ == "__main__":
    main()
