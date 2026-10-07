# 马哥Git和GitLab课件 —— 试题册

> 共 74 题。答案与解析见《答案册-马哥Git和GitLab课件.md》。


## Git和GitLab笔试

### 1. 【DevOps】DevOps 一词是由哪两个单词组合缩写而成？

- **A.** Develop 与 Operator
- **B.** Developer 与 Operation
- **C.** Development 与 Operations
- **D.** Develop 与 Operating

### 2. 【DevOps】关于 DevOps 与 CI/CD 的关系，下列说法正确的是？

- **A.** CI/CD 是方法论，DevOps 是其具体实践
- **B.** DevOps 是方法论，CI/CD 是其具体技术实践
- **C.** 两者完全等价，只是称呼不同
- **D.** CI/CD 覆盖 SDLC 全过程，DevOps 只覆盖部署阶段

### 3. 【DevOps】DevOps 的关键指标不包括以下哪一项？

- **A.** 平均恢复时间 MTTR
- **B.** 部署频率 Deployment frequency
- **C.** 生产失败率 Production failure rate
- **D.** 每日代码提交行数

### 4. 【CICD】持续集成（CI）的核心目的是？

- **A.** 尽早发现集成错误，确保新代码与原代码正确集成
- **B.** 自动把代码部署到生产环境
- **C.** 自动生成代码质量报告并阻断发布
- **D.** 自动完成数据备份与容灾切换

### 5. 【CICD】持续交付（Continuous Delivery）与持续部署（Continuous Deployment）最本质的区别是？

- **A.** 持续交付包含测试自动化，持续部署不包含
- **B.** 持续部署只适用于容器环境，持续交付适用于虚拟机
- **C.** 持续交付部署到生产环境需人工操作，持续部署则全自动
- **D.** 持续交付针对代码，持续部署针对可交付产物

### 6. 【CICD】关于持续集成、持续交付、持续部署三者的关系，描述正确的是？

- **A.** 三者互相独立，可以任意选择其中一种实施
- **B.** 持续交付在持续集成基础上增加了测试、模拟、生产环境的流程
- **C.** 持续部署比持续交付出现更早
- **D.** 持续集成已包含生产环境部署能力

### 7. 【CICD】应用部署发展阶段中，利用 Ansible、Shell/Python 脚本实现部署属于第几个阶段？

- **A.** 第一阶段：开发手动部署
- **B.** 第二阶段：运维手动部署
- **C.** 第三阶段：脚本 / 自动化工具半自动化部署
- **D.** 第四阶段：Web 界面一键部署

### 8. 【部署模式】关于蓝绿部署的特点，下列说法正确的是？

- **A.** 同一时间只有一套正式环境在线，业务无中断但成本较高
- **B.** 两套正式环境同时在线，用于多产品竞争场景
- **C.** 按 2%→25%→75%→100% 的比例逐步放量
- **D.** 逐台摘除节点升级完成后再加入集群

### 9. 【部署模式】金丝雀（灰度）发布的典型增量发布比例是？

- **A.** 10%→50%→100%
- **B.** 2%→25%→75%→100%
- **C.** 50%→100% 两阶段
- **D.** 100% 一次性全量发布

### 10. 【部署模式】以下哪种部署模式是两套正式环境同时在线，用于测试应用功能表现的？

- **A.** 蓝绿部署 Blue-green Deployments
- **B.** 滚动发布 Rolling Update
- **C.** 金丝雀发布 Canary Deployment
- **D.** A/B 测试 A/B Testing

### 11. 【部署模式】滚动发布过程中，『绿色』节点代表的含义是？

- **A.** 正在运行的实例，即升级前的旧版本
- **B.** 正在升级过程中的中间状态实例
- **C.** 已升级完成并加入集群的新版本实例
- **D.** 已被负载均衡摘除的故障实例

### 12. 【VCS】关于集中式版本控制系统（如 SVN）的缺点，下列描述不正确的是？

- **A.** 存在单点问题，服务器不可用期间无法推送、合并或回滚代码
- **B.** 必须连接中央服务器才能提交，无法离线提交
- **C.** 无法实现软件仓库的安全访问限制和权限控制
- **D.** 服务器压力大、数据库容量容易暴增

### 13. 【VCS】关于分布式版本控制系统的描述，正确的是？

