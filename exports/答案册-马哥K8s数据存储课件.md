# 马哥K8s数据存储课件 —— 答案与解析

> 共 68 题，编号与《试题册-马哥K8s数据存储课件.md》一致。


## K8s数据存储笔试

### 1. 【Docker存储】Docker 容器可读写层位于容器内部，容器崩溃重建后数据会丢失。以下哪一项 Docker 数据持久化方式本质上是将宿主机目录直接绑定挂载到容器，且不经过 Docker 卷管理机制？

**答案**

**A**　bind mount（绑定挂载，用 -v 节点path:容器path）

**解析**

bind mount 通过 -v 节点path:容器path 将宿主机目录直接挂载；数据卷与匿名卷由 Docker 卷驱动管理并存放于 /var/lib/docker/volumes/；tmpfs 存于内存不持久化。

---

### 2. 【存储】Kubernetes 引入存储卷（Volume）这一抽象概念，主要为了解决以下哪两个问题？

**答案**

**A**　容器崩溃重建导致数据丢失；以及同一 Pod 内多容器需要共享数据

**解析**

文档指出：容器崩溃 kubelet 重建会丢失数据，且同 Pod 多容器需共享数据，Volume 抽象同时解决这两类问题。

---

### 3. 【存储】关于 In-Tree（树内）与 Out-of-Tree（树外）存储插件，以下说法正确的是？

**答案**

**C**　CSI（Container Storage Interface）是社区推荐的方案，支持更大范围存储扩展

**解析**

FlexVolume 已淘汰且运行在 host 空间不能用 RBAC、性能差；CSI 是当前社区推荐方案，支持云原生生态标准。

---

### 4. 【CSI】在 CSI 插件架构中，负责在每个节点上完成存储卷挂载/卸载（Mount/Unmount）的组件是？

**答案**

**B**　CSI Node Server（以 DaemonSet 形式在每个节点运行）

**解析**

CSI Controller Server 以 deployment/StatefulSet 仅部署一个，负责 provision/attach；CSI Node Server 是 DaemonSet，每节点一个，负责节点级 Mount/Unmount。

---

### 5. 【存储】Kubernetes 存储架构中，负责 PV/PVC 的绑定、生命周期管理以及存储卷的 Provision/Delete 操作的组件是？

**答案**

**C**　PV Controller

**解析**

AD控制器负责 Attach/Detach；Volume Manager 负责 Mount/Umount 与格式化；PV Controller 负责 PV/PVC 绑定、生命周期及 Provision/Delete；Scheduler 负责调度。

---

### 6. 【emptyDir】emptyDir 卷的默认存储介质及生命周期特点是？

**答案**

**B**　默认使用宿主机磁盘，且 Pod 删除后对应宿主机目录及数据随之永久消除（不能持久化）

**解析**

emptyDir 默认存储类型，数据位于 /var/lib/kubelet/pods/<pod_id>/volumes/kubernetes.io~empty-dir/<volume_name>/，随 Pod 删除而删除。

---

### 7. 【emptyDir】将 emptyDir 的 medium 字段设置为 Memory 时，底层使用的是什么？

**答案**

**B**　tmpfs（内存支持的文件系统）

**解析**

medium=Memory 使用 tmpfs；tmpfs 在节点重启时数据同样清除，且设置的大小会计入容器的内存限制（memory limit）。

---

### 8. 【emptyDir】emptyDir 最适合的使用场景是？

**答案**

**B**　同一 Pod 内多个容器间的临时数据共享与数据缓存

**解析**

emptyDir 只能临时存放、不能持久化，适用于同 Pod 内容器共享与缓存（如 sidecar 日志代理）。

---

### 9. 【hostPath】hostPath 卷的数据生命周期与谁一致？

**答案**

**B**　节点（Node），Pod 删除后宿主机数据不受影响

**解析**

文档明确：hostPath 生命周期和 Pod 不同，而和节点相同；Pod 删除后宿主机上的 hostPath 数据不受影响。

---

### 10. 【hostPath】hostPath 卷不适合下面哪种工作负载？

**答案**

**B**　Deployment（分布式、多副本跨节点）

**解析**

hostPath 不支持数据漫游、不同节点目录内容可能不同，不适合 Deployment 这类分布式资源，更适合 DaemonSet。

---

### 11. 【hostPath】hostPath 的 type 字段中，若宿主机上对应的目录不存在，会自动创建权限为 0755 的空目录的是？

**答案**

**B**　DirectoryOrCreate

**解析**

type 的 7 种取值中 DirectoryOrCreate 在宿主机无该目录时自动创建 0755 空目录；FileOrCreate 创建 0644 空文件。

---

### 12. 【hostPath】hostPath 的 type 字段默认取值（空字符串）的行为是？

**答案**

**A**　关联存储卷前不进行任何检查，目录不存在则自动创建

**解析**

空字符串为默认配置，在关联 hostPath 前不检查，若宿主机无对应目录会自动创建。

---

