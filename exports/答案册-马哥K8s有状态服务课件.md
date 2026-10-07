# 马哥K8s有状态服务课件 —— 答案与解析

> 共 54 题，编号与《试题册-马哥K8s有状态服务课件.md》一致。


## K8s有状态服务笔试

### 1. 【StatefulSet】Kubernetes 中有状态应用的工作负载控制器是以下哪一个？

**答案**

**B**　StatefulSet

**解析**

课件将应用编排控制器分类：无状态用 Deployment<--ReplicaSet，系统级用 DaemonSet，作业类用 CronJob<--Job，有状态应用用 StatefulSet。

---

### 2. 【StatefulSet】StatefulSet 在哪个 Kubernetes 版本中成为稳定的 GA（通用可用）特性？

**答案**

**D**　v1.9

**解析**

StatefulSet 在 v1.4 引入集群状态管理、v1.5 更名，最终在 v1.9 成为 GA 特性。CRD 才是 v1.7 引入的。

---

### 3. 【StatefulSet】StatefulSet 管理的每个 Pod 名称遵循的格式是？

**答案**

**B**　<sts名称>-<序号>

**解析**

每个 Pod 名称由 StatefulSet 名与从 0 开始的顺序序号组成，例如 web-0、web-1。重建后名称保持不变以匹配原有存储。

---

### 4. 【Headless】StatefulSet 中 Pod 的稳定 DNS 域名格式，顺序正确的是？

**答案**

**A**　<Pod名>.<服务名>.<名称空间>.svc.cluster.local

**解析**

完整格式为 $(sts名)-$(序号).$(headless服务名).$(名称空间).svc.cluster.local，例如 mysql-0.mysql.wordpress.svc.cluster.local。

---

### 5. 【Headless】StatefulSet 必须配合什么类型的 Service 来实现 Pod 的稳定、唯一网络标识？

**答案**

**C**　Headless（无头）Service

**解析**

Headless Service 的 clusterIP 为 None，借助 CoreDNS 将每个 Pod 名解析到其 Pod IP，是 StatefulSet 稳定网络标识的基础。

---

### 6. 【StatefulSet】在默认的 OrderedReady 模式下，StatefulSet 创建或扩容 Pod 时？

**答案**

**C**　序号从小到大，且需前一个 Pod 变为 Ready 后才创建下一个

**解析**

OrderedReady 要求顺序创建，前一个 Ready 之后才能创建后一个；缩容/删除则逆序终止。

---

### 7. 【StatefulSet】OrderedReady 模式下，StatefulSet 缩容或删除 Pod 时，终止顺序是？

**答案**

**B**　序号从大到小（逆序）

**解析**

删除或缩容按逆序（从大到小）依次终止 Pod，例如先终止 web-2 再 web-1、web-0。

---

### 8. 【Pod管理策略】podManagementPolicy 设置为 Parallel 时意味着？

**答案**

**B**　创建/删除不存在顺序要求，可同时进行

**解析**

Parallel 模式不对 Pod 副本的创建或删除施加顺序要求；Nacos、MinIO 案例即采用 Parallel。

---

### 9. 【存储】StatefulSet 通过哪个字段为每个 Pod 动态提供独立的持久化存储卷？

**答案**

**B**　volumeClaimTemplates

**解析**

volumeClaimTemplates 是 PVC 模板，StatefulSet 为每个 Pod 按模板生成专属 PVC 并绑定独立 PV。

---

### 10. 【存储】在 StatefulSet 中删除某个 Pod（例如缩容）时，其对应的 PVC 会怎样？

**答案**

**B**　保留不删除，状态数据不丢失

**解析**

删除 Pod（缩容）并不会一并删除相关 PVC，新 Pod 会以相同名称自动找到原 PVC 复用数据。

---

### 11. 【存储】名为 myapp 的 StatefulSet 使用模板名 myappdata，其第一个 Pod（myapp-0）对应的 PVC 名称是？

**答案**

**C**　myappdata-myapp-0

**解析**

