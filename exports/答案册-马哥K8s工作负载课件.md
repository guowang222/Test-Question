# 马哥K8s工作负载课件 —— 答案与解析

> 共 52 题，编号与《试题册-马哥K8s工作负载课件.md》一致。


## K8s工作负载笔试

### 1. 【控制器】在 Kubernetes 声明式 API 中，用户通过资源对象的哪个字段来定义其“期望状态”？

**答案**

**B**　spec

**解析**

声明式 API 中用户定义的是 spec（期望状态），控制器负责让实际 status 不断逼近 spec。

---

### 2. 【控制器】在 Kubernetes 控制平面中，负责根据 API Server 中的规划把 Pod 等实体对象真正“落地”运行的核心组件是？

**答案**

**C**　kube-controller-manager

**解析**

课件把 API Server 比作数据库(DB)，kube-controller-manager 比作 CEO，它根据规划把具体对象落地，并通过控制循环保证 spec 与 status 一致。

---

### 3. 【控制器】节点控制器（Node Controller）每隔多少秒检查一次 Worker 节点的状态？

**答案**

**B**　5 秒

**解析**

节点控制器每间隔 5 秒检查一次 Worker 节点状态；收不到心跳先标记为不可达，再等 40 秒标记无法访问，再等 5 分钟删除其上的 Pod 并重建。

---

### 4. 【控制器】关于控制器与 Pod 的关系，下列说法正确的是？

**答案**

**B**　控制器仅确保 API Server 上存在符合标签选择器数量的 Pod 定义，Pod 的实际状态由相应节点的 kubelet 保证

**解析**

控制器对象仅负责确保 API Server 上有相应数量且符合标签选择器的 Pod 定义；Pod 的 Status 如何与 Spec 一致由节点上的 kubelet 负责。

---

### 5. 【标签】关于 Kubernetes 中的 Label，下列说法正确的是？

**答案**

**B**　Label 是可以附加在各类资源对象上的键值型（key/value）元数据，本身不是独立资源

**解析**

Label 不是独立的 API 资源类型，而是可关联到各种资源对象上的键值型元数据，key 与 value 由用户指定。

---

### 6. 【标签】Label 的 key_name（键名）命名规则中，下列说法正确的是？

**答案**

**B**　由字母、数字、连接号、下划线和点号组成，且只能以字母或数字开头，最长 63 个字符

**解析**

key 格式为 [key_prefix/]key_name，key_name 由字母、数字、连接号、下划线和点号组成，以字母或数字开头，最长 63 字符。

---

### 7. 【标签】使用 kubectl 删除某个资源对象上的标签，正确的写法是？

**答案**

**B**　kubectl label pod p app-

**解析**

将 label_name=label_value 写成 label_name- 即表示删除该标签，例如 kubectl label pod p app-。

---

### 8. 【标签】使用 kubectl 修改一个已经存在的标签的值，必须附加的选项是？

**答案**

**A**　--overwrite

**解析**

默认已存在的标签不能直接修改，需要加 --overwrite=true 强制覆盖，否则会报错。

---

### 9. 【标签选择器】在标签选择器的 matchLabels 中配置多个标签时，它们之间的逻辑关系是？

**答案**

**B**　AND（与）

**解析**

matchLabels 中多个标签之间为逻辑与（AND）关系，只有同时匹配所有标签的资源才会被选中。

---

### 10. 【标签选择器】在 matchExpressions 中使用 Exists 或 NotExists 操作符时，values 字段应如何设置？

**答案**

**B**　必须为空

**解析**

Exists 和 NotExists 只关心标签是否存在，因此对应的 values 必须为空。

---

### 11. 【标签选择器】命令 kubectl get pods -l 'app in (web,nginx)' 的含义是？

**答案**

**B**　匹配 app 的值为 web 或 nginx 的 Pod

**解析**

集合表达式 app in (web,nginx) 表示匹配 app 值为 web 或 nginx 的资源对象（并集）。

---

### 12. 【标签选择器】命令 kubectl get pods -l '!app' 的作用是？

**答案**

**B**　匹配不存在 app 标签的 Pod

