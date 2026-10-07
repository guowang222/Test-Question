from django.core.management.base import BaseCommand

from quizapp.backup import backup_now


class Command(BaseCommand):
    help = "立即备份数据库到 backups/ 目录（默认滚动保留 7 份）"

    def add_arguments(self, parser):
        parser.add_argument("--keep", type=int, default=7, help="保留的备份份数")

    def handle(self, *args, **opts):
        r = backup_now(keep=opts["keep"])
        self.stdout.write(self.style.SUCCESS(
            f"备份完成: {r['file']} ({r['size']} 字节)，当前保留 {r['kept']} 份"
            + (f"，已清理: {', '.join(r['removed'])}" if r["removed"] else "")
        ))
