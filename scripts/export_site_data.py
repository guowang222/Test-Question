"""把题库导出成纯静态站用的 JS 数据包。

产物：site/js/questions.data.js —— 定义 window.QUIZ_DATA = {questions:[...], meta:{...}}。

字段名保持与后端一致（id/type/category/source/question/options/answer/explanation/order），
不做短键压缩：gzip 本来就会压缩重复的长键名，短键带来的体积收益很小，
却会让 local-store.js 多一层解包逻辑、两边字段名对不上，更容易出隐蔽 bug。

用法（在项目根目录执行）：
    python scripts/export_site_data.py
    python scripts/export_site_data.py --out site/js/questions.data.js
"""
import argparse
import gzip
import json
import os
import sys

FIELDS = ["id", "type", "category", "source", "question",
          "options", "answer", "explanation", "order"]


def load_questions():
    """从 Django ORM 读全量题目；不在 Django 环境时回退到 exports/questions.json。"""
    here = os.path.dirname(os.path.abspath(__file__))
    backend = os.path.normpath(os.path.join(here, "..", "backend"))
    if os.path.isdir(backend) and backend not in sys.path:
        sys.path.insert(0, backend)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quiz_backend.settings")
    try:
        import django

        django.setup()
        from quizapp.models import Question

        rows = []
        for q in Question.objects.all().order_by("order", "id").iterator(chunk_size=500):
            rows.append({k: getattr(q, k) for k in FIELDS})
        return rows, "数据库"
    except Exception as e:  # noqa: BLE001
        print(f"[warn] 读数据库失败（{e}），回退到 exports/questions.json")

    path = os.path.normpath(os.path.join(here, "..", "exports", "questions.json"))
    if not os.path.exists(path):
        raise SystemExit(f"找不到题库：{path}")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    rows = data.get("questions", data) if isinstance(data, dict) else data
    out = []
    for i, r in enumerate(rows, 1):
        out.append({
            "id": r.get("id", i), "type": r["type"], "category": r.get("category", ""),
            "source": r.get("source", ""), "question": r["question"],
            "options": r.get("options") or [], "answer": r["answer"],
            "explanation": r.get("explanation", ""), "order": r.get("order", 0),
        })
    return out, "exports/questions.json"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None, help="输出文件路径")
    args = ap.parse_args()

    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.normpath(os.path.join(here, ".."))
    out_path = args.out or os.path.join(root, "site", "js", "questions.data.js")

    rows, src = load_questions()
    by_type, by_source = {}, {}
    for row in rows:
        by_type[row["type"]] = by_type.get(row["type"], 0) + 1
        if row["source"]:
            by_source[row["source"]] = by_source.get(row["source"], 0) + 1

    payload = {
        "meta": {
            "count": len(rows), "by_type": by_type, "sources": len(by_source),
            "by_source": by_source,
        },
        "questions": rows,
    }
    js = ("/* 本文件由 scripts/export_site_data.py 自动生成，请勿手工修改。 */\n"
          "window.QUIZ_DATA=" + json.dumps(payload, ensure_ascii=False,
                                            separators=(",", ":")) + ";\n")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(js)

    raw = len(js.encode("utf-8"))
    gz = len(gzip.compress(js.encode("utf-8"), 9))
    print(f"数据来源：{src}")
    print(f"题目：{len(rows)} 题 | 题型分布：{by_type} | 来源：{len(by_source)} 个")
    print(f"输出：{out_path}")
    print(f"体积：{raw / 1024:.0f} KB → gzip {gz / 1024:.0f} KB")


if __name__ == "__main__":
    main()