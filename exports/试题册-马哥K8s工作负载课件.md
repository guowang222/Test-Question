# 马哥K8s工作负载课件 —— 试题册

> 共 52 题。答案与解析见《答案册-马哥K8s工作负载课件.md》。


## K8s工作负载笔试

### 1. 【控制器】在 Kubernetes 声明式 API 中，用户通过资源对象的哪个字段来定义其“期望状态”？

- **A.** status
- **B.** spec
- **C.** metadata
- **D.** selector

### 2. 【控制器】在 Kubernetes 控制平面中，负责根据 API Server 中的规划把 Pod 等实体对象真正“落地”运行的核心组件是？

- **A.** kube-apiserver
- **B.** etcd
- **C.** kube-controller-manager
- **D.** kube-scheduler

### 3. 【控制器】节点控制器（Node Controller）每隔多少秒检查一次 Worker 节点的状态？

- **A.** 1 秒
- **B.** 5 秒
- **C.** 10 秒
- **D.** 40 秒

### 4. 【控制器】关于控制器与 Pod 的关系，下列说法正确的是？

- **A.** 控制器直接负责把每个 Pod 的 status 字段与 spec 保持一致
- **B.** 控制器仅确保 API Server 上存在符合标签选择器数量的 Pod 定义，Pod 的实际状态由相应节点的 kubelet 保证
- **C.** 控制器必须修改 Pod 的 status 字段才能完成编排
- **D.** 控制器无法感知节点故障

### 5. 【标签】关于 Kubernetes 中的 Label，下列说法正确的是？

- **A.** Label 是一种独立的 API 资源类型
- **B.** Label 是可以附加在各类资源对象上的键值型（key/value）元数据，本身不是独立资源
- **C.** Label 只能附加在 Pod 上
- **D.** Label 由系统自动生成，用户不能自定义

### 6. 【标签】Label 的 key_name（键名）命名规则中，下列说法正确的是？

- **A.** 必须以中划线开头
- **B.** 由字母、数字、连接号、下划线和点号组成，且只能以字母或数字开头，最长 63 个字符
- **C.** 长度无限制
- **D.** 只能包含小写字母

### 7. 【标签】使用 kubectl 删除某个资源对象上的标签，正确的写法是？

- **A.** kubectl label pod p app=
- **B.** kubectl label pod p app-
- **C.** kubectl label pod p -app
- **D.** kubectl delete label app

### 8. 【标签】使用 kubectl 修改一个已经存在的标签的值，必须附加的选项是？

- **A.** --overwrite
- **B.** --force
- **C.** --replace
- **D.** --update

### 9. 【标签选择器】在标签选择器的 matchLabels 中配置多个标签时，它们之间的逻辑关系是？

- **A.** OR（或）
- **B.** AND（与）
- **C.** XOR（异或）
- **D.** 无关系、随机匹配

### 10. 【标签选择器】在 matchExpressions 中使用 Exists 或 NotExists 操作符时，values 字段应如何设置？

- **A.** 必须填写至少一个值
- **B.** 必须为空
- **C.** 必须为通配符 *
- **D.** 可填写任意值

### 11. 【标签选择器】命令 kubectl get pods -l 'app in (web,nginx)' 的含义是？

- **A.** 匹配 app 等于 web 且等于 nginx 的 Pod
- **B.** 匹配 app 的值为 web 或 nginx 的 Pod
- **C.** 匹配没有 app 标签的 Pod
- **D.** 匹配 app 不等于 web 和 nginx 的 Pod

### 12. 【标签选择器】命令 kubectl get pods -l '!app' 的作用是？

- **A.** 匹配 app 标签值为空的 Pod
- **B.** 匹配不存在 app 标签的 Pod
- **C.** 删除 app 标签
- **D.** 匹配存在 app 标签的 Pod

### 13. 【RS】ReplicaSet 相对于早期的 ReplicationController，在标签选择器上的主要增强是？

- **A.** RS 只支持基于等式的选择器
- **B.** RS 同时支持基于等式和集合的 selector，而 RC 仅支持基于等式（= 和 !=）的选择器
- **C.** RS 完全不支持标签选择器
- **D.** RS 的 selector 只能在命令行指定

### 14. 【RS】关于 ReplicaSet 更新容器镜像，下列说法正确的是？

- **A.** RS 更新镜像后 Pod 会自动滚动更新
- **B.** RS 属于“删除式更新”，更新模板镜像后需手动删除旧 Pod 才会生成使用新镜像的 Pod；Deployment 才是自动更新
- **C.** RS 不支持更新镜像
- **D.** RS 更新镜像后会立即全部替换所有 Pod

