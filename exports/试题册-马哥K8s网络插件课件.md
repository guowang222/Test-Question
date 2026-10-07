# 马哥K8s网络插件课件 —— 试题册

> 共 71 题。答案与解析见《答案册-马哥K8s网络插件课件.md》。


## K8s网络插件笔试

### 1. 【网络模型】Kubernetes 集群内一般包含哪三种网络？

- **A.** 节点网络、Pod网络、Service网络
- **B.** 节点网络、容器网络、桥接网络
- **C.** 物理网络、虚拟网络、Overlay网络
- **D.** 节点网络、Ingress网络、Egress网络

### 2. 【CNI】CNI（Container Network Interface）这一容器网络标准主要由谁主导制定？

- **A.** Google 和 CoreOS
- **B.** Cisco 和 VMware
- **C.** RedHat 和 Microsoft
- **D.** Aliyun 和 Huawei

### 3. 【CNI】按照源代码存放目录，CNI 网络插件可分为哪三类？

- **A.** main、meta、ipam
- **B.** bridge、veth、ipvlan
- **C.** overlay、underlay、routing
- **D.** iptables、ipvs、ebpf

### 4. 【CNI】kubelet 查找 CNI 配置文件与插件二进制的默认路径分别是？

- **A.** /etc/cni/net.d 与 /opt/cni/bin
- **B.** /etc/kubernetes/cni 与 /usr/bin/cni
- **C.** /var/lib/cni/conf 与 /opt/cni/plugins
- **D.** /run/cni/net.d 与 /usr/lib/cni

### 5. 【网络模型】关于 Underlay 与 Overlay 网络，下列说法正确的是？

- **A.** Underlay是物理实际网络、性能更好；Overlay是虚拟网络、存在隧道封装开销
- **B.** Overlay是物理实际网络、性能更好；Underlay是虚拟网络
- **C.** 二者都是纯软件实现的虚拟网络
- **D.** 二者性能完全一致、仅命名不同

### 6. 【VETH】关于 VETH 虚拟以太网设备对，下列说法正确的是？

- **A.** 必须成对创建，数据从一端进入会立即从另一端发出，常用于跨网络命名空间通信
- **B.** 只能单独创建，一端连接容器、另一端无效
- **C.** 是物理网卡，不可用于命名空间
- **D.** 性能最好，无额外开销

### 7. 【MACVLAN】关于 MACVLAN 技术，下列说法错误的是？

- **A.** 它要求节点物理接口工作在混杂模式以接收发往子接口的报文
- **B.** 每个Pod虚拟网卡各有独立的MAC地址和IP
- **C.** 属于Underlay Network，内核从3.9版本开始支持
- **D.** 共享宿主机MAC地址，无需混杂模式

### 8. 【IPVLAN】IPVLAN 与 MACVLAN 的主要区别是？

- **A.** IPVLAN共享宿主机MAC地址、各子接口独立IP，无需混杂模式
- **B.** IPVLAN各子接口独立MAC和IP，需混杂模式
- **C.** 二者完全一致
- **D.** IPVLAN属于Overlay网络

### 9. 【VxLAN】VXLAN 的 VNI（网络标识）为多少位？可支持多少个虚拟网络？

- **A.** 24位，约16777216(2^24)个
- **B.** 12位，4096个
- **C.** 16位，65536个
- **D.** 32位，约42亿个

### 10. 【VxLAN】根据本文档，Flannel VXLAN 模式下 flanneld 监听的 UDP 端口是？

- **A.** 8472
- **B.** 4789
- **C.** 8285
- **D.** 80

### 11. 【VxLAN】Flannel VXLAN 模式默认将 Pod 网卡的 MTU 设置为多少？原因是什么？

- **A.** 1450，因为VXLAN封装预留了50字节开销(1500-50)
- **B.** 1500，与标准以太网一致
- **C.** 1480，因为IPIP封装开销
- **D.** 9000，启用巨帧

### 12. 【网络模型】Direct Routing（直接路由）属于哪类网络？其核心要求是什么？

- **A.** Underlay网络，要求所有主机物理接口位于同一个二层(L2)网络
- **B.** Overlay网络，要求跨三层通信
- **C.** 必须由隧道封装实现
- **D.** 仅适用于公有云

### 13. 【Flannel】关于 Flannel 网络插件，下列说法正确的是？

- **A.** 由CoreOS研发，最早支持Kubernetes的网络插件，功能简单、无流量控制与Mesh等高级功能
- **B.** 由阿里云研发，纯三层方案
- **C.** 基于eBPF实现，可取代kube-proxy
- **D.** 支持多播，适合keepalived

### 14. 【Calico】关于 Calico，下列说法错误的是？

