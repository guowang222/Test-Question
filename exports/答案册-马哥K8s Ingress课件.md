# 马哥K8s Ingress课件 —— 答案与解析

> 共 46 题，编号与《试题册-马哥K8s Ingress课件.md》一致。


## K8s Ingress笔试

### 1. 【Ingress】Kubernetes 中的 Ingress 本质上是一种什么层的代理？

**答案**

**B**　七层(L7)代理

**解析**

Ingress 本质就是七层代理，可基于 http/https 将集群外部流量统一引入集群内部，避免直接暴露大量端口。而 NodePort/LoadBalancer 等 Service 是四层转发。

---

### 2. 【Ingress】在 Kubernetes 流量模型中，从集群外部到集群内部的流量被称为？

**答案**

**B**　南北向流量(ingress)

**解析**

从北入南(集群外→集群内)为 ingress/南北向流量；从南出北(集群内→集群外)为 egress；Pod 之间的通信为东西向流量。

---

### 3. 【Ingress】相比基于 Service(NodePort/LoadBalancer) 的四层转发，Ingress 主要解决了四层方式的哪项不足？

**答案**

**A**　四层无法实现基于 FQDN/URL/SSL 等应用层代理与高级路由

**解析**

四层协议无法实现基于应用层的代理，尤其涉及 SSL 会话管理、基于 FQDN 的访问、基于 URL 的高级路由/超时重试/灰度等流量治理，且会暴露大量地址端口。

---

### 4. 【Ingress】Ingress 资源本身只定义了抽象的路由配置，实际完成流量转发的是？

**答案**

**B**　Ingress Controller

**解析**

Ingress 只是标准化的资源格式(元数据)，本身不具备内外流量通信功能；Ingress Controller 才是七层反向代理程序，watch API Server 变动并生成配置、完成转发。

---

### 5. 【Ingress】Ingress Controller 通常以什么形式运行于 Kubernetes 集群之上？

**答案**

**B**　Pod 资源

**解析**

Ingress Controller 非内置，需额外部署，通常以 Pod 形式运行，监听 API Server 上 Ingress 资源变动并动态加载配置。

---

### 6. 【Ingress】Ingress 资源属于哪种作用域的资源？

**答案**

**B**　名称空间(namespace)级资源

**解析**

Ingress 属于名称空间级资源，完成将同一个名称空间下的 Service 资源进行暴露。

---

### 7. 【Ingress】Ingress 访问流程中涉及两处 Service，其中后端业务 Service 的作用是？

**答案**

**B**　仅用于服务发现，实际流量不经过它

**解析**

service ingress-nginx 帮助 Controller Pod 接入外部流量；后端 Service 只起到帮助找到具体 Pod 的服务发现作用，流量由 Controller 直接转发到 Pod，不经过后端 Service。

---

### 8. 【Ingress】新版 Kubernetes 中，指定 Ingress 适配的 Controller 类型推荐使用？

**答案**

**B**　spec 字段: ingressClassName

**解析**

ingressClassName 是 spec 的专有字段，引用 IngressClass 资源，v1.18 起使用，为新版推荐方式；旧注解 kubernetes.io/ingress.class 在 v1.32.0 被淘汰。

---

### 9. 【Ingress】旧版用于指定 Ingress Controller 类型的注解 kubernetes.io/ingress.class 在哪一代版本被淘汰？

**答案**

**C**　v1.32.0

**解析**

专用 annotation kubernetes.io/ingress.class 是老版本用法，在 v1.32.0 被淘汰，应使用 ingressClassName 字段。

---

### 10. 【nginx】以下哪一项不是常见的 Ingress Controller 实现？

**答案**

**D**　Docker Swarm

**解析**

常见实现有 Nginx Ingress、Nginx Ingress(NGINX Inc)、Kong、HAProxy、Envoy、Traefik、Contour、Gloo 等；Docker Swarm 是容器编排引擎，并非 Ingress Controller。

---

### 11. 【nginx】关于 Traefik 与 nginx-ingress-controller 的比较，下列说法正确的是？

**答案**

**B**　Traefik 配置使用更简单但性能较 nginx 差

**解析**

Traefik 使用声明式 YAML/TOML，专注容器环境、自动发现，配置更简单；但其性能较 nginx-controller 差。当前使用较多的是 traefik 和 nginx-controller。

