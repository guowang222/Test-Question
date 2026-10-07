from django.db import models
from django.utils import timezone


class Question(models.Model):
    TYPE_CHOICES = [
        ("choice", "选择题"),
        ("blank", "填空题"),
        ("short", "简答题"),
        ("practical", "实战操作题"),
    ]
    type = models.CharField(max_length=16, choices=TYPE_CHOICES, db_index=True)
    category = models.CharField("知识点分类", max_length=64, db_index=True)
    source = models.CharField("来源文档", max_length=128, blank=True, default="", db_index=True)
    question = models.TextField()
    options = models.JSONField(default=list, blank=True)  # 选择题选项
    answer = models.JSONField()  # 选择题: ["B"]; 填空题: [[可选答案...], ...]; 简答/实操: [参考答案文本]
    explanation = models.TextField(blank=True)
    starred = models.BooleanField("星标收藏", default=False, db_index=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        # 覆盖高频过滤组合：文档训练(来源)、专项训练(分类)、考试组卷(来源+题型)
        indexes = [
            models.Index(fields=["source", "type"], name="idx_q_source_type"),
            models.Index(fields=["category", "type"], name="idx_q_cat_type"),
            models.Index(fields=["source", "category"], name="idx_q_source_cat"),
        ]

    def __str__(self):
        return f"[{self.type}] {self.question[:40]}"


class QuestionStat(models.Model):
    """单题作答统计 + 错题本状态（本地单用户应用）。

    - 答对：wrong_streak 清零，并自动移出错题本
    - 答错：wrong_streak +1，自动加入错题本
    """
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name="stat")
    attempts = models.IntegerField("作答次数", default=0)
    correct_count = models.IntegerField("答对次数", default=0)
    wrong_count = models.IntegerField("答错次数", default=0)
    wrong_streak = models.IntegerField("连续答错", default=0)
    in_wrongbook = models.BooleanField("在错题本中", default=False, db_index=True)
    last_correct = models.BooleanField(null=True, default=None)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "题目作答统计"
        # 错题本列表按"最近答错在前"排序，联合索引避免临时排序
        indexes = [
            models.Index(fields=["in_wrongbook", "-updated_at"], name="idx_stat_wb_recent"),
        ]

    def apply_result(self, correct: bool, now=None) -> None:
        """按作答结果更新字段（**纯内存，不落库**）。

        批量判分时先对多个实例调用本方法，再用 bulk_update 一次落库，
        避免每道题 2 次 SQL（get_or_create + save）导致的查询爆炸。
        """
        self.attempts = (self.attempts or 0) + 1
        if correct:
            self.correct_count = (self.correct_count or 0) + 1
            self.wrong_streak = 0
            self.in_wrongbook = False
        else:
            self.wrong_count = (self.wrong_count or 0) + 1
            self.wrong_streak = (self.wrong_streak or 0) + 1
            self.in_wrongbook = True
        self.last_correct = correct
        # bulk_update 不触发 auto_now，需要显式赋值
        self.updated_at = now or timezone.now()

    def record(self, correct: bool):
        """单题作答：更新并立即落库（批量场景请用 apply_result + bulk_update）。"""
        self.apply_result(correct)
        self.save(update_fields=[
            "attempts", "correct_count", "wrong_count", "wrong_streak",
            "in_wrongbook", "last_correct", "updated_at",
        ])


class TrainingSession(models.Model):
    """训练 / 考试档案：考试模式蓝图组卷的成绩记录（P1）。

    scope 存蓝图与抽到的题目 id：{"source": "...", "choice": 12, ..., "qids": [..]}
    练习模式暂不落库（P2 的 AnswerRecord 才做全量作答流水）。
    """
    MODE_CHOICES = [("exam", "考试模式")]
    mode = models.CharField(max_length=16, choices=MODE_CHOICES, db_index=True)
    scope = models.JSONField(default=dict)
    total = models.IntegerField("题目总数", default=0)
    graded = models.IntegerField("客观判分题数", default=0)
    correct = models.IntegerField("客观答对题数", default=0)
    subjective = models.IntegerField("主观题数", default=0)
    score = models.FloatField("得分率%", default=0)
    duration_s = models.IntegerField("用时(秒)", default=0)
    started_at = models.DateTimeField("开始时间")
    finished_at = models.DateTimeField("交卷时间", null=True, blank=True)

    class Meta:
        verbose_name = "训练档案"
        ordering = ["-started_at"]

    def to_dict(self):
        return {
            "id": self.pk,
            "mode": self.mode,
            "scope": self.scope,
            "total": self.total,
            "graded": self.graded,
            "correct": self.correct,
            "subjective": self.subjective,
            "score": self.score,
            "duration_s": self.duration_s,
            "started_at": self.started_at.isoformat(),
            "finished_at": self.finished_at.isoformat() if self.finished_at else None,
        }


class Note(models.Model):
    """题目个人笔记（Markdown 纯文本），参与题库搜索。"""
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name="note")
    content = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
