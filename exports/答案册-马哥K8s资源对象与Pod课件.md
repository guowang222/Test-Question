# 马哥K8s资源对象与Pod课件 —— 答案与解析

> 共 64 题，编号与《试题册-马哥K8s资源对象与Pod课件.md》一致。


## K8s Pod笔试

### 1. 【资源对象】下列 Kubernetes 资源中属于“集群级资源”（不受名称空间约束、名称需在集群内全局唯一）的是？

**答案**

**C**　Namespace

**解析**

Namespace、Node、ClusterRole、PersistentVolume 等是集群级资源；Pod、Service、ConfigMap 属于名称空间级别资源。【衍生知识点】kube-system 等系统级名称空间默认不可删除。

---

### 2. 【资源对象】关于 Kubernetes 的内置 API 资源与自定义 API 资源，下列说法正确的是？

**答案**

**B**　Label 和 emptyDir 等没有独立 API 资源，需依附其它资源存在

**解析**

有些资源（如 Label、emptyDir）在 K8s 中并没有提供独立 API 资源类型，必须依附其它资源存在；CRD 即自定义 API 资源。

---

### 3. 【API】关于 Kubernetes 的 API 群组，下列说法正确的是？

**答案**

**B**　命名群组的 REST 路径为 /apis/$GROUP_NAME/$VERSION

**解析**

核心群组（如 v1）引用时无需路径，REST 路径为 /api/v1；命名群组路径为 /apis/组/版本，例如 /apis/apps/v1。

---

### 4. 【API】在资源配置清单的 apiVersion 字段中，核心群组（core group）可省略路径，下列属于核心群组引用写法的是？

**答案**

**B**　v1

**解析**

核心群组（Pod、Service、Namespace 等）的 apiVersion 为 v1，REST 路径为 /api/v1；其余带组名的均为命名群组。

---

### 5. 【API】kubeadm 部署的集群默认只支持 HTTPS 访问 API Server，为方便在本地用 HTTP 访问，可启动本地代理的命令是？

**答案**

**A**　kubectl proxy

**解析**

kubectl proxy 会在本地主机启动一个代理网关，使其支持使用 HTTP 与 API Server 通信；默认监听 127.0.0.1:8001。

---

### 6. 【API】要直接访问 default 名称空间下名为 mypod 的 Pod 对应的 REST 资源（核心群组），正确的路径是？

**答案**

**B**　/api/v1/namespaces/default/pods/mypod

**解析**

核心群组 Pod 的路径格式为 /api/v1/namespaces/<NS>/pods/<NAME>；命名群组才是 /apis/<GROUP>/<VERSION>/...。

---

### 7. 【API】Kubernetes API 设计原则的第一条是：所有 API 应该是？

**答案**

**B**　声明式（Declarative）

**解析**

K8s 的 API 设计原则要求所有 API 都应是声明式的，对象是名词性质的（如 Service、Volume），利于系统隐藏实现细节与重复操作稳定。

---

### 8. 【资源对象】下列资源中属于“元数据类型资源”（根据指标进行操作，如 HPA）的是？

**答案**

**B**　HPA

**解析**

元数据类型资源依据指标操作，典型有 HPA、PodTemplate、LimitRange；Pod/Deployment/Service 属于工作负载或服务发现类。

---

### 9. 【清单】关于资源配置清单的五个一级字段，下列说法正确的是？

**答案**

**C**　metadata 提供名称、名称空间、标签等元数据

**解析**

spec 是用户定义的期望状态；status 由系统维护、只读；ConfigMap、Secret、Endpoints 等数据类资源没有 spec/status 字段。

---

### 10. 【清单】使用 kubectl explain 查看 Pod 资源中 containers.imagePullPolicy 字段的帮助，正确的命令是？

**答案**

**A**　kubectl explain pod.spec.containers.imagePullPolicy

**解析**

kubectl explain 可逐级查看字段含义与数据类型，例如 kubectl explain pod.spec.containers.imagePullPolicy；也可用 --api-version 指定版本。

---

### 11. 【清单】关于 YAML 格式，下列说法错误的是？

**答案**

**C**　缩进允许使用 Tab 键

**解析**

YAML 缩进只允许使用空格，不允许使用 Tab 键；相同层级的元素左侧对齐即可，缩进空格数不重要。

---

### 12. 【清单】Kubernetes 资源配置清单中，字段名与字段值在命名风格上的约定是？

