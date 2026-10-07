# 马哥Git和GitLab课件 —— 答案与解析

> 共 74 题，编号与《试题册-马哥Git和GitLab课件.md》一致。


## Git和GitLab笔试

### 1. 【DevOps】DevOps 一词是由哪两个单词组合缩写而成？

**答案**

**C**　Development 与 Operations

**解析**

DevOps 即 Development（开发）和 Operations（运维）的缩写，是一组过程、方法与系统的统称，用于促进开发、技术运营和质量保障（QA）部门之间的沟通、协作与整合。【衍生知识点】DevOps 不仅是组织架构变革，更是企业文化和思想观念的变革。

---

### 2. 【DevOps】关于 DevOps 与 CI/CD 的关系，下列说法正确的是？

**答案**

**B**　DevOps 是方法论，CI/CD 是其具体技术实践

**解析**

DevOps 是涵盖文化、流程和工具的方法论，贯穿 SDLC 全过程；CI/CD 属于 DevOps 方法论中的具体技术实践，主要集中在开发和部署阶段，强调代码变更的自动化处理。【衍生知识点】DevOps 的目标是打破开发与运维壁垒、缩短交付周期；CI/CD 的目标是自动化构建、测试和部署。

---

### 3. 【DevOps】DevOps 的关键指标不包括以下哪一项？

**答案**

**D**　每日代码提交行数

**解析**

DevOps 关键指标包括：平均恢复时间 MTTR、平均投产时间、平均提前时间、部署速度、部署频率、生产失败率。代码行数并不属于 DevOps 关键指标。

---

### 4. 【CICD】持续集成（CI）的核心目的是？

**答案**

**A**　尽早发现集成错误，确保新代码与原代码正确集成

**解析**

持续集成强调开发人员提交新代码后立刻进行构建和（单元）测试，主要目的是尽早发现集成错误，使团队更加紧密结合。CI 属于开发人员的自动化流程，核心在于确保新增代码能与原有代码正确集成。

---

### 5. 【CICD】持续交付（Continuous Delivery）与持续部署（Continuous Deployment）最本质的区别是？

**答案**

**C**　持续交付部署到生产环境需人工操作，持续部署则全自动

**解析**

持续交付是自动将生产就绪型构建版本发布到代码存储库，部署到生产环境仍需要人工操作；持续部署则在此基础上把部署到生产环境的过程也自动化。即区别在于『最终部署到生产环境是否自动化』。【衍生知识点】因为自动发布存在较大风险，当前采用持续部署方式较少。

---

### 6. 【CICD】关于持续集成、持续交付、持续部署三者的关系，描述正确的是？

**答案**

**B**　持续交付在持续集成基础上增加了测试、模拟、生产环境的流程

**解析**

CI 关注代码集成与自动构建测试；CD（持续交付）在其基础上增加了测试 Test → 模拟 Staging → 生产 Production 的流程，核心对象变为『可交付的产物』；持续部署则是把部署到生产环境的环节也自动化。

---

### 7. 【CICD】应用部署发展阶段中，利用 Ansible、Shell/Python 脚本实现部署属于第几个阶段？

**答案**

**C**　第三阶段：脚本 / 自动化工具半自动化部署

**解析**

应用部署发展经历四个阶段：①开发人员自行手动上传构建并部署；②开发人员发代码给运维、运维手动上传生产；③运维利用脚本和自动化运维工具（如 Ansible）实现半自动化部署；④通过 Web 等 GUI 界面实现一键自动化部署（如 Jenkins）。

---

### 8. 【部署模式】关于蓝绿部署的特点，下列说法正确的是？

**答案**

**A**　同一时间只有一套正式环境在线，业务无中断但成本较高

**解析**

蓝绿部署利用两套相同的环境（蓝色预发布 / 绿色生产），新版本先在蓝色环境完成测试，通过后把用户流量切过去。其特点是业务无中断、升级风险较小，但成本较高，同一时间只有一套正式环境在线。【衍生知识点】蓝绿发布部署的最小维度是容器，发布的最小维度是应用；对涉及数据表结构变更等不可逆升级并不完全合适。

---

### 9. 【部署模式】金丝雀（灰度）发布的典型增量发布比例是？

**答案**

**B**　2%→25%→75%→100%

**解析**

金丝雀发布也叫灰度发布，是增量发布的一种类型，常见比例为 2%、25%、75%、100% 逐步更新。它是在原有版本可用的前提下，同时部署新版本作为『金丝雀』，按用户或路由权重放量，例如 90% 用户维持老版本、10% 用户尝鲜新版本。【衍生知识点】灰度发布在实际生产中使用较为普遍，常与 A/B 测试一起使用。

---

### 10. 【部署模式】以下哪种部署模式是两套正式环境同时在线，用于测试应用功能表现的？

**答案**

**D**　A/B 测试 A/B Testing

**解析**

A/B 测试同时对外提供两个 APP 运行环境，用于测试应用功能表现（可用性、受欢迎程度、可见性等）；而蓝绿部署同一时间只有一套正式环境在线，目的是安全稳定地发布新版本并在必要时回滚。二者常被混淆。

---

### 11. 【部署模式】滚动发布过程中，『绿色』节点代表的含义是？

**答案**

**A**　正在运行的实例，即升级前的旧版本

**解析**

滚动发布中：红色代表正在升级过程中的中间状态『正在更新的实例』；蓝色代表『更新完成并加入集群的新版本实例』；绿色代表『正在运行的实例，即升级前的旧版本』。滚动发布的核心是逐节点升级、先升级 1 个做部署验证。

---

### 12. 【VCS】关于集中式版本控制系统（如 SVN）的缺点，下列描述不正确的是？

**答案**

**C**　无法实现软件仓库的安全访问限制和权限控制

**解析**

集中式版本控制的所有提交和回滚都依赖集中代码服务器，存在单点问题，无法连接服务器时不能提交、还原、对比；但其优点恰恰是『可以实现更好的软件仓库安全访问限制和控制』。所以『无法实现权限控制』不是它的缺点，而是它的优势。

---

### 13. 【VCS】关于分布式版本控制系统的描述，正确的是？

**答案**

**B**　每个用户都是完整版本库，可以离线提交，但不易做仓库安全访问控制

**解析**

分布式版本控制（如 Git）中每个用户都是一个完整的版本库，可以先将代码提交到本地，没有网络也能提交，有网络时再同步到中央服务器；但此方式不容易实现软件仓库的安全访问限制和控制。【衍生知识点】集中式与分布式在安全管控能力上正好相反。

---

### 14. 【Git】Linus 决定自己开发 Git 的直接原因是？

**答案**

**C**　BitKeeper 收回免费使用权，Linus 只能自研替代

**解析**

2002 年 Linus 选择商业版本控制系统 BitKeeper 管理 Linux 内核代码，但免费使用限制很多，社区有人破解后被 BitMover 公司发现并收回免费使用权。迫不得已，Linus 闭关一个月写出了 Git。【衍生知识点】2005 年 4 月 3 日开始开发，4 月 7 日 Git 就已经能作为自身的版本控制工具。

---

### 15. 【Git】Git 的数据存储从物理上分为哪两部分？

**答案**

**A**　工作区和版本库

**解析**

Git 从物理上分为当前项目目录（工作区 Workspace）和当前项目目录下的隐藏子目录 .git（版本库）；版本库在逻辑上又分为暂存区和本地仓库。远程仓库则是多开发者共同协作提交代码的仓库。

---

### 16. 【Git】Git 暂存区（Staging Area / Index）对应的物理文件是？

**答案**

**B**　.git/index

**解析**

