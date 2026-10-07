# 马哥Jenkins课件 —— 答案与解析

> 共 70 题，编号与《试题册-马哥Jenkins课件.md》一致。


## Jenkins笔试

### 1. 【Jenkins介绍】Jenkins 的前身是哪个由 Sun 公司开发的软件？

**答案**

**B**　Hudson

**解析**

Hudson 由 Sun 公司于 2004 年夏天开发，2005 年 2 月开源并发布第一个版本；2011 年开源社区与甲骨文（2009 年收购 Sun）分道扬镳后独立成立 Jenkins。【衍生知识点】CruiseControl 曾是 CI 界老大哥，约 2007 年被 Hudson 超越。

---

### 2. 【Jenkins介绍】Jenkins 是基于哪种语言开发的开源 CI&CD 工具？

**答案**

**B**　Java

**解析**

Jenkins 基于 Java 开发，所以安装 Jenkins 前必须先安装 JDK。【衍生知识点】Jenkins 的日本作者是川口耕介（KK）。

---

### 3. 【Jenkins介绍】下列关于 Jenkins 的描述，正确的是？

**答案**

**B**　Jenkins 只是一个调度平台，本身不能完成项目的构建部署

**解析**

Jenkins 只是一个调度平台，本身并不能完成项目的构建部署，需要安装各种插件、可能还要编写 Shell/Python 脚本调用集成众多组件。【衍生知识点】Jenkins 特点：开源免费、跨平台、master/slave 分布式、Web 可视化、1800+ 插件。

---

### 4. 【Jenkins版本】Jenkins 的 LTS（长期支持）版本每隔多少周从常规版本流中选取一次？

**答案**

**C**　12 周

**解析**

LTS 每 12 周从常规版本流中选择，作为该时间段的稳定大版本；每隔 4 周会更新迭代稳定的小版本，包含错误和安全修复的反向移植。【衍生知识点】常规版本每周发布一个新版本。

---

### 5. 【Jenkins版本】关于 Jenkins 的常规版本（每周发布版）发行线，说法正确的是？

**答案**

**B**　每周发布一个新版本，为用户和插件开发人员提供错误修复和功能

**解析**

Jenkins 项目产生两条发行线：长期支持版本 LTS 与定期发布（常规）版本；常规版本每周发布一个新版本。【衍生知识点】下载可用清华或阿里云镜像。

---

### 6. 【Jenkins安装】Jenkins 官方给出的最低推荐配置是？

**答案**

**B**　256MB 可用内存 / 1GB 可用磁盘空间

**解析**

最低推荐：256MB 可用内存、1GB 可用磁盘空间（以 Docker 容器方式运行 Jenkins 则推荐 10GB）；为小团队推荐的硬件配置是 1GB+ 内存、50GB+ 磁盘。【衍生知识点】Jenkins 启动较慢，新版启动可能需要较长时间。

---

### 7. 【Jenkins安装】自 Jenkins 2.357 和 LTS 2.361.1 起，Jenkins 要求安装的 Java 版本是？

**答案**

**B**　Java 11 或 17

**解析**

Jenkins requires Java 11 or 17 since Jenkins 2.357 and LTS 2.361.1；早期版本 Java 8 的 JRE 或 JDK 均可。【衍生知识点】课件实际部署时因部分项目不支持 JDK 17，选择安装 JDK 11。

---

### 8. 【Jenkins安装】Jenkins 内置的 Java servlet 容器是？

**答案**

**B**　Jetty

**解析**

Jenkins 内置有 Java servlet 容器 Jetty，通常作为一个独立的应用程序运行；也可以把 jenkins.war 放到 Tomcat 等其它 servlet 容器中运行。【衍生知识点】支持三种启动方式：service 文件、java -jar 直接启动、Tomcat 运行 WAR。

---

### 9. 【Jenkins安装】包安装 Jenkins 后，首次登录所需的初始管理员密码保存在哪个文件？

**答案**

**B**　/var/lib/jenkins/secrets/initialAdminPassword

**解析**

默认内置用户 admin，其初始密码为随机字符，可从 /var/lib/jenkins/secrets/initialAdminPassword 文件中查看。【衍生知识点】Tomcat 方式运行时路径在对应的 JENKINS_HOME 目录下的 secrets 目录。

---

### 10. 【Jenkins安装】Jenkins 默认监听的 HTTP 端口是？

**答案**

**C**　8080

**解析**

包安装后默认监听 8080（日志中可见 --httpPort=8080）；用 WAR 包启动时可通过 --httpPort 指定其它端口。【衍生知识点】SonarQube 默认端口是 9000，注意区分。

---

### 11. 【Jenkins配置】Jenkins 显示“已离线”（无法检查更新、插件装不上）时，应修改哪个文件中的更新检查地址为国内镜像？

**答案**

**B**　/var/lib/jenkins/hudson.model.UpdateCenter.xml

**解析**

把 /var/lib/jenkins/hudson.model.UpdateCenter.xml 中的 url 改成国内镜像地址（如清华 https://mirror.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json 或阿里云），重启 Jenkins 即可。【衍生知识点】常规插件慢还可以用 Nginx 反向代理或直接下载离线插件包。

---

### 12. 【Jenkins配置】Jenkins 的插件默认安装目录是？

**答案**

**A**　/var/lib/jenkins/plugins

**解析**

插件安装目录为 /var/lib/jenkins/plugins，每个插件对应 *.jpi 文件及其解压子目录。【衍生知识点】离线插件包可直接复制到此目录，再 chown 给 jenkins 用户并重启。

---

### 13. 【Jenkins配置】Jenkins 默认只能并行 2 个任务，官方建议将执行者（Executor）数量修改为？

**答案**

**C**　根据 CPU 核心数设置为对应数量

**解析**

通过“管理 Jenkins → Configure System”把执行者数量修改为 CPU 的核数，以提高并发效率。【衍生知识点】执行者数量决定该节点可并发执行的任务量。

---

### 14. 【Jenkins配置】Jenkins 备份与还原的核心思路是？

**答案**

**B**　备份 Jenkins 主目录（JENKINS_HOME），必要时连同相关脚本一起备份

**解析**

Jenkins 的相关数据都放在主目录中，将主目录备份即可实现备份，必要时用于还原；相关脚本也需备份。【衍生知识点】jobs（config.xml、nextBuildNumber）、plugins、secrets、users 建议备份；monitoring、logs 可不备份。

---

### 15. 【Jenkins配置】如果从未修改过密码、忘记了初始管理员密码，最简单的找回方法是？

**答案**

**B**　查看 /var/lib/jenkins/secrets/initialAdminPassword 文件

**解析**

刚开始安装 Jenkins、没有修改过密码时，直接在 initialAdminPassword 文件中查看密码即可。【衍生知识点】这是密码找回的“方法1”。

---

