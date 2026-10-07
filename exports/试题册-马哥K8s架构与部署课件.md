# 马哥K8s架构与部署课件 —— 试题册

> 共 68 题。答案与解析见《答案册-马哥K8s架构与部署课件.md》。


## K8s架构与部署笔试

### 1. 【生态】CNCF（云原生计算基金会）成立于哪一年？

- **A.** 2013年
- **B.** 2014年
- **C.** 2015年
- **D.** 2016年

### 2. 【生态】CNCF 项目成熟度级别不包含以下哪一项？

- **A.** sandbox（沙箱）
- **B.** incubating（孵化）
- **C.** graduated（毕业）
- **D.** stable（稳定）

### 3. 【生态】下列 CNCF 项目中，不属于“毕业（graduated）”级别的是？

- **A.** Kubernetes
- **B.** Prometheus
- **C.** Harbor
- **D.** CoreDNS

### 4. 【生态】以下哪一项不属于云原生技术的代表技术？

- **A.** 容器
- **B.** 服务网格
- **C.** 虚拟机
- **D.** 声明式 API

### 5. 【架构】Kubernetes 最早由哪家公司开源并捐献给 CNCF？

- **A.** Google
- **B.** Docker
- **C.** RedHat
- **D.** CoreOS

### 6. 【架构】Kubernetes 被认为是哪个 Google 内部系统的开源版本？

- **A.** Mesos
- **B.** Borg
- **C.** YARN
- **D.** Omega

### 7. 【组件】kube-apiserver 默认监听的端口和协议是？

- **A.** 8080/tcp
- **B.** 6443/tcp
- **C.** 2379/tcp
- **D.** 10250/tcp

### 8. 【组件】关于 kube-apiserver 的描述，正确的是？

- **A.** 它是有状态的，自身存储集群数据
- **B.** 它是集群唯一入口，集群数据存储在 etcd 中
- **C.** 它只运行在 worker 节点
- **D.** 它负责为 Pod 挑选节点

### 9. 【组件】kube-scheduler 在调度 Pod 的第二阶段对节点进行打分排名，分数范围是？

- **A.** 0~1
- **B.** 0~5
- **C.** 0~10
- **D.** 0~100

### 10. 【组件】etcd 集群通常采用奇数个节点（如 3、5、7），节点间通过什么协议选举与保持一致？

- **A.** Raft
- **B.** Paxos
- **C.** Zab
- **D.** Gossip

### 11. 【组件】etcd 仅与以下哪个控制平面组件直接交互？

- **A.** kubelet
- **B.** kube-apiserver
- **C.** kube-proxy
- **D.** kube-scheduler

### 12. 【组件】kubelet 支持的三个标准接口中，负责容器存储标准接口的是？

- **A.** CRI
- **B.** CNI
- **C.** CSI
- **D.** CPI

### 13. 【组件】下列哪些属于遵循 CRI 的高层级（High-level）容器运行时？

- **A.** dockershim、containerd、cri-o
- **B.** Docker Engine、containerd
- **C.** 仅 Docker
- **D.** rkt、lxc

### 14. 【组件】以下哪一项不是 Kubernetes 控制平面（Master）的核心组件？

- **A.** kube-apiserver
- **B.** kube-scheduler
- **C.** kubelet
- **D.** etcd

### 15. 【CRI】容器运行时接口 CRI 首次发布于哪个 Kubernetes 版本？

- **A.** v1.4
- **B.** v1.5
- **C.** v1.24
- **D.** v1.22

### 16. 【CRI】从 Kubernetes 哪个版本开始正式移除 dockershim（默认不再支持 Docker 引擎）？

- **A.** v1.20
- **B.** v1.22
- **C.** v1.24
- **D.** v1.25

### 17. 【CRI】在 Kubernetes v1.24 之后若仍想使用 Docker 引擎作为容器运行时，需要借助哪个由 Mirantis 维护的组件？

- **A.** dockershim
- **B.** cri-dockerd
- **C.** containerd
- **D.** cri-o

### 18. 【CRI】runC 是由哪家公司将其 Libcontainer 捐给 OCI 后更名而来？

- **A.** Google
- **B.** Docker
- **C.** CoreOS
- **D.** RedHat

### 19. 【术语】关于 Pod，下列说法正确的是？

- **A.** Pod 是 Kubernetes 中运行应用的最大单元
- **B.** Pod 内多个容器共享 Network、IPC、UTS 命名空间
- **C.** Pod 内容器共享 Mount 命名空间
- **D.** Pod 的 IP 地址在重启后保持不变

### 20. 【术语】Service 通过什么机制发现并关联后端的 Pod？

- **A.** 节点亲和性
- **B.** 标签选择器（Label Selector）
- **C.** 命名空间
- **D.** 资源配额

### 21. 【术语】以下工作负载资源中，哪一个已被官方弃用、不应再使用？

