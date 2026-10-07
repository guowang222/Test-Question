# 马哥K8s集群维护课件 —— 答案与解析

> 共 72 题，编号与《试题册-马哥K8s集群维护课件.md》一致。


## K8s集群维护笔试

### 1. 【节点管理】删除一个 Master 节点时，必须保证集群中至少保留多少个 Master 才能避免集群失败？

**答案**

**A**　保留半数以上个 Master

**解析**

删除 Master 节点后要保留至少半数以上个 Master 节点，否则集群失败（etcd 失去多数派）。

---

### 2. 【节点管理】将节点标记为「不可调度」（仅影响新 Pod，不影响已有 Pod）的命令是？

**答案**

**B**　kubectl cordon

**解析**

cordon 会给节点打上 node.kubernetes.io/unschedulable:NoSchedule 污点，仅影响新 Pod 调度；uncordon 恢复调度；drain 则会驱逐已有 Pod。

---

### 3. 【节点管理】要排空（驱逐）某节点上的所有 Pod，应使用哪条命令？

**答案**

**C**　kubectl drain node3.wang.org --ignore-daemonsets --delete-emptydir-data

**解析**

kubectl drain 用于排空节点，配合 --ignore-daemonsets 忽略 DaemonSet 管理的 Pod、--delete-emptydir-data 允许删除使用 emptyDir 的 Pod、--force 允许删除不受控制器管理的 Pod。

---

### 4. 【节点管理】kubectl drain 中用于忽略 DaemonSet 管理 Pod 的选项是？

**答案**

**D**　--ignore-daemonsets

**解析**

--ignore-daemonsets 让 drain 跳过 DaemonSet 管理的 Pod（它们本就在每个节点运行，无法迁移）。

---

### 5. 【节点管理】旧版 kubectl drain 的 --delete-local-data 选项，新版被哪个选项取代？

**答案**

**A**　--delete-emptydir-data

**解析**

--delete-local-data 已被弃用，官方提示改用 --delete-emptydir-data。

---

### 6. 【节点管理】在待下线节点上清理 kubeadm 安装痕迹的命令是？

**答案**

**B**　kubeadm reset

**解析**

kubeadm reset 会还原 kubeadm init/join 所做的更改：停止 kubelet、卸载 /var/lib/kubelet、清空 /etc/kubernetes/manifests 与 pki 目录及各类 kubeconfig 文件。

---

### 7. 【节点管理】kubeadm reset 之后，哪一项需要手工清理（reset 不会自动处理）？

**答案**

**C**　/etc/cni/net.d 下的 CNI 配置

**解析**

reset 的提示明确说明：不会清理 CNI 配置（需手工删除 /etc/cni/net.d）、不会重置 iptables/IPVS 规则、不会清理 kubeconfig 文件。

---

### 8. 【Token】生成把 Worker 节点加入集群的命令，正确写法是？

**答案**

**D**　kubeadm token create --print-join-command

**解析**

kubeadm token create --print-join-command 会生成一条可直接在 worker 节点执行的 kubeadm join 命令（含 token 与 ca-cert-hash）。

---

### 9. 【Token】kubeadm join 中 --discovery-token-ca-cert-hash 的 sha256 值通常如何得到？

**答案**

**A**　从 /etc/kubernetes/pki/ca.crt 导出公钥后计算 sha256

**解析**

命令为：openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'。

---

### 10. 【Token】向已有高可用集群新增一个控制平面（Master）节点时，除 token 与 ca-cert-hash 外还需要哪些参数？

**答案**

**B**　--control-plane 与 --certificate-key

**解析**

加入控制平面需在 kubeadm join 中加 --control-plane，并提供由 upload-certs 生成的 --certificate-key，用于解密上传到 Secret kubeadm-certs 的证书。

---

### 11. 【Token】上传控制平面证书并生成 certificate-key 的命令是？

**答案**

**C**　kubeadm init phase upload-certs --upload-certs

**解析**

该命令把证书存入 kube-system 名称空间的 Secret kubeadm-certs，并输出一段 certificate key；再结合 kubeadm token create --print-join-command --certificate-key <key> 生成加入命令。

---

### 12. 【etcd】从 etcd 集群中删除一个成员（Member）使用的命令是？

**答案**

**D**　etcdctl member remove <成员ID>

**解析**

先用 etcdctl member list 查看成员 ID，再执行 etcdctl member remove <ID>；配套参数需带 --endpoints、--cacert、--cert、--key。

---

### 13. 【etcd】查看 etcd 集群成员列表的命令是？

**答案**

**A**　etcdctl member list

**解析**

etcdctl member list 列出所有成员及其 ID、名称、peer/client 地址与是否为学习者（learner）。

---

### 14. 【容灾】RPO（Recovery Point Objective）准确的含义是？

**答案**

**B**　自上一个数据恢复点以来可接受的最大数据丢失量

**解析**

RPO 决定可接受的数据最大丢失量（或重建量）；RTO 才决定服务停机的可接受时长。RTO/RPO 越低，成本与运维复杂度越高。

---

### 15. 【容灾】RTO（Recovery Time Objective）准确的含义是？