**解析**

!app 表示匹配“不存在 app 标签”的 Pod（注意命令行需用单引号，不支持双引号）。

---

### 13. 【RS】ReplicaSet 相对于早期的 ReplicationController，在标签选择器上的主要增强是？

**答案**

**B**　RS 同时支持基于等式和集合的 selector，而 RC 仅支持基于等式（= 和 !=）的选择器

**解析**

RC 只支持基于等式的选择器，RS 额外支持基于集合的选择器（matchExpressions 和 matchLabels），功能更强。

---

### 14. 【RS】关于 ReplicaSet 更新容器镜像，下列说法正确的是？

**答案**

**B**　RS 属于“删除式更新”，更新模板镜像后需手动删除旧 Pod 才会生成使用新镜像的 Pod；Deployment 才是自动更新

**解析**

RC/RS 都是删除式更新，只有手动删除老 Pod，新 Pod 才会使用新模板；Deployment 在模板变更时自动式更新。

---

### 15. 【RS】ReplicaSet 资源清单中用于定义“期望的 Pod 副本数”的核心字段是？

**答案**

**A**　replicas

**解析**

RS 编排无状态应用的三大关键属性为 replicas（期望副本数）、selector（标签选择器）和 template（Pod 模板）。

---

### 16. 【RC】关于已被废弃的 ReplicationController，下列说法错误的是？

**答案**

**C**　删除 RC 会同时删除由其创建的所有 Pod

**解析**

删除 RC 不会影响已创建的 Pod；若想删除所有 Pod 需将 replicas 设为 0，或用 kubectl delete rc 一并删除。

---

### 17. 【Deployment】Deployment 是通过下列哪种资源来间接管理 Pod 的？

**答案**

**B**　ReplicaSet

**解析**

Deployment 不直接管理 Pod，而是借助其自动创建的 ReplicaSet 来编排 Pod；Deployment 编排 RS，RS 编排 Pod。

---

### 18. 【Deployment】Deployment 自动创建的 ReplicaSet 对象的名称是如何生成的？

**答案**

**B**　Deployment 名称 + Pod 模板（template）的 Hash 值

**解析**

ReplicaSet 的名称由 Deployment 名称加上 template 的 Hash 值组成，因此模板变动会生成新的 RS，从而实现滚动更新与回滚。

---

### 19. 【Deployment】Deployment 的字段 revisionHistoryLimit 默认值为多少？设为 0 表示什么？

**答案**

**B**　10，表示不保留历史记录

**解析**

revisionHistoryLimit 默认 10，用于保留可用于回滚的旧 RS 数量；设为 0 表示不保留任何历史记录。

---

### 20. 【Deployment】通过 kubectl describe deployment 查看，Deployment 默认的滚动更新策略（RollingUpdateStrategy）是？

**答案**

**B**　25% max unavailable, 25% max surge

**解析**

默认 RollingUpdateStrategy 为 25% max unavailable, 25% max surge，即更新期间最多各 25% 的 Pod 不可用/超出。

---

### 21. 【Deployment】Deployment 的 spec.strategy.type 可选值不包括以下哪项？

**答案**

**C**　OnDelete

**解析**

Deployment 的 strategy.type 只有 Recreate 和 RollingUpdate 两种；OnDelete 是 DaemonSet 的更新策略类型。

---

### 22. 【Deployment】命令 kubectl rollout undo deployment myapp --to-revision=2 的作用是？

**答案**

**B**　将 Deployment 回退到（指定的）第 2 个版本

**解析**

rollout undo 用于撤销上一次 rollout；加 --to-revision=n 可回退到指定版本（默认回退到前一个版本）。

---

### 23. 【DaemonSet】DaemonSet 的典型适用场景是？

**答案**

**B**　在每个（或符合节点选择器的）节点上运行一个守护进程 Pod，如日志收集、监控、网络插件

**解析**

DaemonSet 让所有（或特定）节点精确运行同一个 Pod，常用于 kube-proxy、flannel/calico、filebeat、node-exporter 等系统级守护进程。

---