### 13. 【NFS】在 Pod 中使用 NFS 类型的存储卷时，以下哪项是必须的？

**答案**

**A**　集群所有 worker 节点必须安装 nfs-common（NFS 客户端）软件

**解析**

文档强调：所有 Kubernetes worker 节点都必须安装 nfs-common，否则 Pod 会因找不到客户端软件而报错；NFS 域名需由宿主机 /etc/hosts 或 DNS 解析（非 CoreDNS）。

---

### 14. 【volume】Pod 中要在容器里挂载已定义的存储卷，容器的挂载列表应定义在哪个字段？

**答案**

**B**　pod.spec.containers[].volumeMounts

**解析**

pod.spec.volumes 定义卷列表；容器通过 pod.spec.containers[].volumeMounts 挂载当前 Pod 中定义的卷，且 name 必须与 volumes 中的 name 匹配。

---

### 15. 【PV】PersistentVolume（PV）属于 Kubernetes 中的哪一级资源？

**答案**

**B**　集群级别，不属于任何 Namespace/Node/Pod，但可被它们访问

**解析**

PV 是集群级别资源，将存储空间引入集群，由管理员定义，可被所有命名空间的 Pod 访问。

---

### 16. 【PVC】PersistentVolumeClaim（PVC）属于 Kubernetes 中的哪一级资源？

**答案**

**B**　名称空间（Namespace）级别，只能被同一命名空间的 Pod 引用

**解析**

PVC 属于名称空间级别资源，只能被同一命名空间内的 Pod 引用，并与选定的 PV 是“一对一”关系。

---

### 17. 【PV】关于 PV 对象的名称，以下说法正确的是？

**答案**

**B**　PV 的名称不支持大写字母

**解析**

文档特别注明：PV 的名称不支持大写；且 PV 对象的名称必须是合法的 DNS 子域名。

---

### 18. 【PVC】PVC 在筛选匹配 PV 时，按条件进行过滤的顺序是？

**答案**

**A**　VolumeMode → LabelSelector → StorageClassName → AccessMode → Size

**解析**

过滤顺序为：VolumeMode → LabelSelector → StorageClassName → AccessMode → Size。

---

### 19. 【PV】PV 的置备（Provision）方式分为哪两类？

**答案**

**A**　静态（集群管理员手动创建）与动态（基于 StorageClass 自动创建）

**解析**

静态：管理员预先手动创建带实际存储细节的 PV；动态：基于 StorageClass，PVC 请求时自动创建。将 storageClassName 设为空字符串可禁用动态配置。

---

### 20. 【PV】将 PVC 的 storageClassName 设置为空字符串 "" 的作用是？

**答案**

**A**　有效地禁用其动态配置（Dynamic Provisioning）

**解析**

文档指出：声明 storageClassName 为空字符串 ""，可以有效地禁用其动态配置。

---

### 21. 【PV】以下哪一项不是 PV 的状态（Status）？

**答案**

**D**　Creating（创建中）

**解析**

PV 状态仅有 Available、Bound、Released、Failed 四种；状态流转是单向过程，不能逆向。

---

### 22. 【PV】PV 处于 Released 状态表示？

**答案**

**B**　PVC 已被删除，但对应的存储资源尚未被回收

**解析**

Released 表示 PVC 已删除但资源还没回收；Failed 才是回收失败。

---

### 23. 【PV】手动创建的 PV 默认回收策略为 Retain，当 PVC 被删除后该 PV 会进入什么状态？

**答案**

**B**　Released（保留 PV 与数据，等待人工干预）

**解析**

Retain 是手动创建 PV 的默认策略，PVC 删除后 PV 进入 Released 并保留数据与 PV 对象，需人工干预才能复用。

---

### 24. 【PV】关于 PV/PVC 的状态流转，以下说法正确的是？

**答案**

**B**　该过程是单向过程，不能逆向

**解析**

文档明确：注意这个过程是单向过程，不能逆向。可通过 kubectl patch 将 PV 的 claimRef 置空，使 Released 变回 Available。

---

### 25. 【回收】手动创建的 PV 默认采用的资源回收策略是？

**答案**

**B**　Retain

**解析**

Retain 是手动创建 PV 的默认策略；Delete 是动态置备 PV 的默认策略；Recycle 已废弃。

---

### 26. 【回收】基于 StorageClass 动态置备出来的 PV，默认采用的资源回收策略是？

**答案**

**B**　Delete

**解析**

Delete 是动态置备 PV 的默认策略，PVC 删除后 PV 与数据一起删除，自动化程度高。

---

### 27. 【回收】目前已被废弃、且仅 NFS 和 hostPath 后端支持的回收策略是？

**答案**

**C**　Recycle

**解析**

Recycle 会保留 PV 但清空数据，仅 NFS 和 hostPath 支持，现已废弃；当前有效策略为 Retain 与 Delete。

---

### 28. 【AccessMode】ReadWriteOncePod（RWOP）访问模式从哪个版本开始 stable 可用？

**答案**

**C**　v1.29（stable 可用）

