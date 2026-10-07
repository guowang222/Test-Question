"""一键导入 Python 400 题题库（backend/py_quiz_data/py_*.json）。"""
import glob
import json
import os

from django.core.management.base import BaseCommand

from quizapp.models import Question

SOURCE = "Python 400题"


class Command(BaseCommand):
    help = "导入 Python 400 题题库（去重，不影响其他来源题库）"

    def add_arguments(self, parser):
        parser.add_argument("--flush", action="store_true",
                            help=f"仅清空来源为「{SOURCE}」的题目后重新导入")

    def handle(self, *args, **opts):
        if opts["flush"]:
            n, _ = Question.objects.filter(source=SOURCE).delete()
            self.stdout.write(f"已清空「{SOURCE}」旧题 {n} 条")
        base = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        files = sorted(glob.glob(os.path.join(base, "py_quiz_data", "py_*.json")))
        if not files:
            self.stdout.write(self.style.ERROR("未找到 py_quiz_data/py_*.json"))
            return
        added = skipped = 0
        for path in files:
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
            for item in data["questions"]:
                obj = Question.objects.filter(question=item["question"]).first()
                if obj:
                    skipped += 1
                    if not obj.source:  # 补来源标记
                        obj.source = SOURCE
                        obj.save(update_fields=["source"])
                    continue
                Question.objects.create(
                    type=item["type"],
                    category=item["category"],
                    source=SOURCE,
                    question=item["question"],
                    options=item.get("options", []),
                    answer=item["answer"],
                    explanation=item.get("explanation", ""),
                )
                added += 1
            self.stdout.write(f"  {os.path.basename(path)} 完成")
        self.stdout.write(self.style.SUCCESS(
            f"导入完成：新增 {added}，跳过重复 {skipped}，题库现有 {Question.objects.count()} 题"))
