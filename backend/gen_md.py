"""从 py_quiz_data/*.json 生成两份 Markdown 文档：
1) Python知识点总结与400题-题目卷.md —— 知识点总结 + 全部题目（不带答案）
2) Python400题-答案详解卷.md —— 逐题详细答案 + 衍生知识点（同时符合刷题系统 MD 导入格式）
"""
import glob
import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE, "py_quiz_data")
OUT_Q = os.path.join(BASE, "Python知识点总结与400题-题目卷.md")
OUT_A = os.path.join(BASE, "Python400题-答案详解卷.md")
OUT_Q_IMPORT = os.path.join(BASE, "Python400题-导入用-题目.md")
OUT_A_IMPORT = os.path.join(BASE, "Python400题-导入用-答案.md")

TYPE_LABEL = {"choice": "选择题", "blank": "填空题", "short": "简答题", "practical": "实战操作题"}
LETTERS = "ABCDEF"

TOPIC_SUMMARY = {
    "基础语法与环境": "解释型/动态类型/强类型语言；变量命名规则、缩进即语法、链式赋值与元组交换、注释与 docstring、__name__ 入口机制、PEP 8 与 REPL。",
    "数据类型与运算符": "int/float/bool/complex 与进制；/ 与 // 的区别、地板除与取模符号、幂运算与优先级、链式比较、真值测试、可变与不可变类型、浮点精度。",
    "字符串": "不可变序列；切片与反转、常用方法（split/join/strip/lower/title/replace/find）、f-string 格式化、str 与 bytes、Unicode 编码。",
    "列表与元组": "append/extend/pop/sort 与 sorted、切片与负索引、浅拷贝引用陷阱、列表推导式、元组不可变与可哈希、* 解包、zip/range。",
    "字典与集合": "哈希表实现 O(1) 查找；键可哈希要求、插入有序（3.7+）、get/setdefault/update、字典推导、集合交并差、去重惯用法、dict 合并 |。",
    "流程控制": "if/elif/else、for/while、break/continue/循环 else、enumerate、range、三元表达式、match...case 结构化匹配、真值测试。",
    "函数基础": "参数四区（仅位置/普通/*args/**kwargs）、默认参数陷阱、LEGB 作用域、global/nonlocal、lambda、递归、高阶函数、key 排序。",
    "函数高级特性": "闭包与 nonlocal、装饰器（含带参三层结构）、functools.wraps/cache/partial/reduce、map/filter、晚绑定陷阱。",
    "迭代器与生成器": "Iterable 与 Iterator 协议、yield 与生成器函数、生成器表达式惰性求值、send/close、yield from、itertools 工具箱。",
    "面向对象基础": "类与实例、self/cls、__init__ 与 __new__、类属性与实例属性、三种方法、魔术方法 __str__/__repr__/__eq__/__len__、命名约定与名称改写。",
    "面向对象高级": "继承与 super、C3 线性化 MRO、多态与鸭子类型、property、__slots__、dataclass、抽象基类、__call__/__getitem__/__enter__、元类与 __init_subclass__、组合优于继承。",
    "模块与包": "import 体系与 sys.path、__init__.py 与命名空间包、__name__/__main__、__all__、虚拟环境 venv、pip 与依赖管理、循环导入、pyproject.toml 打包。",
    "异常处理": "try/except/else/finally、异常层次 BaseException/Exception、raise 与异常链 from、自定义异常、assert 的适用范围、EAFP 风格、异常组 except*。",
    "文件与IO": "open 模式（r/w/a/x/b）、with 上下文管理、编码与 utf-8-sig、逐行迭代省内存、pathlib、json/csv 读写、StringIO、shutil/os.walk。",
    "常用标准库": "collections（Counter/defaultdict/deque/namedtuple）、datetime 与时区、os/sys、random 与 secrets、math、time/subprocess/logging、functools、itertools。",
    "正则表达式": "元字符与字符类、match/search/findall/sub、贪婪与非贪婪、分组与命名组、编译标志（I/M/S/X）、锚点、灾难性回溯与防范。",
    "内存管理与深浅拷贝": "引用计数 + 分代 GC、循环引用、名字绑定模型、小整数缓存与驻留、浅拷贝与深拷贝、__slots__ 省内存、weakref、del 与 None。",
    "并发编程": "GIL 原理与影响、threading 与锁、multiprocessing 与进程池、asyncio 事件循环与协程、queue.Queue、Future、竞态条件、3.13/3.14 自由线程与多解释器。",
    "类型注解与新特性": "类型注解与静态检查、typing 泛型、Protocol、dataclass/NamedTuple/TypedDict、版本演进 3.8→3.14（walrus/match/异常组/泛型语法/JIT/t-string/延迟注解）。",
    "综合应用与常见坑": "is 与 ==、可变键、迭代中修改、str/bytes 混用、浮点判断、空值判断、除零防护、边界校验与防御式编程、代码审查清单。",
}


def load_all():
    questions = []
    for path in sorted(glob.glob(os.path.join(DATA_DIR, "py_*.json"))):
        with open(path, encoding="utf-8") as f:
            questions.extend(json.load(f)["questions"])
    return questions


def by_category(questions):
    cats = {}
    for q in questions:
        cats.setdefault(q["category"], []).append(q)
    return cats


