# K8s资源对象 —— 答案与解析

> 共 53 题，编号与《试题册-K8s资源对象.md》一致。


## MD导入

### 1. 下列资源中，在 Kubernetes 中（　）独立 API 资源类型，需要依附其它资源存在。

**答案**

**C**　Label

**解析**

【文档】Label、emptyDir 等资源没有独立 API 资源类型，不能独立创建，需依附其它资源存在。

---

### 2. 命令式 API 与声明式 API 的区别，描述正确的是（　）。

**答案**

**C**　声明式 API 只需告诉机器想要的结果，机器自身确定如何达成目标

**解析**

【文档】命令式 API：用户需一步步告诉机器如何做，机器被动接受指令；声明式 API：只需告诉机器想要的结果，机器自身确定如何达成目标。K8s 采用声明式。

---

### 3. metadata 为资源提供元数据；spec 字段用于定义用户________的状态；status 字段记录活动对象的________状态信息。

**答案**

- 第 1 空：期望
- 第 2 空：当前

**解析**

【文档】spec 定义用户期望的状态；status 记录活动对象的当前状态信息。【拓展】spec 由用户提供（desired state），status 由集群填充（observed state），用户提交清单时通常省略 status。

---

### 4. apiVersion 的格式为"________/版本名"，主要有 alpha、________、stable 三种稳定性阶段。

**答案**

- 第 1 空：组名
- 第 2 空：beta1 / beta

**解析**

【文档】apiVersion 用于对同一资源对象的不同版本并行管理，主要有 alpha、beta、stable。【拓展】alpha 带风险可能被弃用，beta 经过更充分测试，stable（GA）为正式稳定版。

---

### 5. 指定当前对象所属名称空间的 metadata 字段是________，默认值为________。

**答案**

- 第 1 空：namespace
- 第 2 空：default

**解析**

【文档】未指定时对象创建在 default 名称空间。

---

### 6. 写出使用 dry-run 模拟创建名称空间 `dev-test` 并导出为 YAML 清单的完整命令。

**答案**

dry-run 模拟生成清单：
```shell
kubectl create namespace dev-test --dry-run=client -o yaml > dev-test.yaml
```

---

### 7. 编写一个最小可用的 Namespace 资源清单 `dev-test.yaml` 并说明如何应用它。

**答案**

最小 Namespace 清单 `dev-test.yaml`：
```yaml
apiVersion: v1
kind: Namespace
metadata:
name: dev-test
spec: {}
status: {}
```
应用：`kubectl apply -f dev-test.yaml`，输出 `namespace/dev-test created`。

---


## 资源与API基础

### 8. Kubernetes 系统将一切事物都称为（　），这种思想类似于面向对象思想。

**答案**

**B**　资源对象

**解析**

k8s 是分布式系统平台，系统将一切事物都称为资源对象，类似面向对象思想。

---

### 9. Kubernetes 的 API 资源遵循（　）风格组织并管理。

**答案**

**C**　REST

**解析**

Kubernetes 提供单独的 API 资源，遵循 REST 风格组织并管理这些资源对象。

---

### 10. 下列（　）组 HTTP 方法可用于对 API 资源进行增、删、改、查。

**答案**

**B**　POST、PUT、PATCH、DELETE、GET

**解析**

API 资源类型支持标准 HTTP 方法：POST、PUT、PATCH、DELETE 和 GET。

---

### 11. 下列资源中，（　）在 Kubernetes 中没有独立 API 资源类型，需要依附其它资源存在。

**答案**

**C**　Label

**解析**

Label、emptyDir 等资源没有独立 API 资源类型，不能独立创建，需依附其它资源存在。

---

### 12. 用户自定义的 API 资源称为（　）。

**答案**

**A**　CRD

**解析**

用户自定义 API 称为 CRD（Custom Resource Definition），可通过安装组件生成。CRD 本身是 apiextensions.k8s.io 群组下的集群级资源。【拓展】

---

