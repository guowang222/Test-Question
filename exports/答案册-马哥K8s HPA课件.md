# 马哥K8s HPA课件 —— 答案与解析

> 共 48 题，编号与《试题册-马哥K8s HPA课件.md》一致。


## K8s HPA笔试

### 1. 【HPA】HorizontalPodAutoscaler（HPA）的本质是？

**答案**

**B**　Pod 的水平自动伸缩器，动态调整工作负载副本数

**解析**

HPA 全称 Horizontal Pod Autoscaler，是 Pod 的水平自动伸缩器（内置组件），根据观察到的指标自动调整 Deployment/StatefulSet 等目标资源的副本数。垂直伸缩是 VPA 的职责，节点伸缩是 Cluster Autoscaler 的职责。

---

### 2. 【HPA】下列关于“水平扩缩”与“垂直扩缩”的说法，正确的是？

**答案**

**B**　水平扩缩是运行应用程序的多个实例，可用 kubectl scale 完成

**解析**

水平扩缩（Horizontal）指运行多个实例，用 kubectl scale 等完成；垂直扩缩（Vertical）指调整分配给容器的 CPU/内存资源，需要更新工作负载的资源定义。HPA 负责水平扩缩，VPA 负责垂直扩缩。

---

### 3. 【HPA】HPA 不适用于以下哪类工作负载对象？

**答案**

**D**　DaemonSet

**解析**

HPA 自动更新支持 scale 子资源的对象（Deployment、StatefulSet、ReplicaSet 等），水平扩缩不适用于无法扩缩的对象，例如 DaemonSet。

---

### 4. 【HPA】关于 Vertical Pod Autoscaler（VPA），下列说法正确的是？

**答案**

**B**　VPA 通过 autoscaling.k8s.io/v1 的 CRD 实现，主要调整 Pod 的 limit/request

**解析**

VPA 是容器垂直伸缩，由第三方开源组件实现，基于 CRD（apiVersion: autoscaling.k8s.io/v1 的 VerticalPodAutoscaler），动态调整单个 Pod 的 limit/request，依赖业务历史负载指标，适合有状态服务场景。

---

### 5. 【KPA】关于 Knative Pod Autoscaler（KPA），下列说法错误的是？

**答案**

**D**　KPA 支持基于 CPU 使用率的自动扩缩容

**解析**

KPA 的主要限制在于它不支持基于 CPU 的自动扩缩容，其指标基于并发请求数（Concurrency）和 RPS；默认无业务时缩容到 0，并通过 queue-proxy 容器向 Autoscaler 报告指标。

---

### 6. 【HPA】Cluster Autoscaler（集群自动伸缩）主要调整的是？

**答案**

**B**　集群中节点（Node）的数量

**解析**

Cluster Autoscaler 是集群容量（node 数量）自动伸缩，依赖 IaaS 的弹性伸缩；当资源不足时调用 Cloud Provider 创建新 Node。它与 HPA（调副本）、VPA（调资源配置）职责不同。

---

### 7. 【HPA】autoscaling/v1 版本的 HPA 在指标支持上的限制是？

**答案**

**B**　仅支持 CPU 一个指标的弹性伸缩

**解析**

autoscaling/v1 只支持 CPU 一个指标的弹性伸缩（通过 targetCPUUtilizationPercentage 字段）。内存、自定义指标、外部指标需要 autoscaling/v2。

---

### 8. 【HPA】相比 autoscaling/v1，autoscaling/v2 增加的指标能力不包括？

**答案**

**D**　支持基于磁盘 I/O 指标的扩缩容

**解析**

autoscaling/v2 支持更多指标：内存、自定义指标（custom.metrics.k8s.io）、外部指标（external.metrics.k8s.io）。磁盘 I/O 并非 HPA 标准直接支持的指标类型。

---

### 9. 【HPA】关于 HPA 资源默认生成的 API 版本，下列说法正确的是？

**答案**

**B**　Kubernetes v1.33 以前 kubectl autoscale 默认生成 HPA-v1，但 kubectl edit hpa 看到的是 v2

**解析**

课件指出：K8s v1.33 以前默认生成 HPA-v1，但在线编辑 kubectl edit hpa 时显示为 autoscaling/v2；新版默认即为 autoscaling/v2。v2beta2 已在 v1.23+ 废弃、v1.26+ 不可用。