**解析**

RWOP 确保整个集群只有一个 Pod 能读写该 PVC；v1.22 后开始支持，v1.29 版 stable 可用。

---

### 29. 【AccessMode】关于 ReadWriteOnce（RWO）的含义，描述正确的是？

**答案**

**B**　单节点读写，同一节点上的多个 Pod 可访问该卷，但不支持并行（非并发）写入

**解析**

RWO：卷可被一个节点以读写方式挂载；同一节点多个 Pod 可访问，但不支持并行写入。RWOP 才是单 Pod 读写。

---

### 30. 【AccessMode】一个 PV 声明支持多种访问模式，但在实际挂载时？

**答案**

**B**　只能使用其中一种访问模式，多种不会生效

**解析**

文档指出：一些 PV 可能支持多种访问模式，但挂载时只能使用一种，多种访问模式不会生效。

---

### 31. 【PVC】PVC 一直停留在 Pending 状态无法绑定 PV，以下哪项不可能是原因？

**答案**

**D**　Pod 尚未运行

**解析**

PVC 绑定失败原因在 PVC 与 PV 之间（大小、访问模式、storageClassName）；Pod 是否运行不影响 PVC→PV 绑定。

---

### 32. 【故障】挂载了 PVC 的 Pod 一直处于 Pending，以下哪项不是该 Pod Pending 的常见原因？

**答案**

**D**　PVC 与 PV 的 accessModes 不一致

**解析**

Pod Pending 的常见原因：PVC 没创建、PVC 创建失败、PVC 与 Pod 不在同命名空间；accessModes 不一致是 PVC 绑定 PV 失败的原因，不是 Pod Pending 的直接原因。

---

### 33. 【subPath】容器 volumeMounts 中的 subPath 字段的作用是？

**答案**

**B**　挂载存储卷内的某个子路径，而非其根路径

**解析**

subPath 用于指定所引用卷内的子路径，而非根路径；可实现同一 PVC 下不同 Pod 使用不同子目录。

---

### 34. 【ConfigMap】若以 subPath 方式将 ConfigMap 挂载到容器，当 ConfigMap 更新后？

**答案**

**B**　Pod 不会自动感知到 ConfigMap/Secret 的更新

**解析**

文档重点：如果 Pod 以 subPath 形式挂载 ConfigMap/Secret，则不会自动感知更新；同样通过环境变量引用的配置更新后也不会更新 Pod 变量。

---

### 35. 【StorageClass】StorageClass 属于 Kubernetes 中的哪一级资源？

**答案**

**B**　集群级别（不属于名称空间，但可在不同命名空间中被使用）

**解析**

StorageClass 是集群级别资源，但可在不同命名空间中使用，PVC 只能在同 SC 内过滤 PV。

---

### 36. 【StorageClass】StorageClass 实现动态置备时，哪个字段是必须指定的？

**答案**

**A**　provisioner（制备器）

**解析**

每个 StorageClass 都有 provisioner、parameters、reclaimPolicy 字段，其中 provisioner（存储驱动）必须指定。

---

### 37. 【StorageClass】StorageClass 的 volumeBindingMode 设置为 WaitForFirstConsumer 表示？

**答案**

**B**　延迟绑定，只有 Pod 准备好（被调度）后才进行 PV 与 PVC 的绑定

**解析**

WaitForFirstConsumer 为延迟绑定模式，等使用 PVC 的 Pod 就绪后再绑定，便于调度器综合节点约束决策；与之相对的是 Immediate。

---

### 38. 【StorageClass】用于标记某个 StorageClass 为“默认存储类”的注解键是？

**答案**

**A**　storageclass.kubernetes.io/is-default-class

**解析**

通过注解 storageclass.kubernetes.io/is-default-class 设为 "true" 来标记默认；除 true 外其它值或缺省均视为 false。

---

### 39. 【StorageClass】若集群中有两个或以上的 StorageClass 都被标记为默认（is-default-class: true），结果是？

**答案**

**B**　Kubernetes 会忽略该注解，表现为没有默认 StorageClass

**解析**

文档指出：最多只能有一个 StorageClass 被标记为默认；若两个或多个被标记，Kubernetes 将忽略该注解，即表现为没有默认 SC。

---

### 40. 【Local】关于 Local Volume 相比 hostPath 的优势，说法错误的是？

**答案**

**D**　节点故障后 Local Volume 中的数据会自动迁移到其它节点而不丢失

**解析**

Local Volume 仍依赖底层节点可用性，节点不健康则数据不可访问、可能丢失，需自备备份/恢复机制；并非自动迁移。

---

### 41. 【emptyDir】emptyDir 默认将数据存放在宿主机路径 /var/lib/kubelet/pods/<pod_id>/volumes/kubernetes.io~empty-dir/<volume_name>/ 下，当 ______ 被删除时，该目录及其中的数据会随之永久消除，无法实现持久化。

**答案**

- 第 1 空：Pod / Pod对象

**解析**