**答案**

**B**　字段名小驼峰、字段值大驼峰

**解析**

字段名一般采用小驼峰（如 imagePullPolicy、terminationGracePeriodSeconds），字段值一般采用大驼峰（如 Always、IfNotPresent）。

---

### 13. 【清单】metadata 字段中，属于“必选字段”（用户必须提供）的是？

**答案**

**C**　name

**解析**

metadata 必选字段包括 name（同名称空间内同类型唯一）、namespace（默认 default）、uid（系统自动生成）；labels/annotations/resourceVersion 等为可选。

---

### 14. 【清单】将已有 Pod 导出为 YAML 模板文件以便修改，正确的命令是？

**答案**

**A**　kubectl get pods pod-test1 -o yaml > pod-test1.yaml

**解析**

使用 kubectl get TYPE NAME -o yaml/json 可导出资源配置清单；--export 选项在 1.19 之后已被移除。

---

### 15. 【管理】kubectl 的“声明式对象配置（declarative object configuration）”使用的典型命令是？

**答案**

**C**　kubectl apply

**解析**

声明式对象配置通过 kubectl apply/patch 等完成，有幂等性并将配置保存于注解中，生产环境推荐使用。

---

### 16. 【管理】关于 kubectl 三种资源管理方式，下列说法错误的是？

**答案**

**D**　指令式对象配置具有幂等性，生产推荐

**解析**

指令式对象配置（create/replace）直接替换活动对象，没有幂等性，重复执行可能出错，生产不推荐使用。

---

### 17. 【dry-run】利用 dry-run 模拟运行命令生成清单文件时，生产可用且推荐的写法是？

**答案**

**B**　--dry-run=client -o yaml

**解析**

--dry-run=client 在客户端模拟并生成清单，不连接 API Server，新版推荐；--dry-run=server 需服务端校验。

---

### 18. 【Namespace】下列名称空间中，默认由 Kubernetes 创建且属于“系统级名称空间”（不可删除）的是？

**答案**

**A**　default

**解析**

系统级名称空间 default、kube-system、kube-public、kube-node-lease 均由集群默认创建，均不能删除（即使删除也会重建）。

---

### 19. 【Namespace】关于 kube-node-lease 名称空间，下列说法错误的是？

**答案**

**D**　它属于用户自定义名称空间

**解析**

kube-node-lease 是系统级名称空间，用于节点心跳等节点租约，并非用户自定义名称空间。

---

### 20. 【Namespace】在 Kubernetes 中删除一个名称空间（Namespace）会产生什么后果？

**答案**

**B**　会级联删除该名称空间下的所有资源，非常危险

**解析**

删除 Namespace 会级联删除其包含的所有其它资源对象，因此操作非常危险；kubectl delete all --all 会删全部。

---

### 21. 【Pod】关于 Pod 中的 pause 容器（基础设施容器 / infra 容器），下列说法错误的是？

**答案**

**C**　PID、Mount、User 名称空间默认全部共享

**解析**

pause 容器持有 Network、IPC、UTS 及 Volumes 共享；Mount 和 User 名称空间默认不共享（每个容器独立），PID 需显式定义才共享。

---

### 22. 【Pod】同一 Pod 内的多个容器默认共享的资源不包括下列哪项？

**答案**

**D**　User 用户（实际各自独立不共享）

**解析**

Pod 内容器共享 Network、IPC、UTS 名称空间与存储卷；User 与 Mount 名称空间默认各自独立，不共享。

---

### 23. 【Pod】关于 Pod 的组成形式，下列说法正确的是？

**答案**

**B**　多容器 Pod 除 pause 外一般由主容器和辅助容器（如 sidecar）构成

**解析**

Pod 可分为单容器 Pod 与多容器 Pod；多容器 Pod 由主容器加辅助容器（sidecar 等）构成，且共享 pause 的网络与存储。

---

### 24. 【Pod】使用 kubectl run 创建自主式 Pod 时，若希望容器进程退出后不被重启，应加的参数是？

**答案**

**C**　--restart=Never

**解析**

--restart=Never 表示 Pod 终止后 kubelet 不会重启；--rm 表示退出即删除容器（交互临时用）。

---

### 25. 【Pod】关于静态 Pod（static Pod），下列说法错误的是？

**答案**

**C**　可以通过 kubectl delete 直接删除