- **A.** 必须先连接中央服务器才能提交代码
- **B.** 每个用户都是完整版本库，可以离线提交，但不易做仓库安全访问控制
- **C.** 所有历史版本只保存在中央服务器上
- **D.** 分布式版本控制不支持分支与标签功能

### 14. 【Git】Linus 决定自己开发 Git 的直接原因是？

- **A.** BitKeeper 被微软收购后不再免费
- **B.** CVS 出现严重的数据损坏缺陷
- **C.** BitKeeper 收回免费使用权，Linus 只能自研替代
- **D.** Linux 内核代码量太大导致 diff/patch 无法使用

### 15. 【Git】Git 的数据存储从物理上分为哪两部分？

- **A.** 工作区和版本库
- **B.** 暂存区和远程仓库
- **C.** 本地仓库和远程仓库
- **D.** 索引区和缓存区

### 16. 【Git】Git 暂存区（Staging Area / Index）对应的物理文件是？

- **A.** .git/objects
- **B.** .git/index
- **C.** .git/refs/heads
- **D.** .git/HEAD

### 17. 【Git】关于 tag 与 branch 的区别，下列说法正确的是？

- **A.** tag 可以随提交自动前移，branch 不可移动
- **B.** tag 指向某个 commit 且不可移动，branch 是可移动的指针
- **C.** tag 只能创建轻量标签，branch 只能创建附注标签
- **D.** 两者完全等价，只是命名习惯不同

### 18. 【Git】Git 中附注标签（annotated tag）相比轻量标签（lightweight tag）的最大差异是？

- **A.** 附注标签体积更小、创建更快
- **B.** 附注标签只能用在 master 分支上
- **C.** 附注标签是完整对象，含打标签者、邮箱、日期和说明信息
- **D.** 附注标签不能推送到远程仓库

### 19. 【Git】Git config 配置的三级作用域中，默认（可省略选项）的是？

- **A.** --system
- **B.** --global
- **C.** --local
- **D.** --project

### 20. 【Git】git reset 不加任何模式选项时，默认使用的是哪种模式？

- **A.** --soft
- **B.** --mixed
- **C.** --hard
- **D.** --keep

### 21. 【Git】关于 git revert 与 git reset 的区别，下列说法正确的是？

- **A.** revert 用新提交抵消历史修改且保留历史，reset 直接移动 HEAD 删除提交
- **B.** revert 会删除目标 commit，reset 会新增一个反向 commit
- **C.** 两者都只能作用于本地仓库，无法影响远程
- **D.** reset 可以撤销远程仓库的提交，revert 只能撤销本地提交

### 22. 【Git】git pull 命令等价于下面哪两个命令的组合？

- **A.** git clone 与 git checkout
- **B.** git fetch 与 git merge
- **C.** git add 与 git commit
- **D.** git remote 与 git push

### 23. 【Git】要把本地 main 分支推送到远程的 dev 分支，正确的命令是？

- **A.** git push origin dev:main
- **B.** git push -u origin main
- **C.** git push origin main:dev
- **D.** git push origin --all:dev

### 24. 【Git】Git 默认在推送时不会推送标签，要推送本地仓库所有标签应使用？

- **A.** git push origin --all
- **B.** git push -u origin tag
- **C.** git tag --push
- **D.** git push origin --tags

### 25. 【Git】执行 git clone 克隆远程仓库后，默认情况下？

- **A.** 只显示 master 分支，需 checkout 才能看到其它分支
- **B.** 自动切换到最近一次提交所在的分支
- **C.** 会自动创建并显示所有远程分支
- **D.** 只克隆 master 分支的数据，其它分支不会被下载

### 26. 【Git】Git 2.23 版本专门引入的、只专注于分支切换的新命令是？

- **A.** git move
- **B.** git switch
- **C.** git change
- **D.** git branch -s

### 27. 【Git】关于 .gitignore 文件，下列说法正确的是？

- **A.** 必须以 / 开头才会生效
- **B.** 过滤规则只在提交后才会生效
- **C.** 可用 ! 表示例外不忽略某文件，且未提交时也能立即生效
- **D.** 忽略规则只对新增文件有效，对已跟踪文件同样立即停止跟踪

### 28. 【Git】三路合并（3-Way Merge）需要哪些提交参与合并？

