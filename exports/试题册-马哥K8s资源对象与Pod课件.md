# 马哥K8s资源对象与Pod课件 —— 试题册

> 共 64 题。答案与解析见《答案册-马哥K8s资源对象与Pod课件.md》。


## K8s Pod笔试

### 1. 【资源对象】下列 Kubernetes 资源中属于“集群级资源”（不受名称空间约束、名称需在集群内全局唯一）的是？

- **A.** Pod
- **B.** Service
- **C.** Namespace
- **D.** ConfigMap

### 2. 【资源对象】关于 Kubernetes 的内置 API 资源与自定义 API 资源，下列说法正确的是？

- **A.** 所有 API 资源都能独立创建并人为管理
- **B.** Label 和 emptyDir 等没有独立 API 资源，需依附其它资源存在
- **C.** CRD 不属于 API 资源
- **D.** 所有 API 资源都不支持人为创建

### 3. 【API】关于 Kubernetes 的 API 群组，下列说法正确的是？

- **A.** 核心群组的 apiVersion 引用需写成 core/v1
- **B.** 命名群组的 REST 路径为 /apis/$GROUP_NAME/$VERSION
- **C.** 所有资源都属于命名群组
- **D.** apps/v1 属于核心群组

### 4. 【API】在资源配置清单的 apiVersion 字段中，核心群组（core group）可省略路径，下列属于核心群组引用写法的是？

- **A.** apps/v1
- **B.** v1
- **C.** autoscaling/v2
- **D.** networking.k8s.io/v1

### 5. 【API】kubeadm 部署的集群默认只支持 HTTPS 访问 API Server，为方便在本地用 HTTP 访问，可启动本地代理的命令是？

- **A.** kubectl proxy
- **B.** kubectl port-forward
- **C.** kubectl api-versions
- **D.** kubectl get --raw

### 6. 【API】要直接访问 default 名称空间下名为 mypod 的 Pod 对应的 REST 资源（核心群组），正确的路径是？

- **A.** /apis/apps/v1/namespaces/default/pods/mypod
- **B.** /api/v1/namespaces/default/pods/mypod
- **C.** /api/v1/pods/mypod
- **D.** /apis/v1/namespace/default/pods/mypod

### 7. 【API】Kubernetes API 设计原则的第一条是：所有 API 应该是？

- **A.** 命令式（Imperative）
- **B.** 声明式（Declarative）
- **C.** 过程式
- **D.** 函数式

### 8. 【资源对象】下列资源中属于“元数据类型资源”（根据指标进行操作，如 HPA）的是？

- **A.** Pod
- **B.** HPA
- **C.** Deployment
- **D.** Service

### 9. 【清单】关于资源配置清单的五个一级字段，下列说法正确的是？

- **A.** spec 表示对象当前实际运行状态且对用户只读
- **B.** status 由用户定义期望状态
- **C.** metadata 提供名称、名称空间、标签等元数据
- **D.** 所有资源对象都必须有 status 字段

### 10. 【清单】使用 kubectl explain 查看 Pod 资源中 containers.imagePullPolicy 字段的帮助，正确的命令是？

- **A.** kubectl explain pod.spec.containers.imagePullPolicy
- **B.** kubectl describe pod
- **C.** kubectl help imagePullPolicy
- **D.** kubectl get pod --explain

### 11. 【清单】关于 YAML 格式，下列说法错误的是？

- **A.** 大小写敏感
- **B.** 使用缩进表示层级关系
- **C.** 缩进允许使用 Tab 键
- **D.** 以 # 开头的内容表示注释

### 12. 【清单】Kubernetes 资源配置清单中，字段名与字段值在命名风格上的约定是？

- **A.** 字段名大驼峰、字段值小驼峰
- **B.** 字段名小驼峰、字段值大驼峰
- **C.** 字段名全小写、字段值全大写
- **D.** 字段名用下划线、字段值用中划线

### 13. 【清单】metadata 字段中，属于“必选字段”（用户必须提供）的是？

- **A.** labels
- **B.** annotations
- **C.** name
- **D.** resourceVersion

### 14. 【清单】将已有 Pod 导出为 YAML 模板文件以便修改，正确的命令是？

- **A.** kubectl get pods pod-test1 -o yaml > pod-test1.yaml
- **B.** kubectl export pods pod-test1
- **C.** kubectl dump pod-test1
- **D.** kubectl get pod-test1 --template

### 15. 【管理】kubectl 的“声明式对象配置（declarative object configuration）”使用的典型命令是？

- **A.** kubectl run
- **B.** kubectl create
- **C.** kubectl apply
- **D.** kubectl delete

### 16. 【管理】关于 kubectl 三种资源管理方式，下列说法错误的是？

- **A.** 指令式命令包括 kubectl run/expose/delete 等
- **B.** 指令式对象配置通过 kubectl create/delete/replace/edit 管理
- **C.** 声明式对象配置具有幂等性，生产推荐
- **D.** 指令式对象配置具有幂等性，生产推荐

### 17. 【dry-run】利用 dry-run 模拟运行命令生成清单文件时，生产可用且推荐的写法是？