**解析**

静态 Pod 不能由 kubectl delete 删除（删除后会由 kubelet 自动重建），必须删除节点上的清单文件才会真正消失。

---

### 26. 【Pod】kubeadm 部署的集群中，控制平面组件（etcd、kube-apiserver、kube-controller-manager、kube-scheduler）对应的 Pod 属于？

**答案**

**B**　静态 Pod

**解析**

控制平面组件均以静态 Pod 形式运行，由 kubelet 根据 /etc/kubernetes/manifests 下的清单创建与管理。

---

### 27. 【清单】关于 Pod 清单中 spec.containers 的 command 与 args 字段，下列说法错误的是？

**答案**

**D**　只设置 command 时会把镜像默认的参数一起保留

**解析**

只设置 command 会完全替换 ENTRYPOINT，镜像原有参数被丢弃；只设置 args 则配合原 ENTRYPOINT 使用。

---

### 28. 【清单】在 spec.containers[].args 中引用环境变量，正确的格式是？

**答案**

**B**　$(VAR_NAME)

**解析**

args 中使用环境变量需采用 $(环境变量名) 的格式，例如 $(PORT)；env 中赋值时直接使用变量名。

---

### 29. 【Pod】关于 Pod 的 spec.hostNetwork 字段，下列说法错误的是？

**答案**

**D**　设为 true 时 Pod 的 IP 与宿主机不同

**解析**

hostNetwork=true 时 Pod 直接使用宿主机网络地址，Pod IP 与宿主机 IP 相同，且同主机无法再启相同副本（端口冲突）。

---

### 30. 【清单】Pod 容器端口定义中 spec.containers[].ports[].protocol 的默认协议是？

**答案**

**B**　TCP

**解析**

端口协议默认值为 TCP，也支持 UDP；containerPort 为容器监听端口，hostPort 为宿主机映射端口。

---

### 31. 【清单】Pod 的 spec.restartPolicy（重启策略）默认值是？

**答案**

**C**　Always

**解析**

restartPolicy 默认 Always（只要退出就重启），可选 OnFailure、Never；同一 Pod 内所有容器共用同一重启策略。

---

### 32. 【探针】关于临时容器（Ephemeral Containers），下列说法错误的是？

**答案**

**B**　可用于构建应用程序并具备端口和健康探针

**解析**

临时容器缺少资源保证、永不自动重启，且不允许 ports、livenessProbe、readinessProbe、resources 等字段，不适合构建应用。

---

### 33. 【探针】向一个正在运行的 Pod 添加临时容器进行调试，使用的命令是？

**答案**

**B**　kubectl debug

**解析**

kubectl debug 可在已有 Pod 中添加临时容器（需开启 EphemeralContainers 特性），例如 kubectl debug mypod -it --image=busybox。

---

### 34. 【探针】关于临时容器的创建方式，下列说法正确的是？

**答案**

**B**　使用 API 中特殊的 ephemeralContainers 处理器创建

**解析**

临时容器通过 API 的 ephemeralContainers 处理器创建，不在 pod.spec 中，也无法用 kubectl edit 添加，且不允许端口/探针。

---

### 35. 【状态】Pod 的 phase（相位）共有五种状态，下列不包含在内的是？

**答案**

**D**　Stopped

**解析**

Pod 的五个 phase 为 Pending、Running、Succeeded、Failed、Unknown；Stopped 不是合法相位。

---

### 36. 【Pod】容器镜像拉取策略 imagePullPolicy 的默认值规则是？

**答案**

**D**　取决于镜像 tag：tag 为 latest 时为 Always，否则为 IfNotPresent

**解析**

imagePullPolicy 默认：若镜像 tag 为 latest 则为 Always，否则默认 IfNotPresent；三种取值为 Always/Never/IfNotPresent。

---

### 37. 【探针】Pod 探针的三种常见实现方式是？

**答案**

**A**　Exec、HTTPGet、tcpSocket

**解析**

三种实现方式为 Exec（执行命令看退出码）、HTTPGet（HTTP 状态码 2xx/3xx 为成功）、tcpSocket（端口可连通为成功）；liveness/readiness/startup 是探针类型而非实现方式。

---

### 38. 【QoS】关于 QoS 等级 Guaranteed（保证），下列说法正确的是？

**答案**

**B**　Pod 内每个容器同时设置 CPU 和内存的 requests 与 limits，且对应值相等

