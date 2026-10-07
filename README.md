# Test-Question —— Kubernetes / 运维刷题系统

一个**前后端分离**的本地刷题网站，题库由马哥 25 年就业架构系列课件（K8s、Docker、Redis、ELK、Prometheus 等）提炼而来，共 **2024 题 / 27 个题源 / 83 个知识点分类**。

## 特性

- **四种题型**：选择题（1193）、填空题（366）、简答题（440）、实战操作题（25）
- **三种训练模式**：顺序练习、随机练习、错题本；支持按题源 / 知识点 / 题型筛选
- **考试模式**：可自定义各题型数量与时长，倒计时自动交卷，支持标记待复查
- **逐题判分**：客观题自动判分，主观题自评；作答统计（正确率、错题本、掌握度）实时更新
- **收藏与笔记**：题目可加星标，可写个人笔记
- **题库导入**：支持 Markdown（题目卷 + 答案解析卷）与 JSON 两种导入方式，按题干自动去重
- **零依赖前端**：无构建工具，双击 `frontend/index.html` 即可用

## 目录结构

```
k8s-quiz/
├─ backend/                 Django 后端（纯 JSON API）
│  ├─ manage.py
│  ├─ db.sqlite3            SQLite 题库（2024 题）
│  ├─ requirements.txt      依赖清单
│  ├─ quiz_backend/         settings / urls / cors（自写零依赖 CORS 中间件）
│  └─ quizapp/              models / views（含 /api/import/json/ 等接口）
├─ frontend/                无构建 Vue3 前端
│  ├─ index.html            双击即用
│  ├─ js/app.js             全部逻辑
│  ├─ js/config.js          window.API_BASE（file:// 时自动指向 127.0.0.1:8000）
│  └─ css/style.css
├─ scripts/                 一键脚本与自检
│  ├─ setup-env.bat         重建 Python 虚拟环境
│  ├─ start-backend.bat     启动后端（默认 8000）
│  ├─ stop-backend.bat      停止后端
│  ├─ test-all.bat          一键回归自检
│  ├─ selfcheck.py          后端自检 76 项
│  ├─ check_frontend.py     前端静态检查（模板标识符暴露）
│  ├─ test_frontend_logic.js 前端逻辑单测 36 项
│  └─ bench_api.py          接口性能基准
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

等价于依次执行三套检查：

| 检查 | 覆盖内容 |
| --- | --- |
| `scripts/selfcheck.py` | 后端 76 项：接口冒烟 + 字段契约 + ORM 题库完整性 + 搜索一致性 + 判分正确性 + 性能阈值 |
| `scripts/check_frontend.py` | 前端静态：Vue 模板用到的标识符是否都在 `setup()` 暴露 |
| `scripts/test_frontend_logic.js` | 前端逻辑 36 项：状态重置、渐进渲染、防重入等行为断言 |

> `selfcheck.py` 需要后端正在运行。性能基准用 `scripts/bench_api.py`（写操作走事务回滚，不污染数据）。

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