- **A.** 它不支持NetworkPolicy网络策略
- **B.** 是纯三层的数据中心网络方案，支持IPIP和BGP
- **C.** 每台机器运行vRouter，借助iptables/nftables实现网络策略
- **D.** 不支持多播(如keepalived多播)

### 15. 【Cilium】关于 Cilium，下列说法正确的是？

- **A.** 基于eBPF技术，可取代kube-proxy，2023年10月正式从CNCF毕业
- **B.** 由CoreOS研发，是最早的K8s网络插件
- **C.** 基于隧道封装的Overlay方案
- **D.** 不支持七层代理

### 16. 【kube-router】关于 kube-router，下列说法正确的是？

- **A.** K8s网络一体化方案，可取代kube-proxy实现基于ipvs的Service，并支持网络策略与BGP
- **B.** 是CoreOS研发的纯Overlay插件
- **C.** 不支持BGP
- **D.** 仅用于DNS

### 17. 【插件对比】关于 Weave Net，下列说法正确的是？

- **A.** 由weaveworks公司开发，数据平面通过UDP封装实现L2 Overlay，目前该公司已倒闭
- **B.** 由阿里云研发，基于VPC网络
- **C.** 是纯三层BGP方案
- **D.** 不支持跨主机容器网络

### 18. 【选择网络附件】关于如何选择合适的网络附件，下列说法错误的是？

- **A.** 通常来说生产环境应优先一律使用Overlay叠加网络，无需考虑底层环境
- **B.** 虚拟化环境中一般只支持叠加网络(如Flannel vxlan、Calico ipip、Weave、Antrea)
- **C.** 物理机环境可选Calico BGP、Flannel host-gw或DAMM IPVLAN等性能较好的方案
- **D.** 当前主流方案是calico、flannel、Cilium、kube-router

### 19. 【Flannel】Flannel 在每个节点创建的 cni0 设备是什么？其地址通常为？

- **A.** Linux网桥(bridge)，作为本节点所有Pod的默认网关，地址一般为节点Pod子网的第1个IP(如10.244.1.1/24)
- **B.** VXLAN隧道终端设备，地址为10.244.X.0/32
- **C.** BGP路由反射器
- **D.** 物理网卡

### 20. 【Flannel】Flannel 的 flannel.1 设备的作用是？其地址形式为？

- **A.** VXLAN隧道终端设备(VTEP)，地址一般为10.244.X.0/32
- **B.** Linux网桥，作为Pod默认网关
- **C.** DHCP服务器
- **D.** etcd代理

### 21. 【Flannel】负责在每个节点进行报文封装/解封装的 flanneld 进程以什么形式运行？

- **A.** 以DaemonSet(kube-flannel Pod)形式运行在每个节点
- **B.** 以静态Pod形式运行在master节点
- **C.** 以Deployment运行在单一控制平面
- **D.** 以kubelet内置模块运行

### 22. 【Flannel】Flannel 默认使用的 Pod 网络网段是？

- **A.** 10.244.0.0/16
- **B.** 192.168.0.0/16
- **C.** 172.16.0.0/16
- **D.** 10.96.0.0/12

### 23. 【Flannel】Flannel 为每个节点分配的子网掩码及每节点可分配 Pod 数量约为？

- **A.** /24，每节点约254个(2^8-2)
- **B.** /26，每节点约62个
- **C.** /16，每节点约65534个
- **D.** /22，每节点约1022个

### 24. 【Flannel】Flannel 的 VXLAN 模式描述正确的是？

- **A.** 默认模式，属于Overlay，不需各节点同二层，跨节点Pod经flannel.1隧道封装通过8472/UDP传输
- **B.** 要求各节点必须处于同一二层网络
- **C.** 不使用任何隧道封装，直接路由
- **D.** 仅能在公有云使用

### 25. 【Flannel】Flannel 的 host-gw 模式描述正确的是？

- **A.** Pod间不经隧道封装而直接路由通信，要求各节点处于同一二层网络，性能较好，此时flannel.1接口不再存在
- **B.** 必须通过VXLAN隧道封装，flannel.1必须存在
- **C.** 仅支持跨网段通信
- **D.** 是默认模式

### 26. 【Flannel】Flannel 的 UDP 后端模式监听的端口及性能特征是？

- **A.** 监听8285/UDP，性能较前两种低很多，仅用于不支持VXLAN/host-gw的环境
- **B.** 监听8472/UDP，默认模式
- **C.** 监听4789/UDP，性能最好
- **D.** 无端口，纯路由

### 27. 【Flannel】Flannel 的 VXLAN DirectRouting 模式描述正确的是？

