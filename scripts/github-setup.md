# GitHub Pages 上线：只剩最后一步

代码已 100% 推送就绪，工作流也已正常触发多次。
**唯一没完成的是：Pages 功能还没启用。**

## 现状

| 项 | 状态 |
|---|---|
| 代码推送 | 完成（`master` 与两个远端 hash 一致） |
| 工作流注册 | 完成（GitHub 已在 master 上识别到 `pages.yml`） |
| 工作流触发 | 完成（多次自动触发，说明触发条件已修好） |
| **配置 Pages** | **失败 —— Pages 功能未启用** |
| 后续部署步骤 | 全部被跳过（依赖上一步） |
| 线上地址 | 404（站点还不存在） |

## 你要做的唯一一件事

打开：

**https://github.com/guowang222/Test-Question/settings/pages**

在 **Build and deployment** 区域，把 **Source** 下拉框改成：

```
GitHub Actions
```

点 **Save**。

保存后到 **Actions** 页面，在右上角找到 **Run workflow** 按钮，手动再跑一次：

**https://github.com/guowang222/Test-Question/actions**

等 1~3 分钟，最后一个 run 变绿后，访问：

**https://guowang222.github.io/Test-Question/**

## 如果设置页找不到 Source 下拉框

说明你进的是别的标签页。正确路径是 **Settings → 左侧栏最下面的 Pages**。
注意 **不是** "Environments"，也不是 "Code and automation" 里的其他项。

## 设置成功后会看到什么

- Actions 页面出现新的 run，7 个步骤全绿：
  `检出代码 → 尝试自动启用 Pages → 配置 Pages → 校验静态站产物 → 上传 Pages 产物 → 部署 → 冒烟检查`
- 冒烟检查步骤会打印 `::notice::首页可访问（HTTP 200）` 与 `::notice::首页内容正确`
- 仓库首页右上角会出现 "Deployments" 标记

## 以后怎么更新站点

改完题库后：

```bat
D:\项目\k8s\k8s-quiz\scripts\push-github.bat
```

如果改了题库内容，记得先重新生成数据包：

```
D:\项目\k8s\k8s-quiz\.venv\Scripts\python.exe D:\项目\k8s\k8s-quiz\scripts\export_site_data.py
```

推送后 Actions 自动重新发布，**不需要再进网页设置**（Pages 只需开启这一次）。

## 排障速查

| 现象 | 原因 | 处理 |
|---|---|---|
| 工作流压根不触发 | 远端默认分支是 `main` 而工作流只监听 `master`（已修） | 已改；如再犯查 `default_branch` |
| push 报 Internal Server Error | GitHub 写入瞬时故障 | 脚本已内置退避重试，约 2 分钟恢复 |
| 「配置 Pages」失败 | Pages 未启用 | 按上面第一步开启 |
| 「校验静态站产物」失败 | `site/` 缺文件 | 跑 `scripts\test_all.py` 定位 |