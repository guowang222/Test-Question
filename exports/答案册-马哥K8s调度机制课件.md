# 马哥K8s调度机制课件 —— 答案与解析

> 共 46 题，编号与《试题册-马哥K8s调度机制课件.md》一致。


## K8s调度机制笔试

### 1. 【调度】kube-scheduler 的主要职责是？

**答案**

**A**　监听 API Server 中尚未分配节点的 Pod，并为其挑选一个最佳运行节点

**解析**

kube-scheduler 是核心组件，watch kube-apiserver 查询 nodeName 为空的 Pod，按调度策略分配节点并更新其 nodeName 字段；节点上容器生命周期由 kubelet 接管。

---

### 2. 【调度】当集群中没有任何节点能满足 Pod 的资源需求时，该 Pod 会处于什么状态？

**答案**

**C**　Pending

**解析**

若没有节点满足 Predicates（预选）策略，Pod 被挂起（Pending），直到出现合适的节点为止。

---

### 3. 【调度】Kubernetes 传统调度模型分为预选和优选两个阶段，若多个节点优选得分相同，最终如何选定？

**答案**

**B**　从中随机选择一个节点

**解析**

优选（Priorities）得出每个候选节点的总积分后，若最高分有多个节点，select 阶段从中随机选择一个节点。

---

### 4. 【预选】关于预选（Predicates）阶段，下列说法正确的是？

**答案**

**A**　只要有一个预选算法不满足，该 Pod 就不能被调度至该节点

**解析**

预选自上而下遍历各算法，任一不满足即排除该节点；全部不满足则该 Pod 挂起 Pending，而非删除。

---

### 5. 【优选】LeastRequestedPriority 与 MostRequestedPriority 的主要区别是？

**答案**

**A**　前者优先把 Pod 打散到各节点，后者优先把 Pod 堆叠到部分节点

**解析**

LeastRequestedPriority 让节点资源空闲比例高的得分高，适合打散（集群规模少变动）；MostRequestedPriority 让占用比例大的节点得分高，适合按量计费、弹性伸缩集群的堆叠以节约节点数。

---

### 6. 【优选】BalancedResourceAllocation 优选函数的作用是？

**答案**

**A**　选择 CPU 与内存占用率最接近（最均衡）的节点，且需与 LeastRequestedPriority 配合使用

**解析**

BalancedResourceAllocation 以 CPU 和内存占用率相近程度作为评估标准，不能单独使用，需要和 LeastRequestedPriority 组合使用。

---

### 7. 【框架】Kubernetes 引入新的调度框架（Scheduler Framework）的版本是？

**答案**

**B**　1.18

**解析**

课件指出 Kubernetes 1.18 引入新的调度框架，调度过程被拆分为多个可插拔阶段（过滤、打分、绑定等）。

---

### 8. 【框架】以下哪一项不属于 Scheduler Framework 的调度阶段？

**答案**

**D**　Compile（编译）

**解析**

新型调度框架阶段包括 Pre-filter、Filter、Post-filter、Score、Bind 等，没有 Compile 阶段；编译是构建期概念，非调度周期阶段。

---

### 9. 【框架】如果默认调度器不满足需求，可通过哪个字段指定使用自定义调度器？

**答案**

**A**　pod.spec.schedulerName

**解析**

通过 pod.Spec.schedulerName 选择使用哪个调度器，默认是 default-scheduler；集群中可同时运行多个调度器实例。

---

### 10. 【节点】关于 nodeName 与 nodeSelector，下列说法正确的是？

**答案**

**A**　nodeName 直接指定节点名称，可以忽略节点污点；nodeSelector 不能忽略污点

**解析**

nodeName 直接指定目标节点，可以忽略节点污点；nodeSelector 不能忽略污点，且只在调度前有效。

---

### 11. 【节点】nodeSelector 指定了多个标签条件时，节点需要满足什么关系才能被调度？

**答案**