### 16. 【Jenkins配置】已经改过密码但忘记时，课件给出的找回方法是？

**答案**

**A**　停止服务后删除主目录 config.xml 中的安全配置段（useSecurity / authorizationStrategy / securityRealm），重启再重新配置安全

**解析**

停服 → 编辑 config.xml 删除/注释 useSecurity、authorizationStrategy、securityRealm 等安全配置 → 重启后无需验证即可登录 → 改为 Jenkins 专有用户数据库并重设 admin 密码 → 授权策略改为“登录用户可以做任何事”。【衍生知识点】修改前务必备份 config.xml。

---

### 17. 【Jenkins配置】要解决 Jenkins 权限受限问题、改以 root 用户身份运行，Ubuntu 下应修改哪个文件？

**答案**

**A**　/lib/systemd/system/jenkins.service

**解析**

Ubuntu 下修改 /lib/systemd/system/jenkins.service 中的 User=root、Group=root，然后 daemon-reload 并重启；RHEL 系修改 /etc/sysconfig/jenkins 中的 JENKINS_USER。【衍生知识点】默认以 jenkins 用户运行，会导致权限受限。

---

### 18. 【CICD】Freestyle（自由风格）任务中，Shell 默认使用的解释器是？

**答案**

**B**　/bin/sh

**解析**

默认使用 /bin/sh，因此 {1..10} 这类 bash 展开语法不会生效；若想使用 /bin/bash，需要在脚本最前面加 shebang（#!/bin/bash）。【衍生知识点】控制台里 echo $SHELL 显示 /bin/bash，但实际执行用的是 sh。

---

### 19. 【CICD】Jenkins 环境变量的优先级顺序是？

**答案**

**B**　任务中自定义的变量 > Jenkins 自定义环境变量 > Jenkins 内置环境变量

**解析**

优先级为：任务中自定义变量 > Jenkins 自定义环境变量 > Jenkins 内置环境变量。【衍生知识点】自定义变量与内置变量同名时会覆盖内置变量，建议为自定义变量加固定前缀。

---

### 20. 【CICD】下列哪一项不是 Jenkins 内置的全局环境变量？

**答案**

**D**　JAVA_HOME

**解析**

常用内置变量有 JENKINS_HOME、JENKINS_URL、JOB_NAME、BUILD_NUMBER、BRANCH_NAME、BUILD_URL、GIT_BRANCH 等；JAVA_HOME 不是 Jenkins 内置变量。【衍生知识点】BUILD_NUMBER 常用于制品名称（如镜像 tag）。

---

### 21. 【CICD】课件中提到，构建产物（制品）通常应存储于制品库，著名的制品库服务是？

**答案**

**A**　Nexus

**解析**

构建的目标（库、可执行文件及生成的脚本等）即“制品”，通常应存储于制品库，Nexus 就是著名的制品库服务之一。【衍生知识点】基于标准、统一的构建环境完成构建，能有效确保制品质量。

---

### 22. 【CICD】Jenkins 默认提供的、不安装任何插件即可使用的任务风格是？

**答案**

**B**　Freestyle 自由风格

**解析**

Jenkins 默认只有自由风格（Freestyle）任务，安装插件后才支持 Pipeline、Maven 项目等其它风格。【衍生知识点】自由风格以 Shell 为主要技术，内部有各种灵活的配置属性。

---

### 23. 【CICD】Freestyle 任务中“丢弃旧的构建”选项的作用是？

**答案**

**B**　控制构建产物的保留天数与最大个数

**解析**

用于控制历史构建产物的保留策略：条件1 保持构建的天数（最多保留多少天）、条件2 保持构建的最大个数（最多保留多少个，超出的自动删除）。

---

### 24. 【参数化构建】关于 Jenkins 的参数化构建，说法正确的是？

**答案**

**B**　无需安装插件即可支持，参数在使用时表现为变量

**解析**

参数化构建无需安装插件即可支持；参数在使用时实际上也表现为变量，可以通过变量的调用方式使用，并在触发作业运行时向各参数赋值。【衍生知识点】其目标是让一个流水线的定义适用于多种需求情形。

---

### 25. 【参数化构建】下列哪一项不是课件列出的常用任务参数类型？

**答案**

**D**　Cron Parameter（定时参数）

**解析**

常用参数类型包括选项参数、布尔值参数、字符参数、文本参数（Multi-line String）、凭据参数、密码参数、文件参数、运行时参数等；Cron Parameter 不是内置参数类型。

---

### 26. 【GitParameter】利用 Git Parameter 插件可以实现什么？

**答案**

**B**　在构建时选择性地拉取指定的 Tag 或 Commit ID

**解析**

Git Parameter 插件支持构建时拉取指定的 Tag，也支持基于指定 Commit_ID 拉取代码，实现按版本/提交粒度的构建。【衍生知识点】常用于版本回滚场景。

---

### 27. 【自动化构建】Jenkins 的 cron 语法包含几个字段，其顺序是？

**答案**

**A**　5 个：MINUTE HOUR DOM MONTH DOW

**解析**

Jenkins cron 语法遵循 Unix cron 定义（细节略有差别），每个定义包含由空白字符或 Tab 分隔的 5 个字段：MINUTE HOUR DOM MONTH DOW。【衍生知识点】支持 @yearly/@monthly/@weekly/@daily/@hourly 等别名。

---

### 28. 【自动化构建】Jenkins cron 中的 H 符号表示什么？

**答案**

**C**　基于项目（作业）名称计算出的散列值，用于错峰执行

**解析**

H（hash）能在一个时间范围内对项目名称进行散列值计算，得出唯一偏移量，避免所有配置相同 cron 值的项目在同一时间启动。【衍生知识点】H 是项目名的散列而非随机函数，同一项目取值稳定。

---

### 29. 【自动化构建】Jenkins cron 中星期字段（DOW）的取值范围是？

**答案**

**C**　0-7（0 和 7 都表示周日）

**解析**

DOW 的取值为 0-7，其中 0 和 7 都表示周日；MONTH 为 1-12，DOM 为 1-31，MINUTE 0-59，HOUR 0-23。【衍生知识点】可按 TZ= 指定时区，默认使用 Jenkins master JVM 的时区。

---

### 30. 【自动化构建】关于“轮询 SCM”触发方式，说法正确的是？

**答案**

**B**　定期到代码仓库检查代码是否有变更，存在变更时才运行构建

**解析**

轮询 SCM 指定期到代码仓库检查代码是否有变更，有变更才运行；为了 CI 收益越大轮询应越频繁，但会给 SCM 带来无谓压力，因此由 SCM 主动通知 Jenkins（Webhook）最为理想。【衍生知识点】SCM 任务左侧会多出“Git 轮询日志”。

---

### 31. 【自动化构建】新版本 Jenkins 中，GitLab 通过 Webhook 触发 Jenkins 构建时的认证方式是？

**答案**

