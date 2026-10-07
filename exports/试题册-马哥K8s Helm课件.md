# 马哥K8s Helm课件 —— 试题册

> 共 48 题。答案与解析见《答案册-马哥K8s Helm课件.md》。


## K8s Helm笔试

### 1. 【Helm】Helm 在 Kubernetes 生态中扮演的角色是？

- **A.** 容器运行时接口
- **B.** 集群网络插件
- **C.** Kubernetes 的包管理器
- **D.** 镜像仓库

### 2. 【Helm】Helm 于哪一年成为 CNCF 毕业项目（Helm 3.0）？

- **A.** 2020 年
- **B.** 2018 年
- **C.** 2016 年
- **D.** 2022 年

### 3. 【Helm】Helm v2 采用的架构中，部署在集群内部的服务端组件是？

- **A.** kubelet
- **B.** Helm Client
- **C.** helm-proxy
- **D.** Tiller

### 4. 【Helm】Helm v3 相对 v2 最核心的架构变化是？

- **A.** 引入 Tiller 强化权限管理
- **B.** 移除 Tiller，仅保留客户端直连 API Server
- **C.** 必须为每个 Release 部署一个 Pod
- **D.** 改用 etcd 存储 Release 信息

### 5. 【Helm】Helm v2 中 Release 名称的作用域是？

- **A.** 整个 Kubernetes 集群内必须唯一
- **B.** 仅限当前名称空间唯一
- **C.** 整个 etcd 集群唯一
- **D.** 无任何限制

### 6. 【Helm】Helm v3 默认使用哪种资源存储 Release 的发行信息？

- **A.** ConfigMap
- **B.** Endpoints
- **C.** Lease
- **D.** Secret

### 7. 【Chart】Chart 包的文件后缀是？

- **A.** *.rpm / *.deb
- **B.** *.iso
- **C.** *.tar.gz 或 *.tgz
- **D.** *.jar

### 8. 【Chart】Chart 目录中属于「必选」的文件/目录是？

- **A.** values.yaml 和 charts/
- **B.** Chart.yaml 和 templates/
- **C.** Chart.lock 和 README.md
- **D.** _helpers.tpl 和 NOTES.txt

### 9. 【Chart】Chart 中 templates/ 目录的作用是？

- **A.** 存放图表包
- **B.** 存放变量默认值
- **C.** 存放依赖的子 chart
- **D.** 存放各资源清单的模板文件（deployment/service/ingress 等）

### 10. 【Chart】Chart 中的 charts/ 目录存放的是？

- **A.** 本 chart 依赖的子 chart
- **B.** chart 的版本记录
- **C.** 渲染后的 YAML 副本
- **D.** 容器镜像层

### 11. 【Chart】关于 values.yaml，下列说法正确的是？

- **A.** 是必选文件，缺少会导致安装失败
- **B.** 只能由 helm 自动生成，不可手工编辑
- **C.** 是可选项，用于为 templates/ 中的变量提供默认值
- **D.** 用于定义 Chart 版本号

### 12. 【Chart】templates/_helpers.tpl 的作用是？

- **A.** 存放提示信息
- **B.** 存放可复用的模板助手（命名模板），供 templates 下其他文件调用
- **C.** 定义 chart 依赖
- **D.** 记录测试用例

### 13. 【Chart】templates/NOTES.txt 的作用是？

- **A.** 记录 chart 变更日志
- **B.** 声明 chart 依赖
- **C.** 定义模板变量
- **D.** helm install 部署后向用户展示的提示与使用帮助信息

### 14. 【Release】Chart 与 Release 的关系，最贴切的类比是？

- **A.** 类与对象（Class 与 Object）或镜像与容器
- **B.** 磁盘与分区
- **C.** 路由与网关
- **D.** 节点与 Pod

### 15. 【模板】内置对象 .Release.Revision 在初次安装时的值是？

- **A.** 0
- **B.** latest
- **C.** 1
- **D.** 随机数

### 16. 【模板】要引用 values.yaml 中定义的变量 NAME，正确的写法是？

- **A.** {{ NAME }}
- **B.** {{ .Values.NAME }}
- **C.** {{ .name }}
- **D.** {{ .Variables.name }}

### 17. 【模板】Helm 的模板语言底层由什么实现？

- **A.** Python Jinja2
- **B.** Ruby ERB
- **C.** JavaScript EJS
- **D.** Go 语言的 text/template（含 Sprig 函数库）

### 18. 【模板】生成 Kubernetes Secret 时常用的编码函数是？

- **A.** b64enc
- **B.** atoi
- **C.** quote
- **D.** nindent

### 19. 【模板】下列不属于 Helm 模板流控制结构的是？

- **A.** if / else
- **B.** with
- **C.** switch / case
- **D.** range