### 24. 【DaemonSet】DaemonSet 对象是否支持 kubectl rollout pause 操作？

**答案**

**B**　不支持

**解析**

课件明确指出“daemonsets 对象不支持 pause 动作”；pause/resume 仅 Deployment 支持，可用于灰度发布。

---

### 25. 【Job】Job 中 Pod 的 restartPolicy 可以取哪些值？

**答案**

**B**　Never 或 OnFailure

**解析**

Job 中 Pod 的 restartPolicy 只能为 Never 或 OnFailure，不支持 Always，否则任务会陷入死循环。

---

### 26. 【Job】Job 的 backoffLimit 字段含义及其默认值分别是？

**答案**

**C**　将作业标记为 Failed 之前的重试次数，默认 6

**解析**

backoffLimit 指作业被标记为 Failed 之前的重试次数，默认 6；completions 默认 1，parallelism 默认 1。

---

### 27. 【Job】Job 资源属于哪个 API 群组（apiVersion）？

**答案**

**B**　batch/v1

**解析**

Job 是标准的 API 资源类型，所在群组为 batch/v1；CronJob 同样位于 batch/v1（早期为 batch/v1beta1）。

---

### 28. 【CronJob】CronJob 的并发策略 concurrencyPolicy 不包含以下哪项取值？

**答案**

**D**　Parallel

**解析**

concurrencyPolicy 可选 Allow（允许并发）、Forbid（禁止并发，上一个未完成则跳过）和 Replace（杀掉旧的用新的替代）。

---

### 29. 【CronJob】关于 CronJob 名称长度限制，下列说法正确的是？

**答案**

**A**　CronJob 名称总长度最多 63 字符，系统会自动附加 11 字符，因此用户指定的名称不能超过 52 字符

**解析**

CronJob 名称最长 63 字符，其中系统自动附加 11 个字符，故用户自定义部分不能超过 52 字符。

---

### 30. 【CronJob】CronJob 的 successfulJobsHistoryLimit 与 failedJobsHistoryLimit 默认值分别是？

**答案**

**A**　3 与 1

**解析**

成功作业历史默认保留 3 个，失败作业历史默认保留 1 个；建议把失败历史设稍大以便排查原因。

---

### 31. 【标签】Label 的 key 由可选的 ______ 和必须的 ______ 两部分组成，其中后者由字母、数字、连接号、下划线和点号组成，且只能以字母或数字开头，最长 63 个字符。

**答案**

- 第 1 空：键前缀 / key_prefix / 前缀
- 第 2 空：键名 / key_name / 键

**解析**

key 格式为 [key_prefix/]key_name，键前缀使用 DNS 域名格式且可选，键名才是必填部分。

---

### 32. 【标签选择器】标签选择器的 matchLabels 配置多个标签时它们之间是 ______ 关系；而 matchExpressions 中 Exists/NotExists 操作符对应的 values 字段必须 ______。

**答案**

- 第 1 空：逻辑与 / AND / 与
- 第 2 空：为空 / 空 / 不填写

**解析**

matchLabels 多个标签为 AND 关系；Exists/NotExists 只判断标签是否存在，因此 values 必须留空。【衍生知识点】集合操作符还有 In、NotIn。

---

### 33. 【RS】ReplicaSet 相比早期的 ReplicationController，其标签选择器除了支持基于等式的写法外，还支持基于 ______ 的写法；并且 RS 更新镜像属于“删除式更新”，需要手动 ______ 旧的 Pod 后才会生成使用新镜像的 Pod。

**答案**

- 第 1 空：集合 / 集合选择器 / set / 集合表达式
- 第 2 空：删除 / delete

**解析**

RC 仅支持等式选择器，RS 额外支持集合选择器；RS 更新镜像后必须手动删除旧 Pod 才能生效。

---

### 34. 【Deployment】Deployment 的滚动更新历史记录数量由字段 ______ 控制，其默认值为 ______；当该值设为 0 时表示不保留任何历史记录。

**答案**

- 第 1 空：revisionHistoryLimit
- 第 2 空：10 / 十

**解析**