暂存区也称为索引区、缓存区，对应 <项目目录>/.git/index 文件，使用 git add 把工作区变更加入，只有放入此区的文件才能被 Git 管理。本地仓库对应 .git/ 目录本身，通过 git commit 提交。

---

### 17. 【Git】关于 tag 与 branch 的区别，下列说法正确的是？

**答案**

**B**　tag 指向某个 commit 且不可移动，branch 是可移动的指针

**解析**

tag 对应某次 commit，是一个点，是不可移动的，主要用于发布版本管理；branch 对应一系列 commit，是很多提交点连成的线，有 HEAD 指针并可依靠它移动。因此改动代码用 branch，不改动只查看用 tag。

---

### 18. 【Git】Git 中附注标签（annotated tag）相比轻量标签（lightweight tag）的最大差异是？

**答案**

**C**　附注标签是完整对象，含打标签者、邮箱、日期和说明信息

**解析**

轻量标签仅为某个 commit 的引用；附注标签是存储在 Git 数据库中的一个完整对象，包含打标签者的名字、电子邮件地址、日期时间以及 message 信息。创建方式为 git tag -a <tagname> -m <message>。

---

### 19. 【Git】Git config 配置的三级作用域中，默认（可省略选项）的是？

**答案**

**C**　--local

**解析**

--system 针对所有用户，保存在 /etc/gitconfig；--global 针对当前用户，保存在 ~/.gitconfig；--local 只针对当前目录（项目），保存在当前目录 .git/config，此为默认值可省略。优先级为 local > global > system。

---

### 20. 【Git】git reset 不加任何模式选项时，默认使用的是哪种模式？

**答案**

**B**　--mixed

**解析**

--mixed 是默认选项，会回滚暂存区和本地仓库，但工作目录不受影响；--soft 只移动 HEAD 和 master 指针，工作目录和暂存区都不改变；--hard 则让本地仓库、暂存区和工作目录都回滚到指定提交，该选项非常危险。

---

### 21. 【Git】关于 git revert 与 git reset 的区别，下列说法正确的是？

**答案**

**A**　revert 用新提交抵消历史修改且保留历史，reset 直接移动 HEAD 删除提交

**解析**

git revert 是用一次新的 commit 来回滚之前的 commit，此次操作之前和之后的 commit 与 history 都会保留，即用一个新提交抵消历史提交所做的修改，之后可再 push 到远程；git reset 则是直接删除指定的 commit，把 HEAD 向后移动。所以对已 push 到远程仓库的代码，应使用 revert 回滚。【衍生知识点】reset 只影响本地仓库，远程不会变化，若再 pull 会重新合并导致回退失败。

---

### 22. 【Git】git pull 命令等价于下面哪两个命令的组合？

**答案**

**B**　git fetch 与 git merge

**解析**

git pull 相当于 git fetch <remote_name> 与 git merge <remote_name> 两步的组合，即先抓取远程仓库的变更到本地仓库，再将其合并到当前分支与工作区。【衍生知识点】git fetch 只获取变更不合并，需要手动 merge。

---

### 23. 【Git】要把本地 main 分支推送到远程的 dev 分支，正确的命令是？

**答案**

**C**　git push origin main:dev

**解析**

git push origin main:dev 表示把本地 main 分支推送至远程 dev 分支；而 git push origin :dev（冒号前为空）表示把空分支推送到远程 dev，即删除远程 dev 分支。【衍生知识点】推送目标分支与当前所在分支无关。

---

### 24. 【Git】Git 默认在推送时不会推送标签，要推送本地仓库所有标签应使用？

**答案**

**D**　git push origin --tags

**解析**

git push <remote_name> --tags 可以把本地仓库所有的 tag 推送到远程；git push origin <tagname> 只推送指定的 tag。删除远程标签则用 git push --delete origin <tagname>。

---

### 25. 【Git】执行 git clone 克隆远程仓库后，默认情况下？

**答案**

**A**　只显示 master 分支，需 checkout 才能看到其它分支

**解析**

git clone 会克隆 URL 指定项目的所有分支和标签对应文件到指定目录，并在本地创建仓库，但默认只显示 master 分支而不显示其它分支，可以执行 git checkout <分支> 来查看其它分支的文件。若想直接克隆到指定分支，可用 git clone -b develop <url>。

---

### 26. 【Git】Git 2.23 版本专门引入的、只专注于分支切换的新命令是？

**答案**

**B**　git switch

**解析**

git switch 是 Git 2.23 版本引入的新命令，专用于分支切换；git checkout 历史更久、用途更广，除切换分支外还可用于还原文件、切换到特定提交、创建新分支等。git switch -c <new-branch> 相当于 git branch + git switch。

---

### 27. 【Git】关于 .gitignore 文件，下列说法正确的是？

**答案**

**C**　可用 ! 表示例外不忽略某文件，且未提交时也能立即生效

**解析**

在 .gitignore 中可用 ! 表示例外，如 !test.h 表示不忽略 test.h；*.py[c|x] 表示匹配 .pyc 或 .pyx。该文件无须提交即可立即生效实现忽略，但为了保存此文件最终还是需要提交到本地仓库。【衍生知识点】还可使用 temp/ 形式匹配以目录分隔符结尾的临时子目录。

---

### 28. 【Git】三路合并（3-Way Merge）需要哪些提交参与合并？

**答案**

**B**　需要共同祖先提交和各分支的最新一次提交

**解析**

三路合并发生在两个分支各自沿着自己的演进路线分别创建了新的提交时，合并需要共同的祖先提交以及各分支的最新一次提交参与（示例中为 commit3、commit4、commit5 三方）。若某文件存在无法合并的修改则产生冲突，需用户手动解决冲突后创建提交完成合并。【衍生知识点】若两个分支是线性关系，则可用快进式合并（Fast-Forward Merge）。

---

### 29. 【GitLab】GitLab 软件使用什么语言开发，采用什么许可证分发？

**答案**

**A**　Ruby 语言，MIT 许可证

**解析**

GitLab 由乌克兰程序员 Dmitriy Zaporozhets 和 Valery Sizov 开发，使用 Ruby 语言写成，后来部分用 Go 语言重写，是完全免费的开源软件，按照 MIT 许可证分发。【衍生知识点】2013 年 7 月 GitLab 拆分为 CE 社区版与 EE 企业版，2014 年 2 月宣布采用开放核心业务模式，EE 在专有许可证下。

---

### 30. 【GitLab】GitLab 自哪个版本开始，Linux 包安装不再支持 MySQL，只支持 PostgreSQL？

**答案**

**B**　GitLab 12.1

**解析**

从 GitLab 12.1 开始，Linux 包安装不再支持 MySQL，只支持 PostgreSQL。GitLab 默认使用 PostgreSQL 作为数据库，Redis 作为缓存，Sidekiq 做异步队列。【衍生知识点】GitLab 数据目录 /var/opt/gitlab 中存放源代码，配置文件目录为 /etc/gitlab。

---

### 31. 【GitLab】关于 GitLab 的硬件要求，下列描述正确的是？

**答案**

**C**　测试环境建议 4G 以上，新版 17.3.1 建议 8G 以上

**解析**

测试环境内存建议 4G 以上，新版 gitlab-ce_17.3.1 建议 8G 以上；生产环境建议 CPU 2C 以上、内存 8G 以上、磁盘 10G 以上。内存较低会导致 GitLab 有些服务无法启动。【衍生知识点】一键安装脚本中特别注明『安装 GitLab 服务器内存建议至少 4G，root 密码至少 8 位』。

---

### 32. 【GitLab】Omnibus GitLab 是基于什么应用编排工具实现对多组件统一管理的？

**答案**

**B**　Chef

**解析**

