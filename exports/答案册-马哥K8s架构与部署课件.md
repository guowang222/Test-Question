# 马哥K8s架构与部署课件 —— 答案与解析

> 共 68 题，编号与《试题册-马哥K8s架构与部署课件.md》一致。


## K8s架构与部署笔试

### 1. 【生态】CNCF（云原生计算基金会）成立于哪一年？

**答案**

**C**　2015年

**解析**

CNCF 于2015年7月成立，是 Linux 基金会旗下的开源软件基金会，致力于云原生技术的普及与可持续发展。【衍生知识点】其口号是“坚持和整合开源技术来让编排容器作为微服务架构的一部分”。

---

### 2. 【生态】CNCF 项目成熟度级别不包含以下哪一项？

**答案**

**D**　stable（稳定）

**解析**

CNCF 项目成熟度分为 sandbox、incubating、graduated 三级，由 TOC 投票以回退策略确定。

---

### 3. 【生态】下列 CNCF 项目中，不属于“毕业（graduated）”级别的是？

**答案**

**C**　Harbor

**解析**

课件列出的毕业项目包括 Kubernetes、Prometheus、Helm、Envoy、CoreDNS 等；Harbor 在课件中标注为“孵化中（incubating）”。

---

### 4. 【生态】以下哪一项不属于云原生技术的代表技术？

**答案**

**C**　虚拟机

**解析**

CNCF 官方定义的云原生代表技术为：微服务、容器、服务网格、不可变基础设施和声明式 API；虚拟机不是云原生代表技术。

---

### 5. 【架构】Kubernetes 最早由哪家公司开源并捐献给 CNCF？

**答案**

**A**　Google

**解析**

Kubernetes 由 Google 在2014年开始开源，由内部 Borg 系统发展而来，后捐献给 CNCF 成为开源项目。

---

### 6. 【架构】Kubernetes 被认为是哪个 Google 内部系统的开源版本？

**答案**

**B**　Borg

**解析**

Kubernetes 被认为是 Borg 的开源版本（研发团队有重合、功能简化聚焦、架构类似）。

---

### 7. 【组件】kube-apiserver 默认监听的端口和协议是？

**答案**

**B**　6443/tcp

**解析**

kube-apiserver 利用 6443/tcp 对外提供服务，是集群唯一入口；客户端需基于 https 连接。

---

### 8. 【组件】关于 kube-apiserver 的描述，正确的是？

**答案**

**B**　它是集群唯一入口，集群数据存储在 etcd 中

**解析**

API Server 相当于公司前台，是集群唯一入口，本身无状态，所有集群状态数据存储在 etcd 中。

---

### 9. 【组件】kube-scheduler 在调度 Pod 的第二阶段对节点进行打分排名，分数范围是？

**答案**

**C**　0~10

**解析**

scheduler 分两阶段：先过滤不符合要求的节点，再对剩余节点打分，优先级函数分数范围为 0 到 10。

---

### 10. 【组件】etcd 集群通常采用奇数个节点（如 3、5、7），节点间通过什么协议选举与保持一致？

**答案**

**A**　Raft

**解析**

etcd 用 Raft 协议在节点间选举并保持一致性；生产环境通常为奇数节点以实现高可用。

---

### 11. 【组件】etcd 仅与以下哪个控制平面组件直接交互？

**答案**

**B**　kube-apiserver

**解析**

etcd 由 CoreOS 用 Go 开发，仅同 API Server 交互，其它组件都通过 API Server 读写集群状态。

---

### 12. 【组件】kubelet 支持的三个标准接口中，负责容器存储标准接口的是？

**答案**

**C**　CSI

**解析**

kubelet 支持 CRI（容器运行时）、CNI（容器网络）、CSI（容器存储）三个接口；CSI 即 Container Storage Interface。

---

### 13. 【组件】下列哪些属于遵循 CRI 的高层级（High-level）容器运行时？

**答案**

**A**　dockershim、containerd、cri-o

**解析**

课件指出 dockershim、containerd 和 cri-o 都遵循 CRI，称为高层级运行时；底层则由 runc 提供。

---

### 14. 【组件】以下哪一项不是 Kubernetes 控制平面（Master）的核心组件？

**答案**

**C**　kubelet

**解析**

控制平面由 API Server、Controller-Manager、Scheduler 和 etcd 组成；kubelet 运行在工作节点上。

---

### 15. 【CRI】容器运行时接口 CRI 首次发布于哪个 Kubernetes 版本？

**答案**