---

### 10. 【HPA】HPA 控制器调整副本数的控制回路默认同步周期是？

**答案**

**B**　15 秒

**解析**

HPA 实现为间歇运行的控制回路，同步间隔由 kube-controller-manager 的 --horizontal-pod-autoscaler-sync-period 设置，默认值为 15 秒。

---

### 11. 【HPA】HPA 扩缩容算法中，可容忍的当前值与期望值差异（容差 tolerance）默认是？

**答案**

**C**　0.5

**解析**

默认容差为 0.1（即 1.0±0.1）。比率足够接近 1.0（在 0.9~1.1 之间）时跳过扩缩；大于 1.1 触发扩容，小于 0.9 触发缩容。

---

### 12. 【HPA】某 Deployment 当前副本数为 3，目标资源平均 CPU 利用率为当前 150m、期望 100m，按 HPA 算法（向上取整）期望副本数为？

**答案**

**C**　5

**解析**

公式：desiredReplicas = ceil(currentReplicas × currentMetricValue / desiredMetricValue) = ceil(3 × 150 / 100) = ceil(4.5) = 5。

---

### 13. 【HPA】--horizontal-pod-autoscaler-downscale-stabilization（缩容稳定窗口）的默认值是？

**答案**

**C**　300 秒（5 分钟）

**解析**

缩容冷却时间默认 5 分钟（300 秒），作用是防止副本数频繁抖动（抖动保护）。扩容侧默认无稳定窗口（scale up 默认 0）。

---

### 14. 【HPA】关于 HPA 控制器的以下参数默认值，正确的是？

**答案**

**C**　--horizontal-pod-autoscaler-initial-readiness-delay 默认 30 秒，--horizontal-pod-autoscaler-cpu-initialization-period 默认 5 分钟

**解析**

initial-readiness-delay（Pod 就绪延迟，此时间内不采集）默认 30 秒；cpu-initialization-period（CPU 初始化期，此时间内 CPU 度量不采纳）默认 5 分钟。

---

### 15. 【HPA】为了让 HPA 基于 CPU 工作，Deployment 的 Pod 模板必须满足的前提条件是？

**答案**

**B**　必须定义 resources.requests.cpu（资源请求）

**解析**

HPA 计算 CPU 使用率需要 (实际使用 CPU / requests.cpu)。若不定义 resources.requests.cpu，会报 “missing request for cpu” 且 TARGETS 显示 <unknown>。limits 不是必须，requests 才是前提。

---

### 16. 【HPA】Pod 的 CPU 利用率百分比的计算方式是？

**答案**

**B**　(实际使用的 CPU 量 / requests.cpu) × 100%

**解析**

CPU 利用率 = (Pod 实际使用的 CPU 量 / 容器配置的 resources.requests.cpu) × 100%。例如 requests.cpu=100m、实际使用 80m，则利用率为 80%。

---

### 17. 【HPA】HPA 的 scaleTargetRef 可以指向以下哪些目标资源？

**答案**

**B**　Deployment、ReplicaSet 或 StatefulSet

**解析**

scaleTargetRef（required 字段）指向带 scale 子资源的目标资源，类型可以是 Deployment、ReplicaSet 或 StatefulSet。HPA 据此选择 Pod 并调整副本数。

---

### 18. 【HPA】在 autoscaling/v2 中，Resource 类型指标（如 CPU）支持的目标值（target）类型有？

**答案**

**C**　Utilization 和 AverageValue

**解析**

Resource 指标只支持 Utilization（平均利用率百分比）和 AverageValue 两种目标值。Object 指标支持 Value/AverageValue，Pods 指标仅 AverageValue，External 指标支持 Value/AverageValue。

---

### 19. 【HPA】在 autoscaling/v2 的 behavior 中，scaleDown.stabilizationWindowSeconds 的默认值是？

**答案**

**B**　scale up 默认 0、scale down 默认 300

**解析**

stabilizationWindowSeconds 范围 0~3600：scale up 默认 0（不做稳定），scale down 默认 300（缩短稳定窗口 300 秒）。该字段为 v2 独有，v1 不支持 behavior。

---

### 20. 【指标】Kubernetes 的 API Aggregation（聚合层）是在哪个版本引入的？

**答案**

**B**　1.7

**解析**