由于 GitLab 组件众多、分别管理配置过于复杂，官方提供了 Omnibus GitLab 项目，它基于 Chef 的应用编排工具，通过 Chef 的 cookbooks 和 recipes 等组件自动化编排 GitLab 各组件，避免用户复杂的配置过程。统一管理命令为 gitlab-ctl。【衍生知识点】还提供 gitlab-backup、gitlab-psql、gitlab-rails、gitlab-rake 等组件专用命令。

---

### 33. 【GitLab】修改 /etc/gitlab/gitlab.rb 配置后，必须执行哪条命令使配置生效？

**答案**

**A**　gitlab-ctl reconfigure

**解析**

每次修改完配置文件都需要执行 gitlab-ctl reconfigure 重新配置；此外 gitlab-ctl check-config 可检查配置、show-config 查看配置、status 查看组件状态、tail 查看日志、service-list 列出服务。停止/启动/重启分别用 stop/start/restart。

---

### 34. 【GitLab】GitLab 12.2 之后版本执行数据备份的正确命令是？

**答案**

**B**　gitlab-backup create

**解析**

GitLab 12.2 之后版本使用 gitlab-backup create；12.1 之前的旧版本使用 gitlab-rake gitlab:backup:create。备份默认保存在 /var/opt/gitlab/backups，文件名形如 时间戳_日期_版本_gitlab_backup.tar。【衍生知识点】默认备份过期时长由 gitlab_rails['backup_keep_time'] 控制，默认 604800 秒即 7 天，过期后自动删除。

---

### 35. 【GitLab】关于 GitLab 数据备份的内容，下列描述正确的是？

**答案**

**C**　gitlab.rb 与 gitlab-secrets.json 不包含在数据备份中，需手动备份

**解析**

备份完成后会提示：gitlab.rb 和 gitlab-secrets.json 文件包含敏感数据，不包含在该备份中，需要手动备份，否则无法完整恢复。备份等配置文件则可用 gitlab-ctl backup-etc --backup-path <DIRECTORY>，默认备份到 /etc/gitlab/config_backup/。【衍生知识点】gitlab-secrets.json 用于双因子验证等场景。

---

### 36. 【GitLab】执行 GitLab 数据恢复前，必须先停止的两个服务是？

**答案**

**A**　puma 和 sidekiq

**解析**

新版恢复前先执行 gitlab-ctl stop puma 和 gitlab-ctl stop sidekiq（旧版为 unicorn 和 sidekiq），然后执行 gitlab-backup restore BACKUP=备份文件名的时间部分_Gitlab版本，恢复时不需要指定文件全名，恢复后再 reconfigure 并 restart。【衍生知识点】备份和恢复使用的版本必须一致。

---

### 37. 【GitLab】GitLab 中将用户添加到组时，若要 push 代码（非保护分支）至少需要哪种角色？

**答案**

**C**　Developer

**解析**

GitLab 用户在组里有 5 种权限：Guest（创建 issue、评论，不能读写版本库）、Reporter（可克隆代码不能提交）、Developer（可克隆、开发、提交、push 非保护分支）、Maintainer（可创建项目、添加 tag、保护分支、添加成员、编辑项目）、Owner（设置项目访问权限、删除项目、迁移项目、管理组成员）。【衍生知识点】对保护分支（如默认被保护的 master），Developer 只能 pull 不能 push，需设为 Maintainer 才能 push。

---

### 38. 【GitLab】关于 GitLab 的升级操作，下列说法正确的是？

**答案**

**B**　不能跳过中间版本，需按顺序先升级到最近的大版本

**解析**

GitLab 不能直接跳过中间的版本升级，应选择最近的大版本进行升级。例如从 12.1 升级到 13.0，需要先升级到 12.X 的最高版本，再升级到 13.0。安装新版本包时若提示出错，通常是版本升级后有些配置项过时，根据提示修改配置后执行 gitlab-ctl reconfigure、gitlab-ctl restart 即可。【衍生知识点】迁移本质上是备份和恢复的过程。

---

### 39. 【GitLab】实现 GitLab HTTPS 时，配置文件中『必选』的项共有几项？

**答案**

**B**　4 项

**解析**

共 4 项必选：external_url 必须改为 https、nginx['redirect_http_to_https'] = true（默认 false，实现 80 自动 301 跳转到 443）、nginx['ssl_certificate']、nginx['ssl_certificate_key']。其他如 nginx['enable']、client_max_body_size、ssl_protocols 等为可选项。【衍生知识点】使用自签名证书需在客户端加入信任，否则 git clone 会报 server certificate verification failed。

---

### 40. 【GitLab】重置 GitLab 忘记的 root 密码，正确的入口命令是？

**答案**

**C**　gitlab-rails console -e production

**解析**

使用 gitlab-rails console -e production 进入控制台（此步可能较慢需要等待），然后可用 user = User.find_by_username 'root' 或 user = User.where(id: 1).first 定位用户，设置 user.password 与 user.password_confirmation 后 user.save 保存并 quit 退出。【衍生知识点】验证时注意要使用 external_url 对应的 URL 登录才有效。

---

### 41. 【GitLab】GitLab 服务构成中，负责提供 Git RPC 服务、处理 GitLab 发起的全部 Git 调用的是？

**答案**

**B**　Gitaly

**解析**

Gitaly 是 Git RPC service，负责处理 GitLab 发起的全部 Git 调用；GitLab shell 用于处理基于 ssh 会话的 Git 命令和修改 authorized keys 列表；gitlab-workhorse 是轻量级反向代理；Puma 处理发往 Web 接口和 API 的请求；sidekiq 在后台执行队列任务（异步执行）。【衍生知识点】GitLab 还包含 Nginx、PostgreSQL、Redis、GitLab Exporter、Node Exporter 以及 Prometheus/Alertmanager/Grafana/Sentry/Jaeger 等自监控组件。

---

### 42. 【GitLab】GitLab 中用于提交代码、下载代码的两种协议格式分别是？

**答案**

**A**　http[s]://host[:Port]/group/project.git 与 git@host:group/project.git

**解析**

GitLab 支持 http/https 或 ssh 协议上传下载文件：http[s] 格式为 http[s]://host[:Port]/group/project.git，ssh 格式为 git@host:group/project.git；若 ssh 使用非标准端口则为 ssh://[user@host:port]/group/project.git，也可通过 ~/.ssh/config 配置。【衍生知识点】GitLab 默认 ssh 端口可在 gitlab.rb 中通过 gitlab_sshd['listen_address'] 调整为 0.0.0.0:2222。

---

### 43. 【Git】Git 的缺点不包括以下哪一项？

**答案**

**D**　必须联网才能提交代码

**解析**

Git 的缺点包括：不符合常规思维、学习难度大学习周期长、代码保密性差（一旦开发者把整个库克隆下来就可以完全公开所有代码和版本信息）、无力支持大型二进制文件、具有大量历史记录的超大型存储库会降低交互速度。而『支持离线工作』属于 Git 的优点。【衍生知识点】Git 优点还有适合分布式开发强调个体、公共服务器压力和数据量不大、速度快灵活、任意两个开发者之间容易解决冲突。

---

### 44. 【VCS】第二代版本控制系统 CVS 与 SVN 的演进关系，下列描述正确的是？

**答案**

**B**　CVS 于 1986 年发布并在 2000 年被 SVN 取代

**解析**

CVS（并发版本系统）是最初的第二代版本控制系统，由荷兰科学家 Dick Grune 于 1986 年公开发布，大约十年间最为流行，直到 2000 年被 Subversion 所取代。SVN 由 CollabNet 公司于 2000 年资助并发起开发，2001 年 8 月 31 日实现『自我寄生』，2009 年 11 月被 Apache Incubator 接收，2010 年 1 月成为 Apache 顶级项目。【衍生知识点】CVS 最初只是包装 RCS 的 Shell 脚本集合。