**B**　v1.5

**解析**

CRI 首次发布于2016年12月的 Kubernetes 1.5 版本，是 kubelet 与容器运行时通信的标准接口。

---

### 16. 【CRI】从 Kubernetes 哪个版本开始正式移除 dockershim（默认不再支持 Docker 引擎）？

**答案**

**C**　v1.24

**解析**

Kubernetes v1.24 正式移除 dockershim；v1.20 只是宣布弃用。

---

### 17. 【CRI】在 Kubernetes v1.24 之后若仍想使用 Docker 引擎作为容器运行时，需要借助哪个由 Mirantis 维护的组件？

**答案**

**B**　cri-dockerd

**解析**

移除 dockershim 后，可使用 Mirantis 与 Docker 共同维护的 cri-dockerd 作为垫片，让 kubelet 通过 CRI 控制 Docker。

---

### 18. 【CRI】runC 是由哪家公司将其 Libcontainer 捐给 OCI 后更名而来？

**答案**

**B**　Docker

**解析**

Docker 公司将 Libcontainer 捐给 OCI 并更名为 runC，一个轻量级跨平台容器运行时。

---

### 19. 【术语】关于 Pod，下列说法正确的是？

**答案**

**B**　Pod 内多个容器共享 Network、IPC、UTS 命名空间

**解析**

Pod 是运行应用的最小逻辑单元，内部容器共享 Network/IPC/UTS，但 Mount、PID、USER 仍隔离；Pod 重启后 IP 会变化。

---

### 20. 【术语】Service 通过什么机制发现并关联后端的 Pod？

**答案**

**B**　标签选择器（Label Selector）

**解析**

Service 使用标签选择器筛选匹配 Pod 的标签，将符合条件的 Pod 作为后端端点实现服务发现与负载均衡。

---

### 21. 【术语】以下工作负载资源中，哪一个已被官方弃用、不应再使用？

**答案**

**C**　ReplicationController

**解析**

ReplicationController 是 Deployment 的前身，课件明确标注“don't use it anymore”，应使用 Deployment/ReplicaSet。

---

### 22. 【术语】DaemonSet 的核心特点是？

**答案**

**B**　在每个（或部分）节点上恰好运行一个 Pod 副本

**解析**

DaemonSet 确保在每个节点上创建一个 Pod（如日志/监控采集），常用于系统级 Pod。

---

### 23. 【网络】Kubernetes 默认存在三个网络，分别是节点网络、Pod 网络和？

**答案**

**B**　Service 网络

**解析**

集群默认三个网络：节点网络、Pod 网络、Service 网络，它们在 worker 节点上交汇完成流量转发。

---

### 24. 【网络】Service 的 ClusterIP 并不配置在任何物理接口上，而是存在于每个节点内核的？

**答案**

**B**　iptables 或 ipvs 规则

**解析**

Service 网络的 IP 存在于节点内核的 iptables 或 ipvs 规则中，由 kube-proxy 维护，由 Kubernetes 自行管理。

---

### 25. 【分层】Kubernetes 分层架构中，提供 kubectl 命令行工具、客户端 SDK 与集群联邦的是哪一层？

**答案**

**D**　接口层

**解析**

接口层包含 kubectl、客户端 SDK、集群联邦；核心层提供 API；应用层负责部署与路由；管理层含 RBAC/Quota/度量/自动化。

---

### 26. 【版本】关于 Kubernetes 版本支持策略，下列说法正确的是？

**答案**

**B**　Node 可以落后 Master 两个小版本但不能超过

**解析**

K8s 一次支持三个小版本；Node 可能落后 master 两个小版本但不可超过，客户端可偏差±1；生产建议各组件同版本。

---

### 27. 【部署】使用 kubeadm 部署集群时，除以下哪个组件以传统系统服务进程运行外，其余组件都以容器运行？

**答案**

**C**　kubelet

**解析**

课件明确指出：kubeadm 方式中除 kubelet 以传统服务进程运行外，其它组件都以容器（静态 Pod）运行。

---

### 28. 【部署】高可用（HA）拓扑中，stacked etcd 与 external etcd 的主要区别是？

**答案**

**A**　前者 etcd 与控制平面同节点，后者 etcd 独立部署

**解析**

stacked etcd 将 etcd 与控制平面共置于 Master 节点；external etcd 使用独立 etcd 节点，二者通过 HAProxy+Keepalived 区别不大但故障域分离。

---

### 29. 【端口】以下端口中，用于 kube-scheduler 自身健康检查的端口是？

