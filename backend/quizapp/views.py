"""题库 API 视图。

设计要点：
- 只做 JSON in/out，不渲染模板；前端在 ../frontend 独立部署。
- 判分/列表等高频接口避免 N+1 与全表扫描（详见各函数 docstring）。
- 搜索统一走 `_keyword_filter`：文本字段用 ORM，选项走 SQLite json_each。
"""
import json

from django.db import transaction
from django.db.models import Avg, Count, Max, Q, Sum
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from .md_import import build_questions, parse_answer_md, parse_question_md
from .models import Note, Question, QuestionStat, TrainingSession

TYPE_LABELS = dict(Question.TYPE_CHOICES)
VALID_TYPES = frozenset(TYPE_LABELS)

# 选项存于 JSONField，非 ASCII 字符在 SQLite 中以 \uXXXX 转义落库，
# 直接 icontains 中文会静默匹配不到（实测恒为 0 命中）；
# 用 json_each 在 SQL 层把数组展开成行再逐项 LIKE，中文与大小写都能正确命中。
_OPT_HIT_SQL = ("EXISTS (SELECT 1 FROM json_each(quizapp_question.options) AS je "
                "WHERE je.value LIKE %s)")

# 判分明细落库的字段（bulk_update 用）
_STAT_FIELDS = ["attempts", "correct_count", "wrong_count", "wrong_streak",
                "in_wrongbook", "last_correct", "updated_at"]


def _to_int(v, default=None):
    try:
        return int(v)
    except (TypeError, ValueError):
        return default


def _q_dict(q, with_answer=False):
    d = {
        "id": q.pk,
        "type": q.type,
        "type_label": TYPE_LABELS.get(q.type, q.type),
        "category": q.category,
        "source": q.source,
        "question": q.question,
        "options": q.options,
        "starred": bool(getattr(q, "starred", False)),
    }
    if q.type == "blank":
        d["blanks"] = len(q.answer)  # 只暴露空格数量，不暴露答案
    if with_answer:
        d["answer"] = q.answer
        d["explanation"] = q.explanation
    return d


def _norm(s):
    """填空判分归一化：去空格/全角空格、转小写、去尾部标点"""
    s = str(s).strip().lower().replace("　", "").replace(" ", "")
    return s.rstrip("。，,.;；:：")


def _is_answered(q, raw):
    """判断某题是否作答（未作答的题不参与判分与统计）"""
    if raw is None:
        return False
    if q.type == "choice":
        return str(raw).strip() != ""
    if q.type == "blank":
        vals = raw if isinstance(raw, list) else [raw]
        return any(str(v).strip() for v in vals)
    return str(raw).strip() != ""


def _load_answers(request):
    """解析请求体 JSON；非法时返回 None（调用方回 400）。"""
    try:
        payload = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None
    return payload if isinstance(payload, dict) else None


def _keyword_filter(qs, kws):
    """多关键词 AND 过滤（在数据库层完成，不再全量载入后 Python 过滤）。

    单个关键词命中任一字段即可：题干 / 解析 / 知识点分类 / 来源 / 个人笔记 / 选项。
    选项因中文转义问题单独用 json_each 子查询取 id 集合（每次关键词 1 次查询）。
    """
    for k in kws:
        opt_ids = list(Question.objects
                       .extra(where=[_OPT_HIT_SQL], params=[f"%{k}%"])
                       .values_list("id", flat=True))
        cond = (Q(question__icontains=k) | Q(explanation__icontains=k) |
                Q(category__icontains=k) | Q(source__icontains=k) |
                Q(note__content__icontains=k))
        qs = qs.filter(cond | Q(id__in=opt_ids)) if opt_ids else qs.filter(cond)
    return qs