---

### 45. 【DevOps】DevOps 一词即开发 ______ 和运维 ______ 的缩写，是一组过程、方法与系统的统称。

**答案**

- 第 1 空：Development / development
- 第 2 空：Operations / operations

**解析**

DevOps 用于促进开发、技术运营和质量保障（QA）部门之间的沟通、协作与整合，强调交付和基础设施变更的自动化，从而实现持续集成、持续部署和持续交付的目标。【衍生知识点】DevOps 维基定义：一组过程、方法与系统的统称。

---

### 46. 【DevOps】敏捷开发的核心是 ______ 开发与 ______ 开发，它要求每次迭代都是一个完整的软件开发周期。

**答案**

- 第 1 空：迭代 / 迭代式 / iterative
- 第 2 空：增量 / 增量式 / incremental

**解析**

迭代开发是把一个大周期拆分成多个小周期，即一次『大开发』变成多次『小开发』；增量开发是每个版本都新增一个可被用户感知的完整功能，按新增功能来划分迭代。【衍生知识点】敏捷优势：尽早交付加快资金回笼、降低风险、提高效率。

---

### 47. 【Git】Git 配置有 --system、--global、--local 三级作用域，其优先级由高到低为 ______ > ______ > ______。

**答案**

- 第 1 空：local
- 第 2 空：global
- 第 3 空：system

**解析**

local 针对当前目录（项目），保存在 .git/config（默认值可省略）；global 针对当前用户，保存在 ~/.gitconfig；system 针对所有用户，保存在 /etc/gitconfig。【衍生知识点】环境变量 GIT_EDITOR 的优先级高于 core.editor 配置。

---

### 48. 【Git】在 Git 的提交链中，除初始 commit 外每个 commit 都会有一个 ______ commit，除最新一次 commit 外每个 commit 都会有一个 ______ commit。

**答案**

- 第 1 空：父 / parent / 父提交
- 第 2 空：子 / child / 子提交

**解析**

版本库上的 commit 历史组合起来形成提交链，也可能存在多个父 commit（如分支合并）或多个子 commit（如创建新分支）。【衍生知识点】HEAD 引用代表提交链的『头』，HEAD~ 表示前一个提交。

---

### 49. 【Git】Git 支持两种标签：______ 标签（仅为某个 commit 的引用）和 ______ 标签（存储在数据库中的完整对象，含打标签者、邮箱、日期和 message）。

**答案**

- 第 1 空：轻量 / lightweight
- 第 2 空：附注 / annotated

**解析**

轻量标签用 git tag <tagname> 创建；附注标签用 git tag -a <tagname> -m <message> 创建。【衍生知识点】常用版本标记格式为 version-number.release-no.modification-no（如 v1.3.2）。

---

### 50. 【Git】Git 的分支本质上仅仅是指向提交对象的可变 ______，其默认分支名是 ______。

**答案**

- 第 1 空：指针 / pointer
- 第 2 空：master / main

**解析**

默认分支 master/main 会在每次提交时自动向前移动。而 tag 指向某个 commit 是一个点、不可移动；branch 对应一系列 commit 是线、可依据 HEAD 指针移动。【衍生知识点】git branch -M 可修改当前分支名称。

---

### 51. 【GitLab】从 GitLab ______ 版本开始，Linux 包安装不再支持 MySQL，只支持 ______ 数据库。

**答案**

- 第 1 空：12.1
- 第 2 空：PostgreSQL / postgresql / Postgres

**解析**

GitLab 使用 PostgreSQL 作为数据库、Redis 作为缓存、Sidekiq 执行后台异步队列任务。【衍生知识点】数据目录 /var/opt/gitlab 存放源代码，配置目录 /etc/gitlab，日志目录 /var/log/gitlab。

---

### 52. 【GitLab】GitLab 数据备份默认的过期时长为 ______ 秒，即 ______ 天，过期后会被自动删除。

**答案**

- 第 1 空：604800
- 第 2 空：7 / 七

**解析**

该时长由配置项 gitlab_rails['backup_keep_time'] 控制；备份路径由 gitlab_rails['backup_path'] 控制，默认 /var/opt/gitlab/backups；备份文件权限由 gitlab_rails['backup_archive_permissions'] 控制，默认为 0644。【衍生知识点】修改这些配置后需执行 gitlab-ctl reconfigure。

---

### 53. 【GitLab】若没有在 gitlab.rb 中初始化 root 密码，可以查看 ______ 文件获取初始密码（该文件在 24 小时后第一次 reconfigure 时自动删除）。

**答案**

- 第 1 空：/etc/gitlab/initial_root_password / initial_root_password

**解析**

也可以在 gitlab.rb 中通过 gitlab_rails['initial_root_password'] 指定，或设置环境变量 GITLAB_ROOT_PASSWORD；密码至少 8 位且需满足复杂度要求。【衍生知识点】新版 GitLab 取消了首次登录的重设密码界面，需直接输入用户名和密码登录。

---

### 54. 【部署模式】蓝绿部署同一时间只有 ______ 套正式环境在线；而 A/B 测试则是 ______ 套正式环境同时在线。

**答案**

- 第 1 空：一 / 1
- 第 2 空：两 / 2 / 二

**解析**

蓝绿部署的目的是安全稳定地发布新版本应用并在必要时回滚；A/B 测试用于测试应用功能表现（可用性、受欢迎程度、可见性等），一般用于多个产品竞争时使用。【衍生知识点】蓝绿部署业务无中断、风险小，但需要两套环境、成本较高，小公司较少使用。

---


## Git和GitLab面试

### 55. 【面试】简述软件交付（发版）过程？

**答案**

1) 需求与用户故事：产品负责人根据业务需求创建用户情景，作为开发团队工作的基础；
2) 冲刺计划：开发团队从待办事项中取用户故事并按敏捷方法组织到冲刺中（常见固定周期如两周）；
3) 源代码提交：开发人员把源代码提交到 Git 等版本控制系统，确保变更被跟踪并可管理不同版本；
4) 持续集成（CI）：由 Jenkins 等 CI 工具启动构建，经过单元测试、代码覆盖率检查、代码质量门禁（如 SonarQube）；
5) 工件管理：成功的构建存入项目存储库（如 Artifactory），便于检索历史构建；
6) 部署到开发环境：新代码部署到开发环境做初始测试和集成，尽早发现分支间问题与冲突；
7) 隔离测试：代码部署到独立的 QA1、QA2 环境，避免多个团队的功能互相干扰；
8) QA 测试：QA 团队执行功能测试、回归测试和性能测试；
9) 用户验收测试 UAT：干系人验证是否满足需求与期望；
10) 准备生产：UAT 成功后的版本成为候选版本，按发布计划部署到生产；
11) SRE：站点可靠性工程团队负责监控生产环境，确保稳定性与可靠性并及时响应问题。

**解析**

要点：需求 → 冲刺 → 提交 → CI → 工件 → 开发环境 → 隔离测试 → QA → UAT → 生产候选 → SRE 监控。【衍生知识点】这是大厂典型的 DevOps 流水线模型，核心是让代码变更在到达生产前经过全面测试。

---

### 56. 【面试】SVN 和 GIT 的区别？

**答案**