emptyDir 随 Pod 初始化而来、随 Pod 删除而消失，目录位于 kubelet pods 目录下，不能持久化。

---

### 42. 【hostPath】hostPath 卷的数据生命周期与 ______ 相同，而 emptyDir 等临时卷的生命周期与 ______ 相同。

**答案**

- 第 1 空：节点 / Node / 宿主机
- 第 2 空：Pod / Pod对象 / 临时卷

**解析**

hostPath 生命周期与节点一致（Pod 删除数据仍在）；emptyDir 生命周期与 Pod 一致。

---

### 43. 【hostPath】hostPath 的 type 字段中，______ 表示若宿主机上对应的目录不存在，则自动创建权限为 0755 的空目录。

**答案**

- 第 1 空：DirectoryOrCreate

**解析**

type 取值：DirectoryOrCreate 自动创建 0755 目录；FileOrCreate 自动创建 0644 文件；Directory/File 要求已存在。

---

### 44. 【PV】PV 的状态（Status）共有四种，分别是 Available（空闲）、Bound（已绑定）、______（PVC 已删但资源未回收）和 ______（回收失败）。

**答案**

- 第 1 空：Released
- 第 2 空：Failed

**解析**

PV 状态：Available/Bound/Released/Failed，且状态流转是单向、不可逆向的。

---

### 45. 【AccessMode】Kubernetes 的四种访问模式缩写分别为 RWO（单节点读写）、ROX（多节点只读）、RWX（多节点读写）和 ______（单 Pod 读写，v1.29 stable）。其中 RWO 的全称是 ______，RWOP 的全称是 ______。

**答案**

- 第 1 空：RWOP
- 第 2 空：ReadWriteOnce
- 第 3 空：ReadWriteOncePod

**解析**

RWO=ReadWriteOnce；ROX=ReadOnlyMany；RWX=ReadWriteMany；RWOP=ReadWriteOncePod（v1.22 起支持，v1.29 stable）。

---

### 46. 【回收】PV 的三种回收策略中，手动创建的 PV 默认为 ______，动态置备的 PV 默认为 ______，而 Recycle 已废弃且仅 NFS 与 hostPath 支持。

**答案**

- 第 1 空：Retain
- 第 2 空：Delete

**解析**

Retain 保留 PV 与数据需人工干预；Delete 随 PVC 删除 PV 与数据；Recycle 仅 NFS/hostPath 且已废弃。

---

### 47. 【StorageClass】StorageClass 实现动态置备时，必须通过 ______ 字段指定存储驱动（制备器），并通过注解 ______ 将其标记为默认存储类。

**答案**

- 第 1 空：provisioner
- 第 2 空：storageclass.kubernetes.io/is-default-class

**解析**

provisioner 是必须字段；默认 SC 注解为 storageclass.kubernetes.io/is-default-class，取值 "true" 表示默认。

---

### 48. 【NFS】基于 NFS-Subdir-External-Provisioner 动态创建的 PV，在 NFS 服务器共享目录中以 ______ 格式命名；当该 PV 被回收后，目录会以 ______ 为前缀保留。

**答案**

- 第 1 空：${namespace}-${pvcName}-${pvName} / namespace-pvcName-pvName
- 第 2 空：archieved-${namespace}-${pvcName}-${pvName} / archieved-namespace-pvcName-pvName

**解析**

自动创建 PV 命名规则：${namespace}-${pvcName}-${pvName}；回收后改为 archieved-${namespace}-${pvcName}-${pvName}。

---

### 49. 【ConfigMap】ConfigMap 中保存的所有配置信息都是以 ______ 的方式存储的（非加密），单个 ConfigMap 的数据大小不能超过 ______。

**答案**

- 第 1 空：明文
- 第 2 空：1MiB / 1Mi / 1M

**解析**

ConfigMap 数据以明文保存，便于快速获取与更新；文档规定内容大小不能超过 1MiB。

---

### 50. 【Secret】Secret 的常见大类型包括 generic（默认子类型为 ______）、tls（子类型 kubernetes.io/tls，用于保存证书与私钥）和 ______（用于 kubelet 从私有镜像仓库拉取镜像时的认证，子类型 kubernetes.io/dockerconfigjson）。Secret 中数据采用 ______ 编码保存。

**答案**

- 第 1 空：Opaque
- 第 2 空：docker-registry / docker-registry/docker config / dockerconfigjson
- 第 3 空：Base64 / base64

**解析**

generic 默认子类型 Opaque；docker-registry 用于私有仓库认证；Secret 数据采用 Base64 编码（安全性一般）。

---


## K8s数据存储面试

### 51. 【面试】简述 Docker 存储机制与 Kubernetes 存储机制的核心差异。

**答案**

