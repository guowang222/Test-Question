# 马哥JumpServer课件 —— 试题册

> 共 44 题。答案与解析见《答案册-马哥JumpServer课件.md》。


## JumpServer笔试

### 1. 【堡垒机】堡垒机与跳板机最核心的区别是什么？

- **A.** 堡垒机体积更小
- **B.** 堡垒机实现了对运维人员操作行为的控制和审计，跳板机没有
- **C.** 跳板机只能管理 Linux 主机
- **D.** 堡垒机必须部署在公网

### 2. 【堡垒机】JumpServer 采用的是哪种开源协议？

- **A.** MIT
- **B.** Apache 2.0
- **C.** GNU GPL v2.0
- **D.** BSD 3-Clause

### 3. 【堡垒机】JumpServer 被称为『符合 4A 的专业运维审计系统』，4A 指的是？

- **A.** Application / API / Audit / Alert
- **B.** Authentication 身份认证 / Account 账号管理 / Authorization 授权控制 / Audit 安全审计
- **C.** Asset / Account / Authority / Analysis
- **D.** Access / Auth / Audit / Automation

### 4. 【堡垒机】JumpServer 使用什么语言和框架开发？

- **A.** Java / Spring Boot
- **B.** Python / Django
- **C.** Go / Gin
- **D.** PHP / Laravel

### 5. 【堡垒机】JumpServer 现已支持管理的资产协议不包括？

- **A.** SSH
- **B.** Telnet
- **C.** RDP
- **D.** BGP

### 6. 【堡垒机】下列哪一项不属于 JumpServer 的特色优势？

- **A.** 分布式架构，支持大规模并发访问
- **B.** 无插件，仅需浏览器即可获得 Web Terminal 体验
- **C.** 内置杀毒引擎，可查杀主机病毒
- **D.** 多租户，一套系统多个子公司和部门同时使用

### 7. 【堡垒机】JumpServer 各组件中，Core 组件的作用是？

- **A.** 服务于 Windows 资产的连接
- **B.** 核心组件，其他组件都依赖此组件启动
- **C.** 负责会话录像转 MP4
- **D.** 处理数据库的客户端代理访问

### 8. 【堡垒机】JumpServer 中负责类 Unix 资产连接（SSH/Telnet 字符型连接）的组件是？

- **A.** Lion
- **B.** Koko
- **C.** Razor
- **D.** Chen

### 9. 【堡垒机】JumpServer 中负责在 Web 端访问 Windows 资产的组件是？

- **A.** Lion
- **B.** Magnus
- **C.** Kael
- **D.** Video

### 10. 【堡垒机】JumpServer 中用于通过客户端代理访问数据库资产的组件是？

- **A.** Chen
- **B.** Magnus
- **C.** Razor
- **D.** XRDP

### 11. 【堡垒机】JumpServer 中把会话录像转换为 MP4 格式的组件是？

- **A.** Celery
- **B.** Video
- **C.** Kael
- **D.** Magnus

### 12. 【堡垒机】JumpServer 前端 UI 项目 Lina 主要使用什么技术完成？

- **A.** Angular CLI
- **B.** Vue + Element UI
- **C.** React + Ant Design
- **D.** Go + Gin

### 13. 【堡垒机】JumpServer 的环境要求中，硬件最低配置是？

- **A.** 1 核 2G 20G
- **B.** 2 个 CPU 核心 / 4G 内存 / 50G 硬盘
- **C.** 4 核 8G 100G
- **D.** 8 核 16G 200G

### 14. 【堡垒机】JumpServer 默认的 Web 访问端口和 SSH 访问端口分别是？

- **A.** 8080 和 22
- **B.** 80 和 2222
- **C.** 443 和 2222
- **D.** 8000 和 22

### 15. 【堡垒机】JumpServer v4.0.0 版本以后，默认管理员 admin 的初始密码是？

- **A.** admin
- **B.** ChangeMe
- **C.** jumpserver
- **D.** 123456

### 16. 【堡垒机】基于 Docker 部署 JumpServer 时，外置 MySQL 和 Redis 的版本要求是？

- **A.** MySQL ≥ 5.6、Redis ≥ 5.0
- **B.** MySQL ≥ 5.7、Redis ≥ 6.0
- **C.** MySQL ≥ 8.0、Redis ≥ 7.0
- **D.** 无版本要求

### 17. 【堡垒机】JumpServer 对接 MySQL 8.0 时，为什么要修改认证插件？

- **A.** MySQL 8.0 默认插件 caching_sha2_password 不符合要求，需改为 mysql_native_password
- **B.** MySQL 8.0 不支持 utf8 字符集
- **C.** MySQL 8.0 默认端口不是 3306
- **D.** MySQL 8.0 不支持远程连接

### 18. 【堡垒机】新版 JumpServer 容器部署时，DB_ENGINE 环境变量的取值要求是？