### 13. Kubernetes 设计资源对象的核心目的是（　）。

**答案**

**B**　更好地运行和管理 Pod 资源

**解析**

设计资源的核心目的：如何更好地运行和管理 Pod 资源，为容器化应用提供更灵活完善的操作与管理组件。

---


## 资源分类

### 14. 按功能划分，下列不属于 Kubernetes 资源分类的是（　）。

**答案**

**C**　编译构建

**解析**

功能分类为：工作负载、服务发现和负载均衡、存储和配置、集群管理、策略和调度、元数据；没有编译构建。

---

### 15. Kubernetes 资源按适用范围可分为（　）。

**答案**

**A**　名称空间级别、集群级别、元数据级别

**解析**

按适用范围分为：名称空间级别（仅在该名称空间生效）、集群级别（全集群可见可调用）、元数据级别（提供一种指标）。

---


## 常用命令

### 16. kubectl 查看集群中所有 API 资源类型的命令是（　）。

**答案**

**B**　kubectl api-resources

**解析**

kubectl api-resources 查看所有 API 资源类型，输出 NAME/SHORTNAMES/APIVERSION/NAMESPACED/KIND。

---

### 17. 查看 apps 这个 API 群组下有哪些资源的命令是（　）。

**答案**

**A**　kubectl api-resources --api-group=apps

**解析**

kubectl api-resources --api-group=apps 按 API 群组过滤，apps 群组下有 controllerrevisions、daemonsets、deployments、replicasets、statefulsets。

---


## 工作负载资源

### 18. Kubernetes 中最小的部署组成部分是（　），它与 pause 容器共享网络栈和存储卷。

**答案**

**B**　Pod

**解析**

Pod 是 K8s 中最小的组成部分，与 pause 容器共享网络栈、共享存储卷。【拓展】pause 容器负责持有网络命名空间，业务容器加入其中。

---

### 19. 通过标签选择器（label selector）控制 Pod 副本数的控制器资源是（　）。

**答案**

**B**　ReplicaSet

**解析**

ReplicaSet（RS）是调度控制器，负责管理 Pod 的创建，通过标签选择器控制 Pod 副本数。

---

### 20. Deployment 创建 Pod 的方式是（　）。

**答案**

**B**　通过控制 ReplicaSet 的创建去创建 Pod

**解析**

Deployment 控制器通过控制 RS（ReplicaSet）的创建去创建 Pod。【拓展】控制链：Deployment → ReplicaSet → Pod。

---

### 21. 主要面向有状态服务的管理器资源是（　）。

**答案**

**B**　StatefulSet

**解析**

StatefulSet 主要为有状态服务建立的管理器。【拓展】提供稳定的网络标识与有序部署/扩缩。

---

### 22. 可以在集群每个（匹配的）节点上都运行一个 Pod 副本的组件是（　）。

**答案**

**C**　DaemonSet

**解析**

DaemonSet 可以在每个节点都运行一个 Pod 的组件，如 kube-proxy、kube-flannel。【拓展】也可用 nodeSelector/affinity 限定部分节点。

---

### 23. 用于批处理任务、执行一次即退出的资源是（　）；轮询（定时）执行的批处理任务资源是（　）。

**答案**

**B**　Job；CronJob

**解析**

Job 用于批处理任务（一次性）；CronJob 是轮询（定时）的批处理任务。【拓展】CronJob 基于 cron 表达式周期性创建 Job。

---


## 配置与存储

### 24. 当配置中心使用、支持配置文件热更新的资源是（　）。

**答案**

**B**　ConfigMap

**解析**

ConfigMap 当配置中心使用，一般用来存储配置文件，达到热更新状态。

---

### 25. 以加密方案存储数据，可保存密码、密钥、证书等敏感信息的资源是（　）。

**答案**

**B**　Secret

**解析**

Secret 以加密方案存储数据，可保存密码文件、密钥等。

---


## 元数据资源

