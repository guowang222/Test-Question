# 马哥K8s Helm课件 —— 答案与解析

> 共 48 题，编号与《试题册-马哥K8s Helm课件.md》一致。


## K8s Helm笔试

### 1. 【Helm】Helm 在 Kubernetes 生态中扮演的角色是？

**答案**

**C**　Kubernetes 的包管理器

**解析**

Helm 是用于简化和管理 Kubernetes 应用部署的包管理器，可将应用所需的所有 YAML 清单打包为 Chart 并一键发布。

---

### 2. 【Helm】Helm 于哪一年成为 CNCF 毕业项目（Helm 3.0）？

**答案**

**A**　2020 年

**解析**

Helm 2.0 于 2018 年成为 CNCF 毕业项目，Helm 3.0 于 2020 年成为 CNCF 毕业项目。【衍生知识点】Helm 1.0 由 Deis 团队于 2015 年开发，最初名为 Kubernetes Deployment Manager。

---

### 3. 【Helm】Helm v2 采用的架构中，部署在集群内部的服务端组件是？

**答案**

**D**　Tiller

**解析**

Helm v2 为 C/S 架构：客户端 helm 通过 gRPC 与集群内的 Tiller 通信，Tiller 需要 RBAC 授权才能管理资源。

---

### 4. 【Helm】Helm v3 相对 v2 最核心的架构变化是？

**答案**

**B**　移除 Tiller，仅保留客户端直连 API Server

**解析**

Helm 3 废弃了 Tiller 服务端，helm 直接通过 kubeconfig 认证到 API Server，认证机制与 kubectl 一致。

---

### 5. 【Helm】Helm v2 中 Release 名称的作用域是？

**答案**

**A**　整个 Kubernetes 集群内必须唯一

**解析**

Helm 2 中 Release 名称在整个集群必须唯一（即使安装到不同名称空间也不能重名）；Helm 3 则改为每个名称空间内唯一即可。

---

### 6. 【Helm】Helm v3 默认使用哪种资源存储 Release 的发行信息？

**答案**

**D**　Secret

**解析**

Helm 3 默认使用 Secret 存储发行信息，比 v2 默认的 ConfigMap 提供更高安全性（可用 HELM_DRIVER 改为 configmap/memory/sql）。

---

### 7. 【Chart】Chart 包的文件后缀是？

**答案**

**C**　*.tar.gz 或 *.tgz

**解析**

Chart 是一种打包格式，后缀为 tar.gz 或 tgz，类似 RPM/DEB 包；可通过 helm package 由 Chart 目录生成。

---

### 8. 【Chart】Chart 目录中属于「必选」的文件/目录是？

**答案**

**B**　Chart.yaml 和 templates/

**解析**

Chart.yaml（保存 chart 基本信息）与 templates/（资源清单模板目录）是必选项；values.yaml 与 charts/ 为可选项。

---

### 9. 【Chart】Chart 中 templates/ 目录的作用是？

**答案**

**D**　存放各资源清单的模板文件（deployment/service/ingress 等）

**解析**

Helm 评估 chart 时会通过模板渲染引擎处理 templates/ 下所有文件，收集渲染结果后发送给 Kubernetes。

---

### 10. 【Chart】Chart 中的 charts/ 目录存放的是？

**答案**

**A**　本 chart 依赖的子 chart

**解析**

charts/ 目录可包含依赖的其他 chart，称为子 chart（subchart）；v3 中依赖关系直接定义在 Chart.yaml（v2 用 requirements.yaml）。

---

### 11. 【Chart】关于 values.yaml，下列说法正确的是？

**答案**

**C**　是可选项，用于为 templates/ 中的变量提供默认值

**解析**

若 templates/ 下都是固定内容则无需 values.yaml；当模板含变量时，用 values.yaml 提供默认值，可在 install/upgrade 时被覆盖。

---

### 12. 【Chart】templates/_helpers.tpl 的作用是？

**答案**

**B**　存放可复用的模板助手（命名模板），供 templates 下其他文件调用

**解析**

_helpers.tpl 中的内容不会直接渲染为资源清单，只作为可在整个 chart 中重复使用的公共模板片段（如镜像、标签的拼装）。

---

### 13. 【Chart】templates/NOTES.txt 的作用是？

**答案**

**D**　helm install 部署后向用户展示的提示与使用帮助信息

**解析**

NOTES.txt 存放提示信息，安装完成后展示给用户（如访问地址、获取密码的命令）；可用 helm get notes 查看。

