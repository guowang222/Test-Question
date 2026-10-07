# 马哥K8s HPA课件 —— 试题册

> 共 48 题。答案与解析见《答案册-马哥K8s HPA课件.md》。


## K8s HPA笔试

### 1. 【HPA】HorizontalPodAutoscaler（HPA）的本质是？

- **A.** Pod 的垂直自动伸缩器，动态调整容器 CPU/内存
- **B.** Pod 的水平自动伸缩器，动态调整工作负载副本数
- **C.** 集群节点数量的自动伸缩器
- **D.** 定时伸缩器，按 cron 表达式扩缩容

### 2. 【HPA】下列关于“水平扩缩”与“垂直扩缩”的说法，正确的是？

- **A.** 水平扩缩通过更新 Pod 资源定义中的 requests/limits 完成
- **B.** 水平扩缩是运行应用程序的多个实例，可用 kubectl scale 完成
- **C.** 垂直扩缩通过 kubectl scale 增加副本数完成
- **D.** 两者都只能由 HPA 控制器自动完成

### 3. 【HPA】HPA 不适用于以下哪类工作负载对象？

- **A.** Deployment
- **B.** StatefulSet
- **C.** ReplicaSet
- **D.** DaemonSet

### 4. 【HPA】关于 Vertical Pod Autoscaler（VPA），下列说法正确的是？

- **A.** VPA 是 Kubernetes 内置组件，动态调整 Pod 副本数
- **B.** VPA 通过 autoscaling.k8s.io/v1 的 CRD 实现，主要调整 Pod 的 limit/request
- **C.** VPA 依赖业务实时负载指标对 Deployment 做水平扩缩
- **D.** VPA 与 HPA 一样只支持 CPU 指标

### 5. 【KPA】关于 Knative Pod Autoscaler（KPA），下列说法错误的是？

- **A.** KPA 基于并发请求数（Concurrency）和每秒请求数（RPS）决策扩缩容
- **B.** KPA 默认会在没有业务请求时将 Pod 数量缩减至 0
- **C.** KPA 通过向 Pod 注入 queue-proxy 容器收集并发指标
- **D.** KPA 支持基于 CPU 使用率的自动扩缩容

### 6. 【HPA】Cluster Autoscaler（集群自动伸缩）主要调整的是？

- **A.** 单个 Pod 的 CPU/内存资源配置
- **B.** 集群中节点（Node）的数量
- **C.** Deployment 的副本数
- **D.** Service 的暴露端口

### 7. 【HPA】autoscaling/v1 版本的 HPA 在指标支持上的限制是？

- **A.** 不支持任何指标
- **B.** 仅支持 CPU 一个指标的弹性伸缩
- **C.** 支持 CPU、内存和自定义指标
- **D.** 仅支持内存指标

### 8. 【HPA】相比 autoscaling/v1，autoscaling/v2 增加的指标能力不包括？

- **A.** 支持基于内存的扩缩容
- **B.** 支持自定义指标（Custom Metrics）
- **C.** 支持外部指标（External Metrics）
- **D.** 支持基于磁盘 I/O 指标的扩缩容

### 9. 【HPA】关于 HPA 资源默认生成的 API 版本，下列说法正确的是？

- **A.** kubectl edit hpa 看到的是 autoscaling/v1
- **B.** Kubernetes v1.33 以前 kubectl autoscale 默认生成 HPA-v1，但 kubectl edit hpa 看到的是 v2
- **C.** 所有版本默认都生成 autoscaling/v2
- **D.** 早期版本默认生成 autoscaling/v2beta2

### 10. 【HPA】HPA 控制器调整副本数的控制回路默认同步周期是？

- **A.** 5 秒
- **B.** 15 秒
- **C.** 30 秒
- **D.** 1 分钟

### 11. 【HPA】HPA 扩缩容算法中，可容忍的当前值与期望值差异（容差 tolerance）默认是？

- **A.** 0.05
- **B.** 0.1
- **C.** 0.5
- **D.** 1.0

### 12. 【HPA】某 Deployment 当前副本数为 3，目标资源平均 CPU 利用率为当前 150m、期望 100m，按 HPA 算法（向上取整）期望副本数为？

- **A.** 3
- **B.** 4
- **C.** 5
- **D.** 6

### 13. 【HPA】--horizontal-pod-autoscaler-downscale-stabilization（缩容稳定窗口）的默认值是？