**B**　必须使用用户的 API Token（密码方式不再支持）

**解析**

可以直接用用户密码调用 webhook，但存在泄露密码风险；新版不再允许密码方式（curl 可通但 GitLab 会 403），必须为对应用户生成 API Token。【衍生知识点】Token 值是一次性的，必须立即复制。

---

### 32. 【自动化构建】Jenkins 出现 “Error 403 No valid crumb was included in the request” 错误的原因是？

**答案**

**B**　Jenkins 的 CSRF 跨站请求伪造保护

**解析**

该错误由 CSRF 保护引起；Jenkins 自 2.204.6 起删除了禁用 CSRF 保护的功能，从旧版本升级的实例会启用 CSRF 保护。可通过在 JAVA_ARGS 中加入 -Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true 并重启解决。

---

### 33. 【自动化构建】GitLab 配置 Webhook 时报 “Requests to the local network are not allowed”，正确的处理方式是？

**答案**

**B**　在 GitLab 管理中心 → 设置 → 网络中允许对本地网络的请求（打开外发请求）

**解析**

新版 GitLab 默认禁止向本地网络发起请求，需以管理员身份在“管理中心 → 设置 → 网络”中打开出站请求（此步须先于配置 Webhook 完成，否则会提示 URL 错误）。【衍生知识点】测试时还需取消启用 SSL 验证。

---

### 34. 【多项目关联】实现 job1 完成后自动触发 job2 构建，下列做法正确的是？

**答案**

**A**　在 job1 中配置构建后操作触发 job2，或在 job2 中配置 Build after other projects are built

**解析**

两种方法：① 在前面任务中利用构建后操作关联后续任务；② 在后面任务中利用构建触发器 Build after other projects are built 关联前面任务。【衍生知识点】多个项目名用逗号分隔；不要实现任务环路，会导致死循环。

---

### 35. 【Docker任务】安装好 Docker 后，让 Jenkins 用户能够访问 Docker 的套接字文件，应执行？

**答案**

**B**　usermod -aG docker jenkins 并重启 Jenkins 服务

**解析**

默认 jenkins 用户无法访问 docker 的 socket 文件，需执行 usermod -aG docker jenkins，重启 Jenkins 服务后权限才能生效。【衍生知识点】安装 Docker/Jenkins 后往往需要重启 Jenkins 才能让组权限生效。

---

### 36. 【Docker任务】需要通过 Docker 远程 API 在其他主机上启停容器，需要打开 Docker 的哪个端口？

**答案**

**A**　2375

**解析**

修改 docker.service 的 ExecStart 打开 2375 端口（如 -H tcp://0.0.0.0:2375）即可被远程控制。【衍生知识点】2375 无加密、权限等价于主机 root，建议用 iptables 只允许 Jenkins 的 IP 访问。

---

### 37. 【K8s集成】Jenkins 部署在 K8s 集群外、要管理该集群，课件给出的两种实现方式是？

**答案**

**A**　基于 kubeconfig 文件 / 基于 SA 账号的 Token

**解析**

方法一基于 kubeconfig：把集群 admin.conf 复制到 Jenkins 服务器 ~jenkins/.kube/config；方法二创建 SA 账号并角色绑定，获取其 Token 存为 Jenkins 的 secret text 凭据，再用 kubectl --token --insecure-skip-tls-verify -s 调用。【衍生知识点】需在 Jenkins 主机安装 kubectl 并做好名称解析。

---

### 38. 【分布式】Jenkins 分布式架构中，Executor（执行器）的含义是？

**答案**

**B**　节点上用于执行任务的槽位，其数量决定该节点可并发执行的任务量

**解析**

Executor 是节点或代理节点用于执行任务的槽位；主节点分配任务时，目标节点必须有可用的 Executor 才能立即执行，否则只能等到有空闲槽位。【衍生知识点】一个节点上可以有多个 Executor，数量按资源合理设定。

---

### 39. 【分布式】基于 JNLP 方式连接 Agent 时，Controller 端默认使用哪个 TCP 端口？

**答案**

**C**　50000

**解析**

JNLP（通过 Java Web 启动代理）方式下，Controller 需额外提供一个套接字接收连接请求，默认使用 TCP 50000 端口；也支持随机端口或基于 8080 端口的 WebSocket。【衍生知识点】新版 Jenkins 可不打开 50000，直接通过 8080/tcp 通信实现 JNLP。

---

### 40. 【分布式】Jenkins 标签表达式中 `a -> b` 的含义是？

**答案**

**C**　如果满足 a，则必须同时满足 b（等价于 !a || b）

**解析**

`a -> b` 表示如果满足 a 表达式，则同时必须满足 b，但如果不满足 a 则不要求满足 b，等同于 !a || b。【衍生知识点】`!` 取反、`&&` 与、`||` 或、`<->` 同真同假、`()` 分组。

---

### 41. 【Jenkins介绍】Jenkins 的前身是商业软件 ______，由 Sun 公司于 2004 年开发、2005 年 2 月开源并发布第一个版本。

**答案**

- 第 1 空：Hudson / hudson

**解析**

2009 年甲骨文收购 Sun 后 Hudson 商标归属产生争议，2011 年开源社区与甲骨文分道扬镳，独立成立开源项目 Jenkins。【衍生知识点】Jenkins 是过去 20 年中全球最热门的构建工具。

---

### 42. 【Jenkins版本】Jenkins 项目产生两条发行线：______（长期支持版本）和每周发布的定期发布版本。

**答案**

- 第 1 空：LTS / lts / Long Term Support

**解析**

LTS 每 12 周从常规版本流中选取，每隔 4 周更新迭代稳定的小版本，包含错误和安全修复的反向移植。【衍生知识点】下载地址可用清华或阿里云 Jenkins 镜像。

---

### 43. 【Jenkins安装】Jenkins 内置的 Java servlet 容器是 ______，因此通常作为一个独立的应用程序运行。

**答案**

- 第 1 空：Jetty / jetty

**解析**

也可以把 jenkins.war 部署到 Tomcat 等其它 servlet 容器中作为 servlet 运行。【衍生知识点】WAR 包启动参数 --webroot、--pluginroot、--httpPort 等。

---

### 44. 【Jenkins配置】Jenkins 的插件默认安装目录是 /var/lib/jenkins/______。

**答案**

- 第 1 空：plugins

**解析**

目录下每个插件对应 *.jpi 文件及解压子目录；也可把其它主机已装好的插件打包后复制到该目录实现离线安装。【衍生知识点】修改更新站点镜像只是临时生效，服务重启后会自动还原。

---

### 45. 【CICD】Freestyle 任务的 Shell 默认使用 /bin/sh，若想使用 /bin/bash，需要在脚本最前面添加 ______ 机制。

**答案**

- 第 1 空：shebang / #!/bin/bash

**解析**