PVC 名称格式为 <volumeClaimTemplates名称>-<StatefulSet名称>-<序号>，即 <模板名>-<Pod名>，例如 data-mysql-0。

---

### 12. 【更新策略】updateStrategy.type 设为 OnDelete 时，修改容器镜像后会发生什么？

**答案**

**B**　仅在手动删除旧 Pod 后才重建并更新

**解析**

OnDelete 表示只有手动删除旧 Pod 后才会触发更新；RollingUpdate 才会自动滚动更新。

---

### 13. 【MySQL】在课件 MySQL 主从复制集群案例中，主（primary）节点是？

**答案**

**C**　mysql-0

**解析**

init-mysql 在序号为 0 时复制 primary.cnf（开启 log-bin），因此 mysql-0 为主节点，mysql-1/2 为副本。

---

### 14. 【MySQL】MySQL 案例中，init-mysql 容器根据 Pod 序号生成 server-id，其公式为？

**答案**

**C**　100 + ordinal

**解析**

为避免保留值 0，脚本使用 server-id=$((100 + ordinal))，因此 mysql-0 的 server-id 为 100。

---

### 15. 【MySQL】访问 MySQL 集群执行写操作时，应当连接哪个地址？

**答案**

**C**　mysql-0.mysql（主节点）

**解析**

写操作必须连接主服务器 mysql-0.mysql；读操作可经 mysql-read 服务负载到各实例。

---

### 16. 【Redis】课件 Redis Cluster 案例部署了 6 个节点，其主从结构是？

**答案**

**B**　3 主 3 从

**解析**

redis-cli --cluster create ... --replicas 1 表示每个主分配一个从，共 3 主 3 从。

---

### 17. 【Redis】Redis Cluster 总共划分多少个哈希槽（slot）？

**答案**

**C**　16384

**解析**

Redis Cluster 固定使用 16384 个槽，新建集群后提示“16384 个槽都有至少一个主节点在处理”即正常。

---

### 18. 【Redis】课件强调使用 redis-cli --cluster create 创建 Redis 集群时？

**答案**

**B**　必须使用节点 IP 地址，不支持域名

**解析**

课件明确指出“不支持域名方式来创建集群”，必须写各 Redis 实例的 IP 地址。

---

### 19. 【Redis】在 Redis 集群内使用 redis-cli 访问数据时必须加哪个参数启用集群模式？

**答案**

**C**　-c

**解析**

不加 -c 会报 MOVED 重定向错误；加 -c 后 redis-cli 自动按槽位重定向到正确节点。

---

### 20. 【Nacos】课件 Nacos 集群 StatefulSet 中 podManagementPolicy 设置为？

**答案**

**B**　Parallel

**解析**

Nacos 案例 spec 中 podManagementPolicy: Parallel，各节点对等，无需严格顺序启动。

---

### 21. 【Nacos】Nacos 案例中，用于兼容 1.4.x 版本选举的端口（old-raft-rpc）是？

**答案**

**D**　7848

**解析**

8848 为 server 端口，9848 为 client-rpc，9849 为 raft-rpc，7848 为兼容旧版的 old-raft-rpc 选举端口。

---

### 22. 【Elasticsearch】Elasticsearch 案例中，节点间内部通信（inter-node）端口是？

**答案**

**B**　9300

**解析**

9200 为 REST 端口，9300 为节点间互联（inter-node）端口；discovery.seed_hosts 用 9300 互通。

---

### 23. 【MinIO】MinIO 案例 StatefulSet 的 replicas 数量与 podManagementPolicy 分别是？

**答案**

**B**　4 / Parallel

**解析**

MinIO 案例 replicas: 4，podManagementPolicy: Parallel，启动参数用 http://minio-{0...3}.minio-headless... 互联。

---

### 24. 【ZooKeeper】ZooKeeper 案例中通过 PodDisruptionBudget 限制的最大不可用 Pod 数为？

**答案**

**B**　1

**解析**

课件 zk-pdb 的 maxUnavailable: 1，保证驱逐时最多只有一个 ZK 节点不可用。

---

