# 马哥Jenkins课件 —— 试题册

> 共 70 题。答案与解析见《答案册-马哥Jenkins课件.md》。


## Jenkins笔试

### 1. 【Jenkins介绍】Jenkins 的前身是哪个由 Sun 公司开发的软件？

- **A.** CruiseControl
- **B.** Hudson
- **C.** Bamboo
- **D.** Buildbot

### 2. 【Jenkins介绍】Jenkins 是基于哪种语言开发的开源 CI&CD 工具？

- **A.** Python
- **B.** Java
- **C.** Go
- **D.** Ruby

### 3. 【Jenkins介绍】下列关于 Jenkins 的描述，正确的是？

- **A.** Jenkins 自身内置了 Maven、Node 等构建工具，开箱即可完成编译打包
- **B.** Jenkins 只是一个调度平台，本身不能完成项目的构建部署
- **C.** Jenkins 是闭源商业软件，需要购买 License 才能使用
- **D.** Jenkins 仅支持 Linux 平台，无法跨平台运行

### 4. 【Jenkins版本】Jenkins 的 LTS（长期支持）版本每隔多少周从常规版本流中选取一次？

- **A.** 4 周
- **B.** 6 周
- **C.** 12 周
- **D.** 24 周

### 5. 【Jenkins版本】关于 Jenkins 的常规版本（每周发布版）发行线，说法正确的是？

- **A.** 每 12 周发布一次
- **B.** 每周发布一个新版本，为用户和插件开发人员提供错误修复和功能
- **C.** 仅包含安全修复，不含新功能
- **D.** 每年发布一次大版本

### 6. 【Jenkins安装】Jenkins 官方给出的最低推荐配置是？

- **A.** 128MB 内存 / 512MB 磁盘
- **B.** 256MB 可用内存 / 1GB 可用磁盘空间
- **C.** 1GB 内存 / 10GB 磁盘
- **D.** 2GB 内存 / 50GB 磁盘

### 7. 【Jenkins安装】自 Jenkins 2.357 和 LTS 2.361.1 起，Jenkins 要求安装的 Java 版本是？

- **A.** Java 8 即可
- **B.** Java 11 或 17
- **C.** Java 17 或 21
- **D.** 必须 Java 21

### 8. 【Jenkins安装】Jenkins 内置的 Java servlet 容器是？

- **A.** Apache Tomcat
- **B.** Jetty
- **C.** Undertow
- **D.** Netty

### 9. 【Jenkins安装】包安装 Jenkins 后，首次登录所需的初始管理员密码保存在哪个文件？

- **A.** /var/lib/jenkins/config.xml
- **B.** /var/lib/jenkins/secrets/initialAdminPassword
- **C.** /etc/jenkins/initialAdminPassword
- **D.** /var/lib/jenkins/users/admin/password

### 10. 【Jenkins安装】Jenkins 默认监听的 HTTP 端口是？

- **A.** 80
- **B.** 443
- **C.** 8080
- **D.** 9000

### 11. 【Jenkins配置】Jenkins 显示“已离线”（无法检查更新、插件装不上）时，应修改哪个文件中的更新检查地址为国内镜像？

- **A.** /var/lib/jenkins/config.xml
- **B.** /var/lib/jenkins/hudson.model.UpdateCenter.xml
- **C.** /var/lib/jenkins/plugins/default.json
- **D.** /etc/default/jenkins

### 12. 【Jenkins配置】Jenkins 的插件默认安装目录是？

- **A.** /var/lib/jenkins/plugins
- **B.** /var/lib/jenkins/tools
- **C.** /usr/share/jenkins/plugins
- **D.** /etc/jenkins/plugins

### 13. 【Jenkins配置】Jenkins 默认只能并行 2 个任务，官方建议将执行者（Executor）数量修改为？

- **A.** 固定 4 个
- **B.** 固定 8 个
- **C.** 根据 CPU 核心数设置为对应数量
- **D.** 与内存 GB 数保持一致

### 14. 【Jenkins配置】Jenkins 备份与还原的核心思路是？

