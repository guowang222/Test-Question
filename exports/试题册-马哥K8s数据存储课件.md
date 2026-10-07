# 马哥K8s数据存储课件 —— 试题册

> 共 68 题。答案与解析见《答案册-马哥K8s数据存储课件.md》。


## K8s数据存储笔试

### 1. 【Docker存储】Docker 容器可读写层位于容器内部，容器崩溃重建后数据会丢失。以下哪一项 Docker 数据持久化方式本质上是将宿主机目录直接绑定挂载到容器，且不经过 Docker 卷管理机制？

- **A.** bind mount（绑定挂载，用 -v 节点path:容器path）
- **B.** 命名数据卷（named volume，存于 /var/lib/docker/volumes/）
- **C.** tmpfs 挂载（内存，无持久化）
- **D.** 匿名卷（anonymous volume）

### 2. 【存储】Kubernetes 引入存储卷（Volume）这一抽象概念，主要为了解决以下哪两个问题？

- **A.** 容器崩溃重建导致数据丢失；以及同一 Pod 内多容器需要共享数据
- **B.** 镜像体积过大导致拉取慢
- **C.** 集群网络延迟过高
- **D.** Secret 数据需要加密存储

### 3. 【存储】关于 In-Tree（树内）与 Out-of-Tree（树外）存储插件，以下说法正确的是？

- **A.** In-Tree 插件需独立于 Kubernetes 代码库单独部署
- **B.** FlexVolume 是当前社区推荐的扩展方案
- **C.** CSI（Container Storage Interface）是社区推荐的方案，支持更大范围存储扩展
- **D.** Out-of-Tree 仅指 FlexVolume 一种

### 4. 【CSI】在 CSI 插件架构中，负责在每个节点上完成存储卷挂载/卸载（Mount/Unmount）的组件是？

- **A.** CSI Controller Server
- **B.** CSI Node Server（以 DaemonSet 形式在每个节点运行）
- **C.** PV Controller
- **D.** Attach/Detach 控制器

### 5. 【存储】Kubernetes 存储架构中，负责 PV/PVC 的绑定、生命周期管理以及存储卷的 Provision/Delete 操作的组件是？

- **A.** Attach/Detach 控制器（AD控制器）
- **B.** Volume Manager
- **C.** PV Controller
- **D.** Scheduler

### 6. 【emptyDir】emptyDir 卷的默认存储介质及生命周期特点是？

- **A.** 底层为内存 tmpfs，节点重启数据清除
- **B.** 默认使用宿主机磁盘，且 Pod 删除后对应宿主机目录及数据随之永久消除（不能持久化）
- **C.** 基于 CephFS 分布式存储
- **D.** 基于 NFS 网络存储

### 7. 【emptyDir】将 emptyDir 的 medium 字段设置为 Memory 时，底层使用的是什么？

- **A.** 宿主机本地磁盘
- **B.** tmpfs（内存支持的文件系统）
- **C.** NFS 共享存储
- **D.** hostPath 目录

### 8. 【emptyDir】emptyDir 最适合的使用场景是？

- **A.** 数据库等需要长期持久化的数据
- **B.** 同一 Pod 内多个容器间的临时数据共享与数据缓存
- **C.** 跨节点多 Pod 共享读写
- **D.** 重要数据的备份归档

### 9. 【hostPath】hostPath 卷的数据生命周期与谁一致？

- **A.** Pod
- **B.** 节点（Node），Pod 删除后宿主机数据不受影响
- **C.** PVC
- **D.** PV

### 10. 【hostPath】hostPath 卷不适合下面哪种工作负载？

- **A.** DaemonSet（每个节点一个）
- **B.** Deployment（分布式、多副本跨节点）
- **C.** 单节点有状态应用
- **D.** 日志采集 Agent

### 11. 【hostPath】hostPath 的 type 字段中，若宿主机上对应的目录不存在，会自动创建权限为 0755 的空目录的是？

- **A.** Directory（目录必须已存在）
- **B.** DirectoryOrCreate
- **C.** File（必须是已存在文件）
- **D.** 空字符串（默认，挂载前不检查）

### 12. 【hostPath】hostPath 的 type 字段默认取值（空字符串）的行为是？

- **A.** 关联存储卷前不进行任何检查，目录不存在则自动创建
- **B.** 要求目录必须已存在否则报错
- **C.** 只读挂载
- **D.** 强制使用内存文件系统