Kubernetes 1.7 引入 API Aggregation Layer，集成在 API Server 中，允许第三方应用注册到 kube-apiserver，通过聚合 API 扩展集群能力（如 metrics.k8s.io）。

---

### 21. 【指标】HPA 获取“自定义的 Prometheus 指标（如 http_requests_per_second）”时，经由哪个聚合 API 群组？

**答案**

**B**　custom.metrics.k8s.io

**解析**

三类指标 API：Resource 指标由 metrics.k8s.io 提供（metrics-server）；Custom 指标由 custom.metrics.k8s.io 提供（适配器）；External 指标由 external.metrics.k8s.io 提供（可能由同一适配器提供）。

---

### 22. 【MetricsServer】关于 Metrics Server 的说法，错误的是？

**答案**

**B**　它将采集到的数据持久化存储到 etcd

**解析**

Metrics Server 本身不持久化存储，数据全在内存中、仅保留最新采集值；它是轻量级插件，每 15 秒收集一次，仅用于 HPA/VPA，不能当监控系统用。

---

### 23. 【MetricsServer】部署 Metrics Server 时，下列关键参数正确的是？

**答案**

**B**　--secure-port=4443 与 --kubelet-insecure-tls，指标分辨率 --metric-resolution=15s

**解析**

Metrics Server 部署常用：--secure-port=4443、--kubelet-insecure-tls（跳过 kubelet 证书验证，否则 Pod 无法 Ready）、--metric-resolution=15s（默认每 15 秒采集）。kube-apiserver 必须启用聚合层。

---

### 24. 【MetricsServer】节点上真正采集 Pod/容器 CPU、内存指标的组件是？

**答案**

**B**　Kubelet 内置的 cAdvisor

**解析**

核心指标流水线：Kubelet 通过内置 cAdvisor 收集本节点 Pod/容器资源使用，Metrics Server 从各节点 Kubelet（默认 10250 端口）拉取并聚合并经 metrics.k8s.io 暴露。metrics.k8s.io 仅提供 CPU 和内存。

---

### 25. 【Adapter】prometheus-adapter 的主要作用是？

**答案**

**B**　将 Prometheus 中的指标数据转换为 Kubernetes 的 Custom/External Metrics API 格式

**解析**

prometheus-adapter 是位于监控系统和 K8s API 之间的适配器，把 Prometheus 指标（经 PromQL）转换为标准 K8s 自定义指标（custom.metrics.k8s.io、external.metrics.k8s.io），也可提供 metrics.k8s.io 以替代 Metrics Server（增强版）。

---

### 26. 【Adapter】通过 YAML 部署 prometheus-adapter 时，会向 API 聚合层注册哪些 APIService（名称）？

**答案**

**B**　v1beta1.custom.metrics.k8s.io 与 v1beta1.external.metrics.k8s.io

**解析**

YAML 部署会创建 APIService：v1beta1.custom.metrics.k8s.io（以及 v1beta2 版本）和 v1beta1.external.metrics.k8s.io，由 custom-metrics-apiserver 提供，注册到 API 聚合层。

---

### 27. 【kube-state-metrics】关于 kube-state-metrics（KSM），下列说法正确的是？

**答案**

**B**　它是可选组件，相当于 Kubernetes 的 exporter，补充 Deployment/StatefulSet 等资源指标

**解析**

KSM 相当于 kubernetes-exporter，监听 K8s API Server 从对象状态生成指标，补充 Prometheus 默认不支持的资源（Deployment、StatefulSet、DaemonSet、PVC 等）。仅实现 HPA-v2 自动扩容时可选不装；若要用 Prometheus 监控 deployment 等才需要安装。

---

### 28. 【KEDA】关于 KEDA（Kubernetes Event-Driven Autoscaling），下列说法正确的是？

**答案**

**C**　KEDA 基于事件驱动，支持 Kafka、RabbitMQ、Prometheus、HTTP 等多种数据源，通过 ScaledObject 与 TriggerAuthentication 配置

**解析**

KEDA 是开源的事件驱动扩缩容扩展，支持丰富数据源（Azure Queue、AWS SQS、Kafka、RabbitMQ、Prometheus、HTTP 等），与 HPA 集成，通过 ScaledObject 和 TriggerAuthentication 两个 CRD 配置。HPA 仅支持 K8s 内置指标一种数据源，KEDA 扩展了更多。

---