---

### 14. 【Release】Chart 与 Release 的关系，最贴切的类比是？

**答案**

**A**　类与对象（Class 与 Object）或镜像与容器

**解析**

同一个 chart 可部署出多个实例，每个实例是一个 Release，相当于 OOP 中 Class 与对象、或镜像与容器的关系。

---

### 15. 【模板】内置对象 .Release.Revision 在初次安装时的值是？

**答案**

**C**　1

**解析**

.Release.Revision 表示此次修订的版本号，初次安装为 1，每次升级或回滚都会递增。

---

### 16. 【模板】要引用 values.yaml 中定义的变量 NAME，正确的写法是？

**答案**

**B**　{{ .Values.NAME }}

**解析**

Values 对象用于获取 values.yaml 中定义的变量，注意首字母大写 V，引用格式为 {{ .Values.key }}，嵌套值用 {{ .Values.info.key2 }}。

---

### 17. 【模板】Helm 的模板语言底层由什么实现？

**答案**

**D**　Go 语言的 text/template（含 Sprig 函数库）

**解析**

Helm 模板基于 Go 的 text/template，并内置了 60 多个函数，大部分来自 Sprig 模板库。

---

### 18. 【模板】生成 Kubernetes Secret 时常用的编码函数是？

**答案**

**A**　b64enc

**解析**

b64enc 用于 Base64 编码（编写 Secret 时常用），b64dec 用于 Base64 解码。

---

### 19. 【模板】下列不属于 Helm 模板流控制结构的是？

**答案**

**C**　switch / case

**解析**

Helm 提供 if/else（条件）、with（修改变量作用域）、range（类似 for each 循环）三种控制结构，不提供 switch/case。

---

### 20. 【模板】在 Helm 模板的 if 判断中，下列哪个值会被视为 false？

**答案**

**B**　空字符串 ""

**解析**

被视为 false 的有：布尔 false、数字 0、空字符串、nil、空集合（map/slice/tuple/dict/array）；其他情况条件都为 true。

---

### 21. 【命令】执行 helm install -f myvalues.yaml -f override.yaml myredis ./redis 时，同名键最终取哪个文件的值？

**答案**

**D**　override.yaml

**解析**

-f 可指定多次，优先级给最后（最右侧）指定的文件；同理 --set 重复指定时也是最后生效。

---

### 22. 【命令】查看某个 Release 的版本历史应使用？

**答案**

**B**　helm history

**解析**

helm history RELEASE_NAME 查看 Release 的版本历史；helm list 列出已安装的 release，helm status 查看当前状态。

---

### 23. 【命令】helm rollback RELEASE_NAME 不指定版本号时，默认行为是？

**答案**

**C**　回滚到上一个版本（且一次只能回滚一个版本）

**解析**

helm rollback 不指定 REVISION 时默认回滚至上一个版本，且一次只能回滚一个版本。

---

### 24. 【命令】在本地渲染模板查看生成结果、但不真正安装到集群，可以使用？

**答案**

**A**　helm template（或 helm install --dry-run --debug）

**解析**

helm template 可本地渲染模板输出 YAML；helm install --dry-run --debug 也会打印渲染结果但不执行安装。

---

### 25. 【命令】检查 chart 是否存在语法或配置问题应使用？

**答案**

**D**　helm lint

**解析**

helm lint [PATH] 检查 chart 可能存在的问题（默认检查当前目录）。

---

### 26. 【命令】将 chart 目录打包为 .tgz 存档文件应使用？

**答案**

**C**　helm package

**解析**

helm package 将指定目录的 chart 打包为 .tgz 到当前目录；helm push 则把 chart 推送到远端仓库（如 oci://harbor.wang.org/helm）。

---

### 27. 【仓库】无需在本地添加仓库即可从 Artifact Hub 搜索 chart 的命令是？

**答案**

**B**　helm search hub

**解析**

helm search hub 从 artifacthub.io 网站搜索（相当于 docker search）；helm search repo 搜索的是本地已配置仓库（相当于 apt search）。

---

### 28. 【仓库】helm repo update 的作用类似于 Linux 下的哪条命令？

**答案**

**A**　apt update

**解析**

helm repo update 用于刷新本地缓存的仓库索引，类似于 apt update；仓库配置保存在 ~/.config/helm/repositories.yaml，索引缓存位于 ~/.cache/helm/repository/。

---

### 29. 【Helm】Helm 的三个核心概念是：打包格式 ______、基于 chart 部署的实例 ______、以及存放 chart 包的 ______。

