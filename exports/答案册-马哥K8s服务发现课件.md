# 马哥K8s服务发现课件 —— 答案与解析

> 共 52 题，编号与《试题册-马哥K8s服务发现课件.md》一致。


## K8s服务发现笔试

### 1. 【Service】Service 本质上在 Kubernetes 中充当什么层级的反向代理？

**答案**

**B**　四层(TCP/IP)反向代理

**解析**

Service 本质是一个四层的反向代理，集群内外的客户端通过 Service 访问后端 Pod 应用。

---

### 2. 【Service】关于 Service 与名称空间的关系，下列说法正确的是？

**答案**

**B**　Service 是基于名称空间的资源

**解析**

Service 是基于名称空间的资源，在所属名称空间内通过标签选择器发现 Pod。

---

### 3. 【Endpoints】创建带有标签选择器的 Service 时，会自动创建的同名资源是？

**答案**

**B**　Endpoints

**解析**

创建带标签选择器的 Service 时，Endpoint Controller 会自动创建同名的 Endpoints 资源来维护后端 Pod 的 IP:Port。

---

### 4. 【EndpointSlice】EndpointSlice 是在哪个 Kubernetes 版本引入的？

**答案**

**B**　v1.16

**解析**

自 Kubernetes v1.16 引入 EndpointSlice，将 Endpoints 切分为多片以减小单次更新同步的数据量。

---

### 5. 【Endpoints】etcd 中单个 Endpoints 对象默认最大约为多少，约可存储多少个端点？

**答案**

**A**　1.5MB / 约5000个

**解析**

ETCD 对象默认最大 1.5MB，一个 Endpoints 对象至多存储约 5000 个端点（平均约 300KB/端点）。

---

### 6. 【Service】集群内部客户端访问 Service 背后 Pod 的推荐流程是？

**答案**

**B**　Client --> Service网络 --> Pod网络 --> 容器应用

**解析**

集群内部 Client 通过 Service 网络访问 Pod 网络再到容器应用；外部 Client 经节点网络再进入 Service 网络。

---

### 7. 【kube-proxy】userspace 代理模型在哪一版本之后被淘汰？

**答案**

**B**　v1.2 之后

**解析**

userspace 模型从 v1.1 之前使用，v1.2 之后淘汰，因其需用户态来回转发、效率低下。

---

### 8. 【kube-proxy】关于 iptables 与 ipvs 成为默认代理的版本，正确的是？

**答案**

**A**　iptables 于 v1.1 开始使用、v1.2 成为默认；ipvs 于 v1.11 GA 成为默认

**解析**

iptables 在 v1.1 开始使用、v1.2 成为默认；ipvs 于 v1.8 引入、v1.9 beta、v1.11 GA 成为默认。

---

### 9. 【kube-proxy】iptables 模式下默认基于哪种算法调度，规则复杂度约为？

**答案**

**B**　random 算法，O(n)

**解析**

iptables 默认基于 random 算法调度，规则复杂度 O(n)，服务数量大时性能下降明显。

---

### 10. 【kube-proxy】IPVS 模式默认调度算法与规则复杂度是？

**答案**

**A**　rr 算法，O(1)

**解析**

IPVS 默认基于 rr 算法，底层使用 hash 表，复杂度 O(1)，服务规模大时性能更优。

---

### 11. 【kube-proxy】关于 kube-proxy 的本质，下列说法正确的是？

**答案**

**B**　它是 Service Controller 位于各节点上的 agent

**解析**

kube-proxy 本质是 Service Controller 位于各节点上的 agent，负责将 Service 定义落地为本地负载均衡规则。

---

### 12. 【kube-proxy】关于集群代理模式的选择，下列说法正确的是？

**答案**

**B**　一个集群只能选择使用一种 Mode，所有节点相同

**解析**

一个集群只能选择一种 Mode，所有节点须使用相同方式。

---

### 13. 【Service】关于 ClusterIP 类型，下列说法正确的是？

**答案**

**A**　默认类型，仅集群内部可访问

**解析**

ClusterIP 是 Service 默认类型，为集群内部客户端访问，外部网络无法访问。