### 26. 属于元数据级别（负责提供一种指标/模板）的资源是（　）。

**答案**

**A**　HPA

**解析**

元数据级别资源包括 HPA、PodTemplate、LimitRange。【拓展】HPA（autoscaling/v2）依据指标自动伸缩 Pod 副本数。

---


## API设计理念

### 27. 关于命令式 API 与声明式 API，描述正确的是（　）。

**答案**

**C**　声明式 API 只需告诉机器想要的结果，机器自身确定如何达成目标

**解析**

命令式 API：用户需一步步告诉机器如何做，机器被动接受指令；声明式 API：只需告诉机器想要的结果，机器自身确定如何达成目标。K8s API 设计原则第一条即所有 API 应该是声明式的。

---


## 资源与API基础

### 28. Kubernetes 的 API 资源分为两种：内置 API 资源和________（Custom Resource Definition）。

**答案**

- 第 1 空：CRD / 自定义API资源 / 自定义 API 资源 / customresourcedefinition

**解析**

内置 API 资源是 K8s 安装后自身具有的；用户自定义的 API 称为 CRD。

---


## API组织形式

### 29. 资源类型的 URL 格式为"________/VERSION/RESOURCE"，例如 /apps/v1/deployments。

**答案**

- 第 1 空：GROUP / 组名 / group

**解析**

URL 格式为 /GROUP/VERSION/RESOURCE，如 /apps/v1/deployment。

---

### 30. 隶属于同一资源类型的对象组成的列表称为________（如 PodList）。

**答案**

- 第 1 空：collection / 集合 / Collection

**解析**

Kubernetes 利用标准 RESTful 术语描述 API 概念：同类对象的列表称为 collection（集合）。

---


## 资源清单格式

### 31. Kubernetes API 只接受及响应________格式的数据对象，为方便使用提供了 YAML 格式的 POST 对象。

**答案**

- 第 1 空：JSON / json

**解析**

k8s API 只接受及响应 JSON 格式的数据对象，为了使用方便提供 YAML 格式的 POST 对象。

---

### 32. 大部分资源对象需要三个嵌套字段：________、spec、________。

**答案**

- 第 1 空：metadata / Metadata
- 第 2 空：status / Status

**解析**

metadata 提供元数据；spec 定义期望状态；status 记录当前状态。

---

### 33. YAML 使用________表示层级关系，缩进时不允许使用________，只允许使用空格。

**答案**

- 第 1 空：缩进 / indent / 缩进对齐
- 第 2 空：Tab / tab / 制表符 / TAB

**解析**

YAML 大小写敏感，用缩进表示层级关系，只允许空格缩进。

---

### 34. YAML 中以________开始的内容为注释。

**答案**

- 第 1 空：# / ＃ / 井号

**解析**

以 # 开始的内容为注释。

---

### 35. 资源配置清单第一级字段一般包括 apiVersion、________、metadata、spec、status 五个字段。

**答案**

- 第 1 空：kind / Kind

**解析**

五个一级字段：apiVersion、kind、metadata、spec、status。

---

### 36. apiVersion 的格式为"________/版本名"，主要有 alpha、________、stable 三种版本阶段。

**答案**

- 第 1 空：组名 / GROUP / group / 组
- 第 2 空：beta / beta1 / Beta

**解析**

apiVersion 用于对同一资源对象的不同版本并行管理，格式为组名/版本名。

---


## metadata字段

### 37. metadata 必选字段包括 name、________ 和________（系统自动生成，用于区分已删除又重新创建的同名对象）。

**答案**

- 第 1 空：namespace / Namespace
- 第 2 空：uid / UID / Uid

**解析**

必选字段：name（对象名称）、namespace（所属名称空间，默认 default）、uid（系统自动生成）。

---

### 38. labels 是键值数据，常用作________的挑选条件；annotation 是非标识型键值数据，是 labels 的补充，________（支持/不支持）标签选择器的选择。

**答案**

