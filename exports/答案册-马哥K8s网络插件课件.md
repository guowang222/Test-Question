# 马哥K8s网络插件课件 —— 答案与解析

> 共 71 题，编号与《试题册-马哥K8s网络插件课件.md》一致。


## K8s网络插件笔试

### 1. 【网络模型】Kubernetes 集群内一般包含哪三种网络？

**答案**

**A**　节点网络、Pod网络、Service网络

**解析**

K8s集群内一般有三种网络：节点网络、Service网络、Pod网络，三者通过集群节点内核实现交汇和路由通信，对应四类通信：Pod内容器间、Pod间、Service到Pod、集群外部与Service之间。【衍生知识点】Service网络由kube-proxy通过iptables或IPVS实现。

---

### 2. 【CNI】CNI（Container Network Interface）这一容器网络标准主要由谁主导制定？

**答案**

**A**　Google 和 CoreOS

**解析**

CNI是CNCF项目，由Google和CoreOS主导制定的容器网络标准；它自身并非具体实现，只定义协议与标准，K8s将Pod间通信委托给遵循CNI规范的第三方插件。

---

### 3. 【CNI】按照源代码存放目录，CNI 网络插件可分为哪三类？

**答案**

**A**　main、meta、ipam

**解析**

CNI插件分为main(创建/删除网络、添加Pod，如bridge/ipvlan/macvlan/loopback/ptp/veth/vlan)、ipam(仅分配IP，如dhcp/host-local/static)和meta(其它如tuning/portmap/bandwidth/sbr/firewall)。

---

### 4. 【CNI】kubelet 查找 CNI 配置文件与插件二进制的默认路径分别是？

**答案**

**A**　/etc/cni/net.d 与 /opt/cni/bin

**解析**

kubelet在/etc/cni/net.d目录查找cni json配置文件，基于type属性到/opt/cni/bin中查找相关插件二进制并调用设置网络。

---

### 5. 【网络模型】关于 Underlay 与 Overlay 网络，下列说法正确的是？

**答案**

**A**　Underlay是物理实际网络、性能更好；Overlay是虚拟网络、存在隧道封装开销

**解析**

Underlay Network是底层(承载)物理网络，负责数据包实际传输、性能更好；Overlay Network是虚拟网络，通过VXLAN/IPIP/GRE等隧道封装构建，存在额外封装开销但更灵活、支持跨物理网段。

---

### 6. 【VETH】关于 VETH 虚拟以太网设备对，下列说法正确的是？

**答案**

**A**　必须成对创建，数据从一端进入会立即从另一端发出，常用于跨网络命名空间通信

**解析**

VETH(Virtual Ethernet Device Pair)必须成对创建(如veth0与veth1)，数据从一端进入立即从另一端发出，常用于容器/虚拟机跨NetNS通信；它属于纯软件虚拟设备，有额外性能开销。

---

### 7. 【MACVLAN】关于 MACVLAN 技术，下列说法错误的是？

**答案**

**D**　共享宿主机MAC地址，无需混杂模式

**解析**

MACVLAN每个Pod虚拟网卡各有独立MAC和IP，属于Underlay，要求物理接口混杂模式(有安全风险)，内核3.9起支持；IPVLAN才共享宿主MAC、无需混杂模式。

---

### 8. 【IPVLAN】IPVLAN 与 MACVLAN 的主要区别是？

**答案**

**A**　IPVLAN共享宿主机MAC地址、各子接口独立IP，无需混杂模式

**解析**

IPVLAN与MACVLAN类似但共享同一物理接口MAC，各子接口独立IP，无需混杂模式(不违反防MAC欺骗策略)，内核3.19起支持(推荐4.2+)；属于Underlay。

---

### 9. 【VxLAN】VXLAN 的 VNI（网络标识）为多少位？可支持多少个虚拟网络？

**答案**

**A**　24位，约16777216(2^24)个

**解析**

VXLAN的VNI为24位，支持2^24=16777216个虚拟LAN；而传统VLAN ID仅12位(4096个)，VXLAN解决了VLAN ID不足的问题。

---

### 10. 【VxLAN】根据本文档，Flannel VXLAN 模式下 flanneld 监听的 UDP 端口是？

**答案**

**A**　8472

**解析**

Flannel VXLAN后端中flanneld监听于8472/UDP发送封装数据包；UDP后端监听8285/UDP；4789是Calico VXLAN使用的标准端口。

---

### 11. 【VxLAN】Flannel VXLAN 模式默认将 Pod 网卡的 MTU 设置为多少？原因是什么？

**答案**

**A**　1450，因为VXLAN封装预留了50字节开销(1500-50)

**解析**

Flannel VXLAN模式默认MTU为1450，因VXLAN封装增加约50字节开销(含VXLAN头/UDP头/IP头)，1500-50=1450，避免分片丢包。

---

### 12. 【网络模型】Direct Routing（直接路由）属于哪类网络？其核心要求是什么？

**答案**

