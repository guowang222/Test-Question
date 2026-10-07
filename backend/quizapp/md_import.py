"""解析《K8s资源对象-测试题.md》与《K8s资源对象-测试题-答案解析.md》，
将题目、答案、解析合并为标准题库记录。"""
import re

QUESTION_SECTIONS = [
    ("一、选择题", "choice"),
    ("二、填空题", "blank"),
    ("三、简答题", "short"),
    ("四、实战操作题", "practical"),
]
ANSWER_SECTIONS = [
    ("一、选择题答案", "choice"),
    ("二、填空题答案", "blank"),
    ("三、简答题参考答案", "short"),
    ("四、实战操作题参考答案", "practical"),
]
NUM_RE = re.compile(r"^(\d+)[\.、]\s*(.*)$")
OPT_RE = re.compile(r"^([A-F])[\.、]\s*(.*)$")


def _split_sections(text, markers):
    """按 '## 标记' 切分文档，返回 {题型: 该节内容}"""
    found = sorted((text.find("## " + m), t) for m, t in markers if text.find("## " + m) >= 0)
    sections = {}
    for i, (idx, t) in enumerate(found):
        end = found[i + 1][0] if i + 1 < len(found) else len(text)
        sections[t] = text[idx:end]
    return sections


def parse_question_md(text):
    sections = _split_sections(text, QUESTION_SECTIONS)
    out = {"choice": [], "blank": [], "short": [], "practical": []}

    # 选择题：编号行 = 题干（可多行），随后的 "- A. xx　B. xx" 行 = 选项
    cur = None
    for line in sections.get("choice", "").splitlines():
        s = line.strip()
        m = NUM_RE.match(s)
        if m:
            cur = {"type": "choice", "question": m.group(2).strip(), "options": []}
            out["choice"].append(cur)
        elif s.startswith("- ") and cur is not None:
            for part in re.split(r"　\s*", s[2:].strip()):
                om = OPT_RE.match(part.strip())
                if om:
                    cur["options"].append(om.group(2).strip())
        elif cur is not None and s:
            cur["question"] += "\n" + line.rstrip()  # 题干续行（保留缩进的代码片段）

    # 填空 / 简答：编号行 + 续行即题目（支持多行题干，保留缩进）
    for t in ("blank", "short"):
        cur = None
        for line in sections.get(t, "").splitlines():
            s = line.strip()
            m = NUM_RE.match(s)
            if m and m.group(2).strip():
                cur = {"type": t, "question": m.group(2).strip()}
                out[t].append(cur)
            elif cur is not None and s:
                cur["question"] += "\n" + line.rstrip()

    # 实操：编号行 + 后续内容（代码块等）直到下一个编号
    cur = None
    for line in sections.get("practical", "").splitlines():
        s = line.strip()
        m = NUM_RE.match(s)
        if m:
            if cur:
                out["practical"].append(cur)
            cur = {"type": "practical", "question": m.group(2).strip()}
        elif cur is not None and s:
            cur["question"] += "\n" + line.rstrip()
    if cur:
        out["practical"].append(cur)
    return out


def parse_answer_md(text):
    sections = _split_sections(text, ANSWER_SECTIONS)
    ans = {"choice": {}, "blank": {}, "short": {}, "practical": {}}

    # 选择题：Markdown 表格 | 题号 | 答案 | 解析 |
    for line in sections.get("choice", "").splitlines():
        s = line.strip()
        if not s.startswith("|"):
            continue
        parts = [p.strip() for p in s.strip("|").split("|")]
        if len(parts) >= 3 and parts[0].isdigit():
            letters = [c for c in parts[1] if c in "ABCDEF"]
            ans["choice"][int(parts[0])] = {"answer": letters, "explanation": parts[2].strip()}

    # 填空题：编号行中 **答案1/答案2**；**答案3**。解析...
    for line in sections.get("blank", "").splitlines():
        s = line.strip()
        m = NUM_RE.match(s)
        if not m:
            continue
        num, rest = int(m.group(1)), m.group(2)
        bolds = re.findall(r"\*\*(.+?)\*\*", rest)
        answer_lists = [[x.strip() for x in re.split(r"\s*/\s*", b) if x.strip()] for b in bolds]
        expl = rest
        for b in bolds:
            expl = expl.replace("**" + b + "**", "", 1)
        expl = expl.lstrip("。；;、， ").strip()
        ans["blank"][num] = {"answer": answer_lists, "explanation": expl}

    # 简答 / 实操：编号行 + 后续内容；去掉 **小标题**：；续行仅剥掉 3 空格列表标记，保留代码缩进
    for t in ("short", "practical"):
        cur_num, buf = None, []
        for line in sections.get(t, "").splitlines():
            s = line.strip()
            m = NUM_RE.match(s)
            if m:
                if cur_num is not None:
                    ans[t][cur_num] = {"answer": "\n".join(buf).strip()}
                cur_num = int(m.group(1))
                rest = re.sub(r"^\*\*.+?\*\*[：:]\s*", "", m.group(2))
                buf = [rest]
            elif cur_num is not None and s:
                raw = line.rstrip()
                if raw.startswith("   "):
                    raw = raw[3:]  # 剥掉 Markdown 列表缩进，保留原有代码缩进
                buf.append(raw)
        if cur_num is not None:
            ans[t][cur_num] = {"answer": "\n".join(buf).strip()}
    return ans


def build_questions(qparsed, aparsed, category="MD导入"):
    """合并题目与答案，返回标准题库记录列表"""
    items = []
    for i, q in enumerate(qparsed["choice"], 1):
        a = aparsed["choice"].get(i)
        if not a or not q["options"]:
            continue
        items.append({
            "type": "choice", "category": category, "question": q["question"],
            "options": q["options"], "answer": a["answer"], "explanation": a["explanation"],
        })
    for t in ("blank", "short", "practical"):
        for i, q in enumerate(qparsed[t], 1):
            a = aparsed[t].get(i)
            if not a or not a["answer"]:
                continue
            if t == "blank":
                answer = a["answer"]
            else:
                answer = [a["answer"]]
            items.append({
                "type": t, "category": category, "question": q["question"],
                "options": [], "answer": answer, "explanation": a.get("explanation", ""),
            })
    return items