@require_GET
def question_list(request):
    """题目列表 / 组卷 / 搜索。支持参数：
    mode=all|random|wrong|starred、count=抽取数量、limit/offset=分页、
    type=题型、category=知识点分类、source=来源文档、starred=1、
    q=关键词搜索（题干/选项/解析/分类/来源/笔记，空格分隔多词，与其它过滤叠加）

    性能：过滤与搜索全部下推数据库；仅在需要时执行一次 COUNT。
    """
    qs = Question.objects.select_related("note")
    t = request.GET.get("type")
    c = request.GET.get("category")
    src = request.GET.get("source")
    if t and t in VALID_TYPES:
        qs = qs.filter(type=t)
    if c and c not in ("all", ""):
        qs = qs.filter(category=c)
    if src and src not in ("all", ""):
        qs = qs.filter(source=src)

    mode = request.GET.get("mode", "all")
    if mode == "wrong":
        qs = qs.filter(stat__in_wrongbook=True)
    elif mode == "starred":
        qs = qs.filter(starred=True)

    kws = [k for k in (request.GET.get("q") or "").split() if k]
    if kws:
        qs = _keyword_filter(qs, kws)

    if mode == "wrong":
        qs = qs.order_by("-stat__updated_at")
    elif mode == "starred":
        qs = qs.order_by("-id")
    elif mode == "random":
        qs = qs.order_by("?")

    n = _to_int(request.GET.get("count")) or _to_int(request.GET.get("limit")) or 0
    offset = _to_int(request.GET.get("offset")) or 0
    paged = n > 0 or offset > 0
    # 无分页/无限定且非随机时，命中数即返回数，省掉一次 COUNT（保持 1 次查询快路径）
    total = qs.count() if (paged or kws or mode == "random") else None
    if n > 0:
        page = qs[offset:offset + n]
    elif offset > 0:
        page = qs[offset:]
    else:
        page = qs
    questions = list(page)
    return JsonResponse({
        "count": len(questions),
        "total": len(questions) if total is None else total,
        "questions": [_q_dict(q) for q in questions],
    })


# ---------------- 判分 ----------------

def _flush_stats(updates, fresh):
    """批量落库作答统计：新建用 bulk_create，更新用 bulk_update。"""
    if fresh:
        QuestionStat.objects.bulk_create(fresh, batch_size=500)
    if updates:
        QuestionStat.objects.bulk_update(updates, _STAT_FIELDS, batch_size=500)


def _touch_stat(stat_map, updates, fresh, q, correct, now):
    """在内存中累计某题的作答结果，返回"本次答对且原在错题本"。"""
    st = stat_map.get(q.pk)
    if st is None:
        st = QuestionStat(question_id=q.pk)
        stat_map[q.pk] = st
        fresh.append(st)
    else:
        updates.append(st)
    was_in = bool(st.in_wrongbook)
    st.apply_result(correct, now)
    return bool(was_in and correct)


def _grade(qs, answers):
    """通用判分（练习交卷与考试交卷共用）。只判已作答的题：
    选择/填空自动判分并更新错题本；简答/实操返回参考答案，由前端自评反馈。

    性能：待判题目由调用方按需传入（不再加载全表）；作答统计一次性预载、
    内存累计后批量落库（原先每题 get_or_create + save 共 2 次 SQL）。

    返回 (results, summary)；summary["unanswered"] 统计传入集合中未作答的题数。
    """
    qs = list(qs)
    now = timezone.now()
    stat_map = {s.question_id: s for s in
                QuestionStat.objects.filter(question_id__in=[q.pk for q in qs])}
    updates, fresh = [], []
    results = []
    obj_graded = obj_correct = subj_count = unanswered = 0

    for q in qs:
        raw = answers.get(str(q.pk), answers.get(q.pk))
        if not _is_answered(q, raw):
            unanswered += 1
            continue
        base = {"id": q.pk, "type": q.type, "explanation": q.explanation}

        if q.type == "choice":
            ua = str(raw).strip().upper()
            ca = str(q.answer[0]).strip().upper() if q.answer else ""
            correct = bool(ua) and ua == ca
            removed = _touch_stat(stat_map, updates, fresh, q, correct, now)
            results.append({**base, "correct": correct, "user_answer": ua,
                            "correct_answer": ca, "wrongbook": not correct,
                            "wrongbook_removed": removed})
            obj_graded += 1
            obj_correct += int(correct)

        elif q.type == "blank":
            given = raw if isinstance(raw, list) else ([raw] if str(raw).strip() else [])
            detail, ok_all = [], True
            for i, accepted in enumerate(q.answer):
                g = str(given[i]) if i < len(given) else ""
                ok = _norm(g) in {_norm(a) for a in accepted}
                detail.append({"ok": ok, "given": g, "accepted": list(accepted)})
                ok_all = ok_all and ok
            removed = _touch_stat(stat_map, updates, fresh, q, ok_all, now)
            results.append({**base, "correct": ok_all, "blank_detail": detail,
                            "correct_answer": [a[0] if a else "" for a in q.answer],
                            "wrongbook": not ok_all, "wrongbook_removed": removed})
            obj_graded += 1
            obj_correct += int(ok_all)

        else:  # short / practical：由前端自评后调用 /api/feedback/
            subj_count += 1
            results.append({**base, "correct": None, "reference": list(q.answer)})

    _flush_stats(updates, fresh)

    summary = {
        "total_graded": obj_graded,
        "total_correct": obj_correct,
        "score_pct": round(obj_correct / obj_graded * 100, 1) if obj_graded else 0,
        "subjective_count": subj_count,
        "unanswered": unanswered,
        "wrongbook_added": sum(1 for r in results if r.get("wrongbook")),
        "wrongbook_removed": sum(1 for r in results if r.get("wrongbook_removed")),
    }
    return results, summary