- **A.** 只需备份 jenkins.war 文件即可
- **B.** 备份 Jenkins 主目录（JENKINS_HOME），必要时连同相关脚本一起备份
- **C.** 只需备份数据库
- **D.** 无需备份，重装后会自动恢复

### 15. 【Jenkins配置】如果从未修改过密码、忘记了初始管理员密码，最简单的找回方法是？

- **A.** 重装 Jenkins
- **B.** 查看 /var/lib/jenkins/secrets/initialAdminPassword 文件
- **C.** 删除主目录后重启
- **D.** 执行 jenkins-cli restart 命令

### 16. 【Jenkins配置】已经改过密码但忘记时，课件给出的找回方法是？

- **A.** 停止服务后删除主目录 config.xml 中的安全配置段（useSecurity / authorizationStrategy / securityRealm），重启再重新配置安全
- **B.** 直接删除数据库文件重建
- **C.** 卸载并重装所有插件
- **D.** 用操作系统 root 用户直接登录 Jenkins 界面

### 17. 【Jenkins配置】要解决 Jenkins 权限受限问题、改以 root 用户身份运行，Ubuntu 下应修改哪个文件？

- **A.** /lib/systemd/system/jenkins.service
- **B.** /etc/sysconfig/jenkins
- **C.** /var/lib/jenkins/config.xml
- **D.** /etc/default/jenkins

### 18. 【CICD】Freestyle（自由风格）任务中，Shell 默认使用的解释器是？

- **A.** /bin/bash
- **B.** /bin/sh
- **C.** /bin/dash
- **D.** /usr/bin/zsh

### 19. 【CICD】Jenkins 环境变量的优先级顺序是？

- **A.** Jenkins 内置变量 > Jenkins 自定义环境变量 > 任务中自定义变量
- **B.** 任务中自定义的变量 > Jenkins 自定义环境变量 > Jenkins 内置环境变量
- **C.** 三者优先级相同，后定义者生效
- **D.** Jenkins 自定义环境变量 > 任务中自定义变量 > Jenkins 内置环境变量

### 20. 【CICD】下列哪一项不是 Jenkins 内置的全局环境变量？

- **A.** JENKINS_HOME
- **B.** BUILD_NUMBER
- **C.** GIT_BRANCH
- **D.** JAVA_HOME

### 21. 【CICD】课件中提到，构建产物（制品）通常应存储于制品库，著名的制品库服务是？

- **A.** Nexus
- **B.** Redis
- **C.** ElasticSearch
- **D.** Zabbix

### 22. 【CICD】Jenkins 默认提供的、不安装任何插件即可使用的任务风格是？

- **A.** Pipeline 流水线
- **B.** Freestyle 自由风格
- **C.** Maven 项目
- **D.** 多分支流水线

### 23. 【CICD】Freestyle 任务中“丢弃旧的构建”选项的作用是？

- **A.** 删除任务本身
- **B.** 控制构建产物的保留天数与最大个数
- **C.** 丢弃代码仓库中的历史提交
- **D.** 清理 Jenkins 插件缓存

### 24. 【参数化构建】关于 Jenkins 的参数化构建，说法正确的是？

- **A.** 必须安装插件才能使用
- **B.** 无需安装插件即可支持，参数在使用时表现为变量
- **C.** 只能用于 Pipeline 风格任务
- **D.** 参数值在任务创建时就必须写死

### 25. 【参数化构建】下列哪一项不是课件列出的常用任务参数类型？

- **A.** Choice Parameter（选项参数）
- **B.** Boolean Parameter（布尔值参数）
- **C.** String Parameter（字符参数）
- **D.** Cron Parameter（定时参数）

### 26. 【GitParameter】利用 Git Parameter 插件可以实现什么？

- **A.** 只拉取仓库最新一次提交
- **B.** 在构建时选择性地拉取指定的 Tag 或 Commit ID
- **C.** 自动合并分支
- **D.** 统计代码提交行数

### 27. 【自动化构建】Jenkins 的 cron 语法包含几个字段，其顺序是？