**答案**

**C**　服务中断与服务恢复之间可接受的最大延迟时间（决定可接受的停机时长）

**解析**

RTO 决定服务停机的可接受时长，与 RPO（数据丢失量）共同构成容灾目标的两个核心指标。

---

### 16. 【容灾】三种容灾策略中，RPO/RTO 达到「实时/无数据丢失」且成本最高的是？

**答案**

**D**　双活（Active-Active）

**解析**

备份恢复 RPO/RTO 以小时计、成本低；主备以分钟计；双活实时、业务无损失，但成本最高。

---

### 17. 【容灾】「两地三中心」（同城双活 + 异地灾备）是哪种容灾模型的典型实践？

**答案**

**A**　双活（Active-Active）

**解析**

两地三中心以同城两个数据中心构建双活、异地设灾备中心，兼顾业务连续性与极端区域性灾难下的数据可靠性。

---

### 18. 【备份】在 Kubernetes 中需要备份的内容不包括？

**答案**

**B**　节点操作系统的内核参数配置

**解析**

需要备份的是集群资源、ETCD 数据库与持久化存储数据三类，操作系统层面的配置不属于集群备份范畴。

---

### 19. 【备份】导出所有名称空间的常见资源为 YAML 清单的命令是？

**答案**

**C**　kubectl get all --all-namespaces -o yaml > all-resources.yaml

**解析**

备份 K8s 资源可用 kubectl get all --all-namespaces -o yaml；Secrets 与 ConfigMaps 含敏感信息，可单独导出为 secrets-configmaps.yaml。

---

### 20. 【etcd】使用 etcdctl 备份 ETCD 生成快照的命令是？

**答案**

**D**　ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db

**解析**

需指定 ETCDCTL_API=3 及 --endpoints、--cacert、--cert、--key；快照保存在 /backup/etcd-snapshot.db。

---

### 21. 【etcd】验证 etcd 快照文件完整性与状态的命令是？

**答案**

**A**　etcdctl snapshot status <文件> --write-out=table

**解析**

etcdctl --write-out=table snapshot status <快照文件> 可查看快照的 hash、revision、总键数与大小等信息。

---

### 22. 【etcd】etcdctl snapshot restore 时用于指定还原数据目录的参数是？

**答案**

**B**　--data-dir

**解析**

如 ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db --data-dir=/var/lib/etcd-restore，之后再调整 etcd 启动参数指向该目录。

---

### 23. 【etcd】etcd 默认的客户端通信端口与节点间（peer）通信端口分别是？

**答案**

**C**　2379 与 2380

**解析**

2379 用于客户端访问（如 etcdctl、API Server），2380 用于 etcd 成员之间的 Raft 通信。

---

### 24. 【etcd】etcd 由哪个团队于 2013 年 6 月创建？

**答案**

**D**　CoreOS

**解析**

etcd 由 CoreOS 团队创建；2018 年底加入 CNCF 孵化，2020 年 11 月毕业。名字来源于 Unix 的 /etc 目录，意为 etc distributed。

---

### 25. 【etcd】etcd 基于什么一致性协议、用什么语言实现？

**答案**

**A**　Raft 协议 + Go 语言

**解析**

etcd 使用 Go 语言实现，基于 Raft 一致性算法保证多节点数据强一致；ZAB 是 ZooKeeper 使用的协议。

---

### 26. 【etcd】按照 CAP 理论，etcd 属于哪种模式？

**答案**

**B**　CP

**解析**

etcd 在网络分区容忍性的基础上优先满足一致性，即 CP 模式，因此节点数不足多数派时集群不可写。

---

### 27. 【etcd】etcd 集群选举 Leader 时，节点需要获得多少选票才能当选？

**答案**

**C**　超过 n/2+1（即集群大多数）

**解析**

获得集群大多数（超过 n/2+1）选票的 Candidate 才能成为新 Leader；这也是推荐奇数节点、最少 3 个节点的原因。

---

### 28. 【etcd】etcd 中 Leader 定期发送心跳（Heartbeat Interval）的默认间隔是？

**答案**

**D**　100ms

**解析**

Leader 基于 Heartbeat Interval（默认 100ms）定期发送心跳告知其他节点自己仍是 Leader。

---

### 29. 【etcd】Follower 超过多久未收到 Leader 消息就会转为 Candidate 并发起选举（Election Timeout 默认值）？

**答案**

**A**　1s

**解析**

Election Timeout 默认 1s。所有节点初始均为 Follower 并随机生成选举超时定时器，超时后转为 Candidate 发起选举。

---

### 30. 【etcd】etcd 默认的事务隔离级别是？

**答案**

**B**　串行化（Serializable）

**解析**

etcd 支持四种隔离级别，默认也是最高级别为串行化；未提交读因会产生脏读，etcd 默认不支持。

---

### 31. 【etcd】关于 etcd 集群节点数量，官方推荐的最少节点数与奇偶原则是？

**答案**

**C**　最少 3 个，奇数优于偶数

**解析**

1 和 2 个节点的容错数为 0；6 个节点的容错能力并不优于 5 个节点，因此奇数要优于偶数。

---

