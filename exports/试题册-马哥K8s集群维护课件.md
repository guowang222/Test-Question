# 马哥K8s集群维护课件 —— 试题册

> 共 72 题。答案与解析见《答案册-马哥K8s集群维护课件.md》。


## K8s集群维护笔试

### 1. 【节点管理】删除一个 Master 节点时，必须保证集群中至少保留多少个 Master 才能避免集群失败？

- **A.** 保留半数以上个 Master
- **B.** 至少 1 个即可
- **C.** 全部保留
- **D.** 无任何要求

### 2. 【节点管理】将节点标记为「不可调度」（仅影响新 Pod，不影响已有 Pod）的命令是？

- **A.** kubectl drain
- **B.** kubectl cordon
- **C.** kubectl delete node
- **D.** kubectl reboot

### 3. 【节点管理】要排空（驱逐）某节点上的所有 Pod，应使用哪条命令？

- **A.** kubectl cordon node3.wang.org
- **B.** kubectl delete node node3.wang.org
- **C.** kubectl drain node3.wang.org --ignore-daemonsets --delete-emptydir-data
- **D.** kubeadm reset

### 4. 【节点管理】kubectl drain 中用于忽略 DaemonSet 管理 Pod 的选项是？

- **A.** --force
- **B.** --delete-emptydir-data
- **C.** --grace-period=0
- **D.** --ignore-daemonsets

### 5. 【节点管理】旧版 kubectl drain 的 --delete-local-data 选项，新版被哪个选项取代？

- **A.** --delete-emptydir-data
- **B.** --force
- **C.** --ignore-daemonsets
- **D.** --disable-eviction

### 6. 【节点管理】在待下线节点上清理 kubeadm 安装痕迹的命令是？

- **A.** kubeadm cleanup
- **B.** kubeadm reset
- **C.** kubeadm delete
- **D.** kubectl reset

### 7. 【节点管理】kubeadm reset 之后，哪一项需要手工清理（reset 不会自动处理）？

- **A.** kubelet 配置文件
- **B.** /etc/kubernetes/manifests
- **C.** /etc/cni/net.d 下的 CNI 配置
- **D.** /var/lib/kubelet

### 8. 【Token】生成把 Worker 节点加入集群的命令，正确写法是？

- **A.** kubeadm join --print
- **B.** kubeadm token list --join
- **C.** kubeadm token generate
- **D.** kubeadm token create --print-join-command

### 9. 【Token】kubeadm join 中 --discovery-token-ca-cert-hash 的 sha256 值通常如何得到？

- **A.** 从 /etc/kubernetes/pki/ca.crt 导出公钥后计算 sha256
- **B.** 由 kubeadm token list 直接输出
- **C.** 从 kubeadm-config 的 ConfigMap 中读取
- **D.** 由 kubeadm 随机生成

### 10. 【Token】向已有高可用集群新增一个控制平面（Master）节点时，除 token 与 ca-cert-hash 外还需要哪些参数？

- **A.** --pod-network-cidr
- **B.** --control-plane 与 --certificate-key
- **C.** --service-cidr
- **D.** --apiserver-advertise-address

### 11. 【Token】上传控制平面证书并生成 certificate-key 的命令是？

- **A.** kubeadm certs renew all
- **B.** kubeadm token create --print-join-command
- **C.** kubeadm init phase upload-certs --upload-certs
- **D.** kubeadm init phase certs all

### 12. 【etcd】从 etcd 集群中删除一个成员（Member）使用的命令是？

- **A.** etcdctl member delete <成员ID>
- **B.** etcdctl user delete <成员ID>
- **C.** kubectl delete node <节点名>
- **D.** etcdctl member remove <成员ID>

### 13. 【etcd】查看 etcd 集群成员列表的命令是？

- **A.** etcdctl member list
- **B.** etcdctl cluster-health
- **C.** etcdctl endpoint status
- **D.** etcdctl get /members