- **A.** --dry-run=true -o yaml
- **B.** --dry-run=client -o yaml
- **C.** --dry-run=server -o json
- **D.** --dry-run -o name

### 18. 【Namespace】下列名称空间中，默认由 Kubernetes 创建且属于“系统级名称空间”（不可删除）的是？

- **A.** default
- **B.** demo
- **C.** stage
- **D.** test

### 19. 【Namespace】关于 kube-node-lease 名称空间，下列说法错误的是？

- **A.** 用于承载节点租约（Lease）资源
- **B.** 由 coordination.k8s.io 群组的 Lease 资源实现
- **C.** 每个管理组件在该 NS 下有同名 Lease 对象
- **D.** 它属于用户自定义名称空间

### 20. 【Namespace】在 Kubernetes 中删除一个名称空间（Namespace）会产生什么后果？

- **A.** 仅删除该名称空间本身
- **B.** 会级联删除该名称空间下的所有资源，非常危险
- **C.** 仅删除其中的 Pod
- **D.** 对其它资源无任何影响

### 21. 【Pod】关于 Pod 中的 pause 容器（基础设施容器 / infra 容器），下列说法错误的是？

- **A.** 每个 Pod 包含一个 pause 容器，作为其它容器的父容器
- **B.** 业务容器共享 pause 容器的网络栈和存储卷
- **C.** PID、Mount、User 名称空间默认全部共享
- **D.** Pod 的 IP 就是 pause 容器的地址

### 22. 【Pod】同一 Pod 内的多个容器默认共享的资源不包括下列哪项？

- **A.** Network 网络栈
- **B.** IPC 进程间通信
- **C.** UTS 主机名/域名
- **D.** User 用户（实际各自独立不共享）

### 23. 【Pod】关于 Pod 的组成形式，下列说法正确的是？

- **A.** 每个 Pod 只能包含一个容器
- **B.** 多容器 Pod 除 pause 外一般由主容器和辅助容器（如 sidecar）构成
- **C.** 多容器 Pod 内的容器不能共享网络
- **D.** Pod 等同于单个容器

### 24. 【Pod】使用 kubectl run 创建自主式 Pod 时，若希望容器进程退出后不被重启，应加的参数是？

- **A.** --restart=Always
- **B.** --restart=OnFailure
- **C.** --restart=Never
- **D.** --rm

### 25. 【Pod】关于静态 Pod（static Pod），下列说法错误的是？

- **A.** 由节点上的 kubelet 加载配置创建，API Server 只能查看不能管理
- **B.** kubeadm 部署时控制平面组件（如 kube-apiserver）以静态 Pod 运行
- **C.** 可以通过 kubectl delete 直接删除
- **D.** 默认配置文件目录为 /etc/kubernetes/manifests

### 26. 【Pod】kubeadm 部署的集群中，控制平面组件（etcd、kube-apiserver、kube-controller-manager、kube-scheduler）对应的 Pod 属于？

- **A.** 自主式 Pod
- **B.** 静态 Pod
- **C.** Deployment 管理的 Pod
- **D.** DaemonSet 管理的 Pod

### 27. 【清单】关于 Pod 清单中 spec.containers 的 command 与 args 字段，下列说法错误的是？

- **A.** command 用于覆盖镜像默认的 ENTRYPOINT
- **B.** args 用于覆盖镜像默认的 CMD
- **C.** 只设置 args 时它作为镜像默认 ENTRYPOINT 的参数
- **D.** 只设置 command 时会把镜像默认的参数一起保留

### 28. 【清单】在 spec.containers[].args 中引用环境变量，正确的格式是？

- **A.** $VAR_NAME
- **B.** $(VAR_NAME)
- **C.** ${VAR_NAME}
- **D.** %VAR_NAME%

### 29. 【Pod】关于 Pod 的 spec.hostNetwork 字段，下列说法错误的是？

- **A.** 默认值为 false
- **B.** 设为 true 表示使用宿主机网络，不使用 docker 网桥
- **C.** 设为 true 时同一台宿主机无法启动该容器的第二个副本
- **D.** 设为 true 时 Pod 的 IP 与宿主机不同

### 30. 【清单】Pod 容器端口定义中 spec.containers[].ports[].protocol 的默认协议是？

- **A.** UDP
- **B.** TCP
- **C.** SCTP
- **D.** HTTP

### 31. 【清单】Pod 的 spec.restartPolicy（重启策略）默认值是？

- **A.** Never
- **B.** OnFailure
- **C.** Always
- **D.** 无默认值

### 32. 【探针】关于临时容器（Ephemeral Containers），下列说法错误的是？

- **A.** 可用于交互式故障排查
- **B.** 可用于构建应用程序并具备端口和健康探针
- **C.** 当容器镜像无 shell 导致 kubectl exec 失效时很有用
- **D.** 可添加调试工具而无需重启原 Pod

### 33. 【探针】向一个正在运行的 Pod 添加临时容器进行调试，使用的命令是？

- **A.** kubectl exec --debug
- **B.** kubectl debug
- **C.** kubectl attach
- **D.** kubectl run