### 20. 【模板】在 Helm 模板的 if 判断中，下列哪个值会被视为 false？

- **A.** 数值 1
- **B.** 空字符串 ""
- **C.** 非空字符串 "a"
- **D.** 非空列表 [1]

### 21. 【命令】执行 helm install -f myvalues.yaml -f override.yaml myredis ./redis 时，同名键最终取哪个文件的值？

- **A.** myvalues.yaml
- **B.** 两者合并后随机取值
- **C.** 报错退出
- **D.** override.yaml

### 22. 【命令】查看某个 Release 的版本历史应使用？

- **A.** helm list
- **B.** helm history
- **C.** helm status
- **D.** helm get notes

### 23. 【命令】helm rollback RELEASE_NAME 不指定版本号时，默认行为是？

- **A.** 回滚到最初版本
- **B.** 删除该 Release
- **C.** 回滚到上一个版本（且一次只能回滚一个版本）
- **D.** 提示必须指定版本

### 24. 【命令】在本地渲染模板查看生成结果、但不真正安装到集群，可以使用？

- **A.** helm template（或 helm install --dry-run --debug）
- **B.** helm lint
- **C.** helm verify
- **D.** helm package

### 25. 【命令】检查 chart 是否存在语法或配置问题应使用？

- **A.** helm test
- **B.** helm verify
- **C.** helm dependency
- **D.** helm lint

### 26. 【命令】将 chart 目录打包为 .tgz 存档文件应使用？

- **A.** helm archive
- **B.** helm compress
- **C.** helm package
- **D.** helm build

### 27. 【仓库】无需在本地添加仓库即可从 Artifact Hub 搜索 chart 的命令是？

- **A.** helm search repo
- **B.** helm search hub
- **C.** helm repo index
- **D.** helm pull

### 28. 【仓库】helm repo update 的作用类似于 Linux 下的哪条命令？

- **A.** apt update
- **B.** yum install
- **C.** systemctl restart
- **D.** tar xf

### 29. 【Helm】Helm 的三个核心概念是：打包格式 ______、基于 chart 部署的实例 ______、以及存放 chart 包的 ______。

> 共 3 个空。

### 30. 【Helm】在名称空间不存在时，helm install 可用 ______ 选项自动创建名称空间；调试渲染结果但不安装可用 ______ 与 --debug 选项组合。

> 共 2 个空。

### 31. 【Chart】Chart.yaml 中描述 chart 自身版本号的字段是 ______，描述所打包应用版本的字段是 ______。

> 共 2 个空。

### 32. 【模板】在模板中引用 Release 名称的内置对象写法是 ______，引用 Chart.yaml 中 chart 名称的写法是 ______。

> 共 2 个空。

### 33. 【模板】Helm 中在命令行覆盖 values.yaml 值使用 ______ 选项，从 YAML 文件加载值使用 ______（或 -f）选项。

> 共 2 个空。

### 34. 【Helm】Helm v3 已废弃 v2 中部署在集群内的服务端组件 ______，因此 helm 仅需 ______ 文件即可与 API Server 通信。

> 共 2 个空。

### 35. 【Helm】Helm 在 Linux 上默认的配置目录是 $HOME/______，仓库索引缓存目录是 $HOME/______/repository。

> 共 2 个空。

### 36. 【Helm】Harbor 新版支持以 ______ 协议作为 Chart 仓库，推送 chart 的命令是 helm ______ myapp-chart-0.0.1.tgz oci://harbor.wang.org/helm。

> 共 2 个空。


## K8s Helm面试

### 37. 【面试】什么是 Helm？它解决了 Kubernetes 应用部署中的哪些痛点？

### 38. 【面试】请解释 Helm 的 Chart、Release、Repository 三个核心概念，并给出类比。

### 39. 【面试】Helm v2 与 Helm v3 的主要区别有哪些？

### 40. 【面试】请描述 Helm Chart 的目录结构，并说明各文件/目录的作用。

### 41. 【面试】Helm 模板中常用的内置对象有哪些？请各举一例。

### 42. 【面试】values.yaml、-f 指定的值文件、--set 命令行参数三者的优先级是怎样的？

### 43. 【面试】请简述使用 Helm 部署一个应用的完整流程。

### 44. 【面试】Helm 中 install、upgrade、rollback、history、uninstall 命令各自的作用是什么？

### 45. 【面试】如何基于 Helm 实现 release 的升级和回滚？请给出命令。

### 46. 【面试】Chart 仓库有哪些来源？如何把 Harbor 当作 Chart 仓库使用？

### 47. 【面试】Helm 模板中常用的函数和流控制有哪些？请各举 2~3 个例子。

### 48. 【面试】使用 Helm 部署 MySQL 或 WordPress 时，有哪些关键参数与注意事项？