### 32. 【etcd】etcd 中所有数据提交前先记录日志、用于持久化存储的机制是？

**答案**

**D**　WAL（Write Ahead Log，预写式日志）

**解析**

WAL 是 etcd 的数据持久化方式；Snapshot 是为防止 WAL 日志过多而做的状态快照；MVCC 通过多版本实现对每次操作的记录，底层存储在 BoltDB 中。

---

### 33. 【Velero】Velero 项目的前身名称是？

**答案**

**A**　Heptio Ark

**解析**

Velero 原为 Heptio 公司的 Ark 项目（由 K8s 联合创始人 Craig McLuckie 和 Joe Beda 创立），2018 年随 Heptio 被 VMware 收购后改名 Velero，Velero 在西班牙语中意为「帆船」。

---

### 34. 【Velero】Velero 中用于定义「集群资源对象数据存放位置」的 CRD 是？

**答案**

**B**　BackupStorageLocation

**解析**

BackupStorageLocation 定义集群资源数据的存放位置（S3 兼容存储，如 MinIO/OSS/S3）；VolumeSnapshotLocation 用于给 PV 做快照。

---

### 35. 【Velero】Velero 服务端主要由哪两个 Controller 组成？

**答案**

**A**　Backup Controller 与 Restore Controller

**解析**

Velero 服务端是一组以 CRD + Operator 形式运行在集群中的 Pod，核心为 Backup Controller 和 Restore Controller，负责与 API Server 通信并协调备份/恢复任务。

---

### 36. 【Velero】与 ETCD 备份方式相比，下列哪一项**不是** Velero 的优势？

**答案**

**D**　无需 Kubernetes API Server 即可完成备份与还原

**解析**

恰恰相反：ETCD 方式直接备份数据库、无需连接 API Server；Velero 是通过 API Server 工作的，要求集群可用。其余三项均为 Velero 相对 ETCD 备份的优势。

---

### 37. 【Velero】Velero 客户端默认在哪个名称空间操作？

**答案**

**B**　velero

**解析**

velero 命令的 -n/--namespace 默认值为 velero；安装时可用 --namespace 指定其他名称空间。

---

### 38. 【证书】基于 kubeadm 安装的集群中，CA 根证书与其他证书的默认有效期分别是？

**答案**

**D**　CA 10 年、其他 1 年

**解析**

ca.crt / etcd/ca.crt / front-proxy-ca.crt 三类根 CA 默认有效期 10 年；除 CA 外的证书（apiserver.crt、etcd/server.crt、kubelet 证书等）默认有效期 1 年。

---

### 39. 【证书】kubeadm 安装的集群中，证书默认存放目录是？

**答案**

**A**　/etc/kubernetes/pki

**解析**

证书位于 /etc/kubernetes/pki/ 目录，etcd 相关证书在其子目录 pki/etcd/ 下。

---

### 40. 【证书】Kubernetes 集群依赖几个 CA？分别是？

**答案**

**C**　3 个：kubernetes-ca、etcd-ca、front-proxy-ca

**解析**

集群依赖三个 CA：kubernetes-ca（通用 CA，签署 API Server/kubelet 等）、etcd-ca（签署 etcd 组件证书）、front-proxy-ca（前端代理根证书）。

---

### 41. 【升级】升级 Kubernetes 集群版本前，必须先升级哪个组件？

**答案**

**C**　kubeadm

**解析**

升级 Kubernetes 集群前必须先升级 kubeadm 版本，再用新 kubeadm 执行 upgrade plan/apply 来升级控制平面。

---

### 42. 【升级】关于 Kubernetes 的版本升级路径，下列说法正确的是？

**答案**

**C**　大版本只能升级到下一个版本，不支持跨版本升级

**解析**

如 1.20.1 可升到 1.20.6 或 1.21.3，但不能直接升到 1.22.0；跳过次版本号的升级不被支持。

---

### 43. 【升级】查看 kubeadm 集群可升级到的目标版本（升级计划）的命令是？

**答案**

**C**　kubeadm upgrade plan

**解析**

kubeadm upgrade plan 列出可升级的版本及当前集群组件状态；确认后再执行 kubeadm upgrade apply <版本号>。

---

### 44. 【升级】第一个控制平面节点执行实际升级应使用哪条命令？

**答案**

**D**　kubeadm upgrade apply <版本号>

**解析**

第一个控制平面节点用 kubeadm upgrade apply <版本号>；其余控制平面节点与工作节点用 kubeadm upgrade node。

---

### 45. 【升级】升级工作节点之前必须先执行的操作是？

**答案**

**A**　kubectl cordon 标记不可调度并 drain 驱逐 Pod

**解析**

升级工作节点前需 kubectl cordon <node> 并 kubectl drain <node> --ignore-daemonsets --delete-emptydir-data 把 Pod 驱逐到其他节点，升级完成后再 kubectl uncordon 恢复调度。

---

### 46. 【升级】升级完成后，恢复节点可正常调度的命令是？

**答案**

**A**　kubectl uncordon <node-name>

**解析**

kubectl uncordon 解除节点的不可调度标记，使其重新接受新 Pod 调度。

