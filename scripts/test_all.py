# -*- coding: utf-8 -*-
"""一键回归测试：串起后端自检 + 前端静态检查 + 前端逻辑单测。

用法：
    python scripts/test_all.py            # 后端需已启动（HTTP 用例会据此跳过/失败）
    python scripts/test_all.py --no-http  # 跳过需要后端的 HTTP 用例

退出码：0 = 全部通过；1 = 有任一环节失败。
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PY = sys.executable
NODE_CANDIDATES = [
    Path(r"C:\Users\22276\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"),
]


def find_node():
    for p in NODE_CANDIDATES:
        if p.is_file():
            return str(p)
    import shutil
    return shutil.which("node")


def run(title, args, cwd):
    print()
    print("#" * 78)
    print(f"# {title}")
    print("#" * 78)
    p = subprocess.run(args, cwd=str(cwd))
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
    else:
        print("\n!! 未找到 node，跳过前端逻辑单测")

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