### 15. 【RS】ReplicaSet 资源清单中用于定义“期望的 Pod 副本数”的核心字段是？

- **A.** replicas
- **B.** count
- **C.** scale
- **D.** template

### 16. 【RC】关于已被废弃的 ReplicationController，下列说法错误的是？

- **A.** 它是 Kubernetes 最早期的 Pod 控制器，已被 ReplicaSet 替代
- **B.** 其标签选择器仅支持基于等式（= 和 !=）
- **C.** 删除 RC 会同时删除由其创建的所有 Pod
- **D.** 删除 RC 并不会影响已经由其创建好的 Pod（除非显式删除）

### 17. 【Deployment】Deployment 是通过下列哪种资源来间接管理 Pod 的？

- **A.** 直接管理 Pod，不经过其它控制器
- **B.** ReplicaSet
- **C.** StatefulSet
- **D.** DaemonSet

### 18. 【Deployment】Deployment 自动创建的 ReplicaSet 对象的名称是如何生成的？

- **A.** 随机 UUID
- **B.** Deployment 名称 + Pod 模板（template）的 Hash 值
- **C.** Deployment 名称 + 时间戳
- **D.** 与 Deployment 同名

### 19. 【Deployment】Deployment 的字段 revisionHistoryLimit 默认值为多少？设为 0 表示什么？

- **A.** 5，表示不限制历史
- **B.** 10，表示不保留历史记录
- **C.** 10，表示保留全部历史
- **D.** 3，表示不保留历史

### 20. 【Deployment】通过 kubectl describe deployment 查看，Deployment 默认的滚动更新策略（RollingUpdateStrategy）是？

- **A.** 50% max unavailable, 50% max surge
- **B.** 25% max unavailable, 25% max surge
- **C.** 100% max unavailable, 0% max surge
- **D.** 0% max unavailable, 100% max surge

### 21. 【Deployment】Deployment 的 spec.strategy.type 可选值不包括以下哪项？

- **A.** Recreate
- **B.** RollingUpdate
- **C.** OnDelete
- **D.** 以上 OnDelete 并非 Deployment 的 strategy.type

### 22. 【Deployment】命令 kubectl rollout undo deployment myapp --to-revision=2 的作用是？

- **A.** 删除第 2 个历史版本
- **B.** 将 Deployment 回退到（指定的）第 2 个版本
- **C.** 查看第 2 个版本的详细信息
- **D.** 把当前版本重新编号为第 2 个版本

### 23. 【DaemonSet】DaemonSet 的典型适用场景是？

- **A.** 运行有状态数据库主节点
- **B.** 在每个（或符合节点选择器的）节点上运行一个守护进程 Pod，如日志收集、监控、网络插件
- **C.** 运行一次性批处理任务
- **D.** 按固定时间表周期性运行任务

### 24. 【DaemonSet】DaemonSet 对象是否支持 kubectl rollout pause 操作？

- **A.** 支持
- **B.** 不支持
- **C.** 仅在新版本支持
- **D.** 需要额外的插件

### 25. 【Job】Job 中 Pod 的 restartPolicy 可以取哪些值？

- **A.** Always
- **B.** Never 或 OnFailure
- **C.** OnFailure 或 Always
- **D.** 可以为任意值

### 26. 【Job】Job 的 backoffLimit 字段含义及其默认值分别是？

- **A.** 期望成功完成的作业次数，默认 1
- **B.** 作业启动后可处于活动状态的时长，默认 6
- **C.** 将作业标记为 Failed 之前的重试次数，默认 6
- **D.** 最大并行度，默认 6

### 27. 【Job】Job 资源属于哪个 API 群组（apiVersion）？

- **A.** apps/v1
- **B.** batch/v1
- **C.** v1
- **D.** extensions/v1beta1

### 28. 【CronJob】CronJob 的并发策略 concurrencyPolicy 不包含以下哪项取值？

- **A.** Allow
- **B.** Forbid
- **C.** Replace
- **D.** Parallel

### 29. 【CronJob】关于 CronJob 名称长度限制，下列说法正确的是？

- **A.** CronJob 名称总长度最多 63 字符，系统会自动附加 11 字符，因此用户指定的名称不能超过 52 字符
- **B.** 用户指定的名称最多 63 字符
- **C.** 名称无长度限制
- **D.** 系统不附加字符，用户名称可达 63 字符