**B**　与（AND）关系，节点必须同时拥有所有标签

**解析**

nodeSelector 的多个条件为并且（AND）关系，节点必须同时拥有所有指定标签才会被调度。

---

### 12. 【节点】nodeSelector 将一个 Pod 调度至某节点后，运维人员随后删除了该节点的匹配标签，已运行的 Pod 会怎样？

**答案**

**B**　保持在原节点继续运行，因为只在调度时有效

**解析**

nodeSelector 仅在调度前有效，调度成功后即使删除节点标签也不会移除上面的 Pod，不会驱逐。

---

### 13. 【亲和性】节点硬亲和使用的字段是？

**答案**

**B**　requiredDuringSchedulingIgnoredDuringExecution

**解析**

节点硬亲和使用 requiredDuringSchedulingIgnoredDuringExecution，必须满足才能调度；软亲和使用 preferredDuringSchedulingIgnoredDuringExecution。

---

### 14. 【亲和性】节点软亲和（preferredDuringSchedulingIgnoredDuringExecution）中用于设置倾向权重的字段取值范围是？

**答案**

**C**　1-1000

**解析**

软亲和中每个偏好项带 weight 权重，取值范围 1-100，值越高优先级越高。

---

### 15. 【亲和性】matchExpressions 支持的操作符不包括以下哪一项？

**答案**

**D**　Equal

**解析**

节点亲和 matchExpressions 操作符有 In、NotIn、Exists、DoesNotExist、Gt、Lt；Equal 是 tolerations 容忍度的操作符，不是 matchExpressions 的。

---

### 16. 【亲和性】在节点硬亲和的 nodeSelectorTerms 中，如果定义了多个 matchExpressions 列表项，这些列表项之间是何关系？

**答案**

**B**　OR（或）关系，满足其中一个即可调度

**解析**

若一个 nodeSelectorTerms 中定义多个 matchExpressions 列表，则只要满足其中一个即可调度（OR）；同一列表内多个 key 才是 AND。

---

### 17. 【亲和性】节点亲和字段中的 "IgnoredDuringExecution" 含义是？

**答案**

**B**　Pod 运行期间节点标签变化导致不满足亲和时，仍继续运行该 Pod

**解析**

IgnoredDuringExecution 表示 Pod 运行期间若节点标签变化导致亲和策略不再满足，仍会继续运行该 Pod。

---

### 18. 【亲和性】Pod 亲和性（podAffinity）硬亲和中，以下哪项是必填项？

**答案**

**B**　topologyKey 必填且不能为空

**解析**

Pod 亲和硬亲和中 labelSelector、namespaces、topologyKey 三者为逻辑与，其中 topologyKey 为必选项且不能为空；weight 是软亲和必填项。

---

### 19. 【亲和性】Pod 软亲和（preferredDuringSchedulingIgnoredDuringExecution）中，与权重关联、用于描述亲和选项的必填字段是？

**答案**

**B**　podAffinityTerm

**解析**

软亲和中 podAffinityTerm 是与权重关联的亲和选项（必填），其内部包含 labelSelector、namespaces、topologyKey；weight 也是必填。

---

### 20. 【反亲和】Pod 反亲和性（podAntiAffinity）常用于以下哪种场景？

**答案**

**B**　避免单点故障，将冗余副本分散到不同位置（拓扑域）

**解析**

反亲和用于满足条件就不调度在一起，典型场景如避免单点失败、Redis 集群副本或 coredns 分散到不同节点实现高可用。

---

### 21. 【拓扑】topologyKey 的默认常用值是？

**答案**

**B**　kubernetes.io/hostname

**解析**

课件示例中 topologyKey 默认常用 kubernetes.io/hostname，表示以主机名作为判断 Pod 是否处于同一位置的拓扑键。

---

### 22. 【污点】关于污点（Taint）的三个 effect，下列说法错误的是？

**答案**

**D**　NoSchedule 会立即驱逐节点上已有的不兼容 Pod