**答案**

**D**　10259

**解析**

端口表：10259 用于 kube-scheduler，10257 用于 kube-controller-manager，10256 用于 kube-proxy，10250 用于 kubelet API。

---

### 30. 【端口】NodePort 类型的 Service 默认使用的端口范围是？

**答案**

**A**　30000-32767

**解析**

NodePort Service 默认端口范围为 30000-32767，对所有节点开放。

---

### 31. 【部署】kubeadm init 的 --token-ttl 参数默认值为多少？

**答案**

**C**　24 小时

**解析**

--token-ttl 默认24小时，设为 0 表示永不过期；过期后可用 kubeadm token create --print-join-command 重新生成。

---

### 32. 【部署】kubeadm init 时若不指定 --upload-certs，会导致什么后果？

**答案**

**B**　不会生成 --certificate-key，从而难以方便地把新 Master 加入集群

**解析**

--upload-certs 将控制平面证书上传到 kube-system 下的 Secret，若不指定则不会生成 --certificate-key，新 Master 无法简便加入。

---

### 33. 【部署】kubeadm 部署成功后，具备管理员权限的认证配置文件默认生成在？

**答案**

**A**　/etc/kubernetes/admin.conf

**解析**

默认生成 /etc/kubernetes/admin.conf，需手动复制到 $HOME/.kube/config 才能用 kubectl 管理集群。

---

### 34. 【部署】Minikube 的主要用途是？

**答案**

**B**　本地快速运行单点 Kubernetes 用于体验与初学

**解析**

Minikube 用于在本地快速运行单点 Kubernetes，适合体验和初步了解；示例中内存需大于3G，并使用 docker 驱动。

---

### 35. 【部署】kubeadm 初始化集群时，Calico 网络插件的 --pod-network-cidr 默认值与 Flannel 不同，Calico 默认是？

**答案**

**B**　192.168.0.0/16

**解析**

Flannel 默认 Pod CIDR 为 10.244.0.0/16，Calico 默认 Pod CIDR 为 192.168.0.0/16。

---

### 36. 【部署】Kubernetes 当前（课件最新）示例部署版本号是？

**答案**

**D**　v1.34.1

**解析**

辅助课堂笔记与 kubeadm-init.yaml 示例均使用 K8S_RELEASE_VERSION=1.34.1，即 v1.34.1。

---

### 37. 【部署】kubeadm 初始化时 --image-repository 的默认镜像仓库地址是？

**答案**

**B**　k8s.gcr.io（新版为 registry.k8s.io）

**解析**

默认镜像仓库为 k8s.gcr.io（v1.25 起调整为 registry.k8s.io），国内常改为 registry.aliyuncs.com/google_containers。

---

### 38. 【部署】kubeadm init 中 --control-plane-endpoint 的作用是？

**答案**

**B**　指定多主控制平面的固定访问地址（IP 或 DNS）

**解析**

--control-plane-endpoint 用于指定控制平面的固定访问地址，是多主必选项；没有它无法将单主转换为高可用集群。

---

### 39. 【组件】Kubernetes 集群内部使用了三套 CA，其中用于 etcd 集群内部 TLS 通信的是？

**答案**

**B**　etcd-ca

**解析**

三套 CA 为 etcd-ca（etcd 内部通信）、kubernetes-ca（集群节点间双向 TLS）、front-proxy-ca（与外部扩展服务通信）。

---

### 40. 【部署】在 kubeadm 集群中，控制平面各组件以静态 Pod 形式运行，其清单文件默认目录是？

**答案**

**B**　/etc/kubernetes/manifests

**解析**

静态 Pod 清单默认放在 /etc/kubernetes/manifests，由 kubelet 直接管理，不依赖 API Server。

---

### 41. 【架构】Kubernetes 控制平面由 kube-apiserver、kube-controller-manager、kube-scheduler 和 ______ 四个核心组件组成，其中作为集群唯一入口的组件是 ______。

**答案**

- 第 1 空：etcd
- 第 2 空：kube-apiserver / API Server / apiserver

**解析**

etcd 保存全部集群状态数据；kube-apiserver 是所有组件交互的唯一入口，本身无状态。

---

### 42. 【部署】使用 kubeadm 初始化集群时，Pod 网络地址范围通过 ______ 参数指定，Flannel 插件默认使用该值为 ______。

**答案**

- 第 1 空：--pod-network-cidr
- 第 2 空：10.244.0.0/16

**解析**