1. Docker 镜像只读、容器层可读写但不持久化；Docker 通过 host 机制（数据卷/数据卷容器 bind mount）或网络存储机制实现持久化，但容器跨节点易丢数据。
2. Kubernetes 引入 Volume 抽象：容器文件在磁盘上临时存放，容器崩溃 kubelet 重建会丢数据，同 Pod 多容器还需共享数据，Volume 同时解决这两点。
3. K8s 卷类型丰富（emptyDir/hostPath/NFS/CephFS/PV-PVC/ConfigMap/Secret 等），并进一步抽象出集群级 PV 与命名空间级 PVC 分层管理，解耦开发者和存储管理员；还可经 CSI 树外扩展各种存储后端。
4. Docker 只解决单机持久化，K8s 解决集群内多节点、多容器的持久化与配置分发。

**解析**

【衍生知识点】Docker 三个接口 CRI/CNI/CSI 对应运行时、网络、存储；K8s 存储分 In-Tree 与 Out-of-Tree（CSI/FlexVolume，FlexVolume 已淘汰）。

---

### 52. 【面试】什么是 emptyDir？说明它的生命周期、存储介质及典型使用场景。

**答案**

定义：emptyDir 在 Pod 被调度到某节点时自动创建，无需指定宿主机目录，初始为空。
生命周期：与 Pod 一致，Pod 删除后宿主机对应目录（/var/lib/kubelet/pods/<pod_id>/volumes/kubernetes.io~empty-dir/<volume_name>/）及数据随之永久消除，不能持久化。
介质：medium 默认使用宿主机磁盘；设为 Memory 则底层为 tmpfs（节点重启数据清除，且计入容器内存限制）；sizeLimit 默认不限制。
场景：同一 Pod 内多容器临时数据共享、数据缓存、sidecar 日志代理等。

**解析**

【衍生知识点】emptyDir 是临时卷，区别于持久卷；它是最简单的默认存储类型。

---

### 53. 【面试】hostPath 卷存在哪些问题与限制？适合什么场景？

**答案**

适合场景：容器文件需永久保存（Pod 删除宿主机数据仍在）、复用宿主机文件（如 /var/lib/docker）、挂载时区配置等；更适合 DaemonSet。
问题与限制：
1. 不支持数据漫游，只在所在宿主机可用，其它节点不可用；
2. 不同宿主机目录内容可能不同，Pod 迁移前后访问效果不一致；
3. 不适合 Deployment 等分布式资源，更适合 DaemonSet；
4. 宿主机目录不属于独立资源对象，不受资源配额限制；
5. Scheduler 不考虑 hostPath 大小，无法声明存储需求；
6. DirectoryOrCreate/FileOrCreate 需保证 kubelet 有创建权限，root 创建的目录容器内可能需提权才能写。

**解析**

【衍生知识点】hostPath 的 7 种 type：空串(默认不检查自动建)、DirectoryOrCreate、Directory、FileOrCreate、File、Socket、CharDevice、BlockDevice。

---

### 54. 【面试】简述 PV 与 PVC 的职责划分，以及 Pod、PVC、PV 的绑定关系。

**答案**

职责划分：
- PV（PersistentVolume）：集群级资源，由存储管理员定义，把实际网络存储引入集群，有独立生命周期；
- PVC（PersistentVolumeClaim）：命名空间级资源，由用户定义，表达对存储的请求（大小、访问模式、SC 等），与 PV 一对一绑定；
- Pod 通过 persistentVolumeClaim 卷插件引用 PVC，PVC 再绑定 PV。
关系：Pod 与 PVC 必须在同一命名空间；PVC 按 VolumeMode→LabelSelector→StorageClassName→AccessMode→Size 顺序过滤匹配空闲 PV；匹配成功后 PVC 与 PV 一对一绑定，Pod 挂载使用。删除顺序应为先删 Pod、再删 PVC、最后删 PV，否则可能卡死。

**解析**

【衍生知识点】PV 名称不支持大写，且必须是合法 DNS 子域名；PV 置备分静态（手动）与动态（StorageClass）。

---

### 55. 【面试】请说明 PV 的状态（Available/Bound/Released/Failed）及流转特点。

**答案**

状态：
- Available：空闲，PV 未被任何 PVC 使用；
- Bound：PV 已绑定到某 PVC；
- Released：PVC 已删除，但存储资源尚未被回收（数据还在）；
- Failed：资源回收失败。
特点：状态流转是单向过程，不能逆向。Released 状态的 PV 可通过 kubectl patch 将 spec.claimRef 置为 null，使其回到 Available 被重新绑定；PVC 侧也可 patch 让状态从 Lost/Released 修正。Retain 策略下 PVC 删除后 PV 进入 Released 保留数据。

**解析**

【衍生知识点】手动创建 PV 默认 Retain；动态 PV 默认 Delete；绑定失败 PVC 会停留在 Pending。

---

### 56. 【面试】请解释四种访问模式 RWO、ROX、RWX、RWOP 的含义及适用场景。

**答案**

