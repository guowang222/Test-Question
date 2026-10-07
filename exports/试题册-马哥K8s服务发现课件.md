# 马哥K8s服务发现课件 —— 试题册

> 共 52 题。答案与解析见《答案册-马哥K8s服务发现课件.md》。


## K8s服务发现笔试

### 1. 【Service】Service 本质上在 Kubernetes 中充当什么层级的反向代理？

- **A.** 七层(应用层)HTTP 反向代理
- **B.** 四层(TCP/IP)反向代理
- **C.** 三层(IP)路由代理
- **D.** 二层(数据链路层)桥接

### 2. 【Service】关于 Service 与名称空间的关系，下列说法正确的是？

- **A.** Service 是集群级资源，跨名称空间共享
- **B.** Service 是基于名称空间的资源
- **C.** Service 必须定义在 kube-system 名称空间
- **D.** Service 无法按名称空间隔离

### 3. 【Endpoints】创建带有标签选择器的 Service 时，会自动创建的同名资源是？

- **A.** EndpointSlice
- **B.** Endpoints
- **C.** Endpoint
- **D.** Pod

### 4. 【EndpointSlice】EndpointSlice 是在哪个 Kubernetes 版本引入的？

- **A.** v1.11
- **B.** v1.16
- **C.** v1.20
- **D.** v1.8

### 5. 【Endpoints】etcd 中单个 Endpoints 对象默认最大约为多少，约可存储多少个端点？

- **A.** 1.5MB / 约5000个
- **B.** 1MB / 约1000个
- **C.** 3MB / 约10000个
- **D.** 512KB / 约500个

### 6. 【Service】集群内部客户端访问 Service 背后 Pod 的推荐流程是？

- **A.** Client 直接访问 Pod IP
- **B.** Client --> Service网络 --> Pod网络 --> 容器应用
- **C.** Client --> Node IP --> 容器应用
- **D.** Client --> etcd --> Pod

### 7. 【kube-proxy】userspace 代理模型在哪一版本之后被淘汰？

- **A.** v1.1 之前
- **B.** v1.2 之后
- **C.** v1.11
- **D.** v1.8

### 8. 【kube-proxy】关于 iptables 与 ipvs 成为默认代理的版本，正确的是？

- **A.** iptables 于 v1.1 开始使用、v1.2 成为默认；ipvs 于 v1.11 GA 成为默认
- **B.** iptables 于 v1.11 成为默认；ipvs 于 v1.2
- **C.** 二者均从 v1.1 默认
- **D.** ipvs 先于 iptables 成为默认

### 9. 【kube-proxy】iptables 模式下默认基于哪种算法调度，规则复杂度约为？

- **A.** rr 算法，O(1)
- **B.** random 算法，O(n)
- **C.** lc 算法，O(1)
- **D.** sh 算法，O(n)

### 10. 【kube-proxy】IPVS 模式默认调度算法与规则复杂度是？

- **A.** rr 算法，O(1)
- **B.** random 算法，O(n)
- **C.** wrr 算法，O(n)
- **D.** lc 算法，O(1)

### 11. 【kube-proxy】关于 kube-proxy 的本质，下列说法正确的是？

- **A.** 它是 Master 上的独立控制组件
- **B.** 它是 Service Controller 位于各节点上的 agent
- **C.** 它只负责 DNS 解析
- **D.** 它是 etcd 的代理

### 12. 【kube-proxy】关于集群代理模式的选择，下列说法正确的是？

- **A.** 每个节点可独立选择不同模式
- **B.** 一个集群只能选择使用一种 Mode，所有节点相同
- **C.** 可同时混用 iptables 和 ipvs
- **D.** kube-proxy 无需统一模式

### 13. 【Service】关于 ClusterIP 类型，下列说法正确的是？

- **A.** 默认类型，仅集群内部可访问
- **B.** 外部网络可直接访问
- **C.** 必须指定外部 IP
- **D.** 会自动分配 NodePort

### 14. 【NodePort】NodePort 类型 Service 默认可用的节点端口范围是？