---

### 47. 【节点管理】将节点标记为不可调度的命令是 kubectl ______，排空节点上所有 Pod 的命令是 kubectl ______。

**答案**

- 第 1 空：cordon
- 第 2 空：drain

**解析**

cordon 仅阻止新 Pod 调度（打 unschedulable 污点），drain 会驱逐节点上已有 Pod；uncordon 用于恢复。

---

### 48. 【节点管理】清理节点上 kubeadm 安装痕迹使用 kubeadm ______ 命令；该命令不会自动清理 ______ 目录下的 CNI 配置。

**答案**

- 第 1 空：reset
- 第 2 空：/etc/cni/net.d

**解析**

kubeadm reset 还会提示：不会重置 iptables/IPVS 规则，也不会清理 kubeconfig 文件，都需手工处理。

---

### 49. 【Token】生成加入集群的命令可用 kubeadm token ______ --print-join-command；查看当前集群 token 及其时效的命令是 kubeadm token ______。

**答案**

- 第 1 空：create
- 第 2 空：list

**解析**

kubeadm token list 会输出 TOKEN、TTL、EXPIRES、USAGES 等字段；默认 token 有效期为 24 小时，可用 --ttl 0 生成永不过期的 token。

---

### 50. 【Token】把控制平面证书上传并生成证书密钥的命令是 kubeadm init phase ______ --upload-certs；其生成的值用于 kubeadm join 的 ______ 参数。

**答案**

- 第 1 空：upload-certs
- 第 2 空：--certificate-key

**解析**

证书会存入 kube-system 名称空间的 Secret kubeadm-certs，加入新控制平面节点时需要 --control-plane 与 --certificate-key 一起使用。

---

### 51. 【etcd】etcd 默认的客户端访问端口是 ______，节点间（peer）通信端口是 ______。

**答案**

- 第 1 空：2379
- 第 2 空：2380

**解析**

kubeadm 集群中 etcd 以静态 Pod 形式运行，证书位于 /etc/kubernetes/pki/etcd/，etcdctl 常带 --endpoints、--cacert、--cert、--key 四个参数。

---

### 52. 【etcd】etcd 使用一致性算法 ______ 保证多节点数据的强一致性，其判定写入成功的多数节点公式 Quorum = ______。

**答案**

- 第 1 空：Raft / raft
- 第 2 空：N/2+1 / n/2+1

**解析**

etcd 认为写入请求被 Leader 处理并分发给多数节点即为成功；因此最少推荐 3 个节点，且奇数优于偶数。

---

### 53. 【etcd】备份 etcd 快照使用 etcdctl snapshot ______；还原时用 etcdctl snapshot ______ 并通过 ______ 参数指定还原数据目录。

**答案**

- 第 1 空：save
- 第 2 空：restore
- 第 3 空：--data-dir

**解析**

备份示例：ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db；还原示例：etcdctl snapshot restore ... --data-dir=/var/lib/etcd-restore，之后需调整 etcd 启动参数指向该目录。

---

### 54. 【Velero】Velero 的两个后端存储 CRD 分别是 ______（存放集群资源对象数据）与 ______（为 PV 做快照）。

**答案**

- 第 1 空：BackupStorageLocation
- 第 2 空：VolumeSnapshotLocation

**解析**

BackupStorageLocation 主要支持 S3 兼容存储（MinIO/阿里云 OSS/AWS S3/Azure Blob/GCS）；VolumeSnapshotLocation 需借助 CSI 等存储机制。

---

### 55. 【证书】基于 kubeadm 安装的集群，CA 根证书默认有效期是 ______ 年，其他证书默认有效期是 ______ 年。

**答案**

- 第 1 空：10
- 第 2 空：1

**解析**

证书位于 /etc/kubernetes/pki/；可用 openssl x509 -in xxx.crt -text -noout 查看有效期，Kubernetes 证书过期会导致集群异常。

---

### 56. 【升级】Kubernetes 升级时大版本只能升级到 ______ 个次版本，不支持跨版本升级；且升级前必须先升级 ______ 组件。

**答案**

- 第 1 空：下一 / 1 / 下一个
- 第 2 空：kubeadm

**解析**

如 1.20.1 → 1.21.3 可以，1.20.1 → 1.22.0 不行；必须先升级 kubeadm，再用 kubeadm upgrade plan/apply 升级控制平面。

---


## K8s集群维护面试

### 57. 【面试】如何从 Kubernetes 集群中安全地删除一个 Master 节点？

**答案**

1. 前提：删除后必须保留至少半数以上个 Master 节点，否则 etcd 失去多数派会导致集群失败。
2. 在保留的一个 Master 上执行：kubectl drain <master节点名> --ignore-daemonsets，然后 kubectl delete node <master节点名>。
3. 在待删除节点本机执行清理：kubeadm reset -f --cri-socket=unix:///run/cri-dockerd.sock，再 rm -rf /etc/cni/net.d/ .kube。
4. 删除该节点在 etcd 中的成员信息：进入 etcd 容器后执行 etcdctl --endpoints 127.0.0.1:2379 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert .../server.crt --key .../server.key member list 查到 ID，再 member remove <ID>。
5. 如后续要重新加入：kubeadm init phase upload-certs --upload-certs 生成 certificate-key，再 kubeadm token create --print-join-command --certificate-key <key> 得到加入命令，在目标节点执行并加 --control-plane --certificate-key。

