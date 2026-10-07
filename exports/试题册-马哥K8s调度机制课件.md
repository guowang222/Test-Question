# 马哥K8s调度机制课件 —— 试题册

> 共 46 题。答案与解析见《答案册-马哥K8s调度机制课件.md》。


## K8s调度机制笔试

### 1. 【调度】kube-scheduler 的主要职责是？

- **A.** 监听 API Server 中尚未分配节点的 Pod，并为其挑选一个最佳运行节点
- **B.** 负责根据 etcd 中的变更直接创建 Pod 容器
- **C.** 管理节点上容器的生命周期（由 kubelet 负责，而非 scheduler）
- **D.** 为用户提供 kubectl 命令行接口

### 2. 【调度】当集群中没有任何节点能满足 Pod 的资源需求时，该 Pod 会处于什么状态？

- **A.** Running
- **B.** Succeeded
- **C.** Pending
- **D.** Failed

### 3. 【调度】Kubernetes 传统调度模型分为预选和优选两个阶段，若多个节点优选得分相同，最终如何选定？

- **A.** 由集群管理员手动指定
- **B.** 从中随机选择一个节点
- **C.** 优先选择 CPU 占用最低的节点
- **D.** 直接调度失败并报错

### 4. 【预选】关于预选（Predicates）阶段，下列说法正确的是？

- **A.** 只要有一个预选算法不满足，该 Pod 就不能被调度至该节点
- **B.** 预选用于给候选节点打分并选择最优
- **C.** 所有节点都必须通过全部预选算法，否则 Pod 立即被删除
- **D.** 预选阶段可配置权重影响最终选择

### 5. 【优选】LeastRequestedPriority 与 MostRequestedPriority 的主要区别是？

- **A.** 前者优先把 Pod 打散到各节点，后者优先把 Pod 堆叠到部分节点
- **B.** 前者仅考虑内存，后者仅考虑 CPU
- **C.** 前者用于硬亲和，后者用于软亲和
- **D.** 两者没有任何区别，只是名字不同

### 6. 【优选】BalancedResourceAllocation 优选函数的作用是？

- **A.** 选择 CPU 与内存占用率最接近（最均衡）的节点，且需与 LeastRequestedPriority 配合使用
- **B.** 单独使用即可实现最优调度
- **C.** 优先选择与 Pod 镜像相同的节点
- **D.** 根据节点名称字典序打分

### 7. 【框架】Kubernetes 引入新的调度框架（Scheduler Framework）的版本是？

- **A.** 1.14
- **B.** 1.18
- **C.** 1.22
- **D.** 1.25

### 8. 【框架】以下哪一项不属于 Scheduler Framework 的调度阶段？

- **A.** Pre-filter（预过滤）
- **B.** Filter（过滤）
- **C.** Score（打分）
- **D.** Compile（编译）

### 9. 【框架】如果默认调度器不满足需求，可通过哪个字段指定使用自定义调度器？

- **A.** pod.spec.schedulerName
- **B.** pod.spec.nodeName
- **C.** pod.spec.nodeSelector
- **D.** pod.spec.affinity

### 10. 【节点】关于 nodeName 与 nodeSelector，下列说法正确的是？

- **A.** nodeName 直接指定节点名称，可以忽略节点污点；nodeSelector 不能忽略污点
- **B.** nodeSelector 可以忽略节点污点，nodeName 不能
- **C.** 两者都会在调度后持续生效，节点标签变化会驱逐 Pod
- **D.** nodeName 与 nodeSelector 都不能指定多个条件

### 11. 【节点】nodeSelector 指定了多个标签条件时，节点需要满足什么关系才能被调度？

- **A.** 或（OR）关系，满足其一即可
- **B.** 与（AND）关系，节点必须同时拥有所有标签
- **C.** 任意两个标签满足即可
- **D.** 节点不能有这些标签

### 12. 【节点】nodeSelector 将一个 Pod 调度至某节点后，运维人员随后删除了该节点的匹配标签，已运行的 Pod 会怎样？