### 29. Kubernetes 指标系统将指标分为三类并通过不同聚合 API 暴露：核心（Resource）指标由 ______ 提供（仅 CPU 和内存），自定义指标由 ______ 提供，外部指标由 ______ 提供。

**答案**

- 第 1 空：metrics.k8s.io
- 第 2 空：custom.metrics.k8s.io
- 第 3 空：external.metrics.k8s.io

**解析**

核心指标流水线由 metrics-server 暴露 metrics.k8s.io（仅 CPU/内存）；自定义指标经 custom.metrics.k8s.io、外部指标经 external.metrics.k8s.io，二者通常由 Prometheus Adapter 等适配器注册到 API 聚合层。

---

### 30. 部署 Metrics Server 的常见参数：安全监听端口 ______，跳过 kubelet 证书验证的参数 ______，指标采集分辨率 ______（默认每 15 秒）。

**答案**

- 第 1 空：4443 / --secure-port=4443
- 第 2 空：--kubelet-insecure-tls
- 第 3 空：15s / --metric-resolution=15s

**解析**

metrics-server 默认 --secure-port=4443；当 kubelet 证书非 K8s CA 签名时需加 --kubelet-insecure-tls 否则 Pod 无法 Ready；--metric-resolution 默认 15s 控制采集频率。

---

### 31. HPA 扩缩容算法公式为：期望副本数 desiredReplicas = ceil(当前副本数 × ______ / ______)。

**答案**

- 第 1 空：当前指标值 / currentMetricValue
- 第 2 空：期望指标值 / desiredMetricValue

**解析**

期望副本数 = ceil(currentReplicas × currentMetricValue / desiredMetricValue)，ceil 为向上取整。当比率在容差 0.1 内（0.9~1.1）跳过扩缩。

---

### 32. kube-controller-manager 中与 HPA 相关的默认参数：同步周期 --horizontal-pod-autoscaler-sync-period 为 ______，缩容稳定窗口 --horizontal-pod-autoscaler-downscale-stabilization 为 ______，容差 --horizontal-pod-autoscaler-tolerance 为 ______。

**答案**

- 第 1 空：15s / 15秒
- 第 2 空：300s / 5分钟 / 300秒 / 5min
- 第 3 空：0.1

**解析**

sync-period 默认 15s（控制回路周期）；downscale-stabilization 默认 300s（防缩容抖动）；tolerance 默认 0.1（扩缩容触发阈值）。initial-readiness-delay 默认 30s、cpu-initialization-period 默认 5min。

---

### 33. 在 autoscaling/v2 的 metrics 列表中，Resource 类型指标（如 CPU/内存）支持的目标值（target）类型为 ______ 和 ______。

**答案**

- 第 1 空：Utilization / 利用率
- 第 2 空：AverageValue / 平均值

**解析**

Resource 指标只支持 Utilization（平均利用率百分比）与 AverageValue；Object 支持 Value/AverageValue；Pods 仅 AverageValue；External 支持 Value/AverageValue。

---

### 34. 通过 YAML 部署 prometheus-adapter 时会在 API 聚合层注册多个 APIService，用于自定义指标与外部指标的包括 ______ 和 ______（写出两个名称）。

**答案**

- 第 1 空：v1beta1.custom.metrics.k8s.io
- 第 2 空：v1beta1.external.metrics.k8s.io

**解析**

YAML 部署生成 APIService：v1beta1.custom.metrics.k8s.io（及 v1beta2）与 v1beta1.external.metrics.k8s.io，均由 custom-metrics-apiserver 提供，需 kube-apiserver 启用聚合层。

---

### 35. kube-state-metrics 相当于 Kubernetes 的 ______ 角色；Prometheus 基于 kubernetes_sd 默认只能自动发现 Node、Pod、Endpoint、Service 和 ______ 五种资源。

**答案**

- 第 1 空：kubernetes-exporter / K8s exporter / Kubernetes exporter
- 第 2 空：Ingress / ingress

**解析**

KSM 监听 API Server 从对象状态生成指标，相当于 K8s 的 exporter；Prometheus 基于 kubernetes_sd 默认仅支持 Node/Pod/Endpoint/Service/Ingress 五种 role，Deployment/StatefulSet 等需 KSM 补充。

---

### 36. KEDA 通过两个自定义资源（CRD）来配置事件驱动的自动扩缩容：______ 和 ______。