**A**　Underlay网络，要求所有主机物理接口位于同一个二层(L2)网络

**解析**

Direct Routing属于Underlay，通过路由协议解决容器间L3通信，要求所有主机物理接口位于同一二层网络，各主机物理接口地址可互作下一跳网关。

---

### 13. 【Flannel】关于 Flannel 网络插件，下列说法正确的是？

**答案**

**A**　由CoreOS研发，最早支持Kubernetes的网络插件，功能简单、无流量控制与Mesh等高级功能

**解析**

Flannel由CoreOS研发、基于Golang，是Kubernetes最早的网络方案，支持HostGW和VXLAN，功能简单、无网络流量控制与跨集群Mesh等高级功能，纯开源无商业服务。

---

### 14. 【Calico】关于 Calico，下列说法错误的是？

**答案**

**A**　它不支持NetworkPolicy网络策略

**解析**

Calico最大优势恰恰是支持NetworkPolicy网络策略；它是纯三层方案，支持IPIP/BGP，每台机器运行vRouter，借助iptables实现策略，不支持多播。Flannel才不支持NetworkPolicy。

---

### 15. 【Cilium】关于 Cilium，下列说法正确的是？

**答案**

**A**　基于eBPF技术，可取代kube-proxy，2023年10月正式从CNCF毕业

**解析**

Cilium基于eBPF技术，由Isovalent创建，2021年10月成为CNCF孵化项目，2023年10月正式毕业；接管网络功能包括服务发现和负载均衡，可取代kube-proxy。

---

### 16. 【kube-router】关于 kube-router，下列说法正确的是？

**答案**

**A**　K8s网络一体化方案，可取代kube-proxy实现基于ipvs的Service，并支持网络策略与BGP

**解析**

kube-router是K8s网络一体化解决方案，可取代kube-proxy实现基于ipvs的Service，支持网络策略、完美兼容BGP高级特性。

---

### 17. 【插件对比】关于 Weave Net，下列说法正确的是？

**答案**

**A**　由weaveworks公司开发，数据平面通过UDP封装实现L2 Overlay，目前该公司已倒闭

**解析**

Weave Net由weaveworks开发(现已倒闭)，多主机容器网络方案，支持去中心化控制平面，数据平面通过UDP封装实现L2 Overlay。

---

### 18. 【选择网络附件】关于如何选择合适的网络附件，下列说法错误的是？

**答案**

**A**　通常来说生产环境应优先一律使用Overlay叠加网络，无需考虑底层环境

**解析**

选择网络插件应通过底层系统环境限制、容器网络功能需求和性能需求三个标准衡量；虚拟化环境多用叠加网络，物理机可用高性能Underlay，并非一律使用Overlay。

---

### 19. 【Flannel】Flannel 在每个节点创建的 cni0 设备是什么？其地址通常为？

**答案**

**A**　Linux网桥(bridge)，作为本节点所有Pod的默认网关，地址一般为节点Pod子网的第1个IP(如10.244.1.1/24)

**解析**

cni0是Linux网桥，所有Pod的veth都桥接其上，作为本节点Pod的默认网关，地址一般为节点Pod子网第1个IP(如10.244.1.1/24)；只有使用Pod网络的Pod创建后才生成cni0，hostNetwork:true的Pod不会创建。

---

### 20. 【Flannel】Flannel 的 flannel.1 设备的作用是？其地址形式为？

**答案**

**A**　VXLAN隧道终端设备(VTEP)，地址一般为10.244.X.0/32

**解析**

flannel.1是VXLAN终端设备(VTEP)，是VXLAN通道的起点和终点，让各节点VXLAN如同处于同一个大网络(默认10.244.0.0/16)，地址一般为子网第0个IP如10.244.1.0/32。

---

### 21. 【Flannel】负责在每个节点进行报文封装/解封装的 flanneld 进程以什么形式运行？

**答案**

**A**　以DaemonSet(kube-flannel Pod)形式运行在每个节点

**解析**

flanneld是每个节点DaemonSet(kube-flannel Pod)提供的守护进程，负责从etcd/kube-apiserver获取网络信息、生成路由表，并对本节点报文进行封装解封。

---

### 22. 【Flannel】Flannel 默认使用的 Pod 网络网段是？

**答案**

**A**　10.244.0.0/16

**解析**

Flannel预留专用网络默认为10.244.0.0/16，按节点切分为对应CIDR子网(每节点10.244.X.0/24)，由host-local进行IPAM，子网信息保存于etcd/kube-apiserver。

---

### 23. 【Flannel】Flannel 为每个节点分配的子网掩码及每节点可分配 Pod 数量约为？

**答案**

**A**　/24，每节点约254个(2^8-2)

**解析**

Flannel默认每节点切分10.244.0.0/24子网，支持2^8=256个子网，每节点子网支持2^8-2=254个Pod。

---

### 24. 【Flannel】Flannel 的 VXLAN 模式描述正确的是？

**答案**

