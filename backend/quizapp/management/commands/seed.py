import json
import os

from django.core.management.base import BaseCommand

from quizapp.models import Question

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SOURCE = "K8s资源对象"


class Command(BaseCommand):
    help = "导入/更新 K8s 资源对象题库（quiz_data_*.json，按题干去重，不影响其他来源题库）"

    def add_arguments(self, parser):
        parser.add_argument("--flush", action="store_true",
                            help=f"仅清空来源为「{SOURCE}」的题目后重新导入")

    def handle(self, *args, **opts):
        if opts["flush"]:
            n, _ = Question.objects.filter(source=SOURCE).delete()
            self.stdout.write(f"已清空「{SOURCE}」旧题 {n} 条")
        order_base = Question.objects.count()
        total = added = updated = 0
        for fname in ("quiz_data_choice.json", "quiz_data_rest.json"):
            path = os.path.join(BASE_DIR, fname)
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
            for item in data["questions"]:
                total += 1
                defaults = {
                    "type": item["type"],
                    "category": item["category"],
                    "source": SOURCE,
                    "options": item.get("options", []),
                    "answer": item["answer"],
                    "explanation": item.get("explanation", ""),
                    "order": order_base + total,
                }
                _, created = Question.objects.update_or_create(
                    question=item["question"], defaults=defaults)
                if created:
                    added += 1
                else:
                    updated += 1
        self.stdout.write(self.style.SUCCESS(
            f"K8s题库完成：新增 {added}，更新 {updated}，题库现有 {Question.objects.count()} 题"))