---

### 12. 【nginx】由 Kubernetes 官方维护的 Ingress-Nginx 项目从哪个 Kubernetes 版本引入，又在哪版进入稳定？

**答案**

**A**　v1.6 引入，v1.19 进入稳定

**解析**

Ingress-Nginx 自从 k8s-v1.6 版本引入，在 k8s-v1.19 正式进入稳定版本状态。

---

### 13. 【nginx】部署 ingress-nginx-controller 时，若希望直接使用宿主机 IP:80/443 且性能最好，通常采用？

**答案**

**B**　DaemonSet + hostNetwork:true

**解析**

外部用户通过 Controller Pod 所在主机物理网络访问，可配置 DaemonSet 实现，配合 hostNetwork:true 时性能最好，直接使用宿主机 IP:80/443。

---

### 14. 【nginx】ingress-nginx-controller 的 Service 默认 externalTrafficPolicy 为？

**答案**

**B**　Local

**解析**

默认为 Local，只能本机处理流量，即 externalIPs 所在主机与 Controller Pod 运行主机必须是同一节点；改为 Cluster 则所有节点对应端口都能处理流量。

---

### 15. 【nginx】ingress-nginx 的两种主要部署方式是？

**答案**

**A**　kubectl apply YAML 清单 与 Helm

**解析**

ingress-nginx 主要有两种部署方式：with kubectl apply using YAML manifests，以及 with Helm using the project repository chart。

---

### 16. 【命令式】命令式创建 Ingress 资源应使用的命令是？

**答案**

**B**　kubectl create ingress NAME --rule=...

**解析**

命令式实现使用 kubectl create ingress NAME --rule=domain/url=service:port[,tls[=secret]] [--class=...] [--annotation=...]。

---

### 17. 【命令式】kubectl create ingress 的 --rule 中，外部域名要求在什么范围内唯一？

**答案**

**B**　所有名称空间唯一

**解析**

--rule 格式中外部域名要在所有的名称空间唯一；Ingress 要在与后端 Service 相同的名称空间创建。

---

### 18. 【pathType】命令式实现单域名但不支持子 URL 时，生成的 path 为 / 且 pathType 为？

**答案**

**B**　Exact

**解析**