--pod-network-cidr 指定 Pod 网络 CIDR；Flannel 默认值 10.244.0.0/16，Calico 默认 192.168.0.0/16。

---

### 43. 【部署】kubeadm init 的 --cri-socket 参数在容器运行时为 containerd 时取值为 ______，在 v1.24+ 使用 Docker 引擎时取值为 ______。

**答案**

- 第 1 空：unix:///run/containerd/containerd.sock
- 第 2 空：unix:///var/run/cri-dockerd.sock

**解析**

不同 CRI 的 socket 不同：containerd 默认即该值，Docker 用 cri-dockerd 的 socket，CRI-O 为 unix:///var/run/crio/crio.sock。

---

### 44. 【组件】kube-proxy 将 Service 资源定义转化为节点本地实现，其两种主要工作模式是 ______ 模式和 ______ 模式。

**答案**

- 第 1 空：iptables
- 第 2 空：ipvs

**解析**

iptables 模式生成 iptables 规则；ipvs 模式生成 ipvs 加少量 iptables 规则，性能与扩展性更好。

---

### 45. 【端口】kube-apiserver 默认监听的端口是 ______，etcd 服务端与客户端通信使用的端口范围是 ______。

**答案**

- 第 1 空：6443
- 第 2 空：2379-2380 / 2379-2380/tcp

**解析**

6443 为 API Server；2379-2380 为 etcd 服务端客户端 API（含 2380 节点间通信）。

---

### 46. 【组件】kubelet 通过 CRI、CNI、CSI 三个标准接口分别与容器运行时、网络插件和 ______ 交互。

**答案**

- 第 1 空：存储系统 / 存储插件 / 存储

**解析**

CRI=容器运行时接口，CNI=容器网络接口，CSI=容器存储接口，三者使 Kubernetes 可插拔。

---

### 47. 【部署】kubeadm init 初始化时，Service 网络 CIDR 默认是 ______，Flannel 的 Pod 网络默认是 ______，集群内部 DNS 域名默认是 ______。

**答案**

- 第 1 空：10.96.0.0/12
- 第 2 空：10.244.0.0/16
- 第 3 空：cluster.local

**解析**

三者分别在初始化时通过 --service-cidr、--pod-network-cidr、--service-dns-domain 指定，默认值如上。

---

### 48. 【安全】Kubernetes 集群内部使用三套 CA，分别是 kubernetes-ca、etcd-ca 和 ______，其中用于 API Server 与外部扩展服务双向 TLS 通信的是 ______。

**答案**

- 第 1 空：front-proxy-ca
- 第 2 空：front-proxy-ca

**解析**

三套 CA 各司其职；front-proxy-ca 负责 API Server 与扩展服务之间的简单双向 TLS。

---

### 49. 【部署】kubeadm 默认将控制平面静态 Pod 清单放在 ______ 目录，etcd 的数据默认持久化在 ______ 目录。

**答案**

- 第 1 空：/etc/kubernetes/manifests
- 第 2 空：/var/lib/etcd

**解析**

静态 Pod 由 kubelet 直接管理；etcd 本地数据目录默认 /var/lib/etcd（可在配置中修改）。

---

### 50. 【部署】向已有集群加入一个工作节点需执行 kubeadm join，并携带 --token 与 ______ 参数；若要把节点作为新的控制平面加入，还需额外加 ______ 与 --certificate-key 参数。

**答案**

- 第 1 空：--discovery-token-ca-cert-hash
- 第 2 空：--control-plane

**解析**

worker 加入只需 token 与 CA 证书哈希；新 Master 加入需 --control-plane 与 --certificate-key（由 --upload-certs 生成）。

---


## K8s架构与部署面试

### 51. 【面试】简述 Kubernetes 控制平面（Master）和节点（Node/Worker）各自包含哪些核心组件，以及它们各自的职责。

**答案**

控制平面（Master）核心组件：
1) kube-apiserver：集群唯一入口，提供 REST API，所有组件经它交互，本身无状态，数据存于 etcd，监听 6443/tcp。
2) etcd：分布式键值存储，保存全部集群状态，奇数节点+ Raft 高可用，仅与 API Server 通信。
3) kube-scheduler：为新 Pod 挑选最合适的节点（过滤+打分0-10两阶段）。
4) kube-controller-manager：集群大管家，驱动各类控制器使实际状态趋近期望状态。
5) cloud-controller-manager（可选）：与云厂商交互（节点/路由/负载均衡/卷）。
工作节点（Node）：
1) kubelet：节点代理，管理本机 Pod 生命周期并上报状态，通过 CRI/CNI/CSI 对接运行时、网络、存储。
2) kube-proxy：维护 Service 网络规则（iptables/ipvs）。
3) 容器运行时（Docker/containerd/cri-o）：真正运行容器。
【衍生知识点】kubeadm 部署时除 kubelet 以系统服务运行外，其余控制平面组件都以静态 Pod 运行。