- **A.** 立即被驱逐
- **B.** 保持在原节点继续运行，因为只在调度时有效
- **C.** 被自动迁移到其他节点
- **D.** 变为 Pending 状态

### 13. 【亲和性】节点硬亲和使用的字段是？

- **A.** preferredDuringSchedulingIgnoredDuringExecution
- **B.** requiredDuringSchedulingIgnoredDuringExecution
- **C.** requiredDuringExecutionIgnoredDuringScheduling
- **D.** preferredDuringExecutionIgnoredDuringScheduling

### 14. 【亲和性】节点软亲和（preferredDuringSchedulingIgnoredDuringExecution）中用于设置倾向权重的字段取值范围是？

- **A.** 0-1
- **B.** 1-100
- **C.** 1-1000
- **D.** 0-10000

### 15. 【亲和性】matchExpressions 支持的操作符不包括以下哪一项？

- **A.** In
- **B.** NotIn
- **C.** Exists
- **D.** Equal

### 16. 【亲和性】在节点硬亲和的 nodeSelectorTerms 中，如果定义了多个 matchExpressions 列表项，这些列表项之间是何关系？

- **A.** AND（与）关系，必须全部满足
- **B.** OR（或）关系，满足其中一个即可调度
- **C.** 互斥关系，不能同时存在
- **D.** 权重叠加关系

### 17. 【亲和性】节点亲和字段中的 "IgnoredDuringExecution" 含义是？

- **A.** 调度时忽略亲和规则
- **B.** Pod 运行期间节点标签变化导致不满足亲和时，仍继续运行该 Pod
- **C.** 执行期间忽略所有污点
- **D.** 表示该规则永不生效

### 18. 【亲和性】Pod 亲和性（podAffinity）硬亲和中，以下哪项是必填项？

- **A.** namespaces 必须指定
- **B.** topologyKey 必填且不能为空
- **C.** weight 必填
- **D.** matchFields 必填

### 19. 【亲和性】Pod 软亲和（preferredDuringSchedulingIgnoredDuringExecution）中，与权重关联、用于描述亲和选项的必填字段是？

- **A.** labelSelector
- **B.** podAffinityTerm
- **C.** topologyKey
- **D.** namespaces

### 20. 【反亲和】Pod 反亲和性（podAntiAffinity）常用于以下哪种场景？

- **A.** 将相互依赖的服务部署到同一节点
- **B.** 避免单点故障，将冗余副本分散到不同位置（拓扑域）
- **C.** 强制把所有 Pod 集中到 Master 节点
- **D.** 忽略所有污点

### 21. 【拓扑】topologyKey 的默认常用值是？

- **A.** kubernetes.io/os
- **B.** kubernetes.io/hostname
- **C.** beta.kubernetes.io/arch
- **D.** node.kubernetes.io/instance-type

### 22. 【污点】关于污点（Taint）的三个 effect，下列说法错误的是？

- **A.** NoSchedule 是强制约束，影响新 Pod，不影响已运行 Pod
- **B.** PreferNoSchedule 是柔性约束，尽量不调度不能容忍的 Pod
- **C.** NoExecute 可能导致已运行的不容忍 Pod 被驱逐
- **D.** NoSchedule 会立即驱逐节点上已有的不兼容 Pod

### 23. 【污点】容忍度（tolerations）中 operator 为 Exists 时，下列说法正确的是？

- **A.** key、value、effect 三者必须完全匹配
- **B.** 只需 key 和 effect 匹配，value 无需定义；若 key 为空则表示容忍所有污点
- **C.** 必须为 Equal 且 value 必填
- **D.** Exists 不能用于 DaemonSet

### 24. 【污点】在 Pod 上定义容忍度且 operator 为 Equal，则必须与污点的哪些字段完全匹配才能容忍？

- **A.** 仅 key
- **B.** key 和 effect
- **C.** key、value、effect 三者
- **D.** 仅 value

### 25. 【污点】为节点 node1 添加污点 key=dedicated、value=gpu、effect=NoSchedule 的正确命令是？

