# 马哥JumpServer课件 —— 答案与解析

> 共 44 题，编号与《试题册-马哥JumpServer课件.md》一致。


## JumpServer笔试

### 1. 【堡垒机】堡垒机与跳板机最核心的区别是什么？

**答案**

**B**　堡垒机实现了对运维人员操作行为的控制和审计，跳板机没有

**解析**

【马哥JumpServer课件】跳板机只是单点登录入口(先登录跳板机再登录目标设备)，没有实现对运维人员操作行为的控制和审计，且一旦被攻入后端资源将完全暴露。堡垒机则能满足角色管理与授权审批、访问控制、操作记录和审计、变更与维护控制等要求，因此成为独立产品形态。

---

### 2. 【堡垒机】JumpServer 采用的是哪种开源协议？

**答案**

**C**　GNU GPL v2.0

**解析**

【马哥JumpServer课件】JumpServer 是全球首款完全开源的堡垒机，使用 GNU GPL v2.0 开源协议，是符合 4A 的专业运维审计系统。(注意：若依 RuoYi 用的是 MIT，两者不要混。)

---

### 3. 【堡垒机】JumpServer 被称为『符合 4A 的专业运维审计系统』，4A 指的是？

**答案**

**B**　Authentication 身份认证 / Account 账号管理 / Authorization 授权控制 / Audit 安全审计

**解析**

【马哥JumpServer课件】4A = 身份认证(Authentication) + 账号管理(Account) + 授权控制(Authorization) + 安全审计(Audit)。这是堡垒机的四个核心能力，也是 JumpServer 功能列表的组织方式。

---

### 4. 【堡垒机】JumpServer 使用什么语言和框架开发？

**答案**

**B**　Python / Django

**解析**

【马哥JumpServer课件】JumpServer 使用 Python / Django 开发，遵循 Web 2.0 规范，配备业界领先的 Web Terminal 解决方案。其核心组件 Core 使用 Django Class Based View 风格开发并支持 Restful API。

---

### 5. 【堡垒机】JumpServer 现已支持管理的资产协议不包括？

**答案**

**D**　BGP

**解析**

【马哥JumpServer课件】JumpServer 支持管理 SSH、Telnet、RDP、VNC 协议资产。BGP 是网络路由协议，不属于被纳管的资产访问协议。

---

### 6. 【堡垒机】下列哪一项不属于 JumpServer 的特色优势？

**答案**

**C**　内置杀毒引擎，可查杀主机病毒

**解析**

【马哥JumpServer课件】JumpServer 六大特色优势：开源(零门槛)、分布式(大规模并发)、无插件(仅需浏览器)、多云支持、云端存储(审计录像永不丢失)、多租户。它本身不是杀毒产品。

---

### 7. 【堡垒机】JumpServer 各组件中，Core 组件的作用是？

**答案**

**B**　核心组件，其他组件都依赖此组件启动

**解析**

【马哥JumpServer课件】Core 是 JumpServer 的核心组件，其他组件依赖此组件启动；Lion 服务于 Windows 资产；Video 负责录像转 MP4；Magnus 负责数据库客户端代理访问。

---

### 8. 【堡垒机】JumpServer 中负责类 Unix 资产连接（SSH/Telnet 字符型连接）的组件是？

**答案**

**B**　Koko

**解析**

【马哥JumpServer课件】Koko 是服务于类 Unix 资产平台的组件，通过 SSH、Telnet 协议提供字符型连接。Koko 是 Go 版本的 coco，重构了 coco 的 SSH/SFTP 服务和 Web Terminal 服务。

---

### 9. 【堡垒机】JumpServer 中负责在 Web 端访问 Windows 资产的组件是？

**答案**

**A**　Lion

**解析**

【马哥JumpServer课件】Lion 服务于 Windows 资产平台，用于 Web 端访问 Windows 资产。它使用了 Apache 基金会开源项目 Guacamole，JumpServer 用 Golang 和 Vue 对其进行了重构。

---

### 10. 【堡垒机】JumpServer 中用于通过客户端代理访问数据库资产的组件是？

**答案**

**B**　Magnus

**解析**