def gen_questions_md(cats):
    lines = [
        "# Python 知识点总结与 400 题（题目卷）",
        "",
        "> 题库：20 个专题 × 20 题（选择题 12 / 填空题 6 / 简答题 1 / 实战操作题 1），共 400 题。",
        "> 答案与详细解析（含衍生知识点）见《Python400题-答案详解卷.md》；两份文件均可在刷题系统“导入题库”页导入。",
        "",
        "## 一、知识点总览（20 专题）",
        "",
    ]
    for i, (cat, desc) in enumerate(TOPIC_SUMMARY.items(), 1):
        lines.append(f"{i}. **{cat}**：{desc}")
    lines.append("")
    num = 0
    for cat, qs in cats.items():
        lines.append(f"## 专题：{cat}（{len(qs)} 题）")
        lines.append("")
        for q in qs:
            num += 1
            lines.append(f"{num}. 【{TYPE_LABEL[q['type']]}】{q['question']}")
            if q["type"] == "choice":
                for j, opt in enumerate(q["options"]):
                    lines.append(f"   - {LETTERS[j]}. {opt}")
        lines.append("")
    with open(OUT_Q, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    return num


def _choice_answer_str(answer):
    return "".join(a for a in answer if a in "ABCDEF")


def _format_answer_for_md(q):
    """按刷题系统 MD 导入格式生成答案段"""
    t = q["type"]
    if t == "choice":
        return _choice_answer_str(q["answer"])
    if t == "blank":
        parts = []
        for alts in q["answer"]:
            parts.append("**" + " / ".join(alts) + "**")
        return "；".join(parts) + "。"
    return "\n".join(q["answer"]) if isinstance(q["answer"], list) else str(q["answer"])


def gen_answers_md(cats):
    total = sum(len(v) for v in cats.values())
    lines = [
        "# Python 400 题 · 答案详解卷",
        "",
        f"> 共 {total} 题。每题包含：答案、详细说明、【衍生知识点】拓展。",
        "> 本文件与《Python知识点总结与400题-题目卷.md》配套，可直接在刷题系统“导入题库 → Markdown 文件导入”中使用。",
        "",
    ]
    num = 0
    for cat, qs in cats.items():
        lines.append(f"## {cat} · 答案与解析")
        lines.append("")
        for q in qs:
            num += 1
            ans = _format_answer_for_md(q)
            expl = q.get("explanation", "")
            if q["type"] in ("choice", "blank"):
                lines.append(f"{num}. **{ans}**{expl}")
            else:
                lines.append(f"{num}. **参考答案**：")
                for ln in ans.splitlines():
                    lines.append(f"   {ln}")
                if expl:
                    lines.append(f"   【解析】{expl}")
        lines.append("")
    with open(OUT_A, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def gen_import_md(all_questions):
    """生成严格符合刷题系统 MD 导入格式的题目/答案两份文件"""
    type_map = [("choice", "一、选择题（单选）"), ("blank", "二、填空题"),
                ("short", "三、简答题"), ("practical", "四、实战操作题")]
    a_map = [("choice", "一、选择题答案与解析"), ("blank", "二、填空题答案与解析"),
             ("short", "三、简答题参考答案"), ("practical", "四、实战操作题参考答案")]

    q_lines = ["# Python 400 题（导入用·题目卷）", ""]
    for t, head in type_map:
        qs = [q for q in all_questions if q["type"] == t]
        q_lines.append(f"## {head}（{len(qs)} 题）")
        q_lines.append("")
        for i, q in enumerate(qs, 1):
            q_lines.append(f"{i}. {q['question']}")
            if t == "choice":
                for j, opt in enumerate(q["options"]):
                    q_lines.append(f"   - {LETTERS[j]}. {opt}")
        q_lines.append("")

    a_lines = ["# Python 400 题（导入用·答案卷）", ""]
    for t, head in a_map:
        qs = [q for q in all_questions if q["type"] == t]
        a_lines.append(f"## {head}")
        a_lines.append("")
        if t == "choice":
            a_lines.append("| 题号 | 答案 | 解析 |")
            a_lines.append("|---|---|---|")
            for i, q in enumerate(qs, 1):
                expl = q.get("explanation", "").replace("|", "\\|")
                a_lines.append(f"| {i} | {_choice_answer_str(q['answer'])} | {expl} |")
        elif t == "blank":
            for i, q in enumerate(qs, 1):
                expl = q.get("explanation", "")
                a_lines.append(f"{i}. {_format_answer_for_md(q)}{expl}")
        else:
            for i, q in enumerate(qs, 1):
                ans = _format_answer_for_md(q)
                expl = q.get("explanation", "")
                first = ans.splitlines()[0] if ans else ""
                a_lines.append(f"{i}. **参考答案**：{first}")
                for ln in ans.splitlines()[1:]:
                    a_lines.append(f"   {ln}")
                if expl:
                    a_lines.append(f"   【解析】{expl}")
        a_lines.append("")

    with open(OUT_Q_IMPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(q_lines))
    with open(OUT_A_IMPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(a_lines))


if __name__ == "__main__":
    qs = load_all()
    cats = by_category(qs)
    n = gen_questions_md(cats)
    gen_answers_md(cats)
    gen_import_md(qs)
    print(f"生成完成：题目卷 {n} 题 -> {OUT_Q}")
    print(f"          答案详解卷      -> {OUT_A}")
    print(f"          导入用题目/答案 -> {OUT_Q_IMPORT} / {OUT_A_IMPORT}")