**解析**

区分控制平面与节点组件是理解 K8s 架构的基础。

---

### 52. 【面试】说明 kube-apiserver、etcd、kube-scheduler、kube-controller-manager 四个控制平面组件的核心职责。

**答案**

kube-apiserver：集群唯一访问入口，验证并配置 API 对象，所有其它组件通过它与 etcd 交互；无状态，数据在 etcd。
etcd：一致性键值存储，保存集群全部配置与状态数据，生产需奇数节点并定期备份。
kube-scheduler：监视未调度的 Pod，经“过滤不符合节点→对候选节点打分(0-10)”两阶段，挑选最优节点。
kube-controller-manager：运行内置控制器（节点、副本、命名空间、端点、ServiceAccount、资源配额等），通过控制回路驱动实际状态接近期望状态。
【衍生知识点】控制器本质是一个永不休止的闭环：watch 状态→对比期望→执行动作。

**解析**

四件套是控制平面核心，务必能分别描述。

---

### 53. 【面试】什么是 CRI、CNI、CSI？为什么 Kubernetes 要设计这三个接口？

**答案**

CRI（Container Runtime Interface）容器运行时接口：kubelet 与容器运行时通信的标准（gRPC），2016-12 随 v1.5 引入，含镜像服务与运行时服务两类。
CNI（Container Network Interface）容器网络接口：对接网络插件为 Pod 提供网络。
CSI（Container Storage Interface）容器存储接口：对接存储系统提供持久化卷，非必须。
原因：Kubernetes 只定义标准接口而不绑定具体实现，使运行时/网络/存储可插拔，提升灵活性与可移植性；kubelet 无需重编译即可适配不同实现。
【衍生知识点】遵循 CRI 的高层级运行时有 dockershim、containerd、cri-o；底层由 runC（OCI 规范）提供。

**解析**

三者体现 K8s 的可插拔架构设计理念。

---

### 54. 【面试】为什么 Kubernetes v1.24 移除了 dockershim？移除后若想继续使用 Docker 引擎应如何解决？

**答案**

原因：早期 K8s 只直接支持 Docker Engine，引入 CRI 后 Docker 并不兼容 CRI，于是用 dockershim 作为垫片。但 dockershim 长期给 kubelet 带来维护负担且不符合开源协作理念，故 KEP-2221 在 v1.20 弃用、v1.24 正式移除。
解决：Docker 与 Mirantis 共同维护外部 shim 项目 cri-dockerd，让 Docker Engine 仍可通过 CRI 工作；只需在 kubeadm 中加入 --cri-socket=unix:///var/run/cri-dockerd.sock 即可。也可直接切换为 containerd 或 cri-o。
【衍生知识点】v1.24 前 dockershim socket 为 /var/run/dockershim.sock；v1.24 后 Docker 用 cri-dockerd socket。

**解析**

这是 K8s 演进中的经典话题，需同时说明原因与替代方案。

---

### 55. 【面试】简述使用 kubeadm 从零部署一个高可用（多 Master）Kubernetes 集群的主要步骤。

**答案**

1) 所有节点基础准备：唯一主机名/MAC/UUID、关 Swap、关 SELinux、关防火墙、时间同步（chrony）、内核参数（br_netfilter、bridge-nf-call-iptables=1、ip_forward=1）、配置 hosts 解析。
2) 部署 API Server 的负载均衡（HAProxy+Keepalived，提供 VIP，如 kubeapi.wang.org:6443）。
3) 所有节点安装容器运行时（containerd 或 Docker+cri-dockerd）并配置 cgroup=systemd。
4) 所有节点安装 kubeadm/kubelet/kubectl。
5) 第一个 Master 执行 kubeadm init（带 --control-plane-endpoint、--upload-certs、--pod-network-cidr、--service-cidr、--token-ttl=0、--image-repository、--cri-socket），复制 admin.conf 到 $HOME/.kube/config。
6) 其余 Master 用 kubeadm join ... --control-plane --certificate-key 加入。
7) Worker 节点用 kubeadm join（带 --cri-socket）加入。
8) 安装 CNI 网络插件（Flannel/Calico），使节点变 Ready。
9) 验证：kubectl get nodes/cs、创建测试 Pod 与 Service 验证网络。
【衍生知识点】HA 拓扑有 stacked etcd 与 external etcd 两种。