### 25. 【CRD】CRD（Custom Resource Definition）是在 Kubernetes 哪个版本被引入的？

**答案**

**B**　v1.7

**解析**

课件说明 CRD 功能在 Kubernetes 1.7 版本被引入，用户可添加自定义对象资源。

---

### 26. 【CRD】将定制资源（Custom Resource）与定制控制器（Custom Controller）结合后，能够提供什么类型的 API？

**答案**

**B**　声明式 API（Declarative API）

**解析**

CRD 本身只存取结构化数据；与控制器结合才提供真正的声明式 API，控制器负责把实际状态调谐到期望状态。

---

### 27. 【CRD】Operator 模式本质上是将以下哪两者相结合？

**答案**

**B**　CRD + 定制控制器

**解析**

Operator = 定制资源（CRD）+ 定制控制器，是 CRD 与控制器结合的典型实践。

---

### 28. 【CRD】定义一个 CRD 时，spec.scope 的合法取值为？

**答案**

**C**　Namespaced 或 Cluster

**解析**

scope 可用值只有 Namespaced（命名空间级）和 Cluster（集群级）两种。

---

### 29. 【CRD】课件中 users CRD 的 group 为 auth.democrd.io、kind 为 User，则其复数（plural）一般为？

**答案**

**B**　users

**解析**

plural 用于 API 路径 /apis/<group>/<version>/.../<plural>，User 的复数为 users；课件 kubectl get users 也验证了这一点。

---

### 30. 【Operator】Operator 的核心工作原理基于 Kubernetes 的哪两个理念？

**答案**

**B**　声明式 API + 控制器模式

**解析**

Operator 基于“声明式 API”与“控制器模式”工作：watch API 对象变化，不断调谐使集群状态与描述一致。

---

### 31. 【Operator】基于 Operator 部署 Elasticsearch 的 ECK 项目中，Operator 默认运行在哪个名称空间？

**答案**

**C**　elastic-system

**解析**

ECK 的 operator.yaml 在 elastic-system 名称空间创建相关资源，Operator 本身以 elastic-operator 这个 StatefulSet 运行。

---

### 32. 【Operator】以下关于 Operator 能力的描述，不正确的是？

**答案**

**D**　能够替用户编写业务应用代码

**解析**

Operator 把分布式应用的运维能力（创建、监控、扩缩容、升级、故障恢复、清理）封装起来，但并不会替用户编写业务代码。

---

### 33. 【Headless】StatefulSet 中 Pod 的稳定 DNS 域名格式为 `<sts名称>-<序号>.<______>.<______>.svc.cluster.local`，例如在 wordpress 名称空间中为 `mysql-0.mysql.wordpress.svc.cluster.local`。

**答案**

- 第 1 空：mysql / headless service名称 / 无头服务名 / 服务名
- 第 2 空：wordpress / namespace名称 / 名称空间

**解析**

域名中 <sts名称>-<序号> 为 Pod 名，紧接其后的两部分分别是 Headless Service 名称与名称空间名称。

---

### 34. 【存储】通过 volumeClaimTemplates 自动创建的 PVC 名称格式为 `<______>-<______>`，例如在 myapp 案例中第一个 Pod 的 PVC 名为 `myappdata-myapp-0`。

**答案**

- 第 1 空：模板名 / volumeClaimTemplates名称 / 模板名称
- 第 2 空：Pod名称 / StatefulSet名-序号 / sts名-序号

**解析**

PVC 名称由模板名与 Pod 名（即 <sts名>-<序号>）组合而成，保证每个 Pod 拥有独立且可复用的存储。

---

### 35. 【Pod管理策略】StatefulSet 的 podManagementPolicy 有两个取值：______ 和 ______，其中 ______ 是默认值。

**答案**

- 第 1 空：OrderedReady / 顺序
- 第 2 空：Parallel / 并行
- 第 3 空：OrderedReady / 顺序

**解析**

OrderedReady 要求顺序创建/逆序删除，是默认模式；Parallel 则无顺序要求。

---