1）架构模型：SVN 是集中式版本控制系统，依赖中央服务器，客户端需联网到服务器才能提交、还原、对比；Git 是分布式版本控制系统，每个用户都是一个完整版本库，可先提交到本地，有网络时再同步到中央服务器。
2）离线能力：SVN 无法连接服务器时基本不可工作；Git 支持离线提交和回滚。
3）单点风险：SVN 存在单点问题，服务器不可用期间无法推送、合并或回滚；Git 本地即完整仓库，无此问题。
4）安全管控：SVN 集中式更便于实现软件仓库的安全访问限制和控制；Git 分布式方式不容易实现仓库的安全访问限制与控制。
5）服务器压力：SVN 服务器压力大、数据库容量容易暴增；Git 公共服务器压力和数据量都不大。
6）适用场景：SVN 适合开发人数不多、追求集中管理和明确权限的项目；Git 适合分布式开发、强调个体、需要频繁分支协作的项目。
7）不足：Git 不符合常规思维、学习难度大；代码保密性差（克隆整个库即可公开所有代码与版本信息）；无力支持大型二进制文件。

**解析**

要点：集中式 vs 分布式是根本差异，由此衍生出离线能力、单点风险、权限管控、适用场景等一系列区别。【衍生知识点】常见的版本控制系统演进：CVS(1986) → SVN(2000) → Git(2005)。

---

### 57. 【面试】如何找回 GitLab 密码？

**答案**

使用 gitlab-rails console -e production 进入 Rails 控制台（此步可能比较慢，需要等一段时间，会打印 Ruby/GitLab/PostgreSQL 版本等信息后进入 Loading production environment）。
然后按下列步骤操作：
#方法1：按用户名查找
irb(main):001:0> user = User.find_by_username 'root'
#方法2：按 id 查找
irb(main):001:0> user = User.where(id: 1).first
irb(main):002:0> user.password="wang@123"
irb(main):003:0> user.password_confirmation="wang@123"
irb(main):004:0> user.save
=> true
irb(main):005:0> quit
验证时注意：要使用 external_url 对应的 URL 登录才可以。

**解析**

要点：gitlab-rails console -e production → 定位 root 用户 → 设置 password 与 password_confirmation → save → quit，最后用 external_url 对应地址登录。【衍生知识点】密码至少 8 位且需满足复杂度要求；若为新装 GitLab 且未设置初始密码，也可查看 /etc/gitlab/initial_root_password。

---

### 58. 【面试】如何备份还原 GitLab？

**答案**

一、备份
1）备份配置文件（gitlab.rb 与 gitlab-secrets.json）：执行 gitlab-ctl backup-etc --backup-path <DIRECTORY>，不指定路径时默认备份至 /etc/gitlab/config_backup/，归档中包含 gitlab.rb、gitlab-secrets.json 与 trusted-certs。
2）备份数据：GitLab 12.2 之后用 gitlab-backup create；12.1 之前用 gitlab-rake gitlab:backup:create。默认备份到 /var/opt/gitlab/backups，文件名形如 时间戳_日期_版本_gitlab_backup.tar。
3）注意：备份会明确提示 gitlab.rb 和 gitlab-secrets.json 含敏感数据、不包含在数据备份中，必须手动备份，否则无法完整恢复。
二、恢复
1）前提条件：备份和恢复使用的版本必须一致；先还原相关配置文件并执行 gitlab-ctl reconfigure；确保 GitLab 处于运行状态。
2）恢复前先停止两个服务：gitlab-ctl stop puma 与 gitlab-ctl stop sidekiq（旧版为 unicorn 与 sidekiq）。
3）执行恢复：gitlab-backup restore BACKUP=备份文件名的时间部分_Gitlab版本（不需要指定文件全名）。
4）恢复后执行 gitlab-ctl reconfigure、gitlab-ctl restart；可选执行 gitlab-rake gitlab:check SANITIZE=true 与 gitlab-rake gitlab:doctor:secrets（13.1+，用于检查数据库值能否解密）。
5）最后把之前停止的服务启动起来，可能需要等一段时间才能访问。

**解析**

要点：备份 = 配置文件备份（backup-etc）+ 数据备份（backup create）；恢复 = 版本一致 + 停 puma/sidekiq + restore + reconfigure/restart + 校验。【衍生知识点】默认备份过期时长 604800 秒（7 天），由 backup_keep_time 控制。

---

### 59. 【面试】如何迁移和升级 GitLab？

**答案**

一、迁移（本质就是备份和恢复的过程）
1）在原 GitLab 主机上备份配置文件和数据；
2）在目标主机上安装相同版本的 GitLab 软件；
3）还原配置和数据。
二、升级
1）如果是新主机，需要先安装原版本，并还原配置和数据；
2）不能直接跳过中间的版本升级，应选择最近的大版本进行升级。例如 12.1 想升级到 13.0，需先升级到 12.X 的最高版本，再升级到 13.0；
3）下载新版本的安装包直接安装；
4）安装包时可能提示出错，原因是版本升级后有些配置项会过时，根据提示修改配置即可；
5）重新配置 gitlab-ctl reconfigure，再重启服务 gitlab-ctl restart。

**解析**

要点：迁移 = 备份配置和数据 → 目标机装相同版本 → 还原；升级 = 先补齐到目标前一个大版本的最新小版本 → 安装新包 → 按提示改配置 → reconfigure + restart。【衍生知识点】生产中的升级往往伴随服务器迁移，例如从本地机房迁到云环境。

---

### 60. 【面试】简述 CI、持续交付与持续部署的区别与联系？

**答案**

1）持续集成 CI：集成指将多位开发者的代码提交后合并集成在一起存放在代码库的过程。持续集成指多名开发者在开发不同功能代码的过程中频繁地把代码合并到一起且互相不影响工作，很多情况下每天要进行几次。CI 属于开发人员的自动化流程，强调提交新代码后立刻构建和（单元）测试，核心目的是尽早发现集成错误。
2）持续交付 CD：完成 CI 中构建及单元测试、集成测试的自动化流程后，持续交付可自动将已验证的代码发布到存储库，目标是拥有一个可随时部署到生产环境的代码库。它在 CI 基础上增加了测试 Test → 模拟 Staging → 生产 Production 的流程，侧重点在于『可交付的产物』而非代码本身，部署到生产环境仍需要人工操作，是当前普遍采用的方式。
3）持续部署 CD：作为持续交付的进一步延伸，持续部署可以自动将应用发布到生产环境，即在生产之前的管道阶段没有手动风控，因此高度依赖精心设计的测试自动化。
区别核心：持续交付与持续部署的唯一差别在于『最终部署到生产环境是否自动化』。因为自动发布存在较大风险，当前采用持续部署方式较少。

**解析**

要点：CI 管集成与构建测试；持续交付管到类生产环境、生产部署仍需人工；持续部署把生产部署也自动化。【衍生知识点】CI/CD 的主要目的是针对集成新代码时所引发的问题，降低部署风险，以小件方式而非一次性发布变更。

---

### 61. 【面试】常见的软件部署模式有哪些？各自有什么特点？

**答案**

1）蓝绿部署 Blue-green Deployments：利用两套相同的环境（蓝色预发布、绿色生产），新版本先在蓝色环境完成 QA 与验收测试，通过后将用户流量从绿色切到蓝色。特点：不停止老版本，业务无中断，升级风险相对较小；但需要额外一套环境、成本较高，一般小公司较少使用。具体过程为 V1 正常访问 → 另建环境部署 V2 → 测试通过切流量 → 观察异常可切回旧版本 → 下次再升级。
2）金丝雀（灰度）发布 Canary Deployment：原版本可用的同时额外部署新版本作为『金丝雀』，按增量比例（如 2%、25%、75%、100%）逐步放量，常按用户或路由权重控制（如 90% 老版本、10% 新版本）。特点：可自定义控制新版本流量比重、渐进式完成全量上线、最大限度控制发布风险、降低故障影响并支持快速回滚；实际生产中使用较为普遍。
3）滚动发布（更新）：逐步升级服务中的节点，每次只升级一个或多个实例，升级完成后加入生产环境，直到集群全部旧版本升级为新版本。红色为正在更新的中间状态、蓝色为更新完成已加入集群的实例、绿色为升级前的旧版本。需要事先配置自动更新策略（每次数量/百分比可配置），自动化要求高，回滚是发布的逆过程、一般耗时较长。
4）A/B 测试：同时对外提供两个 APP 运行环境，这与蓝绿部署同时只有一个版本在线不同。A/B 测试用于测试应用功能表现，例如可用性、受欢迎程度、可见性等，一般用于多个产品竞争时使用。