**解析**

体现对完整交付链路的理解，注意 --upload-certs 是多主关键。

---

### 56. 【面试】kubeadm init 与 kubeadm join 有哪些关键参数？请说明 --control-plane-endpoint、--pod-network-cidr、--service-cidr、--upload-certs、--token-ttl、--cri-socket 的作用。

**答案**

--control-plane-endpoint：多主必选项，指定控制平面固定访问地址（IP/DNS），也是生成 kubeconfig 的 API Server 地址；无它无法转高可用。
--pod-network-cidr：Pod 网络 CIDR；Flannel 默认 10.244.0.0/16，Calico 默认 192.168.0.0/16。
--service-cidr：Service 网络 CIDR，默认 10.96.0.0/12。
--upload-certs：将控制平面证书上传到 kube-system 的 Secret，从而输出 --certificate-key 供新 Master 加入；不加则难加 Master。
--token-ttl：bootstrap token 有效期，默认24h，0为永不过期。
--cri-socket：v1.24+ 指定 CRI socket，containerd 为 unix:///run/containerd/containerd.sock，Docker 为 unix:///var/run/cri-dockerd.sock，CRI-O 为 unix:///var/run/crio/crio.sock。
kubeadm join 关键参数：--token、--discovery-token-ca-cert-hash、--control-plane、--certificate-key、--cri-socket。
【衍生知识点】过期后可 kubeadm token create --print-join-command 重新生成加入命令。

**解析**

参数题需逐个对应到作用，避免混淆。

---

### 57. 【面试】etcd 在 Kubernetes 中有什么作用？生产环境对 etcd 节点数量有何要求？为什么？

**答案**

作用：etcd 是 Kubernetes 的“大脑”，以一致性键值存储保存集群全部配置与状态数据；只有 API Server 直接读写它，其它组件经 API Server 访问。
数量要求：通常为奇数个节点（3、5、7），通过 Raft 协议选举与保持一致性。
原因：奇数节点可在网络分区时形成多数派（quorum）避免脑裂；例如 3 节点允许 1 个故障，5 节点允许 2 个故障。生产环境还需为 etcd 提供低延迟磁盘并定期备份。
【衍生知识点】外部 etcd（external etcd）拓扑将 etcd 与控制平面分离到独立节点，故障域更小但需更多机器。

**解析**

etcd 是 K8s 一致性的基石，常与 Raft、奇数、quorum 一起考察。

---

### 58. 【面试】什么是 stacked etcd 与 external etcd 两种高可用拓扑？各有什么优缺点？

**答案**

stacked etcd（堆叠式）：etcd 与控制平面组件同置于 Master 节点上，作为静态 Pod 运行。优点：部署简单、机器少；缺点：etcd 与 Master 共享故障域，且 Master 数量受 etcd 奇数约束（如 3/5）。
external etcd（外置式）：etcd 运行在独立于控制平面的节点上。优点：故障域分离，控制平面与 etcd 可独立扩缩与运维，更利于大规模生产；缺点：需要额外机器、部署更复杂、需自行管理 etcd 集群与证书。
【衍生知识点】无论哪种拓扑，API Server 前都应加负载均衡（HAProxy+Keepalived 提供 VIP）实现高可用与多 Master 访问入口。

**解析**

选型取决于规模与运维能力。

---

### 59. 【面试】Kubernetes 默认存在哪三种网络？各自的作用是什么？

**答案**

1) 节点网络（Node Network）：集群节点间通信网络，IP 配置在节点物理接口上，部署前由管理员配置，K8s 不管理。
2) Pod 网络：为 Pod 提供 IP，配置在 Pod 虚拟接口上，每次重启可能变化，需经 CNI 插件（Flannel/Calico/Cilium）实现。
3) Service 网络：解决 Pod 动态 IP 问题，为 Service 分配 ClusterIP，IP 只存在于节点内核的 iptables/ipvs 规则中，由 K8s 自行管理。
四种通信流量：同 Pod 内容器间、Pod 间、Pod 与 Service 间、集群外部与 Service 间。
【衍生知识点】kube-proxy 负责把 Service 规则落地到节点本地 iptables/ipvs。

**解析**