---

### 14. 【NodePort】NodePort 类型 Service 默认可用的节点端口范围是？

**答案**

**B**　30000-32767

**解析**

NodePort 默认随机端口范围 30000~32767，可指定固定端口，由 --service-node-port-range 配置。

---

### 15. 【LoadBalancer】在没有 LBaaS 的私有集群创建 LoadBalancer 类型 Service 时，其 EXTERNAL-IP 状态通常？

**答案**

**B**　一直保持 Pending 并降级为 NodePort

**解析**

无 LBaaS 时找不到指定服务，EXTERNAL-IP 一直处于 Pending 并降级为 NodePort 类型。

---

### 16. 【ExternalName】关于 ExternalName 类型 Service，错误的是？

**答案**

**D**　它基于标签选择器关联 Pod

**解析**

ExternalName 没有 selector，不会创建同名 Endpoints，而是将外部主机名以 CNAME 记录引入集群。

---

### 17. 【ExternalIP】关于 externalIPs，下列说法正确的是？

**答案**

**B**　可用于任意 Service 类型，但绑定在某节点存在单点问题

**解析**

externalIPs 可用于任意 Service 类型，流量入口是配置了该 IP 的节点，存在单点，可借助 Keepalived 实现高可用。

---

### 18. 【Service】关于 port、targetPort、nodePort 的区别，正确的是？

**答案**

**B**　port 是 Service 端口，targetPort 是 Pod 容器端口，nodePort 是节点端口

**解析**

port 为 Service 端口，targetPort 为后端 Pod 容器端口，nodePort 为节点端口（仅 NodePort/LoadBalancer 可用）。

---

### 19. 【OpenELB】关于 OpenELB，下列说法正确的是？

**答案**

**B**　由青云 KubeSphere 社区发起，现为 CNCF 沙箱项目，使用 Eip CRD 管理地址池

**解析**

OpenELB 由青云 KubeSphere 社区发起，现为 CNCF 沙箱项目，支持 Layer2/BGP 模式，通过 Eip(CRD) 管理地址池。

---

### 20. 【MetalLB】部署 MetalLB 时，若 kube-proxy 工作于 ipvs 模式必须开启？

**答案**

**A**　StrictARP（严格 ARP）

**解析**

MetalLB 在 ipvs 模式下必须使用严格 ARP(strictARP)，否则需配置 kube-proxy 开启 strictARP。

---

### 21. 【会话粘滞】要实现同一客户端 IP 持续访问同一 Pod，需配置？

**答案**

**B**　sessionAffinity: ClientIP

**解析**

由 service.spec.sessionAffinity 设为 ClientIP 实现，仅能基于客户端 IP 识别，默认超时 10800 秒。

---

### 22. 【externalTrafficPolicy】externalTrafficPolicy 的 Local 与 Cluster 相比，错误的是？

**答案**

**C**　Local 具备跨节点负载均衡

**解析**

Local 模式只转发本机 Pod，不做跨节点负载均衡，需配合外部 LoadBalancer 实现全局均衡。

---

### 23. 【IPVS】IPVS 模式下 kube-proxy 会在每个节点创建名为什么的虚拟接口？

**答案**

**B**　kube-ipvs0

**解析**

IPVS 会在每个节点创建 kube-ipvs0 虚拟接口，将所有 Service 的 ClusterIP 和 ExternalIP 配置其上。

---

### 24. 【DNS】Kubernetes DNS 方案演进顺序是？

**答案**

**B**　SkyDNS -> KubeDNS -> CoreDNS

**解析**

先后为 SkyDNS(v1.3 前)、KubeDNS(v1.13 前)、CoreDNS(当前默认)；CoreDNS 基于 Go 语言、CNCF 毕业项目。

---

### 25. 【DNS】CoreDNS 对应的 kube-dns Service 默认 ClusterIP 是？

**答案**

**B**　10.96.0.10

**解析**

kube-dns 的 ClusterIP 默认为 Service 网段第 10 个 IP，即 10.96.0.10。

---

### 26. 【DNS】每个 Service 在 CoreDNS 上会自动生成的 DNS 资源记录类型不包括？