def _answer_ids(answers):
    """从 answers 字典取出题目 id（忽略非法键）。"""
    ids = []
    for k in answers:
        v = _to_int(k)
        if v is not None:
            ids.append(v)
    return ids


@csrf_exempt
@require_POST
def submit(request):
    """交卷判分（练习模式）。只判已作答的题，也支持逐题模式单题提交。

    只按本次作答的题目 id 取题，避免为一次 20 题的提交加载全库题目。
    """
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    answers = payload.get("answers") or {}
    if not isinstance(answers, dict):
        return JsonResponse({"error": "answers 必须是对象"}, status=400)
    qs = Question.objects.filter(pk__in=_answer_ids(answers)).order_by("order", "id")
    results, summary = _grade(qs, answers)
    return JsonResponse({"summary": summary, "results": results})


# ---------------- 考试模式（P1） ----------------

def _pick(qs, n):
    return list(qs.order_by("?")[:n]) if n and int(n) > 0 else []


@csrf_exempt
@require_POST
def exam_start(request):
    """按蓝图组卷开考。请求体：
    {"source": "Python 400题|all", "choice": 12, "blank": 6, "short": 2, "practical": 0,
     "minutes": 0(自动=题数×90秒) 或指定分钟}
    返回 session_id、限时与不带答案的试卷。"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    source = str(payload.get("source") or "all").strip()
    counts = {t: _to_int(payload.get(t), 0) or 0
              for t in ("choice", "blank", "short", "practical")}
    if sum(counts.values()) <= 0:
        return JsonResponse({"error": "请至少为一种题型配置题目数量"}, status=400)
    minutes = _to_int(payload.get("minutes"), 0) or 0

    qs = Question.objects.all()
    if source not in ("all", ""):
        qs = qs.filter(source=source)
    picked = []
    for t, n in counts.items():
        picked += _pick(qs.filter(type=t), n)
    if not picked:
        return JsonResponse({"error": "该来源下可用题目不足，请调整蓝图"}, status=400)

    duration_s = minutes * 60 if minutes > 0 else len(picked) * 90
    sess = TrainingSession.objects.create(
        mode="exam",
        scope={"source": source, "counts": counts, "qids": [q.pk for q in picked]},
        total=len(picked),
        started_at=timezone.now(),
    )
    return JsonResponse({
        "session_id": sess.pk,
        "duration_s": duration_s,
        "auto_timed": minutes <= 0,
        "blueprint": {"source": source, **counts},
        "count": len(picked),
        "questions": [_q_dict(q) for q in picked],
    })


@csrf_exempt
@require_POST
def exam_submit(request):
    """考试交卷：只判本场抽到的题，成绩写入训练档案。"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    sess = TrainingSession.objects.filter(
        pk=_to_int(payload.get("session_id")), mode="exam").first()
    if not sess:
        return JsonResponse({"error": "考试会话不存在"}, status=404)
    if sess.finished_at:
        return JsonResponse({"error": "该场考试已交卷"}, status=400)

    qids = (sess.scope or {}).get("qids", [])
    answers = payload.get("answers") or {}
    if not isinstance(answers, dict):
        answers = {}
    duration_s = _to_int(payload.get("duration_s"), 0) or 0
    results, summary = _grade(
        Question.objects.filter(pk__in=qids).order_by("order", "id"), answers)

    sess.graded = summary["total_graded"]
    sess.correct = summary["total_correct"]
    sess.subjective = summary["subjective_count"]
    sess.score = summary["score_pct"]
    sess.duration_s = duration_s
    sess.finished_at = timezone.now()
    sess.save(update_fields=["graded", "correct", "subjective", "score",
                             "duration_s", "finished_at"])
    return JsonResponse({"summary": summary, "results": results, "session": sess.to_dict()})