**解析**

Guaranteed 要求每个容器同时设置 CPU 与内存的 requests 和 limits 且两者相等（oom_score_adj 为 -997）；Burstable 为至少一个容器设置且不等；BestEffort 为全不设置。

---

### 39. 【Pod】每个 Pod 都会包含一个名为______的“基础设施容器”（也叫 infra 容器），同一 Pod 内的业务容器共享它的网络栈与存储卷。

**答案**

- 第 1 空：pause / Pause / 基础设施容器 / infra容器 / infra

**解析**

pause 容器是 Pod 的父容器，负责持有网络命名空间、IPC、UTS 及共享存储卷，业务容器都从它 fork 出来并共享这些资源。【衍生知识点】Pod 的 IP 就是 pause 容器的地址。

---

### 40. 【Pod】同一 Pod 内的容器默认共享 Network、IPC、UTS 名称空间与存储卷，但______和______名称空间是每个容器各自独立、默认不共享的。

**答案**

- 第 1 空：Mount / mount / 挂载
- 第 2 空：User / user / 用户

**解析**

pause 容器共享的是 Network/IPC/UTS 以及 Volumes；Mount（文件系统挂载）和 User（用户）名称空间默认不共享，每个容器独立；PID 需显式定义才会共享。

---

### 41. 【探针】探针的探测参数中，periodSeconds（探测周期）默认为______秒，timeoutSeconds（探测超时）默认为______秒。

**答案**

- 第 1 空：10 / 十 / 10s
- 第 2 空：1 / 一 / 1s

**解析**

periodSeconds 默认 10 秒，timeoutSeconds 默认 1 秒，initialDelaySeconds 默认 0 秒，failureThreshold 默认 3 次，successThreshold 默认 1 次。

---

### 42. 【探针】在三种探针中，______和______的 successThreshold（连续成功次数）只能为 1，不能为其它值。

**答案**

- 第 1 空：livenessProbe / 存活探针 / liveness
- 第 2 空：startupProbe / 启动探针 / startup

**解析**

livenessProbe 与 startupProbe 的 successThreshold 固定只能为 1；readinessProbe 的 successThreshold 默认也为 1 但可配置。【衍生知识点】startupProbe 成功前会禁用 liveness/readiness 探针。

---

### 43. 【状态】Pod 因容器启动后反复异常退出、重启次数过多而进入的等待/异常状态是______；若镜像因 imagePullPolicy=Never 且本地不存在导致拉取失败，Pod 会显示为______状态。

**答案**

- 第 1 空：CrashLoopBackOff
- 第 2 空：ErrImageNeverPull / ErrImageNeverPull

**解析**

CrashLoopBackOff 表示退避算法下重启次数过多致异常终止；ErrImageNeverPull 表示被 Never 策略禁止拉取（仓库权限或私有导致）。【衍生知识点】其它常见错误状态还有 ImagePullBackOff、ErrImagePull、ContainerCreating 等。

---

### 44. 【生命周期】Pod 被删除时，kubelet 触发容器发送 TERM 信号之前的“体面终止宽限期”由字段______控制，其默认值为______秒。

**答案**

- 第 1 空：terminationGracePeriodSeconds
- 第 2 空：30 / 三十

**解析**

spec.terminationGracePeriodSeconds 默认 30 秒；若 preStop 钩子耗时超过该值需调大，否则强制 SIGKILL。【衍生知识点】强制删除可用 kubectl delete pod --grace-period=0 --force。

---

### 45. 【QoS】当 Pod 内每个容器都同时设置了 CPU 和内存的 requests 与 limits 且二者相等时，其 QoS 等级为______；当所有容器都未设置 requests 和 limits 时，QoS 等级为______。

**答案**

- 第 1 空：Guaranteed / 保证
- 第 2 空：BestEffort / 尽力而为 / 低优先级

**解析**

Guaranteed（oom_score_adj=-997）> Burstable（-999~2）> BestEffort（1000）；节点 OOM 时优先驱逐 BestEffort，最后才是 Guaranteed。【衍生知识点】Burstable 要求至少一个容器设置了 requests/limits 且不相等。

---

### 46. 【钩子】生命周期钩子 postStart 在容器______后立即运行，而 preStop 在容器______之前立即运行（并阻塞删除操作直到完成）。

**答案**