**解析**

NoSchedule 只影响新 Pod，不会对节点上现存 Pod 产生驱逐影响；会驱逐现存 Pod 的是 NoExecute。

---

### 23. 【污点】容忍度（tolerations）中 operator 为 Exists 时，下列说法正确的是？

**答案**

**B**　只需 key 和 effect 匹配，value 无需定义；若 key 为空则表示容忍所有污点

**解析**

Exists 表示 key 和 effect 二者匹配即可，value 无需定义；若 key 为空则容忍任意污点；effect 为空则匹配同名所有污点。

---

### 24. 【污点】在 Pod 上定义容忍度且 operator 为 Equal，则必须与污点的哪些字段完全匹配才能容忍？

**答案**

**C**　key、value、effect 三者

**解析**

Equal（默认）要求容忍度与污点在 key、value、effect 三者之上完全匹配才能容忍。

---

### 25. 【污点】为节点 node1 添加污点 key=dedicated、value=gpu、effect=NoSchedule 的正确命令是？

**答案**

**A**　kubectl taint node node1 dedicated=gpu:NoSchedule

**解析**

kubectl taint node <node-name> <key>=<value>:<effect> 是添加污点的标准格式。

---

### 26. 【污点】执行 kubectl cordon <node> 会在节点上添加哪种污点？

**答案**

**B**　node.kubernetes.io/unschedulable:NoSchedule

**解析**

cordon 封锁节点即添加 node.kubernetes.io/unschedulable:NoSchedule，只影响新 Pod 调度；uncordon 可取消。

---

### 27. 【拓扑】拓扑分布约束 topologySpreadConstraints 中，______ 表示允许的最大不均衡程度（默认值为 1），______ 在约束无法满足时决定妥协策略（默认值为 DoNotSchedule）。

**答案**

- 第 1 空：maxSkew
- 第 2 空：whenUnsatisfiable

**解析**

maxSkew 描述 Pod 在不同拓扑域分布不均匀的最大程度，必须>0，默认 1；whenUnsatisfiable 默认 DoNotSchedule（硬限制，Pod Pending），可选 ScheduleAnyway（软限制，按 skew 打分后调度）。【衍生知识点】skew[i] = 域 i 匹配 Pod 数 - 全局最小匹配 Pod 数，必须 ≤ maxSkew。

---

### 28. 【污点】污点的三个 effect 分别是 ______、______ 和 ______，其中只有 ______ 会对节点上已运行且不容忍的 Pod 产生驱逐影响。

**答案**

- 第 1 空：NoSchedule
- 第 2 空：PreferNoSchedule
- 第 3 空：NoExecute
- 第 4 空：NoExecute

**解析**

三者按约束强度从低到高：PreferNoSchedule（柔性，仅影响调度倾向）、NoSchedule（强制，仅影响新 Pod）、NoExecute（强制，可能驱逐现存 Pod）。【衍生知识点】NoExecute 配合 tolerationSeconds 可让 Pod 在污点出现后延迟指定时长再被驱逐。

---

### 29. 【污点】容忍度的两种 operator 分别是 ______（默认，要求 key/value/effect 完全匹配）和 ______（只需 key/effect 匹配，value 可省略）。

**答案**

- 第 1 空：Equal
- 第 2 空：Exists

**解析**

Equal 为默认值，需 key、value、effect 全匹配；Exists 只需 key 与 effect 相同，value 无需定义；key 为空则容忍所有污点，effect 为空则匹配同名所有污点。

---

### 30. 【驱逐】节点压力驱逐中，kubelet 默认的硬驱逐阈值包括 memory.available<______、nodefs.available<______、imagefs.available<______ 以及 nodefs.inodesFree<5%（Linux）。

**答案**

- 第 1 空：100Mi
- 第 2 空：10%
- 第 3 空：15%

**解析**