- **A.** 5 个：MINUTE HOUR DOM MONTH DOW
- **B.** 6 个：SEC MINUTE HOUR DOM MONTH DOW
- **C.** 5 个：MINUTE HOUR DAY MONTH YEAR
- **D.** 7 个：SEC MINUTE HOUR DOM MONTH DOW YEAR

### 28. 【自动化构建】Jenkins cron 中的 H 符号表示什么？

- **A.** 每小时执行一次
- **B.** 等同于通配符 *
- **C.** 基于项目（作业）名称计算出的散列值，用于错峰执行
- **D.** 表示半点（第 30 分）

### 29. 【自动化构建】Jenkins cron 中星期字段（DOW）的取值范围是？

- **A.** 1-7
- **B.** 0-6
- **C.** 0-7（0 和 7 都表示周日）
- **D.** 1-31

### 30. 【自动化构建】关于“轮询 SCM”触发方式，说法正确的是？

- **A.** 每次执行都会无条件构建
- **B.** 定期到代码仓库检查代码是否有变更，存在变更时才运行构建
- **C.** 由代码仓库主动通知 Jenkins 触发，无需轮询
- **D.** 只能与定时构建一起使用

### 31. 【自动化构建】新版本 Jenkins 中，GitLab 通过 Webhook 触发 Jenkins 构建时的认证方式是？

- **A.** 必须使用用户名 + 密码
- **B.** 必须使用用户的 API Token（密码方式不再支持）
- **C.** 无需任何认证
- **D.** 必须使用 SSH 私钥

### 32. 【自动化构建】Jenkins 出现 “Error 403 No valid crumb was included in the request” 错误的原因是？

- **A.** 用户权限不足
- **B.** Jenkins 的 CSRF 跨站请求伪造保护
- **C.** API Token 已过期
- **D.** 代码仓库地址填写错误

### 33. 【自动化构建】GitLab 配置 Webhook 时报 “Requests to the local network are not allowed”，正确的处理方式是？

- **A.** 关闭 Jenkins 的防火墙
- **B.** 在 GitLab 管理中心 → 设置 → 网络中允许对本地网络的请求（打开外发请求）
- **C.** 把 Jenkins 部署到公网
- **D.** 改为使用 SSH 方式触发

### 34. 【多项目关联】实现 job1 完成后自动触发 job2 构建，下列做法正确的是？

- **A.** 在 job1 中配置构建后操作触发 job2，或在 job2 中配置 Build after other projects are built
- **B.** 只能在 job2 中写死 job1 的名字
- **C.** 必须使用 Pipeline 风格才能实现
- **D.** 必须安装第三方插件才能实现

### 35. 【Docker任务】安装好 Docker 后，让 Jenkins 用户能够访问 Docker 的套接字文件，应执行？

- **A.** chmod 777 /var/run/docker.sock
- **B.** usermod -aG docker jenkins 并重启 Jenkins 服务
- **C.** 把 Jenkins 改为 root 运行 Docker
- **D.** 无需配置，默认就有权限

### 36. 【Docker任务】需要通过 Docker 远程 API 在其他主机上启停容器，需要打开 Docker 的哪个端口？

- **A.** 2375
- **B.** 2376
- **C.** 5000
- **D.** 8080

### 37. 【K8s集成】Jenkins 部署在 K8s 集群外、要管理该集群，课件给出的两种实现方式是？

- **A.** 基于 kubeconfig 文件 / 基于 SA 账号的 Token
- **B.** 基于 SSH / 基于 JNLP
- **C.** 基于 Ansible / 基于 SaltStack
- **D.** 基于 API Server 账号密码 / 基于证书

### 38. 【分布式】Jenkins 分布式架构中，Executor（执行器）的含义是？

- **A.** 一个独立运行的 Jenkins 实例
- **B.** 节点上用于执行任务的槽位，其数量决定该节点可并发执行的任务量
- **C.** 负责提供 UI 和 HTTP 服务的主节点
- **D.** 一类用于过滤节点的标签

