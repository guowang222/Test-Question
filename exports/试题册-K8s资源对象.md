# K8s资源对象 —— 试题册

> 共 53 题。答案与解析见《答案册-K8s资源对象.md》。


## MD导入

### 1. 下列资源中，在 Kubernetes 中（　）独立 API 资源类型，需要依附其它资源存在。

- **A.** Pod
- **B.** Service
- **C.** Label
- **D.** Deployment

### 2. 命令式 API 与声明式 API 的区别，描述正确的是（　）。

- **A.** 声明式 API 需要一步步告诉机器如何做
- **B.** 命令式 API 只需告诉机器想要的结果
- **C.** 声明式 API 只需告诉机器想要的结果，机器自身确定如何达成目标
- **D.** 两者没有区别

### 3. metadata 为资源提供元数据；spec 字段用于定义用户________的状态；status 字段记录活动对象的________状态信息。

> 共 2 个空。

### 4. apiVersion 的格式为"________/版本名"，主要有 alpha、________、stable 三种稳定性阶段。

> 共 2 个空。

### 5. 指定当前对象所属名称空间的 metadata 字段是________，默认值为________。

> 共 2 个空。

### 6. 写出使用 dry-run 模拟创建名称空间 `dev-test` 并导出为 YAML 清单的完整命令。

### 7. 编写一个最小可用的 Namespace 资源清单 `dev-test.yaml` 并说明如何应用它。


## 资源与API基础

### 8. Kubernetes 系统将一切事物都称为（　），这种思想类似于面向对象思想。

- **A.** 容器
- **B.** 资源对象
- **C.** 进程
- **D.** 服务

### 9. Kubernetes 的 API 资源遵循（　）风格组织并管理。

- **A.** RPC
- **B.** SOAP
- **C.** REST
- **D.** GraphQL

### 10. 下列（　）组 HTTP 方法可用于对 API 资源进行增、删、改、查。

- **A.** GET、POST、FTP
- **B.** POST、PUT、PATCH、DELETE、GET
- **C.** GET、SET、DEL
- **D.** CONNECT、TRACE

### 11. 下列资源中，（　）在 Kubernetes 中没有独立 API 资源类型，需要依附其它资源存在。

- **A.** Pod
- **B.** Service
- **C.** Label
- **D.** Deployment

### 12. 用户自定义的 API 资源称为（　）。

- **A.** CRD
- **B.** CRI
- **C.** CSI
- **D.** CNI

### 13. Kubernetes 设计资源对象的核心目的是（　）。

- **A.** 管理网络流量
- **B.** 更好地运行和管理 Pod 资源
- **C.** 存储数据
- **D.** 监控集群


## 资源分类

### 14. 按功能划分，下列不属于 Kubernetes 资源分类的是（　）。

- **A.** 工作负载（workloads）
- **B.** 服务发现和负载均衡
- **C.** 编译构建
- **D.** 集群管理（Cluster Admin）

### 15. Kubernetes 资源按适用范围可分为（　）。

- **A.** 名称空间级别、集群级别、元数据级别
- **B.** 全局级别、局部级别
- **C.** 用户级别、系统级别
- **D.** 节点级别、容器级别


## 常用命令

### 16. kubectl 查看集群中所有 API 资源类型的命令是（　）。

- **A.** kubectl get api
- **B.** kubectl api-resources
- **C.** kubectl show resources
- **D.** kubectl describe api

### 17. 查看 apps 这个 API 群组下有哪些资源的命令是（　）。

- **A.** kubectl api-resources --api-group=apps
- **B.** kubectl get apps
- **C.** kubectl describe group apps
- **D.** kubectl api-versions apps


## 工作负载资源

### 18. Kubernetes 中最小的部署组成部分是（　），它与 pause 容器共享网络栈和存储卷。

- **A.** Container
- **B.** Pod
- **C.** Node
- **D.** Service

### 19. 通过标签选择器（label selector）控制 Pod 副本数的控制器资源是（　）。

- **A.** Job
- **B.** ReplicaSet
- **C.** DaemonSet
- **D.** CronJob

### 20. Deployment 创建 Pod 的方式是（　）。

- **A.** 直接创建 Pod
- **B.** 通过控制 ReplicaSet 的创建去创建 Pod
- **C.** 通过 Node 创建
- **D.** 通过 Service 创建

### 21. 主要面向有状态服务的管理器资源是（　）。

- **A.** Deployment
- **B.** StatefulSet
- **C.** DaemonSet
- **D.** ReplicationController

### 22. 可以在集群每个（匹配的）节点上都运行一个 Pod 副本的组件是（　）。

- **A.** Deployment
- **B.** ReplicaSet
- **C.** DaemonSet
- **D.** StatefulSet