### 14. 【容灾】RPO（Recovery Point Objective）准确的含义是？

- **A.** 服务中断与服务恢复之间可接受的最大延迟时间
- **B.** 自上一个数据恢复点以来可接受的最大数据丢失量
- **C.** 备份窗口的可接受时长
- **D.** 集群可承载的节点数量上限

### 15. 【容灾】RTO（Recovery Time Objective）准确的含义是？

- **A.** 可接受的数据丢失量
- **B.** 恢复点的数量
- **C.** 服务中断与服务恢复之间可接受的最大延迟时间（决定可接受的停机时长）
- **D.** 备份的频率

### 16. 【容灾】三种容灾策略中，RPO/RTO 达到「实时/无数据丢失」且成本最高的是？

- **A.** 备份与恢复（Backup-Restore）
- **B.** 主备（Active-Standby）
- **C.** 单机部署
- **D.** 双活（Active-Active）

### 17. 【容灾】「两地三中心」（同城双活 + 异地灾备）是哪种容灾模型的典型实践？

- **A.** 双活（Active-Active）
- **B.** 备份与恢复
- **C.** 主备（Active-Standby）
- **D.** 冷备

### 18. 【备份】在 Kubernetes 中需要备份的内容不包括？

- **A.** 集群资源（Deployment/Service/ConfigMap/Secret/PVC 等）
- **B.** 节点操作系统的内核参数配置
- **C.** ETCD 数据库
- **D.** 持久化存储（PV）中的数据

### 19. 【备份】导出所有名称空间的常见资源为 YAML 清单的命令是？

- **A.** kubectl get all -o json
- **B.** kubectl describe all
- **C.** kubectl get all --all-namespaces -o yaml > all-resources.yaml
- **D.** kubectl export all

### 20. 【etcd】使用 etcdctl 备份 ETCD 生成快照的命令是？

- **A.** etcdctl snapshot restore /backup/etcd-snapshot.db
- **B.** etcdctl backup
- **C.** etcdctl member save
- **D.** ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db

### 21. 【etcd】验证 etcd 快照文件完整性与状态的命令是？

- **A.** etcdctl snapshot status <文件> --write-out=table
- **B.** etcdctl snapshot check
- **C.** etcdctl snapshot verify
- **D.** etcdctl status

### 22. 【etcd】etcdctl snapshot restore 时用于指定还原数据目录的参数是？

- **A.** --restore-dir
- **B.** --data-dir
- **C.** --backup-dir
- **D.** --output-dir

### 23. 【etcd】etcd 默认的客户端通信端口与节点间（peer）通信端口分别是？

- **A.** 6443 与 2379
- **B.** 8080 与 9090
- **C.** 2379 与 2380
- **D.** 2380 与 2379

### 24. 【etcd】etcd 由哪个团队于 2013 年 6 月创建？

- **A.** Google
- **B.** RedHat
- **C.** VMware
- **D.** CoreOS

### 25. 【etcd】etcd 基于什么一致性协议、用什么语言实现？

- **A.** Raft 协议 + Go 语言
- **B.** Paxos 协议 + Java
- **C.** Raft 协议 + C++
- **D.** ZAB 协议 + Go

### 26. 【etcd】按照 CAP 理论，etcd 属于哪种模式？

- **A.** AP
- **B.** CP
- **C.** CA
- **D.** BASE

### 27. 【etcd】etcd 集群选举 Leader 时，节点需要获得多少选票才能当选？

- **A.** 全部节点同意
- **B.** 2 票即可
- **C.** 超过 n/2+1（即集群大多数）
- **D.** 随机决定

### 28. 【etcd】etcd 中 Leader 定期发送心跳（Heartbeat Interval）的默认间隔是？

- **A.** 1s
- **B.** 10s
- **C.** 1min
- **D.** 100ms

### 29. 【etcd】Follower 超过多久未收到 Leader 消息就会转为 Candidate 并发起选举（Election Timeout 默认值）？