- 第 1 空：标签选择器 / label selector / 标签选择器(selector) / 选择器
- 第 2 空：不支持

**解析**

labels 用于标签选择器挑选；annotation 不支持标签选择器的选择。

---


## 常用命令

### 39. 查看资源配置清单格式帮助的命令是 kubectl ________ TYPE_NAME。

**答案**

- 第 1 空：explain

**解析**

kubectl explain TYPE_NAME [--api-version=GROUP_NAME/VERSION]，可逐层查看字段帮助。

---

### 40. 利用指令式命令模拟生成清单文件，可以使用选项________=client -o yaml；应用清单文件的命令是 kubectl ________ -f 文件名。

**答案**

- 第 1 空：--dry-run / dry-run
- 第 2 空：apply

**解析**

kubectl create namespace ns-test --dry-run=client -o yaml > ns.yaml，再 kubectl apply -f ns.yaml。

---


## spec与status

### 41. 定义资源配置清单时，________ 是必须的字段，用于描述对象的________状态。

**答案**

- 第 1 空：spec / Spec
- 第 2 空：期望 / 目标 / desired

**解析**

spec 是必须字段，用于描述对象的目标状态（用户期望的特征）。

---

### 42. 数据类的资源对象无 spec、status 字段，例如：________、________、endpoints 等。

**答案**

- 第 1 空：configmaps / ConfigMap / configmap / ConfigMaps
- 第 2 空：secrets / Secret / secret / Secrets

**解析**

数据类资源对象（ConfigMaps、Secrets、Endpoints 等）无 spec/status 字段。

---


## 资源与API基础

### 43. 简述 Kubernetes 中"资源"与"对象"的关系。

**答案**

资源代表了对象的集合，例如 Pod 资源可用于描述所有 Pod 类型的对象；对象实质是资源类型生成的实例。即资源类型（KIND）是"类"，对象是按该类型创建的具体"实例"，每个对象有唯一 name/uid 标识。【拓展】同一资源类型的对象列表称为 collection（如 PodList）。

**解析**

资源=类型/集合概念，对象=实例。

---


## 资源分类

### 44. 简述 Kubernetes 资源按功能划分的六大类别，并各举至少一个代表性资源。

**答案**

1) 工作负载（workloads）：Pod、Deployment、StatefulSet、DaemonSet、Job、CronJob；2) 服务发现和负载均衡：Service、Ingress；3) 存储和配置：Volume、CSI、ConfigMap、Secret；4) 集群管理（Cluster Admin）：Namespace、Node、ClusterRole 等；5) 策略和调度：LimitRange、ResourceQuota、PriorityClass；6) 元数据：HPA、PodTemplate。

**解析**

六大类：工作负载 / 服务发现和负载均衡 / 存储和配置 / 集群管理 / 策略和调度 / 元数据。

---

### 45. 请分别写出名称空间级别、集群级别、元数据级别资源的含义，并各举两例资源。

**答案**

名称空间级别：仅在此名称空间中生效，如 Pod、Service、Deployment、ConfigMap；集群级别：定义以后在全集群中都能被可见以及调用，如 Namespace、Node、ClusterRole、PV、StorageClass；元数据级别：负责提供一种指标，如 HPA、PodTemplate、LimitRange。可用 kubectl api-resources 的 NAMESPACED 列区分（true=名称空间级，false=集群级）。

**解析**

三级适用范围：名称空间/集群/元数据。

---


## 工作负载资源

### 46. 列出至少 5 种工作负载型资源及其用途。

**答案**

Pod：最小部署单元，与 pause 共享网络栈与存储卷；ReplicaSet：通过标签选择器控制 Pod 副本数；Deployment：通过控制 RS 创建 Pod，支持发布/回滚；StatefulSet：面向有状态服务；DaemonSet：每个节点运行一个 Pod；Job：一次性批处理任务；CronJob：定时轮询的批处理任务。

**解析**

工作负载型资源：Pod/RS/Deployment/StatefulSet/DaemonSet/Job/CronJob。