默认硬驱逐条件：memory.available<100Mi、nodefs.available<10%、imagefs.available<15%、nodefs.inodesFree<5%。【衍生知识点】修改任一参数后其他默认值不再继承，需分别设置全部阈值。

---

### 31. 【驱逐】节点压力驱逐时，QoS 三档 Pod 被驱逐的先后顺序是先 ______，再 ______，最后 ______（最难被驱逐）。

**答案**

- 第 1 空：BestEffort
- 第 2 空：Burstable
- 第 3 空：Guaranteed

**解析**

kubelet 先驱逐 BestEffort，再 Burstable，最后才考虑 Guaranteed；Guaranteed 仅当所有容器 requests==limits 时才保证不被因他人资源消耗而驱逐。

---

### 32. 【优先级】PriorityClass 中用于指定优先级数值的字段是 ______，在同一集群中最多只能有一个 PriorityClass 将其设为 true 的字段是 ______。

**答案**

- 第 1 空：value
- 第 2 空：globalDefault

**解析**

value 是实际优先级整数（越大越优先）；globalDefault 表示未指定 priorityClassName 的 Pod 使用的默认值，只能有一个为 true，多个时取最小值。

---

### 33. 【优先级】用户可定义的最大优先级 HighestUserDefinablePriority 为 ______，系统关键优先级 SystemCriticalPriority 为 ______（约 2×10^9）。

**答案**

- 第 1 空：1000000000 / 10亿 / 1e9
- 第 2 空：2000000000 / 2e9 / 20亿

**解析**

HighestUserDefinablePriority = 1000000000（10亿）；SystemCriticalPriority = 2 × HighestUserDefinablePriority = 2000000000，用于系统核心组件（如 kubelet、API Server），确保不被优先终止。

---

### 34. 【框架】Scheduler Framework 将调度过程拆分为多个可插拔阶段，其中在正式过滤前做初始化的是 ______，对节点打分的是 ______，将 Pod 绑定到节点的最后一步是 ______。

**答案**

- 第 1 空：Pre-filter / 预过滤
- 第 2 空：Score / 打分
- 第 3 空：Bind / 绑定

**解析**

新型框架阶段包括 Pre-filter（预过滤）、Filter（过滤）、Post-filter（后过滤）、Score（打分）、Bind（绑定）等；基本流程仍是 队列→预选→评分→绑定。

---


## K8s调度机制面试

### 35. 【面试】请说明 Kubernetes 传统调度模型与新型调度框架（Scheduler Framework）的区别。

**答案**

传统模型将调度分为预选(Predicates)与优选(Priorities)两阶段，扩展需多调度器或重新编译。
新型调度框架自 1.18 引入，将调度过程拆分为 Pre-filter、Filter、Post-filter、Score、Bind 等多个可插拔阶段，以插件机制实现过滤与打分；所有传统预选/优选函数都改为可动态绑定的扩展插件，做到'一切皆代码'，无需重新编译即可调整。
两者基本流程一致：队列→预选→评分→绑定。

**解析**

重点：插件化、可扩展、免编译；传统函数全部插件化。

---

### 36. 【面试】简述预选（Predicates）和优选（Priorities）的作用，并举出至少三个预选和三个优选函数。

**答案**

预选用于过滤不满足条件的节点，任一预选算法不满足即排除该节点；优选在候选节点中打分并选最高分（同分随机选）。
预选函数示例：HostName、PodFitsHostPorts、MatchNodeSelector、PodFitsResources、NoDiskConflict、MatchInterPodAffinity、EvenPodsSpread。
优选函数示例：LeastRequestedPriority（打散）、MostRequestedPriority（堆叠）、BalancedResourceAllocation（资源均衡）、TaintTolerationPriority、InterPodAffinityPriority、ImageLocalityPriority、SelectorSpreadPriority。

**解析**

区分预选=过滤、优选=打分；LeastRequested 打散、MostRequested 堆叠。

---

### 37. 【面试】nodeName、nodeSelector 与 nodeAffinity 三者有何异同？