- RWO（ReadWriteOnce）：卷可被一个节点以读写方式挂载；同一节点上的多个 Pod 可访问，但不支持并行（非并发）写入。适合单节点单读写的有状态应用（如单实例数据库）。
- ROX（ReadOnlyMany）：卷可被多个节点以只读方式挂载。适合多副本只读配置/静态资源。
- RWX（ReadWriteMany）：卷可被多个节点以读写方式挂载。适合多节点共享读写（如 NFS、分布式文件系统）。
- RWOP（ReadWriteOncePod）：整个集群中只有一个 Pod 能以读写方式挂载该 PVC；v1.22 起支持，v1.29 stable。确保严格单 Pod 独占。
注意：PV 可声明多种访问模式，但挂载时只能用其中一种，多种不会生效；不同后端支持的访问模式不同。

**解析**

【衍生知识点】访问模式需在 PV 与 PVC 两边一致才能绑定。

---

### 57. 【面试】说明 Retain、Delete、Recycle 三种回收策略的区别，以及各自的默认值。

**答案**

- Retain：PVC 删除后保留 PV 与其中数据，后续删除需人工干预；是手动创建 PV 的默认值，一般推荐用于重要数据。
- Delete：PVC 删除后 PV 与数据一起被删除，自动化程度高；是动态置备 PV 的默认值。
- Recycle（已废弃）：保留 PV 但清空其数据，仅 NFS 和 hostPath 支持；现在已不推荐使用。
此外，PVC 删除后 K8s 会为 Retain 之外的策略生成 recycler-for-<PV> Pod 执行回收（Retain 除外）。回收完成后 PV 进入 Released，若条件匹配可被其它 Pending PVC 再次绑定。

**解析**

【衍生知识点】回收策略在 pv.spec.persistentVolumeReclaimPolicy 中设置；目前有效值仅 Retain 与 Delete。

---

### 58. 【面试】什么是 StorageClass？它如何实现动态置备（Dynamic Provisioning）？

**答案**

定义：StorageClass 是集群级资源，描述一类存储的属性（如性能等级、后端类型），使管理员能抽象出不同质量的存储服务，供用户直观选择。它不是命名空间级但可在各命名空间使用。
动态置备流程：
1. 管理员安装对应 provisioner（制备器，如 NFS-Subdir-External-Provisioner、csi-driver-nfs）；
2. 创建 StorageClass，必须指定 provisioner，并可设 parameters、reclaimPolicy、allowVolumeExpansion、volumeBindingMode（Immediate 或 WaitForFirstConsumer）；
3. 用户创建 PVC 并指定 storageClassName；
4. K8s 找到对应 SC，调用其 provisioner 自动创建 PV 并绑定 PVC。
绑定条件：PVC 与 PV 要么同属一个 SC，要么都不属于任何 SC。PVC 的 storageClassName 设为空字符串可禁用动态配置。

**解析**

【衍生知识点】默认 SC 通过注解 storageclass.kubernetes.io/is-default-class: "true" 标记；多个默认会被忽略。

---

### 59. 【面试】Local Volume 与 hostPath 有何区别？Local Volume 的实现要点是什么？

**答案**

区别：
- 调度：Local Volume 的 Pod 由 PV 所在节点（通过 nodeAffinity）决定调度；hostPath 由 Pod 决定节点，重建后可能落到新节点导致旧数据不可用。
- 大小：Local Volume 支持声明 PV 存储大小，hostPath 不支持且 Scheduler 不考虑其大小。
- 可移植/持久：Local Volume 可通过 StorageClass 管理、声明动态供应并利用节点亲和性实现存储亲和性，比 hostPath 更持久可移植。
实现要点：
- 使用 local 卷需定义 nodeAffinity（kubernetes.io/hostname），调度器据此将 Pod 调到正确节点；
- 通常配合 StorageClass，provisioner 设为 kubernetes.io/no-provisioner（静态），volumeBindingMode 设 WaitForFirstConsumer；
- 底层应是一块额外挂载的磁盘/块设备（一个 PV 一块盘），而非宿主机根盘；K8s 不自动创建本地路径，需管理员预先建好；
- 本地卷默认不支持动态配置，但可用第三方方案实现。节点故障会导致数据不可访问，需备份机制。

**解析**

【衍生知识点】v1.10+ 推出 local PV；Local Volume 仍是节点级存储，不适合所有应用。

---

### 60. 【面试】基于 NFS 实现动态置备有哪两种主流方案？分别使用什么 provisioner？

**答案**

方案一：NFS-Subdir-External-Provisioner（Kubernetes SIGs 社区开发、官方推荐），是对已停更的 nfs-client-provisioner 的扩展。provisioner 名为 k8s-sigs.io/nfs-subdir-external-provisioner，通过 Deployment + ServiceAccount/RBAC 部署，PVC 创建时自动在 NFS 共享目录生成 ${namespace}-${pvcName}-${pvName} 子目录，回收后改为 archieved- 前缀。也可通过 Helm 部署（默认 SC 名为 nfs-client）。
方案二：csi-driver-nfs（CSI 标准驱动），provisioner 名为 nfs.csi.k8s.io。需先部署 CSI 驱动（controller + 各节点 node DaemonSet，以及 CRD），再创建 StorageClass（parameters 含 server 与 share），支持动态与静态置备。
两者对比：Subdir 方案实现简单、社区资料多；csi-driver-nfs 更符合 CSI 标准、功能更现代。