**答案**

- 第 1 空：ScaledObject
- 第 2 空：TriggerAuthentication

**解析**

KEDA 用 ScaledObject 定义扩缩容目标与触发器（事件源），用 TriggerAuthentication 管理访问事件源所需的认证信息；二者是其核心配置 CRD。

---


## K8s HPA面试

### 37. 【面试】请简述 HPA 的工作机制与控制回路运作方式。

**答案**

1. HPA 是一个间歇运行的控制回路（非连续过程），由 kube-controller-manager 中的 HPA 控制器按 --horizontal-pod-autoscaler-sync-period（默认 15s）周期执行。
2. 控制器通过 API Server 的聚合 API 持续采集目标 Pod 副本的指标数据（资源指标 API 或自定义/外部指标 API）。
3. 根据 scaleTargetRef 找到目标资源（Deployment/RS/StatefulSet），用其 .spec.selector 选择 Pod，按用户定义的指标计算目标副本数。
4. 当目标副本数与当前不同时，向目标的 scale 子资源发起 scale 操作，调整副本数。
5. 前提：集群已部署 metrics-server 或 Prometheus Adapter，且 Pod 定义了 resources.requests。

**解析**

回答要点：聚合 API 采集指标 → 按 selector 选 Pod → 算期望副本 → 调 scale 子资源；强调 15s 同步周期与 scale 子资源机制。

---

### 38. 【面试】说明 HPA 的扩缩容算法与“容差”机制，并举例。

**答案**

公式：desiredReplicas = ceil(currentReplicas × currentMetricValue / desiredMetricValue)。
ceil 为向上取整。例如当前 200m、期望 100m，则副本翻倍；当前 50m、期望 100m，则减半。
容差（tolerance）默认 0.1：比率在 1.0±0.1（即 0.9~1.1）范围内视为足够接近，跳过扩缩；超过 1.1 触发扩容，低于 0.9 触发缩容。
注意：未就绪 Pod、或就绪前采集到的 CPU 度量值不计入统计；使用 targetAverageValue/Utilization 时按 Pod 度量平均值作为 currentMetricValue，但无法获取指标的 Pod 仍计入分母。

**解析**

回答要点：给出 ceil 公式；说明 0.1 容差与 0.9/1.1 触发边界；指出未就绪 Pod 不统计。

---

### 39. 【面试】对比 autoscaling/v1 与 autoscaling/v2 的主要差异。

**答案**

1. 指标范围：v1 仅支持 CPU（targetCPUUtilizationPercentage 单字段）；v2 支持 Resource（CPU/内存）、Pods、Object、External 多种指标并存。
2. 字段结构：v1 只有 maxReplicas/minReplicas/scaleTargetRef/targetCPUUtilizationPercentage；v2 引入 metrics 数组（多指标、多类型）与 behavior（缩放行为）。
3. behavior：v2 独有，可配置 scaleUp/scaleDown 的 stabilizationWindowSeconds、policies 等，实现精细化缩放策略；v1 不支持。
4. 默认值：未配置 metrics 时 v2 默认 80% 平均 CPU；minReplicas 默认 1，且可配合 HPAScaleToZero 与 Object/External 指标缩容到 0。
5. 历史：早期还有 v2beta1/v2beta2，v2beta2 已在 v1.23+ 废弃、v1.26+ 不可用；新版默认即 v2。

**解析**

回答要点：v1 只 CPU、单字段；v2 多指标+behavior；版本演进与废弃情况。

---

### 40. 【面试】HPA 无法获取指标（TARGETS 显示 <unknown>）的常见原因与排查思路？

**答案**

1. 未部署指标源：未安装 Metrics Server（或 Prometheus Adapter），kubectl top node 会报 Metrics API not available。需先部署并确认 metrics.k8s.io 可用。
2. Pod 未定义 resources.requests：基于 CPU 的 HPA 必须设置 requests.cpu，否则事件报 FailedGetResourceMetric: missing request for cpu in container。
3. 指标 API 未注册/聚合层未启用：custom/external 指标需对应的 APIService 已注册且 kube-apiserver 启用 aggregation layer。
4. 指标尚未就绪：新建 Pod 在 initial-readiness-delay（30s）、cpu-initialization-period（5min）内数据不被采纳，属正常现象，稍后自动恢复。
5. 网络/证书：Metrics Server 无法访问节点 10250，或 kubelet 证书非 CA 签名又未加 --kubelet-insecure-tls 会导致采集失败。

