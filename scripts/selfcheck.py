#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""刷题系统端到端自检：冒烟 + 接口契约 + 题库完整性 + 搜索一致性 + 性能阈值。

用法（用项目内 venv 运行，可在任意目录）：
    <项目>/.venv/Scripts/python.exe scripts/selfcheck.py
    ... selfcheck.py --base-url http://127.0.0.1:8000   # 指定后端地址
    ... selfcheck.py --skip-http                        # 服务没起时只跑 ORM 检查

退出码：0 = 全部通过；1 = 有失败项（便于接 CI / 提交前回归）。

安全约定（重要）：
- 只读接口直接请求；写接口要么自身可清理（考试 start→abandon、星标取反两次复原），
  要么放在 transaction.atomic() 里并主动回滚。**不会污染真实题库与作答统计。**
- 搜索做了"SQL 实现 vs 参考 Python 实现"的一致性比对，防止后续改动让搜索语义漂移
  （历史上曾出现 options 中文因 JSON 转义而静默搜不到的问题）。
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
sys.path.insert(0, str(BACKEND))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quiz_backend.settings")

# ---------- 极简断言框架 ----------
class Checker:
    def __init__(self):
        self.passed = 0
        self.failed = []

    def section(self, title):
        print(f"\n── {title} " + "─" * max(2, 66 - len(title)))

    def ok(self, name, detail=""):
        self.passed += 1
        print(f"  ✓ {name}{('  ' + detail) if detail else ''}")

    def check(self, name, cond, detail=""):
        if cond:
            self.ok(name)
        else:
            self.failed.append((name, detail))
            print(f"  ✗ {name}  {detail}")
        return bool(cond)

    def skip(self, name, why):
        print(f"  · 跳过 {name}：{why}")

    def summary(self):
        total = self.passed + len(self.failed)
        print("\n" + "=" * 70)
        if self.failed:
            print(f"自检结果：{self.passed}/{total} 通过，{len(self.failed)} 项失败")
            for name, detail in self.failed:
                print(f"   ✗ {name}  {detail}")
            print("=" * 70)
            return 1
        print(f"自检结果：全部通过（{total} 项）")
        print("=" * 70)
        return 0


C = Checker()


# ---------- HTTP 工具 ----------
class Api:
    def __init__(self, base):
        self.base = base.rstrip("/")

    def call(self, path, method="GET", payload=None, form=None, timeout=30):
        url = self.base + path
        headers, data = {}, None
        if form is not None:
            boundary = "----selfcheckboundary"
            parts = []
            for k, v in form.items():
                parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n")
            body = "".join(parts) + f"--{boundary}--\r\n"
            data = body.encode("utf-8")
            headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
        elif payload is not None:
            data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            headers["Content-Type"] = "application/json; charset=utf-8"
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        t0 = time.perf_counter()
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                raw = r.read()
                status = r.status
        except urllib.error.HTTPError as e:
            raw = e.read()
            status = e.code
        ms = (time.perf_counter() - t0) * 1000
        try:
            body = json.loads(raw.decode("utf-8")) if raw else {}
        except Exception:
            body = {"_raw": raw[:200].decode("utf-8", "replace")}
        return status, body, ms

    def reachable(self):
        try:
            s, _, _ = self.call("/api/stats/", timeout=5)
            return s == 200
        except Exception:
            return False


# ---------- 参考实现（用于搜索一致性比对）----------
def ref_match(q, kws):
    """原始 Python 层搜索语义：题干/解析/分类/来源/选项/笔记，多词 AND，忽略大小写。"""
    hay = [q.question, q.explanation, q.category, q.source]
    hay += [str(o) for o in (q.options or [])]
    try:
        hay.append(q.note.content)
    except Exception:
        pass
    text = "\n".join(hay).lower()
    return all(k.lower() in text for k in kws)