**答案**

- 第 1 空：Chart / chart
- 第 2 空：Release / release
- 第 3 空：Repository / repository

**解析**

Chart 是打包文件（tgz），Release 是一次部署实例，Repository 是 chart 仓库（可用 Harbor 实现，相当于 APT/YUM 仓库）。

---

### 30. 【Helm】在名称空间不存在时，helm install 可用 ______ 选项自动创建名称空间；调试渲染结果但不安装可用 ______ 与 --debug 选项组合。

**答案**

- 第 1 空：--create-namespace
- 第 2 空：--dry-run

**解析**

Helm 3 遵循其他 Kubernetes 对象的行为，名称空间不存在时默认报错，需显式加 --create-namespace。

---

### 31. 【Chart】Chart.yaml 中描述 chart 自身版本号的字段是 ______，描述所打包应用版本的字段是 ______。

**答案**

- 第 1 空：version
- 第 2 空：appVersion

**解析**

helm list 输出的 CHART 列对应 chart 版本，APP VERSION 列对应 appVersion。

---

### 32. 【模板】在模板中引用 Release 名称的内置对象写法是 ______，引用 Chart.yaml 中 chart 名称的写法是 ______。

**答案**

- 第 1 空：{{ .Release.Name }} / .Release.Name
- 第 2 空：{{ .Chart.Name }} / .Chart.Name

**解析**

Release 对象描述发布自身信息（Name/Namespace/Revision/Service/IsInstall/IsUpgrade），Chart 对象获取 Chart.yaml 内容。

---

### 33. 【模板】Helm 中在命令行覆盖 values.yaml 值使用 ______ 选项，从 YAML 文件加载值使用 ______（或 -f）选项。

**答案**

- 第 1 空：--set
- 第 2 空：--values

**解析**

三种定制方式优先级：values.yaml 默认值 < -f 指定的文件 < --set 命令行；同类型多值时最右侧优先。

---

### 34. 【Helm】Helm v3 已废弃 v2 中部署在集群内的服务端组件 ______，因此 helm 仅需 ______ 文件即可与 API Server 通信。

**答案**

- 第 1 空：Tiller / tiller
- 第 2 空：kubeconfig

**解析**

Helm 3 的认证加载机制与 kubectl 相同，默认使用 ~/.kube/config。

---

### 35. 【Helm】Helm 在 Linux 上默认的配置目录是 $HOME/______，仓库索引缓存目录是 $HOME/______/repository。

**答案**

- 第 1 空：.config/helm
- 第 2 空：.cache/helm

**解析**

Linux 下缓存/配置/数据路径分别为 $HOME/.cache/helm、$HOME/.config/helm、$HOME/.local/share/helm；也可用 HELM_*_HOME 环境变量覆盖。

---

### 36. 【Helm】Harbor 新版支持以 ______ 协议作为 Chart 仓库，推送 chart 的命令是 helm ______ myapp-chart-0.0.1.tgz oci://harbor.wang.org/helm。

**答案**

- 第 1 空：OCI / oci
- 第 2 空：push

**解析**

自签名证书场景下需先 helm registry login --insecure harbor.wang.org 并信任 CA，再执行 helm push。

---


## K8s Helm面试

### 37. 【面试】什么是 Helm？它解决了 Kubernetes 应用部署中的哪些痛点？

**答案**

Helm 是 Kubernetes 的包管理器（官方原话：a tool for managing Charts），用于简化和管理 Kubernetes 应用的部署。
它把部署一个应用所需的一堆 YAML 清单（deployment、statefulset、service、ingress、RBAC 等）打包成一个 Chart 包，用一个包完成整套应用的安装、升级、回滚。
解决的痛点：
1. 随着资源引用增多，需维护大量 YAML 文件，易错难管；
2. 微服务场景下各服务配置差别不大，YAML 无法高效复用；
3. 无法把相关 YAML 作为整体做应用级升级与回滚；
4. 无法用一套 YAML 创建多套环境（开发/预生产/生产），只能复制并手工改，效率低。
Helm 的核心能力即：分类打包、模板化（同一套模板不同环境赋不同值）、版本管理（install/upgrade/rollback）。

**解析**

要点：包管理器、Chart 打包、模板化、多环境复用、版本管理与回滚。

---

### 38. 【面试】请解释 Helm 的 Chart、Release、Repository 三个核心概念，并给出类比。

**答案**

