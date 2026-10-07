# 马哥K8s有状态服务课件 —— 试题册

> 共 54 题。答案与解析见《答案册-马哥K8s有状态服务课件.md》。


## K8s有状态服务笔试

### 1. 【StatefulSet】Kubernetes 中有状态应用的工作负载控制器是以下哪一个？

- **A.** Deployment
- **B.** StatefulSet
- **C.** Job
- **D.** DaemonSet

### 2. 【StatefulSet】StatefulSet 在哪个 Kubernetes 版本中成为稳定的 GA（通用可用）特性？

- **A.** v1.4
- **B.** v1.5
- **C.** v1.7
- **D.** v1.9

### 3. 【StatefulSet】StatefulSet 管理的每个 Pod 名称遵循的格式是？

- **A.** 随机字符串
- **B.** <sts名称>-<序号>
- **C.** <序号>-<sts名称>
- **D.** 与 Deployment 相同的 ReplicaSet 名

### 4. 【Headless】StatefulSet 中 Pod 的稳定 DNS 域名格式，顺序正确的是？

- **A.** <Pod名>.<服务名>.<名称空间>.svc.cluster.local
- **B.** <服务名>.<Pod名>.<名称空间>.svc.cluster.local
- **C.** <名称空间>.<Pod名>.<服务名>.svc.cluster.local
- **D.** <Pod名>.<名称空间>.<服务名>.svc.cluster.local

### 5. 【Headless】StatefulSet 必须配合什么类型的 Service 来实现 Pod 的稳定、唯一网络标识？

- **A.** NodePort
- **B.** LoadBalancer
- **C.** Headless（无头）Service
- **D.** ExternalName

### 6. 【StatefulSet】在默认的 OrderedReady 模式下，StatefulSet 创建或扩容 Pod 时？

- **A.** 所有 Pod 并行创建
- **B.** 序号从大到小创建
- **C.** 序号从小到大，且需前一个 Pod 变为 Ready 后才创建下一个
- **D.** 按随机顺序创建

### 7. 【StatefulSet】OrderedReady 模式下，StatefulSet 缩容或删除 Pod 时，终止顺序是？

- **A.** 序号从小到大
- **B.** 序号从大到小（逆序）
- **C.** 全部并行终止
- **D.** 随机终止

### 8. 【Pod管理策略】podManagementPolicy 设置为 Parallel 时意味着？

- **A.** 必须等前一个 Pod Ready 才能创建下一个
- **B.** 创建/删除不存在顺序要求，可同时进行
- **C.** 仅用于删除操作
- **D.** 仅用于扩容操作

### 9. 【存储】StatefulSet 通过哪个字段为每个 Pod 动态提供独立的持久化存储卷？

- **A.** persistentVolume
- **B.** volumeClaimTemplates
- **C.** emptyDir
- **D.** hostPath

### 10. 【存储】在 StatefulSet 中删除某个 Pod（例如缩容）时，其对应的 PVC 会怎样？

- **A.** 随 Pod 一并删除
- **B.** 保留不删除，状态数据不丢失
- **C.** 变为不可用
- **D.** 被迁移到其他节点

### 11. 【存储】名为 myapp 的 StatefulSet 使用模板名 myappdata，其第一个 Pod（myapp-0）对应的 PVC 名称是？

- **A.** myappdata-0
- **B.** myapp-0
- **C.** myappdata-myapp-0
- **D.** myapp-0-myappdata

### 12. 【更新策略】updateStrategy.type 设为 OnDelete 时，修改容器镜像后会发生什么？

- **A.** 自动滚动更新所有 Pod
- **B.** 仅在手动删除旧 Pod 后才重建并更新
- **C.** 立即重建全部 Pod
- **D.** 配置不生效

### 13. 【MySQL】在课件 MySQL 主从复制集群案例中，主（primary）节点是？

- **A.** mysql-1
- **B.** mysql-2
- **C.** mysql-0
- **D.** 随机选举