### 13. 【NFS】在 Pod 中使用 NFS 类型的存储卷时，以下哪项是必须的？

- **A.** 集群所有 worker 节点必须安装 nfs-common（NFS 客户端）软件
- **B.** 仅 master 节点安装即可
- **C.** 必须同时创建 CephFS
- **D.** 必须预先创建 PV

### 14. 【volume】Pod 中要在容器里挂载已定义的存储卷，容器的挂载列表应定义在哪个字段？

- **A.** pod.spec.volumes
- **B.** pod.spec.containers[].volumeMounts
- **C.** pod.spec.containers[].volumes
- **D.** pod.spec.persistentVolumeClaim

### 15. 【PV】PersistentVolume（PV）属于 Kubernetes 中的哪一级资源？

- **A.** 名称空间（Namespace）级别
- **B.** 集群级别，不属于任何 Namespace/Node/Pod，但可被它们访问
- **C.** 节点（Node）级别
- **D.** Pod 级别

### 16. 【PVC】PersistentVolumeClaim（PVC）属于 Kubernetes 中的哪一级资源？

- **A.** 集群级别
- **B.** 名称空间（Namespace）级别，只能被同一命名空间的 Pod 引用
- **C.** 节点级别
- **D.** 全局共享级别

### 17. 【PV】关于 PV 对象的名称，以下说法正确的是？

- **A.** 名称可以使用大写字母
- **B.** PV 的名称不支持大写字母
- **C.** 名称可以是任意字符
- **D.** 名称必须包含下划线

### 18. 【PVC】PVC 在筛选匹配 PV 时，按条件进行过滤的顺序是？

- **A.** VolumeMode → LabelSelector → StorageClassName → AccessMode → Size
- **B.** Size → AccessMode → StorageClassName
- **C.** AccessMode → Size → 名称
- **D.** 随机匹配

### 19. 【PV】PV 的置备（Provision）方式分为哪两类？

- **A.** 静态（集群管理员手动创建）与动态（基于 StorageClass 自动创建）
- **B.** 仅动态置备
- **C.** 仅静态置备
- **D.** 自动与手动混合无区别

### 20. 【PV】将 PVC 的 storageClassName 设置为空字符串 "" 的作用是？

- **A.** 有效地禁用其动态配置（Dynamic Provisioning）
- **B.** 使用集群默认 StorageClass
- **C.** 自动创建一个新 PV
- **D.** 删除该 PVC

### 21. 【PV】以下哪一项不是 PV 的状态（Status）？

- **A.** Available（空闲可用）
- **B.** Bound（已绑定）
- **C.** Released（未回收）
- **D.** Creating（创建中）

### 22. 【PV】PV 处于 Released 状态表示？

- **A.** PV 未被任何 PVC 使用（空闲）
- **B.** PVC 已被删除，但对应的存储资源尚未被回收
- **C.** PV 已成功绑定到 PVC
- **D.** 资源回收失败

### 23. 【PV】手动创建的 PV 默认回收策略为 Retain，当 PVC 被删除后该 PV 会进入什么状态？

- **A.** Available（直接空闲可用）
- **B.** Released（保留 PV 与数据，等待人工干预）
- **C.** Failed
- **D.** Deleted（PV 被直接删除）

### 24. 【PV】关于 PV/PVC 的状态流转，以下说法正确的是？

- **A.** 该过程是双向可逆的
- **B.** 该过程是单向过程，不能逆向
- **C.** 状态会在 Available 与 Failed 间循环
- **D.** 状态完全随机

### 25. 【回收】手动创建的 PV 默认采用的资源回收策略是？

- **A.** Delete
- **B.** Retain
- **C.** Recycle
- **D.** Immediate

### 26. 【回收】基于 StorageClass 动态置备出来的 PV，默认采用的资源回收策略是？

- **A.** Retain
- **B.** Delete
- **C.** Recycle
- **D.** 无策略

### 27. 【回收】目前已被废弃、且仅 NFS 和 hostPath 后端支持的回收策略是？

- **A.** Retain
- **B.** Delete
- **C.** Recycle
- **D.** Immediate

### 28. 【AccessMode】ReadWriteOncePod（RWOP）访问模式从哪个版本开始 stable 可用？