revisionHistoryLimit 默认 10，保留旧 RS 以便回滚；设为 0 则不保留历史。

---

### 35. 【Deployment】Deployment 默认的滚动更新策略中，maxSurge 的默认值为 ______，maxUnavailable 的默认值为 ______。

**答案**

- 第 1 空：25% / 25
- 第 2 空：25% / 25

**解析**

默认 RollingUpdateStrategy 为 25% max unavailable, 25% max surge；maxSurge/maxUnavailable 可为整数或百分比。

---

### 36. 【DaemonSet】DaemonSet 的更新策略 spec.updateStrategy.type 有两种取值，分别是默认的 ______ 和需要手工删除 Pod 才触发的 ______。

**答案**

- 第 1 空：RollingUpdate / 滚动更新
- 第 2 空：OnDelete / 删除时更新

**解析**

默认 RollingUpdate 自动滚动更新；OnDelete 只有手动删除 Pod 时才更新，生产环境常建议采用。

---

### 37. 【Job】Job 中 Pod 的 restartPolicy 只能取 ______ 或 ______ 两个值，不支持 Always。

**答案**

- 第 1 空：Never
- 第 2 空：OnFailure

**解析**

Job 的 restartPolicy 仅允许 Never 或 OnFailure，避免任务因 Always 而陷入无限重启循环。

---

### 38. 【CronJob】CronJob 的并发策略 concurrencyPolicy 可选值有 Allow、______ 和 ______ 三种。

**答案**

- 第 1 空：Forbid / 禁止
- 第 2 空：Replace / 替换

**解析**

Allow 允许并发；Forbid 在上一个未完成时禁止新任务；Replace 会杀掉旧任务以新任务替代。

---


## K8s工作负载面试

### 39. 【面试】请说明 Kubernetes 中“声明式 API”与“控制循环（Control Loop）”的工作原理，以及 kube-controller-manager 和 kubelet 各自承担的角色。

**答案**

1. 声明式 API：用户通过资源的 spec 字段声明“期望状态”，无需指定如何达成；控制器负责让实际 status 不断逼近 spec。
2. 控制循环：Controller 依据 spec 监视系统状态，在每一轮循环比较 spec 与 status，指挥节点修改资源，使 status 逼近/等于 spec，达成一致后再同步回 etcd。
3. kube-controller-manager：课件把它比作“CEO”，根据 API Server 中的规划把 Pod 等实体对象真正落地，并持续运行各类控制器的控制循环。
4. kubelet：运行在各节点上，负责保证本节点 Pod 的 Status 与 Spec 一致（真正拉起/维持容器）。
【衍生知识点】API Server 只相当于“数据库(DB)”，并提供 watch/notify 机制供控制器监听资源变动。

**解析**

核心是把期望状态与实际状态通过控制循环对齐，并分清控制平面组件与各节点 kubelet 的职责边界。

---

### 40. 【面试】简述 Label（标签）和 Label Selector（标签选择器）的作用，并说明 matchLabels 与 matchExpressions 的区别及常见操作符。

**答案**

1. Label：可附加在任意资源对象上的键值型(key/value)元数据，本身不是独立 API 资源，用于对资源分组、调度、筛选。
2. Label Selector：用于按标签筛选/关联资源，类似于 SQL 的 where 条件，常附加在 RS/Deployment/Service 等对象上。
3. matchLabels：map 格式，多个标签之间为 AND 关系。
4. matchExpressions：表达式列表，多个表达式之间也是 AND；常见 operator 有 In、NotIn、Exists、NotExists；Exists/NotExists 时 values 必须为空。
【衍生知识点】命令行 -l 支持 'app in (a,b)'、'app notin (a,b)'、'!app'（不存在）等集合写法。

**解析**

重点区分等值（=、==、!=）与集合（in、notin、Exists、NotExists）两类算符，以及 matchLabels 与 matchExpressions 的格式差异。

---

### 41. 【面试】ReplicationController 与 ReplicaSet 有何异同？为什么 RS 比 RC 更强大？RC 为何被废弃？

**答案**