def main():
    ap = argparse.ArgumentParser(description="刷题系统端到端自检")
    ap.add_argument("--base-url", default="http://127.0.0.1:8000", help="后端地址")
    ap.add_argument("--skip-http", action="store_true", help="跳过 HTTP 检查")
    args = ap.parse_args()
    api = Api(args.base_url)

    http_ok = (not args.skip_http) and api.reachable()
    if not args.skip_http and not http_ok:
        print(f"⚠ 后端 {args.base_url} 不可达，HTTP 检查将跳过（ORM 检查照常执行）")

    # ==================== 1. HTTP 冒烟与契约 ====================
    if http_ok:
        C.section("1. 只读接口冒烟与契约")
        s, d, ms = api.call("/api/stats/")
        C.check("GET /api/stats/ 200", s == 200, f"status={s}")
        for k in ("total", "starred", "by_type", "by_category", "by_source",
                  "wrongbook", "overall", "category_mastery", "source_mastery"):
            C.check(f"stats 含字段 {k}", k in d)
        C.check("stats.total 为正数", isinstance(d.get("total"), int) and d["total"] > 0,
                f"total={d.get('total')}")

        s, d, _ = api.call("/api/sources/")
        C.check("GET /api/sources/ 200", s == 200, f"status={s}")
        C.check("sources 返回数组且元素含 name/count/rate",
                isinstance(d.get("sources"), list) and d["sources"]
                and all({"name", "count", "rate"} <= set(x) for x in d["sources"][:5]))

        s, d, _ = api.call("/api/exams/")
        C.check("GET /api/exams/ 200 且含 count/best/avg/recent", s == 200 and
                {"count", "best", "avg", "recent"} <= set(d), f"status={s}")

        s, d, _ = api.call("/api/wrongbook/")
        C.check("GET /api/wrongbook/ 200 且含 count/questions",
                s == 200 and {"count", "questions"} <= set(d), f"status={s}")

        C.section("2. 列表 / 分页 / 搜索契约")
        s, d, _ = api.call("/api/questions/?limit=5")
        C.check("limit=5 生效", s == 200 and d.get("count") == 5, f"count={d.get('count')}")
        C.check("返回 total 字段", isinstance(d.get("total"), int))
        C.check("题目对象字段契约",
                all({"id", "type", "type_label", "category", "source",
                     "question", "options", "starred"} <= set(q) for q in d["questions"]))
        C.check("列表接口不泄露答案", all("answer" not in q for q in d["questions"]))

        s, d2, _ = api.call("/api/questions/?offset=5&limit=5")
        C.check("offset 分页不重复",
                s == 200 and not ({q["id"] for q in d["questions"]} & {q["id"] for q in d2["questions"]}))

        s, d3, _ = api.call("/api/questions/?mode=random&count=7")
        C.check("随机抽题 count=7", s == 200 and d3.get("count") == 7, f"count={d3.get('count')}")

        s, d4, _ = api.call("/api/questions/?type=choice&limit=3")
        C.check("按题型过滤生效",
                s == 200 and all(q["type"] == "choice" for q in d4["questions"]))

        s, d5, _ = api.call("/api/questions/?" + urllib.parse.urlencode({"q": "虚拟", "limit": 10}))
        C.check("中文关键词搜索有命中（JSON 字段转义回归点）",
                s == 200 and d5.get("count", 0) > 0, f"count={d5.get('count')}")

        s, d6, _ = api.call("/api/questions/?q=" + urllib.parse.quote("pod service"))
        C.check("多关键词 AND 搜索可用", s == 200 and isinstance(d6.get("questions"), list))

        C.section("3. 写接口冒烟（可自清理）")
        s, d, _ = api.call("/api/submit/", "POST", {"answers": {}})
        C.check("空交卷返回 summary/results",
                s == 200 and "summary" in d and "results" in d, f"status={s}")

        s, d, _ = api.call("/api/exam/start/", "POST",
                           {"source": "all", "choice": 1, "blank": 0, "short": 0,
                            "practical": 0, "minutes": 0})
        started = s == 200 and d.get("session_id")
        C.check("开考返回 session_id/duration_s/questions",
                bool(started) and {"session_id", "duration_s", "questions"} <= set(d), f"status={s}")
        if started:
            C.check("试卷不泄露答案",
                    all("answer" not in q for q in d["questions"]))
            s2, d2, _ = api.call("/api/exam/abandon/", "POST", {"session_id": d["session_id"]})
            C.check("放弃考试可清理会话", s2 == 200 and d2.get("abandoned") is True,
                    f"status={s2} body={d2}")

        s, d, _ = api.call("/api/import/json/", "POST", {"questions": []})
        C.check("空导入被拒（400）", s == 400, f"status={s}")

        C.check("GET 访问 POST 接口返回 405", api.call("/api/submit/")[0] == 405)
    else:
        C.section("1-3. HTTP 检查")
        C.skip("HTTP 冒烟", "后端不可达或已指定 --skip-http")

    # ==================== 4. ORM：题库完整性 ====================
    try:
        import django
        django.setup()
    except Exception as e:
        C.section("4. ORM 检查")
        C.check("Django 可初始化", False, str(e))
        return C.summary()

    from django.db import connection, reset_queries, transaction
    from django.db.models import Count, Sum
    from django.test import Client
    from quizapp.models import Question, QuestionStat, TrainingSession  # noqa: F401
    from quizapp import views as V

    django_client = Client()

    C.section("4. 题库完整性（ORM 权威校验）")
    total = Question.objects.count()
    C.ok("题目总数", f"{total}")
    bad_type = Question.objects.exclude(type__in=V.VALID_TYPES).count()
    C.check("题型取值合法", bad_type == 0, f"非法 {bad_type} 条")
    empty_q = Question.objects.filter(question="").count()
    C.check("无空题干", empty_q == 0, f"空题干 {empty_q} 条")
    empty_cat = Question.objects.filter(category="").count()
    C.check("无空分类", empty_cat == 0, f"空分类 {empty_cat} 条")

    type_counts = dict(Question.objects.values_list("type").annotate(n=Count("id")))
    C.ok("题型分布", " ".join(f"{k}={v}" for k, v in sorted(type_counts.items())))

    bad_choice = 0
    for q in Question.objects.filter(type="choice").only("id", "answer").iterator():
        a = q.answer
        if not (isinstance(a, list) and len(a) == 1 and isinstance(a[0], str)
                and len(a[0]) == 1 and a[0].isupper()):
            bad_choice += 1
    C.check("选择题答案为大写单字母", bad_choice == 0, f"异常 {bad_choice} 条")

    bad_blank, blank_total = 0, 0
    sample = []
    for q in Question.objects.filter(type="blank").only("id", "question", "answer").iterator():
        blank_total += 1
        n_mark = q.question.count("______")
        a = q.answer
        ok = (isinstance(a, list) and len(a) == n_mark and a
              and all(isinstance(g, list) and g and all(isinstance(x, str) for x in g) for g in a))
        if not ok:
            bad_blank += 1
            if len(sample) < 3:
                sample.append((q.pk, n_mark, len(a) if isinstance(a, list) else "?"))
    C.check(f"填空题空格数 == answer 组数（共 {blank_total} 题）",
            bad_blank == 0, f"不匹配 {bad_blank} 条 例:{sample}")

    bad_short = sum(
        1 for q in Question.objects.filter(type__in=("short", "practical"))
        .only("id", "answer").iterator()
        if not (isinstance(q.answer, list) and len(q.answer) == 1
                and isinstance(q.answer[0], str)))
    C.check("简答/实操答案为单元素字符串列表", bad_short == 0, f"异常 {bad_short} 条")

    dup = (Question.objects.values("question").annotate(n=Count("id"))
           .filter(n__gt=1).count())
    C.check("全库题干无重复", dup == 0, f"重复题干 {dup} 组")

    orphan = QuestionStat.objects.filter(question__isnull=True).count()
    C.check("作答统计无孤儿记录", orphan == 0, f"孤儿 {orphan} 条")

    # ==================== 5. 搜索一致性（SQL vs 参考实现）====================
    C.section("5. 搜索一致性：SQL 实现 vs 参考实现")
    keywords = ["pod", "Pod", "虚拟", "容器", "Service", "kubernetes", "dockerfile", "副本"]
    for kw in keywords:
        db_ids = set(V._keyword_filter(Question.objects.all(), [kw]).values_list("id", flat=True))
        ref_ids = {q.pk for q in Question.objects.select_related("note").all() if ref_match(q, [kw])}
        C.check(f'关键词 "{kw}" 结果一致', db_ids == ref_ids,
                f"SQL={len(db_ids)} 参考={len(ref_ids)} 差集={list(db_ids ^ ref_ids)[:5]}")
    for kws in (["pod", "service"], ["虚拟", "环境"]):
        db_ids = set(V._keyword_filter(Question.objects.all(), kws).values_list("id", flat=True))
        ref_ids = {q.pk for q in Question.objects.select_related("note").all() if ref_match(q, kws)}
        C.check(f"多词 {'+'.join(kws)} AND 一致", db_ids == ref_ids,
                f"SQL={len(db_ids)} 参考={len(ref_ids)}")

    # ==================== 6. 判分逻辑（事务回滚，不留痕）====================
    C.section("6. 判分逻辑正确性（事务内，结束回滚）")
    with transaction.atomic():
        before_wb = QuestionStat.objects.filter(in_wrongbook=True).count()
        choice_q = Question.objects.filter(type="choice").first()
        blank_q = Question.objects.filter(type="blank").first()
        short_q = Question.objects.filter(type="short").first()

        if choice_q:
            ca = str(choice_q.answer[0]).upper()
            r, s = V._grade([choice_q], {str(choice_q.pk): ca.lower()})
            C.check("选择：大小写不敏感且答对", r[0]["correct"] is True and s["total_correct"] == 1)
            r, s = V._grade([choice_q], {str(choice_q.pk): "Z"})
            C.check("选择：错误答案判错并入错题本",
                    r[0]["correct"] is False and r[0]["wrongbook"] is True)
        if blank_q:
            good = [g[0] for g in blank_q.answer]
            r, s = V._grade([blank_q], {str(blank_q.pk): good})
            C.check("填空：全部空正确才算对", r[0]["correct"] is True)
            partial = list(good)
            partial[0] = "\u0000不可能匹配"
            r, s = V._grade([blank_q], {str(blank_q.pk): partial})
            C.check("填空：任一空错即判错", r[0]["correct"] is False)
            r, s = V._grade([blank_q], {str(blank_q.pk): ["  " + good[0].upper() + "。"] + good[1:]})
            C.check("填空：归一化(空格/大小写/尾部标点)生效", r[0]["correct"] is True)
        if short_q:
            r, s = V._grade([short_q], {str(short_q.pk): "随便写的回答"})
            C.check("简答：不自动判分，返回参考答案",
                    r[0]["correct"] is None and "reference" in r[0]
                    and s["subjective_count"] == 1)

        r, s = V._grade([choice_q] if choice_q else [], {})
        C.check("未作答不计入判分", s["total_graded"] == 0 and s["unanswered"] == 1)

        # 答对后应移出错题本
        if choice_q:
            V._grade([choice_q], {str(choice_q.pk): "Z"})           # 先答错
            in_now = QuestionStat.objects.get(question=choice_q).in_wrongbook
            V._grade([choice_q], {str(choice_q.pk): str(choice_q.answer[0]).upper()})
            st = QuestionStat.objects.get(question=choice_q)
            C.check("答错入错题本 → 答对自动移出",
                    in_now is True and st.in_wrongbook is False and st.wrong_streak == 0)
        transaction.set_rollback(True)
    C.check("判分测试已回滚（错题本数未变）",
            QuestionStat.objects.filter(in_wrongbook=True).count() == before_wb)

    # ==================== 7. 导入去重与事务（回滚）====================
    C.section("7. 导入去重与事务（事务内，结束回滚）")
    with transaction.atomic():
        existing_text = Question.objects.values_list("question", flat=True).first()
        items = [
            {"type": "choice", "question": f"自检临时题 A-{time.time()}",
             "options": ["a", "b", "c", "d"], "answer": "A", "explanation": ""},
            {"type": "choice", "question": f"自检临时题 B-{time.time()}",
             "options": ["a", "b", "c", "d"], "answer": "B", "explanation": ""},
            {"type": "choice", "question": existing_text, "options": ["a"], "answer": "A"},
            {"type": "choice", "question": "  ", "options": [], "answer": "A"},
            {"type": "bogus", "question": "非法题型", "answer": "A"},
        ]
        added, skipped = V._import_items(items, "自检", "自检来源")
        C.check("导入：新增 2 / 跳过重复 1 / 忽略无效 2", added == 2 and skipped == 1,
                f"added={added} skipped={skipped}")
        added2, skipped2 = V._import_items(items[:2], "自检", "自检来源")
        C.check("导入：批内重复被挡下", added2 == 0 and skipped2 == 2,
                f"added={added2} skipped={skipped2}")
        transaction.set_rollback(True)
    C.check("导入测试已回滚（题量未变）", Question.objects.count() == total)

    # ==================== 8. 统计一致性 ====================
    C.section("8. 统计接口一致性（分组聚合 vs 明细）")
    with transaction.atomic():
        st = django_client.get("/api/stats/").json()
        C.check("by_type 合计 == total", sum(st["by_type"].values()) == st["total"],
                f'{sum(st["by_type"].values())} vs {st["total"]}')
        C.check("by_category 合计 == total", sum(st["by_category"].values()) == st["total"])
        real_src = Question.objects.exclude(source="").count()
        C.check("by_source 合计 == 非空来源题数", sum(st["by_source"].values()) == real_src)
        mism = [c for c, m in st["category_mastery"].items()
                if m["total"] != st["by_category"].get(c)]
        C.check("每个分类的掌握度 total 与题数一致", not mism, f"不一致 {mism[:3]}")
        mism2 = [s for s, m in st["source_mastery"].items()
                 if m["total"] != st["by_source"].get(s)]
        C.check("每个来源的掌握度 total 与题数一致", not mism2, f"不一致 {mism2[:3]}")
        C.check("overall.total == 题库总数", st["overall"]["total"] == st["total"])
        # 与逐条手工聚合比对
        agg = QuestionStat.objects.aggregate(a=Sum("attempts"), c=Sum("correct_count"))
        C.check("overall.attempts 与手工聚合一致",
                (st["overall"]["attempts"] or 0) == (agg["a"] or 0),
                f'{st["overall"]["attempts"]} vs {agg["a"]}')
        C.check("overall.correct 与手工聚合一致",
                (st["overall"]["correct"] or 0) == (agg["c"] or 0),
                f'{st["overall"]["correct"]} vs {agg["c"]}')
        # /api/sources/ 与 stats 来源数据一致
        src_api = django_client.get("/api/sources/").json()["sources"]
        C.check("sources 与 stats.by_source 一致",
                {x["name"]: x["count"] for x in src_api} == st["by_source"])

    # ==================== 9. 性能阈值 ====================
    C.section("9. 性能阈值（SQL 查询数与耗时）")
    import django.conf as djconf
    old_debug = djconf.settings.DEBUG
    djconf.settings.DEBUG = True  # 打开连接查询记录

    def perf(label, path, method="GET", payload=None, max_q=None, max_ms=None):
        reset_queries()
        t0 = time.perf_counter()
        if method == "GET":
            resp = django_client.get(path)
        else:
            resp = django_client.post(path, data=json.dumps(payload),
                                      content_type="application/json")
        ms = (time.perf_counter() - t0) * 1000
        nq = len(connection.queries)
        line = f"{label}: {ms:.0f}ms / {nq} queries"
        ok = (max_q is None or nq <= max_q) and (max_ms is None or ms <= max_ms)
        C.check(f"性能 {label}", ok, line + ("" if ok else f"  超阈值 q<={max_q} ms<={max_ms}"))
        return resp

    try:
        perf("GET /api/stats/", "/api/stats/", max_q=15, max_ms=500)
        perf("GET /api/sources/", "/api/sources/", max_q=8, max_ms=300)
        perf("GET /api/questions/ (全量)", "/api/questions/", max_q=3, max_ms=2000)
        perf("GET /api/questions/?q=pod", "/api/questions/?q=pod", max_q=6, max_ms=1500)
        with transaction.atomic():
            perf("POST /api/submit/ (空)", "/api/submit/", "POST", {"answers": {}},
                 max_q=8, max_ms=500)
            transaction.set_rollback(True)
    finally:
        djconf.settings.DEBUG = old_debug

    return C.summary()


if __name__ == "__main__":
    sys.exit(main())