1. Chart：图表/打包文件，是将所有相关资源清单 YAML 打包成的文件，后缀为 tar.gz 或 tgz，类似 RPM/DEB 包格式；它包含应用所需的各类 YAML/JSON 清单（deployment、service 等）但不含容器镜像；模板通常以 Go template 编写，默认值放在 values.yaml。
2. Release：基于 chart 部署的一个实例。同一个 chart 部署多次会产生多个 Release，每个 Release 有唯一名称，并记录部署版本状态，因此可以升级与回滚。
3. Repository：chart 包的集中存放与分发仓库，类似 Docker 的 Harbor、Linux 的 APT/YUM 仓库（如 artifacthub.io、Harbor OCI 仓库）。
类比：Chart 与 Release 的关系相当于 OOP 中的 Class 与 Object，或镜像与容器。

**解析**

要点：三者的准确定义 + Class/Object（镜像/容器）类比 + Chart 不含镜像。

---

### 39. 【面试】Helm v2 与 Helm v3 的主要区别有哪些？

**答案**

架构上：
1. Helm 3 废弃了 Tiller 服务端组件（v2 中 helm client 通过 gRPC 与集群内 Tiller 通信，Tiller 是 Operator 形式的 Pod 且需 RBAC 授权）；v3 仅保留客户端，直接通过 kubeconfig 认证到 API Server，机制同 kubectl。
2. Release 名称作用域：v2 要求在整个集群内唯一；v3 只需在同一名称空间内唯一，不同名称空间可重名。
3. 发行信息存储：v2 默认用 ConfigMap，v3 默认用 Secret，安全性更高。
4. 名称空间：v2 可自动创建不存在的名称空间；v3 默认报错，需显式 --create-namespace。
5. 依赖声明：v3 不再需要 requirements.yaml，依赖直接写在 Chart.yaml。
6. 支持将 Chart 推送到 Docker 镜像仓库（OCI）。
7. 命令变化：helm delete --purge → helm uninstall；helm inspect → helm show；helm fetch → helm pull。
8. 随机名：v2 可自动生成，v3 必须显式指定 release 名，随机名需加 --generate-name。

**解析**

要点：Tiller、名称空间唯一性、Secret/ConfigMap、create-namespace、requirements.yaml、OCI、命令变化。

---

### 40. 【面试】请描述 Helm Chart 的目录结构，并说明各文件/目录的作用。

**答案**

mychart/
├── Chart.yaml       # 必选。保存 chart 基本信息：name、description、version、appVersion、apiVersion: v2、type 等
├── values.yaml      # 可选。为 templates 中的变量提供默认值，安装/升级时可被覆盖
├── templates/       # 必选。所有资源清单模板（deployment.yaml、service.yaml、ingress.yaml、hpa.yaml、serviceaccount.yaml 等）
│   ├── _helpers.tpl # 模板助手，存放可复用的命名模板，不直接渲染
│   ├── NOTES.txt    # 安装后展示给用户的提示与帮助信息
│   └── tests/       # 测试文件（如 test-connection.yaml）
├── charts/          # 可选。存放该 chart 依赖的子 chart
├── Chart.lock       # 依赖锁定文件
├── values.schema.json # values 的 JSON Schema 校验
└── .helmignore      # 打包时忽略的文件
可用 helm create NAME 一键生成标准目录结构，helm show chart/show values 查看其中内容。

**解析**

要点：Chart.yaml 与 templates 必选、values.yaml 与 charts 可选、_helpers.tpl/NOTES.txt 作用。

---

### 41. 【面试】Helm 模板中常用的内置对象有哪些？请各举一例。

**答案**

1. Release 对象——描述发布自身信息：
   .Release.Name（Release 名称）、.Release.Namespace（名称空间）、.Release.Revision（修订版本号，初次安装为 1，每次升级或回滚递增）、.Release.Service（一般为 Helm）、.Release.IsInstall（安装时为 true）、.Release.IsUpgrade（升级或回滚时为 true）。
2. Chart 对象——获取 Chart.yaml 内容：.Chart.Name、.Chart.Version。
3. Values 对象——获取 values.yaml 内容，如 .Values.NAME、.Values.USER.AGE；引用时首字母大写 V。
4. Capabilities 对象——集群信息：.Capabilities.APIVersions、.Capabilities.APIVersions.Has "apps/v1/Deployment"、.Capabilities.KubeVersion.Major/.Minor。
5. Template 对象——当前模板信息：.Template.BasePath、.Template.Name。
6. Files 对象——读取 chart 内非模板文件内容。
写法示例：metadata.name: {{ .Release.Name }}-configmap。

