# 马哥K8s Ingress课件 —— 试题册

> 共 46 题。答案与解析见《答案册-马哥K8s Ingress课件.md》。


## K8s Ingress笔试

### 1. 【Ingress】Kubernetes 中的 Ingress 本质上是一种什么层的代理？

- **A.** 四层(L4)代理
- **B.** 七层(L7)代理
- **C.** 三层(L3)代理
- **D.** 二层(L2)代理

### 2. 【Ingress】在 Kubernetes 流量模型中，从集群外部到集群内部的流量被称为？

- **A.** 东西向流量
- **B.** 南北向流量(ingress)
- **C.** egress 流量
- **D.** 横向流量

### 3. 【Ingress】相比基于 Service(NodePort/LoadBalancer) 的四层转发，Ingress 主要解决了四层方式的哪项不足？

- **A.** 四层无法实现基于 FQDN/URL/SSL 等应用层代理与高级路由
- **B.** Service 无法进行任何负载均衡
- **C.** Ingress 比 Service 性能更高
- **D.** Service 不支持健康检查

### 4. 【Ingress】Ingress 资源本身只定义了抽象的路由配置，实际完成流量转发的是？

- **A.** Ingress API 资源
- **B.** Ingress Controller
- **C.** kube-proxy
- **D.** CoreDNS

### 5. 【Ingress】Ingress Controller 通常以什么形式运行于 Kubernetes 集群之上？

- **A.** 宿主机静态二进制
- **B.** Pod 资源
- **C.** 内核模块
- **D.** 独立物理机

### 6. 【Ingress】Ingress 资源属于哪种作用域的资源？

- **A.** 集群级(Cluster)资源
- **B.** 名称空间(namespace)级资源
- **C.** 节点(Node)级资源
- **D.** 全局唯一资源

### 7. 【Ingress】Ingress 访问流程中涉及两处 Service，其中后端业务 Service 的作用是？

- **A.** 帮助 Controller Pod 接入外部流量
- **B.** 仅用于服务发现，实际流量不经过它
- **C.** 负责 TLS 终止
- **D.** 负责应用层健康检查

### 8. 【Ingress】新版 Kubernetes 中，指定 Ingress 适配的 Controller 类型推荐使用？

- **A.** annotation: kubernetes.io/ingress.class
- **B.** spec 字段: ingressClassName
- **C.** Pod 的 nodeName
- **D.** Service 的 label

### 9. 【Ingress】旧版用于指定 Ingress Controller 类型的注解 kubernetes.io/ingress.class 在哪一代版本被淘汰？

- **A.** v1.18
- **B.** v1.22
- **C.** v1.32.0
- **D.** 仍然可用未被淘汰

### 10. 【nginx】以下哪一项不是常见的 Ingress Controller 实现？

- **A.** nginx-ingress
- **B.** Kong
- **C.** HAProxy
- **D.** Docker Swarm

### 11. 【nginx】关于 Traefik 与 nginx-ingress-controller 的比较，下列说法正确的是？

- **A.** Traefik 性能优于 nginx
- **B.** Traefik 配置使用更简单但性能较 nginx 差
- **C.** nginx 不支持动态配置
- **D.** Traefik 不支持容器环境

### 12. 【nginx】由 Kubernetes 官方维护的 Ingress-Nginx 项目从哪个 Kubernetes 版本引入，又在哪版进入稳定？

- **A.** v1.6 引入，v1.19 进入稳定
- **B.** v1.19 引入，v1.22 进入稳定
- **C.** v1.22 引入，v1.32 进入稳定
- **D.** v1.0 引入，v1.18 进入稳定

### 13. 【nginx】部署 ingress-nginx-controller 时，若希望直接使用宿主机 IP:80/443 且性能最好，通常采用？

- **A.** Deployment
- **B.** DaemonSet + hostNetwork:true
- **C.** StatefulSet
- **D.** Job

### 14. 【nginx】ingress-nginx-controller 的 Service 默认 externalTrafficPolicy 为？

- **A.** Cluster
- **B.** Local
- **C.** Node
- **D.** Global

### 15. 【nginx】ingress-nginx 的两种主要部署方式是？

- **A.** kubectl apply YAML 清单 与 Helm
- **B.** docker run 与 ansible
- **C.** yum 与 apt
- **D.** make 与 cmake

### 16. 【命令式】命令式创建 Ingress 资源应使用的命令是？

- **A.** kubectl apply ingress
- **B.** kubectl create ingress NAME --rule=...
- **C.** kubectl run ingress
- **D.** kubectl expose ingress

### 17. 【命令式】kubectl create ingress 的 --rule 中，外部域名要求在什么范围内唯一？

- **A.** 集群内唯一
- **B.** 所有名称空间唯一
- **C.** 节点内唯一
- **D.** 无唯一性要求

### 18. 【pathType】命令式实现单域名但不支持子 URL 时，生成的 path 为 / 且 pathType 为？

- **A.** Prefix
- **B.** Exact
- **C.** ImplementationSpecific
- **D.** Regex

### 19. 【pathType】pathType 的合法取值不包括以下哪一项？

- **A.** Exact
- **B.** Prefix
- **C.** ImplementationSpecific
- **D.** Regexp

### 20. 【pathType】当一个 path 为 / 且 pathType 为 Prefix 时，它可以匹配哪些请求路径？

- **A.** 仅精确匹配 /
- **B.** /、/aaa、/aaa/bbb 等任意以 / 开头的路径
- **C.** 仅匹配空路径
- **D.** 不匹配任何子路径