- **A.** Deployment
- **B.** DaemonSet
- **C.** ReplicationController
- **D.** StatefulSet

### 22. 【术语】DaemonSet 的核心特点是？

- **A.** 确保 Pod 副本数精确符合期望数量
- **B.** 在每个（或部分）节点上恰好运行一个 Pod 副本
- **C.** 用于运行一次性短时任务
- **D.** 用于按时间计划运行任务

### 23. 【网络】Kubernetes 默认存在三个网络，分别是节点网络、Pod 网络和？

- **A.** Overlay 网络
- **B.** Service 网络
- **C.** Underlay 网络
- **D.** 桥接网络

### 24. 【网络】Service 的 ClusterIP 并不配置在任何物理接口上，而是存在于每个节点内核的？

- **A.** CNI 插件进程
- **B.** iptables 或 ipvs 规则
- **C.** bridge 网桥
- **D.** 路由表文件

### 25. 【分层】Kubernetes 分层架构中，提供 kubectl 命令行工具、客户端 SDK 与集群联邦的是哪一层？

- **A.** 核心层
- **B.** 应用层
- **C.** 管理层
- **D.** 接口层

### 26. 【版本】关于 Kubernetes 版本支持策略，下列说法正确的是？

- **A.** 一次只支持一个小版本
- **B.** Node 可以落后 Master 两个小版本但不能超过
- **C.** 客户端可以落后 Master 三个小版本
- **D.** Master 节点之间允许大版本不一致

### 27. 【部署】使用 kubeadm 部署集群时，除以下哪个组件以传统系统服务进程运行外，其余组件都以容器运行？

- **A.** kube-apiserver
- **B.** etcd
- **C.** kubelet
- **D.** kube-proxy

### 28. 【部署】高可用（HA）拓扑中，stacked etcd 与 external etcd 的主要区别是？

- **A.** 前者 etcd 与控制平面同节点，后者 etcd 独立部署
- **B.** 前者不支持 etcd 集群
- **C.** 后者不需要负载均衡
- **D.** 前者只在单节点使用

### 29. 【端口】以下端口中，用于 kube-scheduler 自身健康检查的端口是？

- **A.** 10250
- **B.** 10256
- **C.** 10257
- **D.** 10259

### 30. 【端口】NodePort 类型的 Service 默认使用的端口范围是？

- **A.** 30000-32767
- **B.** 31000-32000
- **C.** 8000-9000
- **D.** 10250-10260

### 31. 【部署】kubeadm init 的 --token-ttl 参数默认值为多少？

- **A.** 0（永不过期）
- **B.** 1 小时
- **C.** 24 小时
- **D.** 7 天

### 32. 【部署】kubeadm init 时若不指定 --upload-certs，会导致什么后果？

- **A.** 集群初始化失败
- **B.** 不会生成 --certificate-key，从而难以方便地把新 Master 加入集群
- **C.** 无法拉取镜像
- **D.** 无法生成 kubeconfig

### 33. 【部署】kubeadm 部署成功后，具备管理员权限的认证配置文件默认生成在？

- **A.** /etc/kubernetes/admin.conf
- **B.** $HOME/.kube/config
- **C.** /var/lib/kubelet/config.yaml
- **D.** /etc/kubernetes/kubelet.conf

### 34. 【部署】Minikube 的主要用途是？

- **A.** 生产环境多主高可用
- **B.** 本地快速运行单点 Kubernetes 用于体验与初学
- **C.** 二进制生产部署
- **D.** 跨云多集群管理

### 35. 【部署】kubeadm 初始化集群时，Calico 网络插件的 --pod-network-cidr 默认值与 Flannel 不同，Calico 默认是？

- **A.** 10.244.0.0/16
- **B.** 192.168.0.0/16
- **C.** 10.96.0.0/12
- **D.** 172.16.0.0/16

### 36. 【部署】Kubernetes 当前（课件最新）示例部署版本号是？

- **A.** v1.22.1
- **B.** v1.30.2
- **C.** v1.33.3
- **D.** v1.34.1

### 37. 【部署】kubeadm 初始化时 --image-repository 的默认镜像仓库地址是？

- **A.** registry.aliyuncs.com/google_containers
- **B.** k8s.gcr.io（新版为 registry.k8s.io）
- **C.** docker.io
- **D.** harbor.wang.org

### 38. 【部署】kubeadm init 中 --control-plane-endpoint 的作用是？

- **A.** 指定 Pod 网络段
- **B.** 指定多主控制平面的固定访问地址（IP 或 DNS）
- **C.** 指定 Service 网络段
- **D.** 指定镜像仓库

### 39. 【组件】Kubernetes 集群内部使用了三套 CA，其中用于 etcd 集群内部 TLS 通信的是？

- **A.** kubernetes-ca
- **B.** etcd-ca
- **C.** front-proxy-ca
- **D.** sa-ca