- **A.** 1s
- **B.** 100ms
- **C.** 5s
- **D.** 30s

### 30. 【etcd】etcd 默认的事务隔离级别是？

- **A.** 可重复读（Repeated Read）
- **B.** 串行化（Serializable）
- **C.** 读已提交（Read Committed）
- **D.** 未提交读（Read Uncommitted）

### 31. 【etcd】关于 etcd 集群节点数量，官方推荐的最少节点数与奇偶原则是？

- **A.** 1 个即可
- **B.** 2 个即可
- **C.** 最少 3 个，奇数优于偶数
- **D.** 最少 6 个，偶数优于奇数

### 32. 【etcd】etcd 中所有数据提交前先记录日志、用于持久化存储的机制是？

- **A.** Snapshot（快照）
- **B.** MVCC（多版本并发控制）
- **C.** BoltDB 索引
- **D.** WAL（Write Ahead Log，预写式日志）

### 33. 【Velero】Velero 项目的前身名称是？

- **A.** Heptio Ark
- **B.** Stash
- **C.** Restic
- **D.** Kube-backup

### 34. 【Velero】Velero 中用于定义「集群资源对象数据存放位置」的 CRD 是？

- **A.** VolumeSnapshotLocation
- **B.** BackupStorageLocation
- **C.** BackupRepository
- **D.** ObjectStoreLocation

### 35. 【Velero】Velero 服务端主要由哪两个 Controller 组成？

- **A.** Backup Controller 与 Restore Controller
- **B.** Deployment Controller 与 StatefulSet Controller
- **C.** Kubelet 与 kube-proxy
- **D.** Prometheus 与 Grafana

### 36. 【Velero】与 ETCD 备份方式相比，下列哪一项**不是** Velero 的优势？

- **A.** 支持按 Namespace/Type/Label/Pod 等对象级粒度过滤备份
- **B.** 内置支持周期性定期备份（schedule）
- **C.** 支持对 PV 卷中的数据进行备份
- **D.** 无需 Kubernetes API Server 即可完成备份与还原

### 37. 【Velero】Velero 客户端默认在哪个名称空间操作？

- **A.** kube-system
- **B.** velero
- **C.** default
- **D.** kube-public

### 38. 【证书】基于 kubeadm 安装的集群中，CA 根证书与其他证书的默认有效期分别是？

- **A.** CA 1 年、其他 10 年
- **B.** 均为 1 年
- **C.** 均为 10 年
- **D.** CA 10 年、其他 1 年

### 39. 【证书】kubeadm 安装的集群中，证书默认存放目录是？

- **A.** /etc/kubernetes/pki
- **B.** /etc/kubernetes/certs
- **C.** /var/lib/kubernetes/pki
- **D.** /etc/pki/k8s

### 40. 【证书】Kubernetes 集群依赖几个 CA？分别是？

- **A.** 1 个
- **B.** 2 个
- **C.** 3 个：kubernetes-ca、etcd-ca、front-proxy-ca
- **D.** 5 个

### 41. 【升级】升级 Kubernetes 集群版本前，必须先升级哪个组件？

- **A.** kubelet
- **B.** kubectl
- **C.** kubeadm
- **D.** containerd

### 42. 【升级】关于 Kubernetes 的版本升级路径，下列说法正确的是？

- **A.** 可以任意跨多个次版本升级
- **B.** 只能原地升级，不能回退到低版本
- **C.** 大版本只能升级到下一个版本，不支持跨版本升级
- **D.** 只能升级 worker 节点，不能升级 master

### 43. 【升级】查看 kubeadm 集群可升级到的目标版本（升级计划）的命令是？

- **A.** kubeadm upgrade apply
- **B.** kubeadm upgrade node
- **C.** kubeadm upgrade plan
- **D.** kubeadm version

### 44. 【升级】第一个控制平面节点执行实际升级应使用哪条命令？

- **A.** kubeadm upgrade node
- **B.** kubeadm upgrade plan
- **C.** kubeadm init
- **D.** kubeadm upgrade apply <版本号>

