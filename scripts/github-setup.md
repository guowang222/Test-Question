# 开启 GitHub Pages 部署（最后一步，只需做一次）

代码已经全部推送到 GitHub，工作流也已经跑起来了。
现在只差**在网页上开启 Pages 功能**，开启后工作流会自动重新部署。

## 唯一要做的一步

打开这个页面：

**https://github.com/guowang222/Test-Question/settings/pages**

找到 **Build and deployment** → **Source**，下拉选择：

```
GitHub Actions
```

选完保存即可。等待 1~3 分钟，Actions 会自动重跑并完成部署。

## 部署完成后的地址

**https://guowang222.github.io/Test-Question/**

## 验证是否成功

Actions 页面：https://github.com/guowang222/Test-Question/actions
最后一个 run 应该是绿色的 ✓，其中「部署」和「冒烟检查」两步会分别确认：
- 产物上传成功
- 首页 HTTP 200 且内容包含 `js/static-api.js`

## 以后怎么更新

在本地改完题库后：

```bat
D:\项目\k8s\k8s-quiz\scripts\push-github.bat
```

或手动：

```
D:\软件\Git\cmd\git.exe -C D:\项目\k8s\k8s-quiz push github master
```

推送后 Actions 自动重新部署，无需再进网页设置。

注意：如果改了题库，`site/js/questions.data.js` 需要先重新生成：

```
D:\项目\k8s\k8s-quiz\.venv\Scripts\python.exe D:\项目\k8s\k8s-quiz\scripts\export_site_data.py
```

## 如果 Actions 又失败了

先看失败在哪一步（点进 run → 点红色步骤看日志）。常见两种：

1. 「配置 Pages」失败 → Source 没选 GitHub Actions，回到本页面设置
2. 「校验静态站产物」失败 → 本地 `site/` 有文件缺失，跑一遍
   `D:\项目\k8s\k8s-quiz\.venv\Scripts\python.exe D:\项目\k8s\k8s-quiz\scripts\test_all.py`
   确认七套回归通过后再推