**答案**

**D**　MX

**解析**

每个 Service 会生成 A/AAAA、PTR 和 SRV 三类记录；未命名端口无 SRV 记录。

---

### 27. 【DNS】关于 SRV 记录的生成，下列说法正确的是？

**答案**

**B**　仅为定义了名称的端口生成 SRV 记录，未命名端口无

**解析**

SRV 记录格式 _port_name._proto.<service>.<ns>.svc.<zone>，仅为命名端口生成。

---

### 28. 【DNS】Pod 的 DNS 解析策略 dnsPolicy 默认值是？

**答案**

**B**　ClusterFirst

**解析**

dnsPolicy 默认 ClusterFirst，优先使用集群内 DNS 解析集群域名，其它域名交由上游解析。

---

### 29. 【DNS】专门用于设置了 hostNetwork 的 Pod 仍使用集群 DNS 的策略是？

**答案**

**B**　ClusterFirstWithHostNet

**解析**

ClusterFirstWithHostNet 专用于 hostNetwork 的 Pod，仍使用 ClusterFirst 策略而非节点 DNS。

---

### 30. 【Headless】Headless Service 通过以下哪项配置实现？

**答案**

**B**　clusterIP: None

**解析**

设置 clusterIP: None 即为无头服务，其 DNS 直接解析为各就绪 Pod 的 IP，负载均衡交由 DNS 完成。

---

### 31. 创建 Service 时若不指定 clusterIP，系统会从 Service 网段 ______ 自动分配地址，该网段默认由 kubeadm 的 --service-cidr 指定。

**答案**

- 第 1 空：10.96.0.0/12

**解析**

Service 网段默认即为 10.96.0.0/12（也可在初始化时自定义）。

---

### 32. NodePort 类型的 Service 会在每个节点上开放一个端口，该端口默认范围是 ______ ，可通过 kube-apiserver 的 --service-node-port-range 修改。

**答案**

- 第 1 空：30000-32767 / 30000~32767

**解析**

默认随机端口范围 30000~32767，两端均包含。

---

### 33. 在 CoreDNS 中，某 Service 的完整 DNS 名称格式为 ______ ，其中依次是服务名、名称空间、固定子域 svc 和集群根域。

**答案**

- 第 1 空：svc名称.名称空间.svc.cluster.local / <service>.<ns>.svc.cluster.local / 服务名.命名空间.svc.cluster.local

**解析**

标准全名格式为 <service>.<namespace>.svc.cluster.local。

---

### 34. Kubernetes 集群默认的 DNS 服务 kube-dns 的 ClusterIP 通常为 Service 网段的第 10 个 IP，即 ______ ，Pod 的 /etc/resolv.conf 中 nameserver 即指向它。

**答案**

- 第 1 空：10.96.0.10

**解析**

kube-dns ClusterIP 默认 10.96.0.10，由 clusterDNS 参数设定。

---

### 35. 要实现同一客户端 IP 始终访问同一后端 Pod，需在 Service 中设置 ______ 为 ClientIP，并通过 sessionAffinityConfig.clientIP.timeoutSeconds 配置保持时长，其默认值为 ______ 秒（3 小时）。

**答案**

- 第 1 空：sessionAffinity
- 第 2 空：10800

**解析**

sessionAffinity 可取 None/ClientIP，默认 None；保持时长默认 10800 秒，范围 1-86400。

---

### 36. IPVS 模式下 kube-proxy 支持多种调度算法，默认使用 ______ ，其它常见算法还包括 wrr、lc、dh、sh、sed、______ 等。

**答案**

- 第 1 空：rr / round robin / 轮询
- 第 2 空：nq / lblc / wlc

**解析**

IPVS 默认 rr（轮询），还支持 wrr/lc/dh/sh/sed/nq 等算法。

---

### 37. EndpointSlice 自 Kubernetes ______ 版本引入，每个 EndpointSlice 默认存储 ______ 个端点，可通过 kube-controller-manager 的 --max-endpoints-per-slice 调整。

**答案**

- 第 1 空：v1.16
- 第 2 空：100

**解析**