- **A.** 20000-22767
- **B.** 30000-32767
- **C.** 80-32767
- **D.** 30000-32768

### 15. 【LoadBalancer】在没有 LBaaS 的私有集群创建 LoadBalancer 类型 Service 时，其 EXTERNAL-IP 状态通常？

- **A.** 立即获得公网 IP
- **B.** 一直保持 Pending 并降级为 NodePort
- **C.** 自动变为 ClusterIP
- **D.** 直接报错创建失败

### 16. 【ExternalName】关于 ExternalName 类型 Service，错误的是？

- **A.** 没有 ClusterIP
- **B.** 没有同名的 Endpoints
- **C.** 通过 CNAME 记录解析外部服务
- **D.** 它基于标签选择器关联 Pod

### 17. 【ExternalIP】关于 externalIPs，下列说法正确的是？

- **A.** 仅能用于 LoadBalancer 类型
- **B.** 可用于任意 Service 类型，但绑定在某节点存在单点问题
- **C.** 只能用于 ClusterIP
- **D.** 必须由云厂商分配

### 18. 【Service】关于 port、targetPort、nodePort 的区别，正确的是？

- **A.** port 是节点端口，nodePort 是 Service 端口
- **B.** port 是 Service 端口，targetPort 是 Pod 容器端口，nodePort 是节点端口
- **C.** targetPort 是 Service 端口
- **D.** nodePort 仅用于 ClusterIP

### 19. 【OpenELB】关于 OpenELB，下列说法正确的是？

- **A.** 由 Google 开源，项目名 MetalLB
- **B.** 由青云 KubeSphere 社区发起，现为 CNCF 沙箱项目，使用 Eip CRD 管理地址池
- **C.** 仅支持 BGP 模式
- **D.** 只能用于云环境

### 20. 【MetalLB】部署 MetalLB 时，若 kube-proxy 工作于 ipvs 模式必须开启？

- **A.** StrictARP（严格 ARP）
- **B.** IPVS scheduler 为 rr
- **C.** 禁用 NodePort
- **D.** externalTrafficPolicy 为 Cluster

### 21. 【会话粘滞】要实现同一客户端 IP 持续访问同一 Pod，需配置？

- **A.** sessionAffinity: None
- **B.** sessionAffinity: ClientIP
- **C.** externalTrafficPolicy: Local
- **D.** sessionAffinity: Cluster

### 22. 【externalTrafficPolicy】externalTrafficPolicy 的 Local 与 Cluster 相比，错误的是？

- **A.** Local 仅当前节点处理，可见真实客户端 IP
- **B.** Cluster 做 FULLNAT，Pod 看不到真实客户端 IP
- **C.** Local 具备跨节点负载均衡
- **D.** Local 少了一次转发、性能更好

### 23. 【IPVS】IPVS 模式下 kube-proxy 会在每个节点创建名为什么的虚拟接口？

- **A.** kube-proxy0
- **B.** kube-ipvs0
- **C.** coredns0
- **D.** flannel.1

### 24. 【DNS】Kubernetes DNS 方案演进顺序是？

- **A.** KubeDNS -> SkyDNS -> CoreDNS
- **B.** SkyDNS -> KubeDNS -> CoreDNS
- **C.** CoreDNS -> KubeDNS -> SkyDNS
- **D.** SkyDNS -> CoreDNS -> KubeDNS

### 25. 【DNS】CoreDNS 对应的 kube-dns Service 默认 ClusterIP 是？

- **A.** 10.96.0.1
- **B.** 10.96.0.10
- **C.** 10.244.0.10
- **D.** 192.168.0.10

### 26. 【DNS】每个 Service 在 CoreDNS 上会自动生成的 DNS 资源记录类型不包括？

- **A.** A/AAAA
- **B.** PTR
- **C.** SRV
- **D.** MX

### 27. 【DNS】关于 SRV 记录的生成，下列说法正确的是？

- **A.** 每个端口都会生成 SRV 记录
- **B.** 仅为定义了名称的端口生成 SRV 记录，未命名端口无
- **C.** SRV 记录指向 ClusterIP 地址
- **D.** SRV 记录格式为 <proto>.<port>