@csrf_exempt
@require_POST
def exam_abandon(request):
    """放弃本场考试（删除未交卷的会话，不留垃圾档案）。"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    n, _ = TrainingSession.objects.filter(
        pk=_to_int(payload.get("session_id")), mode="exam", finished_at=None).delete()
    return JsonResponse({"abandoned": bool(n)})


@require_GET
def exams(request):
    """考试成绩历史：最近 10 场 + 最高分 / 平均分（聚合下推数据库）。"""
    done = TrainingSession.objects.filter(mode="exam", finished_at__isnull=False)
    agg = done.aggregate(n=Count("id"), best=Max("score"), avg=Avg("score"))
    avg = agg["avg"]
    return JsonResponse({
        "count": agg["n"] or 0,
        "best": agg["best"],
        "avg": round(avg, 1) if avg is not None else None,
        "recent": [s.to_dict() for s in done[:10]],
    })


# ---------------- 星标 / 笔记（P1） ----------------

@csrf_exempt
@require_POST
def star(request):
    """切换星标：{"id": X, "starred": true|false}（省略 starred 则取反）"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    q = Question.objects.filter(pk=_to_int(payload.get("id"))).first()
    if not q:
        return JsonResponse({"error": "题目不存在"}, status=404)
    q.starred = bool(payload["starred"]) if "starred" in payload else not q.starred
    q.save(update_fields=["starred"])
    return JsonResponse({"id": q.pk, "starred": q.starred,
                         "starred_total": Question.objects.filter(starred=True).count()})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def note(request):
    """个人笔记：GET ?id=X 取笔记；POST {"id": X, "content": "..."} 保存（空串删除）"""
    if request.method == "GET":
        qid = _to_int(request.GET.get("id"))
        if qid is None:
            return JsonResponse({"id": None, "content": ""})
        n = Note.objects.filter(question_id=qid).first()
        return JsonResponse({"id": qid, "content": n.content if n else ""})
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    q = Question.objects.filter(pk=_to_int(payload.get("id"))).first()
    if not q:
        return JsonResponse({"error": "题目不存在"}, status=404)
    content = str(payload.get("content") or "")
    if content.strip():
        Note.objects.update_or_create(question=q, defaults={"content": content})
    else:
        Note.objects.filter(question=q).delete()
    return JsonResponse({"id": q.pk, "content": content})


# ---------------- 统计 ----------------

def _mastery_groups(group_field):
    """一次聚合出按 group_field 分组的掌握度：{key: {tried, attempts, correct, rate}}。

    group_field 形如 "question__category" / "question__source"。
    原先按分组逐个调用 _mastery()（每组 4 次 SQL），分类/来源一多就是几百次查询。
    """
    rows = (QuestionStat.objects
            .values(group_field)
            .annotate(tried=Count("id", filter=Q(attempts__gt=0)),
                      attempts=Sum("attempts"),
                      correct=Sum("correct_count")))
    out = {}
    for r in rows:
        attempts = r["attempts"] or 0
        correct = r["correct"] or 0
        out[r[group_field] or ""] = {
            "tried": r["tried"] or 0,
            "attempts": attempts,
            "correct": correct,
            "rate": round(correct / attempts * 100, 1) if attempts else None,
        }
    return out


def _merge_mastery(total, m):
    """把聚合结果与题目总数合并成前端契约的掌握度对象。"""
    m = m or {}
    return {"total": total, "tried": m.get("tried", 0),
            "attempts": m.get("attempts", 0), "correct": m.get("correct", 0),
            "rate": m.get("rate")}