### 36. 【更新策略】StatefulSet 的 updateStrategy.type 可选值为 ______ 和 ______。

**答案**

- 第 1 空：OnDelete
- 第 2 空：RollingUpdate / 滚动更新

**解析**

OnDelete 需删除旧 Pod 才更新；RollingUpdate 自动滚动更新，并可借 partition 做分区（金丝雀）发布。

---

### 37. 【更新策略】在 RollingUpdate 策略中，rollingUpdate.partition 默认值为 ______，表示只更新序号 ______ 该值的 Pod，常用于金丝雀发布。

**答案**

- 第 1 空：0 / 零
- 第 2 空：大于等于 / ≥ / 不小于 / 大于或等于

**解析**

partition 默认 0 表示全部更新；设为 N 时只更新序号 ≥ N 的 Pod，逐步调小即可实现灰度。

---

### 38. 【StatefulSet】StatefulSet 扩容时 Pod 编号从 ______ 到 ______ 依次创建，缩容时则逆序（从大到小）销毁。

**答案**

- 第 1 空：0 / 小 / 小到大 / 从小到大
- 第 2 空：N / 大 / 大到小 / 从大到小

**解析**

OrderedReady 下创建/扩容为 0→N 顺序，删除/缩容为 N→0 逆序。

---

### 39. 【CRD】CRD 功能是在 Kubernetes ______ 版本中被引入的，用户可借此向 API 注册自定义资源类型。

**答案**

- 第 1 空：1.7 / v1.7

**解析**

CRD 于 Kubernetes 1.7 引入；与之区分，StatefulSet 在 v1.9 成为 GA。

---

### 40. 【CRD】定义一个 CRD 时，spec.scope 的取值可以是 ______ 或 ______，用于限定自定义资源的作用范围。

**答案**

- 第 1 空：Namespaced / 命名空间级 / 命名空间级别
- 第 2 空：Cluster / 集群级 / 集群级别

**解析**

scope 决定资源是命名空间级（Namespaced）还是集群级（Cluster）。

---


## K8s有状态服务面试

### 41. 【面试】简述 StatefulSet 相比 Deployment 有哪些核心特点？

**答案**

1. 稳定的、唯一的网络访问标识：每个 Pod 有固定名称，借助 Headless Service 与 CoreDNS 解析到各自 Pod IP。
2. 稳定的持久化存储：通过 volumeClaimTemplates 为每个 Pod 分配独立 PVC/PV，删除重建后数据可复用。
3. 有序性：Pod 的部署、扩容、缩容、更新、删除等操作都有明确顺序（序号从小到大创建/扩容，从大到小删除/更新）。
4. 通常必须搭配 Headless Service，且需要按需自行编写扩容/缩容等所需的领域逻辑。

**解析**

【衍生知识点】StatefulSet 只是有状态应用的“基础编排框架”，不是完整解决方案，复杂集群建议用专用 Operator。

---

### 42. 【面试】StatefulSet 中 Pod 的稳定 DNS 域名格式是什么？并说明各部分含义。

**答案**

完整格式：<sts名称>-<序号>.<headless服务名>.<名称空间>.svc.cluster.local
例如 mysql-0.mysql.wordpress.svc.cluster.local。
各部分：<sts名称>-<序号> 是 Pod 名（如 mysql-0）；<headless服务名> 是配套的 Headless Service（如 mysql）；<名称空间> 是所在 namespace（如 wordpress）；其后固定为 svc.cluster.local。

**解析**

【衍生知识点】Pod 可直接解析自己的名称，但解析其他 Pod 必须携带完整的无头服务名与名称空间。

---

### 43. 【面试】在默认的 OrderedReady 模式下，StatefulSet 扩容、缩容、滚动更新时 Pod 的顺序分别是怎样的？

**答案**

1. 创建/扩容：序号从小到大（0→N），且必须等前一个 Pod 变为 Ready 后才创建下一个。
2. 删除/缩容：序号从大到小（N→0）逆序终止。
3. RollingUpdate 更新：序号从大到小依次更新（先更新 web-2 再 web-1、web-0）。
若 podManagementPolicy 设为 Parallel，则创建/删除均无顺序要求。