三网模型是 K8s 网络基础，常与 CNI 插件一起考察。

---

### 60. 【面试】简述 kube-proxy 的 iptables 模式与 ipvs 模式的工作原理及区别。

**答案**

二者都由 kube-proxy 监听 Service/Endpoint 变化，将规则落地到节点：
iptables 模式：把每个 Service/Endpoint 翻译为一堆 iptables 规则（DNAT），请求经 netfilter 重定向；规则多时线性匹配、性能随规模下降，但无需额外内核模块。
ipvs 模式：基于内核 IPVS（LVS）做负载均衡，只维护少量 iptables 规则处理数据包，支持更丰富的调度算法、连接数大时性能与可扩展性更好，但需要内核支持 IPVS 模块。
【衍生知识点】kube-proxy 自身监听 10256，模式可 curl 127.0.0.1:10249/proxyMode 查看；也可通过 --skip-phases=addon/kube-proxy 配合 Cilium 等替代。

**解析**

两种模式对比是常见面试题，强调性能与实现差异。

---

### 61. 【面试】部署 Kubernetes 前，所有节点需要完成哪些基础环境准备（至少列出 5 项）？

**答案**

1) 唯一的主机名、MAC 地址、product_uuid，并配置 /etc/hosts 主机名解析。
2) 禁用 Swap（swapoff -a 并注释 fstab），否则需 --ignore-preflight-errors=Swap。
3) 关闭防火墙（ufw disable / systemctl disable firewalld）或放行所需端口；禁用 SELinux。
4) 配置时区并时间同步（chrony），保证证书与各节点时钟一致。
5) 内核参数优化：加载 br_netfilter、overlay 模块，设置 net.bridge.bridge-nf-call-iptables=1、net.bridge.bridge-nf-call-ip6tables=1、net.ipv4.ip_forward=1。
6) 安装并配置容器运行时（containerd/Docker+cri-dockerd），cgroup driver 设为 systemd。
7) 安装 kubeadm/kubelet/kubectl。
【衍生知识点】Master 节点内存建议≥2G，否则初始化报错。

**解析**

环境准备是部署排错的高频点。

---

### 62. 【面试】为什么需要为 API Server 前面配置负载均衡（如 HAProxy+Keepalived）？VIP 的作用是什么？

**答案**

原因：多 Master 高可用时，各 Master 上都运行 API Server，客户端/Worker/kubelet 不应只连某一台；在其前置四层负载均衡，可将请求分发到健康 Master，并在某 Master 故障时自动剔除，保证控制平面访问连续。
HAProxy 提供四层（tcp）反向代理与后端健康检测（如检测 6443），Keepalived 通过 VRRP 提供 VIP 并实现 LB 自身的高可用（主备漂移）。
VIP（如 kubeapi.wang.org:6443）作为稳定的统一访问入口，被写入 --control-plane-endpoint 与各 kubeconfig，节点加入与 kubectl 都连它，从而屏蔽后端 Master 变化。
【衍生知识点】kubeasz 等方案还提供 kube-lb（基于 nginx 的轻量 LB）。

**解析**

HA 访问入口是生产必备，VIP+健康检测是关键。

---

### 63. 【面试】什么是 Pod？为什么说它是 Kubernetes 调度的最小逻辑单元？Pod 内容器共享与隔离了哪些资源？

**答案**

Pod 是 Kubernetes 中运行应用及调度的最小逻辑单元，本质上是一组共享网络与存储资源的容器集合。
为何最小：用户通常不直接管理容器，而是由工作负载控制器（Deployment/DaemonSet 等）管理 Pod；调度器以 Pod 为粒度把其分配到节点，kubelet 以 Pod 为单位管理生命周期。
共享：Pod 内容器共享 Network（IP/端口）、IPC、UTS 命名空间，以及可挂载的存储卷。
隔离：Mount、PID、USER 命名空间仍彼此隔离；各容器有独立文件系统与进程树。
【衍生知识点】每个 Pod 还包含一个 pause（基础）容器来持有网络命名空间。

**解析**

Pod 概念是 K8s 最核心的抽象，需讲清共享/隔离。

---

### 64. 【面试】Service 是如何实现服务发现与负载均衡的？Label Selector 在其中起什么作用？

**答案**