### 28. 【DNS】Pod 的 DNS 解析策略 dnsPolicy 默认值是？

- **A.** Default
- **B.** ClusterFirst
- **C.** ClusterFirstWithHostNet
- **D.** None

### 29. 【DNS】专门用于设置了 hostNetwork 的 Pod 仍使用集群 DNS 的策略是？

- **A.** Default
- **B.** ClusterFirstWithHostNet
- **C.** None
- **D.** ClusterFirst

### 30. 【Headless】Headless Service 通过以下哪项配置实现？

- **A.** type: ExternalName
- **B.** clusterIP: None
- **C.** nodePort: 0
- **D.** externalIPs

### 31. 创建 Service 时若不指定 clusterIP，系统会从 Service 网段 ______ 自动分配地址，该网段默认由 kubeadm 的 --service-cidr 指定。

> 共 1 个空。

### 32. NodePort 类型的 Service 会在每个节点上开放一个端口，该端口默认范围是 ______ ，可通过 kube-apiserver 的 --service-node-port-range 修改。

> 共 1 个空。

### 33. 在 CoreDNS 中，某 Service 的完整 DNS 名称格式为 ______ ，其中依次是服务名、名称空间、固定子域 svc 和集群根域。

> 共 1 个空。

### 34. Kubernetes 集群默认的 DNS 服务 kube-dns 的 ClusterIP 通常为 Service 网段的第 10 个 IP，即 ______ ，Pod 的 /etc/resolv.conf 中 nameserver 即指向它。

> 共 1 个空。

### 35. 要实现同一客户端 IP 始终访问同一后端 Pod，需在 Service 中设置 ______ 为 ClientIP，并通过 sessionAffinityConfig.clientIP.timeoutSeconds 配置保持时长，其默认值为 ______ 秒（3 小时）。

> 共 2 个空。

### 36. IPVS 模式下 kube-proxy 支持多种调度算法，默认使用 ______ ，其它常见算法还包括 wrr、lc、dh、sh、sed、______ 等。

> 共 2 个空。

### 37. EndpointSlice 自 Kubernetes ______ 版本引入，每个 EndpointSlice 默认存储 ______ 个端点，可通过 kube-controller-manager 的 --max-endpoints-per-slice 调整。

> 共 2 个空。

### 38. Service 的 externalTrafficPolicy 有两种取值：默认 ______ 表示向集群范围调度并做 FULLNAT（Pod 看不到真实客户端 IP），而 ______ 表示仅由当前节点处理（DNAT，可见真实 IP 但不跨节点负载均衡）。

> 共 2 个空。


## K8s服务发现面试

### 39. 【面试】简述 Service 的三大核心功能。

### 40. 【面试】Endpoints 与 EndpointSlice 有何区别？为何引入 EndpointSlice？

### 41. 【面试】对比 userspace、iptables、ipvs 三种代理模型。

### 42. 【面试】Kubernetes 中 Service 有哪四种类型？分别适用于什么场景？

### 43. 【面试】externalTrafficPolicy 的 Cluster 与 Local 有何区别？生产如何选择？

### 44. 【面试】如何在 Service 上实现会话粘滞（会话保持）？

### 45. 【面试】OpenELB 与 MetalLB 是如何在裸金属/私有云实现 LoadBalancer 类型 LBaaS 的？

### 46. 【面试】描述 CoreDNS 在 Kubernetes 中的解析流程。

### 47. 【面试】Service 对象在 CoreDNS 中会生成哪些 DNS 资源记录？格式如何？

### 48. 【面试】Pod 的 DNS 解析策略(dnsPolicy)有哪几种？含义是什么？

### 49. 【面试】hostAliases 字段的作用是什么？与 DNS 解析有何不同？

### 50. 【面试】什么是 Headless Service？适用于什么场景？

### 51. 【面试】简述 wordpress 综合案例中各组件及其 Service 设计。

### 52. 【面试】kube-proxy 与 Service 是什么关系？代理模式如何选定？