- **A.** 只需要两个分支各自的最后一次提交
- **B.** 需要共同祖先提交和各分支的最新一次提交
- **C.** 只需要共同祖先提交
- **D.** 需要所有历史提交全部参与

### 29. 【GitLab】GitLab 软件使用什么语言开发，采用什么许可证分发？

- **A.** Ruby 语言，MIT 许可证
- **B.** Go 语言，Apache 2.0 许可证
- **C.** Python 语言，GPL v2 许可证
- **D.** Java 语言，BSD 许可证

### 30. 【GitLab】GitLab 自哪个版本开始，Linux 包安装不再支持 MySQL，只支持 PostgreSQL？

- **A.** GitLab 11.0
- **B.** GitLab 12.1
- **C.** GitLab 13.0
- **D.** GitLab 14.1

### 31. 【GitLab】关于 GitLab 的硬件要求，下列描述正确的是？

- **A.** 测试环境 1G 内存即可，生产环境 2G 足够
- **B.** 内存越低 GitLab 启动越快，与可用性无关
- **C.** 测试环境建议 4G 以上，新版 17.3.1 建议 8G 以上
- **D.** 只要求磁盘空间，对内存无要求

### 32. 【GitLab】Omnibus GitLab 是基于什么应用编排工具实现对多组件统一管理的？

- **A.** Ansible
- **B.** Chef
- **C.** Puppet
- **D.** SaltStack

### 33. 【GitLab】修改 /etc/gitlab/gitlab.rb 配置后，必须执行哪条命令使配置生效？

- **A.** gitlab-ctl reconfigure
- **B.** gitlab-ctl restart
- **C.** gitlab-rake reconfigure
- **D.** systemctl daemon-reload

### 34. 【GitLab】GitLab 12.2 之后版本执行数据备份的正确命令是？

- **A.** gitlab-ctl backup create
- **B.** gitlab-backup create
- **C.** gitlab-rails backup create
- **D.** gitlab-psql backup

### 35. 【GitLab】关于 GitLab 数据备份的内容，下列描述正确的是？

- **A.** gitlab.rb 与 gitlab-secrets.json 会被自动打包进备份
- **B.** 备份只包含数据库，不包含仓库数据
- **C.** gitlab.rb 与 gitlab-secrets.json 不包含在数据备份中，需手动备份
- **D.** 备份必须手动指定文件名否则无法生成

### 36. 【GitLab】执行 GitLab 数据恢复前，必须先停止的两个服务是？

- **A.** puma 和 sidekiq
- **B.** nginx 和 postgresql
- **C.** redis 和 gitaly
- **D.** gitlab-workhorse 和 gitlab-exporter

### 37. 【GitLab】GitLab 中将用户添加到组时，若要 push 代码（非保护分支）至少需要哪种角色？

- **A.** Guest
- **B.** Reporter
- **C.** Developer
- **D.** Owner

### 38. 【GitLab】关于 GitLab 的升级操作，下列说法正确的是？

- **A.** 可以直接从任意旧版本升级到最新版本
- **B.** 不能跳过中间版本，需按顺序先升级到最近的大版本
- **C.** 升级必须先卸载旧版本并清空所有数据
- **D.** 升级时无需重新执行 reconfigure

### 39. 【GitLab】实现 GitLab HTTPS 时，配置文件中『必选』的项共有几项？

- **A.** 2 项
- **B.** 4 项
- **C.** 6 项
- **D.** 8 项

### 40. 【GitLab】重置 GitLab 忘记的 root 密码，正确的入口命令是？

- **A.** gitlab-psql -e production
- **B.** gitlab-rake console
- **C.** gitlab-rails console -e production
- **D.** gitlab-ctl reset-password

### 41. 【GitLab】GitLab 服务构成中，负责提供 Git RPC 服务、处理 GitLab 发起的全部 Git 调用的是？

- **A.** gitlab-workhorse
- **B.** Gitaly
- **C.** GitLab shell
- **D.** sidekiq

### 42. 【GitLab】GitLab 中用于提交代码、下载代码的两种协议格式分别是？

- **A.** http[s]://host[:Port]/group/project.git 与 git@host:group/project.git
- **B.** ftp://host/group/project.git 与 rsync://host/group/project.git
- **C.** http://host/group/project 与 svn://host/group/project
- **D.** 仅支持 ssh 一种协议