**解析**

【衍生知识点】partition 分区更新同样遵循“从大到小”的顺序，便于金丝雀发布。

---

### 44. 【面试】StatefulSet 的 podManagementPolicy 有哪两种模式？分别适用于什么场景？

**答案**

1. OrderedReady（默认）：严格按序号顺序创建、逆序删除，要求前一个 Ready 才创建下一个；适用于有主从/启动依赖的集群（如 MySQL、ZooKeeper）。
2. Parallel：创建与删除无顺序限制、可并行；适用于各节点对等的集群（如 Nacos、MinIO 案例即设为 Parallel）。

**解析**

【衍生知识点】选择策略取决于应用是否要求“先主后从”或“节点间启动互不依赖”。

---

### 45. 【面试】StatefulSet 的 RollingUpdate 分区更新（partition）有什么作用？

**答案**

rollingUpdate.partition 是一个序号阈值，表示只更新序号 ≥ partition 的 Pod；默认为 0 即全部更新。
通过设置 partition 可只更新高序号的部分 Pod（金丝雀），验证无误后再逐步调小该值，依次把更多 Pod 纳入更新，实现灰度/分区发布；更新与缩容都按从大到小顺序进行。

**解析**

【衍生知识点】OnDelete 策略则完全依赖手动删除 Pod 来触发更新，不受 partition 控制。

---

### 46. 【面试】为什么 StatefulSet 通常必须配合 Headless Service？

**答案**

Headless Service 将 clusterIP 设为 None，不再通过单一 ClusterIP 随机负载到后端 Pod，而是借助 CoreDNS 把每个 Pod 名解析到其专属 Pod IP。
这样每个 Pod 都获得稳定、唯一的网络标识，集群内部成员可用 <pod名>.<服务名>.<ns>.svc.cluster.local 的固定域名互相通信，且 Pod 重建后名称与域名不变，访问者无需改变连接方式。

**解析**

【衍生知识点】若用普通有头 Service，请求会被随机解析到不同 Pod，无法满足有状态成员固定身份的需求。

---

### 47. 【面试】StatefulSet 的 volumeClaimTemplates 如何保证每个 Pod 数据独立且可复用？

**答案**

volumeClaimTemplates 是 PVC 模板，StatefulSet 在创建每个 Pod 时按 <模板名>-<Pod名> 生成独立 PVC（如 data-mysql-0），并绑定专属 PV。
由于各 Pod 数据不同，模板隔离了 Pod 与数据卷；当 Pod 被删除或缩容时 PVC 不会被删除，新 Pod 以相同名称自动匹配并复用原 PVC，从而保留状态数据。

**解析**

【衍生知识点】这与 Deployment 使用共享存储/固定 PVC 不同，是有状态服务持久化的关键机制。

---

### 48. 【面试】课件 MySQL 主从案例中，如何区分主从节点并保证数据同步？

**答案**

1. 区分：mysql-0 为 primary（init-mysql 在 ordinal=0 时复制 primary.cnf 开启 log-bin），mysql-1/2 为 replica（复制 replica.cnf 设 super-read-only）。
2. server-id：init-mysql 用公式 server-id=100+ordinal 生成唯一 ID。
3. 数据同步：clone-mysql 用 xtrabackup 从“序号-1”的节点克隆数据（主节点跳过），随后 change master to 指向 mysql-0.mysql 开始复制；读请求可经 mysql-read 服务分发。

**解析**

【衍生知识点】主节点故障后需借助 Orchestrator 等工具或人工介入完成主从切换。

---

### 49. 【面试】课件 Redis Cluster 案例为何要把集群初始化放在 StatefulSet 之外的独立容器中？

**答案**

Redis Cluster 必须在所有节点都启动之后才能进行初始化，且初始化（分配 16384 槽、建立主从）逻辑复杂；若写进 StatefulSet 既低效又难以维护。
因此课件额外起一个 ubuntu 管理容器，安装 redis-server/dnsutils 后使用 redis-cli --cluster create（注意必须用节点 IP，不支持域名）完成 3 主 3 从、16384 槽的集群建立。