**A**　默认模式，属于Overlay，不需各节点同二层，跨节点Pod经flannel.1隧道封装通过8472/UDP传输

**解析**

VXLAN是Flannel默认后端，为Overlay叠加网络，各节点只要彼此可通信即可、不要求同二层，跨节点Pod报文经flannel.1封装后通过8472/UDP发送。

---

### 25. 【Flannel】Flannel 的 host-gw 模式描述正确的是？

**答案**

**A**　Pod间不经隧道封装而直接路由通信，要求各节点处于同一二层网络，性能较好，此时flannel.1接口不再存在

**解析**

host-gw即Host GateWay，Pod间直接路由不经隧道，要求节点同二层(Underlay)，性能优于VXLAN；此模式下flannel.1虚拟接口不再存在，但cni0仍存在。

---

### 26. 【Flannel】Flannel 的 UDP 后端模式监听的端口及性能特征是？

**答案**

**A**　监听8285/UDP，性能较前两种低很多，仅用于不支持VXLAN/host-gw的环境

**解析**

UDP后端使用常规UDP报文封装完成隧道转发，flanneld监听于8285/UDP，性能比VXLAN和host-gw低很多，仅应用在不支持前两种后端的环境中。

---

### 27. 【Flannel】Flannel 的 VXLAN DirectRouting 模式描述正确的是？

**答案**

**A**　同二层网段内的Pod间直接路由通信，跨网段节点间仍用VXLAN隧道封装

**解析**

VXLAN DirectRouting平衡两种场景：同一二层网段内Pod间直接路由(无需封装)，跨网段节点间仍用VXLAN隧道封装，从而提升同网段跨节点传输效率。

---

### 28. 【Flannel】Flannel 的 ConfigMap(net-conf.json)中用于指定后端模式的字段是？

**答案**

**A**　Backend.Type(如vxlan/host-gw)

**解析**

kube-flannel ConfigMap的net-conf.json含Network(10.244.0.0/16)与Backend(含Type字段，默认vxlan；可改为host-gw或加DirectRouting:true)；cni-conf.json描述CNI插件链(flannel+portmap)。

---

### 29. 【Flannel】Flannel 在每个节点生成的 /run/flannel/subnet.env 中 FLANNEL_MTU 的默认值是？

**答案**

**A**　1450

**解析**

subnet.env包含FLANNEL_NETWORK=10.244.0.0/16、FLANNEL_SUBNET、FLANNEL_MTU=1450、FLANNEL_IPMASQ=true，反映本节点子网与MTU配置。

---

### 30. 【Calico】Calico 相较于 Flannel 的主要优势是？

**答案**

**A**　支持NetworkPolicy网络策略，可动态定义ACL控制进出容器报文

**解析**

Calico主要优势是支持network policy，允许用户动态定义ACL规则控制进出容器数据报文，被视为Flannel的增强版；可整合K8s/OpenShift/Docker EE/OpenStack。

---

### 31. 【Calico】Calico 网络实现的核心特点是？

**答案**

**A**　纯三层方案，把每个节点当作vRouter，不使用cni0网桥，Pod间通信均经路由

**解析**

Calico是纯三层虚拟网络方案，不需cni0网桥；把每个节点当作虚拟路由器(vRouter)，Pod为路由器后的终端设备；所有容器(含同节点)都通过路由通信，摆脱host-gw必须同二层限制。

---

### 32. 【Calico】Calico 安装时的默认网络模式是？原因是什么？

**答案**

**A**　IPIP模式，因为默认无法确定环境中节点是否支持BGP(很多公有云不支持)

**解析**

Calico underlay用BGP、overlay用IPIP(默认)/VXLAN；默认安装采用IPIP模式，因为Calico默认不知道节点是否支持BGP，生产使用较多。

---

### 33. 【Calico】关于 Calico 的 BGP Native Routing，下列说法正确的是？

**答案**

**A**　各节点vRouter通过BGP学习生成路由，默认在集群所有节点间建立iBGP full-mesh，同属AS 64512

**解析**

BGP为三层路由方案，默认所有节点间建立iBGP邻居、同属AS 64512并full-mesh(适用<100节点)；要求所有节点处于二层网络且主机支持BGP。大规模可用Route Reflector或ToR。

---

### 34. 【Calico】Calico 的 IPIP 模式描述正确的是？

**答案**

**A**　把IP包再套一层IP(两层IP头)，仍需要BGP生成路由，隧道接口为tunl0，MTU默认1480

**解析**

IPIP是Calico默认模式，将IP包封装到另一IP包(tunl0隧道)，仍需BGP生成到其它节点Pod子网的路由；MTU默认1480，较VXLAN性能更好；CALICO_IPV4POOL_IPIP=Cross-Subnet表示同网段用BGP、跨网段才IPIP。

---

### 35. 【Calico】Calico 的 VXLAN 模式描述正确的是？

**答案**

**A**　将数据包封装在UDP(4789端口)，不依赖BGP，每节点创建vxlan.calico设备，MTU默认1450

**解析**