- **A.** 30 秒
- **B.** 60 秒
- **C.** 300 秒（5 分钟）
- **D.** 0 秒

### 14. 【HPA】关于 HPA 控制器的以下参数默认值，正确的是？

- **A.** --horizontal-pod-autoscaler-initial-readiness-delay 默认 5 分钟
- **B.** --horizontal-pod-autoscaler-cpu-initialization-period 默认 30 秒
- **C.** --horizontal-pod-autoscaler-initial-readiness-delay 默认 30 秒，--horizontal-pod-autoscaler-cpu-initialization-period 默认 5 分钟
- **D.** 两者都默认 15 秒

### 15. 【HPA】为了让 HPA 基于 CPU 工作，Deployment 的 Pod 模板必须满足的前提条件是？

- **A.** 必须设置 resources.limits.cpu
- **B.** 必须定义 resources.requests.cpu（资源请求）
- **C.** 必须设置节点亲和性
- **D.** 必须配置 readinessProbe

### 16. 【HPA】Pod 的 CPU 利用率百分比的计算方式是？

- **A.** (实际使用的 CPU 量 / limits.cpu) × 100%
- **B.** (实际使用的 CPU 量 / requests.cpu) × 100%
- **C.** (limits.cpu / 实际使用的 CPU 量) × 100%
- **D.** (requests.cpu / 节点总 CPU) × 100%

### 17. 【HPA】HPA 的 scaleTargetRef 可以指向以下哪些目标资源？

- **A.** 仅 Deployment
- **B.** Deployment、ReplicaSet 或 StatefulSet
- **C.** 仅 StatefulSet 和 DaemonSet
- **D.** 任意带有标签的资源

### 18. 【HPA】在 autoscaling/v2 中，Resource 类型指标（如 CPU）支持的目标值（target）类型有？

- **A.** 仅 Utilization
- **B.** 仅 AverageValue
- **C.** Utilization 和 AverageValue
- **D.** Value 和 AverageValue

### 19. 【HPA】在 autoscaling/v2 的 behavior 中，scaleDown.stabilizationWindowSeconds 的默认值是？

- **A.** scale up 默认 300、scale down 默认 0
- **B.** scale up 默认 0、scale down 默认 300
- **C.** 两者都默认 0
- **D.** 两者都默认 300

### 20. 【指标】Kubernetes 的 API Aggregation（聚合层）是在哪个版本引入的？

- **A.** 1.6
- **B.** 1.7
- **C.** 1.11
- **D.** 1.16

### 21. 【指标】HPA 获取“自定义的 Prometheus 指标（如 http_requests_per_second）”时，经由哪个聚合 API 群组？

- **A.** metrics.k8s.io
- **B.** custom.metrics.k8s.io
- **C.** external.metrics.k8s.io
- **D.** autoscaling.k8s.io

### 22. 【MetricsServer】关于 Metrics Server 的说法，错误的是？

- **A.** 它由 Kubernetes SIG 社区维护，受 Heapster 启发
- **B.** 它将采集到的数据持久化存储到 etcd
- **C.** 数据仅在内存中保留较短时间，不提供历史数据
- **D.** 仅用于 HPA/VPA 等自动扩缩目的，不应作为监控数据源

### 23. 【MetricsServer】部署 Metrics Server 时，下列关键参数正确的是？

- **A.** --secure-port=8080 与 --kubelet-insecure-tls
- **B.** --secure-port=4443 与 --kubelet-insecure-tls，指标分辨率 --metric-resolution=15s
- **C.** --secure-port=443 且必须关闭聚合层
- **D.** --kubelet-insecure-tls 用于跳过 API Server 证书校验

### 24. 【MetricsServer】节点上真正采集 Pod/容器 CPU、内存指标的组件是？

- **A.** Metrics Server 直接读取
- **B.** Kubelet 内置的 cAdvisor
- **C.** kube-state-metrics
- **D.** Prometheus 的 node-exporter

### 25. 【Adapter】prometheus-adapter 的主要作用是？

- **A.** 替代 kube-apiserver 提供 REST 接口
- **B.** 将 Prometheus 中的指标数据转换为 Kubernetes 的 Custom/External Metrics API 格式
- **C.** 直接采集节点 CPU/内存并写入 etcd
- **D.** 为 DaemonSet 提供水平扩缩能力