- **A.** kubectl taint node node1 dedicated=gpu:NoSchedule
- **B.** kubectl taint nodes node1 dedicated=gpu NoSchedule
- **C.** kubectl label node node1 dedicated=gpu:NoSchedule
- **D.** kubectl taint node node1 dedicated:gpu:NoSchedule

### 26. 【污点】执行 kubectl cordon <node> 会在节点上添加哪种污点？

- **A.** node.kubernetes.io/unreachable:NoExecute
- **B.** node.kubernetes.io/unschedulable:NoSchedule
- **C.** node.kubernetes.io/memory-pressure:NoSchedule
- **D.** node-role.kubernetes.io/master:NoSchedule

### 27. 【拓扑】拓扑分布约束 topologySpreadConstraints 中，______ 表示允许的最大不均衡程度（默认值为 1），______ 在约束无法满足时决定妥协策略（默认值为 DoNotSchedule）。

> 共 2 个空。

### 28. 【污点】污点的三个 effect 分别是 ______、______ 和 ______，其中只有 ______ 会对节点上已运行且不容忍的 Pod 产生驱逐影响。

> 共 4 个空。

### 29. 【污点】容忍度的两种 operator 分别是 ______（默认，要求 key/value/effect 完全匹配）和 ______（只需 key/effect 匹配，value 可省略）。

> 共 2 个空。

### 30. 【驱逐】节点压力驱逐中，kubelet 默认的硬驱逐阈值包括 memory.available<______、nodefs.available<______、imagefs.available<______ 以及 nodefs.inodesFree<5%（Linux）。

> 共 3 个空。

### 31. 【驱逐】节点压力驱逐时，QoS 三档 Pod 被驱逐的先后顺序是先 ______，再 ______，最后 ______（最难被驱逐）。

> 共 3 个空。

### 32. 【优先级】PriorityClass 中用于指定优先级数值的字段是 ______，在同一集群中最多只能有一个 PriorityClass 将其设为 true 的字段是 ______。

> 共 2 个空。

### 33. 【优先级】用户可定义的最大优先级 HighestUserDefinablePriority 为 ______，系统关键优先级 SystemCriticalPriority 为 ______（约 2×10^9）。

> 共 2 个空。

### 34. 【框架】Scheduler Framework 将调度过程拆分为多个可插拔阶段，其中在正式过滤前做初始化的是 ______，对节点打分的是 ______，将 Pod 绑定到节点的最后一步是 ______。

> 共 3 个空。


## K8s调度机制面试

### 35. 【面试】请说明 Kubernetes 传统调度模型与新型调度框架（Scheduler Framework）的区别。

### 36. 【面试】简述预选（Predicates）和优选（Priorities）的作用，并举出至少三个预选和三个优选函数。

### 37. 【面试】nodeName、nodeSelector 与 nodeAffinity 三者有何异同？

### 38. 【面试】节点硬亲和（requiredDuringSchedulingIgnoredDuringExecution）与软亲和（preferredDuringSchedulingIgnoredDuringExecution）的区别？matchExpressions 有哪些操作符？

### 39. 【面试】什么是 Pod 亲和性与 Pod 反亲和性？topologyKey 的作用是什么？

### 40. 【面试】污点（Taint）的三种 effect 有何区别？请说明 NoExecute 与 tolerationSeconds 的配合。

### 41. 【面试】容忍度（tolerations）的 operator 有哪两种？分别如何匹配？空 key 或空 effect 表示什么？

### 42. 【面试】如何为节点添加、删除污点？cordon、drain、uncordon 各自的作用是什么？

### 43. 【面试】什么是拓扑分布约束（topologySpreadConstraints）？请解释 maxSkew、topologyKey、whenUnsatisfiable 的含义。

### 44. 【面试】简述 Kubernetes 优先级调度（PriorityClass）与抢占（Preemption）机制。

### 45. 【面试】什么是节点压力驱逐（Node-pressure Eviction）？kubelet 依据哪些驱逐信号？QoS 如何影响驱逐顺序？

### 46. 【面试】kubelet 默认的硬驱逐阈值有哪些？evictionMinimumReclaim 的作用是什么？