如首行写 #!/bin/bash；否则 {1..10} 之类的 bash 语法不会生效。【衍生知识点】Pipeline 中 sh 步骤可用 script 指定解释器（如 #!/usr/bin/python3）。

---

### 46. 【自动化构建】Jenkins cron 语法包含 5 个字段，依次为 MINUTE、HOUR、DOM、MONTH 和 ______。

**答案**

- 第 1 空：DOW / dow

**解析**

DOW 表示星期，取值范围 0-7，其中 0 和 7 都表示周日。【衍生知识点】H 符号可用于任何字段实现散列错峰；TZ= 可指定时区。

---

### 47. 【分布式】Jenkins 分布式架构中，基于 JNLP（Java Web）方式启动代理时，Controller 默认监听 TCP ______ 端口。

**答案**

- 第 1 空：50000

**解析**

也支持随机端口（更安全但需防火墙放行）或基于 8080 端口的 WebSocket 建立通信。【衍生知识点】SSH 方式需安装 SSH Build Agents 插件，JNLP 方式无需插件。

---

### 48. 【Pipeline】Jenkins Pipeline 基于 ______ DSL 实现，任何发布流程都可以表述为一段该语言的脚本。

**答案**

- 第 1 空：Groovy / groovy

**解析**

Groovy 是基于 JVM 的敏捷开发语言，结合了 Python、Ruby、Smalltalk 的许多特性，语法与 Java 类似，可与 Java 代码很好结合。【衍生知识点】Pipeline 是 Jenkins 2.X 版本的核心插件。

---

### 49. 【SonarQube】SonarQube 从 7.9 版本开始不再支持 ______ 数据库，可改用 PostgreSQL。

**答案**

- 第 1 空：MySQL / mysql

**解析**

SonarQube 7.9.x 版本不再支持 MySQL，官方推荐使用 PostgreSQL。【衍生知识点】当前 9.9.8 不支持 Ubuntu24.04 自带的 PostgreSQL 16，支持 Ubuntu22.04 的 14。

---

### 50. 【SonarQube】SonarQube Server 由 Web Server、Search Server、______ Server 和 SonarQube Database 四个主要组件组成。

**答案**

- 第 1 空：Compute Engine / compute engine / CE

**解析**

Web Server 提供 UI 界面；Search Server 为 UI 提供搜索功能（基于 ElasticSearch）；Compute Engine Server 处理代码分析报告并存储到数据库；Database 存储配置与项目质量快照。【衍生知识点】此外还有 Plugin 与 Code analysis Scanners（如 sonar-scanner）。

---


## Jenkins面试

### 51. 【面试】如何找回 Jenkins 密码？

**答案**

分两种情况：
1) 从未修改过密码（初始状态）：直接查看文件 /var/lib/jenkins/secrets/initialAdminPassword，其中的内容即为内置 admin 用户的初始密码；通过 Tomcat 运行 WAR 时，则在对应 JENKINS_HOME 目录下的 secrets 目录中查看。
2) 已经修改过密码但忘记：
   - 停止 Jenkins 服务（systemctl stop jenkins）；
   - 编辑主目录下的 config.xml，删除/注释掉 useSecurity、authorizationStrategy、securityRealm 等安全配置段；
   - 重启 Jenkins（systemctl start jenkins），此时无需验证即可登录；
   - 在“全局安全配置”中把安全域改为 Jenkins's own user database（Jenkins 专有用户数据库）并保存；
   - 在“管理用户”中重新设置 admin 的新密码，再把授权策略从“任何用户可以做任何事”改为“登录用户可以做任何事”。

**解析**

考点：两种找回路径——看初始密码文件 / 去掉 config.xml 中的安全配置后重置。【衍生知识点】生产环境修改 config.xml 前务必先备份。

---

### 52. 【面试】简述什么是版本控制系统（VCS）？

**答案**

版本控制系统（Version Control System）是一种记录一个或多个文件内容变化，以便将来查阅特定版本修订情况的系统。
核心能力：
1) 版本追踪：记录每次修改（谁、何时、改了什么），可随时回退到历史版本；
2) 协同开发：支持多人并行修改同一项目，通过分支/合并机制整合，避免相互覆盖；
3) 分支管理：可按功能或环境建立分支（如 main、devel），实现开发、测试、生产环境隔离；
4) 审计与追溯：通过提交记录与提交信息追溯问题来源。
按架构分两类：集中式（如 SVN，依赖中央服务器，本地只有工作副本）与分布式（如 Git，每个克隆都是包含完整历史的仓库）。
在本课件体系中，对应工具是 Git，配合 GitLab 搭建私有仓库实现代码托管，再由 Jenkins 从仓库拉取代码触发构建。

**解析**

回答要点：记录变更、可回退、支持协同与分支、可审计；集中式 vs 分布式。【衍生知识点】Git 属分布式 VCS，GitLab 是基于 Git 的私有仓库平台。

---

### 53. 【面试】简述什么是 DevOps？

**答案**

DevOps 是 Development（开发）与 Operations（运维）的组合词，是一种强调开发与运维协作、通过自动化打通软件交付全流程的文化、实践与工具链。
目标：缩短交付周期、提高发布频率与质量、降低变更失败率，实现快速且可靠的持续交付。
核心实践：
1) 持续集成 CI：开发频繁提交代码，自动触发构建与测试；
2) 持续交付/部署 CD：构建产物自动发布到测试/生产环境；
3) 基础设施即代码与自动化运维（Ansible 等）；
4) 统一的版本管理与协作（Git/GitLab）；
5) 代码质量与安全左移（SonarQube 质量门禁）；
6) 容器化与编排（Docker/Kubernetes）实现环境标准化；
7) 监控与反馈闭环。
典型工具链组合：Git + GitLab + Jenkins + Harbor + Docker/Kubernetes + SonarQube + Ansible。
一句话总结：DevOps 用文化和自动化把“开发—测试—运维”连成一条高效的交付流水线。

**解析**

要点：开发运维一体化、自动化流水线，CI/CD 是主要落地手段。【衍生知识点】Jenkins 是实现 CI 到 CD 转变的重要工具。

---

### 54. 【面试】简述软件交付过程的四种常见场景。

**答案**

课件给出四种常见场景：
1) 传统方式：直接在物理机/虚拟机上手工或写脚本部署，编译与运行环境耦合，交付效率低、易出现环境不一致；
2) 基于 Ansible（配置管理/自动化运维）：用 Ad-Hoc 或 Playbook 描述目标状态，批量把应用部署到多台主机，实现部署自动化，支持测试/生产多套环境参数化；
3) Docker 容器：把应用与其依赖打包成镜像，由 Registry（如 Harbor）存储和分发、Docker 引擎运行，交付物统一为容器镜像，环境一致性好、交付标准统一；
4) Kubernetes：以 Pod/Deployment/Service 等资源对象编排容器，具备自愈、滚动更新、弹性扩缩容能力，适合大规模生产环境（可通过 kubectl set image 实现镜像版本切换与回滚）。
演进方向：环境标准化 → 部署自动化 → 交付物标准化（镜像）→ 编排调度平台化。