**解析**

要点：半数以上约束、drain+delete node、kubeadm reset、etcdctl member remove、重新加入用 upload-certs + certificate-key。

---

### 58. 【面试】如何从集群中删除并重新加入一个 Worker 节点？

**答案**

删除（下线）：
1. kubectl cordon <node> 标记不可调度（只影响新 Pod）；
2. kubectl drain <node> --delete-emptydir-data --force --ignore-daemonsets 驱离该节点上所有 Pod（旧版用 --delete-local-data，已弃用）；
3. kubectl delete node <node> 从集群中删除节点资源；
4. 在该节点上执行 kubeadm reset（可加 --cri-socket=unix:///run/cri-dockerd.sock），并 systemctl disable --now kubelet docker，rm -rf /etc/kubernetes/ /etc/cni/net.d。
重新加入：
1. 在 Master 上 kubeadm token create --print-join-command 生成加入命令；
2. 在 worker 节点执行该 kubeadm join 命令（含 --token 与 --discovery-token-ca-cert-hash sha256:...）；
3. 在 Master 上 kubectl get nodes 验证节点已 Ready。

**解析**

要点：cordon → drain → delete node → reset 清理 → token create --print-join-command → kubeadm join → 验证。

---

### 59. 【面试】kubeadm 集群中 Token 的作用是什么？如何查看和重新生成 Token？

**答案**

作用：Token 是节点加入集群时的引导认证凭据（bootstrap token），配合 --discovery-token-ca-cert-hash 校验集群 CA 证书，保证节点安全加入；默认通过 TLS 方式传输。
查看：
- kubeadm token list 查看现有 token 及其 TTL（TOKEN / TTL / EXPIRES / USAGES / DESCRIPTION 等列）；默认有效期 24 小时，kubeadm init 时用 --token-ttl=0 可生成永不过期的 token。
重新生成：
- kubeadm token create 生成新 token；
- kubeadm token create --print-join-command 直接输出可用的完整 kubeadm join 命令；
- 原有 token 在有效期内仍可继续使用；token 过期不影响已加入的节点。
另外 hash 值可自行计算：openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'。

**解析**

要点：bootstrap 认证、token list（默认 24h TTL）、token create --print-join-command、ca-cert-hash 的自算方式。

---

### 60. 【面试】如何向已有的高可用集群新增一个控制平面（Master）节点？

**答案**

1. 在已有 Master 上生成加入命令：
   - kubeadm init phase upload-certs --upload-certs（把证书存入 kube-system 的 Secret kubeadm-certs，并输出 certificate key）；
   - kubeadm token create --print-join-command --certificate-key <上面生成的key>。
2. 在待加入节点上执行类似命令：
   kubeadm join <控制平面端点>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash> --control-plane --certificate-key <key> --cri-socket=unix:///run/cri-dockerd.sock
3. 加入后在该节点配置 kubectl：mkdir -p $HOME/.kube；sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config；sudo chown $(id -u):$(id -g) $HOME/.kube/config。
4. 在任一 Master 上 kubectl get nodes 验证新节点为 control-plane,master 且 Ready。
5. 注意：新增后 Master 总数仍应为奇数且满足多数派要求（etcd 强一致）。

**解析**

要点：upload-certs 生成 certificate-key、join 需 --control-plane + --certificate-key、复制 admin.conf、验证节点。

---

### 61. 【面试】什么是 RTO 和 RPO？它们如何影响容灾方案的选择？

**答案**

RTO（Recovery Time Objective，恢复时间目标）：服务中断与服务恢复之间可接受的最大延迟时间，决定服务停机的可接受时长。
RPO（Recovery Point Objective，恢复点目标）：自上一个数据恢复点以来可接受的最大时间量，决定可接受的数据最大丢失量。
两者的数值越低，表示停机时间越短、数据丢失越少，但意味着更高的资源成本与运维复杂度。因此需要结合业务重要性、数据丢失风险和可投入成本综合评估：
- 重要性低的应用：可接受小时级 RPO/RTO，采用备份恢复，成本低；
- 重要性高的应用：分钟级，采用主备（Active-Standby）；
- 核心关键业务：实时、业务无损失，采用双活（Active-Active），成本最高。

**解析**

要点：RTO=停机时长、RPO=数据丢失量；越低成本越高；三种容灾策略与 RPO/RTO 量级的对应。

---

### 62. 【面试】Kubernetes 常见的三种容灾策略有什么区别？

**答案**