**解析**

【衍生知识点】nfs-client-provisioner 已迁移到 NFS-Subdir-External-Provisioner 仓库，不再更新。

---

### 61. 【面试】如何修改或取消 Kubernetes 的默认 StorageClass？有哪些注意事项？

**答案**

标记/取消默认通过注解 storageclass.kubernetes.io/is-default-class 实现：
- 设为 "true" 即默认；设为 "false" 或非 true 即非默认。
操作方式：
1. kubectl patch：kubectl patch storageclass <name> -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'；
2. kubectl edit storageclass <name> 修改注解。
注意事项：
- 集群中最多只能有一个默认 SC；若两个及以上被标记为默认，Kubernetes 忽略该注解，表现为没有默认 SC；
- 未指定 storageClassName 的 PVC 会使用默认 SC 动态置备；
- 预装的默认 SC 可能不合适，可改默认或禁用动态配置；但删除默认 SC 可能被扩展管理器自动重建，需查安装文档禁用对应扩展。

**解析**

【衍生知识点】PVC 未指定 SC 时绑定默认 SC；多个默认时取最新设置的（但规范建议避免）。

---

### 62. 【面试】ConfigMap 可以通过哪几种方式注入到 Pod？热更新（自动生效）的前提与限制是什么？

**答案**

注入方式：
1. 环境变量：用 env.valueFrom.configMapKeyRef 引用单个键，或用 envFrom 批量导入 CM 中所有键值；
2. 存储卷（volume）：将 ConfigMap 作为卷挂载到容器内目录，生成以 key 为文件名、value 为内容的文件（通过双层软链接 ..data 实现）。
热更新前提与限制：
- 以 volume 方式挂载（非 subPath）时，ConfigMap 更新后 kubelet 会通过更新 ..data 软链接在数十秒内让容器内文件变动，应用若支持热加载即可生效；
- 以 subPath 方式挂载 ConfigMap/Secret，Pod 不会自动感知更新；
- 通过环境变量（或 envFrom）引用的配置，更新后不会更新已在运行的 Pod 变量；
- 通常需要 kubectl rollout restart deployment 或删除 Pod 触发重建来强制生效；应用自身也需能重载配置。

**解析**

【衍生知识点】ConfigMap 数据以明文保存，单 CM 大小上限 1MiB；v1.19 起支持 immutable 不可变实例。

---

### 63. 【面试】简述 ConfigMap 与 Secret 的异同（数据存储形式、用途、大小限制、编码方式）。

**答案**

相同点：
- 都是命名空间级配置资源，只能被同命名空间 Pod 引用；
- 都可用 env 或 volume 方式注入 Pod；
- 都支持动态更新（volume 非 subPath 挂载可热更新）；
- 都可用 kubectl 命令式（--from-literal/--from-file）或资源清单创建；v1.19 起支持 immutable。
不同点：
- 用途：ConfigMap 存一般配置（环境变量、配置文件）；Secret 存敏感信息（密码、证书、token）；
- 编码：ConfigMap 明文保存；Secret 数据采用 Base64 编码（非真正加密，安全性一般）；
- 存储后端：Secret 卷通过 tmpfs（内存文件系统）实现，不是永久存储；
- 大小限制：ConfigMap 单对象数据不超过 1MiB；Secret 每个对象数据不超过 1MB，并可通过资源配额限制每命名空间 Secret 数量；
- 类型：Secret 有 Opaque/tls/docker-registry/service-account-token 等子类型，ConfigMap 无类型区分。

**解析**

【衍生知识点】Secret 明文可用 stringData 字段传递，创建时自动转 Base64 存入 data。

---

### 64. 【面试】Secret 有哪些主要类型（Type）？tls 与 docker-registry 类型分别用于什么场景？

**答案**

主要大类型与子类型：
- generic：默认子类型 Opaque（任意用户数据）、kubernetes.io/service-account-token、kubernetes.io/basic-auth、kubernetes.io/ssh-auth、bootstrap.kubernetes.io/token 等；
- tls：子类型 kubernetes.io/tls，用于保存 TLS/SSL 证书与配对私钥；
- docker-registry：子类型 kubernetes.io/dockerconfigjson（新版）/kubernetes.io/dockercfg（旧版），用于 kubelet 拉取私有镜像仓库时的认证。
场景：
- tls 类型：保存证书(cert/tls.crt)与私钥(tls.key)，常用于 Ingress/HTTPS 服务；
- docker-registry 类型：保存私有仓库地址、用户名、密码（或 .docker/config.json），Pod 通过 imagePullSecrets 引用，使 kubelet 能从私有仓库拉镜像。
注意：不同类型支持的字段不同，如 ssh-auth 用 ssh-privatekey，basic-auth 用 username/password。

**解析**

【衍生知识点】service-account-token 由集群自动创建，供 Pod 访问 API 认证。

