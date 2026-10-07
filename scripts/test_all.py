# -*- coding: utf-8 -*-
"""一键回归测试：串起后端自检 + 前端静态检查 + 前端逻辑单测 + 静态站自检。

用法：
    python scripts/test_all.py            # 后端需已启动（HTTP 用例会据此跳过/失败）
    python scripts/test_all.py --no-http  # 跳过需要后端的 HTTP 用例

退出码：0 = 全部通过；1 = 有任一环节失败。
"""
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PY = sys.executable
NODE_GLOBS = [
    r"C:\Users\22276\.workbuddy\binaries\node\versions\*\node.exe",
    r"D:\软件\node\node.exe",
]


def find_node():
    """按 glob 探测 node（托管运行时目录带版本号后缀，硬编码具体版本会失效）。"""
    from glob import glob
    import shutil

    found = []
    for pattern in NODE_GLOBS:
        found.extend(glob(pattern))
    # 版本号大的优先（字典序即可，本机只有一个版本）
    for p in sorted(found, reverse=True):
        if Path(p).is_file():
            return p
    return shutil.which("node")


def run(title, args, cwd, env=None):
    print()
    print("#" * 78)
    print(f"# {title}")
    print("#" * 78)
    p = subprocess.run(args, cwd=str(cwd), env=env)
    return p.returncode


def main():
    results = []

    results.append(("后端自检（接口冒烟 + 契约 + 题库完整性 + 性能）",
                    run("后端自检 scripts/selfcheck.py",
                        [PY, str(ROOT / "scripts" / "selfcheck.py")], ROOT)))

    results.append(("前端静态检查（模板标识符是否都在 setup 暴露）",
                    run("前端静态检查 scripts/check_frontend.py",
                        [PY, str(ROOT / "scripts" / "check_frontend.py")], ROOT)))

    node = find_node()
    if node:
        results.append(("前端逻辑单测（重置/渐进渲染/防重入/错误归一化）",
                        run("前端逻辑单测 scripts/test_frontend_logic.js",
                            [node, str(ROOT / "scripts" / "test_frontend_logic.js")], ROOT)))
        results.append(("静态版数据层单测（判分/搜索/考试/导入/localStorage）",
                        run("静态版数据层单测 scripts/test_static_logic.js",
                            [node, str(ROOT / "scripts" / "test_static_logic.js")], ROOT)))
        results.append(("静态站装配与契约冒烟（脚本顺序 + 14 端点字段 + 零网络请求）",
                        run("静态站装配冒烟 scripts/test_site_browser.js",
                            [node, str(ROOT / "scripts" / "test_site_browser.js")], ROOT)))
    else:
        print("\n!! 未找到 node，跳过前端逻辑单测与静态站数据层单测")

    # MD 解析器双实现对拍：静态版 JS 与后端 Python 必须逐字段一致
    if node:
        results.append(("MD 解析对拍（JS 移植 vs Python 后端，真实课件逐字段比对）",
                        run("MD 解析对拍 scripts/verify_md_parity.py",
                            [PY, str(ROOT / "scripts" / "verify_md_parity.py")], ROOT)))
        # 真实浏览器端到端：用系统已装的 Edge/Chrome（channel），不下载 Chromium。
        # 找不到浏览器时脚本内部跳过并 exit 0，不阻塞回归。
        e2e = os.path.join(
            r"C:\Users\22276\.workbuddy\binaries\node\workspace\node_modules")
        env = dict(os.environ)
        if os.path.isdir(e2e):
            env["NODE_PATH"] = e2e + os.pathsep + env.get("NODE_PATH", "")
        results.append(("静态站真实浏览器端到端（渲染/刷题/交卷/持久化/考试）",
                        run("静态站端到端 scripts/test_site_e2e.js",
                            [node, str(ROOT / "scripts" / "test_site_e2e.js")], ROOT, env)))
    else:
        print("\n!! 未找到 node，跳过 MD 解析对拍与静态站端到端")

    print()
    print("=" * 78)
    print("回归汇总")
    print("=" * 78)
    ok = True
    for name, code in results:
        flag = "通过" if code == 0 else f"失败(exit {code})"
        if code != 0:
            ok = False
        print(f"  [{flag:>10s}] {name}")
    print("=" * 78)
    print("全部通过" if ok else "存在失败项，请查看上方输出")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
