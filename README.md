# Test-Question —— Kubernetes / 运维刷题系统

一个**前后端分离**的刷题网站，题库由马哥 25 年就业架构系列课件（K8s、Docker、Redis、ELK、Prometheus 等）提炼而来，共 **2024 题 / 27 个题源 / 83 个知识点分类**。

提供**两种运行形态**，共用同一份前端 UI 代码：

| 形态 | 目录 | 数据存放 | 适用场景 |
|---|---|---|---|
| Django 本地版 | `backend/` + `frontend/` | SQLite | 本地日常使用、数据长期留存 |
| 纯静态版 | `site/` | 浏览器 localStorage | 部署 GitHub Pages / 任意静态托管 |

## 特性

- **四种题型**：选择题（1193）、填空题（366）、简答题（440）、实战操作题（25）
- **七种训练模式**：全量刷题、随机抽题、专项训练（按知识点）、文档训练（按题源）、错题重练、星标收藏、考试模式
- **考试模式**：蓝图组卷（各题型数量可配）、限时答题、答题卡跳题、标记待复查、成绩单
- **逐题判分**：客观题自动判分，主观题自评；作答统计（正确率、错题本、掌握度）实时更新
- **收藏与笔记**：题目可加星标，可写个人笔记（笔记参与题库搜索）
- **题库导入**：支持 Markdown（题目卷 + 答案解析卷）与 JSON 两种导入方式，按题干自动去重
- **零依赖前端**：无构建工具，Django 版双击 `frontend/index.html` 即用；静态版直接扔到任意静态服务器
- **完全离线可用**：静态版运行期零网络请求（已由自动化测试断言）

## 目录结构

```
k8s-quiz/
├─ backend/                 Django 后端（纯 JSON API）
│  ├─ manage.py
│  ├─ db.sqlite3            SQLite 题库（2024 题）
│  ├─ requirements.txt      依赖清单
│  ├─ quiz_backend/         settings / urls / cors（自写零依赖 CORS 中间件）
│  └─ quizapp/              models / views / md_import（含 /api/import/json/ 等接口）
├─ frontend/                无构建 Vue3 前端（Django 版）
│  ├─ index.html            双击即用
│  ├─ js/app.js             全部 UI 逻辑（**与 site/js/app.js 是同一份文件**）
│  ├─ js/config.js          window.API_BASE（file:// 时自动指向 127.0.0.1:8000）
│  └─ css/style.css
├─ site/                    纯静态版（GitHub Pages 部署根目录）
│  ├─ index.html            脚本顺序即加载契约：vue → 数据 → 数据层 → 拦截器 → app
│  ├─ js/app.js             与 frontend/js/app.js 完全相同（复制而非软链）
│  ├─ js/questions.data.js  题库数据包（由 scripts/export_site_data.py 生成，必须提交）
│  ├─ js/local-store.js     localStorage 数据层，1:1 复刻 views.py 的 14 个端点
│  ├─ js/static-api.js      fetch 拦截器：把 /api/* 接到本地数据层
│  ├─ js/md-import.js       md_import.py 的 JS 移植（本地导入用）
│  └─ js/site-extra.js      本地数据管理面板（导出/导入/清空 + 存储用量）
├─ scripts/                 一键脚本与自检
│  ├─ setup-env.bat         重建 Python 虚拟环境
│  ├─ start-backend.bat     启动后端（默认 8000）
│  ├─ stop-backend.bat      停止后端
│  ├─ test-all.bat          一键回归自检（7 套）
│  ├─ selfcheck.py          后端自检
│  ├─ check_frontend.py     前端静态检查（模板标识符暴露）
│  ├─ test_frontend_logic.js 前端逻辑单测
│  ├─ export_site_data.py   导出静态站题库数据包
│  ├─ verify_md_parity.py   MD 解析双实现对拍（JS vs Python）
│  ├─ test_static_logic.js  静态版数据层单测
│  ├─ test_site_browser.js  静态站装配与接口契约冒烟
│  ├─ test_site_e2e.js      真实浏览器端到端（渲染/刷题/交卷/持久化/考试）
│  └─ bench_api.py          接口性能基准
├─ .github/workflows/pages.yml  GitHub Pages 自动部署
└─ exports/                 题库导出（可直接查阅）
   ├─ questions.json        全量题库（含答案与解析，可重新导入）
   ├─ 题库总览.md
   ├─ 课件索引.md            每个题源对应的原始课件路径
   ├─ 试题册-<题源>.md       27 份（不含答案）
   └─ 答案册-<题源>.md       27 份（答案 + 解析）
```