1. 备份与恢复（Backup & Restore）：系统正常运行时定期备份应用与数据；灾难发生后在另一地点恢复并切换流量。RPO/RTO 以小时计，成本低，适合重要性低的应用；缺点是数据无法实时备份，恢复大容量数据耗时长。
2. 主备（Active-Standby）：主中心处理全部业务流量，备用中心以少量实例运行并通过周期性测试流量验证有效性；灾难时进行数据库主备切换、扩容备用中心实例并切流量。RPO/RTO 以分钟计，适合重要性高的应用。
3. 双活（Active-Active）：两个中心启动相同数量的实例同时承载业务流量；灾难时进行数据库主备切换并把流量全部切到正常中心。RPO/RTO 实时、业务无损失，成本最高，适合核心关键业务。
典型实践为「两地三中心」：同城两个数据中心构建双活，异地设灾备中心做异步复制与一致性校验。

**解析**

要点：三者的运行方式、RPO/RTO 量级、成本、适用场景；两地三中心模型。

---

### 63. 【面试】Kubernetes 集群需要备份哪些内容？有哪些备份方式？

**答案**

需要备份的内容（三类）：
1. 集群资源：Deployment、Service、ConfigMap、Secret、PersistentVolumeClaim 等；
2. ETCD 数据库：集群的全部状态都存于 etcd，备份 etcd 可恢复整个集群状态；
3. 持久化存储数据：PV 中的业务数据。
四种备份方法：
1. 备份 Kubernetes 资源：kubectl get all --all-namespaces -o yaml > all-resources.yaml；指定名称空间用 -n；Secrets/ConfigMaps 含敏感信息可单独导出为 secrets-configmaps.yaml；还原时先建好命名空间再 kubectl apply -f。
2. 备份 ETCD：用 etcdctl snapshot save 生成快照，并用 snapshot status 校验；还原用 snapshot restore。
3. 备份持久化存储数据：找到 PVC 对应 PV，用 rsync/tar 备份数据，还原时重建 PV/PVC 再回填数据。
4. 使用工具自动化备份：Velero（备份资源与 PV 数据，支持周期备份）、Stash、kubeasz 的 ezctl backup/restore 等。

**解析**

要点：三类内容 + 四种方法（kubectl 导出、etcd 快照、PV 数据、Velero/Stash 等工具）。

---

### 64. 【面试】如何使用 etcdctl 备份和还原 ETCD？还原时需要注意什么？

**答案**

备份：
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key snapshot save /backup/etcd-snapshot.db
校验：ETCDCTL_API=3 etcdctl --write-out=table snapshot status /backup/etcd-snapshot.db
还原：
1. 先停止 API Server 与 kubelet（systemctl stop kubelet；停止 kube-apiserver 容器），避免集群状态被修改；
2. ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db --data-dir=/var/lib/etcd-restore；
3. 把 etcd 的启动参数（--data-dir）指向还原出来的新数据目录；
4. 重新启动 kubelet 与 API Server，kubectl get nodes 验证。
注意：备份应同时保留 /etc/kubernetes/pki/etcd/ 下的证书；多节点集群还原后需保证各成员数据目录一致；生产建议在业务低峰期操作。

**解析**

要点：snapshot save/status/restore、ETCDCTL_API=3 与证书参数、还原前停 API Server/kubelet、--data-dir 指向新目录。

---

### 65. 【面试】请介绍 etcd 的特性、数据模型与常见应用场景。

**答案**

基本背景：etcd 由 CoreOS 团队于 2013 年 6 月创建，2018 年底加入 CNCF 孵化、2020 年 11 月毕业；基于 Raft 协议、使用 Go 语言实现；名字取自 Unix 的 /etc 目录，意为「分布式的 /etc」。
特性：
1. 简单接口：基于 gRPC 的 API（同时支持 HTTP + JSON）；
2. 简单的键值数据模型：以 key-value 存储，数据组织成分层目录结构；
3. 支持监听机制：客户端可通过 Watch 监听某个键或键范围的变化；
4. 安全可靠：支持 TLS 加密通信、可设置访问认证，键可设置 TTL；
5. 快速：单实例每秒 1000 次写操作；
6. 采用 Raft 保证多节点数据强一致。
数据模型：v3 为分层键值存储 + MVCC 多版本并发控制，每次操作都被记录，底层存储在 BoltDB。
应用场景：键值对存储、服务发现、配置管理、集群状态存储（Kubernetes 的核心数据存储）、消息发布订阅、分布式锁。
类似项目：ZooKeeper、Consul。

**解析**

要点：Raft+Go、CoreOS、Watch/TTL/TLS、每秒 1000 次写、MVCC+BoltDB、六大应用场景。

---

### 66. 【面试】etcd v2 与 v3 的主要区别有哪些？

**答案**

1. 数据模型：
- v2 使用平面键值存储，仅用 / 分隔模拟层次结构，没有真正的目录概念；
- v3 采用分层键值存储，引入 Range 概念与真正的层次结构，支持范围查询；存储基于多版本（MVCC），可保存历史版本。
2. API 设计：
- v2 提供简单的 HTTP + JSON API，核心端点为 /v2/keys；
- v3 引入 gRPC API，使用 Protocol Buffers、基于 HTTP/2 二进制传输，性能更好，支持 Watch 流式监听、批量与事务（txn）操作。
3. 性能与存储效率：
- v2 缺少历史数据管理机制，旧数据不自动清理，易存储膨胀；
- v3 的 MVCC 可自动清理过期版本，优化存储利用，更适合大规模集群。
4. 安全特性：v2 较弱（基本 HTTP 认证与简单 ACL）；v3 支持完善的认证授权与 TLS。
5. 功能特性：v2 功能基础；v3 提供租约（Lease，可设 TTL 到期自动删除键）、线性一致性读等高级能力。
注意：v2 与 v3 的接口与存储均不同，两版本数据互相隔离；从 v2 升级 v3 可能需要修改应用。

