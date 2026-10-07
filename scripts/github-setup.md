# 一键推送到 GitHub + 触发 GitHub Pages 部署

前置条件（需你本人在浏览器完成，一次性，约 2 分钟）：

1. **添加 SSH 公钥**
   - 打开 https://github.com/settings/ssh/new
   - Title 填 `k8s-quiz`
   - Key 粘贴下面整行：
     ```
     ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIVOkpqQ3RyFOPqDAp/vjGIeZN78IegfWDxbA83PSFY0 guowang222@github
     ```
2. **创建空仓库**（不要勾选 README / .gitignore / License）
   - 打开 https://github.com/new
   - Owner 选 `guowang222`
   - Repository name 填 `Test-Question`
   - Visibility 选 **Public**（GitHub Pages 免费账户要求公开）
   - 点 Create repository

完成后双击本目录下的 `push-github.bat`，或在项目根目录执行：

```
D:\软件\Git\cmd\git.exe push github master
```

推送成功后还需要最后一步：进仓库 https://github.com/guowang222/Test-Question/settings/pages
把 **Source** 选成 **GitHub Actions**，然后 Actions 会自动部署。

部署完成的地址：
https://guowang222.github.io/Test-Question/