1. 相同点：二者都通过 replicas/selector/template 三要素保证指定数量的 Pod 副本存在，是早期的无状态副本控制器。
2. 不同点：RC 的标签选择器仅支持基于等式（=、!=）；RS 额外支持基于集合的选择器（matchLabels、matchExpressions），表达能力更强。
3. 为何更强：集合选择器使 RS 能更灵活地按标签筛选与管理 Pod，从而被更高层的 Deployment 所使用。
4. 废弃原因：RC 是最早期的控制器，名称易与代码模块混淆且选择器功能弱，自 v1.2 起由 RS 取代，现一般直接用 Deployment。

**解析**

抓住“选择器能力差异”这一核心，并说明 RS 是 Deployment 的底层依赖，所以 RC 被淘汰。

---

### 42. 【面试】Deployment 与 ReplicaSet 是什么关系？为什么推荐直接创建 Deployment 而不是直接使用 ReplicaSet？

**答案**

1. 关系：Deployment 建立在 ReplicaSet 之上，是更高层的控制器；它不直接管理 Pod，而是先创建 RS，再由 RS 创建并管理 Pod。
2. RS 名称 = Deployment 名称 + Pod 模板的 Hash 值，因此模板变动会生成新的 RS，旧 RS 保留以便回滚。
3. 推荐用 Deployment 的原因：它在 RS 基础上提供了动态更新、回滚、滚动发布策略（maxSurge/maxUnavailable）等能力；RS 本身只是“删除式更新”，改镜像需手动删 Pod。
4. 通常无需显式配置 ReplicaSet，由 Deployment 自动管理即可。

**解析**

强调 Deployment 是 RS 的“编排工具”，提供更新与回滚，而 RS 负责底层副本管理。

---

### 43. 【面试】Deployment 支持哪些滚动更新策略？说明 Recreate 与 RollingUpdate 的区别，并指出触发 Pod 模板 Hash 变动的条件。

**答案**

1. 两种策略：Recreate（重建式）与 RollingUpdate（滚动式，默认）。
2. Recreate：先删除全部旧 Pod，再用新模板创建新 Pod；期间服务会中断，但可避免端口冲突。
3. RollingUpdate：先创建新 Pod，再逐步替换旧 Pod，整个过程服务基本可用；按百分比或数量分批次进行。
4. 触发条件：仅当 Pod 模板（podTemplate）的 hash 码变动（即 podTemplate 配置变动）才会触发新的滚动更新；replicas 和 selector 的变更不会导致 hash 变动。
【衍生知识点】RollingUpdate 默认 25% max surge / 25% max unavailable。

**解析**

区分两种策略的服务中断差异，并明确“只有 podTemplate 改变才触发滚动更新”。

---

### 44. 【面试】解释 maxSurge 与 maxUnavailable 的含义及默认值，并说明如何通过这两个参数实现“先加后减”“先减后加”以及“蓝绿发布”。

**答案**

1. maxSurge：更新期间可比期望副本数多出的 Pod 数量/比例，默认 25%。
2. maxUnavailable：更新期间最多处于不可用状态的 Pod 数量/比例，默认 25%；当 maxSurge 不为 0 时，maxUnavailable 也不能为 0。
3. 先加后减：maxSurge 为正整数、maxUnavailable=0（先创建新 Pod 再删旧 Pod）。
4. 先减后加：maxSurge=0、maxUnavailable 为正整数（先删旧 Pod 再创建新 Pod）。
5. 蓝绿发布：maxSurge=100% 且 maxUnavailable=100%，新旧两套同时跑完再切换，但资源占用翻倍、需资源充足。
【衍生知识点】RollingUpdate 只能按 Pod 比例控制，无法实现精确流量比例（需 Ingress）。

**解析**

围绕“多出来/不可用”两个维度，组合出不同发布形态，并点出蓝绿对资源的要求。

---

### 45. 【面试】说明 kubectl rollout 的常用子命令（history/undo/pause/resume/status）各自的作用，并解释如何利用 pause+resume 实现灰度（金丝雀）发布。

**答案**