- **A.** v1.20
- **B.** v1.22（开始支持）
- **C.** v1.29（stable 可用）
- **D.** v1.25

### 29. 【AccessMode】关于 ReadWriteOnce（RWO）的含义，描述正确的是？

- **A.** 多节点可以同时读写
- **B.** 单节点读写，同一节点上的多个 Pod 可访问该卷，但不支持并行（非并发）写入
- **C.** 多节点只读
- **D.** 单 Pod 读写且 v1.29 才支持

### 30. 【AccessMode】一个 PV 声明支持多种访问模式，但在实际挂载时？

- **A.** 可以同时使用多种访问模式
- **B.** 只能使用其中一种访问模式，多种不会生效
- **C.** 由 PVC 决定同时使用全部
- **D.** 由 kubelet 自动切换

### 31. 【PVC】PVC 一直停留在 Pending 状态无法绑定 PV，以下哪项不可能是原因？

- **A.** PVC 申请的存储空间大于 PV 的大小
- **B.** PVC 与 PV 的 accessModes 不一致
- **C.** PVC 与 PV 的 storageClassName 不一致
- **D.** Pod 尚未运行

### 32. 【故障】挂载了 PVC 的 Pod 一直处于 Pending，以下哪项不是该 Pod Pending 的常见原因？

- **A.** PVC 未创建
- **B.** PVC 创建失败
- **C.** PVC 与 Pod 不在同一个 Namespace
- **D.** PVC 与 PV 的 accessModes 不一致

### 33. 【subPath】容器 volumeMounts 中的 subPath 字段的作用是？

- **A.** 挂载整个存储卷的根目录
- **B.** 挂载存储卷内的某个子路径，而非其根路径
- **C.** 指定挂载为只读
- **D.** 指定存储卷的 sizeLimit

### 34. 【ConfigMap】若以 subPath 方式将 ConfigMap 挂载到容器，当 ConfigMap 更新后？

- **A.** Pod 会自动热更新配置
- **B.** Pod 不会自动感知到 ConfigMap/Secret 的更新
- **C.** Pod 会被自动重启
- **D.** kubelet 立即报错

### 35. 【StorageClass】StorageClass 属于 Kubernetes 中的哪一级资源？

- **A.** 名称空间级别
- **B.** 集群级别（不属于名称空间，但可在不同命名空间中被使用）
- **C.** 节点级别
- **D.** Pod 级别

### 36. 【StorageClass】StorageClass 实现动态置备时，哪个字段是必须指定的？

- **A.** provisioner（制备器）
- **B.** storageClassName
- **C.** reclaimPolicy（可选）
- **D.** volumeBindingMode（可选）

### 37. 【StorageClass】StorageClass 的 volumeBindingMode 设置为 WaitForFirstConsumer 表示？

- **A.** 立即绑定 PV 与 PVC
- **B.** 延迟绑定，只有 Pod 准备好（被调度）后才进行 PV 与 PVC 的绑定
- **C.** 完全不绑定
- **D.** 随机延迟

### 38. 【StorageClass】用于标记某个 StorageClass 为“默认存储类”的注解键是？

- **A.** storageclass.kubernetes.io/is-default-class
- **B.** default-storage-class
- **C.** kubernetes.io/default-sc
- **D.** annotations.default.class

### 39. 【StorageClass】若集群中有两个或以上的 StorageClass 都被标记为默认（is-default-class: true），结果是？

- **A.** 第一个被标记的生效
- **B.** Kubernetes 会忽略该注解，表现为没有默认 StorageClass
- **C.** 集群报错不可用
- **D.** 随机选择一个作为默认

### 40. 【Local】关于 Local Volume 相比 hostPath 的优势，说法错误的是？

- **A.** Local Volume 支持指定 PV 的存储大小，而 hostPath 不支持
- **B.** Pod 由 PV 所在节点决定调度，而 hostPath 由 Pod 决定节点
- **C.** Local Volume 可通过 StorageClass 声明动态供应并利用 nodeAffinity 实现存储亲和性
- **D.** 节点故障后 Local Volume 中的数据会自动迁移到其它节点而不丢失

### 41. 【emptyDir】emptyDir 默认将数据存放在宿主机路径 /var/lib/kubelet/pods/<pod_id>/volumes/kubernetes.io~empty-dir/<volume_name>/ 下，当 ______ 被删除时，该目录及其中的数据会随之永久消除，无法实现持久化。