### 30. 【CronJob】CronJob 的 successfulJobsHistoryLimit 与 failedJobsHistoryLimit 默认值分别是？

- **A.** 3 与 1
- **B.** 1 与 3
- **C.** 10 与 10
- **D.** 0 与 0

### 31. 【标签】Label 的 key 由可选的 ______ 和必须的 ______ 两部分组成，其中后者由字母、数字、连接号、下划线和点号组成，且只能以字母或数字开头，最长 63 个字符。

> 共 2 个空。

### 32. 【标签选择器】标签选择器的 matchLabels 配置多个标签时它们之间是 ______ 关系；而 matchExpressions 中 Exists/NotExists 操作符对应的 values 字段必须 ______。

> 共 2 个空。

### 33. 【RS】ReplicaSet 相比早期的 ReplicationController，其标签选择器除了支持基于等式的写法外，还支持基于 ______ 的写法；并且 RS 更新镜像属于“删除式更新”，需要手动 ______ 旧的 Pod 后才会生成使用新镜像的 Pod。

> 共 2 个空。

### 34. 【Deployment】Deployment 的滚动更新历史记录数量由字段 ______ 控制，其默认值为 ______；当该值设为 0 时表示不保留任何历史记录。

> 共 2 个空。

### 35. 【Deployment】Deployment 默认的滚动更新策略中，maxSurge 的默认值为 ______，maxUnavailable 的默认值为 ______。

> 共 2 个空。

### 36. 【DaemonSet】DaemonSet 的更新策略 spec.updateStrategy.type 有两种取值，分别是默认的 ______ 和需要手工删除 Pod 才触发的 ______。

> 共 2 个空。

### 37. 【Job】Job 中 Pod 的 restartPolicy 只能取 ______ 或 ______ 两个值，不支持 Always。

> 共 2 个空。

### 38. 【CronJob】CronJob 的并发策略 concurrencyPolicy 可选值有 Allow、______ 和 ______ 三种。

> 共 2 个空。


## K8s工作负载面试

### 39. 【面试】请说明 Kubernetes 中“声明式 API”与“控制循环（Control Loop）”的工作原理，以及 kube-controller-manager 和 kubelet 各自承担的角色。

### 40. 【面试】简述 Label（标签）和 Label Selector（标签选择器）的作用，并说明 matchLabels 与 matchExpressions 的区别及常见操作符。

### 41. 【面试】ReplicationController 与 ReplicaSet 有何异同？为什么 RS 比 RC 更强大？RC 为何被废弃？

### 42. 【面试】Deployment 与 ReplicaSet 是什么关系？为什么推荐直接创建 Deployment 而不是直接使用 ReplicaSet？

### 43. 【面试】Deployment 支持哪些滚动更新策略？说明 Recreate 与 RollingUpdate 的区别，并指出触发 Pod 模板 Hash 变动的条件。

### 44. 【面试】解释 maxSurge 与 maxUnavailable 的含义及默认值，并说明如何通过这两个参数实现“先加后减”“先减后加”以及“蓝绿发布”。

### 45. 【面试】说明 kubectl rollout 的常用子命令（history/undo/pause/resume/status）各自的作用，并解释如何利用 pause+resume 实现灰度（金丝雀）发布。

### 46. 【面试】什么是金丝雀发布、滚动发布、蓝绿发布？它们各自的优缺点是什么？

### 47. 【面试】DaemonSet 的适用场景有哪些？它的更新策略（OnDelete 与 RollingUpdate）有何不同？与 Deployment 相比它为什么不需要指定 replicas？

### 48. 【面试】Job 与 Deployment/DaemonSet 的主要区别是什么？说明 completions、parallelism、backoffLimit、activeDeadlineSeconds 字段的含义，并解释为什么 Job 的 restartPolicy 不能是 Always。

### 49. 【面试】Job 的并行度有哪两种类型？给出“串行运行 5 次”和“并行 2 路、总共 6 次”的字段配置示例。

### 50. 【面试】CronJob 与 Job 的关系是什么？说明其 schedule 时间表的字段格式、并发策略 concurrencyPolicy 三种取值的含义，以及成功/失败历史保留的默认值。

### 51. 【面试】节点控制器（Node Controller）发现 Worker 节点故障后的处理流程是怎样的（包含各阶段的时间阈值）？

### 52. 【面试】Kubernetes 内置了哪些主要的工作负载资源？分别适用于什么类型的应用（无状态/有状态/系统级/作业类）？当前它们主要位于哪个 API 版本组？