### 21. 【HTTPS】为 Ingress 配置 HTTPS 时，要求事先准备哪种类型的 Secret？

- **A.** Opaque
- **B.** kubernetes.io/tls
- **C.** docker-registry
- **D.** kubernetes.io/service-account-token

### 22. 【HTTPS】为 Ingress 启用 TLS 后，默认会将 HTTP 请求以什么状态码永久重定向到 HTTPS？

- **A.** 301
- **B.** 308
- **C.** 302
- **D.** 200

### 23. 【HTTPS】若要关闭 HTTP 自动跳转 HTTPS，应使用的注解是？

- **A.** nginx.ingress.kubernetes.io/ssl-redirect: "false"
- **B.** nginx.ingress.kubernetes.io/rewrite-target: /
- **C.** nginx.ingress.kubernetes.io/canary: "false"
- **D.** nginx.ingress.kubernetes.io/enable-real-ip: "false"

### 24. 【HTTPS】教材中推荐的 HTTPS 证书更新方法是？

- **A.** 在线 base64 修改 Secret 内容
- **B.** 删除旧 Secret 再重建新 Secret
- **C.** 直接修改 Controller Pod
- **D.** 重启 Ingress Controller

### 25. 【真实IP】要获取真实客户端 IP，Ingress-Nginx 需要通过什么类型的 Service 实现才支持？

- **A.** ExternalIP
- **B.** LoadBalancer
- **C.** NodePort
- **D.** ClusterIP

### 26. 【灰度】Ingress-Nginx 金丝雀(Canary)各规则的评估优先级从低到高依次为？

- **A.** canary-weight → canary-by-cookie → canary-by-header
- **B.** canary-by-cookie → canary-weight → canary-by-header
- **C.** canary-by-header → canary-by-cookie → canary-weight
- **D.** canary-weight → canary-by-header → canary-by-cookie

### 27. Kubernetes 中，将集群外部到集群内部的流量称为______(ingress)，将集群内部到集群外部的流量称为______(egress)；而 Pod 之间的通信称为东西向流量。

> 共 2 个空。

### 28. Ingress 由两个核心组件构成：标准的 API 资源______和负责生成并加载反向代理配置的______。

> 共 2 个空。

### 29. Ingress 访问流程中涉及两处 Service：______用于帮助 Controller Pod 接入外部流量，而后端业务 Service 仅起到______作用，实际流量______后端 Service。

> 共 3 个空。

### 30. 部署 ingress-nginx-controller 时，为获得最好性能可将其工作负载类型改为______，并在 Pod 模板中设置______: true 以直接使用宿主机网络(宿主机IP:80/443)；其 Service 默认的 externalTrafficPolicy 为______。

> 共 3 个空。

### 31. 命令式创建 Ingress 的语法为 kubectl create ingress NAME --rule="______/______=service:port[,tls=secret]" --class=nginx，其中外部域名要求在______唯一。

> 共 3 个空。

### 32. Ingress 的 pathType 三个取值分别是______、______和______。

> 共 3 个空。

### 33. 为 Ingress 配置 HTTPS 需事先创建类型为______的 Secret，其 data 中必须包含名为______(证书)和______(私钥)的两个键。

> 共 3 个空。

### 34. Ingress-Nginx 金丝雀发布通过注解开启，其中______设为 "true" 启用金丝雀，______(取值 0-100)按百分比切分权重，规则优先级从低到高为 weight → ______ → header。

> 共 3 个空。


## K8s Ingress面试

### 35. 【面试】简述 Ingress 的工作原理，以及相比 Service(NodePort/LoadBalancer) 四层代理它解决了哪些问题。

### 36. 【面试】Ingress 与 Ingress Controller 是什么关系？为什么常说 Ingress 本身不负责流量转发？

### 37. 【面试】Ingress 资源访问流程中涉及哪两处 Service？各自承担什么职责？

### 38. 【面试】列举至少 4 种常见的 Ingress Controller 实现，并说明 Traefik 与 nginx-ingress 各自的优缺点。

### 39. 【面试】ingress-nginx 有哪几种常见部署/接入外部流量的方式？使用 DaemonSet+hostNetwork 有何优缺点？

### 40. 【面试】说明 kubectl create ingress 命令中 --rule 的语法格式，并解释单域名“支持子URL”与“不支持子URL”在 pathType 上的区别。

### 41. 【面试】什么是 pathType？Exact、Prefix、ImplementationSpecific 三者的匹配规则有何不同？请结合教材匹配表举例。

### 42. 【面试】如何通过 Ingress 实现 HTTPS？说明所需 Secret 类型、证书更新方法，以及关闭 HTTP 自动跳转 HTTPS 的做法。

### 43. 【面试】Ingress-Nginx 如何获取真实客户端 IP？为什么 ExternalIP 方式不支持？请说明相关注解与日志字段。

### 44. 【面试】什么情况下需要使用 nginx.ingress.kubernetes.io/rewrite-target 注解？请举例单域名多URL场景下的两种用法(/ 与 /$2)。

### 45. 【面试】什么是蓝绿发布？在 Ingress 中如何实现蓝绿发布？与金丝雀发布有何区别？

### 46. 【面试】Ingress-Nginx 支持哪些金丝雀(Canary)发布方式？说明 canary-weight、canary-by-cookie、canary-by-header、canary-by-header-value、canary-by-header-pattern 的作用及优先级。