**解析**

要点：蓝绿（两套环境切换、无中断但成本高）、金丝雀/灰度（增量放量、生产常用）、滚动（逐节点升级、自动化要求高）、A/B 测试（两套正式环境同时在线、测功能表现）。【衍生知识点】各种分支发布策略的选择要结合数据表结构变更等不可逆升级来回滚策略一起考虑。

---

### 62. 【面试】蓝绿部署、金丝雀发布与 A/B 测试有什么区别？

**答案**

1）目标不同：蓝绿部署的目的是安全稳定地发布新版本应用并在必要时回滚；金丝雀发布是在保障整体系统稳定的情况下尽早发现、调整问题；A/B 测试则是用来测试应用功能的表现，例如可用性、受欢迎程度、可见性等。
2）在线环境不同：蓝绿部署同一时间只有一套正式环境在线（切换流量）；金丝雀发布是新老版本共存、按比例或权重放量；A/B 测试是两套正式环境同时在线，一般用于多个产品竞争时。
3）灰度与 A/B 的关系：灰度发布可以保证整体系统的稳定，在初始灰度时就能发现问题并调整，以控制影响度；它经常与 A/B 测试一起使用，用于测试选择多种方案。
4）实施成本与普及度：蓝绿部署需要两套环境、成本较高，小公司较少使用；金丝雀/灰度发布在实际生产中使用较为普遍；滚动发布则自动化要求高。

**解析**

要点：记住『蓝绿同一时间一套在线、A/B 两套同时在线、金丝雀按比例共存』这条主线，再补充目标与成本差异。【衍生知识点】金丝雀一词源自 17 世纪英国矿井工人用金丝雀对瓦斯敏感度来预警危险。

---

### 63. 【面试】请说明 Git 的四个区域以及文件在各区域间的流转过程。

**答案**

Git 从物理上分为当前项目目录（工作区 Workspace）和其下的隐藏子目录 .git（版本库）；版本库在逻辑上又分为暂存区和本地仓库。因此共有四个区域：
1）工作区 Workspace：当前正在编辑和修改文件的项目目录。文件变更不受 Git 跟踪，无法实现版本回滚，必须先 git add 才纳入版本管理。
2）暂存区 Staging Area / Index / Cached：也称索引区、缓存区，对应 <项目目录>/.git/index 文件，用 git add 把工作区变更加入，用途类似于邮件中的草稿箱，临时保存文件的少量变更。
3）本地仓库 Local Repository：对应 <项目目录>/.git/，用 git commit 把暂存区变更一次性批量提交，每次 commit 生成唯一 ID，代表一个阶段性的新版本。
4）远程仓库 Remote Repository：多个开发人员共同协作提交代码的仓库，如私有 GitLab 服务器或公有云 GitHub、Gitee，可实现异地备份和远程协作。
流转关系：工作区 --git add--> 暂存区 --git commit--> 本地仓库 --git push--> 远程仓库；反向则通过 git checkout/restore 把版本恢复到工作区、git pull 把远程变更拉取合并到本地。

**解析**

要点：工作区 → 暂存区 → 本地仓库 → 远程仓库，对应的命令是 add → commit → push；反向是 checkout/restore 与 pull。【衍生知识点】checkout 执行与 commit 相反的操作，把某个版本恢复到工作区；若工作区存在未提交的新文件，其更改会被仓库旧内容覆盖。

---

### 64. 【面试】git reset 的 --soft、--mixed、--hard 三种模式有什么区别？

**答案**

git reset 是对本地仓库项目进行回滚操作的命令，主要有三个参数：
1）--soft：工作目录和暂存区都不会被改变，只是本地仓库中的文件回滚到指定版本，仅移动 HEAD 和 master 指针的指向，不会重置暂存区或工作区。适合想把提交『拆开重做』的场景。
2）--mixed：默认选项。回滚暂存区和本地仓库，但工作目录不受影响。即撤销了提交和暂存，但工作区文件内容保留。
3）--hard：本地仓库、暂存区和工作目录都回滚到指定提交，该选项非常危险，会丢失未提交的改动。
常用写法：git reset --hard|soft|mixed HEAD^^ 表示回滚到上上一个版本（^ 可换成 ~）；HEAD~n 表示回滚前 n 个版本；也可直接指定 commit id 或 tag，如 git reset --hard v1.0。回退后可先用 git reflog 获取每次提交的 ID 以便回到回退前的版本。

**解析**

要点：--soft 只动引用；--mixed（默认）动引用 + 暂存区；--hard 三者都动、最危险。【衍生知识点】git log 看不到被回退掉的历史，用 git reflog 才能看到分支或引用的完整历史记录。

---

### 65. 【面试】git revert 与 git reset 有什么区别？什么场景该用 revert？

**答案**

1）本质不同：git reset 是把 HEAD 向后移动，直接删除指定的 commit；git revert 是 HEAD 继续前进，用一个新提交来抵消要被 revert 的内容，此次操作之前和之后的 commit 与 history 都会保留。
2）作用范围不同：git reset 只是在本地仓库中回退版本，远程仓库的版本不会变化。因此如果本地 reset 之后再次 git pull，远程仓库的内容又会和本地之前版本的内容进行 merge，造成回退失败。
3）典型场景：当我们修改了某些内容，已经 commit 到本地仓库并 push 到远程仓库了，此时想把本地和远程仓库都回退到某个版本，应该使用 git revert，之后再把 revert 产生的提交 push 到远程，从而保证线上线下代码一致。
4）常用写法：git revert HEAD 撤销前一次 commit（会交互式打开编辑器提示输入提交信息）；git revert HEAD --no-edit 非交互式撤销前一次提交；git revert HEAD^ 撤销前前一次；git revert <commitid> 撤销指定版本，撤销本身也会作为一次提交保存。

**解析**

要点：已 push 到远程的提交要用 revert（新增反向提交、保留历史），未 push 的本地回退可用 reset（移动 HEAD、删除提交）。【衍生知识点】可以用 git log --pretty=oneline --graph --all 观察 revert 后提交链的分叉与合并形态。

---

### 66. 【面试】Git 分支合并有哪两种情形？产生冲突如何处理？

**答案**

分支合并即将多个分支合并成一个分支，使用 git merge 命令将指定的其它分支合并至当前分支，注意要先切换至需要合并的目标分支，再将其它分支合并过来。合并存在两种情形：
1）快进式合并（Fast-Forward Merge）：当两个分支呈线性关系时，只需把目标分支的指针向前移动即可，不会产生新的合并提交。例如先把 hotfix 分支分别合并回 master 与 develop。
2）三路合并（3-Way Merge）：两个分支各自沿着自己的演进路线分别创建了新的提交，合并时需要共同的祖先提交以及各分支的最新一次提交共同参与（如 commit3、commit4、commit5 三方）。
冲突处理：合并时若某文件存在无法合并的修改，则意味着存在冲突的可能。此时 Git 会提示 Auto-merging / CONFLICT (content): Merge conflict in <file> / Automatic merge failed，文件中会出现 <<<<<<< HEAD、=======、>>>>>>> master 标记。需要手动编辑文件解决冲突，然后 git add 并 git commit -am 完成合并；若想放弃合并可执行 git merge --abort。