**解析**

要点：数据模型（平面 vs 分层+MVCC）、API（HTTP/JSON vs gRPC+Protobuf）、性能、安全、租约/事务；两版本数据隔离。

---

### 67. 【面试】etcd 是如何选举 Leader 并保证数据一致性的？

**答案**

角色与状态：etcd 节点有三种状态——Leader（领导协调节点，所有数据提交都必须先到 Leader）、Follower（从属节点，只响应请求；客户端请求会重定向到 Leader）、Candidate（候选节点，触发新一轮选举）。
选举过程：
1. 集群启动时所有节点均以 Follower 角色启动，并各自随机生成选举超时定时器（随机是为了避免同时发起选举导致无法过半）；
2. 率先完成 Timer 的节点向其他节点发送成为 Leader 的请求；
3. 在一个选举超时期间内获得超过半数（n/2+1）节点投票的 Candidate 当选 Leader；
4. Leader 以固定时间间隔（Heartbeat Interval 默认 100ms）向其他节点发送心跳维持地位；若 Follower 在 Election Timeout（默认 1s）内收不到心跳，则转为 Candidate 重新选举。
一致性保证：
- 基于 Raft，所有数据流向为 Leader → Follower；
- 写请求必须先到 Leader（Follower 收到的写请求会转发给 Leader），Leader 追加本地日志后广播 AppendEntries，多数节点确认后 commit；
- Quorum = N/2+1，写入被 Leader 处理并分发给多数节点即视为成功；
- 按 CAP 理论 etcd 属于 CP，优先保证一致性。

**解析**

要点：三种角色、随机超时定时器、n/2+1 选票、心跳 100ms / 选举超时 1s、写流程与 Quorum、CP 模式。

---

### 68. 【面试】为什么 etcd 集群推荐奇数个节点？Quorum 是什么？

**答案**

Quorum（法定人数）：etcd 认为写入请求被 Leader 处理并分发给多数节点后即为成功写入，多数节点的界定公式为 Quorum = N/2+1（N 为总节点数）。
用容错能力来解释：集群的容错节点数 = 节点总数 Instances - Quorum。
- 1 个节点：Quorum=1，容错 0；
- 2 个节点：Quorum=2，容错 0；
- 3 个节点：Quorum=2，容错 1；
- 5 个节点：Quorum=3，容错 2；
- 6 个节点：Quorum=4，容错 2（与 5 个节点相同）。
结论：
1. 最少的推荐节点数是 3，因为 1 和 2 个节点的容错数都是 0，一旦宕掉一个节点整个集群就不能正常工作；
2. 强烈推荐奇数个节点，因为偶数节点的容错能力并不比前一个奇数更好（6 个节点容错能力并不优于 5 个），反而成本更高。

**解析**

要点：Quorum=N/2+1、容错数=Instances-Quorum、最少 3 个节点、奇数优于偶数的原因。

---

### 69. 【面试】ETCD 备份与 Velero 备份有什么区别？各适用于什么场景？

**答案**

区别：
1. 备份粒度：ETCD 备份是直接备份整个数据库（集群全部资源），是「整体级」；Velero 支持对 Kubernetes 集群内对象级别进行备份，可按 Namespace、Type、Label、Pod 等分类备份或恢复。
2. 依赖：ETCD 方式直接备份数据库，无需连接 API Server；Velero 通过 API Server 工作，要求 Kubernetes 可用才能还原。
3. 定期备份：Velero 自身支持周期性的定期备份（schedule）；ETCD 需要自行通过其他方式（如 cron + etcdctl）实现。
4. 数据卷：Velero 还支持备份 PV 卷中的数据（基于文件系统备份 FSB，借助 Restic/Kopia 上传到对象存储，或基于快照备份 PV）；ETCD 方式只能备份集群资源，不含数据卷内容。
适用场景：
- ETCD 备份：需要整体灾难恢复、最彻底地恢复集群状态，或集群即将重大变更前的兜底快照；
- Velero：需要按命名空间/标签做精细化备份与恢复、跨集群迁移、定期自动备份以及 PV 数据保护。

**解析**

要点：整体级 vs 对象级、是否需要 API Server、周期性备份、PV 数据备份；对应灾备与迁移两类场景。

---

### 70. 【面试】Velero 由哪些组件构成？其备份与恢复的工作流程是怎样的？

**答案**