Calico VXLAN把数据包封装在UDP(4789端口)，物理IP/MAC为outer-header，不依赖BGP，每节点创建vxlan.calico设备，MTU默认1450，性能较差但功能多。

---

### 36. 【Calico】Calico 中负责“将Felix写入内核的路由信息通过BGP广播给其余节点”的组件是？

**答案**

**A**　BIRD(BGP客户端)

**解析**

Felix是Calico agent(daemonset calico-node)，维护接口/路由/ACL并向etcd宣告状态；BIRD是BGP客户端，把Felix注入内核的路由经BGP广播给其它节点；etcd存储元数据；Typha为>50节点时减轻Datastore负载的中间层。

---

### 37. 【Calico】Calico 为每个 Pod 生成的 veth 网卡在宿主机上表现为哪种命名形式？

**答案**

**A**　cali 后接11个随机字符再加 @ifN(如 caliXXXXXXXX@ifN)

**解析**

Calico每个Pod也生成一对veth，一半在Pod内、另一半在节点主机表现为caliXXXXXXXX@ifN(11个X自动生成、N为网卡编号)；与Flannel不同，Calico不使用虚拟网桥连接同节点Pod。

---

### 38. 【NetworkPolicy】关于 NetworkPolicy 的实现依赖，下列说法正确的是？

**答案**

**A**　网络策略规则由网络插件转为内核iptables规则，Flannel 不支持而 Calico/Canal/kube-router 支持

**解析**

NetworkPolicy只是一种资源对象，需由网络插件的策略控制器(Policy Controller)落实为内核iptables/nftables规则；支持网络策略的插件主要有Calico、Canal、kube-router等，Flannel不支持。

---

### 39. 【NetworkPolicy】NetworkPolicy 资源被转换为内核 iptables 的哪张表？Service 又被转换到哪些表？

**答案**

**A**　NetworkPolicy转到filter表，Service转到nat表或mangle表

**解析**

NetworkPolicy策略中的规则会被转换成iptables的filter表规则；而Service会被转换成iptables的nat或mangle表的规则，二者机制不同。

---

### 40. 【Calico】关于 Calico 的数据存储与 Typha 组件，下列说法正确的是？

**答案**

**A**　少于50节点可结合kube-apiserver存储，多于50节点建议用独立etcd；集群>50节点建议启用Typha减轻Datastore负载

**解析**

Calico Datastore可基于API Server或独立etcd；<50节点结合kube-apiserver，>50节点可用独立etcd(但无法RBAC)；Typha是calico-node与Datastore间带缓存的中间层，每200节点一个、最多20，降低API Server负载。

---

### 41. 【Calico】Calico 的 CRD 属于哪个 API 组？

**答案**

**A**　crd.projectcalico.org/v1

**解析**

安装Calico后会生成crd.projectcalico.org/v1 API组，含BGPConfiguration、BGPPeer、IPPool、FelixConfiguration、GlobalNetworkPolicy、NetworkPolicy等约20个CRD。

---

### 42. 【NetworkPolicy】关于 NetworkPolicy 资源本身，下列说法正确的是？

**答案**

**A**　它是networking.k8s.io/v1的命名空间级标准资源，定义Pod的Ingress/Egress流量规则，但需策略控制器才能真正生效

**解析**

NetworkPolicy是networking.k8s.io/v1稳定版、命名空间级的标准资源，定义在一组Pod上控制进(Ingress)出(Egress)流量的规则；但仅定义无法完成隔离，还需策略控制器实现。

---

### 43. 【Calico】关于 Calico 的 GlobalNetworkPolicy，下列说法正确的是？

**答案**

**A**　它是Calico集群级CRD，支持拒绝规则与优先级(order)，需由calicoctl创建

**解析**

GlobalNetworkPolicy(简称gnp)是crd.projectcalico.org/v1的集群级资源，比K8s NetworkPolicy功能更强：支持拒绝规则、规则解析级别、应用层规则，可用selector/namespaceSelector选定范围(默认all())，有order优先级属性，需由calicoctl创建。

---

### 44. 【网络模型】Kubernetes 集群内一般包含三种网络：节点网络、______ 和 ______。

**答案**

- 第 1 空：Pod网络 / 容器网络 / Pod CIDR
- 第 2 空：Service网络 / 服务网络 / ClusterIP网络

**解析**

K8s集群内一般有三种网络：节点网络、Service网络、Pod网络，通过节点内核交汇路由，形成四类通信(Pod内/Pod间/Service到Pod/外部到Service)。

---

### 45. 【CNI】kubelet 在 ______ 目录查找 CNI 配置文件，并到 ______ 目录查找插件二进制。

**答案**

- 第 1 空：/etc/cni/net.d
- 第 2 空：/opt/cni/bin

**解析**

kubelet在/etc/cni/net.d查找cni json配置文件，基于type属性到/opt/cni/bin查找插件二进制并调用设置网络。

---