EndpointSlice 于 v1.16 引入，每片默认 100 个端点。

---

### 38. Service 的 externalTrafficPolicy 有两种取值：默认 ______ 表示向集群范围调度并做 FULLNAT（Pod 看不到真实客户端 IP），而 ______ 表示仅由当前节点处理（DNAT，可见真实 IP 但不跨节点负载均衡）。

**答案**

- 第 1 空：Cluster
- 第 2 空：Local

**解析**

Cluster 为默认做 FULLNAT；Local 仅本机转发、可见真实 IP。

---


## K8s服务发现面试

### 39. 【面试】简述 Service 的三大核心功能。

**答案**

1) 服务发现：利用标签选择器在同一 namespace 筛选符合条件的 Pod，结合 readiness 探针实现健康性检查。
2) 负载均衡：作为流量入口和负载均衡器，入口为 ClusterIP，筛选出的 Pod IP 作为后端服务器。
3) 名称解析：利用 Cluster DNS 为每个 Service 自动生成 A、PTR 和 SRV 记录。

**解析**

Service 既是访问入口，也是服务注册与发现的载体。

---

### 40. 【面试】Endpoints 与 EndpointSlice 有何区别？为何引入 EndpointSlice？

**答案**

Endpoints 是传统端点列表资源，每创建或变更一个 Pod 就要更新并同步整个 Endpoints 对象（最大约 1.5MB、约 5000 端点）到每个节点的 kube-proxy，规模大时开销巨大（如 2000 节点+5000 端点滚动更新需发送约 15T 数据）。
EndpointSlice 自 v1.16 引入，将 Endpoints 切分为多片，每个 Slice 默认存 100 个端点，单个 Pod 变动只更新对应 Slice，避免全量同步；二者并存、未被取代。

**解析**

【衍生知识点】--max-endpoints-per-slice 可调整每片端点数。

---

### 41. 【面试】对比 userspace、iptables、ipvs 三种代理模型。

**答案**

userspace：最早实现，请求经内核->iptables 拦截->用户态 kube-proxy->回内核转发，来回转发效率低下，v1.2 后淘汰。
iptables：v1.2 起默认，规则直接重定向请求，性能优于 userspace；默认 random 调度，复杂度 O(n)，几千个 Service 时规则可达几万条性能差；后端无响应不会自动重定向。
ipvs：v1.11 GA 默认，基于 rr 等调度算法，hash 表实现复杂度 O(1)，大规模 Service 性能明显更优；仅源地址转换等极少场景用少量 iptables 规则。
kubeadm 安装若检测到 ipvs 模块则用之(NAT 模式)，否则自动回退 iptables。

**解析**

【衍生知识点】v1.29 后还支持 nftables，kernelspace 仅 Windows 使用。

---

### 42. 【面试】Kubernetes 中 Service 有哪四种类型？分别适用于什么场景？

**答案**

1) ClusterIP：默认类型，仅集群内部访问（东西流量）。
2) NodePort：在 ClusterIP 基础上于所有节点开放固定/随机端口(30000-32767)，供集群外经 NodeIP:NodePort 访问。
3) LoadBalancer：基于 NodePort，借助云厂商或 OpenELB/MetalLB 等 LBaaS 分配外部 VIP，适合公有云/裸金属对外发布。
4) ExternalName：将集群外服务以 CNAME 引入集群内部，无 ClusterIP、无同名 Endpoints。

**解析**

【衍生知识点】externalIPs 可在任意类型上提供额外外部入口。

---

### 43. 【面试】externalTrafficPolicy 的 Cluster 与 Local 有何区别？生产如何选择？

**答案**

Cluster（默认）：外部请求从某节点 NodePort 进入后，可调度到任意节点 Pod，做 FULLNAT，Pod 看不到真实客户端 IP，负载均衡好但多一次转发、性能略差。
Local：仅调度当前节点上的 Pod，只做 DNAT，Pod 可见真实客户端 IP，无跨节点转发性能好；但本节点无 Pod 时无法访问、负载均衡差。
生产建议：追求真实客户端 IP 且性能时选 Local，并通常配合 LoadBalancer(如 OpenELB/MetalLB) 实现跨节点均衡；Local 仅支持 NodePort/LoadBalancer/ExternalIPs。