**答案**

nodeName：直接指定节点名称，可忽略节点污点，仅在调度时有效。
nodeSelector：通过节点标签过滤，多个条件为 AND 关系，不能忽略污点，仅在调度时有效，功能简单。
nodeAffinity：增强版 nodeSelector，支持软/硬亲和、matchExpressions 多种操作符（In/NotIn/Exists/DoesNotExist/Gt/Lt）、多 matchExpressions 的 OR 语义，同样是调度时有效。

**解析**

三者都属节点调度，仅调度时生效；nodeAffinity 功能最丰富。

---

### 38. 【面试】节点硬亲和（requiredDuringSchedulingIgnoredDuringExecution）与软亲和（preferredDuringSchedulingIgnoredDuringExecution）的区别？matchExpressions 有哪些操作符？

**答案**

硬亲和是强制条件，不满足则 Pod Pending 无法调度；软亲和是偏好，不满足也可调度，通过 weight(1-100) 参与打分。
matchExpressions 操作符：In（值在列表中）、NotIn（值不在列表中，可实现反亲和）、Exists（标签存在）、DoesNotExist（标签不存在，可实现反亲和）、Gt（大于，数值比较）、Lt（小于，数值比较）。
IgnoredDuringExecution 表示节点标签后续变化不会驱逐已运行 Pod。

**解析**

硬=强制，软=倾向；操作符 6 种。

---

### 39. 【面试】什么是 Pod 亲和性与 Pod 反亲和性？topologyKey 的作用是什么？

**答案**

Pod 亲和性(podAffinity)将 Pod 调度到与指定标签 Pod 相同的拓扑域（如同一节点/机架/zone）；Pod 反亲和性(podAntiAffinity)则避免调度到相同拓扑域，常用于避免单点故障、分散冗余副本。
拓扑域由 topologyKey 定义：拥有相同 topologyKey 标签值且标签键相同的节点属于同一拓扑域。
topologyKey 是硬/软亲和的必填项，常用 kubernetes.io/hostname；namespaces 与 labelSelector 在硬亲和中与 topologyKey 为逻辑与关系。

**解析**

反亲和典型应用：coredns、Nacos 高可用集群。

---

### 40. 【面试】污点（Taint）的三种 effect 有何区别？请说明 NoExecute 与 tolerationSeconds 的配合。

**答案**

PreferNoSchedule：柔性约束，尽量不调度不能容忍的 Pod，不影响现存 Pod。
NoSchedule：强制约束，不能容忍的新 Pod 不可调度，但不影响节点上现存 Pod。
NoExecute：强制约束，不能容忍的新 Pod 不可调度，且节点现存不容忍 Pod 可能被驱逐。
若 Pod 容忍 NoExecute 且未设 tolerationSeconds，可一直运行；若设了 tolerationSeconds，则在污点出现后运行指定时长即被驱逐。

**解析**

强度递增：PreferNoSchedule < NoSchedule < NoExecute；NoExecute 才会驱逐。

---

### 41. 【面试】容忍度（tolerations）的 operator 有哪两种？分别如何匹配？空 key 或空 effect 表示什么？

**答案**

Equal（默认）：要求 key、value、effect 三者完全匹配才能容忍。
Exists：只需 key 与 effect 匹配，value 无需定义。
特殊情形：operator 为 Exists 且 key 为空，表示容忍任意污点；若 effect 为空，则匹配所有同名 key 的污点（不论 effect）。
匹配过程像过滤器：遍历节点污点，过滤掉被容忍的，剩余污点的 effect 决定能否调度/是否被驱逐。

**解析**

Exists 更宽松；DaemonSet 常用 operator: Exists 容忍所有污点部署到各节点。

---

### 42. 【面试】如何为节点添加、删除污点？cordon、drain、uncordon 各自的作用是什么？

**答案**