> 共 1 个空。

### 42. 【hostPath】hostPath 卷的数据生命周期与 ______ 相同，而 emptyDir 等临时卷的生命周期与 ______ 相同。

> 共 2 个空。

### 43. 【hostPath】hostPath 的 type 字段中，______ 表示若宿主机上对应的目录不存在，则自动创建权限为 0755 的空目录。

> 共 1 个空。

### 44. 【PV】PV 的状态（Status）共有四种，分别是 Available（空闲）、Bound（已绑定）、______（PVC 已删但资源未回收）和 ______（回收失败）。

> 共 2 个空。

### 45. 【AccessMode】Kubernetes 的四种访问模式缩写分别为 RWO（单节点读写）、ROX（多节点只读）、RWX（多节点读写）和 ______（单 Pod 读写，v1.29 stable）。其中 RWO 的全称是 ______，RWOP 的全称是 ______。

> 共 3 个空。

### 46. 【回收】PV 的三种回收策略中，手动创建的 PV 默认为 ______，动态置备的 PV 默认为 ______，而 Recycle 已废弃且仅 NFS 与 hostPath 支持。

> 共 2 个空。

### 47. 【StorageClass】StorageClass 实现动态置备时，必须通过 ______ 字段指定存储驱动（制备器），并通过注解 ______ 将其标记为默认存储类。

> 共 2 个空。

### 48. 【NFS】基于 NFS-Subdir-External-Provisioner 动态创建的 PV，在 NFS 服务器共享目录中以 ______ 格式命名；当该 PV 被回收后，目录会以 ______ 为前缀保留。

> 共 2 个空。

### 49. 【ConfigMap】ConfigMap 中保存的所有配置信息都是以 ______ 的方式存储的（非加密），单个 ConfigMap 的数据大小不能超过 ______。

> 共 2 个空。

### 50. 【Secret】Secret 的常见大类型包括 generic（默认子类型为 ______）、tls（子类型 kubernetes.io/tls，用于保存证书与私钥）和 ______（用于 kubelet 从私有镜像仓库拉取镜像时的认证，子类型 kubernetes.io/dockerconfigjson）。Secret 中数据采用 ______ 编码保存。

> 共 3 个空。


## K8s数据存储面试

### 51. 【面试】简述 Docker 存储机制与 Kubernetes 存储机制的核心差异。

### 52. 【面试】什么是 emptyDir？说明它的生命周期、存储介质及典型使用场景。

### 53. 【面试】hostPath 卷存在哪些问题与限制？适合什么场景？

### 54. 【面试】简述 PV 与 PVC 的职责划分，以及 Pod、PVC、PV 的绑定关系。

### 55. 【面试】请说明 PV 的状态（Available/Bound/Released/Failed）及流转特点。

### 56. 【面试】请解释四种访问模式 RWO、ROX、RWX、RWOP 的含义及适用场景。

### 57. 【面试】说明 Retain、Delete、Recycle 三种回收策略的区别，以及各自的默认值。

### 58. 【面试】什么是 StorageClass？它如何实现动态置备（Dynamic Provisioning）？

### 59. 【面试】Local Volume 与 hostPath 有何区别？Local Volume 的实现要点是什么？

### 60. 【面试】基于 NFS 实现动态置备有哪两种主流方案？分别使用什么 provisioner？

### 61. 【面试】如何修改或取消 Kubernetes 的默认 StorageClass？有哪些注意事项？

### 62. 【面试】ConfigMap 可以通过哪几种方式注入到 Pod？热更新（自动生效）的前提与限制是什么？

### 63. 【面试】简述 ConfigMap 与 Secret 的异同（数据存储形式、用途、大小限制、编码方式）。

### 64. 【面试】Secret 有哪些主要类型（Type）？tls 与 docker-registry 类型分别用于什么场景？

### 65. 【面试】什么是 subPath？为什么以 subPath 方式挂载 ConfigMap/Secret 无法实现热更新？

### 66. 【面试】DownwardAPI 的作用是什么？它支持通过哪两种方式、引用哪些信息注入容器？

### 67. 【面试】什么是 Projected Volume？它支持投射哪四种数据源？

### 68. 【面试】简述 Kubernetes 存储架构中的主要组件（AD控制器、PV Controller、Volume Manager、Scheduler、Volume Plugins）各自的职责。