【马哥JumpServer课件】Magnus 是服务于数据库的组件，用于通过客户端代理访问数据库资产；Chen 也是数据库组件，但用于通过 Web GUI 方式访问数据库资产。两者一个走客户端代理、一个走 Web GUI。

---

### 11. 【堡垒机】JumpServer 中把会话录像转换为 MP4 格式的组件是？

**答案**

**B**　Video

**解析**

【马哥JumpServer课件】Video 专门处理 Razor 和 Lion 组件产生录像的格式转换工作，将产生的会话录像转化为 MP4 格式。Celery 则是处理异步任务、执行自动化任务的组件。

---

### 12. 【堡垒机】JumpServer 前端 UI 项目 Lina 主要使用什么技术完成？

**答案**

**B**　Vue + Element UI

**解析**

【马哥JumpServer课件】Lina 是前端 UI 项目，实现 Web 页面展示，主要使用 Vue、Element UI 完成；Luna 则是 Web Terminal 前端，主要使用 Angular CLI 完成。

---

### 13. 【堡垒机】JumpServer 的环境要求中，硬件最低配置是？

**答案**

**B**　2 个 CPU 核心 / 4G 内存 / 50G 硬盘

**解析**

【马哥JumpServer课件】JumpServer 最低硬件配置为 2 个 CPU 核心、4G 内存、50G 硬盘；操作系统 Linux x86_64；Python = 3.6.x；MySQL ≥ 5.6 或 MariaDB ≥ 5.5.56(编码 utf8，新版要求 5.7 以上)；Redis 新版要求 6.0 以上。

---

### 14. 【堡垒机】JumpServer 默认的 Web 访问端口和 SSH 访问端口分别是？

**答案**

**B**　80 和 2222

**解析**

【马哥JumpServer课件】Web 浏览器访问 http://<服务器IP>(即 80 端口)，SSH 访问为 ssh -p 2222 <服务器IP>(即 2222 端口)。XShell 等工具也添加 2222 端口的连接。

---

### 15. 【堡垒机】JumpServer v4.0.0 版本以后，默认管理员 admin 的初始密码是？

**答案**

**B**　ChangeMe

**解析**

【马哥JumpServer课件】旧版默认用户 admin 密码 admin，v4.0.0 版以后默认密码为 ChangeMe。首次登录会要求修改密码，但不能使用原密码(不过支持 123456 这类弱密码)。

---

### 16. 【堡垒机】基于 Docker 部署 JumpServer 时，外置 MySQL 和 Redis 的版本要求是？

**答案**

**B**　MySQL ≥ 5.7、Redis ≥ 6.0

**解析**

【马哥JumpServer课件】外置数据库要求 MySQL ≥ 5.7，外置 Redis 要求 ≥ 6.0。另有版本兼容提示：JumpServer-v2.28.7 之前版本默认不支持 MySQL 8.0(需选 5.7)；v3.8.1 起支持 MySQL 8.0，但需改验证插件；旧版不支持 Redis 7.0，新版支持。

---

### 17. 【堡垒机】JumpServer 对接 MySQL 8.0 时，为什么要修改认证插件？

**答案**

**A**　MySQL 8.0 默认插件 caching_sha2_password 不符合要求，需改为 mysql_native_password

**解析**

【马哥JumpServer课件】MySQL 8.0 默认验证插件是 caching_sha2_password，不符合 JumpServer 要求，需要在配置文件中设置 default_authentication_plugin=mysql_native_password(旧版 JumpServer 5.7 无此问题)。

---

### 18. 【堡垒机】新版 JumpServer 容器部署时，DB_ENGINE 环境变量的取值要求是？

**答案**

**B**　默认是 postgreSQL，使用 MySQL 必须显式指定 DB_ENGINE=mysql

**解析**

【马哥JumpServer课件】新版 JumpServer 默认使用 postgreSQL，若用 MySQL 必须加 -e DB_ENGINE=mysql(课件标注『新版必需要求，默认 postgreSQL』)。

---

### 19. 【堡垒机】启动 jms_all 容器时使用 --privileged=true 的原因是？

**答案**

**B**　容器内需要特权以完成相关系统操作(如挂载、设备访问等)