**解析**

四种场景：传统 / Ansible / Docker / Kubernetes，逐级递进。【衍生知识点】Jenkins 的 CICD 架构相应地分为传统、Docker 环境、Kubernetes 环境三类。

---

### 55. 【面试】什么是 CI/CD？持续集成、持续交付、持续部署有什么区别？

**答案**

CI（Continuous Integration，持续集成）：开发人员频繁地把代码提交到主干，每次提交都自动触发“拉取代码 → 编译 → 测试 → 构建”流程，尽早发现集成问题。
CD 有两种含义：
- Continuous Delivery（持续交付）：在持续集成基础上，把通过测试的制品自动发布到“类生产”环境，但上线到生产仍需人工确认；
- Continuous Deployment（持续部署）：在持续交付基础上更进一步，通过全部自动化测试后自动部署到生产环境，全程无需人工干预。
三者关系：CI 是基础，Delivery 是“随时可发布 + 人工放行”，Deployment 是“自动发布”。
在 Jenkins 中的对应实现：源码管理 + 构建触发器（Webhook/定时/轮询 SCM）实现 CI；参数化构建、构建后部署任务、Pipeline 的 stage 划分与 input 人工审批实现 CD；生产环境部署常配合镜像仓库与 Kubernetes。

**解析**

要点：CI 自动集成；CD 中交付需人工批准、部署全自动。【衍生知识点】Jenkins 官方定义即为 CI & CD 工具。

---

### 56. 【面试】Jenkins 的 Job 风格有哪些？各自适用什么场景？

**答案**

Jenkins 默认提供自由风格（Freestyle）任务，安装插件后还支持其它风格：
1) 自由风格 Freestyle：默认风格，通过 Web 界面配置通用配置、源码管理、构建触发器、构建环境、构建（以 Shell 为主）、构建后动作，适合各类语言的简单到中等复杂度构建，灵活直观；
2) 流水线 Pipeline：重点掌握的风格，使用专用语法（Groovy DSL）把流程写成代码（Jenkinsfile），可纳入版本控制，支持阶段可视化、暂停审批、并行执行，适合复杂的 CICD 编排；
3) Maven 项目：仅适用于 Java 项目，针对 Maven 工程做了专门封装；
4) 其它风格（如多分支流水线），由插件扩展提供。
选型建议：简单任务用 Freestyle 快速落地；生产级复杂流水线用 Pipeline，并推荐 Pipeline Script from SCM 方式把 Jenkinsfile 随代码一起管理，实现“流水线即代码”。

**解析**

要点：默认 Freestyle；Pipeline 是重点；Maven 项目仅适用于 Java。【衍生知识点】不装插件时任务创建页只有“自由风格的软件项目”可选。

---

### 57. 【面试】Jenkins 如何实现自动触发构建？各方式有什么区别？

**答案**

主要有三类方式：
1) 定时构建（Build periodically）：用 cron 语法按固定时间周期触发，5 个字段为 MINUTE HOUR DOM MONTH DOW，支持 H 散列错峰和 TZ= 指定时区。适合周期性任务，不适合需要“代码一变更就构建”的场景；
2) 轮询 SCM（Poll SCM）：Jenkins 定期到代码仓库检查是否有变更，有变更才构建。会给 SCM 带来无谓压力，适合外部 SCM 无法主动通知局域网内 Jenkins 的场景；
3) Webhook 触发（推荐）：由代码仓库在推送事件发生时主动回调 Jenkins，实时性最好。实现方式有：
   - 触发远程构建：Jenkins 生成带 token 的构建 URL，无需插件，但需配合用户的 API Token 认证；
   - GitLab 插件：选择 Build when a change is pushed to GitLab，由插件处理 GitLab 的 webhook 请求；
   - Generic Webhook Trigger：触发条件由 GitLab 侧自行定义，Jenkins 无需事先约定。
注意点：新版 GitLab 需在“管理中心 → 设置 → 网络”中允许对本地网络的请求；Jenkins 侧需处理 CSRF（403 No valid crumb）；建议只勾选“标签推送事件”，避免频繁构建。

**解析**

要点：定时 / 轮询 SCM / Webhook 三类，实时性与 SCM 压力需权衡。【衍生知识点】大并发场景用 H 散列可避免任务同时启动。

---

### 58. 【面试】GitLab 提交代码后如何自动触发 Jenkins 构建？完整流程是什么？

**答案**

完整流程：
1) Jenkins 侧创建任务并配置构建触发器，选择“触发远程构建”或 GitLab 插件方式，得到 Webhook 触发地址，形如 http://用户:<API Token>@jenkins:8080/job/<job>/build?token=<项目token>；
2) 生成凭据：在 Jenkins 用户配置中生成 API Token（Token 值只显示一次，需立即复制保存）。新版 Jenkins 不再支持 http://用户:密码@ 的写法，必须使用 Token；
3) 安全配置：确认授权策略为“登录用户可以做任何事”（不要使用角色授权策略，否则重启后可能无法登录）；必要时禁用 CSRF 保护，否则会报 403 No valid crumb；
4) GitLab 侧：以管理员打开“管理中心 → 设置 → 网络”，允许对本地网络的请求（外发请求）——此步必须在前，否则 Webhook URL 无法保存；
5) GitLab 项目 → 设置 → Webhooks：填入 Jenkins 的 Webhook URL 与 Secret token（如 666666），建议只勾选“标签推送事件”，然后点击 Test；测试时需取消启用 SSL 验证；
6) 联通性：确保 GitLab 能够把 Jenkins 的 FQDN 解析为 IP；
7) 验证：修改代码并 push（或打 tag 推送），Jenkins 应自动触发一次构建。
常见错误对照：403 No valid crumb → CSRF 未处理；“Requests to the local network are not allowed” → GitLab 出站请求未放行；Test 失败 → SSL 验证未关闭。

**解析**

要点：Jenkins 触发器 + API Token + GitLab 出站放行 + Webhook 配置 + 域名解析。【衍生知识点】还可用 GitLab Connection 把构建状态回推 GitLab 展示。

---

### 59. 【面试】Jenkins 如何实现代码部署与版本回滚？

**答案**