路径精确匹配使用 pathType: Exact（即 --rule="www.wang.org/="）；若要支持子 URL 则用 /*，pathType 为 Prefix。

---

### 19. 【pathType】pathType 的合法取值不包括以下哪一项？

**答案**

**D**　Regexp

**解析**

pathType 支持 Exact、Prefix 和 ImplementationSpecific 三种，必选；不存在 Regexp 这一取值（正则通过 use-regex 注解配合 ImplementationSpecific 实现）。

---

### 20. 【pathType】当一个 path 为 / 且 pathType 为 Prefix 时，它可以匹配哪些请求路径？

**答案**

**B**　/、/aaa、/aaa/bbb 等任意以 / 开头的路径

**解析**

Prefix 模式下 / 是所有路径的前缀，因此匹配全部请求路径；例如 Prefix / 可匹配 /aaa、/aaa/bbb 等。

---

### 21. 【HTTPS】为 Ingress 配置 HTTPS 时，要求事先准备哪种类型的 Secret？

**答案**

**B**　kubernetes.io/tls

**解析**

基于 TLS 的 Ingress 要求事先准备专用的 kubernetes.io/tls 类型 Secret，其中包含名为 tls.crt(证书) 和 tls.key(私钥) 的键。

---

### 22. 【HTTPS】为 Ingress 启用 TLS 后，默认会将 HTTP 请求以什么状态码永久重定向到 HTTPS？

**答案**

**B**　308

**解析**

启用 tls 后该域名下所有 URI 默认强制将 http 请求利用 308 Permanent Redirect 跳转至 https。

---

### 23. 【HTTPS】若要关闭 HTTP 自动跳转 HTTPS，应使用的注解是？

**答案**

**A**　nginx.ingress.kubernetes.io/ssl-redirect: "false"

**解析**

使用注解 nginx.ingress.kubernetes.io/ssl-redirect: "false" 可关闭自动跳转；rewrite-target 用于 URL 重写，与跳转无关。

---

### 24. 【HTTPS】教材中推荐的 HTTPS 证书更新方法是？

**答案**

**B**　删除旧 Secret 再重建新 Secret

**解析**

方法2(简单推荐)：kubectl delete secrets tls-wang 后重新 kubectl create secret tls；在线 base64 修改方式繁琐不推荐。

---

### 25. 【真实IP】要获取真实客户端 IP，Ingress-Nginx 需要通过什么类型的 Service 实现才支持？

**答案**

**B**　LoadBalancer

**解析**

教材明确指出：获取真实客户端 IP 需要通过 LoadBalancer 的 SVC 实现才支持，ExternalIP 不支持。

---

### 26. 【灰度】Ingress-Nginx 金丝雀(Canary)各规则的评估优先级从低到高依次为？

**答案**

**A**　canary-weight → canary-by-cookie → canary-by-header

**解析**

Canary 规则按特定次序评估，优先级从低到高：canary-weight → canary-by-cookie → canary-by-header；header 优先级最高。

---

### 27. Kubernetes 中，将集群外部到集群内部的流量称为______(ingress)，将集群内部到集群外部的流量称为______(egress)；而 Pod 之间的通信称为东西向流量。

**答案**

- 第 1 空：南北向流量 / 南北向 / ingress(南北向)
- 第 2 空：egress / 南出北流量 / egress流量

**解析**

南北向(ingress)对应集群外→集群内，egress 对应集群内→集群外，二者统称南北向；Pod 之间为东西向。

---

### 28. Ingress 由两个核心组件构成：标准的 API 资源______和负责生成并加载反向代理配置的______。

**答案**

- 第 1 空：Ingress / Ingress API / ingress 资源
- 第 2 空：Ingress Controller / ingress-controller / Ingress控制器

**解析**

Ingress 仅为抽象路由配置元数据；Ingress Controller 才是真正七层反向代理，watch 资源变动并生成 nginx 等配置生效。

---

### 29. Ingress 访问流程中涉及两处 Service：______用于帮助 Controller Pod 接入外部流量，而后端业务 Service 仅起到______作用，实际流量______后端 Service。

**答案**

- 第 1 空：ingress-nginx service / service ingress-nginx / ingress-nginx 的 Service
- 第 2 空：服务发现 / service discovery / 服务发现(找到Pod)
- 第 3 空：不经过 / 不经由 / 不会经过

**解析**

service ingress-nginx 负责接入外部流量；后端 Service 仅做服务发现，流量由 Controller 直接转发到 Pod，不经过后端 Service。

---

### 30. 部署 ingress-nginx-controller 时，为获得最好性能可将其工作负载类型改为______，并在 Pod 模板中设置______: true 以直接使用宿主机网络(宿主机IP:80/443)；其 Service 默认的 externalTrafficPolicy 为______。

**答案**

- 第 1 空：DaemonSet / Daemonset / daemonSet
- 第 2 空：hostNetwork / hostNetwork:true
- 第 3 空：Local / local

**解析**

DaemonSet+hostNetwork 性能最好可直接用宿主机IP:80/443；默认 externalTrafficPolicy 为 Local，要求 externalIPs 与 Controller Pod 同节点。

---

### 31. 命令式创建 Ingress 的语法为 kubectl create ingress NAME --rule="______/______=service:port[,tls=secret]" --class=nginx，其中外部域名要求在______唯一。

**答案**

- 第 1 空：host / 域名 / FQDN
- 第 2 空：path / 路径 / URL
- 第 3 空：所有名称空间 / 整个集群名称空间 / 集群内所有ns

**解析**

--rule 格式为 host/path=service:port[,tls=secret]；外部域名要求在所有名称空间唯一；Ingress 须与 Service 同名称空间。

---

### 32. Ingress 的 pathType 三个取值分别是______、______和______。

**答案**

- 第 1 空：Exact / 精确匹配
- 第 2 空：Prefix / 前缀匹配
- 第 3 空：ImplementationSpecific / 实现特定 / ImplementationSpecific(实现相关)

**解析**

pathType 必选，支持 Exact(精确)、Prefix(前缀)、ImplementationSpecific(由具体 Controller 实现决定) 三值。

---

### 33. 为 Ingress 配置 HTTPS 需事先创建类型为______的 Secret，其 data 中必须包含名为______(证书)和______(私钥)的两个键。

**答案**

- 第 1 空：kubernetes.io/tls / tls
- 第 2 空：tls.crt
- 第 3 空：tls.key

**解析**

TLS Secret 类型为 kubernetes.io/tls，固定包含 tls.crt(证书)与 tls.key(私钥)两个键；创建命令 kubectl create secret tls NAME --cert=... --key=...。

---

### 34. Ingress-Nginx 金丝雀发布通过注解开启，其中______设为 "true" 启用金丝雀，______(取值 0-100)按百分比切分权重，规则优先级从低到高为 weight → ______ → header。

**答案**

- 第 1 空：nginx.ingress.kubernetes.io/canary / canary
- 第 2 空：nginx.ingress.kubernetes.io/canary-weight / canary-weight
- 第 3 空：canary-by-cookie / cookie

**解析**

canary: "true" 启用；canary-weight 取 0-100 表示百分比；优先级由低到高 weight→cookie→header，header 最高。

---


## K8s Ingress面试

### 35. 【面试】简述 Ingress 的工作原理，以及相比 Service(NodePort/LoadBalancer) 四层代理它解决了哪些问题。

**答案**

1.Ingress 是 K8s 标准 API 资源(名称空间级)，仅定义抽象路由配置元数据；真正的转发由 Ingress Controller(七层反向代理，以 Pod 运行) watch API Server 变动并生成 nginx 等配置完成。
2.四层 Service(NodePort/LB/externalIP) 的问题：难以做应用级健康检查；不支持基于 FQDN 的访问；不支持基于 URL 的高级路由、超时重试、灰度等流量治理；SSL 会话管理困难；会暴露大量地址和端口。
3.Ingress 作为七层代理：基于 http/https 统一入口暴露服务、负载均衡、终止 SSL/TLS、基于名称的虚拟托管，避免直接暴露端口。
【衍生知识点】Ingress 不公开任意端口/协议，非 HTTP/HTTPS 服务仍用 NodePort/LB Service。

**解析**

回答要点：Ingress + Controller 分工；四层不足清单；七层带来的能力。

---

### 36. 【面试】Ingress 与 Ingress Controller 是什么关系？为什么常说 Ingress 本身不负责流量转发？

**答案**

1.Ingress 是标准化、与具体负载均衡实现解耦的资源格式(authoring 入站连接到达集群服务的规则集合)，只包含 rules/host/http/paths/backend/tls 等元数据。
2.Ingress Controller 是具体实现(nginx/kong/traefik 等)，负责监听 Ingress 变化、转化为自身代理配置并动态加载、最终转发流量。
3.因此 Ingress 自身无转发能力，转发完全依赖 Controller；可同时部署多个 Controller，用 ingressClassName 区分。
【衍生知识点】Controller 以 Pod 运行，需专用 Service 接入外部流量；后端 Service 只做服务发现。

**解析**

回答要点：资源格式 vs 实现程序；动态加载；多 Controller 共存。

---

### 37. 【面试】Ingress 资源访问流程中涉及哪两处 Service？各自承担什么职责？

**答案**

1.service ingress-nginx：帮助 Ingress Controller 的 Pod 接入集群外部流量(通过 NodePort/LoadBalancer/externalIPs 暴露 80/443)。
2.后端业务 Service：仅用于服务发现，帮助 Controller 找到对应的 Pod 端点(Endpoints)，实际用户流量由 Controller Pod 直接转发到后端 Pod，并不经过该 Service(虚线分组/实线访问)。
【衍生知识点】这体现了控制面(配置)与数据面(流量)分离的设计。

**解析**

回答要点：接入 Service 与发现 Service 的分工；数据面不经过后端 Service。

---

### 38. 【面试】列举至少 4 种常见的 Ingress Controller 实现，并说明 Traefik 与 nginx-ingress 各自的优缺点。

**答案**

1.常见实现：nginx-ingress(K8s 官方维护与 NGINX Inc 维护两版)、Kong(基于 NGINX+Lua)、HAProxy Ingress、Envoy、Traefik、Contour、Gloo 等。
2.Traefik：声明式 YAML/TOML，专注容器环境、自动发现与动态配置，配置使用更简单；但性能较 nginx-controller 差。
3.nginx-ingress：性能高、稳定、向后兼容好；NGINX Inc 版基于 NGINX Plus，支持 TCP/UDP，但缺失部分鉴权/流量调度功能且配置相对繁琐。
【衍生知识点】K8s 支持同时部署两个及以上 Ingress Controller。

**解析**

回答要点：至少 4 种；Traefik 易用但性能弱；nginx 性能强但配置繁。

---

### 39. 【面试】ingress-nginx 有哪几种常见部署/接入外部流量的方式？使用 DaemonSet+hostNetwork 有何优缺点？

**答案**

1.部署方式：基于 kubectl apply 的 YAML 清单，或基于 Helm chart。
2.接入外部流量方式：①DaemonSet+hostNetwork(直接用宿主机 IP:80/443，性能最好)；②通过 Controller Service 的 externalIPs 指定外部 IP；③NodePort 类型 Service；④LoadBalancer 类型 Service(配合 openelb 等)。
3.DaemonSet+hostNetwork 优点：性能最好、直接用节点 IP 访问；缺点：占用宿主机 80/443 端口、需 hostNetwork:true 与 hostPID:true、节点需打标签选择。
【衍生知识点】默认 externalTrafficPolicy: Local 要求 externalIPs 与 Controller Pod 同节点，改为 Cluster 则可任意节点。

**解析**

回答要点：YAML/Helm；4 种接入；DaemonSet+hostNetwork 利弊。

---

### 40. 【面试】说明 kubectl create ingress 命令中 --rule 的语法格式，并解释单域名“支持子URL”与“不支持子URL”在 pathType 上的区别。

**答案**

1.格式：kubectl create ingress NAME --rule="host/path=service:port[,tls=secret]" --class=nginx [--annotation=...]，外部域名需在所有名称空间唯一。
2.不支持子 URL：--rule="www.wang.org/=" 生成 path:/、pathType:Exact，仅根路径可访问，其它子 URL 返回 404。
3.支持子 URL：--rule="www.wang.org/*=" 生成 path:/、pathType:Prefix，凡是 / 开头的请求都转发到后端(若后端有对应子路径则正常)。
【衍生知识点】多 URL 场景若后端无对应子路径，需配合 rewrite-target:/ 重写到根。

**解析**

回答要点：--rule 语法；Exact vs Prefix 的差异与现象。

---

### 41. 【面试】什么是 pathType？Exact、Prefix、ImplementationSpecific 三者的匹配规则有何不同？请结合教材匹配表举例。

**答案**

1.pathType 必选，决定 path 的匹配语义，三值：Exact、Prefix、ImplementationSpecific。
2.Exact：精确匹配，大小写敏感；如 /foo 只匹配 /foo，不匹配 /foo/、/bar。
3.Prefix：基于 / 分隔的前缀匹配；如 /foo 匹配 /foo、/foo/；/aaa/bbb 匹配 /aaa/bbb、/aaa/bbb/ccc；/aaa/bbbxyz 不匹配(字符串前缀不匹配)；/ 匹配所有路径。
4.ImplementationSpecific：由具体 Controller 决定；正则路径(如 /v1(/|$)(.*)) 在 k8s-v1.32 不再支持 Exact，须用此值配合 use-regex。
5.混合 /foo(Prefix) 与 /foo(Exact) 时优先选 Exact。

**解析**

回答要点：三值定义；Prefix 的斜杠规则；ImplementationSpecific+正则。

---

### 42. 【面试】如何通过 Ingress 实现 HTTPS？说明所需 Secret 类型、证书更新方法，以及关闭 HTTP 自动跳转 HTTPS 的做法。

**答案**

1.准备 kubernetes.io/tls 类型 Secret：openssl 生成 key/crt 后 kubectl create secret tls tls-wang --cert=... --key=...，其含 tls.crt/tls.key。
2.创建 Ingress 时 rules 对应 host，并在 tls 段指定 hosts 与 secretName：--rule='www.wang.org/*=svc:80,tls=tls-wang'。
3.默认启用 HTTP→HTTPS 的 308 跳转；关闭：注解 nginx.ingress.kubernetes.io/ssl-redirect:"false"。
4.证书更新：推荐删除旧 Secret 再重建(kubectl delete secrets + create secret tls)；在线 base64 改密繁琐不推荐。
【衍生知识点】Ingress TLS 仅限 443/TCP，且依赖 Controller 支持 SNI 在同一端口复用多主机。

**解析**

回答要点：tls Secret；ingress tls 字段；ssl-redirect 关闭；证书更新推荐法。

---

### 43. 【面试】Ingress-Nginx 如何获取真实客户端 IP？为什么 ExternalIP 方式不支持？请说明相关注解与日志字段。

**答案**

1.需通过 LoadBalancer 类型的 Service 实现才支持获取真实客户端 IP；ExternalIP 方式不支持。
2.注解 nginx.ingress.kubernetes.io/enable-real-ip 默认 "true" 允许 IP 透传。
3.nginx 配置中 proxy_set_header X-Forwarded-For $remote_addr 与 X-Real-IP $remote_addr，后端日志字段 $http_x_forwarded_for 记录集群外真实客户端地址，$remote_addr 记录 Controller Pod 地址。
【衍生知识点】若在 LB 前再加 haproxy 等代理，需正确传递 X-Forwarded-For 链。

**解析**

回答要点：LoadBalancer 才支持；enable-real-ip；X-Forwarded-For/X-Real-IP 字段。

---

### 44. 【面试】什么情况下需要使用 nginx.ingress.kubernetes.io/rewrite-target 注解？请举例单域名多URL场景下的两种用法(/ 与 /$2)。

**答案**

1.当代理路径与后端应用实际路径不一致(后端无对应子 URL 资源)时，需用 rewrite-target 做 URL 重写。
2.用法一(不支持子 URL)：--annotation rewrite-target:/ ，将 /v1、/v2 都重写到后端根 /，pathType 为 Exact。
3.用法二(支持子 URL)：注解 rewrite-target:/$2，配合正则 path /v1(/|$)(.*)、/v2(/|$)(.*) 且 pathType:ImplementationSpecific，把匹配到的子路径($2)透传到后端，从而保留 /v1/hostname 等子 URL。
【衍生知识点】k8s-v1.32 命令式正则路径会报错，需用清单文件实现。

**解析**

回答要点：路径不一致时重写；/$2 与正则捕获组；v1.32 限制。

---

### 45. 【面试】什么是蓝绿发布？在 Ingress 中如何实现蓝绿发布？与金丝雀发布有何区别？

**答案**

1.蓝绿(BlueGreen)：同时存在旧版(production)与新版(canary)两套环境，通过切换使流量 100% 在二者间整体转移(production 100%/0% ↔ 0%/100%)。
2.Ingress 实现：准备 pod-test-v1/v2 两套 Deployment+Service，旧版 Ingress 指向 v1；发布时把 Ingress 的 backend.service.name 改为 v2 即整体切换，回滚则改回 v1。
3.与金丝雀区别：蓝绿是整体切换(0/100)，无中间比例；金丝雀(Canary)是按权重/Header/Cookie 渐进切分流量(如 10%→90%)，风险更可控。
【衍生知识点】Ingress-Nginx 只支持南北向流量发布，东西向用 deployment 策略或服务网格。

**解析**

回答要点：蓝绿整体切换；改 backend service；与金丝雀比例切分对比。

---

### 46. 【面试】Ingress-Nginx 支持哪些金丝雀(Canary)发布方式？说明 canary-weight、canary-by-cookie、canary-by-header、canary-by-header-value、canary-by-header-pattern 的作用及优先级。

**答案**

1.开启：注解 nginx.ingress.kubernetes.io/canary:"true"，并创建指向新版的独立 Canary Ingress(与原 Ingress 同 host)。
2.canary-weight(0-100)：按百分比将请求路由到 Canary 服务，0 不转发、100 全转发。
3.canary-by-cookie：基于 Cookie；值 always→走 Canary，never→不走，其它值忽略该规则默认旧版。
4.canary-by-header：基于指定 Request Header；值 always(大小写敏感)→Canary，never→不走，缺省/其它值→默认旧版。
5.canary-by-header-value：配合 canary-by-header 指定 Header 名，其值为指定值(大小写敏感)时走 Canary，否则旧版。
6.canary-by-header-pattern：同上但基于正则表达式匹配 Header 值；若与 header-value 同时存在则被忽略。
7.优先级由低到高：canary-weight → canary-by-cookie → canary-by-header。
【衍生知识点】Service 仅支持按 Pod 数量/比例分配，不支持上述精确策略。

**解析**

回答要点：6 个注解含义；优先级顺序；与 Service 能力对比。

---