**解析**

【马哥JumpServer课件】jms_all 是个多组件合一的容器，内部需要执行一些需要特权的操作，因此 docker run 时加上 --privileged=true。

---

### 20. 【堡垒机】用 docker-compose 官方编排部署 JumpServer 时，默认创建的自定义网络网段是？

**答案**

**B**　172.18.0.0/16

**解析**

【马哥JumpServer课件】docker-compose 默认创建自定义网络并使用 172.18.0.0/16 网段。而在官方示例的手动 Docker 部署中，则常用 docker network create --subnet 172.30.0.0/16 jumpserver-net 自行指定。

---

### 21. 【堡垒机】JumpServer 支持的三种登录用户角色是？

**答案**

**B**　系统管理员 / 普通用户 / 系统审计员

**解析**

【马哥JumpServer课件】JumpServer 支持三种登录用户角色：系统管理员、普通用户、系统审计员。其中系统审计员用来查看审计录像和会话记录。

---

### 22. 【堡垒机】关于 JumpServer 的命令过滤器，下列说法正确的是？

**答案**

**B**　高优先级规则先匹配；匹配到『允许』则放行、匹配到『禁止』则拦截；所有规则都未匹配则允许执行

**解析**

【马哥JumpServer课件】命令过滤器可绑定到系统用户上，一个过滤器可定义多条规则。用户执行命令时需被绑定过滤器的所有规则匹配：高优先级先被匹配；匹配到『允许』则放行，匹配到『禁止』则禁止执行，否则匹配下一条；若最后没有匹配到任何规则，则允许执行。

---

### 23. 【堡垒机】JumpServer 中对『系统用户中的特权用户』(旧称管理用户)的描述，正确的是？

**答案**

**B**　对后端服务器具有管理权限的系统帐号(root/administrator 或 sudo ALL)，用于推送或创建系统用户、获取资产信息

**解析**

【马哥JumpServer课件】JumpServer 有三种用户概念：① 登录用户(在 JumpServer 上创建，用于登录堡垒机)；② 系统用户中的特权用户(旧名管理用户，后端服务器上具 root/administrator 权限的账号，用于推送/创建系统用户、获取硬件资产信息)；③ 系统用户中的普通用户(旧名系统用户，供登录用户 SSH 连接后端时使用的普通系统账号)。

---

### 24. 【堡垒机】JumpServer 中用户绑定的『MFA 二次认证』，典型实现是？

**答案**

**B**　Google Authenticator 动态验证码

**解析**

【马哥JumpServer课件】MFA(Multi-Factor Authentication)要求用户通过两种以上认证机制。JumpServer 启用后，登录时先输入用户名密码(第一要素)，再输入来自 MFA 设备的动态验证码(第二要素)，典型实现为 Google Authenticator(也支持 RADIUS 二次认证)。

---

### 25. 【堡垒机】JumpServer 的审计功能中，关于录像回放，下列说法正确的是？

**答案**

**B**　可以在线回放；离线查看需下载专门播放器，且 v2.19.1 版录像存在无法打开的问题

**解析**

【马哥JumpServer课件】会话管理支持在线回放历史会话；离线查看需先下载历史会话录像再播放，但需要下载对应播放器(VideoPlayer)，且课件特别提示 JumpServer-v2.19.1 版录像无法打开。

---

### 26. 【堡垒机】批量导入资产时，对导出的文件需要做的处理是？

**答案**

**B**　删除 id 列、修改主机名和 IP 字段后再导入

**解析**

【马哥JumpServer课件】资产批量导出后，参考其格式生成导入文件，导入前必须删除 id 列并修改主机名和 IP 字段。导入成功后系统用户并不会自动关联资产，还需手动关联(从账号模板一次性添加特权用户与普通用户)，之后普通用户会在后端服务器自动创建。

---

### 27. JumpServer 使用 ______ 和 ______ 进行开发，遵循 Web 2.0 规范。

**答案**

- 第 1 空：Python / python
- 第 2 空：Django / django

**解析**

【马哥JumpServer课件】JumpServer 使用 Python / Django 开发，配备业界领先的 Web Terminal 解决方案。