- 第 1 空：创建 / 创建完成 / 启动
- 第 2 空：终止 / 被终止 / 删除

**解析**

postStart 在容器创建后立刻执行（不保证先于 ENTRYPOINT）；preStop 在容器被终止前执行，完成前会阻塞容器删除，常用于平滑下线。【衍生知识点】钩子实现方式有 exec 与 httpGet（tcpSocket 已废弃不支持）。

---

### 47. 【资源对象】Kubernetes 资源按适用范围（作用域）可分为名称空间级别、集群级别和______三类。

**答案**

- 第 1 空：元数据类型 / 元数据型 / 元数据

**解析**

名称空间级资源仅在所属 NS 生效（如 Pod、Service）；集群级资源全局可见（如 Namespace、Node、ClusterRole）；元数据类型按指标操作（如 HPA、LimitRange）。

---

### 48. 【清单】资源配置清单的五个一级字段中，______由用户定义对象的期望状态，而______由 Kubernetes 系统自行维护并标记为只读。

**答案**

- 第 1 空：spec / Spec / 规格 / 期望状态
- 第 2 空：status / Status / 状态

**解析**

spec 是用户声明的期望状态（必填）；status 由控制器动态更新、用户不能手动定义，描述对象当前实际状态。【衍生知识点】ConfigMap、Secret 等数据类资源没有 spec/status 字段。

---


## K8s Pod面试

### 49. 【面试】Kubernetes 的资源对象按适用范围分为哪几类？请各举两个例子。

**答案**

分为三类：
1) 名称空间级别（Namespace-scoped）：仅在其所属名称空间内生效，如 Pod、Service、Deployment、ConfigMap。
2) 集群级别（Cluster-scoped）：全局可见、名称需集群唯一，如 Namespace、Node、ClusterRole、PersistentVolume。
3) 元数据类型：依据指标进行操作的资源，如 HPA、PodTemplate、LimitRange。

**解析**

回答要点：先讲三种作用域，再分类举例；强调名称空间级资源随 NS 删除而级联删除，集群级资源不受 NS 约束。

---

### 50. 【面试】简述 Kubernetes 资源配置清单的五个一级字段及其作用。

**答案**

五个一级字段：
1) apiVersion：指定资源所属 API 群组与版本，如 v1、apps/v1。
2) kind：资源类型，如 Pod、Namespace、Deployment。
3) metadata：对象的元数据，如 name、namespace、labels、annotations、uid。
4) spec：用户定义的期望状态（必填），不同资源差异很大。
5) status：系统维护的当前实际状态，对用户只读。
其中 apiVersion/kind/metadata 大同小异，spec 因资源而异，status 由控制器动态更新。

**解析**

回答要点：能区分 spec（期望）与 status（实际、只读）；说明 ConfigMap/Secret 等无 spec/status。

---

### 51. 【面试】kubectl 管理资源有哪三种方式？各自的典型命令与幂等性如何？

**答案**

三类：
1) 指令式命令（imperative command）：kubectl run/expose/get/delete，适合一次性操作。
2) 指令式对象配置（imperative object configuration）：kubectl create/replace/delete/edit，基于清单文件，直接替换活动对象，无幂等性，生产不推荐。
3) 声明式对象配置（declarative object config）：kubectl apply/patch，配置保存于注解中并对比三方差异做补丁式更新，有幂等性，生产推荐。

**解析**

回答要点：强调声明式幂等、命令式配置无幂等；apply 通过 last-applied-configuration 注解实现增量更新。

---

### 52. 【面试】什么是 pause 容器？它在 Pod 中承担什么作用？

**答案**

pause 容器（infra 容器）是每个 Pod 启动的第一个容器，作为其它业务容器的父容器。作用：
1) 持有并维护 Pod 的网络命名空间，使 Pod IP 在生命周期内保持稳定；
2) 持有 IPC/UTS 等命名空间，使同 Pod 容器共享网络、IPC、UTS 与存储卷；
3) 其生命周期与 Pod 绑定，pause 终止则整个 Pod 终止；
4) 资源占用极低，兼容各种 CNI 插件。

**解析**

回答要点：强调 pause 是网络/命名空间的持有者，业务容器共享其环境，Pod IP 即 pause 地址。

---

### 53. 【面试】同一个 Pod 内的多个容器共享哪些名称空间？哪些默认不共享？

**答案**