### 14. 【MySQL】MySQL 案例中，init-mysql 容器根据 Pod 序号生成 server-id，其公式为？

- **A.** ordinal
- **B.** 10 + ordinal
- **C.** 100 + ordinal
- **D.** 1000 + ordinal

### 15. 【MySQL】访问 MySQL 集群执行写操作时，应当连接哪个地址？

- **A.** mysql-read（只读服务）
- **B.** 任意 Pod 均可
- **C.** mysql-0.mysql（主节点）
- **D.** Headless Service 本身

### 16. 【Redis】课件 Redis Cluster 案例部署了 6 个节点，其主从结构是？

- **A.** 6 主 0 从
- **B.** 3 主 3 从
- **C.** 1 主 5 从
- **D.** 2 主 4 从

### 17. 【Redis】Redis Cluster 总共划分多少个哈希槽（slot）？

- **A.** 1024
- **B.** 4096
- **C.** 16384
- **D.** 65536

### 18. 【Redis】课件强调使用 redis-cli --cluster create 创建 Redis 集群时？

- **A.** 可以使用 Pod 域名
- **B.** 必须使用节点 IP 地址，不支持域名
- **C.** 可以使用 Service 名称
- **D.** 域名或 IP 均可

### 19. 【Redis】在 Redis 集群内使用 redis-cli 访问数据时必须加哪个参数启用集群模式？

- **A.** -h
- **B.** -p
- **C.** -c
- **D.** -n

### 20. 【Nacos】课件 Nacos 集群 StatefulSet 中 podManagementPolicy 设置为？

- **A.** OrderedReady
- **B.** Parallel
- **C.** OnDelete
- **D.** Sequential

### 21. 【Nacos】Nacos 案例中，用于兼容 1.4.x 版本选举的端口（old-raft-rpc）是？

- **A.** 8848
- **B.** 9848
- **C.** 9849
- **D.** 7848

### 22. 【Elasticsearch】Elasticsearch 案例中，节点间内部通信（inter-node）端口是？

- **A.** 9200
- **B.** 9300
- **C.** 5601
- **D.** 8080

### 23. 【MinIO】MinIO 案例 StatefulSet 的 replicas 数量与 podManagementPolicy 分别是？

- **A.** 3 / OrderedReady
- **B.** 4 / Parallel
- **C.** 4 / OrderedReady
- **D.** 3 / Parallel

### 24. 【ZooKeeper】ZooKeeper 案例中通过 PodDisruptionBudget 限制的最大不可用 Pod 数为？

- **A.** 0
- **B.** 1
- **C.** 2
- **D.** 3

### 25. 【CRD】CRD（Custom Resource Definition）是在 Kubernetes 哪个版本被引入的？

- **A.** v1.5
- **B.** v1.7
- **C.** v1.9
- **D.** v1.11

### 26. 【CRD】将定制资源（Custom Resource）与定制控制器（Custom Controller）结合后，能够提供什么类型的 API？

- **A.** 命令式 API
- **B.** 声明式 API（Declarative API）
- **C.** RESTful 网关
- **D.** gRPC 接口

### 27. 【CRD】Operator 模式本质上是将以下哪两者相结合？

- **A.** Deployment + Service
- **B.** CRD + 定制控制器
- **C.** Ingress + Pod
- **D.** PV + PVC

### 28. 【CRD】定义一个 CRD 时，spec.scope 的合法取值为？

- **A.** 仅 Namespaced
- **B.** 仅 Cluster
- **C.** Namespaced 或 Cluster
- **D.** Pod（节点级）

### 29. 【CRD】课件中 users CRD 的 group 为 auth.democrd.io、kind 为 User，则其复数（plural）一般为？

- **A.** user
- **B.** users
- **C.** User
- **D.** USER

### 30. 【Operator】Operator 的核心工作原理基于 Kubernetes 的哪两个理念？