## 快速开始

### 1. 准备环境（Windows）

需要 **Python 3.12+**（本项目在 Python 3.14 上开发测试）。

```bat
:: 自动创建项目内虚拟环境 .venv 并安装依赖
scripts\setup-env.bat
```

或手动：

```bat
py -3.14 -m venv .venv
.venv\Scripts\python.exe -m pip install -i https://mirrors.aliyun.com/pypi/simple/ -r backend\requirements.txt
```

### 2. 启动服务

```bat
scripts\start-backend.bat
```

服务地址 http://127.0.0.1:8000 —— 同时提供 JSON API 与前端页面。

### 3. 打开前端

三种方式任选：

| 方式 | 地址 | 说明 |
| --- | --- | --- |
| 同源访问 | http://127.0.0.1:8000 | 最简单，推荐 |
| 独立静态服务器 | http://127.0.0.1:5500 | 靠后端 CORS 跨域 |
| 双击打开 | `frontend/index.html` | `config.js` 自动切换到 127.0.0.1:8000 |

## 主要 API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/questions/` | 题目列表，支持 `source`/`category`/`type`/`mode`/`q`/`count`/`offset` |
| GET | `/api/stats/` | 题库概览 + 掌握度统计 |
| GET | `/api/sources/` | 题源列表 |
| POST | `/api/submit/` | 提交作答并判分 |
| POST | `/api/feedback/` | 主观题自评反馈 |
| GET/POST | `/api/note/` | 读取/保存题目笔记 |
| POST | `/api/star/` | 星标收藏 |
| POST | `/api/exam/start/`、`/api/exam/submit/` | 考试模式 |
| POST | `/api/import/md/`、`/api/import/json/` | 题库导入（按题干去重） |

## 导入格式契约

导入 JSON 时，`questions` 数组中每题的字段要求：

```jsonc
{
  "type": "choice",              // choice | blank | short | practical
  "category": "K8s Pod笔试",
  "question": "题干，可带【主题】前缀",
  "options": ["选项1", "选项2", "选项3", "选项4"],   // choice 专用，不带 "A." 前缀
  "answer": ["B"],               // choice: 单个大写字母
  "explanation": "解析"
}
```

- **choice**：`answer` 为单字母大写数组，如 `["B"]`
- **blank**：`answer` 为**嵌套列表**，外层每个元素对应题面 1 个 `______`，内层是同义可接受答案：
  ```jsonc
  { "question": "K8s 中 ______ 负责调度，______ 负责存储", "answer": [["kube-scheduler"], ["etcd"]] }
  ```
  题面 `______` 个数必须与 `answer` 外层元素个数**严格相等**（否则前端只渲染出部分输入框）
- **short / practical**：`answer` 为**单元素数组**，多项内容用 `\n` 连接（前端只渲染第一段）

## 回归自检

改完代码后运行：

```bat
scripts\test-all.bat
```

依次执行七套检查（全部通过才算绿）：

| 检查 | 覆盖内容 |
| --- | --- |
| `scripts/selfcheck.py` | 后端：接口冒烟 + 字段契约 + ORM 题库完整性 + 搜索一致性 + 判分正确性 + 性能阈值 |
| `scripts/check_frontend.py` | 前端静态：Vue 模板用到的标识符是否都在 `setup()` 暴露 |
| `scripts/test_frontend_logic.js` | 前端逻辑：状态重置、渐进渲染、防重入、错误归一化 |
| `scripts/test_static_logic.js` | 静态版数据层：判分/ 搜索 / 考试 / 导入 / localStorage 读写 |
| `scripts/test_site_browser.js` | 静态站装配：脚本加载顺序、14 个端点字段契约、零网络请求 |
| `scripts/verify_md_parity.py` | MD 解析双实现对拍：JS 移植 vs Python 后端，真实课件逐字段比对 |
| `scripts/test_site_e2e.js` | 真实浏览器端到端：渲染 → 刷题 → 交卷 → 刷新持久化 → 搜索 → 考试 |

> `selfcheck.py` 需要后端正在运行。性能基准用 `scripts/bench_api.py`（写操作走事务回滚，不污染数据）。
>
> `test_site_e2e.js` 用系统已安装的 Edge/Chrome（Playwright `channel`），不额外下载 Chromium；
> 找不到浏览器时自动跳过并返回成功。需 `NODE_PATH` 指向 `playwright-core` 所在目录
> （`test_all.py` 会自动设置）。