- **A.** 同二层网段内的Pod间直接路由通信，跨网段节点间仍用VXLAN隧道封装
- **B.** 所有通信都强制隧道封装
- **C.** 完全等同于host-gw，不区分网段
- **D.** 不使用flannel.1

### 28. 【Flannel】Flannel 的 ConfigMap(net-conf.json)中用于指定后端模式的字段是？

- **A.** Backend.Type(如vxlan/host-gw)
- **B.** Mode.Name
- **C.** Network.Port
- **D.** CNI.Type

### 29. 【Flannel】Flannel 在每个节点生成的 /run/flannel/subnet.env 中 FLANNEL_MTU 的默认值是？

- **A.** 1450
- **B.** 1500
- **C.** 1480
- **D.** 9000

### 30. 【Calico】Calico 相较于 Flannel 的主要优势是？

- **A.** 支持NetworkPolicy网络策略，可动态定义ACL控制进出容器报文
- **B.** 性能远低于Flannel
- **C.** 不支持跨节点通信
- **D.** 不支持云原生编排平台

### 31. 【Calico】Calico 网络实现的核心特点是？

- **A.** 纯三层方案，把每个节点当作vRouter，不使用cni0网桥，Pod间通信均经路由
- **B.** 依赖cni0网桥与VXLAN隧道
- **C.** 纯二层方案
- **D.** 必须使用NAT和隧道

### 32. 【Calico】Calico 安装时的默认网络模式是？原因是什么？

- **A.** IPIP模式，因为默认无法确定环境中节点是否支持BGP(很多公有云不支持)
- **B.** BGP Native Routing，默认要求同二层
- **C.** VXLAN，默认性能最好
- **D.** host-gw，默认最简单

### 33. 【Calico】关于 Calico 的 BGP Native Routing，下列说法正确的是？

- **A.** 各节点vRouter通过BGP学习生成路由，默认在集群所有节点间建立iBGP full-mesh，同属AS 64512
- **B.** 由flanneld通过kube-apiserver操作etcd更新路由
- **C.** 不要求节点在同一二层，可跨任意网段
- **D.** 使用VXLAN隧道

### 34. 【Calico】Calico 的 IPIP 模式描述正确的是？

- **A.** 把IP包再套一层IP(两层IP头)，仍需要BGP生成路由，隧道接口为tunl0，MTU默认1480
- **B.** 不依赖BGP，使用vxlan.calico设备
- **C.** UDP端口4789封装
- **D.** 必须使用cni0网桥

### 35. 【Calico】Calico 的 VXLAN 模式描述正确的是？

- **A.** 将数据包封装在UDP(4789端口)，不依赖BGP，每节点创建vxlan.calico设备，MTU默认1450
- **B.** 将IP包封装为IPIP(tunl0)，依赖BGP
- **C.** 要求所有节点同二层
- **D.** 使用以太网桥cni0

### 36. 【Calico】Calico 中负责“将Felix写入内核的路由信息通过BGP广播给其余节点”的组件是？

- **A.** BIRD(BGP客户端)
- **B.** Felix
- **C.** etcd
- **D.** Typha

### 37. 【Calico】Calico 为每个 Pod 生成的 veth 网卡在宿主机上表现为哪种命名形式？

- **A.** cali 后接11个随机字符再加 @ifN(如 caliXXXXXXXX@ifN)
- **B.** veth 加一对随机名(如 vethXXXX)
- **C.** flannel.1 形式
- **D.** eth0 形式

### 38. 【NetworkPolicy】关于 NetworkPolicy 的实现依赖，下列说法正确的是？

- **A.** 网络策略规则由网络插件转为内核iptables规则，Flannel 不支持而 Calico/Canal/kube-router 支持
- **B.** NetworkPolicy 仅由kube-apiserver直接落实，无需插件参与
- **C.** Flannel 原生完整支持NetworkPolicy
- **D.** 只有物理交换机才能实现网络策略

### 39. 【NetworkPolicy】NetworkPolicy 资源被转换为内核 iptables 的哪张表？Service 又被转换到哪些表？

- **A.** NetworkPolicy转到filter表，Service转到nat表或mangle表
- **B.** 二者都转到filter表
- **C.** 二者都转到nat表
- **D.** NetworkPolicy转到raw表

### 40. 【Calico】关于 Calico 的数据存储与 Typha 组件，下列说法正确的是？

- **A.** 少于50节点可结合kube-apiserver存储，多于50节点建议用独立etcd；集群>50节点建议启用Typha减轻Datastore负载
- **B.** 只能使用独立etcd，不能用kube-apiserver
- **C.** Typha用于替代kube-proxy
- **D.** etcd无法与Kubernetes共用

### 41. 【Calico】Calico 的 CRD 属于哪个 API 组？