- **A.** 命令式 API + 轮询
- **B.** 声明式 API + 控制器模式
- **C.** CRD + Helm
- **D.** RBAC + Admission Webhook

### 31. 【Operator】基于 Operator 部署 Elasticsearch 的 ECK 项目中，Operator 默认运行在哪个名称空间？

- **A.** default
- **B.** kube-system
- **C.** elastic-system
- **D.** demo

### 32. 【Operator】以下关于 Operator 能力的描述，不正确的是？

- **A.** 能够创建应用
- **B.** 能够监控状态、扩缩容、升级与故障恢复
- **C.** 能够进行资源清理
- **D.** 能够替用户编写业务应用代码

### 33. 【Headless】StatefulSet 中 Pod 的稳定 DNS 域名格式为 `<sts名称>-<序号>.<______>.<______>.svc.cluster.local`，例如在 wordpress 名称空间中为 `mysql-0.mysql.wordpress.svc.cluster.local`。

> 共 2 个空。

### 34. 【存储】通过 volumeClaimTemplates 自动创建的 PVC 名称格式为 `<______>-<______>`，例如在 myapp 案例中第一个 Pod 的 PVC 名为 `myappdata-myapp-0`。

> 共 2 个空。

### 35. 【Pod管理策略】StatefulSet 的 podManagementPolicy 有两个取值：______ 和 ______，其中 ______ 是默认值。

> 共 3 个空。

### 36. 【更新策略】StatefulSet 的 updateStrategy.type 可选值为 ______ 和 ______。

> 共 2 个空。

### 37. 【更新策略】在 RollingUpdate 策略中，rollingUpdate.partition 默认值为 ______，表示只更新序号 ______ 该值的 Pod，常用于金丝雀发布。

> 共 2 个空。

### 38. 【StatefulSet】StatefulSet 扩容时 Pod 编号从 ______ 到 ______ 依次创建，缩容时则逆序（从大到小）销毁。

> 共 2 个空。

### 39. 【CRD】CRD 功能是在 Kubernetes ______ 版本中被引入的，用户可借此向 API 注册自定义资源类型。

> 共 1 个空。

### 40. 【CRD】定义一个 CRD 时，spec.scope 的取值可以是 ______ 或 ______，用于限定自定义资源的作用范围。

> 共 2 个空。


## K8s有状态服务面试

### 41. 【面试】简述 StatefulSet 相比 Deployment 有哪些核心特点？

### 42. 【面试】StatefulSet 中 Pod 的稳定 DNS 域名格式是什么？并说明各部分含义。

### 43. 【面试】在默认的 OrderedReady 模式下，StatefulSet 扩容、缩容、滚动更新时 Pod 的顺序分别是怎样的？

### 44. 【面试】StatefulSet 的 podManagementPolicy 有哪两种模式？分别适用于什么场景？

### 45. 【面试】StatefulSet 的 RollingUpdate 分区更新（partition）有什么作用？

### 46. 【面试】为什么 StatefulSet 通常必须配合 Headless Service？

### 47. 【面试】StatefulSet 的 volumeClaimTemplates 如何保证每个 Pod 数据独立且可复用？

### 48. 【面试】课件 MySQL 主从案例中，如何区分主从节点并保证数据同步？

### 49. 【面试】课件 Redis Cluster 案例为何要把集群初始化放在 StatefulSet 之外的独立容器中？

### 50. 【面试】生产环境中常见的有状态集群（如 MySQL、Redis、ES、Nacos、MinIO、ZooKeeper 等）有哪些共同特点？

### 51. 【面试】什么是 CRD？它解决了什么问题？

### 52. 【面试】CRD 与 Operator 的关系是什么？

### 53. 【面试】Operator 能为有状态应用提供哪些自动化能力？

### 54. 【面试】课件中基于 Operator 部署了哪些有状态应用？简述 ECK 部署 Elasticsearch 的关键步骤。