---

### 28. JumpServer 默认的 Web 访问端口是 ______，SSH 访问端口是 ______。

**答案**

- 第 1 空：80
- 第 2 空：2222

**解析**

【马哥JumpServer课件】Web 访问走 80 端口，SSH 访问走 2222 端口(ssh -p 2222 用户名@jumpserver)。

---

### 29. 堡垒机的 4A 规范指：身份认证 Authentication、账号管理 Account、______、______。

**答案**

- 第 1 空：授权控制 Authorization / Authorization / 授权控制
- 第 2 空：安全审计 Audit / Audit / 安全审计

**解析**

【马哥JumpServer课件】4A = Authentication / Account / Authorization / Audit，是堡垒机的四个核心能力。

---

### 30. JumpServer 组件中，______ 服务于类 Unix 资产(SSH/Telnet 字符型连接)，______ 服务于 Windows 资产(Web 端访问)。

**答案**

- 第 1 空：Koko
- 第 2 空：Lion

**解析**

【马哥JumpServer课件】Koko 面向类 Unix 资产(Go 版 coco)，Lion 面向 Windows 资产(基于 Guacamole 重构)。

---

### 31. JumpServer 官方一键安装脚本的用法是 `curl -sSL https://resource.fit2cloud.com/.../quick_start.sh | ______`。

**答案**

- 第 1 空：bash / sh

**解析**

【马哥JumpServer课件】官方提供极速部署脚本，通过管道交给 bash 执行即可完成一键安装。

---

### 32. JumpServer 的会话录像由 ______ 组件负责做格式转换，最终变为 ______ 格式。

**答案**

- 第 1 空：Video / video
- 第 2 空：MP4 / mp4

**解析**

【马哥JumpServer课件】Video 组件专门处理 Razor 和 Lion 组件产生的录像，将其转换为 MP4 格式。

---


## JumpServer面试

### 33. 跳板机和堡垒机有什么区别？为什么需要堡垒机？

**答案**

跳板机：一种用于单点登录的主机应用系统，维护人员先统一登录到这台服务器，再从它登录到目标设备。局限：
① 没有实现对运维人员操作行为的控制和审计；
② 存在严重安全风险——一旦跳板机被攻入，后端资源风险完全暴露；
③ 对 telnet 等少量服务可做一定访问控制，但对 SSH、RDP 等更多服务力不从心。
堡垒机：因跳板机不足而出现的更先进安全技术，以独立产品形态被广泛部署。能力包括角色管理与授权审批、信息资源访问控制、操作记录和审计、系统变更与维护控制，并可生成统计报表配合管理规范，从而提升 IT 内控合规性。
为什么需要：把『运维入口』升级为『可管、可控、可审计』的合规通道，降低运维操作风险。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 34. 请解释堡垒机的 4A 规范，并说明 JumpServer 各对应哪些功能。

**答案**

4A 是堡垒机四个核心能力：
① 身份认证 Authentication：资源统一登录与认证，支持 LDAP/AD、RADIUS、OpenID、CAS 单点登录，以及 MFA 二次认证(Google Authenticator / RADIUS)、登录复核(X-PACK)。
② 账号管理 Account：集中账号管理用户与系统用户、统一密码(托管/自动生成/自动推送/过期设置)、批量改密(X-PACK)、多云纳管(X-PACK)、收集用户(X-PACK)、密码匣子(X-PACK)。
③ 授权控制 Authorization：多维授权(用户/用户组/资产/资产节点/应用/系统用户)、资产授权(树状结构与自动继承)、应用授权、动作授权、时间授权、特权指令(黑白名单)、命令过滤、文件传输(SFTP/Web SFTP)、工单管理(X-PACK)、组织管理(X-PACK)。
④ 安全审计 Audit：操作审计、会话审计(在线/历史会话内容)、录像审计(支持 Linux/Windows 及 RemoteApp、MySQL 等应用)、指令审计、文件传输审计。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 35. JumpServer 有哪些核心组件？各有什么作用？

**答案**