原理：Service 为一组提供相同服务的 Pod 提供一个固定的 ClusterIP（VIP）作为客户端入口，其 IP 仅存在于各节点内核的 iptables/ipvs 规则中，由 kube-proxy 维护；请求到达 ClusterIP 后被转发到后端 Pod。
Label Selector 的作用：Service 通过标签选择器筛选匹配标签的 Pod，将符合条件的 Pod 作为 Endpoint（后端端点）；只有带有对应标签、且通过健康检查的 Pod 才会被纳入负载均衡池。
配合 CoreDNS，Service 名可被解析为 ClusterIP，实现基于 DNS 的服务发现（如 myapp.default.svc.cluster.local）。
【衍生知识点】客户端可经 NodePort、LoadBalancer、ExternalIP 等方式从集群外访问 Service。

**解析**

Service+Selector+DNS 是 K8s 服务发现三要素。

---

### 65. 【面试】CNCF 是什么？它定义了哪几个项目成熟度级别？列举 3 个毕业（graduated）项目。

**答案**

CNCF（Cloud Native Computing Foundation，云原生计算基金会）成立于2015年7月，是 Linux 基金会旗下的开源软件基金会，致力于云原生技术普及与可持续发展。
成熟度级别：sandbox（沙箱）、incubating（孵化）、graduated（毕业）三级，由 TOC（技术监督委员会）以回退策略投票确定。
毕业项目举例：Kubernetes、Prometheus、Helm（当前已毕业）、Envoy、CoreDNS 等；孵化/沙箱项目如 containerd、cri-o、Harbor、etcd（课件语境）。
【衍生知识点】CNCF 还提供 Trail Map（10 步路线图）与 Cloud Native Landscape 全景图。

**解析**

CNCF 背景与成熟度是生态类常考题。

---

### 66. 【面试】Kubernetes 版本号采用 X.Y.Z 命名，官方支持策略是怎样的？Node 与 Master 之间允许的版本偏差是多少？

**答案**

命名：X 主版本、Y 小版本、Z 补丁版本。K8s 大约每年发布 3 个小版本（v1.22 前为 4 个）。
支持策略：一次支持三个小版本（当前版本及前两个小版本）。
版本偏差：Node 可以落后 Master 两个小版本，但不能超过 Master 版本；客户端（kubectl）可落后或超前 Master 一个小版本；生产环境建议各组件使用相同版本；补丁版本应运行给定小版本的最新补丁。
【衍生知识点】升级时通常按“先 Master 后 Node、逐台滚动”的顺序，且跨小版本需依次升级。

**解析**

版本与偏差策略直接关系到升级规划。

---

### 67. 【面试】kubeadm 部署时，除 kubelet 外其余组件都以容器（静态 Pod）方式运行，请说明静态 Pod 的特点以及其清单文件默认存放目录。

**答案**

特点：静态 Pod 由节点上的 kubelet 直接管理，不需要 API Server 参与创建（不依赖 kube-apiserver 等控制平面组件），kubelet 读取本地清单目录并据此启动/监控容器；它们通常出现在 kube-system 命名空间，由 kubelet 以镜像名前缀（如 k8s_xxx）运行。
用途：控制平面的 kube-apiserver、kube-controller-manager、kube-scheduler 以及本地 etcd 都以静态 Pod 形式运行，从而实现组件容器化且随 kubelet 自举。
默认目录：/etc/kubernetes/manifests；控制平面证书默认在 /etc/kubernetes/pki，etcd 数据默认在 /var/lib/etcd。
【衍生知识点】kubeadm init 输出中可见“Creating static Pod manifest for ...”即写入该目录。

**解析**

静态 Pod 是 kubeadm 自举控制平面的关键机制。

---

### 68. 【面试】简述 Kubernetes 自我修复（self-healing）能力体现在哪些方面。

**答案**

1) 重启失败的容器：kubelet 检测到容器退出会按重启策略（Always/OnFailure）重新启动。
2) 替换/重调度：节点宕机或不可用时，控制器把该节点上的 Pod 调度到其它节点重建；节点被标记不可调度时工作负载由控制器补齐副本。
3) 就绪/存活探针：kubelet 执行 readiness/liveness 探针，失败（如 liveness 多次失败）则杀死并重启容器，未就绪则不纳入 Service 端点。
4) 副本维持：ReplicaSet/Deployment 等控制器持续确保 Pod 副本数等于期望值，不足则新建、多余则删除。
5) 节点与端点健康：Controller Manager 自动检测节点状态并执行自动化修复流程。
【衍生知识点】自我修复使 K8s 能在不扩张运维团队的情况下规模扩展。

**解析**

self-healing 是 K8s 核心特性，常结合探针与控制器回答。

---