**解析**

回答要点：指标源缺失、requests 缺失、APIService 未注册、初始化期、网络证书五类原因。

---

### 41. 【面试】简述 Kubernetes 指标系统的三类指标及其对应的聚合 API 群组。

**答案**

1. Resource（核心）指标：CPU 与内存，由 Metrics Server 通过 metrics.k8s.io 提供，供 HPA/VPA/kubectl top 使用。
2. Custom（自定义）指标：业务自定义指标（如 http_requests_per_second），由适配器（如 Prometheus Adapter）通过 custom.metrics.k8s.io 提供。
3. External（外部）指标：来自集群外系统（如消息队列长度），由适配器通过 external.metrics.k8s.io 提供（常与自定义适配器同源）。
三者均通过 API Aggregation 层注册到 kube-apiserver，HPA 控制器统一从这些聚合 API 拉取指标做扩缩容决策。

**解析**

回答要点：Resource→metrics.k8s.io、Custom→custom.metrics.k8s.io、External→external.metrics.k8s.io，均由聚合层暴露。

---

### 42. 【面试】说明核心指标流水线的数据流向与 Metrics Server 的定位和限制。

**答案**

数据流向：Kubelet（内置 cAdvisor）在每节点采集 Pod/容器 CPU、内存 → Metrics Server 周期性（默认 15s）从各节点 Kubelet（10250 端口）拉取并聚合 → 经 metrics.k8s.io/v1beta1 暴露给 API Server → HPA/kubectl top 查询。
定位：Metrics Server 是 SIG 社区维护的轻量插件，本质是经 kube-aggregator 实现的 API server，受 Heapster 启发。
限制：① 数据仅在内存、不持久化、无历史；② 仅提供 CPU/内存两种核心指标；③ 仅用于 HPA/VPA 自动扩缩，不能当监控系统；④ 资源占用低（每节点约 1m CPU + 2MB，支持最多 5000 节点）。

**解析**

回答要点：cAdvisor→Metrics Server→API Server→HPA 的链路；内存不持久、仅 CPU/内存、仅自动扩缩。

---

### 43. 【面试】部署 Metrics Server 有哪些关键前置条件与参数注意事项？

**答案**

前置条件：① kube-apiserver 必须启用 aggregation layer；② 各节点启用 webhook 认证鉴权；③ kubelet 证书由 K8s CA 签名，或加 --kubelet-insecure-tls 跳过验证；④ 容器运行时支持 container metrics RPC 或内置 cAdvisor；⑤ 控制平面经 10250/TCP 访问 Metrics Server，Metrics Server 访问所有节点 10250。
部署参数：--secure-port=4443、--kubelet-insecure-tls（证书非 CA 签名时必加，否则 Readiness 失败）、--metric-resolution=15s。部署后会生成 APIService v1beta1.metrics.k8s.io（group metrics.k8s.io），并提供 NodeMetrics/PodMetrics 资源。

**解析**

回答要点：聚合层启用、kubelet 证书/--kubelet-insecure-tls、10250 端口、secure-port=4443、APIService 名称。

---

### 44. 【面试】简述自定义指标流水线的组成与数据流向。

**答案**

组成：① prometheus-server（采集指标，默认基于 kubernetes_sd 发现 Node/Pod/Endpoint/Service/Ingress 五种资源）；② prometheus-adapter（必需，将 Prometheus 指标转成 custom/external Metrics API 并注册到聚合层）；③ kube-state-metrics（可选，补充 Deployment/StatefulSet 等资源指标，相当于 K8s exporter）。
数据流向：Exporters/Instrumentation（如 node-exporter、KSM）→ Prometheus Server → Prometheus Adapter（经 PromQL 转换）→ API Server（custom.metrics.k8s.io / external.metrics.k8s.io）→ HPA。
Prometheus Adapter 也可提供 metrics.k8s.io 以替代 Metrics Server，是“增强版” Metrics Server，适用于 K8s 1.6+ 的 autoscaling/v2。

**解析**

回答要点：Prometheus+Adapter+KSM 三件套；Adapter 做格式转换注册聚合层；KSM 可选补充。

---