@require_GET
def stats(request):
    """题库概览：题型/分类/来源分布 + 总体与分组掌握度。

    原先遍历全表在 Python 里计数、并对每个分类与来源各查 4 次掌握度
    （实测 255 次 SQL / 260ms）；现全部改为分组聚合，固定 9 次 SQL。
    """
    total = Question.objects.count()
    by_type = {TYPE_LABELS.get(r["type"], r["type"]): r["n"]
               for r in Question.objects.values("type").annotate(n=Count("id"))}
    by_category = {r["category"]: r["n"]
                   for r in Question.objects.values("category").annotate(n=Count("id"))}
    by_source = {r["source"]: r["n"]
                 for r in (Question.objects.exclude(source="")
                           .values("source").annotate(n=Count("id")).order_by("-n"))}

    cat_mastery = _mastery_groups("question__category")
    src_mastery = _mastery_groups("question__source")
    agg = QuestionStat.objects.aggregate(
        tried=Count("id", filter=Q(attempts__gt=0)),
        attempts=Sum("attempts"), correct=Sum("correct_count"))
    attempts = agg["attempts"] or 0
    correct = agg["correct"] or 0

    return JsonResponse({
        "total": total,
        "starred": Question.objects.filter(starred=True).count(),
        "by_type": by_type,
        "by_category": by_category,
        "by_source": by_source,
        "wrongbook": QuestionStat.objects.filter(in_wrongbook=True).count(),
        "overall": {
            "total": total,
            "tried": agg["tried"] or 0,
            "attempts": attempts,
            "correct": correct,
            "rate": round(correct / attempts * 100, 1) if attempts else None,
        },
        "category_mastery": {c: _merge_mastery(n, cat_mastery.get(c))
                             for c, n in by_category.items()},
        "source_mastery": {s: _merge_mastery(n, src_mastery.get(s))
                           for s, n in by_source.items()},
    })


@require_GET
def sources(request):
    """来源文档列表（含题数与掌握度），按题数降序。

    说明：/api/stats/ 已返回 by_source + source_mastery，前端可据此自行推导；
    本端点保留以兼容旧的独立调用。
    """
    src_mastery = _mastery_groups("question__source")
    data = [{"name": r["source"], "count": r["n"],
             **_merge_mastery(r["n"], src_mastery.get(r["source"]))}
            for r in (Question.objects.exclude(source="")
                      .values("source").annotate(n=Count("id")).order_by("-n"))]
    return JsonResponse({"sources": data})


# ---------------- 错题本 / 自评 ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def wrongbook(request):
    """错题本：GET 列表（可 ?q= 搜索）；POST {"action":"remove","id":X} 移出单题 /
    {"action":"clear"} 清空"""
    if request.method == "POST":
        payload = _load_answers(request)
        if payload is None:
            return JsonResponse({"error": "无效的 JSON"}, status=400)
        action = payload.get("action")
        if action == "clear":
            n = QuestionStat.objects.filter(in_wrongbook=True).update(
                in_wrongbook=False, wrong_streak=0)
            return JsonResponse({"cleared": n, "wrongbook": 0})
        if action == "remove":
            QuestionStat.objects.filter(
                question_id=_to_int(payload.get("id")), in_wrongbook=True).update(
                in_wrongbook=False, wrong_streak=0)
            return JsonResponse({
                "removed": 1,
                "wrongbook": QuestionStat.objects.filter(in_wrongbook=True).count(),
            })
        return JsonResponse({"error": "未知操作，支持 remove / clear"}, status=400)

    # GET：错题列表（最近答错的在前），搜索与题库搜索同一套匹配规则
    stats_qs = QuestionStat.objects.filter(in_wrongbook=True).select_related("question")
    kws = [k for k in (request.GET.get("q") or "").split() if k]
    if kws:
        matched = _keyword_filter(Question.objects.filter(stat__in_wrongbook=True), kws)
        stats_qs = stats_qs.filter(question__in=matched)
    items = []
    for st in stats_qs.order_by("-updated_at"):
        d = _q_dict(st.question)
        d.update({"attempts": st.attempts, "wrong": st.wrong_count,
                  "wrong_streak": st.wrong_streak})
        items.append(d)
    return JsonResponse({"count": len(items), "questions": items})