### 46. 【默认网段】Flannel 默认 Pod 网段为 ______，Calico 默认 Pod 网段为 ______（由CALICO_IPV4POOL_CIDR指定）。

**答案**

- 第 1 空：10.244.0.0/16
- 第 2 空：192.168.0.0/16

**解析**

Flannel默认10.244.0.0/16(每节点/24)；Calico默认Pod网段192.168.0.0/16，可经CALICO_IPV4POOL_CIDR覆盖为kubeadm的--pod-network-cidr。

---

### 47. 【Flannel】Flannel VXLAN 后端中 flanneld 监听 ______/UDP 端口，UDP 后端监听 ______/UDP 端口。

**答案**

- 第 1 空：8472
- 第 2 空：8285

**解析**

VXLAN后端flanneld监听8472/UDP；UDP后端监听8285/UDP，性能低，仅用于不支持VXLAN/host-gw的环境。

---

### 48. 【VxLAN】VXLAN 的 VNI 长度为 ______ 位，可支持约 ______ 个虚拟网络（写出数值）。

**答案**

- 第 1 空：24
- 第 2 空：16777216 / 2^24 / 1677万

**解析**

VNI为24位，2^24=16777216个虚拟LAN，远大于VLAN的12位(4096)，解决VLAN ID不足。

---

### 49. 【Flannel】Flannel 为每个节点分配 /24 子网，整个大网段支持约 ______ 个子网，单节点可分配约 ______ 个 Pod。

**答案**

- 第 1 空：256 / 2^8
- 第 2 空：254 / 252 / 2^8-2

**解析**

默认10.244.0.0/16每节点切/24子网，支持2^8=256个子网，每节点2^8-2=254个Pod。

---

### 50. 【Calico】Calico 的 BGP 默认所有节点同属自治系统 AS ______，并在节点间默认建立 ______ 全互联连接。

**答案**

- 第 1 空：64512
- 第 2 空：full-mesh / iBGP / full mesh

**解析**

默认在所有节点间建立AS(64512)并基于iBGP创建full-mesh连接，适用<100节点；大规模用Route Reflector/ToR减少peer。

---

### 51. 【Calico】Calico 默认每节点 Pod 子网掩码为 ______（如192.168.0.0/26），每节点可分配约 ______ 个 Pod。

**答案**

- 第 1 空：/26
- 第 2 空：62 / 2^6-2

**解析**

Calico默认每节点子网192.168.0.0/26，支持2^10个子网，每节点2^6-2=62个Pod；BLOCK_SIZE默认/26，可改/24增大。

---

### 52. 【NetworkPolicy】Kubernetes 将 NetworkPolicy 规则转换为内核 iptables 的 ______ 表规则，而 Service 被转换为 ______ 表或 ______ 表的规则。

**答案**

- 第 1 空：filter
- 第 2 空：nat / mangle
- 第 3 空：mangle / nat

**解析**

NetworkPolicy规则转到iptables filter表；Service转到nat或mangle表；Felix/策略控制器把策略落实为内核规则。

---

### 53. 【Calico】Calico IPIP 模式使用隧道接口 ______，VXLAN 模式使用设备 ______。

**答案**

- 第 1 空：tunl0
- 第 2 空：vxlan.calico

**解析**

IPIP路由网关指向对端节点IP、接口为tunl0；VXLAN每节点创建vxlan.calico设备做封装解封装，网关指向对端vxlan.calico接口。

---


## K8s网络插件面试

### 54. 【面试】简述 Kubernetes 的三种网络及由此产生的四类通信。

**答案**

Kubernetes集群内一般有三种网络：节点网络、Service网络、Pod网络，三者通过集群节点内核交汇和路由通信。
由此产生四类通信：①同一Pod内容器间通信(共享网络命名空间，通过loopback)；②Pod间通信(由CNI插件分配IP)；③Service到Pod通信(依赖kube-proxy的iptables或IPVS)；④集群外部与Service通信(依赖NodePort/LoadBalancer等Service类型)。

**解析**

网络插件只需负责Pod间通信；Service网络由kube-proxy在节点内核实现。

---

### 55. 【面试】什么是 CNI？它包含哪三类插件，各自职责是什么？

**答案**

CNI(Container Network Interface)是Kubernetes定义的容器网络接口标准，由Google和CoreOS主导，是CNCF项目；K8s将Pod间通信委托给遵循CNI规范的第三方插件。
CNI插件按源码目录分三类：①main——创建/删除网络、添加Pod容器(如bridge、ipvlan、macvlan、loopback、ptp、veth、vlan)；②ipam——仅负责Pod的IP地址管理(如dhcp、host-local、static)，不实现网络；③meta——其它辅助插件(如tuning改sysctl、portmap端口映射、bandwidth限带宽、sbr源路由、firewall防火墙规则)。

**解析**

CNI本身不是实现，只是协议标准；kubelet创建Pod时调用默认CNI插件配置网络。

---

### 56. 【面试】简述 Underlay 网络与 Overlay 网络的区别及各自典型技术。

**答案**