### 23. 用于批处理任务、执行一次即退出的资源是（　）；轮询（定时）执行的批处理任务资源是（　）。

- **A.** CronJob；Job
- **B.** Job；CronJob
- **C.** Job；DaemonSet
- **D.** Pod；CronJob


## 配置与存储

### 24. 当配置中心使用、支持配置文件热更新的资源是（　）。

- **A.** Secret
- **B.** ConfigMap
- **C.** DownwardAPI
- **D.** Volume

### 25. 以加密方案存储数据，可保存密码、密钥、证书等敏感信息的资源是（　）。

- **A.** ConfigMap
- **B.** Secret
- **C.** PV
- **D.** Label


## 元数据资源

### 26. 属于元数据级别（负责提供一种指标/模板）的资源是（　）。

- **A.** HPA
- **B.** Namespace
- **C.** Node
- **D.** Secret


## API设计理念

### 27. 关于命令式 API 与声明式 API，描述正确的是（　）。

- **A.** 声明式 API 需要一步步告诉机器如何做
- **B.** 命令式 API 只需告诉机器想要的结果
- **C.** 声明式 API 只需告诉机器想要的结果，机器自身确定如何达成目标
- **D.** 两者没有区别


## 资源与API基础

### 28. Kubernetes 的 API 资源分为两种：内置 API 资源和________（Custom Resource Definition）。

> 共 1 个空。


## API组织形式

### 29. 资源类型的 URL 格式为"________/VERSION/RESOURCE"，例如 /apps/v1/deployments。

> 共 1 个空。

### 30. 隶属于同一资源类型的对象组成的列表称为________（如 PodList）。

> 共 1 个空。


## 资源清单格式

### 31. Kubernetes API 只接受及响应________格式的数据对象，为方便使用提供了 YAML 格式的 POST 对象。

> 共 1 个空。

### 32. 大部分资源对象需要三个嵌套字段：________、spec、________。

> 共 2 个空。

### 33. YAML 使用________表示层级关系，缩进时不允许使用________，只允许使用空格。

> 共 2 个空。

### 34. YAML 中以________开始的内容为注释。

> 共 1 个空。

### 35. 资源配置清单第一级字段一般包括 apiVersion、________、metadata、spec、status 五个字段。

> 共 1 个空。

### 36. apiVersion 的格式为"________/版本名"，主要有 alpha、________、stable 三种版本阶段。

> 共 2 个空。


## metadata字段

### 37. metadata 必选字段包括 name、________ 和________（系统自动生成，用于区分已删除又重新创建的同名对象）。

> 共 2 个空。

### 38. labels 是键值数据，常用作________的挑选条件；annotation 是非标识型键值数据，是 labels 的补充，________（支持/不支持）标签选择器的选择。

> 共 2 个空。


## 常用命令

### 39. 查看资源配置清单格式帮助的命令是 kubectl ________ TYPE_NAME。

> 共 1 个空。

### 40. 利用指令式命令模拟生成清单文件，可以使用选项________=client -o yaml；应用清单文件的命令是 kubectl ________ -f 文件名。

> 共 2 个空。


## spec与status

### 41. 定义资源配置清单时，________ 是必须的字段，用于描述对象的________状态。

> 共 2 个空。

### 42. 数据类的资源对象无 spec、status 字段，例如：________、________、endpoints 等。

> 共 2 个空。


## 资源与API基础

### 43. 简述 Kubernetes 中"资源"与"对象"的关系。


## 资源分类

### 44. 简述 Kubernetes 资源按功能划分的六大类别，并各举至少一个代表性资源。

### 45. 请分别写出名称空间级别、集群级别、元数据级别资源的含义，并各举两例资源。


## 工作负载资源

### 46. 列出至少 5 种工作负载型资源及其用途。


## 配置与存储

### 47. ConfigMap、Secret、DownwardAPI 各自的作用是什么？


## API设计理念

### 48. 简述命令式 API 与声明式 API 的区别，并说明 Kubernetes 采用了哪种方式。

### 49. 请列举至少 5 条 Kubernetes API 的设计原则。


## 资源清单格式

### 50. 说明资源配置清单中 apiVersion、kind、metadata、spec、status 五个一级字段的作用，并指出哪些资源对象没有 spec/status 字段。


## 实战操作

### 51. 写出使用 dry-run 模拟创建名称空间 dev-test 并导出为 YAML 清单的完整命令，然后写出应用该清单的命令。

### 52. 写出查看集群所有 API 版本、查看所有名称空间下全部资源的命令。

### 53. 编写一个最小可用的 Namespace 资源清单 dev-test.yaml，并说明如何应用它。
