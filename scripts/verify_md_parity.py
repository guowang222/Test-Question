"""对拍：JS 版 md-import.js 与 Python 版 md_import.py 在真实课件上的输出是否一致。

这是静态版移植正确性的关键证据——两份实现必须逐字段相同，
否则「同一份 app.js 在两种部署下行为一致」这个承诺就不成立。

做法：
1. 扫描 exports/ 与项目里现成的《…-测试题.md》《…-答案解析.md》；
2. Python 侧解析 → 写 JSON；
3. Node 侧用 md-import.js 解析同样文件 → 写 JSON；
4. 逐字段比对，打印首个差异位置。

运行：.venv/Scripts/python.exe scripts/verify_md_parity.py
"""
import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
BACKEND = os.path.join(ROOT, "backend")
sys.path.insert(0, BACKEND)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quiz_backend.settings")


def find_md_pairs(limit=40):
    """找出成对的题目 MD 与答案解析 MD。

    命名规则不止一种，实践中见过：
      X-测试题.md  +  X-答案解析.md      （出题流程的产物）
      X-题目.md     +  X-答案.md         （早期 Python400 题）
      X-导入用-题目.md + X-导入用-答案.md
    统一按「同目录、同前缀、一个当题目一个当答案」配对。
    """
    roots = [os.path.join(ROOT, "exports"), os.path.join(ROOT, "backend"), ROOT]
    q_pat = re.compile(r"^(.*?)-?(?:测试题|题目|题目卷)\.md$")
    a_pat = re.compile(r"^(.*?)-?(?:答案解析|答案详解卷|答案)\.md$")
    seen, out = set(), []
    for base in roots:
        for dirpath, dirnames, filenames in os.walk(base):
            dirnames[:] = [d for d in dirnames if d not in
                           (".git", ".venv", "node_modules", "__pycache__", "site", "scripts",
                            ".workbuddy", "backups")]
            cands = []
            for fn in filenames:
                if not fn.lower().endswith(".md"):
                    continue
                mq, ma = q_pat.match(fn), a_pat.match(fn)
                if mq:
                    cands.append(("q", mq.group(1), os.path.join(dirpath, fn)))
                elif ma:
                    cands.append(("a", ma.group(1), os.path.join(dirpath, fn)))
            for kind, prefix, path in cands:
                key = (path, kind)
                if key in seen:
                    continue
                seen.add(key)
                for k2, p2, path2 in cands:
                    if k2 != kind and p2 == prefix:
                        out.append((prefix, path if kind == "q" else path2,
                                    path2 if kind == "q" else path))
    # 去重（同一对可能被多个 root 扫到）
    uniq, done = [], set()
    for pair in out:
        key = tuple(sorted(pair[1:]))
        if key not in done:
            done.add(key)
            uniq.append(pair)
    uniq.sort()
    return uniq[:limit]


NODE_SCRIPT = r"""
// 用 argv 传路径：run.js <md-import.js> <jobs.json> <out.json>
// （早先用字符串替换把 Windows 路径塞进 JS 字面量，会被二次转义成 \"D:\u9879...\"）
const fs = require('fs'), vm = require('vm');
const [mdJs, jobsPath, outPath] = process.argv.slice(2);
const sandbox = { window: null, console, JSON, Math, Date, Object, Array, String,
                  Number, isNaN, parseInt, parseFloat, Error, RegExp, Boolean,
                  setTimeout, clearTimeout };
sandbox.window = sandbox; sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(mdJs, 'utf8'), sandbox, { filename: 'md-import.js' });
const MD = sandbox.QuizMD;
const out = [];
for (const job of JSON.parse(fs.readFileSync(jobsPath, 'utf8'))) {
  const q = fs.readFileSync(job.q, 'utf8');
  const a = fs.readFileSync(job.a, 'utf8');
  out.push({
    name: job.name,
    parsed: MD.buildQuestions(MD.parseQuestionMd(q), MD.parseAnswerMd(a), 'MD导入'),
  });
}
fs.writeFileSync(outPath, JSON.stringify(out));
"""


def main():
    import django

    django.setup()
    from quizapp import md_import

    pairs = find_md_pairs()
    if not pairs:
        print("未找到成对的《-测试题.md》/《-答案解析.md》，无法对拍")
        return 1
    print(f"找到 {len(pairs)} 对文件，开始对拍…\n")

    # Python 侧结果
    py = []
    for name, qp, ap in pairs:
        qtext = open(qp, encoding="utf-8-sig", errors="replace").read()
        atext = open(ap, encoding="utf-8-sig", errors="replace").read()
        items = md_import.build_questions(
            md_import.parse_question_md(qtext), md_import.parse_answer_md(atext), "MD导入")
        py.append({"name": name, "parsed": items})

    # Node 侧结果
    tmp = tempfile.mkdtemp(prefix="mdparity_")
    jobs_path = os.path.join(tmp, "jobs.json")
    out_path = os.path.join(tmp, "out.json")
    js_path = os.path.join(tmp, "run.js")
    with open(jobs_path, "w", encoding="utf-8") as f:
        json.dump([{"name": n, "q": q, "a": a} for n, q, a in pairs], f, ensure_ascii=False)
    mdjs = os.path.join(ROOT, "site", "js", "md-import.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(NODE_SCRIPT)
    r = subprocess.run(["node", js_path, mdjs, jobs_path, out_path],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        print("Node 侧执行失败：\n" + (r.stderr or r.stdout))
        return 1
    js = json.load(open(out_path, encoding="utf-8"))

    # 比对
    total_items = 0
    diffs = []
    for p, j in zip(py, js):
        assert p["name"] == j["name"]
        pi, ji = p["parsed"], j["parsed"]
        total_items += len(pi)
        if len(pi) != len(ji):
            diffs.append(f"[{p['name']}] 题数不同：Python {len(pi)} vs JS {len(ji)}")
            continue
        for idx, (a, b) in enumerate(zip(pi, ji)):
            for key in ("type", "category", "question", "options", "answer", "explanation"):
                if a.get(key) != b.get(key):
                    diffs.append(
                        f"[{p['name']}] 第 {idx + 1} 题字段 {key} 不同：\n"
                        f"    Python: {json.dumps(a.get(key), ensure_ascii=False)[:300]}\n"
                        f"    JS    : {json.dumps(b.get(key), ensure_ascii=False)[:300]}")
                    break

    print(f"对拍文件对：{len(pairs)}，题目总数：{total_items}")
    if diffs:
        print(f"\n发现 {len(diffs)} 处差异：")
        for d in diffs[:20]:
            print("  ✗ " + d)
        if len(diffs) > 20:
            print(f"  … 另有 {len(diffs) - 20} 处")
        return 1
    print("两份实现输出完全一致 ✓")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())