Underlay Network是底层(承载)物理网络，负责数据包实际传输，性能更好；支持两种模型：二层网络(用Bridge/MACVLAN/IPVLAN把容器直接暴露到外部)和路由模型(用direct routing把节点当路由器，各节点维护到其它Pod子网的路由)。
Overlay Network是虚拟网络，在Underlay之上用隧道协议(VXLAN/IPIP/GRE/STT)封装Pod报文构建，存在额外封装开销但更灵活、支持跨物理网段，生产中较常见。
关键区别：Underlay物理实际、性能好；Overlay虚拟软件实现、功能强、有开销。

**解析**

选择插件时虚拟化环境多用Overlay，物理机可用高性能Underlay。

---

### 57. 【面试】简述 Flannel 的工作机制。

**答案**

Flannel是CoreOS研发的兼容CNI的K8s最早网络插件，基于Golang。
机制：①预留专用网络默认10.244.0.0/16，按节点切分为对应CIDR子网(每节点10.244.X.0/24)；②每个节点运行flanneld(DaemonSet kube-flannel Pod)，向etcd/kube-apiserver申请子网并存储配置；③由host-local(IPAM)给本节点Pod分配IP；④每个节点生成cni0网桥(本节点Pod默认网关)和flannel.1(VXLAN终端)；⑤跨节点Pod通信时，报文经cni0查路由表交由flannel.1封装，通过8472/UDP发往对端flannel.1解封。
整体flannel各节点平等、仅负责数据平面，功能简单。

**解析**

flannel默认MTU 1450(1500-50封装开销)。【衍生知识点】它不支持NetworkPolicy。

---

### 58. 【面试】Flannel 支持哪些后端模式？分别说明其特点与适用场景。

**答案**

Flannel通过backend定义Pod间通信网络，主要有：
①VXLAN(默认)——Overlay隧道封装，不需各节点同二层，跨节点经flannel.1用8472/UDP封装，灵活但对性能略有开销，生产常用。
②host-gw——Underlay直接路由，Pod间不经隧道，要求各节点处于同一二层网络，性能最好，但不适于大规模/跨网段；此模式flannel.1不存在、cni0仍在。
③VXLAN DirectRouting——同网段内直接路由，跨网段仍用VXLAN隧道，兼顾性能与跨网段。
④UDP——常规UDP封装(8285/UDP)，性能最低，仅用于不支持前两者的环境。

**解析**

通过修改kube-flannel ConfigMap的Backend.Type切换，并rollout重启DaemonSet生效。

---

### 59. 【面试】说明 VXLAN 的报文封装结构与关键参数（MTU、端口、VNI）。

**答案**

VXLAN(Virtual eXtensible LAN)是Overlay隧道协议(RFC7348)，采用L2 over L4(MAC-in-UDP)封装：原始L2帧+8字节VXLAN头+UDP头+IP头+外层MAC头。
关键参数：①VNI为24位，支持2^24=16777216个虚拟LAN(VLAN仅12位4096)；VXLAN头Flags中I位必须为1；②UDP目的端口默认8472(Flannel)，Calico VXLAN用标准4789；③Flannel默认MTU=1450，因VXLAN封装增加约50字节开销(1500-50)，避免分片。
内核3.7.0起合并VXLAN、3.12功能完备，属NVO3标准。

**解析**

抓包可见外层IP为节点IP、内层IP为Pod IP。

---

### 60. 【面试】简述 Calico 的工作机制。

**答案**

Calico是纯三层虚拟网络方案，核心特点：
①不使用cni0网桥，把每个节点当作虚拟路由器(vRouter)，节点上Pod视为路由器后的终端设备并分配IP；
②各节点vRouter通过BGP(边界网关协议)学习生成路由，实现跨节点Pod互通；
③每节点的agent(Felix)生成路由规则，并经节点上的BIRD(BGP客户端)把内核路由广播给整个Calico网络；
④把集群每个节点的Pod网络视为一个自治系统，节点为边界网关，通过BGP交换路由；
⑤不支持BGP的环境(如公有云)自动用IPIP/VXLAN叠加模型；并可混合路由+叠加(BGP用于同二层，IPIP/VXLAN用于跨网段Cross-Subnet)。
默认Pod网段192.168.0.0/16。

**解析**

因纯三层、无封装NAT，转发效率在所有方案中较高，且易用iptables实现隔离。

---

### 61. 【面试】Calico 的 Pod 网络如何工作？解释 Proxy ARP 的作用。

**答案**

Calico每个Pod生成一对veth，一半在Pod内、另一半在节点表现为caliXXXXXXXX@ifN(11个X为自动生成、N为编号)；与Flannel不同，Calico不使用虚拟网桥连接同节点Pod。
同节点Pod间通信也走三层路由：节点为每个cali接口开启Proxy ARP(值1)，让宿主机扮演网关、以自己的MAC代为应答对端Pod的ARP请求；Pod内默认路由网关为链路本地169.254.1.1。
Proxy ARP原理：当主机逻辑同网段但物理不同网段发起ARP请求时，出口网关用自身MAC回应，使发送方误以为目标在同一物理网络，从而实现跨物理网络通信。
不同节点Pod间通信则由Calico所选网络模式(BGP/IPIP/VXLAN)决定。