### 26. 【Adapter】通过 YAML 部署 prometheus-adapter 时，会向 API 聚合层注册哪些 APIService（名称）？

- **A.** v1beta1.metrics.k8s.io
- **B.** v1beta1.custom.metrics.k8s.io 与 v1beta1.external.metrics.k8s.io
- **C.** autoscaling/v2
- **D.** v1.prometheus.metrics.k8s.io

### 27. 【kube-state-metrics】关于 kube-state-metrics（KSM），下列说法正确的是？

- **A.** 它是实现 HPA 的必选核心组件
- **B.** 它是可选组件，相当于 Kubernetes 的 exporter，补充 Deployment/StatefulSet 等资源指标
- **C.** 它直接采集节点 CPU/内存并替代 cAdvisor
- **D.** 它只能采集 Node、Pod、Endpoint、Service、Ingress 五种资源

### 28. 【KEDA】关于 KEDA（Kubernetes Event-Driven Autoscaling），下列说法正确的是？

- **A.** KEDA 是 Kubernetes 内置组件，只支持 CPU 指标
- **B.** KEDA 仅支持 Kubernetes 内置的单一数据源
- **C.** KEDA 基于事件驱动，支持 Kafka、RabbitMQ、Prometheus、HTTP 等多种数据源，通过 ScaledObject 与 TriggerAuthentication 配置
- **D.** KEDA 无法与 HPA 协作，需独立实现扩缩容

### 29. Kubernetes 指标系统将指标分为三类并通过不同聚合 API 暴露：核心（Resource）指标由 ______ 提供（仅 CPU 和内存），自定义指标由 ______ 提供，外部指标由 ______ 提供。

> 共 3 个空。

### 30. 部署 Metrics Server 的常见参数：安全监听端口 ______，跳过 kubelet 证书验证的参数 ______，指标采集分辨率 ______（默认每 15 秒）。

> 共 3 个空。

### 31. HPA 扩缩容算法公式为：期望副本数 desiredReplicas = ceil(当前副本数 × ______ / ______)。

> 共 2 个空。

### 32. kube-controller-manager 中与 HPA 相关的默认参数：同步周期 --horizontal-pod-autoscaler-sync-period 为 ______，缩容稳定窗口 --horizontal-pod-autoscaler-downscale-stabilization 为 ______，容差 --horizontal-pod-autoscaler-tolerance 为 ______。

> 共 3 个空。

### 33. 在 autoscaling/v2 的 metrics 列表中，Resource 类型指标（如 CPU/内存）支持的目标值（target）类型为 ______ 和 ______。

> 共 2 个空。

### 34. 通过 YAML 部署 prometheus-adapter 时会在 API 聚合层注册多个 APIService，用于自定义指标与外部指标的包括 ______ 和 ______（写出两个名称）。

> 共 2 个空。

### 35. kube-state-metrics 相当于 Kubernetes 的 ______ 角色；Prometheus 基于 kubernetes_sd 默认只能自动发现 Node、Pod、Endpoint、Service 和 ______ 五种资源。

> 共 2 个空。

### 36. KEDA 通过两个自定义资源（CRD）来配置事件驱动的自动扩缩容：______ 和 ______。

> 共 2 个空。


## K8s HPA面试

### 37. 【面试】请简述 HPA 的工作机制与控制回路运作方式。

### 38. 【面试】说明 HPA 的扩缩容算法与“容差”机制，并举例。

### 39. 【面试】对比 autoscaling/v1 与 autoscaling/v2 的主要差异。

### 40. 【面试】HPA 无法获取指标（TARGETS 显示 <unknown>）的常见原因与排查思路？

### 41. 【面试】简述 Kubernetes 指标系统的三类指标及其对应的聚合 API 群组。

### 42. 【面试】说明核心指标流水线的数据流向与 Metrics Server 的定位和限制。

### 43. 【面试】部署 Metrics Server 有哪些关键前置条件与参数注意事项？

### 44. 【面试】简述自定义指标流水线的组成与数据流向。

### 45. 【面试】prometheus-adapter 的规则（rules）配置包含哪几个部分？各有什么作用？

### 46. 【面试】kube-state-metrics 的作用是什么？在什么场景下才需要安装它？

### 47. 【面试】什么是 KEDA？它与 HPA 的关系如何？核心 CRD 有哪些？

### 48. 【面试】HPA 的 behavior（缩放行为）如何配置？为什么生产中观察到“扩容快、缩容慢”？