共享：Network（网络栈与端口范围）、IPC（SystemV/POSIX 通信）、UTS（主机名/域名）以及 Pod 级 Volumes（存储卷）。
默认不共享：Mount（文件系统挂载）、User（用户身份）；PID 名称空间默认隔离，但可通过 shareProcessNamespace 显式开启共享。

**解析**

回答要点：区分共享与隔离，指出 PID 需显式开启；容器间可通过 localhost 直接通信。

---

### 54. 【面试】自主式 Pod、控制器管理的 Pod 和静态 Pod 三者有何区别？

**答案**

1) 自主式 Pod：用户直接用 kubectl/清单创建，不受控制器管理，节点故障后不会自愈调度。
2) 控制器管理的 Pod（如 Deployment/RS 创建）：由 Workload Controller 管控，节点故障后具备自愈、自动重新调度能力。
3) 静态 Pod：由节点 kubelet 依据 /etc/kubernetes/manifests 或 --manifest-url 创建，API Server 只能查看不能管理，删除会自动重建；kubeadm 控制平面组件即静态 Pod。

**解析**

回答要点：从“谁管理、能否自愈、能否被 kubectl 删除”三个维度对比。

---

### 55. 【面试】简述 Pod 的生命周期及主要的 phase（相位）含义。

**答案**

Pod 被创建后赋予 UID 并调度到节点运行，直至因重启策略终止或删除。五个 phase：
1) Pending：已被集群接受，但容器镜像尚未创建/下载完成。
2) Running：已绑定节点且所有容器已创建，至少一个在运行或重启中。
3) Succeeded：全部容器成功终止且不再重启。
4) Failed：全部容器终止且至少一个异常终止（非0退出或被系统终止）。
5) Unknown：无法获取状态，通常因节点通信故障。

**解析**

回答要点：补充容器状态 Waiting/Running/Terminated，以及常见错误状态如 CrashLoopBackOff、ImagePullBackOff。

---

### 56. 【面试】Kubernetes 有哪三种探针（Probe）？各自作用是什么？

**答案**

1) startupProbe（启动探针，1.16 引入）：探测应用是否启动完成，成功后才会启用 liveness/readiness；用于启动慢的应用，失败则杀容器按重启策略处理。
2) livenessProbe（存活探针）：周期性判断容器是否还活着，失败则 kubelet 杀掉容器并按重启策略重启。
3) readinessProbe（就绪探针）：判断容器能否对外服务，失败则从 Service 后端端点移除，但 Pod 仍显示 Running、READY 为 0/1。

**解析**

回答要点：三者默认状态均为 Success；startup 成功前禁用另两者；就绪失败不重启但摘除流量。

---

### 57. 【面试】探针有哪三种实现方式？简述其判定成功的条件。

**答案**

1) Exec：在容器内执行命令，命令退出码为 0 表示成功，非0失败。
2) HTTPGet：向容器指定 path/port 发起 HTTP(S) 请求，响应码为 2xx 或 3xx 视为成功。
3) tcpSocket：尝试与容器指定端口建立 TCP 连接，能打开即成功。
（此外还有 gRPC 探针，属 Alpha 特性。）判定参数含 initialDelaySeconds、periodSeconds、timeoutSeconds、successThreshold、failureThreshold。

**解析**

回答要点：区分“实现方式”与“探针类型”；说明各方式成功判据及默认参数（period 10s、timeout 1s）。

---

### 58. 【面试】简述 postStart 与 preStop 两种生命周期钩子的触发时机与作用。

**答案**

postStart：容器创建完成后立即运行，不保证先于容器 ENTRYPOINT；若失败容器按重启策略终止重启，常用于初始化。
preStop：容器被终止前立即运行，在其完成前阻塞删除容器；常用于释放资源、平滑下线（如先 sleep 再发 SIGTERM）。
两者均可由 exec 或 httpGet 实现（tcpSocket 已废弃）。

**解析**

回答要点：postStart 启动后、preStop 终止前；preStop 与 terminationGracePeriodSeconds 配合保证优雅退出。

---

### 59. 【面试】什么是 Init 容器？它与主容器在生命周期上有何区别？

**答案**

Init 容器在 Pod 初始化阶段、主容器启动前运行，用于为主容器准备运行环境（如下载资源、写配置、等待依赖服务）。特点：
1) 多个 Init 容器必须串行、按顺序执行，全部成功后才启动主容器；
2) 不支持探针检测；
3) k8s 1.28 起可为 Init 容器设 restartPolicy=Always 使其成为伴随主容器的 sidecar。
主容器则在 Init 全部完成后并行运行。