- **A.** 默认就是 mysql，可不填
- **B.** 默认是 postgreSQL，使用 MySQL 必须显式指定 DB_ENGINE=mysql
- **C.** 只能是 sqlite
- **D.** 必须填 oracle

### 19. 【堡垒机】启动 jms_all 容器时使用 --privileged=true 的原因是？

- **A.** 为了能映射更多端口
- **B.** 容器内需要特权以完成相关系统操作(如挂载、设备访问等)
- **C.** 为了加速镜像拉取
- **D.** 为了开启 SELinux

### 20. 【堡垒机】用 docker-compose 官方编排部署 JumpServer 时，默认创建的自定义网络网段是？

- **A.** 172.17.0.0/16
- **B.** 172.18.0.0/16
- **C.** 172.30.0.0/16
- **D.** 10.0.0.0/16

### 21. 【堡垒机】JumpServer 支持的三种登录用户角色是？

- **A.** 管理员 / 开发者 / 运维
- **B.** 系统管理员 / 普通用户 / 系统审计员
- **C.** 超级管理员 / 审计员 / 访客
- **D.** 管理员 / 操作员 / 观察员

### 22. 【堡垒机】关于 JumpServer 的命令过滤器，下列说法正确的是？

- **A.** 规则按优先级从低到高匹配，未匹配到则禁止
- **B.** 高优先级规则先匹配；匹配到『允许』则放行、匹配到『禁止』则拦截；所有规则都未匹配则允许执行
- **C.** 只要绑定过滤器，所有命令都会被禁止
- **D.** 过滤器只能绑定资产，不能绑定系统用户

### 23. 【堡垒机】JumpServer 中对『系统用户中的特权用户』(旧称管理用户)的描述，正确的是？

- **A.** 用于登录 JumpServer 的用户
- **B.** 对后端服务器具有管理权限的系统帐号(root/administrator 或 sudo ALL)，用于推送或创建系统用户、获取资产信息
- **C.** 是后端服务器上的普通业务账号
- **D.** 是新版新增的审计角色

### 24. 【堡垒机】JumpServer 中用户绑定的『MFA 二次认证』，典型实现是？

- **A.** 短信验证码
- **B.** Google Authenticator 动态验证码
- **C.** 指纹识别
- **D.** UKey

### 25. 【堡垒机】JumpServer 的审计功能中，关于录像回放，下列说法正确的是？

- **A.** 所有版本录像都能直接下载播放
- **B.** 可以在线回放；离线查看需下载专门播放器，且 v2.19.1 版录像存在无法打开的问题
- **C.** 录像只能保存 7 天
- **D.** 录像无法在线查看

### 26. 【堡垒机】批量导入资产时，对导出的文件需要做的处理是？

- **A.** 直接原样导入即可
- **B.** 删除 id 列、修改主机名和 IP 字段后再导入
- **C.** 只需修改文件编码为 GBK
- **D.** 必须转换为 JSON 格式

### 27. JumpServer 使用 ______ 和 ______ 进行开发，遵循 Web 2.0 规范。

> 共 2 个空。

### 28. JumpServer 默认的 Web 访问端口是 ______，SSH 访问端口是 ______。

> 共 2 个空。

### 29. 堡垒机的 4A 规范指：身份认证 Authentication、账号管理 Account、______、______。

> 共 2 个空。

### 30. JumpServer 组件中，______ 服务于类 Unix 资产(SSH/Telnet 字符型连接)，______ 服务于 Windows 资产(Web 端访问)。

> 共 2 个空。

### 31. JumpServer 官方一键安装脚本的用法是 `curl -sSL https://resource.fit2cloud.com/.../quick_start.sh | ______`。

> 共 1 个空。

### 32. JumpServer 的会话录像由 ______ 组件负责做格式转换，最终变为 ______ 格式。

> 共 2 个空。


## JumpServer面试

### 33. 跳板机和堡垒机有什么区别？为什么需要堡垒机？

### 34. 请解释堡垒机的 4A 规范，并说明 JumpServer 各对应哪些功能。

### 35. JumpServer 有哪些核心组件？各有什么作用？

### 36. JumpServer 支持哪些安装方式？各适合什么场景？

### 37. JumpServer 中的三种用户类型分别是什么？如何理解『特权用户』和『普通用户』？

### 38. 为什么 JumpServer 建议使用外置 MySQL 和 Redis？有哪些版本要求？

### 39. docker-compose 部署 JumpServer 时，healthcheck 和 depends_on 起什么作用？

### 40. JumpServer 如何实现对危险命令的管控？

### 41. JumpServer 的审计功能包括哪些方面？

### 42. 如何查看和回放 JumpServer 的历史会话？离线回放要注意什么？

### 43. JumpServer 如何批量导入资产？导入后还需要做什么？

### 44. JumpServer 的数据库资产授权与普通资产授权有什么区别？