Velero 组件分三部分：
1. 客户端：运行在本地的 velero 命令行工具，包含安装服务端、备份、定时任务备份、恢复等命令；安装服务端时需要本机已配置 kubectl 及集群 kubeconfig。
2. 服务端：一组运行在 Kubernetes 集群中（以 Pod 方式、CRD + Operator 形式）的 controller，包括 Backup Controller 和 Restore Controller，负责与 API Server 通信、协调备份恢复任务、管理备份记录，并与插件交互。
3. 插件：存储插件（对接 S3 兼容对象存储，如 MinIO/OSS/S3/Azure Blob/GCS）与卷快照插件（与各存储提供商集成，实现 PV 快照创建与恢复）。
后端存储 CRD：BackupStorageLocation（集群资源对象数据）与 VolumeSnapshotLocation（PV 快照）。
备份流程：velero 客户端发命令 → 调用 API Server 创建 Backup 资源 → Backup Controller 验证并执行 → 向 API Server 查询需备份数据 → 调用对象存储保存备份数据（默认若 PV 支持还会创建 Snapshot，可用 --snapshot-volumes=false 禁用）。
恢复流程：客户端发指令 → 创建 Restore 资源 → Restore Controller 验证 → 从对象存储下载备份文件 → 依据备份数据调用 API Server 重建资源对象（含 PV 数据回填）。
典型命令：velero install --provider aws --bucket velero --secret-file ./credentials-velero --use-node-agent --use-volume-snapshots=false；velero backup create xxx --include-namespaces=demo。

**解析**

要点：客户端/服务端(Backup+Restore Controller)/插件三部分、两个存储 CRD、备份与恢复的完整链路、常用 install 与 backup create 命令。

---

### 71. 【面试】Kubernetes 集群中证书分哪几类？默认有效期是多少？如何查看与续期？

**答案**

证书机制：Kubernetes 基于 PKI 证书实现基于 TLS 的双向认证；kubeadm 安装时会自动生成集群所需证书，存于 /etc/kubernetes/pki/ 目录。
分类：
1. 服务器证书：API Server 端点证书（apiserver.crt）、etcd 服务器证书（etcd/server.crt）、每个 kubelet 的服务器证书、可选的前端代理服务器证书；
2. 客户端证书：kubelet 客户端证书、API Server 作为 etcd 客户端的证书（apiserver-etcd-client.crt）、与 kubelet 通信的客户端证书（apiserver-kubelet-client.crt）、controller-manager 与 scheduler 的客户端证书、kube-proxy 客户端证书、管理员客户端证书；
3. 根 CA（三个）：kubernetes-ca（pki/ca.crt，通用 CA）、etcd-ca（pki/etcd/ca.crt）、front-proxy-ca（pki/front-proxy-ca.crt）。
有效期：基于 kubeadm 安装时三个根 CA 默认 10 年，其他证书默认 1 年（kubelet 证书 /var/lib/kubelet/pki/kubelet.crt 亦为 1 年）。
查看：openssl x509 -in /etc/kubernetes/pki/ca.crt -text -noout 查看有效期（Not Before / Not After）；kubeadm certs check-expiration 可批量查看剩余时间。
续期：未过期可用 kubeadm certs renew all（需重启控制平面组件）；已过期可先用 kubeadm 重新生成或用 kubeadm init phase 重建；kubelet 证书可通过删除后由 kubelet 自助重新签发。生产上也有「证书永久有效」方案，但需评估安全风险。

**解析**

要点：PKI/TLS 双向认证、服务器/客户端/CA 三类、CA 10 年与其他 1 年、openssl 与 kubeadm certs 查看、certs renew 续期。

---

### 72. 【面试】请描述 Kubernetes 版本升级的完整流程与注意事项。

**答案**

升级路径限制：支持大版本与小版本升级，但大版本只能升级到下一个版本，不支持跨版本（如 1.20.1 → 1.21.3 可以，→ 1.22.0 不行）；必须先升级 kubeadm。官方强烈建议有条件时新建集群而非原地升级；生产环境应在业务空闲时逐个节点离线升级后再上线。
准备工作：
1. 检查当前版本：kubectl version --short；
2. 查看官方版本偏差策略确认升级路径；
3. 备份集群：etcdctl 备份 ETCD、kubectl 导出资源、备份 PV 数据。
升级流程：
1. 第一个控制平面节点：更改软件包仓库 → 决定目标版本 → 升级 kubeadm（apt/yum 安装指定版本）→ kubeadm upgrade plan 验证升级计划 → kubeadm upgrade apply <版本> → 腾空节点 → 升级 kubelet 和 kubectl → 解除节点保护（uncordon）；
2. 其余控制平面节点：升级 kubeadm → kubeadm upgrade node → 升级 kubelet/kubectl → uncordon；
3. 工作节点：升级 kubeadm → kubeadm upgrade node → kubectl cordon + drain 驱逐 Pod → 升级 kubelet/kubectl → systemctl restart kubelet → kubectl uncordon；逐个升级避免服务中断。
验证与排错：kubectl get nodes / get pods --all-namespaces / version --short 检查集群状态与组件版本；升级失败可回滚并查看 journalctl -u kubelet -f 与 kubeadm 日志；节点无法加入多因证书或配置问题，可尝试重新生成证书。

**解析**

要点：大版本只升一级、先升 kubeadm、备份先行、第一控制平面 upgrade apply / 其余 upgrade node、worker 逐个 cordon+drain+uncordon、验证与排错。

---