- **A.** crd.projectcalico.org/v1
- **B.** networking.k8s.io/v1
- **C.** apps/v1
- **D.** rbac.authorization.k8s.io/v1

### 42. 【NetworkPolicy】关于 NetworkPolicy 资源本身，下列说法正确的是？

- **A.** 它是networking.k8s.io/v1的命名空间级标准资源，定义Pod的Ingress/Egress流量规则，但需策略控制器才能真正生效
- **B.** 它是集群级资源，对所有命名空间生效
- **C.** 它是CoreOS私有资源，不属于K8s API
- **D.** 它只能定义Ingress，不能定义Egress

### 43. 【Calico】关于 Calico 的 GlobalNetworkPolicy，下列说法正确的是？

- **A.** 它是Calico集群级CRD，支持拒绝规则与优先级(order)，需由calicoctl创建
- **B.** 它是Kubernetes原生资源，kubectl直接支持创建
- **C.** 它等价于Pod，只能选单个容器
- **D.** 它不支持跨命名空间

### 44. 【网络模型】Kubernetes 集群内一般包含三种网络：节点网络、______ 和 ______。

> 共 2 个空。

### 45. 【CNI】kubelet 在 ______ 目录查找 CNI 配置文件，并到 ______ 目录查找插件二进制。

> 共 2 个空。

### 46. 【默认网段】Flannel 默认 Pod 网段为 ______，Calico 默认 Pod 网段为 ______（由CALICO_IPV4POOL_CIDR指定）。

> 共 2 个空。

### 47. 【Flannel】Flannel VXLAN 后端中 flanneld 监听 ______/UDP 端口，UDP 后端监听 ______/UDP 端口。

> 共 2 个空。

### 48. 【VxLAN】VXLAN 的 VNI 长度为 ______ 位，可支持约 ______ 个虚拟网络（写出数值）。

> 共 2 个空。

### 49. 【Flannel】Flannel 为每个节点分配 /24 子网，整个大网段支持约 ______ 个子网，单节点可分配约 ______ 个 Pod。

> 共 2 个空。

### 50. 【Calico】Calico 的 BGP 默认所有节点同属自治系统 AS ______，并在节点间默认建立 ______ 全互联连接。

> 共 2 个空。

### 51. 【Calico】Calico 默认每节点 Pod 子网掩码为 ______（如192.168.0.0/26），每节点可分配约 ______ 个 Pod。

> 共 2 个空。

### 52. 【NetworkPolicy】Kubernetes 将 NetworkPolicy 规则转换为内核 iptables 的 ______ 表规则，而 Service 被转换为 ______ 表或 ______ 表的规则。

> 共 3 个空。

### 53. 【Calico】Calico IPIP 模式使用隧道接口 ______，VXLAN 模式使用设备 ______。

> 共 2 个空。


## K8s网络插件面试

### 54. 【面试】简述 Kubernetes 的三种网络及由此产生的四类通信。

### 55. 【面试】什么是 CNI？它包含哪三类插件，各自职责是什么？

### 56. 【面试】简述 Underlay 网络与 Overlay 网络的区别及各自典型技术。

### 57. 【面试】简述 Flannel 的工作机制。

### 58. 【面试】Flannel 支持哪些后端模式？分别说明其特点与适用场景。

### 59. 【面试】说明 VXLAN 的报文封装结构与关键参数（MTU、端口、VNI）。

### 60. 【面试】简述 Calico 的工作机制。

### 61. 【面试】Calico 的 Pod 网络如何工作？解释 Proxy ARP 的作用。

### 62. 【面试】Calico 支持哪些网络模型？默认是哪一种，为什么？

### 63. 【面试】说明 Calico 的核心组件及其职责。

### 64. 【面试】部署 Calico 时有哪些关键配置与注意事项？

### 65. 【面试】NetworkPolicy 的关键字段有哪些？其生效机制是怎样的？

### 66. 【面试】如何用 NetworkPolicy 实现“默认拒绝所有”与“默认允许所有”？

### 67. 【面试】NetworkPolicy 中 ipBlock、namespaceSelector、podSelector 如何组合？ingress 与 egress 对网段的限制有何不同？

### 68. 【面试】为什么 Flannel 不支持 NetworkPolicy，而 Calico 支持？策略控制器的作用是什么？

### 69. 【面试】Calico 的 GlobalNetworkPolicy 与 Kubernetes NetworkPolicy 有何区别？Calico 提供了哪些典型 CRD？

### 70. 【面试】从性能与适用场景角度，对比 Flannel 与 Calico 的几种模式。

### 71. 【面试】简述 Calico 中 BGP 的几种拓扑模型及其适用规模。