① Core：核心组件，其他组件都依赖它启动；② Koko：服务类 Unix 资产，经 SSH/Telnet 提供字符型连接(Go 版 coco)；③ Lion：服务 Windows 资产，Web 端访问(基于 Guacamole，Golang+Vue 重构)；④ XRDP：RDP 协议组件，通过 JumpServer Client 访问 windows 2000/XP 等；⑤ Razor：RDP 协议组件，JumpServer Client 默认用它访问 Windows 资产；⑥ Magnus：数据库组件，通过客户端代理访问数据库；⑦ Chen：数据库组件，通过 Web GUI 访问数据库；⑧ Kael：服务 GPT 资产(ChatGPT)纳管；⑨ Celery：处理异步任务、执行自动化任务；⑩ Video：把 Razor/Lion 的录像转成 MP4。
前端相关：Lina 是前端 UI 项目(Vue + Element UI)；Luna 是 Web Terminal 前端(Angular CLI)。
【衍生】注意 Lion 与 Razor 都面向 RDP，但 Lion 走 Web、Razor 走 JumpServer Client。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 36. JumpServer 支持哪些安装方式？各适合什么场景？

**答案**

官方提供四种方式：
① 手动部署：按组件逐个实现，适合需要深度定制/理解架构的场景。
② 极速部署(一键脚本)：资产数量不多或测试体验用，如 curl -sSL .../quick_start.sh | bash。
③ 容器部署：基于 docker 与 docker-compose 实现，是课程重点。
④ 分布式部署：适用大型环境，中心节点提供 API、各机房部署登录节点，可横向扩展。
容器部署又分两种：单容器(jms_all，把外置 MySQL/Redis 单独跑)与 docker-compose(用官方编排，内含 mariadb + redis + jumpserver 三服务，带 healthcheck 与 depends_on)。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 37. JumpServer 中的三种用户类型分别是什么？如何理解『特权用户』和『普通用户』？

**答案**

① 登录用户：分配给用户用于登录 JumpServer 时使用，在 JumpServer 上创建。
② 系统用户中的特权用户(旧名『管理用户』)：对后端服务器具有管理权限的系统帐号(root/administrator 或 sudo ALL)，用途是推送或创建系统用户、获取被管理硬件资产信息。新版建议通过『账号管理 → 账号模板』创建，便于重复使用。
③ 系统用户中的普通用户(旧名『系统用户』)：给登录用户使用 SSH 连接后端服务器时对应的系统用户，一般是后端服务器的普通账号，不给管理权限。
要点：特权用户是给 JumpServer『用的』(用于管理后端)，普通用户是给登录用户『连的』(用于登录目标主机)。生产环境通常用自动化运维工具提前在后端统一创建好系统用户并统一 UID，而非在 JumpServer 中创建。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 38. 为什么 JumpServer 建议使用外置 MySQL 和 Redis？有哪些版本要求？

**答案**

原因：把数据库与缓存外置到独立服务，便于数据持久化、独立备份与扩容，也便于在分布式部署中多个 JumpServer 登录节点共享同一份数据与缓存(会话/token 等)。
版本要求：外置数据库要求 MySQL ≥ 5.7；外置 Redis 要求 ≥ 6.0。
兼容性提示：
① JumpServer-v2.28.7 之前版本默认不支持 MySQL 8.0，应选 MySQL 5.7；
② v3.8.1 起支持 MySQL 8.0，但 MySQL 8.0 默认验证插件 caching_sha2_password 不符合要求，需改为 mysql_native_password；
③ 旧版不支持 Redis 7.0，新版支持。
④ 字符集要求 utf8；新版 DB_ENGINE 默认是 postgresql，用 MySQL 必须显式指定 DB_ENGINE=mysql。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 39. docker-compose 部署 JumpServer 时，healthcheck 和 depends_on 起什么作用？

**答案**