### 39. 【分布式】基于 JNLP 方式连接 Agent 时，Controller 端默认使用哪个 TCP 端口？

- **A.** 22
- **B.** 2375
- **C.** 50000
- **D.** 8080

### 40. 【分布式】Jenkins 标签表达式中 `a -> b` 的含义是？

- **A.** a 与 b 必须同时满足
- **B.** a 与 b 都不满足
- **C.** 如果满足 a，则必须同时满足 b（等价于 !a || b）
- **D.** a 与 b 二选一即可

### 41. 【Jenkins介绍】Jenkins 的前身是商业软件 ______，由 Sun 公司于 2004 年开发、2005 年 2 月开源并发布第一个版本。

> 共 1 个空。

### 42. 【Jenkins版本】Jenkins 项目产生两条发行线：______（长期支持版本）和每周发布的定期发布版本。

> 共 1 个空。

### 43. 【Jenkins安装】Jenkins 内置的 Java servlet 容器是 ______，因此通常作为一个独立的应用程序运行。

> 共 1 个空。

### 44. 【Jenkins配置】Jenkins 的插件默认安装目录是 /var/lib/jenkins/______。

> 共 1 个空。

### 45. 【CICD】Freestyle 任务的 Shell 默认使用 /bin/sh，若想使用 /bin/bash，需要在脚本最前面添加 ______ 机制。

> 共 1 个空。

### 46. 【自动化构建】Jenkins cron 语法包含 5 个字段，依次为 MINUTE、HOUR、DOM、MONTH 和 ______。

> 共 1 个空。

### 47. 【分布式】Jenkins 分布式架构中，基于 JNLP（Java Web）方式启动代理时，Controller 默认监听 TCP ______ 端口。

> 共 1 个空。

### 48. 【Pipeline】Jenkins Pipeline 基于 ______ DSL 实现，任何发布流程都可以表述为一段该语言的脚本。

> 共 1 个空。

### 49. 【SonarQube】SonarQube 从 7.9 版本开始不再支持 ______ 数据库，可改用 PostgreSQL。

> 共 1 个空。

### 50. 【SonarQube】SonarQube Server 由 Web Server、Search Server、______ Server 和 SonarQube Database 四个主要组件组成。

> 共 1 个空。


## Jenkins面试

### 51. 【面试】如何找回 Jenkins 密码？

### 52. 【面试】简述什么是版本控制系统（VCS）？

### 53. 【面试】简述什么是 DevOps？

### 54. 【面试】简述软件交付过程的四种常见场景。

### 55. 【面试】什么是 CI/CD？持续集成、持续交付、持续部署有什么区别？

### 56. 【面试】Jenkins 的 Job 风格有哪些？各自适用什么场景？

### 57. 【面试】Jenkins 如何实现自动触发构建？各方式有什么区别？

### 58. 【面试】GitLab 提交代码后如何自动触发 Jenkins 构建？完整流程是什么？

### 59. 【面试】Jenkins 如何实现代码部署与版本回滚？

### 60. 【面试】Jenkins 分布式是什么？Master/Agent 架构中各角色职责是什么？

### 61. 【面试】Jenkins Agent 的通信（连接）方式有哪些？各自特点是什么？

### 62. 【面试】静态 Agent 与动态 Agent 有什么区别？动态 Agent 如何实现？

### 63. 【面试】脚本式 Pipeline 与声明式 Pipeline 有什么区别？

### 64. 【面试】声明式 Pipeline 的基本结构由哪些部分组成？

### 65. 【面试】Pipeline 相比 Freestyle 任务有哪些优势？

### 66. 【面试】Jenkins 中如何管理凭据？Pipeline 中如何引用凭据？

### 67. 【面试】Jenkins 如何实现基于角色的权限管理？

### 68. 【面试】SonarQube 是什么？它从哪七个维度检测代码质量？

### 69. 【面试】SonarQube 的架构由哪些组件组成？部署有哪些硬性要求？

### 70. 【面试】Jenkins 如何集成 SonarQube 实现代码质量门禁？