### 43. 【Git】Git 的缺点不包括以下哪一项？

- **A.** 学习难度大，学习周期相对较长
- **B.** 代码保密性差，克隆整个库即可公开所有代码和版本信息
- **C.** 无力支持大型二进制文件
- **D.** 必须联网才能提交代码

### 44. 【VCS】第二代版本控制系统 CVS 与 SVN 的演进关系，下列描述正确的是？

- **A.** SVN 于 1986 年发布，后被 CVS 取代
- **B.** CVS 于 1986 年发布并在 2000 年被 SVN 取代
- **C.** 两者是同一软件的不同版本号
- **D.** CVS 是分布式版本控制系统

### 45. 【DevOps】DevOps 一词即开发 ______ 和运维 ______ 的缩写，是一组过程、方法与系统的统称。

> 共 2 个空。

### 46. 【DevOps】敏捷开发的核心是 ______ 开发与 ______ 开发，它要求每次迭代都是一个完整的软件开发周期。

> 共 2 个空。

### 47. 【Git】Git 配置有 --system、--global、--local 三级作用域，其优先级由高到低为 ______ > ______ > ______。

> 共 3 个空。

### 48. 【Git】在 Git 的提交链中，除初始 commit 外每个 commit 都会有一个 ______ commit，除最新一次 commit 外每个 commit 都会有一个 ______ commit。

> 共 2 个空。

### 49. 【Git】Git 支持两种标签：______ 标签（仅为某个 commit 的引用）和 ______ 标签（存储在数据库中的完整对象，含打标签者、邮箱、日期和 message）。

> 共 2 个空。

### 50. 【Git】Git 的分支本质上仅仅是指向提交对象的可变 ______，其默认分支名是 ______。

> 共 2 个空。

### 51. 【GitLab】从 GitLab ______ 版本开始，Linux 包安装不再支持 MySQL，只支持 ______ 数据库。

> 共 2 个空。

### 52. 【GitLab】GitLab 数据备份默认的过期时长为 ______ 秒，即 ______ 天，过期后会被自动删除。

> 共 2 个空。

### 53. 【GitLab】若没有在 gitlab.rb 中初始化 root 密码，可以查看 ______ 文件获取初始密码（该文件在 24 小时后第一次 reconfigure 时自动删除）。

> 共 1 个空。

### 54. 【部署模式】蓝绿部署同一时间只有 ______ 套正式环境在线；而 A/B 测试则是 ______ 套正式环境同时在线。

> 共 2 个空。


## Git和GitLab面试

### 55. 【面试】简述软件交付（发版）过程？

### 56. 【面试】SVN 和 GIT 的区别？

### 57. 【面试】如何找回 GitLab 密码？

### 58. 【面试】如何备份还原 GitLab？

### 59. 【面试】如何迁移和升级 GitLab？

### 60. 【面试】简述 CI、持续交付与持续部署的区别与联系？

### 61. 【面试】常见的软件部署模式有哪些？各自有什么特点？

### 62. 【面试】蓝绿部署、金丝雀发布与 A/B 测试有什么区别？

### 63. 【面试】请说明 Git 的四个区域以及文件在各区域间的流转过程。

### 64. 【面试】git reset 的 --soft、--mixed、--hard 三种模式有什么区别？

### 65. 【面试】git revert 与 git reset 有什么区别？什么场景该用 revert？

### 66. 【面试】Git 分支合并有哪两种情形？产生冲突如何处理？

### 67. 【面试】常见的 Git 分支模型有哪些？请说明它们的演进过程。

### 68. 【面试】GitLab 由哪些核心组件构成？

### 69. 【面试】GitLab 中的角色权限有哪几种？保护分支是什么机制？

### 70. 【面试】GitLab 如何实现 HTTPS？使用自签名证书会遇到什么问题？

### 71. 【面试】GitLab 如何设置初始密码？升级时为什么要分版本逐步进行？

### 72. 【面试】Git 有哪几种方式实现免密码访问远程仓库？

### 73. 【面试】版本控制系统分为哪几类？本地、集中式与分布式版本控制各有什么特点？

### 74. 【面试】Git 的 tag 与 branch 有什么本质区别？tag 在实际发布中如何使用？