**解析**

要点：快进式（线性、移动指针）vs 三路合并（有分叉、三方参与、可能冲突）；冲突需手动解决后重新 add + commit，放弃则 git merge --abort。【衍生知识点】git checkout -b <分支名> 可创建并切换分支，git branch -d 删除分支。

---

### 67. 【面试】常见的 Git 分支模型有哪些？请说明它们的演进过程。

**答案**

分支管理是现代版本控制系统在记录版本和变更记录之外的另一个重要功能，可隔离不同开发人员的改动、隔离提交/审核/集成/测试工作。常见模型按复杂度递进：
1）master：开发、测试和发布都在 master 分支上完成。简单，但开发、测试和发布彼此影响，仅适用于单 feature 且无构建过程的场景。
2）master/develop：在开发分支开发，完成后合并至 master 分支并删除 develop 分支。master 是长期分支记录发布历史，develop 是短期分支。develop 的开发不会影响 master 的构建，但不利于同时开发多个 feature，适用于单 feature、可从 master 执行构建的场景。
3）master/develop/feature：master 和 develop 都是长期分支，开发人员工作在各自的 feature 分支上，经过开发和模块测试后合并到 develop；develop 经过系统测试、release 之后合并到 master（release 是短期分支）。适合更大规模的多 feature 合作。
4）master/develop/feature/release：在前一模型基础上使用单独的 release 分支进行构建和 bug 修复，避免因发布操作阻塞 develop 上的变更；但 release 存在时间越长，develop 合并冲突的可能性越大。
5）master/develop/feature/release/hotfix：从 master 单独拉一个短期的 hotfix 分支进行线上问题修复，解决了前一模型中 hotfix 与 develop 冲突的问题，适用于多 feature 开发的场景。

**解析**

要点：master → master/develop → +feature → +release → +hotfix，复杂度递增、适用规模递增。【衍生知识点】有观点认为『分支策略就是软件协作模式和发布模式的风向标』，选择符合 DevOps 的分支策略对落地大有帮助。

---

### 68. 【面试】GitLab 由哪些核心组件构成？

**答案**

GitLab 是一个由很多应用组成的复杂系统，主要服务构成如下：
1）Nginx：静态 Web 服务器；
2）GitLab shell：用于处理基于 ssh 会话的 Git 命令和修改 authorized keys 列表；
3）gitlab-workhorse：轻量级的反向代理服务器，旨在充当智能反向代理以帮助整个 GitLab 加速；
4）unicorn：Rack 应用的 HTTP 服务器，GitLab Rails 应用托管在这个服务器上（新版由 Puma 承担）；
5）Puma（GitLab Rails）：处理发往 Web 接口和 API 的请求；
6）Gitaly：Git RPC 服务，处理 GitLab 发起的全部 Git 调用；
7）postgresql：数据库；redis：缓存数据库；
8）sidekiq：用于在后台执行队列任务（异步执行）；
9）GitLab Exporter：GitLab 指标暴露器；Node Exporter：节点指标暴露器；
10）自监控组件：Prometheus、Alertmanager、Grafana、Sentry 和 Jaeger；
11）Inbound emails（SMTP）接收用于更新 issue 的邮件，Outbound email（SMTP）向用户发送邮件通知；
12）LDAP Authentication：LDAP 认证集成；
13）MinIO：对象存储服务；Registry：容器注册表，支持 Image 的 push 和 pull；Runner：执行 GitLab 的 CI/CD 作业。
由于组件众多、分别管理配置过于复杂，官方提供了 Omnibus GitLab（基于 Chef 编排），统一管理命令为 gitlab-ctl。

**解析**

要点：按『前端接入（Nginx/workhorse/Puma）→ Git 服务（GitLab shell/Gitaly）→ 存储（PostgreSQL/Redis/MinIO/Registry）→ 异步与监控（sidekiq/Exporter/Prometheus 等）』分层记忆。【衍生知识点】各组件专用命令：gitlab-backup、gitlab-psql、gitlab-rails、gitlab-rake。

---

### 69. 【面试】GitLab 中的角色权限有哪几种？保护分支是什么机制？

**答案**

GitLab 用户在组里有 5 种不同权限，由低到高为：
1）Guest：可以创建 issue、发表评论，不能读写版本库；
2）Reporter：可以克隆代码，不能提交，QA、PM 可以赋予这个权限；
3）Developer：可以克隆代码、开发、提交、push 非保护（Protected branches）分支，普通开发可赋予此权限；
4）Maintainer：可以创建项目、添加 tag、保护分支、添加项目成员、编辑项目，核心开发人员可赋予此权限；
5）Owner：可以设置项目访问权限 Visibility Level、删除项目、迁移项目、管理组成员，开发组组长可赋予此权限。
保护分支机制：默认 master 分支被保护，开发者角色无法对被保护的分支提交代码，也可以将其它分支进行保护，防止指定分支被破坏。因此普通开发者无法直接提交代码至 master，常见的协作流程是：先创建其它分支（如 dev）并提交代码，再申请将 dev 合并至 master，由管理者审核通过后批准合并，最终实现 master 代码的更新。
管理建议：注意设为 Maintainer 角色才能 push 代码，Developer 角色对保护分支（如 master）只能 pull 不能 push；建议把用户加入组中而不是逐个加到项目里，后者后续管理不太方便。

**解析**

要点：Guest → Reporter → Developer → Maintainer → Owner 五级；保护分支让 master 默认只允许更高角色合并代码，从而形成『分支开发 + 提交合并请求 + 审核合并』的协作流。【衍生知识点】组（group）下可拥有多个 project，规模大的组织每个 group 可对应一个分公司或部门。

---

### 70. 【面试】GitLab 如何实现 HTTPS？使用自签名证书会遇到什么问题？

**答案**

GitLab 如果用于不安全的网络，建议使用 https。实现步骤：
1）创建证书目录并生成证书：mkdir -p /etc/gitlab/ssl && cd /etc/gitlab/ssl，用 openssl genrsa 生成私钥，再用 openssl req -days 3650 -x509 -sha256 -nodes -newkey rsa:2048 -subj "/C=CN/ST=beijing/L=beijing/O=wang/CN=gitlab.wang.org" -keyout ... -out ... 生成证书。注意 CN 必须是你的网站域名。
2）修改 /etc/gitlab/gitlab.rb，必选项共 4 项：external_url 改为 https://域名；nginx['redirect_http_to_https'] = true（默认 false，实现 80 自动 301 跳转至 443）；nginx['ssl_certificate'] 指定证书路径；nginx['ssl_certificate_key'] 指定私钥路径。可选项包括 nginx['enable']、client_max_body_size、redirect_http_to_https_port、ssl_ciphers、ssl_protocols、ssl_session_cache 等。
3）执行 gitlab-ctl reconfigure，可选 gitlab-ctl restart，再查看 gitlab-ctl status。
自签名证书问题：官方建议使用权威 CA 颁发的证书，自签名证书需要加入信任，否则会导致后续 git clone 等操作失败，报错形如 『server certificate verification failed. CAfile: none CRLfile: none』。解决方法是把服务器的证书拷贝到使用 git 客户端的主机并入信任库：Ubuntu 路径 /etc/ssl/certs/ca-certificates.crt，红帽系统路径 /etc/pki/tls/certs/ca-bundle.crt。

**解析**