**解析**

【衍生知识点】Local 模式下若当前节点只有一个 Pod 仍会本机负载均衡。

---

### 44. 【面试】如何在 Service 上实现会话粘滞（会话保持）？

**答案**

通过 service.spec.sessionAffinity 配置：设为 ClientIP（默认 None 即不开启），可让同一客户端 IP 的请求始终转发到同一后端 Pod，由 kube-proxy 的 ipvs 机制实现。
通过 sessionAffinityConfig.clientIP.timeoutSeconds 设置保持时长，默认 10800 秒(3 小时)，范围 1-86400。
注意：仅能基于客户端 IP 粗粒度识别，默认 3 小时后重新调度。

**解析**

【衍生知识点】更通用的会话保持还可借助会话复制或 Redis 等共享存储。

---

### 45. 【面试】OpenELB 与 MetalLB 是如何在裸金属/私有云实现 LoadBalancer 类型 LBaaS 的？

**答案**

OpenELB：青云 KubeSphere 社区发起的 CNCF 沙箱项目，支持 Layer2 与 BGP 两种模式（BGP 需硬件支持）。核心是把特定 VIP 流量引到集群再由 kube-proxy 转发；通过 Eip(CRD, network.kubesphere.io/v1alpha2) 管理地址池，分配给 LoadBalancer Service 作为 EXTERNAL-IP。
MetalLB：Google 开源的 CNCF sandbox 项目，提供 Address Allocation(按地址池分配 IP) 与 External Announcement(用 ARP/NDP 或 BGP 对外公告)。二层模式将 LB IP 配在某节点并 ARP/NDP 公告（故障转移秒级、有瓶颈），BGP 模式与路由器建邻居实现真正跨节点均衡；ipvs 模式下需开启 strictARP，用 IPAddressPool+L2Advertisement 定义地址池与公告。

**解析**

【衍生知识点】二者均可能不支持 OpenStack 等云环境。

---

### 46. 【面试】描述 CoreDNS 在 Kubernetes 中的解析流程。

**答案**

1) Client Pod 查询自身 /etc/resolv.conf 中的 nameserver（即 kube-dns Service 的 ClusterIP，默认 10.96.0.10）。
2) 请求转发给 kube-dns Service，再转发到后端 CoreDNS Pod（通常 kube-system 下 2 副本）。
3) CoreDNS 依据 Corefile 通过 kubernetes 插件连接 default 名称空间的 kubernetes Service，其 Endpoints 指向各 kube-apiserver:6443，进而查询 etcd 中的 Service/Endpoint/Pod 信息。
4) CoreDNS 返回 Service 名对应 IP；外部域名无法解析则 forward 给上游（一般取自 CoreDNS Pod 所在节点 /etc/resolv.conf）。

**解析**

【衍生知识点】CoreDNS 通过 list/watch endpoints、services、pods、namespaces 及 endpointslices 实现实时更新。

---

### 47. 【面试】Service 对象在 CoreDNS 中会生成哪些 DNS 资源记录？格式如何？

**答案**

每个 Service 生成三类记录：
A/AAAA：<service>.<ns>.svc.<zone> IN A <cluster-ip>（IPv4 为 A、IPv6 为 AAAA）。
PTR：<reversed-ip>.in-addr.arpa IN PTR <service>.<ns>.svc.<zone>。（反解）
SRV：仅为定义了名称的端口生成 _<port_name>._<proto>.<service>.<ns>.svc.<zone> IN SRV <weight> <priority> <port> <service>.<ns>.svc.<zone>；未命名端口无 SRV 记录。

**解析**

【衍生知识点】默认 zone 为 cluster.local，可用 --service-dns-domain 定制。

---

### 48. 【面试】Pod 的 DNS 解析策略(dnsPolicy)有哪几种？含义是什么？

**答案**