添加：kubectl taint node <node> <key>=<value>:<effect>；删除：kubectl taint node <node> <key>[:<effect>]- 或 kubectl patch nodes <node> -p '{"spec":{"taints":[]}}'。
cordon：封锁节点，添加 node.kubernetes.io/unschedulable:NoSchedule，仅影响新 Pod。
drain：排空节点上的 Pod（忽略 DaemonSet 需加 --ignore-daemonsets），并添加 unschedulable 污点，常用于节点下线维护。
uncordon：取消封锁，删除 unschedulable 污点，恢复调度。

**解析**

注意 drain 会驱逐普通 Pod（DaemonSet 除外）。

---

### 43. 【面试】什么是拓扑分布约束（topologySpreadConstraints）？请解释 maxSkew、topologyKey、whenUnsatisfiable 的含义。

**答案**

拓扑分布约束用于控制 Pod 在多个拓扑域间均匀分散程度，1.19+ 支持。
maxSkew：不同拓扑域间匹配 Pod 数量差值的最大允许值，必须>0，默认 1。
topologyKey：定义拓扑域的节点标签键，相同标签值的节点属同一拓扑域。
whenUnsatisfiable：无法满足约束时的妥协策略，DoNotSchedule（默认，硬限制，Pod Pending）或 ScheduleAnyway（软限制，按 skew 打分后调度）。
skew[i] = 域 i 匹配 Pod 数 - 全局最小匹配 Pod 数，必须 ≤ maxSkew。

**解析**

用于避免应用过于集中、实现资源有效利用。

---

### 44. 【面试】简述 Kubernetes 优先级调度（PriorityClass）与抢占（Preemption）机制。

**答案**

PriorityClass 通过 value（整数，越大优先级越高）为 Pod 赋优先级；globalDefault 仅允许一个为 true，作为未指定类的默认值；preemptionPolicy 可为 Never 或 PreemptLowerPriority（默认）。
调度时优先级队列优先弹出高优先级 Pod；若高优先级 Pod 因资源不足调度失败，触发抢占：驱逐节点上低优先级 Pod 以腾出资源。
内置系统类 system-cluster-critical=2e9、system-node-critical=2.0001e9，用户最大值上限为 HighestUserDefinablePriority=1e9。

**解析**

抢占发生在调度失败（资源不足）时，而非正常调度期间。

---

### 45. 【面试】什么是节点压力驱逐（Node-pressure Eviction）？kubelet 依据哪些驱逐信号？QoS 如何影响驱逐顺序？

**答案**

节点压力驱逐是 kubelet 在节点内存/磁盘/inode/pid 等资源紧张时主动终止 Pod 回收资源的过程，会给节点打 NoExecute 污点并驱逐不容忍 Pod。
驱逐信号：memory.available、nodefs.available、nodefs.inodesFree、imagefs.available、imagefs.inodesFree、pid.available。
驱逐条件分硬(eviction-hard，无宽限立即杀)和软(eviction-soft，配宽限期)。
QoS 驱逐顺序：先 BestEffort，再 Burstable，最后 Guaranteed；Guaranteed 仅当 requests==limits 时才保证不被驱逐。

**解析**

oom_score_adj：BestEffort=1000，Guaranteed=-997，Burstable 居中。

---

### 46. 【面试】kubelet 默认的硬驱逐阈值有哪些？evictionMinimumReclaim 的作用是什么？

**答案**

默认硬驱逐阈值（未修改任何参数时）：memory.available<100Mi、nodefs.available<10%、imagefs.available<15%、nodefs.inodesFree<5%(Linux)。
注意：一旦修改任一参数，其他参数的默认值不再继承，需分别设置全部阈值。
evictionMinimumReclaim：为每个资源配置最小回收量，kubelet 在资源压力下会持续回收直到达到该指定数量，避免反复触发驱逐。
监测间隔由 housekeeping-interval 控制，默认 10s。

**解析**

软硬阈值 + 最小回收量配合使用，防止抖动式反复驱逐。

---