1. history：查看滚动更新历史（默认保留最近 10 个版本），可加 --revision=n 看某版详情。
2. undo：撤销上一次 rollout；--to-revision=n 可回退到指定版本。
3. pause：将 Deployment 标记为暂停（仅 Deployment 支持），期间更新不会继续推进。
4. resume：继续被暂停的 Deployment。
5. status：显示 rollout 的当前状态。
6. 灰度/金丝雀：更新镜像后立即 rollout pause，此时仅少量新 Pod 启动；观察验证无误后再 rollout resume 继续完成更新（也可分批 resume 逐步放大流量）。
【衍生知识点】多次 set 后再 resume，可把多次更新合并为一次 Pod 重建，减少抖动。

**解析**

强调 pause/resume 仅 Deployment 支持，是金丝雀/灰度发布的常用手段。

---

### 46. 【面试】什么是金丝雀发布、滚动发布、蓝绿发布？它们各自的优缺点是什么？

**答案**

1. 金丝雀发布：先放一台/一小批新版本作为“金丝雀”验证，通过后再全量；可用少量用户验证新功能，影响面小，但本质仍是一次性全量、体验不够平滑。
2. 滚动发布：在金丝雀基础上按批次逐步更新，每批都可作金丝雀验证，新旧版本短期共存、资源浪费少、更新效率高、影响范围小。
3. 蓝绿发布：蓝（旧）、绿（新）两套环境同时在生产运行，流量从蓝整体切到绿；可快速回滚，但部署期间资源占用多、适用于小业务，影响范围大。
【衍生知识点】课件对比：蓝绿 vs 滚动——配置文件数 2/2，更新时间长/短，资源需求多/少，访问特点单版本/多版本，部署影响大/小。

**解析**

按“验证范围与资源/风险代价”对比三种发布策略，并结合课件给出的蓝绿/滚动对比表。

---

### 47. 【面试】DaemonSet 的适用场景有哪些？它的更新策略（OnDelete 与 RollingUpdate）有何不同？与 Deployment 相比它为什么不需要指定 replicas？

**答案**

1. 适用场景：需要在所有或符合节点选择器的每个节点上精确运行一个守护进程 Pod，如 kube-proxy、flannel/calico、filebeat/fluentd、node-exporter/Prometheus、Ingress-nginx 等系统级应用。
2. OnDelete：默认不自动更新，只有手工删除 Pod 后才会用新模板重建（生产常建议）。
3. RollingUpdate（默认）：自动滚动更新，先更新一组节点再下一组；其 maxSurge 默认 0、maxUnavailable 默认 1。
4. 不需要 replicas：因为 DaemonSet 的目标副本数由“匹配到的节点数”决定，节点加入/移除集群时 Pod 自动增减，无需人工指定副本数。
【衍生知识点】DaemonSet 不支持 rollout pause；删除 DaemonSet 会级联删除其所有 Pod。

**解析**

突出“每节点一个守护进程”的本质，以及副本数由节点数自动决定的特点。

---

### 48. 【面试】Job 与 Deployment/DaemonSet 的主要区别是什么？说明 completions、parallelism、backoffLimit、activeDeadlineSeconds 字段的含义，并解释为什么 Job 的 restartPolicy 不能是 Always。

**答案**

1. 区别：Deployment/DaemonSet 管理长期持续运行的服务；Job 用于编排有终止期限的一次性任务，Pod 成功完成后状态为 Completed。
2. completions：期望成功完成的作业次数，默认 1。
3. parallelism：最大并行度（同时运行的 Pod 数），默认 1。
4. backoffLimit：作业被标记为 Failed 之前的重试次数，默认 6。
5. activeDeadlineSeconds：作业启动后可处于活动状态的时长上限，超时即终止。
6. restartPolicy 不能为 Always：一次性任务靠 Pod 正常退出表示完成，若 Always 会在失败后无限重启，导致任务无法结束（只能取 Never 或 OnFailure）。
【衍生知识点】Job 还会自动添加 job-name 与 controller-uid 标签，selector 通常无需手填。

**解析**

围绕“一次性任务+完成即停止”展开，重点解释 restartPolicy 限制的原因。

---