**解析**

回答要点：Init 串行先于主容器、不支持探针；失败会阻塞主容器启动（状态 PodInitializing）。

---

### 60. 【面试】什么是临时容器（Ephemeral Containers）？它的典型用途与限制是什么？

**答案**

临时容器是向已运行 Pod 临时添加、用于交互式故障排查的容器（1.16 引入、1.25 稳定）。用途：当容器崩溃或无 shell（如 distroless 镜像）导致 kubectl exec 失效时，添加含调试工具的临时容器。限制：缺少资源保证、永不自动重启；不允许 ports、livenessProbe、readinessProbe、resources 等字段；通过特殊 ephemeralContainers 处理器（非 pod.spec）创建，无法 kubectl edit 添加；使用 kubectl debug 命令。

**解析**

回答要点：排查用途 + 限制（不能构建应用、无端口/探针）；与常规容器相比不可变更删除。

---

### 61. 【面试】解释 Pod 中 resources 的 requests 与 limits 的含义及二者关系。

**答案**

requests（资源需求）：容器运行时必须保有的最小资源量，调度器据此挑选满足总量需求的节点，未使用时也不能分配给他人。
limits（资源限制）：容器允许使用的最大资源上限，超出通常受限或被重启。
关系：limits 必须 ≥ requests；CPU 为可压缩资源（超 requests 可被回收），内存为不可压缩资源（超限可能 OOMKilled）；生产建议二者设为相同值。

**解析**

回答要点：requests 影响调度、limits 不影响调度；内存超 limits 会 OOMKilled；CPU 单位 m（1000m=1核），内存单位 Mi/Gi。

---

### 62. 【面试】Kubernetes 的 QoS 有哪三档？各自的判定规则是什么？当节点发生 OOM 时删除顺序如何？

**答案**

三档：
1) Guaranteed：Pod 内每个容器同时设置 CPU 与内存的 requests 和 limits 且值相等（oom_score_adj=-997）。
2) Burstable：至少一个容器设置了 requests/limits 且二者不相等（oom_score_adj 2~999）。
3) BestEffort：所有容器均未设置 requests 和 limits（oom_score_adj=1000）。
节点 OOM 时驱逐顺序：优先删 BestEffort，其次 Burstable，最后 Guaranteed。

**解析**

回答要点：判定规则是核心；强调 Guaranteed 需“每容器、CPU 与内存都设且相等”。

---

### 63. 【面试】Pod 被删除时的“体面终止（graceful termination）”流程是怎样的？preStop 钩子起什么作用？

**答案**

流程：
1) API Server 将 Pod 标记为 Terminating 并设宽限期（默认 30s）。
2) Endpoints Controller 将 Pod IP 从端点列表移除，停止接收新流量。
3) 若定义了 preStop 钩子，kubelet 先执行它（完成前阻塞删除）。
4) kubelet 向容器进程发 TERM 信号；preStop 耗时若超宽限期会额外加 2s。
5) 超宽限期仍不终止则发 SIGKILL 强制删除。
preStop 用于平滑下线（如等待连接排空），其执行时间若超过 terminationGracePeriodSeconds 需调大该值。

**解析**

回答要点：终止顺序、端点摘除、preStop 阻塞、TERM→SIGKILL；联系优雅停机。

---

### 64. 【面试】什么是 hostNetwork？使用它有什么注意事项？单节点多容器模式有哪些常见实现？

**答案**

hostNetwork：spec.hostNetwork=true 时 Pod 直接使用宿主机网络地址（IP 与宿主机相同），不走 docker 网桥。注意：同主机无法启动该 Pod 的第二个副本（端口冲突）；需避免端口冲突；安全性下降。
单节点多容器（一个 Pod 内多容器）模式常见实现：
1) Init Container 模式（初始化）；
2) Sidecar 模式（边车，如 Envoy 代理、filebeat 日志收集）；
3) Ambassador 模式（大使，代表主容器发外部请求）；
4) Adapter 模式（适配器，对外提供一致接口，如 exporter）。

**解析**

回答要点：hostNetwork 共享宿主机网络；设计模式四类中除 Init 外都可统称 Sidecar。

---