课件给出的典型方案是“按时间戳归档多版本 + 软链接切换”：
1) 构建阶段：拉取代码后按 ${DATE}（日期时间）打包，如 ${PROJECT}-${DATE}.tar.gz，上传到目标主机的 appdir 目录；
2) 部署阶段：在目标主机解压到 webdir/${PROJECT}-${DATE}；停服务 → 删除 webapps 下指向旧版本的软链接 → 建立指向新目录的软链接 → 启动服务，实现秒级切换（注意 chown -R tomcat.tomcat 权限）；
3) 多机部署：用 HOSTS 列表循环 scp + ssh 执行；配合反向代理可先下线一台再滚动发布；
4) 回滚阶段：读取 webapps 当前软链接指向的目录（readlink + basename）得到当前版本，再在 webdir 中查找它的上一个版本（ls | grep -B1 <当前版本> | head -n1），重新建立软链接指向上一个版本并重启服务；
5) 参数化：用选项参数 OPS=deploy|rollback（或分支参数），一个任务同时支持部署与回滚，脚本内用 case 分支调用 deploy()/rollback() 函数。
容器化场景下的替代做法：回滚只需把 Deployment 的镜像 tag 切回上一个版本（kubectl set image 或 docker rm -f + docker run 指定旧 tag）。

**解析**

要点：多版本目录 + 软链接切换 + 用上一个版本目录回滚。【衍生知识点】镜像化交付的回滚成本更低，是容器化的优势之一。

---

### 60. 【面试】Jenkins 分布式是什么？Master/Agent 架构中各角色职责是什么？

**答案**

Jenkins 分布式：将众多 Job 分散运行到不同的 Jenkins 节点，大幅提高并行 Job 的处理能力，也可针对不同环境/语言分配节点（如 Java 程序给 Slave1、Go 程序给 Slave2、Nodejs 给 Slave3），同时缓解单台 Master 的瓶颈。
Jenkins 2 采用 master/agent 架构（也称 Controller/Agent，早期称主节点/从节点、master/slave）：
1) 主节点 Master/Controller：一个部署实例的核心控制系统，负责提供 UI、处理 HTTP 请求、管理构建环境、可访问所有配置与任务列表；若不存在其它代理节点，主节点也是默认的任务执行节点；
2) 代理节点 Slave/Agent：所有非主节点，由主节点管理，按需分配或指定执行特定的构建/测试任务；
3) 执行器 Executor：节点上执行任务的槽位，数量决定该节点可并发执行的任务量；主节点分配任务时目标节点必须有可用 Executor，否则只能等待空闲槽位；
4) 标签 Label：节点标识符，供 Pipeline 的 agent 指令或任务按标签过滤选择节点，支持 !、&&、||、->、<-> 表达式。
关键约定：Agent 与 Master 的环境尽可能一致（JDK 与各工具版本、路径、脚本、SSH key 验证、域名解析），且主从节点时间必须同步，否则 Agent 状态异常。

**解析**

要点：Master 管 UI 与调度、Agent 干构建、Executor 是并发槽位、Label 用于过滤节点。【衍生知识点】Agent 通过从 Master 下载 remoting.jar 运行，因此必须安装 JDK。

---

### 61. 【面试】Jenkins Agent 的通信（连接）方式有哪些？各自特点是什么？

**答案**

主要有三种：
1) Launch agent via SSH（SSH 连接）：Agent 端运行 ssh 服务，由 Master 作为 ssh client 主动连接。需安装 SSH Build Agents 插件；支持口令认证与密钥认证；Agent 上以普通用户 jenkins 运行，工作目录如 /home/jenkins/agent。另一种形式是直接运行基于 jenkins/ssh-agent 镜像的容器，但该容器方式只支持密钥认证（公钥通过 JENKINS_AGENT_SSH_PUBKEY 环境变量传入，私钥保存为 Jenkins 凭据）。
2) Launch agent by connecting it to the controller（通过 Java Web 启动代理 / JNLP）：基于 JNLP-HTTP 协议，由 Agent 主动向 Controller 发起双向连接，Controller 需额外提供套接字，默认 TCP 50000 端口（也支持随机端口，或基于 8080 端口的 WebSocket）。此方式无需安装插件即可实现；新版 Jenkins 可不打开 50000 端口，直接通过 8080/tcp 通信。
3) Launch agent via execution of command on the controller：在 Controller 上远程执行命令启动 Agent，需要 ssh 服务支持。
排错提示：若 Agent 没有 Java 环境会启动失败；Host Key Verification Strategy 不支持用 ssh_config 的 StrictHostKeyChecking no 自动添加公钥，建议设为 Non verifying verification strategy。

**解析**

要点：SSH（Master 主动）/ JNLP（Agent 主动，默认 50000）/ 命令启动。【衍生知识点】基于 SSH 的容器 Agent 只支持密钥认证。

---

### 62. 【面试】静态 Agent 与动态 Agent 有什么区别？动态 Agent 如何实现？

**答案**

静态 Agent：固定的、持续运行的 Agent，即使没有任务也必须启动（以 daemon 形式运行）。每个 Agent 可以有多个 Executor，数量应根据所在主机的系统资源设定；常见形态有 Linux 主机、Windows 主机以及容器方式。注意：很多构建步骤会通过执行 shell 命令完成，因此必须确保容器内部有可用的 shell 与工具。
动态 Agent：按需动态创建和删除 Agent，无任务执行时即删除，资源利用率高。主要有两种实现：
1) Docker Plugin：在配置好的 Docker Host 上按需创建以容器方式运行的 Agent，需要事先配置好容器模板；
2) Kubernetes Plugin：在配置好的 Kubernetes 集群上按需创建以 Pod 方式运行的 Agent，需要事先配置 Pod 模板。由 Controller 按 Job 运行需要临时创建，Agent 数量可动态伸缩，Job 运行结束后删除 Agent，可把每个 Agent 视作一个动态的 Executor。
依赖条件：动态 Agent 依赖云/集群环境，由 Jenkins Controller 通过 API 调用；Jenkins 自身既可部署在 Kubernetes 上，也完全可以运行在 Kubernetes 之外。

**解析**

要点：静态常驻、动态按需；动态基于 Docker Plugin 或 Kubernetes Plugin。【衍生知识点】动态 Agent 常与容器化构建结合，实现构建环境隔离与按需扩缩容。

---

### 63. 【面试】脚本式 Pipeline 与声明式 Pipeline 有什么区别？

**答案**

Jenkins 2.x 支持两种流水线语法：
1) 脚本式（Scripted、命令式）Pipeline：是 Jenkins 最先支持的 Pipeline 语法，采用命令式风格，直接在流水线脚本中定义逻辑和程序流程；最外层是 node { }，可直接使用 Groovy 编写循环、条件、异常处理，灵活但学习成本相对高。
2) 声明式（Declarative）Pipeline：由 CloudBees 引入的“流水线即代码”语法，最外层是 pipeline { }，允许用户把精力更多放在期望 Pipeline 的状态和输出上，而非实现逻辑；结构固定、可读性好，提供更丰富的语法特性（agent、stages、post、environment、tools、when、input、parallel 等），更易编写和阅读。
对比要点：
- 结构：声明式有固定骨架（pipeline → agent → stages → stage → steps），脚本式由 node/stage 自由组织；
- 灵活性：脚本式更灵活，可用完整 Groovy；声明式受限但更规范；
- 共性：两者都支持 Stage View 可视化；
- 选型：新项目推荐声明式，复杂逻辑可在 steps 中用 script { } 嵌入 Groovy 脚本弥补。

