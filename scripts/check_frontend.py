# -*- coding: utf-8 -*-
"""前端静态自检：校验 Vue 模板里用到的标识符都在 setup() 的 return 中暴露。

为什么需要它：Vue 3 中模板引用了未在 setup() 暴露的 ref 时不会报错，
而是静默变成 undefined。本项目就曾出现 `examDuration` 未暴露，
导致考试成绩单里的「用时」渲染成 NaN:NaN 而无人察觉。

本脚本无需浏览器，改完 app.js 后立刻可跑，用于回归。
用法：python scripts/check_frontend.py
退出码：0 = 通过；1 = 有未暴露标识符；2 = 脚本自身定位失败。
"""
import re
import sys
from pathlib import Path

P = str(Path(__file__).resolve().parent.parent / "frontend" / "js" / "app.js")
src = Path(P).read_text(encoding="utf-8")

# 1) 定位 setup() 的 return 块：行首 4 空格 `return {` 到行首 4 空格 `};`
m_ret = re.search(r"\n    return \{\n(.*?)\n    \};", src, flags=re.S)
if not m_ret:
    print("!! 未能定位 setup() 的 return 块")
    sys.exit(2)
ret_block = m_ret.group(1)
ret_block = re.sub(r"/\*.*?\*/", "", ret_block, flags=re.S)
ret_block = re.sub(r"//.*", "", ret_block)
ret_keys = set()
for part in ret_block.split(","):
    k = part.strip()
    if not k:
        continue
    m = re.match(r"^([A-Za-z_$][\w$]*)", k)
    if m:
        ret_keys.add(m.group(1))

# 2) 取出 template 字符串
tpl_start = src.index("  template: `") + len("  template: `")
tpl_end = src.index("`,\n}).mount", tpl_start)
tpl = src[tpl_start:tpl_end]

# 3) 收集模板中的表达式：插值 + 各类指令
exprs = re.findall(r"\{\{(.*?)\}\}", tpl, flags=re.S)
for attr in ("v-if", "v-else-if", "v-for", "v-model", "v-show", "v-html",
             "@click", "@change", "@keyup.enter", "@keydown",
             ":class", ":style", ":key", ":disabled", ":placeholder", ":title", ":value"):
    for m in re.finditer(re.escape(attr) + r'\s*=\s*"([^"]*)"', tpl):
        exprs.append(m.group(1))

# 4) 模板局部变量：v-for 的迭代变量 + 内联箭头函数参数
local = set()
for m in re.finditer(r'v-for\s*=\s*"\(?\s*([\w$]+)\s*(?:,\s*([\w$]+)\s*)?\)?\s+in\s+', tpl):
    local.add(m.group(1))
    if m.group(2):
        local.add(m.group(2))
for e in exprs:
    for m in re.finditer(r"\(?\s*([A-Za-z_$][\w$]*)\s*\)?\s*=>", e):
        local.add(m.group(1))

# 5) 从表达式里取"根标识符"（属性访问的头部），排除 JS 全局与对象键
JS_GLOBAL = {
    "true", "false", "null", "undefined", "Math", "JSON", "Object", "Array",
    "String", "Number", "Boolean", "Date", "parseInt", "parseFloat",
    "typeof", "new", "return", "if", "else", "of", "in",
    "confirm", "alert", "window", "document", "console", "NaN", "Infinity",
    "Number", "isNaN", "encodeURIComponent", "decodeURIComponent",
}
used = {}
for e in exprs:
    e2 = re.sub(r"/\*.*?\*/", "", e, flags=re.S)
    e2 = re.sub(r"'[^']*'|\"[^\"]*\"", " ", e2)  # 挖掉字符串字面量
    for m in re.finditer(r"(?<![\w$.])([A-Za-z_$][\w$]*)", e2):
        name = m.group(1)
        # 对象字面量的键（形如 `foo: bar`）不是引用
        if re.match(r"\s*:", e2[m.end():m.end() + 1]) and not re.search(r"\?\s*$", e2[:m.start()]):
            continue
        used.setdefault(name, set()).add(e.strip()[:70])

missing = [(n, sorted(c)[:2]) for n, c in sorted(used.items())
           if n not in ret_keys and n not in local and n not in JS_GLOBAL]

print(f"app.js: {P}")
print(f"setup() 暴露的键：{len(ret_keys)}")
print(f"模板局部变量：{sorted(local)}")
print()
if missing:
    print(f"!! 模板使用但未暴露的标识符：{len(missing)}")
    for n, c in missing:
        print("   -", n, "|", c)
else:
    print("OK：模板中所有标识符都已在 setup() 中暴露。")

# 反向提示：return 了但模板没用到（可能由 JS 内部或其他入口调用，仅提示）
unused = sorted(k for k in ret_keys if k not in used)
print()
print("仅提示（return 中模板未直接使用的键）：", unused)
sys.exit(1 if missing else 0)