### 45. 【面试】prometheus-adapter 的规则（rules）配置包含哪几个部分？各有什么作用？

**答案**

prometheus-adapter 通过 rules 决定公开哪些指标及如何公开，每条规则独立执行（需互斥），大致分四部分：
1. 发现（seriesQuery）：在 Prometheus 中匹配要公开的指标系列，如 http_requests_total{namespace!="",pod!=""}。
2. 关联（resources/overrides）：将 Prometheus 标签映射到 K8s 资源（如 namespace→namespace、pod→pod），使 HPA 知道指标归属。
3. 命名（name）：用正则 matches 与 as 重命名指标，如 ^(.*)_total → ${1}_per_second（http_requests_total→http_requests_per_second）。
4. 查询（metricsQuery）：将对 K8s 对象的指标请求转换为 PromQL，如 rate(<<.Series>>{<<.LabelMatchers>>}[1m]) 计算 1 分钟 QPS。

**解析**

回答要点：发现/关联/命名/查询四段；举例 http_requests_total→http_requests_per_second 的重命名与 rate 计算。

---

### 46. 【面试】kube-state-metrics 的作用是什么？在什么场景下才需要安装它？

**答案**

作用：KSM 是一个监听 Kubernetes API Server 的简单服务，从对象状态（如 Deployment、ReplicaSet、StatefulSet）生成指标，并转为 Prometheus 标准格式供采集；相当于 K8s 的 exporter，补充 Prometheus 基于 kubernetes_sd 默认不支持的资源（Deployment、StatefulSet、DaemonSet、PVC 等）。
适用场景：① 仅实现 HPA-v2 基于 CPU/内存或已暴露指标的自动扩容时，KSM 可不必安装；② 若要用 Prometheus 监控 Deployment/StatefulSet 等更多资源对象状态、或将其指标作为自定义指标来源时，才需要安装 KSM。
部署要点：metrics 端口 8080，自身 telemetry 端口 8081；资源推荐约 250MiB 内存、0.1 核。

**解析**

回答要点：KSM=K8s exporter 补充资源指标；仅监控 deployment 等对象或作自定义指标来源时才需要。

---

### 47. 【面试】什么是 KEDA？它与 HPA 的关系如何？核心 CRD 有哪些？

**答案**

KEDA（Kubernetes Event-Driven Autoscaling）是基于事件驱动的开源扩缩容扩展。
与 HPA 的关系：原生 HPA 只支持 Kubernetes 内置指标这一种数据源；KEDA 支持更多数据源（Azure Queue、AWS SQS、Kafka、RabbitMQ、Prometheus、HTTP 等），并与 HPA 集成，利用 HPA 的 scale 能力做基于事件的扩缩容，默认也能缩容到 0。
核心 CRD：ScaledObject（定义扩缩容目标与触发器/事件源）与 TriggerAuthentication（管理访问事件源的认证信息）。
【衍生知识点】同类第三方项目还有 Kapacity（蚂蚁开源，提供带技术风险能力的智能容量治理，助力降本增效）。

**解析**

回答要点：事件驱动、多数据源、与 HPA 集成；ScaledObject+TriggerAuthentication；对比原生 HPA 单数据源。

---

### 48. 【面试】HPA 的 behavior（缩放行为）如何配置？为什么生产中观察到“扩容快、缩容慢”？

**答案**

behavior 是 autoscaling/v2 独有字段，包含 scaleUp 与 scaleDown，通过 stabilizationWindowSeconds 与 policies 控制缩放节奏。
默认策略：scale up 的 stabilizationWindowSeconds=0（立即扩容，无稳定窗口）；scale down 的 stabilizationWindowSeconds=300（缩容前等待 300 秒），且 policies 控制单次步进。
“缩容慢”原因：默认缩容稳定窗口 300 秒（5 分钟），且全局缩容冷却 --horizontal-pod-autoscaler-downscale-stabilization 默认也是 5 分钟，目的是防止负载抖动导致频繁增减副本；而扩容侧默认无稳定窗口，所以扩容更迅速。
可针对性调小 behavior.scaleDown.stabilizationWindowSeconds（如 10/30 秒）加快缩容，但需权衡抖动风险。

**解析**

回答要点：v2 的 behavior 字段；scaleUp 默认 0、scaleDown 默认 300；双 5 分钟冷却导致缩容慢。

---