**解析**

可查看/proc/sys/net/ipv4/conf/cali*/proxy_arp确认开启。

---

### 62. 【面试】Calico 支持哪些网络模型？默认是哪一种，为什么？

**答案**

Calico支持：Underlay用BGP(BGP Native Routing)；Overlay用IPIP(默认)和VXLAN，以及它们的混合(IPIP with BGP / VXLAN with BGP，即Cross-Subnet)。
特点：①BGP——纯三层路由，要求所有节点同二层且主机支持BGP，性能高，类似host-gw但由各节点vRouter经BGP学习路由；②IPIP——IP包套IP(tunl0)，仍需BGP生成路由，MTU1480，性能优于VXLAN，Calico默认模式；③VXLAN——封装UDP(4789)，不依赖BGP，用vxlan.calico设备，MTU1450，功能多但性能较差。
默认安装采用IPIP，因为Calico默认无法确定环境中节点是否支持BGP(很多公有云不支持)，IPIP生产使用较多。

**解析**

设CALICO_IPV4POOL_IPIP/VXLAN为Always/Never/Cross-Subnet可切换；IPIP与VXLAN互斥。

---

### 63. 【面试】说明 Calico 的核心组件及其职责。

**答案**

①Felix——Calico agent，以DaemonSet(calico-node)运行于每节点，负责维护虚拟接口、路由、ARP、ACL，并写入内核iptables；监听etcd事件，网络策略最终落实为iptables规则。
②BIRD——BGP客户端，每节点运行，把Felix注入内核的路由经BGP广播给其余节点，实现互通。
③etcd——持久存储Calico数据(节点/网段/IP等)，可与kube-apiserver共用；<50节点用kube-apiserver，>50节点建议独立etcd(但无法RBAC)。
④Route Reflector——可选BGP路由反射器，大规模场景集中生成路由、减少full-mesh连接数。
⑤calico-node——提供Felix+BIRD的守护进程；calico-kube-controller——实现网络策略的控制器(Deployment)；Typha——>50节点时作为calico-node与Datastore间的中间缓存层，降低API Server负载(每200节点一个、最多20)。

**解析**

这些组件共同构成Calico控制与数据平面。

---

### 64. 【面试】部署 Calico 时有哪些关键配置与注意事项？

**答案**

①部署前必须先删除其它CNI(如Flannel)，因为k8s的cni同时只支持一个插件；并注意清空旧路由表避免影响tunl0封装效果。
②部署方式：operator或原始manifests；按规模分<50节点、>50节点、专属etcd节点。
③关键环境变量：CALICO_IPV4POOL_CIDR默认192.168.0.0/16(可覆盖为kubeadm的--pod-network-cidr)；CALICO_IPV4POOL_BLOCK_SIZE默认/26(每节点62 Pod，可改/24)；CALICO_IPV4POOL_IPIP默认Always(启用IPIP)、Never(禁用用BGP)、Cross-Subnet，与CALICO_IPV4POOL_VXLAN(默认Never)互斥；IP=autodetect用于BGP地址探测。
④镜像如docker.io/calico/cni、node、kube-controllers；部署后生成crd.projectcalico.org/v1系列CRD。

**解析**

<50节点用kube-apiserver存储；>50建议启用Typha。

---

### 65. 【面试】NetworkPolicy 的关键字段有哪些？其生效机制是怎样的？

**答案**

NetworkPolicy是networking.k8s.io/v1的命名空间级标准资源，关键spec字段：
①podSelector(必选)——策略生效的目标Pod集合，{}表示本命名空间所有Pod；
②policyTypes——[Ingress]/[Egress]/[Ingress,Egress]，决定哪些方向生效；
③ingress——入站白名单规则，含from(源端点:ipBlock/namespaceSelector/podSelector)与ports(目标端口)；
④egress——出站白名单规则，含to与ports。
生效机制：默认一组Pod出入向均允许；应用策略后，未经明确允许的流量被拒绝；同一方向上多个策略为累加(并集/或)关系；同时定义Ingress和Egress时，对某一对端需双向都显式允许才能真正通信。from中多个元素为或关系，namespaceSelector与podSelector同用为与(交集)。

**解析**

ipBlock含cidr与except；ingress的cidr只支持Pod所在网段，egress的cidr可含外部网络。

---

### 66. 【面试】如何用 NetworkPolicy 实现“默认拒绝所有”与“默认允许所有”？

**答案**

默认拒绝所有：定义policyTypes含Ingress(或Egress)但把ingress(或egress)设为空列表[]或不配置，即不匹配任何流量源，从而隔离所选Pod。例如deny-all-ingress：podSelector:{}、policyTypes:[Ingress,Egress]、ingress:[]、egress:[]。
默认允许所有：podSelector:{}、policyTypes:[Ingress,Egress]、ingress:- {}、egress:- {}，空元素表示匹配所有源/目的，即放行全部。