@csrf_exempt
@require_POST
def feedback(request):
    """简答/实操题自评反馈：{"id": 题目ID, "correct": true|false}
    答错自动加入错题本，答对自动移出。"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    qid, correct = payload.get("id"), payload.get("correct")
    if qid is None or not isinstance(correct, bool):
        return JsonResponse({"error": "需要参数 id 与 correct(bool)"}, status=400)
    q = Question.objects.filter(pk=_to_int(qid)).first()
    if not q:
        return JsonResponse({"error": "题目不存在"}, status=404)
    stat, _ = QuestionStat.objects.get_or_create(question=q)
    stat.record(correct)
    return JsonResponse({
        "in_wrongbook": stat.in_wrongbook,
        "wrongbook": QuestionStat.objects.filter(in_wrongbook=True).count(),
    })


# ---------------- 导入 ----------------

_DEDUP_CHUNK = 500  # 去重的 IN 查询分块大小，避免 SQLite 变量数上限


@transaction.atomic
def _import_items(items, default_category="导入题库", source=""):
    """按题干去重后批量入库，返回 (added, skipped)。

    性能与安全：
    - 先分块 IN 查出已存在的题干集合，取代逐题 filter().exists() 的全表扫描
      （实测 20 题导入从 40 次 SQL / 954ms 降到 3 次 SQL）；
    - bulk_create 批量插入取代逐题 create；
    - 整体包在事务里，异常不会留下半批数据。
    无效条目（缺题干或题型非法）直接忽略，不计入 added/skipped。
    """
    src = (source or default_category).strip()
    valid = []
    for it in items:
        if not isinstance(it, dict):
            continue
        text = (it.get("question") or "").strip()
        if text and it.get("type") in VALID_TYPES:
            valid.append((text, it))

    existing = set()
    texts = [t for t, _ in valid]
    for i in range(0, len(texts), _DEDUP_CHUNK):
        existing.update(
            Question.objects.filter(question__in=texts[i:i + _DEDUP_CHUNK])
            .values_list("question", flat=True))

    prepared, seen = [], set()
    skipped = 0
    for text, it in valid:
        if text in existing or text in seen:
            skipped += 1
            continue
        seen.add(text)
        prepared.append(Question(
            type=it["type"],
            category=(it.get("category") or default_category).strip(),
            source=src,
            question=text,
            options=it.get("options") or [],
            answer=it["answer"],
            explanation=it.get("explanation", ""),
        ))
    if prepared:
        Question.objects.bulk_create(prepared, batch_size=500)
    return len(prepared), skipped


@csrf_exempt
@require_POST
def import_md(request):
    """上传《测试题》与《答案解析》两个 Markdown 文件导入题库。
    表单字段：question_file、answer_file、category（知识点分类，可选）、
    source（来源文档名，可选，默认取 category）"""
    qf = request.FILES.get("question_file")
    af = request.FILES.get("answer_file")
    if not qf or not af:
        return JsonResponse({"error": "请同时上传题目 MD 文件和答案解析 MD 文件"}, status=400)
    try:
        qtext = qf.read().decode("utf-8-sig", errors="replace")
        atext = af.read().decode("utf-8-sig", errors="replace")
        category = (request.POST.get("category") or "MD导入").strip()
        source = (request.POST.get("source") or "").strip() or category
        items = build_questions(parse_question_md(qtext), parse_answer_md(atext), category)
        if not items:
            return JsonResponse({"error": "未从文件中解析出题目，请检查文件格式"}, status=400)
        added, skipped = _import_items(items, category, source)
        return JsonResponse({"added": added, "skipped": skipped, "parsed": len(items),
                             "source": source, "category": category})
    except Exception as e:  # noqa: BLE001
        return JsonResponse({"error": f"导入失败：{e}"}, status=500)


@csrf_exempt
@require_POST
def import_json(request):
    """JSON 导入。请求体：{"category": "...", "source": "文档名(可选)", "questions": [
        {"type": "choice|blank|short|practical", "question": "...",
         "options": [...], "answer": ..., "explanation": "..."}]}"""
    payload = _load_answers(request)
    if payload is None:
        return JsonResponse({"error": "无效的 JSON"}, status=400)
    raw = payload.get("questions")
    if not isinstance(raw, list):
        return JsonResponse({"error": "questions 必须是数组"}, status=400)
    category = (payload.get("category") or "JSON导入").strip()
    source = (payload.get("source") or "").strip() or category
    items = []
    for it in raw:
        if not isinstance(it, dict):
            continue
        t = it.get("type")
        if t not in VALID_TYPES:
            continue
        answer = it.get("answer")
        if t == "choice":
            answer = [str(answer).strip().upper()] if answer else []
        elif t == "blank":
            # 每个空一组可接受答案：["a","b"] 或 [["a","A"],...]
            answer = [b if isinstance(b, list) else [b] for b in (answer or [])]
        else:
            answer = [answer] if isinstance(answer, str) else list(answer or [])
        items.append({
            "type": t, "category": it.get("category") or category,
            "question": it.get("question", ""), "options": it.get("options", []),
            "answer": answer, "explanation": it.get("explanation", ""),
        })
    if not items:
        return JsonResponse({"error": "没有可导入的题目"}, status=400)
    added, skipped = _import_items(items, category, source)
    return JsonResponse({"added": added, "skipped": skipped, "parsed": len(items),
                         "source": source, "category": category})