要点：4 项必选配置 + reconfigure；自签名证书必须在客户端加入信任，否则 clone 报证书校验失败。【衍生知识点】还原为 http 时，只需把 external_url 改回 http 并去掉证书相关配置即可（redirect_http_to_https 无需修改）。

---

### 71. 【面试】GitLab 如何设置初始密码？升级时为什么要分版本逐步进行？

**答案**

一、初始密码设置
1）新装时可在 /etc/gitlab/gitlab.rb 中配置 gitlab_rails['initial_root_password'] = "xxx"，或设置环境变量 GITLAB_ROOT_PASSWORD（需在数据库首次初始化之前提供）；
2）密码至少 8 位且需满足复杂度要求才是有效密码；
3）若未做初始化配置，可从 /etc/gitlab/initial_root_password 文件找到初始密码，该文件会在 24 小时后第一次 reconfigure 时自动删除；
4）新版 GitLab 首次登录界面已取消重设密码环节，需直接输入用户名（root）与密码登录。
二、升级不能跳版本的原因
GitLab 各版本之间存在数据库结构变更、配置项更名或废弃等不兼容变化，直接跨大版本升级会导致数据库迁移失败或服务无法启动，因此必须选择最近的大版本逐级升级：例如从 12.1 升级到 13.0，要先升级到 12.X 的最高版本，再升级到 13.0。安装新版本包时若提示出错，通常是版本升级后有些配置项会过时，根据提示修改配置即可，然后执行 gitlab-ctl reconfigure 与 gitlab-ctl restart。

**解析**

要点：初始密码三种来源（gitlab.rb / 环境变量 / initial_root_password 文件）+ 8 位复杂度；升级必须逐级（不跳中间版本）、按提示修正过时配置。【衍生知识点】生产升级常伴随服务器迁移（如本地机房到云），迁移本质就是备份与恢复。

---

### 72. 【面试】Git 有哪几种方式实现免密码访问远程仓库？

**答案**

有两种主流方式：
1）通过 HTTP/HTTPS 实现：把远程仓库地址改造成带凭据的形式，即 https://用户名:密码@gitee.com/组/项目.git，然后用它重新关联远程仓库并推送：
git remote add origin https://用户名:密码@gitee.com/lbtooth/meta-project.git
git push origin master
2）通过 SSH 实现（推荐）：先在本地生成密钥对，默认放在 ~/.ssh 目录下（id_rsa 为私钥、id_rsa.pub 为公钥）：
ssh-keygen
cat id_rsa.pub
然后把公钥内容配置到 Gitee、GitHub 或 GitLab 的 SSH Keys 中，最后在本地用 SSH 地址关联远程仓库：
git remote add origin git@gitee.com:lbtooth/meta-project.git
git push origin master
另外 GitLab 侧要启用 ssh 服务并注意端口，默认可在 gitlab.rb 中通过 gitlab_sshd['listen_address'] = '0.0.0.0:2222' 调整为 2222，对应的克隆地址形如 ssh://git@gitlab.wang.org:2222/example/app.git。

**解析**

要点：HTTP 方式在 URL 里带用户名密码（明文、安全性差）；SSH 方式用 ssh-keygen 生成密钥对、把公钥贴到平台，再用 git@host:组/项目.git 关联。Windows 下 git clone 时记录的凭据保存在『Windows 凭据』的普通凭据中，改密码后需要删除该凭据。【衍生知识点】GitLab 支持 http/https 与 ssh 两种协议上传下载代码，非标准端口可用 ssh://[user@host:port]/group/project.git 或 ~/.ssh/config 配置。

---

### 73. 【面试】版本控制系统分为哪几类？本地、集中式与分布式版本控制各有什么特点？

**答案**

1）本地（单机）版本控制系统：第一代版本控制系统，通过加锁把并发执行转换成顺序执行，一次只能有一个人处理文件。流程是先把文件放在一个服务器上便于上传下载；任何人想修改时先加锁（checkout 指令），使其他人无法修改；修改完成后释放锁（checkin 指令），形成一个新的版本存放到服务器端。代表产品有 RCS、SCCS（1972 年发布）和 DSEE（被认为是 Atria ClearCase 的前身）。
2）集中式版本控制系统：任何提交和回滚都依赖连接集中的代码服务器才能实现，无法连接服务器时（比如下班回家）就无法提交代码；集中式服务器还存在单点问题，在集中式实例不可用期间，开发人员无法推送、合并或回滚代码。优点是此方式可以更好地实现软件仓库的安全访问限制和控制。代表产品有 CVS、SVN。
3）分布式版本控制系统：每个用户都有一个完整的服务器用于保存软件的完整版本，然后再部署一个中央服务器。用户可以先把代码提交到本地，没有网络也能提交，在有网络时再提交到中央服务器，大大方便了开发者；即使没有中央服务器也可以提交代码或回滚。不足是不容易实现软件仓库的安全访问限制和控制。代表产品是 Git。
补充：并发控制上有悲观锁与乐观锁两种思路——悲观锁每次获取数据都加锁，确保自己使用过程中数据不被别人修改，期间其它线程读写都要等待；乐观锁获取数据时不加锁，但在更新数据时判断该数据是否被别人修改过，未修改才更新，一般用版本号机制或 CAS 算法实现。

**解析**

要点：按『是否依赖中央服务器 + 是否人人有完整仓库 + 权限管控能力』三条主线对比三代 VCS。【衍生知识点】集中式与分布式在『仓库安全访问控制』能力上正好相反：集中式强、分布式弱。

---

### 74. 【面试】Git 的 tag 与 branch 有什么本质区别？tag 在实际发布中如何使用？

**答案**

本质区别：
1）tag（标签）：是 Git 版本库的一个标记，指向某个 commit 的指针，对应某次 commit，是一个『点』，是不可移动的。为某个 commit 添加标签从而对其完成特殊标记，例如标记特定的版本信息。
2）branch（分支）：对应一系列 commit，是很多提交点连成的一根『线』，有一个 HEAD 指针，可以依靠 HEAD 指针移动。Git 的默认分支名是 master/main，会在每次提交时自动向前移动。
因此两者的区别决定了使用方式：改动代码用 branch，不改动只查看用 tag。tag 和 branch 相互配合使用有时能起到非常方便的效果，例如已经发布了 v1.0、v2.0、v3.0 三个版本，这时想在不改动现有代码的前提下，在 v2.0 的基础上加个新功能作为 v4.0 发布，就可以检出 v2.0 的代码作为一个 branch，然后作为开发分支使用。
实际发布中的用法：tag 主要用于发布版本的管理，一个版本发布之后可以为 Git 打上 v1.0.1、v1.0.2 这样的标签；通常用户应该每天下班前提交代码并完成推送以备份代码，只有待需要发一个版本时，才基于 tag 对相应 commit 进行标记。常用操作包括 git tag -a "v2.0" -m "新版本2.0"（创建附注标签）、git tag -a "v1.0" <Commit ID> -m "正式版本1.0"（为指定 commit 打标签）、git tag -l（查看标签）、git push origin --tags（同步所有标签到远程）、git reset --hard v1.0（回滚到指定标签）。
标签分两种：轻量标签（lightweight，仅为某个 commit 的引用）与附注标签（annotated，存储在 Git 数据库中的完整对象，含打标签者的名字、电子邮件地址、日期时间以及 message）。

**解析**

要点：tag 是点、不可移动、用于版本里程碑；branch 是线、可随 HEAD 移动、用于代码改动；发布时用 tag 标记版本，必要时把 tag 检出为 branch 做维护分支。【衍生知识点】常用版本标记格式为 version-number.release-no.modification-no（如 v1.3.2）。

---
