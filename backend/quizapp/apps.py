import os
import sys
import threading
import time

from django.apps import AppConfig

# 备份节奏：启动后立即备份一次，之后每 6 小时检查，距上次备份 ≥24 小时才再备份
CHECK_INTERVAL_S = 6 * 3600
BACKUP_PERIOD_S = 24 * 3600

_worker_started = False
_last_backup_ts = 0.0


def _backup_worker():
    global _last_backup_ts
    time.sleep(3)  # 等服务起来再备份，避免抢占启动
    from . import backup as bk

    # 启动即备份一次；失败则 10 分钟后重试
    try:
        bk.backup_now()
        _last_backup_ts = time.time()
    except Exception:
        _last_backup_ts = time.time() - BACKUP_PERIOD_S + 600
    while True:
        time.sleep(CHECK_INTERVAL_S)
        if time.time() - _last_backup_ts >= BACKUP_PERIOD_S:
            try:
                bk.backup_now()
                _last_backup_ts = time.time()
            except Exception:
                _last_backup_ts = time.time() - BACKUP_PERIOD_S + 600


class QuizappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "quizapp"
    verbose_name = "答题知识库"

    def ready(self):
        global _worker_started
        if _worker_started:
            return
        # runserver 自动重载会产生 watcher 主进程 + 服务子进程（RUN_MAIN=true），
        # 只在服务子进程（或 --noreload / 生产 WSGI 的单进程）里启动备份线程。
        is_reloader_parent = (
            os.environ.get("RUN_MAIN") != "true"
            and any(a.endswith("runserver") for a in sys.argv)
            and "--noreload" not in sys.argv
        )
        if is_reloader_parent:
            return
        _worker_started = True
        threading.Thread(target=_backup_worker, name="db-backup", daemon=True).start()
