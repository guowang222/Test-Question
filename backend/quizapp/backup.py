"""数据库自动备份（P1 工程化）。

使用 SQLite 在线 backup API 获取一致性快照（比直接复制文件更安全，
服务运行中备份也不会拿到写了一半的文件）。
- 备份位置：<db 同级目录>/backups/db-YYYYMMDD-HHMMSS.sqlite3
- 滚动保留：默认 7 份，超出自动删除最旧的
"""
import sqlite3
from datetime import datetime
from pathlib import Path


def backup_now(keep: int = 7) -> dict:
    """立即备份一次，返回备份信息；超出的旧备份按文件名滚动删除。"""
    from django.conf import settings

    db_path = Path(settings.DATABASES["default"]["NAME"])
    bdir = db_path.parent / "backups"
    bdir.mkdir(parents=True, exist_ok=True)

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    dest = bdir / f"db-{stamp}.sqlite3"
    src = sqlite3.connect(str(db_path))
    dst = sqlite3.connect(str(dest))
    try:
        with dst:
            src.backup(dst)
    finally:
        src.close()
        dst.close()

    # 滚动清理：只处理本模块命名的备份文件
    files = sorted(bdir.glob("db-*.sqlite3"))
    removed = []
    if len(files) > keep:
        for f in files[:-keep]:
            try:
                f.unlink()
                removed.append(f.name)
            except OSError:
                pass
    kept = len(files) - len(removed)
    return {"file": str(dest), "size": dest.stat().st_size, "kept": kept, "removed": removed}