### 45. 【升级】升级工作节点之前必须先执行的操作是？

- **A.** kubectl cordon 标记不可调度并 drain 驱逐 Pod
- **B.** 直接重启节点
- **C.** 删除该节点
- **D.** 关闭 etcd

### 46. 【升级】升级完成后，恢复节点可正常调度的命令是？

- **A.** kubectl uncordon <node-name>
- **B.** kubectl cordon <node-name>
- **C.** kubectl drain <node-name>
- **D.** kubectl taint

### 47. 【节点管理】将节点标记为不可调度的命令是 kubectl ______，排空节点上所有 Pod 的命令是 kubectl ______。

> 共 2 个空。

### 48. 【节点管理】清理节点上 kubeadm 安装痕迹使用 kubeadm ______ 命令；该命令不会自动清理 ______ 目录下的 CNI 配置。

> 共 2 个空。

### 49. 【Token】生成加入集群的命令可用 kubeadm token ______ --print-join-command；查看当前集群 token 及其时效的命令是 kubeadm token ______。

> 共 2 个空。

### 50. 【Token】把控制平面证书上传并生成证书密钥的命令是 kubeadm init phase ______ --upload-certs；其生成的值用于 kubeadm join 的 ______ 参数。

> 共 2 个空。

### 51. 【etcd】etcd 默认的客户端访问端口是 ______，节点间（peer）通信端口是 ______。

> 共 2 个空。

### 52. 【etcd】etcd 使用一致性算法 ______ 保证多节点数据的强一致性，其判定写入成功的多数节点公式 Quorum = ______。

> 共 2 个空。

### 53. 【etcd】备份 etcd 快照使用 etcdctl snapshot ______；还原时用 etcdctl snapshot ______ 并通过 ______ 参数指定还原数据目录。

> 共 3 个空。

### 54. 【Velero】Velero 的两个后端存储 CRD 分别是 ______（存放集群资源对象数据）与 ______（为 PV 做快照）。

> 共 2 个空。

### 55. 【证书】基于 kubeadm 安装的集群，CA 根证书默认有效期是 ______ 年，其他证书默认有效期是 ______ 年。

> 共 2 个空。

### 56. 【升级】Kubernetes 升级时大版本只能升级到 ______ 个次版本，不支持跨版本升级；且升级前必须先升级 ______ 组件。

> 共 2 个空。


## K8s集群维护面试

### 57. 【面试】如何从 Kubernetes 集群中安全地删除一个 Master 节点？

### 58. 【面试】如何从集群中删除并重新加入一个 Worker 节点？

### 59. 【面试】kubeadm 集群中 Token 的作用是什么？如何查看和重新生成 Token？

### 60. 【面试】如何向已有的高可用集群新增一个控制平面（Master）节点？

### 61. 【面试】什么是 RTO 和 RPO？它们如何影响容灾方案的选择？

### 62. 【面试】Kubernetes 常见的三种容灾策略有什么区别？

### 63. 【面试】Kubernetes 集群需要备份哪些内容？有哪些备份方式？

### 64. 【面试】如何使用 etcdctl 备份和还原 ETCD？还原时需要注意什么？

### 65. 【面试】请介绍 etcd 的特性、数据模型与常见应用场景。

### 66. 【面试】etcd v2 与 v3 的主要区别有哪些？

### 67. 【面试】etcd 是如何选举 Leader 并保证数据一致性的？

### 68. 【面试】为什么 etcd 集群推荐奇数个节点？Quorum 是什么？

### 69. 【面试】ETCD 备份与 Velero 备份有什么区别？各适用于什么场景？

### 70. 【面试】Velero 由哪些组件构成？其备份与恢复的工作流程是怎样的？

### 71. 【面试】Kubernetes 集群中证书分哪几类？默认有效期是多少？如何查看与续期？

### 72. 【面试】请描述 Kubernetes 版本升级的完整流程与注意事项。