### 49. 【面试】Job 的并行度有哪两种类型？给出“串行运行 5 次”和“并行 2 路、总共 6 次”的字段配置示例。

**答案**

1. 两种并行类型：串行 Job（上一个完成后才开始下一个）与并行 Job（多个 Pod 同时运行）。
2. 串行运行 5 次：completions: 5，parallelism: 1。
3. 并行 2 路、总共 6 次：completions: 6，parallelism: 2（若不能整除，最后一次为剩余任务数）。
4. 还可配合 completionMode：Indexed（有序、Pod 名带序号索引）或 NonIndexed（默认无序）。
【衍生知识点】ttlSecondsAfterFinished 可设置完成后作业的存活时长，超时自动清理。

**解析**

用两个具体数字组合说明串行与并行配置，并提 completionMode。

---

### 50. 【面试】CronJob 与 Job 的关系是什么？说明其 schedule 时间表的字段格式、并发策略 concurrencyPolicy 三种取值的含义，以及成功/失败历史保留的默认值。

**答案**

1. 关系：CronJob 建立在 Job 之上，是更高层控制器；它按时间表周期性地创建并运行 Job，一个 CronJob 对应 crontab 的一行。
2. schedule 字段格式（标准 5 字段，与 Linux crontab 相同）：分钟(0-59) 小时(0-23) 日(1-31) 月(1-12) 周(0-6)，还支持 @yearly/@monthly/@weekly/@daily/@hourly 等宏。
3. concurrencyPolicy：Allow 允许上一个未完成就启动新的；Forbid 禁止并发（上一个未完成则跳过本次）；Replace 杀掉旧任务以新任务替代。
4. 历史保留：successfulJobsHistoryLimit 默认 3，failedJobsHistoryLimit 默认 1；删除 CronJob 会级联删除相关 Job 与 Pod。
【衍生知识点】CronJob 名称总长最多 63 字符，系统附加 11 字符，用户自定义部分不超过 52 字符；未指定时区时基于 kube-controller-manager 本地时区解释排期。

**解析**

强调 CronJob=Job+时间调度，并答全 schedule 字段顺序与并发策略、历史默认值。

---

### 51. 【面试】节点控制器（Node Controller）发现 Worker 节点故障后的处理流程是怎样的（包含各阶段的时间阈值）？

**答案**

1. 节点控制器每间隔 5 秒检查一次 Worker 节点的状态。
2. 若未收到某 Worker 节点心跳，先将其标记为“不可达（Unreachable）”。
3. 标记为不可达后，再等待 40 秒仍无心跳，将其标记为“无法访问（NotReady/Unknown）”。
4. 标记为无法访问后，再等待 5 分钟仍未收到心跳，节点控制器会删除该节点上的所有 Pod，并在其它可用节点上重建这些 Pod。
【衍生知识点】该机制保证了节点级故障下 Pod 副本数最终仍符合控制器的期望状态。

**解析**

按“5 秒→40 秒→5 分钟”三个时间阈值描述节点故障的逐级处理。

---

### 52. 【面试】Kubernetes 内置了哪些主要的工作负载资源？分别适用于什么类型的应用（无状态/有状态/系统级/作业类）？当前它们主要位于哪个 API 版本组？

**答案**

1. 无状态应用：Deployment 与 ReplicaSet（取代早期 ReplicationController），适合互相等价、可随时替换的 Pod。
2. 有状态应用：StatefulSet，Pod 有序部署、具备稳定标识，用于需持久化/稳定网络标识的场景。
3. 系统级应用：DaemonSet，在每个/特定节点运行一个守护进程 Pod（日志、监控、网络插件等）。
4. 作业类应用：Job（一次性任务）与 CronJob（周期性任务）。
5. API 版本组：主要位于 apps/v1（Deployment/RS/DaemonSet/StatefulSet）；Job/CronJob 位于 batch/v1；早期 extensions/v1beta1 等版本已被替换。
【衍生知识点】还可通过 CRD 引入第三方工作负载资源。

**解析**

按四类应用归类控制器，并指出 apps/v1 与 batch/v1 的版本归属。

---