**解析**

要点：Release/Chart/Values/Capabilities/Template 五类，各自典型字段与引用写法。

---

### 42. 【面试】values.yaml、-f 指定的值文件、--set 命令行参数三者的优先级是怎样的？

**答案**

优先级从低到高为：
1. chart 内 values.yaml 中定义的默认值（最低）；
2. helm install/upgrade 中 -f/--values 指定的值文件；
3. --set（或 --set-string/--set-file/--set-json）命令行指定的值（最高）。
细则：
- -f 可指定多次，优先级给最后（最右侧）指定的文件，例如 helm install -f myvalues.yaml -f override.yaml myredis ./redis，同名键以 override.yaml 为准；
- --set 也可重复，同样是最后生效；
- 可用 helm show values CHART 导出 chart 的默认 values，helm get values RELEASE 查看某个 release 实际生效的值；
- 当值是列表/字典时，--set 用逗号分隔、用 name={a,b,c}、info[0].name 等语法表达。

**解析**

要点：values.yaml < -f 文件 < --set；多次指定时最右优先；show values / get values 用法。

---

### 43. 【面试】请简述使用 Helm 部署一个应用的完整流程。

**答案**

1. 安装 helm 客户端（二进制或官方脚本：curl 拉取 get-helm-3 脚本执行，或用 helm-v3.x-linux-amd64.tar.gz 解包后软链到 /usr/local/bin）；
2. 添加并配置 chart 仓库：helm repo add bitnami https://charts.bitnami.com/bitnami、helm repo update、helm repo list；
3. 定位并查看 chart：helm search repo mysql、helm show chart/values/all CHART；
4. 定制参数：导出 helm show values CHART > values.yaml 后修改，或用 --set 传参；
5. 安装：helm install RELEASE CHART -f values.yaml（必要时 --create-namespace、-n NS）；
6. 验证：helm list、helm status RELEASE、kubectl get pod/pvc；
7. 升级与回滚：helm upgrade RELEASE CHART ...、helm history RELEASE、helm rollback RELEASE [REVISION]；
8. 卸载：helm uninstall RELEASE（注意 PVC 默认不会被删除，需手工清理）。

**解析**

要点：装客户端→加仓库→查 chart→定制 values→install→验证→upgrade/rollback→uninstall。

---

### 44. 【面试】Helm 中 install、upgrade、rollback、history、uninstall 命令各自的作用是什么？

**答案**

helm install [NAME] [CHART]：通过 chart 安装一个 release 实例；支持六种 chart 形式（仓库引用 example/mariadb、本地 tgz、本地目录、绝对 URL、--repo 指定的 URL、OCI 仓库 oci://...）。
helm upgrade RELEASE CHART [--set/-f]：更新已有 release（配合 --install 可在不存在时自动安装，即 helm upgrade --install）。
helm rollback RELEASE [REVISION]：把 release 回滚到指定版本，不指定则回滚到上一个版本，且一次只能回滚一个版本。
helm history RELEASE：查看 release 的版本历史（各 revision 的状态与描述）。
helm uninstall RELEASE：卸载 release，删除其创建的 Kubernetes 资源（但动态创建的 PVC 通常仍保留，需手动删除）。
辅助命令：helm list（列出 release）、helm status（状态）、helm get values/manifest/notes（查看实际值/渲染出的清单/说明）。

**解析**

要点：五条命令语义 + install 的六种 chart 形式 + upgrade --install + uninstall 不删 PVC 的坑。

---

### 45. 【面试】如何基于 Helm 实现 release 的升级和回滚？请给出命令。

**答案**

升级：
- 通过 --set 覆盖新值：helm upgrade RELEASE_NAME CHART --set key=newvalue
- 通过更新 values 文件实现：helm upgrade RELEASE_NAME CHART -f mychart/values.yaml
- 首次不存在时自动安装：helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace -n kubernetes-dashboard
回滚与历史：
- helm history RELEASE_NAME 查看所有 revision；
- helm rollback RELEASE_NAME [REVISION] 回滚（不指定则回到上一个版本，一次只能退一个版本）；
- 回滚本质上是产生一个新的 revision，而不是删除历史记录。
注意：升级前后可用 helm get values / helm get manifest 对比实际生效值与渲染出的资源清单；安装/升级时可加 --atomic 让失败自动回滚，--wait 等待资源就绪，--timeout 默认 5m0s。

**解析**