### 40. 【部署】在 kubeadm 集群中，控制平面各组件以静态 Pod 形式运行，其清单文件默认目录是？

- **A.** /var/lib/etcd
- **B.** /etc/kubernetes/manifests
- **C.** /etc/kubernetes/pki
- **D.** /run/containerd

### 41. 【架构】Kubernetes 控制平面由 kube-apiserver、kube-controller-manager、kube-scheduler 和 ______ 四个核心组件组成，其中作为集群唯一入口的组件是 ______。

> 共 2 个空。

### 42. 【部署】使用 kubeadm 初始化集群时，Pod 网络地址范围通过 ______ 参数指定，Flannel 插件默认使用该值为 ______。

> 共 2 个空。

### 43. 【部署】kubeadm init 的 --cri-socket 参数在容器运行时为 containerd 时取值为 ______，在 v1.24+ 使用 Docker 引擎时取值为 ______。

> 共 2 个空。

### 44. 【组件】kube-proxy 将 Service 资源定义转化为节点本地实现，其两种主要工作模式是 ______ 模式和 ______ 模式。

> 共 2 个空。

### 45. 【端口】kube-apiserver 默认监听的端口是 ______，etcd 服务端与客户端通信使用的端口范围是 ______。

> 共 2 个空。

### 46. 【组件】kubelet 通过 CRI、CNI、CSI 三个标准接口分别与容器运行时、网络插件和 ______ 交互。

> 共 1 个空。

### 47. 【部署】kubeadm init 初始化时，Service 网络 CIDR 默认是 ______，Flannel 的 Pod 网络默认是 ______，集群内部 DNS 域名默认是 ______。

> 共 3 个空。

### 48. 【安全】Kubernetes 集群内部使用三套 CA，分别是 kubernetes-ca、etcd-ca 和 ______，其中用于 API Server 与外部扩展服务双向 TLS 通信的是 ______。

> 共 2 个空。

### 49. 【部署】kubeadm 默认将控制平面静态 Pod 清单放在 ______ 目录，etcd 的数据默认持久化在 ______ 目录。

> 共 2 个空。

### 50. 【部署】向已有集群加入一个工作节点需执行 kubeadm join，并携带 --token 与 ______ 参数；若要把节点作为新的控制平面加入，还需额外加 ______ 与 --certificate-key 参数。

> 共 2 个空。


## K8s架构与部署面试

### 51. 【面试】简述 Kubernetes 控制平面（Master）和节点（Node/Worker）各自包含哪些核心组件，以及它们各自的职责。

### 52. 【面试】说明 kube-apiserver、etcd、kube-scheduler、kube-controller-manager 四个控制平面组件的核心职责。

### 53. 【面试】什么是 CRI、CNI、CSI？为什么 Kubernetes 要设计这三个接口？

### 54. 【面试】为什么 Kubernetes v1.24 移除了 dockershim？移除后若想继续使用 Docker 引擎应如何解决？

### 55. 【面试】简述使用 kubeadm 从零部署一个高可用（多 Master）Kubernetes 集群的主要步骤。

### 56. 【面试】kubeadm init 与 kubeadm join 有哪些关键参数？请说明 --control-plane-endpoint、--pod-network-cidr、--service-cidr、--upload-certs、--token-ttl、--cri-socket 的作用。

### 57. 【面试】etcd 在 Kubernetes 中有什么作用？生产环境对 etcd 节点数量有何要求？为什么？

### 58. 【面试】什么是 stacked etcd 与 external etcd 两种高可用拓扑？各有什么优缺点？

### 59. 【面试】Kubernetes 默认存在哪三种网络？各自的作用是什么？

### 60. 【面试】简述 kube-proxy 的 iptables 模式与 ipvs 模式的工作原理及区别。

### 61. 【面试】部署 Kubernetes 前，所有节点需要完成哪些基础环境准备（至少列出 5 项）？

### 62. 【面试】为什么需要为 API Server 前面配置负载均衡（如 HAProxy+Keepalived）？VIP 的作用是什么？

### 63. 【面试】什么是 Pod？为什么说它是 Kubernetes 调度的最小逻辑单元？Pod 内容器共享与隔离了哪些资源？

### 64. 【面试】Service 是如何实现服务发现与负载均衡的？Label Selector 在其中起什么作用？

### 65. 【面试】CNCF 是什么？它定义了哪几个项目成熟度级别？列举 3 个毕业（graduated）项目。

### 66. 【面试】Kubernetes 版本号采用 X.Y.Z 命名，官方支持策略是怎样的？Node 与 Master 之间允许的版本偏差是多少？

### 67. 【面试】kubeadm 部署时，除 kubelet 外其余组件都以容器（静态 Pod）方式运行，请说明静态 Pod 的特点以及其清单文件默认存放目录。

### 68. 【面试】简述 Kubernetes 自我修复（self-healing）能力体现在哪些方面。