**解析**

多个策略同名会覆盖；新规则叠加、相同策略新规则覆盖旧规则。

---

### 67. 【面试】NetworkPolicy 中 ipBlock、namespaceSelector、podSelector 如何组合？ingress 与 egress 对网段的限制有何不同？

**答案**

描述对端实体的方式：①一组Pod(标签选择器)；②单个/一组命名空间；③IP地址块(ipBlock含cidr与except)。
组合语义：同一from内多个元素为或关系；namespaceSelector与podSelector同时使用时为与(交集)。
重要差异：ingress.from中的ipBlock cidr只支持Pod所在网段(不支持外部网络地址)；而egress.to中的ipBlock cidr支持外部网络地址(如10.0.0.0/24)。ports中的protocol支持TCP/UDP/SCTP(默认TCP)，可用port+endPort表示端口范围。

**解析**

因此ingress一般放行集群内Pod/网段，对外暴露需靠egress或Service。

---

### 68. 【面试】为什么 Flannel 不支持 NetworkPolicy，而 Calico 支持？策略控制器的作用是什么？

**答案**

NetworkPolicy只是一种资源对象，仅定义规则还不够，必须由网络插件提供的策略控制器(Policy Controller)在底层真正落实为内核iptables/nftables规则。
Flannel功能简单，仅实现构建虚拟网络与数据平面转发，不具备策略控制能力，因此不支持NetworkPolicy；Calico则借助Felix把策略转为iptables规则，原生支持。支持网络策略的插件主要有Calico、Canal、kube-router等。
策略控制器监控API中新建的Pod端点，按需为其附加网络策略，实现细粒度隔离。

**解析**

这也正是Calico相对Flannel的核心优势。

---

### 69. 【面试】Calico 的 GlobalNetworkPolicy 与 Kubernetes NetworkPolicy 有何区别？Calico 提供了哪些典型 CRD？

**答案**

Kubernetes原生NetworkPolicy是命名空间级资源，存在局限：无显式拒绝规则、缺乏选择器高级表达式、不支持应用层规则、没有集群范围策略。
Calico的GlobalNetworkPolicy是crd.projectcalico.org/v1的集群级资源(简称gnp)，功能更强：支持拒绝(action:Deny)规则、规则优先级(order)、应用层规则，可用selector/serviceAccountSelector/namespaceSelector选定范围(默认all()所有端点)，需由calicoctl创建。
Calico典型CRD包括：BGPConfiguration、BGPPeer、IPPool、FelixConfiguration、GlobalNetworkPolicy、GlobalNetworkSet、NetworkPolicy、NetworkSet、HostEndpoint、IPAMBlock/Config/Handle、BlockAffinity、CalicoNodeStatus、ClusterInformation、KubeControllersConfiguration等。

**解析**

安装Calico后会生成crd.projectcalico.org/v1 API组与约20个CRD。

---

### 70. 【面试】从性能与适用场景角度，对比 Flannel 与 Calico 的几种模式。

**答案**

Flannel：VXLAN为默认Overlay，跨节点需8472/UDP封装，性能有开销但部署简单、不要求同二层，适合虚拟化/跨网段；host-gw为Underlay直接路由、性能最好，但要求各节点同二层、不适大规模；UDP性能最差仅作兼容。
Calico：BGP Native Routing纯三层、无封装NAT，性能最高，但要求节点同二层且网络支持BGP(公有云常不支持)；IPIP(默认)为Overlay、需BGP生成路由、MTU1480，性能优于VXLAN；VXLAN不依赖BGP、MTU1450、功能多但性能较差；Cross-Subnet混合模式在同网段走BGP、跨网段走叠加，平衡性能与灵活性。
总体：追求极致性能且环境支持BGP选Calico BGP；环境受限或求简单选Flannel VXLAN；需要NetworkPolicy优先Calico。

**解析**

Calico还需Felix/BIRD组件，架构比Flannel复杂。

---

### 71. 【面试】简述 Calico 中 BGP 的几种拓扑模型及其适用规模。

**答案**

Calico BGP支持多种拓扑：
①Full mesh——默认模式，所有节点两两建立iBGP peer(AS 64512)，彼此更新路由；当主机量多时每个节点都要做(N-1)次更新，性能差，适用于<100节点的小规模集群。
②BGP Reflector(路由反射器)——以中央RR收集并发布路由，其余节点只与RR建peer，显著降低每个节点维护的peer数；可至少选两个节点作RR并在RR间full-mesh，适用于大规模集群。
③ToR(Top of Rack)——节点直接与机柜顶部L3交换机建peer并禁用默认full-mesh；同机柜节点同AS用iBGP、机柜间用eBGP，交换机充当反射器。
Calico也完全支持eBGP以灵活构建拓扑。

**解析**

使用RR时需注意对中央反射器做冗余。

---