## 纯静态版（GitHub Pages）

### 工作原理

静态版**没有另写一套前端**，而是复用同一份 `app.js`，在它之前注入一个 `fetch` 拦截器：

```
浏览器 fetch("/api/stats/")
   ↓ static-api.js 拦下（只拦 /api/ 前缀，其余原样放行）
   ↓ local-store.js 从 localStorage 读取 / 计算
   ↓ 返回与Django 后端同构的 JSON
app.js 完全不知道自己在静态站上跑
```

这保证了「两种形态行为一致」，并且由`verify_md_parity.py`（MD 解析）
与 `test_site_browser.js` / `test_site_e2e.js`（接口契约与真实交互）持续验证。

### 数据存放

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 题库本体（2024 题） | `site/js/questions.data.js` | 只读，随仓库提交 |
| 作答统计 / 错题本 | localStorage `k8squiz.v1.stats` | 答错自动入本，答对自动移出 |
| 个人笔记 | localStorage `k8squiz.v1.notes` | 参与题库搜索 |
| 星标收藏 | localStorage `k8squiz.v1.stars` | |
| 考试档案 | localStorage `k8squiz.v1.sessions` | 保留最近 200 场，界面显示最近 10 场 |
| 本地导入的题| localStorage `k8squiz.v1.extra` | 按题干去重 |

> ⚠️ 清除浏览器数据会导致学习记录丢失。页面右下角的 ⚙️ 面板可**导出备份 JSON**，
> 换设备时用「导入备份」恢复。

### 本地预览

```bat
cd site
python -m http.server 8899
```

然后访问 http://127.0.0.1:8899/

### 更新题库后重新生成数据包

```bat
.venv\Scripts\python.exe scripts\export_site_data.py
```

改完题库（导入新课件等）后必须重跑，否则静态站仍是旧题。
该脚本从数据库读全量题目；数据库不可用时回退到 `exports/questions.json`。

### 部署

`.github/workflows/pages.yml` 会在每次推送 `master` 且 `site/` 有变更时：

1. 校验产物齐全（缺文件直接失败，不把坏站推上去）
2. 上传 `site/` 为 Pages 产物
3. 部署
4. 冒烟检查：回访首页确认 HTTP 200 且内容正确

首次使用需在仓库 **Settings → Pages → Source** 选 **GitHub Actions**。

## 题库构成

完整统计见 [`exports/题库总览.md`](exports/题库总览.md)，课件来源见 [`exports/课件索引.md`](exports/课件索引.md)。

| 题源 | 题量 | | 题源 | 题量 |
| --- | ---: | --- | --- | ---: |
| Python 400题 | 400 | | 马哥阿里云课件 | 63 |
| 马哥微服务课件 | 99 | | 马哥Redis课件 | 61 |
| 马哥ELK课件 | 85 | | 马哥K8s有状态服务课件 | 54 |
| 马哥Prometheus课件 | 77 | | K8s资源对象 | 53 |
| 马哥MinIO课件 | 75 | | 马哥K8s工作负载课件 | 52 |
| 马哥Git和GitLab课件 | 74 | | 马哥K8s服务发现课件 | 52 |
| 马哥K8s安全机制课件 | 73 | | 马哥K8s HPA课件 | 48 |
| 马哥K8s集群维护课件 | 72 | | 马哥K8s Helm课件 | 48 |
| 马哥K8s网络插件课件 | 71 | | 马哥KVM课件 | 47 |
| 马哥Jenkins课件 | 70 | | 马哥JAVA项目案例课件 | 46 |
| 马哥Docker课件 | 68 | | 马哥K8s Ingress课件 | 46 |
| 马哥K8s数据存储课件 | 68 | | 马哥K8s调度机制课件 | 46 |
| 马哥K8s架构与部署课件 | 68 | | 马哥JumpServer课件 | 44 |
| 马哥K8s资源对象与Pod课件 | 64 | | | |

## 关于课件原文

课件 PDF **未包含在本仓库中**：源文件合计约 3.7 GB，且多份单文件超过 50 MB，超出 Gitee 免费版的配额（单仓库 500 MB、单文件 50 MB）。各课件的原始路径见 [`exports/课件索引.md`](exports/课件索引.md)。

## 许可

题库内容整理自教学课件，仅供个人学习使用。