---

### 65. 【面试】什么是 subPath？为什么以 subPath 方式挂载 ConfigMap/Secret 无法实现热更新？

**答案**

定义：volumeMounts.subPath 用于指定所引用卷内的子路径（而非根路径），可让同一 PVC/ConfigMap 下不同 Pod 挂载不同子目录（如 LAMP 中 MySQL 用 subPath:mysql、PHP 用 subPath:html）。
为何无法热更新：
- 以 subPath 挂载时，kubelet 是把卷中某个具体子文件/子目录 bind 到容器固定路径，而不是挂载整个卷根并通过 ..data 软链接切换；
- ConfigMap/Secret 的自动更新机制依赖 volume 根目录下 ..data 软链接指针的整体切换来实现原子更新，subPath 绕过了这层机制；
- 因此 subPath 挂载的内容在 ConfigMap/Secret 更新后不会被 kubelet 自动刷新，需重建 Pod 才能生效。
同理，通过环境变量引用 CM/Secret 也不会热更新。

**解析**

【衍生知识点】要热更新配置应避免 subPath，改用整卷挂载并在应用内支持 reload；或滚动重启 Deployment。

---

### 66. 【面试】DownwardAPI 的作用是什么？它支持通过哪两种方式、引用哪些信息注入容器？

**答案**

作用：DownwardAPI 让 Pod 中的应用容器反向引用自身所在的 Pod/Node 运行环境信息（metadata、spec、status），无需提前创建资源对象，它自身一直存在（严格说不是存储卷）。
两种方式：
1. 环境变量（env）：通过 valueFrom.fieldRef / resourceFieldRef 注入单个变量。fieldRef 可引用 metadata.name/namespace/uid/labels['k']/annotations['k']/spec.nodeName/spec.serviceAccountName/status.podIP/status.hostIP；resourceFieldRef 可引用 requests.cpu/memory/ephemeral-storage 与 limits.cpu/memory/ephemeral-storage。注意环境变量只支持常量，进程启动后无法更新。
2. 存储卷（volume）：downwardAPI 卷 items 中 fieldRef 引用 metadata.name/namespace/uid/labels/annotations/spec.nodeName(否)/...，resourceFieldRef 引用资源请求与限制；labels/annotations 仅能经 volume 注入（不支持 env）。volume 方式支持动态更新，且 defaultMode 可设文件权限（默认 0644）。

**解析**

【衍生知识点】spec.nodeName、status.podIP、status.hostIP、spec.serviceAccountName 仅能经 env 注入，不能经 volume。

---

### 67. 【面试】什么是 Projected Volume？它支持投射哪四种数据源？

**答案**

定义：Projected（投射卷）是一种特殊卷类型，支持将多个现有卷源同时投射到同一个挂载点目录，解决了普通 CM/Secret 卷在一个目录只能挂一个卷的限制；它本身不是独立的 API 资源类型。
支持的四种数据源（仅这四类）：
1. ConfigMap：投射 ConfigMap 对象；
2. Secret：投射 Secret 对象；
3. DownwardAPI：投射 Pod 自身元数据/资源信息；
4. ServiceAccountToken：投射 ServiceAccount 的 token。
典型用途：一个目录同时提供应用配置（CM）、密钥（Secret）、Pod 信息（DownwardAPI）与访问 API 的令牌（SA token），如默认每个 Pod 都带有的 kube-api-access 投射卷。

**解析**

【衍生知识点】Projected 卷内各源更新行为遵循各自原卷规则（如 subPath 形式不热更新等）。

---

### 68. 【面试】简述 Kubernetes 存储架构中的主要组件（AD控制器、PV Controller、Volume Manager、Scheduler、Volume Plugins）各自的职责。

**答案**

- Attach/Detach 控制器（AD控制器）：负责存储设备的 Attach/Detach 操作——将设备附加到目标节点（Attach）或从节点卸载（Detach）。
- PV Controller：负责 PV/PVC 的绑定、生命周期管理，以及存储卷的 Provision/Delete 操作。
- Volume Manager（卷管理器）：负责完成卷的 Mount/Unmount 操作以及设备格式化等，等待 AD 完成 attach 后在节点上将设备挂载到全局目录。
- Scheduler：实现 Pod 调度，涉及卷的调度约束（如 ebs/csi 单节点最大可 attach 磁盘数的 predicate 策略），存储插件影响 Pod 调度到哪个节点。
- Volume Plugins（卷插件）：包含 K8s 原生（emptyDir、hostPath、csi 等）与各厂商（aws-ebs、azure 等）的存储插件，扩展各种存储类型卷的管理能力。
整体流程：Pod 调度→PVC Pending 触发 PV Controller provision→AD 控制器 attach→节点 Volume Manager mount→kubelet 以 bind mount 映射进容器。

**解析**

【衍生知识点】CSI 把插件拆分为 CSI Controller Server（provision/attach）与 CSI Node Server（每节点 mount），分别由 provisioner 与 node 插件实现。

---