healthcheck(健康检查)：定期探测容器内服务是否真正可用。官方编排里：
① MySQL 用 `mysql -h127.0.0.1 -uroot -p$PASSWORD -e 'SHOW DATABASES;'` 检测；
② Redis 用 `redis-cli -h 127.0.0.1 -a $PASSWORD info Replication` 检测；
③ JumpServer 用 `curl -fsL http://localhost/api/health/` 检测。
参数 interval(间隔)/timeout(超时)/retries(重试次数)/start_period(启动缓冲期，如 90s)。
depends_on + condition: service_healthy：让 JumpServer 容器等到 MySQL、Redis 达到『健康』状态后才启动，避免数据库尚未就绪时应用启动失败。
意义：容器启动是有先后与依赖关系的，只靠 depends_on 的默认级别只保证『启动顺序』不保证『就绪』，配合 healthcheck 才能保证依赖服务真正可用后再启动上层服务。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 40. JumpServer 如何实现对危险命令的管控？

**答案**

通过『命令过滤器』实现：
① 创建命令组，把要禁止的危险命令(如 rm -rf 等)定义进去；
② 创建命令过滤规则，指定哪些用户在哪些资产上禁止执行该命令组；
③ 把过滤器绑定到系统用户上。
匹配规则：用户使用该系统用户登录资产并执行命令时，命令需要被绑定过滤器的所有规则匹配——高优先级规则先被匹配；某规则匹配到后，若动作为『允许』则该命令放行，若动作为『禁止』则命令被拦截；否则继续匹配下一条；如果最后没有匹配到任何规则，则允许执行。
目的是防止误操作或恶意行为。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 41. JumpServer 的审计功能包括哪些方面？

**答案**

① 操作审计：用户操作行为审计；
② 会话审计：在线会话内容审计 + 历史会话内容审计；
③ 录像审计：对 Linux、Windows 等资产操作的录像回放审计，也支持对 RemoteApp、MySQL 等应用操作的录像回放；
④ 指令审计：对资产和应用等操作的命令进行审计(命令历史)；
⑤ 文件传输：对文件上传、下载记录进行审计。
【衍生】会话管理还能查看当前在线会话、强制中断(踢出)用户会话，即『终端管理』的在线监控能力。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 42. 如何查看和回放 JumpServer 的历史会话？离线回放要注意什么？

**答案**

查看与回放：
① 在『会话管理』中查看在线会话(当前连接)与历史会话(已结束)及其命令记录；
② 历史会话支持在线回放，直接在浏览器中播放录像；
③ 也可将历史会话录像下载后离线播放。
离线回放注意：
① 需要下载专门的播放器(JumpServer VideoPlayer，见 github.com/jumpserver/VideoPlayer/releases)；
② 课件特别提示 JumpServer-v2.19.1 版的录像无法打开，选版本时要注意；
③ 还可以通过『命令历史』直接查看执行过的命令明细。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 43. JumpServer 如何批量导入资产？导入后还需要做什么？

**答案**

批量导入流程：
① 先『批量导出』现有资产，得到一个可作为格式模板的文件；
② 参考导出格式生成导入文件，导入前必须删除 id 列、并修改主机名和 IP 字段，然后批量导入；
③ 导入成功后，系统用户并不会自动关联到新资产，需要手动关联——在资产列表更新新资产信息，从账号模板中一次性添加系统用户中的特权用户和普通用户；
④ 添加完成后，普通用户会在后端服务器自动创建。
适用场景：后端服务器很多时，逐台手动添加效率很低，用导入导出可大幅提高效率。
验证：登录新添加主机后可用 getent passwd <用户名> 确认系统用户已创建。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---

### 44. JumpServer 的数据库资产授权与普通资产授权有什么区别？

**答案**

区别要点：
① 数据库资产需要在『账号管理 → 账号模板』中先创建针对数据库的专用系统用户；
② 数据库应用的授权规则合并到『资产授权』中，需要在资产授权里针对指定的数据库资产专门做授权；
③ 数据库授权不支持针对『节点』授权(普通资产可按节点授权且子节点自动继承父节点授权)；
④ 访问方式上，数据库资产可通过 Web 方式连接(如 Web 连接 MySQL)，也可用 ssh 方式连接；
⑤ 组件上由 Magnus(客户端代理)与 Chen(Web GUI)分别承载。
【衍生】课件提示 JumpServer v2.5 此功能有 Bug，可选择 v2.4 版或其它版本。

**解析**

【马哥JumpServer课件】面试简答题，参考答案见答案要点。

---