要点：upgrade --set/-f、upgrade --install、history + rollback（默认回上一版）、atomic/wait/timeout。

---

### 46. 【面试】Chart 仓库有哪些来源？如何把 Harbor 当作 Chart 仓库使用？

**答案**

常见 Chart 仓库来源：
1. 官方/公共仓库：Artifact Hub（https://artifacthub.io/，可用 helm search hub 搜索）、微软镜像仓库 http://mirror.azure.cn/kubernetes/charts/、阿里云 http://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts；
2. 项目官方仓库：项目自身维护的 chart 仓库（如 harbor 的 https://helm.goharbor.io、ingress-nginx、kubernetes-dashboard 等）；
3. 私有仓库：Harbor（新版支持 OCI 协议，可把 chart 存放在镜像仓库中）。
Harbor 作为 chart 仓库的操作：
- 登录：helm registry login --insecure harbor.wang.org -u <user> -p <pass>（自签名证书需先把 CA 追加到系统信任链）；
- 上传：helm push myapp-chart-0.0.1.tgz oci://harbor.wang.org/helm；
- 下载：helm pull oci://harbor.wang.org/helm/myapp-chart --version 0.0.1；
- 传统（非 OCI）方式还可用 helm repo add myharbor https://harbor.wangxiaochun.com/chartrepo/myweb --username admin --password xxx。

**解析**

要点：artifacthub/azure/aliyun、项目官方仓库、Harbor OCI（registry login/push/pull）。

---

### 47. 【面试】Helm 模板中常用的函数和流控制有哪些？请各举 2~3 个例子。

**答案**

函数（Helm 内置 60+，多数来自 Sprig 库）：
- 字符串：quote（加双引号）、squote（加单引号）、upper/lower、title、snakecase/camelcase/kebabcase、replace、trunc、contains、repeat、nospace、trimSuffix、nindent/indent；
- 默认值：default（值为空时取默认）、empty、coalesce；
- 编码/加密：b64enc、b64dec、sha256sum、htpasswd、encryptAES/decryptAES；
- 类型转换：atoi、int、toString、toJson/toPrettyJson；
- 字典/列表：dict、get、set、hasKey、merge、list、first/last、uniq、without、has、slice、until/untilStep/seq；
- 数学：add/sub/mul/div/mod、max/min、round、ceil/floor、len。
语法两种形式：functionName arg1 arg2（如 quote .Values.favorite.drink）；或管道 arg1 | functionName（如 .Values.favorite.drink | quote）。
流控制三种：
- if/else：条件渲染；
- with：修改变量作用域；
- range：类似 for each 的循环。
if 判断中以下值视为 false：布尔 false、数字 0、空字符串、nil、空集合。

**解析**

要点：quote/default/b64enc/nindent 等函数 + 管道语法 + if/else、with、range + false 值集合。

---

### 48. 【面试】使用 Helm 部署 MySQL 或 WordPress 时，有哪些关键参数与注意事项？

**答案**

MySQL（bitnami/mysql）案例：
- helm repo add bitnami https://charts.bitnami.com/bitnami；安装时最好锁定版本 --version 10.3.0；
- 必须指定持久化存储，否则 PVC 会一直 Pending：--set primary.persistence.storageClass=sc-nfs（若集群已有默认 StorageClass 可省略）；
- 是否主从取决于 architecture 参数，可选 standalone（默认单节点）或 replication（主从）；
- 密码从 Secret 获取：kubectl get secret mysql -o jsonpath="{.data.mysql-root-password}" | base64 -d；
- 定制可用 helm show values bitnami/mysql > values.yaml 修改 auth.rootPassword / auth.database / persistence.size 等再用 -f 安装。
WordPress 案例：
- 使用外部数据库需 --set mariadb.enabled=false 并指定 externalDatabase.host/user/password/database/port；若外部库是主从，host 应指向主节点 service（如 mysql-primary.wordpress.svc.cluster.local）；
- 用 --set persistence.storageClass=sc-nfs 指定持久卷；
- 可用 --set ingress.enabled=true、ingress.ingressClassName=nginx、ingress.hostname=wordpress.wang.org 自动创建 Ingress 对外发布；
- 安装时加 -n wordpress --create-namespace 创建独立名称空间。
注意：helm uninstall 不会删除动态置备的 PVC，需要手工 kubectl delete pvc 清理。

**解析**

要点：storageClass 必配（否则 Pending）、architecture 参数、Secret 取密码、外部数据库 mariadb.enabled=false、uninstall 不删 PVC。

---