### 34. 【探针】关于临时容器的创建方式，下列说法正确的是？

- **A.** 可以直接用 kubectl edit 添加到 pod.spec 段
- **B.** 使用 API 中特殊的 ephemeralContainers 处理器创建
- **C.** 可以添加端口配置
- **D.** 支持配置 livenessProbe

### 35. 【状态】Pod 的 phase（相位）共有五种状态，下列不包含在内的是？

- **A.** Pending
- **B.** Running
- **C.** Succeeded
- **D.** Stopped

### 36. 【Pod】容器镜像拉取策略 imagePullPolicy 的默认值规则是？

- **A.** 固定为 Always
- **B.** 固定为 IfNotPresent
- **C.** 固定为 Never
- **D.** 取决于镜像 tag：tag 为 latest 时为 Always，否则为 IfNotPresent

### 37. 【探针】Pod 探针的三种常见实现方式是？

- **A.** Exec、HTTPGet、tcpSocket
- **B.** Exec、command、args
- **C.** HTTPGet、env、tcpSocket
- **D.** liveness、readiness、startup

### 38. 【QoS】关于 QoS 等级 Guaranteed（保证），下列说法正确的是？

- **A.** Pod 无需设置 requests/limits
- **B.** Pod 内每个容器同时设置 CPU 和内存的 requests 与 limits，且对应值相等
- **C.** 只要至少有一个容器 requests 与 limits 不相等
- **D.** 任意一个容器设置了 limits 即可

### 39. 【Pod】每个 Pod 都会包含一个名为______的“基础设施容器”（也叫 infra 容器），同一 Pod 内的业务容器共享它的网络栈与存储卷。

> 共 1 个空。

### 40. 【Pod】同一 Pod 内的容器默认共享 Network、IPC、UTS 名称空间与存储卷，但______和______名称空间是每个容器各自独立、默认不共享的。

> 共 2 个空。

### 41. 【探针】探针的探测参数中，periodSeconds（探测周期）默认为______秒，timeoutSeconds（探测超时）默认为______秒。

> 共 2 个空。

### 42. 【探针】在三种探针中，______和______的 successThreshold（连续成功次数）只能为 1，不能为其它值。

> 共 2 个空。

### 43. 【状态】Pod 因容器启动后反复异常退出、重启次数过多而进入的等待/异常状态是______；若镜像因 imagePullPolicy=Never 且本地不存在导致拉取失败，Pod 会显示为______状态。

> 共 2 个空。

### 44. 【生命周期】Pod 被删除时，kubelet 触发容器发送 TERM 信号之前的“体面终止宽限期”由字段______控制，其默认值为______秒。

> 共 2 个空。

### 45. 【QoS】当 Pod 内每个容器都同时设置了 CPU 和内存的 requests 与 limits 且二者相等时，其 QoS 等级为______；当所有容器都未设置 requests 和 limits 时，QoS 等级为______。

> 共 2 个空。

### 46. 【钩子】生命周期钩子 postStart 在容器______后立即运行，而 preStop 在容器______之前立即运行（并阻塞删除操作直到完成）。

> 共 2 个空。

### 47. 【资源对象】Kubernetes 资源按适用范围（作用域）可分为名称空间级别、集群级别和______三类。

> 共 1 个空。

### 48. 【清单】资源配置清单的五个一级字段中，______由用户定义对象的期望状态，而______由 Kubernetes 系统自行维护并标记为只读。

> 共 2 个空。


## K8s Pod面试

### 49. 【面试】Kubernetes 的资源对象按适用范围分为哪几类？请各举两个例子。

### 50. 【面试】简述 Kubernetes 资源配置清单的五个一级字段及其作用。

### 51. 【面试】kubectl 管理资源有哪三种方式？各自的典型命令与幂等性如何？

### 52. 【面试】什么是 pause 容器？它在 Pod 中承担什么作用？

### 53. 【面试】同一个 Pod 内的多个容器共享哪些名称空间？哪些默认不共享？

### 54. 【面试】自主式 Pod、控制器管理的 Pod 和静态 Pod 三者有何区别？

### 55. 【面试】简述 Pod 的生命周期及主要的 phase（相位）含义。

### 56. 【面试】Kubernetes 有哪三种探针（Probe）？各自作用是什么？

### 57. 【面试】探针有哪三种实现方式？简述其判定成功的条件。

### 58. 【面试】简述 postStart 与 preStop 两种生命周期钩子的触发时机与作用。

### 59. 【面试】什么是 Init 容器？它与主容器在生命周期上有何区别？

### 60. 【面试】什么是临时容器（Ephemeral Containers）？它的典型用途与限制是什么？

### 61. 【面试】解释 Pod 中 resources 的 requests 与 limits 的含义及二者关系。

### 62. 【面试】Kubernetes 的 QoS 有哪三档？各自的判定规则是什么？当节点发生 OOM 时删除顺序如何？

### 63. 【面试】Pod 被删除时的“体面终止（graceful termination）”流程是怎样的？preStop 钩子起什么作用？

### 64. 【面试】什么是 hostNetwork？使用它有什么注意事项？单节点多容器模式有哪些常见实现？