**解析**

要点：最外层 pipeline {} 是声明式、node {} 是脚本式；声明式更规范易读。【衍生知识点】声明式流水线在 Pipeline plugin 的 2.5 版本加入。

---

### 64. 【面试】声明式 Pipeline 的基本结构由哪些部分组成？

**答案**

声明式 Pipeline 必须包含在 pipeline 块中，主要结构和指令如下：
1) pipeline：最外层结构，代表整条流水线，包含完整逻辑，是声明式流水线的关键特征；
2) agent（section）：指定负责运行代码的节点。pipeline 顶部必须有默认 agent，stage 内部也可单独指定；常用取值 any（任意可用节点）、none（不定义默认 agent，各 stage 需单独指定）、label（指定标签节点）、node（可带 customWorkspace 等参数）、docker（在动态创建并运行的容器中执行）、dockerfile（用指定 Dockerfile 构建镜像后运行，需从 Multibranch/SCM 加载）、kubernetes（在 K8s 集群指定 Pod 中运行）；
3) stages（section）：封装所有 stage 定义，至少包含一个，Jenkins 会按定义顺序自上而下执行；
4) stage：定义每个离散的 CD 环节（如 Source、Build、Test、Deploy）。内部只能定义 steps、stages、parallel 或 matrix 四者之一，且多层嵌套只能用在最后一个 stage；已嵌套在 parallel/matrix 中的 stage 内部不能再使用 parallel/matrix；
5) steps（section）：阶段内完成该阶段功能的一系列步骤，是 Pipeline 最基本的操作单元（如 sh、echo、git、bat）。steps 内每条命令都在当前任务的工作目录下执行，切目录不会保留（需用 && 拼接）；默认不支持 shell 复杂语法；
6) post（section）：在 stage 或整个 pipeline 尾部执行的附加步骤，支持条件 always、changed、fixed、regression、aborted、failure、success、unstable、unsuccessful、cleanup（cleanup 在所有条件评估后最后运行）。
常用 directive：environment（环境变量）、tools（在 agent 上自动下载并配置 git/maven/jdk 等）、parameters、options（如 retry(2)）、triggers、libraries、input（暂停等待人工输入）、when（设定 stage 运行条件）。

**解析**

要点：pipeline / agent / stages / stage / steps / post 六大块 + 常用指令。【衍生知识点】post 中的 changed/fixed/regression 用于与上一次构建状态做对比。

---

### 65. 【面试】Pipeline 相比 Freestyle 任务有哪些优势？

**答案**

课件列出的 Pipeline 优势：
1) 一致性：用统一语法的代码方式实现各个 CICD 阶段的任务，不仅可被纳入版本控制，还能通过编辑代码实现目标效果；
2) 直观性：构建过程中每一步都可以直接图形化显示输出（如每个阶段的执行时间），帮助我们快速定位哪个阶段出错；
3) 可持续性：Jenkins 重启或中断后不影响已经执行的 Pipeline Job；
4) 支持暂停：可以选择停止并等待人工输入或批准后再继续执行；
5) 支持回放：如果失败，可以使用回放做临时性修改 Job 再调试执行，成功后再真正修改任务；
6) 可扩展：通过 Groovy 编程更容易扩展插件；
7) 并行执行：通过 Groovy 脚本可实现 step、stage 间的并行执行和更复杂的相互依赖关系；
8) 多功能：支持复杂 CD 要求，包括 fork/join 子进程、条件判断、循环和并行执行。
一句话总结：Pipeline 把原本一个任务或脚本做完的工作拆分为多个子任务按流水线方式执行，实现模块化完成复杂任务，是 Jenkins 从 CI 走向 CD 的关键能力。

**解析**

要点：代码化可版本控制、阶段可视化、可暂停审批、可回放、可并行、可扩展。【衍生知识点】Pipeline 是运行在 Jenkins 2.X 版本的核心插件。

---

### 66. 【面试】Jenkins 中如何管理凭据？Pipeline 中如何引用凭据？

**答案**

凭据（Credentials）管理：
- 入口：系统管理 → 凭据（全局凭据）→ 添加凭据，选择类型并填写对应值；
- 常用类型：Username with password（用户名密码）、SSH Username with private key（用户 + 私钥）、Secret text（如 K8s SA 的 Token、SonarQube Token）、Secret file（文件型凭据）；
- 典型用途：Jenkins 拉取 GitLab 代码、Master 连接 Agent、推送镜像到 Harbor、访问 Kubernetes API Server、调用 SonarQube 等；
- 安全意义：避免把密码、私钥明文写在脚本中。
Freestyle 任务中在“源码管理”等位置直接下拉选择凭据即可；Pipeline 中用 withCredentials 引用，不同凭据类型写法不同：
- 用户名密码：withCredentials([usernamePassword(credentialsId: '<ID>', usernameVariable: 'USER', passwordVariable: 'PASS')]) { ... }
- 私钥：withCredentials([sshUserPrivateKey(credentialsId: '<ID>', keyFileVariable: 'KEY')])
- Secret text：withCredentials([string(credentialsId: '<ID>', variable: 'TOKEN')])
- Secret file：withCredentials([file(credentialsId: '<ID>', variable: 'FILE')])
此外，可在 environment 中直接注入，如 SONAR_TOKEN = credentials('sonarqube-token')，变量名不能含横线、支持下划线。

**解析**

要点：凭据类型 + withCredentials 四种写法。【衍生知识点】environment 中用 credentials() 可把凭据直接注入为环境变量。

---

### 67. 【面试】Jenkins 如何实现基于角色的权限管理？

**答案**

默认情况下 Jenkins 用户可以执行所有操作和管理所有 Job（所有用户都是管理员权限），为了更好分层控制需要基于角色分权。步骤：
1) 创建用户：Jenkins → 系统管理 → 管理用户 → 新建用户；
2) 安装插件：Role-based Authorization Strategy（角色授权策略插件）；下载失败时可手动放入 /var/lib/jenkins/plugins 目录；
3) 更改认证授权方式：Jenkins → 系统管理 → 全局安全配置 → 授权策略 → 选择 Role-Based Strategy；
4) 创建全局角色（系统管理 → Manage and Assign Roles → Manage Roles）：控制登录用户能操作 Jenkins 的哪些资源，例如普通用户只授予 overall 的 Read 权限（add 完成后还需保存）；
5) 创建项目角色：使用 pattern 正则表达式匹配项目名（如 testproject.* 表示所有 testproject 开头的 job），控制用户能看到哪些项目及拥有什么权限（例如凭据部分只授予 View，其它部分给全部权限）；
6) 关联用户到角色（Assign Roles）：把用户加入对应的全局角色/项目角色；
7) 验证：用普通用户登录，应看不到“系统管理”，只能执行被授权过的 Job。
注意事项：旧版的“触发远程构建”功能与角色授权策略冲突，配置不当会导致重启 Jenkins 后无法登录。