Default：从 Pod 所在宿主机节点的 /etc/resolv.conf 继承 DNS 配置。
ClusterFirst（默认）：优先用集群内 DNS 解析集群域名称，其它域名交由 CoreDNS Pod 所在节点的 /etc/resolv.conf 上游解析。
ClusterFirstWithHostNet：专用于设置了 hostNetwork 的 Pod，仍使用 ClusterFirst 而非节点 DNS。
None：忽略集群默认设定，仅使用 dnsConfig 自定义（nameservers/searches/options）。

**解析**

【衍生知识点】dnsConfig 会与 dnsPolicy 生成的配置合并生效。

---

### 49. 【面试】hostAliases 字段的作用是什么？与 DNS 解析有何不同？

**答案**

hostAliases 是 Pod spec 字段，用于在 Pod 内 /etc/hosts 文件中手动添加 IP 与主机名的映射，实现在不改 DNS 的情况下为容器指定额外解析或临时覆盖某域名（绕过 DNS）。
Kubernetes 自动管理 /etc/hosts 的基础条目（含 Pod 自身主机名与回环地址），hostAliases 添加的条目标注为 'Entries added by HostAliases'。
与 DNS 不同：hostAliases 仅影响 /etc/hosts 的静态解析，host/dig 等 DNS 工具不会读取它；它优先级高、适合测试或特殊场景。

**解析**

【衍生知识点】CoreDNS 中也常用 hosts 插件实现类似 /etc/hosts 的静态记录。

---

### 50. 【面试】什么是 Headless Service？适用于什么场景？

**答案**

Headless Service 即不分配 ClusterIP 的 Service（clusterIP: None），其 DNS 名称直接解析为后端各就绪 Pod 的 IP（不再解析为 ClusterIP），负载均衡交由 DNS 完成，减少 Service->ClusterIP->Pod 的两层跳转。
Pod 的 PTR 记录解析为 <a>-<b>-<c>-<d>.<service>.<ns>.svc.<zone> 形式的主机名。
分为：有 selector（或无 selector 但有同名 Endpoint）的狭义 Headless，主要应用于 StatefulSet 有状态服务；以及无 selector 也无 Endpoint、用于 ExternalName 外部服务的情形。
注意：Headless 是四层调度，https 需每个服务配置独立主机。

**解析**

【衍生知识点】ExternalName 类 Headless 通过 CNAME 指向 externalName。

---

### 51. 【面试】简述 wordpress 综合案例中各组件及其 Service 设计。

**答案**

案例在 demo 名称空间部署 mysql(Deployment) 与 wordpress(Deployment) 两个应用。
mysql Service：类型 ClusterIP（或默认），端口 3306，通过标签选择器 app:mysql 关联后端 Pod，供集群内部 wordpress 访问。
wordpress Service：类型 LoadBalancer（需先部署 LBaaS 软件；也可改 NodePort），端口 80，环境变量 WORDPRESS_DB_HOST 指向 mysql 服务名（mysql.demo.svc.cluster.local 或简写 mysql）实现跨 Pod 服务发现。
整体体现：有状态/后端数据库用 ClusterIP 对内，前端 Web 用 LoadBalancer/NodePort 对外发布。

**解析**

【衍生知识点】也可为 mysql 用 Headless Service 配合 StatefulSet。

---

### 52. 【面试】kube-proxy 与 Service 是什么关系？代理模式如何选定？

**答案**

Service 是 API 资源，定义访问入口；kube-proxy 是各节点上的 agent（Service Controller 在各节点的代理），监视 API Server 中 Service 的增删改，将定义实时转为本地 iptables/ipvs/nftables 规则，实现负载均衡与转发。
Service Controller 触发各节点 kube-proxy 生成规则；默认规则仅拦截/转发本节点 Pod 发出的请求。
代理模式选择：集群只能用一种 Mode；kubeadm 安装时若节点已加载 ipvs 模块则自动用 ipvs(NAT)，否则回退 iptables；也可通过 kubeadm-init 配置 SupportIPVSProxyMode+mode: ipvs，或 kubectl edit configmap kube-proxy 修改 mode，再重启 kube-proxy 生效。v1.29 后还支持 nftables。

**解析**

【衍生知识点】IPVS 规则查看用 ipvsadm -Ln，iptables 用 iptables -t nat -vnL。

---