**解析**

【衍生知识点】客户端访问需加 -c 启用集群模式；访问任意节点即可，槽位自动重定向。

---

### 50. 【面试】生产环境中常见的有状态集群（如 MySQL、Redis、ES、Nacos、MinIO、ZooKeeper 等）有哪些共同特点？

**答案**

1. 每个节点都有固定的身份 ID，集群成员通过 ID 进行通信。
2. 集群规模相对固定，不能随意增减节点。
3. 节点都是有状态的，状态数据通常做持久化存储。
4. 某个节点出现故障，集群功能会受影响，需要主从/分片/选举等机制维持高可用。
5. 通常需要固定的网络标识以便成员互相发现。

**解析**

【衍生知识点】这些特点正是 StatefulSet（稳定标识+稳定存储+有序）与 Operator 得以发挥作用的场景。

---

### 51. 【面试】什么是 CRD？它解决了什么问题？

**答案**

CRD（Custom Resource Definition，自定义资源定义）允许用户在不动 API Server 源码、不单独开发聚合 API Server 的情况下，向 Kubernetes API 注册新的资源类型。
它解决了“内置资源无法满足特定业务/领域需求”的问题，使专用对象（如 Calico 的 NetworkSet、用户的 User）可像 Pod 一样用 kubectl 创建、查看与访问，并为声明式 API 打下基础。

**解析**

【衍生知识点】CRD 本身只能存取结构化数据，真正的业务能力要靠配套的定制控制器（或 Operator）实现。

---

### 52. 【面试】CRD 与 Operator 的关系是什么？

**答案**

CRD 仅定义资源的结构（字段 schema），用于存取数据，本身没有业务意义；定制控制器（Controller）负责 watch 这些资源并调谐状态。
Operator = CRD + 定制控制器：通过把领域知识编码进控制器，Operator 把对特定应用（如 Redis、Elasticsearch）的运维操作封装起来，让用户以声明式 CR 的方式像管理原生资源一样管理有状态应用。

**解析**

【衍生知识点】Operator 模式是 CRD 与控制器结合的代表，也是 Kubernetes 扩展 API 的推荐路径之一。

---

### 53. 【面试】Operator 能为有状态应用提供哪些自动化能力？

**答案**

Operator 基于声明式 API 与控制器模式，能够自动完成：
1. 创建/部署应用；2. 持续监控应用状态；3. 扩缩容；4. 版本升级；5. 故障恢复（如主从切换、Pod 重建）；6. 资源清理。
用户只需提交一个声明式 CR（例如 kind: Nacos / Elasticsearch），无需掌握底层分布式领域的专业知识。

**解析**

【衍生知识点】常见项目可在 operatorhub.io 获取，如 ECK（Elasticsearch）、Prometheus Operator、Nacos Operator 等。

---

### 54. 【面试】课件中基于 Operator 部署了哪些有状态应用？简述 ECK 部署 Elasticsearch 的关键步骤。

**答案**

课件基于 Operator 部署了：ECK（Elasticsearch + Kibana + Filebeat）、Prometheus（kube-prometheus 项目）、Nacos（nacos-operator）。
ECK 部署 ES 关键步骤：
1) kubectl create -f crds.yaml 注册 ECK 相关 CRD；
2) kubectl apply -f operator.yaml 部署 RBAC 与 elastic-operator（运行于 elastic-system 名称空间，本身是一个 StatefulSet）；
3) 用 kind: Elasticsearch（apiVersion elasticsearch.k8s.elastic.co/v1）的 CR 声明集群（如 3 节点）；
4) 默认用户 elastic 的密码保存在名为 <集群名>-es-elastic-user 的 Secret 中，用于访问。

**解析**

【衍生知识点】Nacos Operator 的 CR 为 kind: Nacos（nacos.io/v1alpha1），spec.type 支持 standalone 与 cluster，且不支持 k8s-1.33。

---