**解析**

要点：角色插件 → 授权策略改 Role-Based → 建全局角色 + 项目角色（正则）→ 关联用户。【衍生知识点】项目角色用 pattern 正则做 Job 过滤。

---

### 68. 【面试】SonarQube 是什么？它从哪七个维度检测代码质量？

**答案**

SonarQube 是一个开源平台，用于管理源代码的质量；它不只是一个质量数据报告工具，更是代码质量管理平台，并集成到现有工作流程中在项目分支和拉取请求（PR）之间进行连续的代码检查。
它支持 Java、Go、Python、PHP、C/C++、C#、JavaScript、Scala、HTML、PL/SQL、Swift、Ruby 等 29 种语言，能检测代码中的错误、漏洞和代码异味（Code Smell）。
七个代码质量维度：
1) 可维护性（maintainability）：在不破坏原有设计、不引入新 bug 的情况下能快速修改或添加代码；
2) 可读性（readability）：是否符合编码规范、命名达意、注释详尽、函数长短合适、模块划分清晰、高内聚低耦合；
3) 可扩展性（extensibility）：在不修改或少量修改原有代码的情况下，通过扩展方式添加新功能；
4) 灵活性（flexibility）：易扩展、易复用、易用；
5) 简洁性（simplicity）：遵循 KISS（Keep It Simple, Stupid）原则，尽量保持代码简单；
6) 可复用性（reusability）：尽量减少重复代码，复用已有的代码；
7) 可测试性（testability）：可测试性差（难写单元测试）基本说明代码设计有问题。
版本分为社区版、开发版、企业版和数据中心版，只有社区版是开源免费的；又分 LTS 与非 LTS，生产建议用 LTS。

**解析**

要点：29 种语言、七维度（可维护 / 可读 / 可扩展 / 灵活 / 简洁 / 可复用 / 可测试）、只有社区版免费。【衍生知识点】IDE 侧对应插件为 SonarLint。

---

### 69. 【面试】SonarQube 的架构由哪些组件组成？部署有哪些硬性要求？

**答案**

SonarQube 基于 C/S 结构，主要由四部分组成：
1) Web Server：提供 UI 界面；
2) Search Server：为 UI 提供搜索功能，基于 ElasticSearch 实现；
3) Compute Engine Server：处理代码分析报告，并将之存储到 SonarQube Database；
4) SonarQube Database：负责存储 SonarQube 的配置以及项目的质量快照等。
此外还有两类扩展：SonarQube Plugin（可在 Server 上安装丰富插件，支持各种开发语言、SCM、集成、身份验证和治理）与 Code analysis Scanners（代码扫描器，作为客户端把扫描报告提交给 Server，如 sonar-scanner）。
部署硬性要求：
- 硬件：小型实例至少需要 2GB RAM（另需 1GB 空闲内存给 OS），磁盘空间取决于分析的代码量，且必须安装在读写性能好的磁盘上（data 目录存放 ElasticSearch 索引，运行时产生大量 I/O）；不支持 32 位操作系统（扫描器侧支持）；
- 内核参数（新版）：vm.max_map_count ≥ 524288、fs.file-max ≥ 131072、可打开文件描述符 ≥ 131072、可打开线程数 ≥ 8192（旧版分别为 262144 / 65536 / 65536 / 4096）；不改会在启动时报错；
- 数据库：7.9 起不再支持 MySQL，改用 PostgreSQL（当前 9.9.8 不支持 Ubuntu24.04 自带的 PostgreSQL 16，支持 22.04 的 14）；
- Java：SonarQube 9.9 要求 JDK 17 且不支持 JDK 21；7.9 以上不再支持 Java 8；
- 启动用户：因内置 ElasticSearch，不允许使用 root 启动，需用普通用户（如 useradd -s /bin/bash -m sonarqube）；
- 默认 Web 端口：9000。

**解析**

要点：四组件 + 插件 + 扫描器；内核参数、数据库、Java 版本、非 root 启动。【衍生知识点】ES 不允许 root 启动是很多“启动失败”问题的根因。

---

### 70. 【面试】Jenkins 如何集成 SonarQube 实现代码质量门禁？

**答案**

集成目标：在流水线中自动扫描代码，并通过“质量阈（Quality Gate）”决定是否放行后续的构建与部署。主要步骤：
1) SonarQube 侧：添加回调 Jenkins 的 Webhook（配置 → 网络调用 → 创建，URL 形如 http://jenkins:8080/sonarqube-webhook），使 SonarQube 能把质量阈结果回调给 Jenkins；同时创建用户或 Token（squ_xxx，只显示一次）用于认证，并给该用户分配“执行分析”和“置备项目”权限；
2) Jenkins 侧安装插件：SonarQube Scanner；
3) 系统配置：系统管理 → 系统设置 → SonarQube servers，添加 Name（大小写敏感，如 SonarQube-Server）和 Server URL（如 http://sonarqube:9000，末尾不能加 /，否则报 Invalid JSON String）；新版 SonarQube 默认禁止匿名访问，需配置 Token；
4) 全局工具配置：配置 sonar-scanner，有手动指定本地绝对路径、指定下载路径自动安装、从 Maven 仓库安装三种方式；
5) 触发扫描：Freestyle 任务中添加“Execute Sonarqube Scanner”构建步骤，并拖到执行 shell 之前（先扫描再构建）；Java 项目也可直接用 Maven 插件 mvn clean verify sonar:sonar -Dsonar.java.binaries=target/；
6) 扫描配置：项目根目录准备 sonar-project.properties（sonar.projectKey、projectName、sources、java.binaries、language、sourceEncoding 等），Java 项目必须指定 sonar.java.binaries，否则扫描会失败；
7) Pipeline 集成（推荐）：用 withSonarQubeEnv('SonarQube-Server') { sh 'mvn sonar:sonar' } 执行分析，再用 timeout(time: 30, unit:'MINUTES') { waitForQualityGate abortPipeline: true } 等待质量阈结果——若质量阈不通过（status != OK）则流水线直接失败，阻止问题代码进入生产；
8) 验证：构建后 SonarQube 生成报告可在线查看；修改质量阈后再次构建，不符合阈值时构建失败。
核心价值：把代码质量从“事后检查”变成“流水线中的强制门禁”，实现质量左移。

**解析**

要点：SonarQube 回调 webhook + Jenkins 插件与服务器配置 + withSonarQubeEnv + waitForQualityGate。【衍生知识点】Quality Gate 能力由 SonarQube Scanner 插件提供，无需额外单独安装。

---
