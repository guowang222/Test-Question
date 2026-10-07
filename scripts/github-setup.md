# Pages 部署被环境保护规则拦住：两种解法

## 报错原文

```
Branch "master" is not allowed to deploy to github-pages
due to environment protection rules.
```

## 原因（已实测确认）

你在 Settings → Pages 选 Source = GitHub Actions 时，GitHub 自动创建了 `github-pages`
环境，并把**当时的默认分支 `main`** 加进了分支白名单。

实测数据：

- `github-pages` 环境存在，`deployment_branch_policy.custom_branch_policies = true`
- 白名单里**只有一个分支**：`main`（policy id `62267987`）
- 我们的代码全在 `master` 上 → 部署被规则拒绝

而 `main` 分支是 GitHub 建仓时的空壳，只有一个 **15 字节的 README.md**，没有任何内容。

---

## 方案 A：给 `master` 加白名单（推荐，改动最小）

**https://github.com/guowang222/Test-Question/settings/environments**

1. 在列表里点进 **`github-pages`**
2. 找到 **Deployment branches and tags**
3. 下方会看到已有一条 `main`
4. 点 **Add deployment branch**
5. 输入框填 **`master`**，确认
6. 回到 **Actions** 页面 → 右上角 **Run workflow** 手动跑一次

完成后访问 **https://guowang222.github.io/Test-Question/**

---

## 方案 B：改成允许所有分支（一劳永逸）

同上页面，把 **Deployment branches and tags** 改成 **All branches**。

好处是以后分支改名也不用再来配；代价是少一道限制。

---

## 方案 C：治本 —— 把默认分支改成 master，删掉 main

这个方案最干净，能彻底消除「分支名不一致」带来的一连串问题
（默认分支 ≠ 部署分支、CI 触发不生效等）。

1. **https://github.com/guowang222/Test-Question/settings/branches**
   把 Default branch 改成 `master`
2. 回 `main` 分支页面 → 删掉它
3. Environments 里的白名单从 `main` 改成 `master`（或设 All branches）
4. Actions 页面手动 Run workflow 一次

> `main` 里只有 15 字节 README，删掉不丢任何东西。
> 注意：Gitee 上仍然只有 `master`，不受影响。

---

## 无论选哪个方案

**代码侧已经完全就绪**，不需要改任何东西：

| 项 | 状态 |
|---|---|
| 代码推送 | 完成，两远端 hash 一致 |
| 143 个文件 / 5.92 MB / 0 个 PDF | 已确认 |
| 七套回归自检 | 全部通过 |
| 工作流触发 | 已正常触发 |

之前那几个问题（默认分支是 main 导致工作流不触发、push 偶发 500、pages 过滤导致空提交不触发）**都已修掉**。

设完白名单后到 Actions 页面手动跑一次 `Run workflow` 即可，不需要再改代码。