---


## 配置与存储

### 47. ConfigMap、Secret、DownwardAPI 各自的作用是什么？

**答案**

ConfigMap：当配置中心使用，存储配置文件，支持热更新；Secret：以加密方案存储数据，保存密码、密钥、证书等敏感信息；DownwardAPI：把外部环境中的信息输出给容器（如将 Pod 自身元数据以文件/环境变量形式暴露给容器内进程）。

**解析**

三种特殊类型存储卷的用途。

---


## API设计理念

### 48. 简述命令式 API 与声明式 API 的区别，并说明 Kubernetes 采用了哪种方式。

**答案**

命令式 API：用户需要一步步告诉机器该如何做，机器不具有任何"智能"，只能被动接受指令；声明式 API：只需要告诉机器想要的结果，机器自身确定如何达成目标。Kubernetes API 设计原则第一条即"所有 API 应该是声明式的"，用户提交 spec（期望状态），控制器持续调谐（reconcile）使实际状态趋近期望状态。【拓展】对应 kubectl 中 kubectl run/create（偏命令式）与 kubectl apply（声明式）。

**解析**

K8s 采用声明式 API。

---

### 49. 请列举至少 5 条 Kubernetes API 的设计原则。

**答案**

1) 所有 API 应该是声明式的；2) API 对象是彼此互补且可组合的；3) 高层 API 以操作意图为基础设计；4) 低层 API 根据高层 API 的控制需要设计；5) 尽量避免简单封装，不要有在外部 API 无法显示知道的内部隐藏机制；6) API 操作复杂度与对象数量成正比；7) API 对象状态不能依赖于网络连接状态；8) 尽量避免让操作机制依赖于全局状态（分布式系统中保证全局状态同步非常困难）。

**解析**

8 条设计原则，答出 5 条即可。

---


## 资源清单格式

### 50. 说明资源配置清单中 apiVersion、kind、metadata、spec、status 五个一级字段的作用，并指出哪些资源对象没有 spec/status 字段。

**答案**

apiVersion：API 版本，格式"组名/版本名"（核心组为 v1），用于并行管理同一资源的不同版本；kind：资源类型（KIND），Kubernetes 的专用资源对象种类；metadata：元数据，含必选的 name、namespace、uid 与可选的 labels、annotations、resourceVersion、generation；spec：定义用户期望的状态（目标状态），定义清单时为必须字段；status：记录活动对象的当前状态，由系统维护。数据类的资源对象无 spec、status 字段，如 ConfigMaps、Secrets、Endpoints 等。【拓展】apiVersion+kind 组成 TypeMeta，metadata 对应 ObjectMeta，用户编写清单一般省略 status。

**解析**

五个一级字段作用 + 数据类对象无 spec/status。

---


## 实战操作

### 51. 写出使用 dry-run 模拟创建名称空间 dev-test 并导出为 YAML 清单的完整命令，然后写出应用该清单的命令。

**答案**

kubectl create namespace dev-test --dry-run=client -o yaml > dev-test.yaml
kubectl apply -f dev-test.yaml

**解析**

--dry-run=client 本地渲染不提交 apiserver；-o yaml 输出 YAML；apply 应用清单。

---

### 52. 写出查看集群所有 API 版本、查看所有名称空间下全部资源的命令。

**答案**

kubectl api-versions
kubectl get all -A
（查看资源类型：kubectl api-resources，可加 --api-group= 过滤）

**解析**

api-versions 查看 API 版本；get all -A 查看所有名称空间常用资源。

---

### 53. 编写一个最小可用的 Namespace 资源清单 dev-test.yaml，并说明如何应用它。

**答案**

apiVersion: v1
kind: Namespace
metadata:
  name: dev-test
spec: {}
status: {}

应用命令：kubectl apply -f dev-test.yaml，输出 namespace/dev-test created。

**解析**

清单五字段 + kubectl apply -f。

---
