# 马哥K8s安全机制课件 —— 试题册

> 共 73 题。答案与解析见《答案册-马哥K8s安全机制课件.md》。


## K8s安全机制笔试

### 1. 【安全体系】客户端访问 Kubernetes API Server 时，必须依次经过的三个安全控制阶段是？

- **A.** 认证(Authentication) -> 授权(Authorization) -> 准入控制(Admission Control)
- **B.** 授权 -> 认证 -> 准入控制
- **C.** 准入控制 -> 认证 -> 授权
- **D.** 认证 -> 准入控制 -> 授权

### 2. 【安全体系】关于认证(Authentication)阶段的描述，正确的是？

- **A.** 任一认证插件核验成功后即停止后续插件验证（短路模式）
- **B.** 必须所有插件都成功才算通过
- **C.** 任一插件失败即立即拒绝请求
- **D.** 匿名用户总是被优先放行

### 3. 【准入】关于准入控制(Admission Control)阶段的逻辑，正确的是？

- **A.** 遵循或逻辑，任一插件通过即可
- **B.** 遵循与逻辑，所有插件均须通过，执行一票否决制
- **C.** 同样采用短路模式
- **D.** 只对读操作做校验

### 4. 【用户】关于 Kubernetes 中的 User Account（普通用户），正确的是？

- **A.** 它是 API Server 管理的命名空间级资源类型
- **B.** 由集群外部系统（如证书/用户数据库）管理，无法通过 API 调用创建
- **C.** 专供 Pod 内进程访问 API Server 使用
- **D.** 每个命名空间会自动创建一个 default 的 User Account

### 5. 【SA】Service Account 主要用于以下哪种场景？

- **A.** 人类用户通过 kubectl 交互式登录
- **B.** Pod 中运行的进程访问 API Server 时使用的身份
- **C.** 节点操作系统的登录账号
- **D.** 集群外部的独立运维系统

### 6. 【SA】所有 Pod 默认使用的 Service Account 是？

- **A.** kube-system 命名空间下的 admin
- **B.** 所在命名空间的 default Service Account
- **C.** 集群级的 cluster-admin
- **D.** 不挂载任何 Service Account

### 7. 【认证】在 X509 客户端证书认证中，证书 subject 的哪个字段被 Kubernetes 识别为用户名？

- **A.** O（Organization）
- **B.** CN（Common Name）
- **C.** UID
- **D.** groups

### 8. 【用户】User Account 与 Service Account 的本质区别是？

- **A.** UA 是集群内 Pod 使用，SA 是人类使用
- **B.** UA 由外部系统管理、无对应 API 资源；SA 是 API 资源、隶属命名空间，但可被授予集群级权限
- **C.** 两者都由 Kubernetes API 统一管理
- **D.** 两者都由集群外部身份提供商管理

### 9. 【用户组】用户通过任一认证插件成功认证后，会自动加入以下哪个内置组？

- **A.** system:unauthenticated
- **B.** system:authenticated
- **C.** system:serviceaccounts
- **D.** system:masters

### 10. 【用户组】未能通过任何一个认证插件检验的请求，统一隶属于哪个内置组？

- **A.** system:authenticated
- **B.** system:unauthenticated
- **C.** system:serviceaccounts
- **D.** system:masters

### 11. 【认证】X509 客户端证书认证中，API Server 通过以下哪个选项指定其信任的客户端 CA？

- **A.** --tls-cert-file
- **B.** --client-ca-file
- **C.** --token-auth-file
- **D.** --service-account-key-file

### 12. 【认证】kubeadm 部署的集群默认启用的认证机制中，不包括以下哪项？

- **A.** X509 客户端证书认证
- **B.** Bootstrap 令牌认证
- **C.** Service Account 令牌认证
- **D.** OpenID Connect（OIDC）令牌认证

### 13. 【认证】Kubernetes 的令牌（Token）认证方式包含以下哪些？

- **A.** Service Account 令牌、静态令牌文件、Bootstrap 令牌
- **B.** 仅 Service Account 令牌
- **C.** 仅静态令牌文件
- **D.** 以上全部（含 OIDC、Webhook 令牌等）

### 14. 【认证】关于多种认证插件并存时的关系，正确的是？

- **A.** 所有插件必须都成功请求才能通过
- **B.** 只要任一插件认证成功即视为通过（或关系）
- **C.** 插件生效顺序与配置文件定义完全一致
- **D.** 仅最后一个插件生效

### 15. 【认证】基于 openssl 创建 X509 客户端私钥文件，应使用以下哪个命令？

- **A.** openssl req -new
- **B.** openssl genrsa
- **C.** openssl x509 -req
- **D.** openssl ca

### 16. 【认证】使用 Kubernetes CA 为证书签名请求(CSR)签发客户端证书，关键命令是？

- **A.** openssl req -new -key
- **B.** openssl x509 -req -CA ca.crt -CAkey ca.key
- **C.** openssl genrsa
- **D.** openssl verify

### 17. 【认证】创建具有集群管理员权限的 X509 客户端证书（新版 v1.32+），subject 应加入哪个组？

- **A.** ops
- **B.** kubeadm:cluster-admins
- **C.** dev
- **D.** system:authenticated

### 18. 【认证】基于 Kubernetes API 资源（CertificateSigningRequest）签发用户证书时，管理员批准 CSR 使用的命令是？

- **A.** kubectl certificate approve <name>
- **B.** kubectl cert accept <name>
- **C.** kubectl csr approve <name>
- **D.** kubectl approve csr <name>

### 19. 【认证】静态令牌认证文件中，每行定义用户采用的字段格式是？

- **A.** token,user,uid,group（group 可选）
- **B.** user,token,group,uid
- **C.** group,user,uid,token
- **D.** token,uid,user

### 20. 【认证】客户端使用静态令牌访问 API Server 时，应在 HTTP 请求头中如何携带令牌？

- **A.** Authorization: Bearer TOKEN
- **B.** Authorization: Token TOKEN
- **C.** X-Token: TOKEN
- **D.** Bearer: TOKEN

### 21. 【认证】关于静态令牌文件生效方式，正确的是？

- **A.** 配置后内容变更会自动热加载
- **B.** 加载完成后若文件内容变动，需重启 kube-apiserver 才能重载
- **C.** 每次请求都重新读取文件
- **D.** 无需重启，永久有效

### 22. 【kubeconfig】kubeconfig 文件的核心结构由以下哪三部分（外加 current-context）组成？

- **A.** clusters、users、contexts
- **B.** cluster、user、context
- **C.** clusters、contexts、current-context
- **D.** clusters、users、tokens

### 23. 【kubeconfig】kubeconfig 中的 current-context 字段的作用是？

- **A.** 定义集群列表
- **B.** 定义用户凭据列表
- **C.** 指定当前默认使用的上下文(context)
- **D.** 存储 API Server 密码

### 24. 【kubeconfig】当存在多个 kubeconfig 来源时，kubectl 加载优先级从高到低依次是？

- **A.** --kubeconfig 参数 > KUBECONFIG 环境变量 > $HOME/.kube/config
- **B.** KUBECONFIG 环境变量 > --kubeconfig 参数 > 默认路径
- **C.** $HOME/.kube/config > KUBECONFIG > --kubeconfig
- **D.** 三者优先级相同，后者覆盖前者

### 25. 【kubeconfig】kubeconfig 文件中 kind: Config 的含义是？

- **A.** 表示 Kubernetes 中的 Config 资源类型
- **B.** 仅表示 kubeconfig 文件的格式规范（客户端配置范畴），并非 API 资源
- **C.** 表示 Secret 资源
- **D.** 表示集群资源

### 26. 【kubeconfig】在命令式创建 kubeconfig 的过程中，建立 user 与 cluster 关联关系（生成上下文）使用的子命令是？

- **A.** kubectl config set-credentials
- **B.** kubectl config set-cluster
- **C.** kubectl config set-context
- **D.** kubectl config use-context

### 27. 【SA】Kubernetes v1.24 之后创建 Service Account，关于其配套 Secret 的行为是？

- **A.** 会自动创建一个同名的 service-account-token Secret
- **B.** 不再自动生成专用 Secret，需手动创建 Secret 并关联
- **C.** 取决于集群是否启用 RBAC
- **D.** 始终需要管理员手动签发

### 28. 【SA】在 Pod 中指定使用自定义 Service Account，应在 Pod 模板中设置哪个字段？

- **A.** spec.serviceAccountName
- **B.** spec.serviceAccount
- **C.** metadata.serviceAccount
- **D.** spec.sa

### 29. 【认证】在基于 X509 的 User Account 创建流程中，“创建 Kubernetes 用户（写入凭据）”对应的 kubectl config 子命令是？

- **A.** kubectl config set-credentials
- **B.** kubectl config set-cluster
- **C.** kubectl config set-context
- **D.** kubectl config use-context

### 30. 【认证】在 User Account 创建流程中，“关联用户和集群（建立上下文）”对应的 kubectl config 子命令是？

- **A.** kubectl config set-credentials
- **B.** kubectl config set-cluster
- **C.** kubectl config set-context
- **D.** kubectl config view

### 31. 【授权】kubeadm 部署的集群中，kube-apiserver 的 --authorization-mode 默认值为？

- **A.** Node,RBAC
- **B.** AlwaysAllow
- **C.** ABAC
- **D.** Webhook

### 32. 【授权】关于授权(Authorization)阶段的描述，正确的是？

- **A.** 必须所有授权模块都拒绝才拒绝请求
- **B.** 任一授权模块许可即通过（或逻辑，短路）
- **C.** 默认允许所有请求
- **D.** 仅 RBAC 一种模块生效

### 33. 【授权】关于 ABAC（基于属性的访问控制）的特点，正确的是？

- **A.** 是 1.6+ 版本主推的授权策略
- **B.** 策略写在 API Server 本地文件，新增规则需重启 API Server
- **C.** 默认随 kubeadm 启用
- **D.** 支持通过 API 动态管理策略

### 34. 【授权】授权模式 AlwaysAllow 的含义是？

- **A.** 阻止所有请求，仅用于测试
- **B.** 允许所有请求
- **C.** 仅允许匿名用户
- **D.** 仅允许 Node 组件

### 35. 【RBAC】RBAC 中的 Role 的作用范围是？

- **A.** 整个集群（所有命名空间）
- **B.** 其所属的命名空间
- **C.** 单个节点
- **D.** 单个用户

### 36. 【RBAC】ClusterRoleBinding 的作用范围是？

- **A.** 指定的某个命名空间
- **B.** 整个集群中所有命名空间
- **C.** 单个 Pod
- **D.** 单个资源对象

### 37. 【RBAC】当使用 RoleBinding 把 Subject 关联到 ClusterRole 时，该主体实际获得的权限范围是？

- **A.** 升级为整个集群的权限
- **B.** 降级到 RoleBinding 所属命名空间的范围
- **C.** 与原 ClusterRole 完全一致
- **D.** 没有任何权限

### 38. 【RBAC】在 RBAC 四种角色/绑定组合中，以下哪种组合是不支持的？

- **A.** Role + RoleBinding
- **B.** ClusterRole + ClusterRoleBinding
- **C.** Role + ClusterRoleBinding
- **D.** ClusterRole + RoleBinding

### 39. 【RBAC】启用 RBAC 后自动创建的面向用户的默认 ClusterRole 不包括以下哪个？

- **A.** cluster-admin
- **B.** admin
- **C.** edit
- **D.** superuser

### 40. 【RBAC】默认 ClusterRole 中，view 的权限特征是？

- **A.** 可对大多数资源读/写，包括 Secret
- **B.** 只读访问命名空间中大多数对象，但不包括 Role、RoleBinding 和 Secret
- **C.** 集群超级管理员，可执行任意操作
- **D.** 可创建 Role 和 RoleBinding

### 41. 【RBAC】默认 ClusterRole 中，admin 与 cluster-admin 的主要区别是？

- **A.** admin 是集群级，cluster-admin 是命名空间级
- **B.** admin 用于结合 RoleBinding 授予命名空间管理员，但不能操作 ResourceQuota 和 Namespace 自身；cluster-admin 可操作任意资源
- **C.** 两者权限完全一致
- **D.** cluster-admin 不能操作 Secret

### 42. 【RBAC】命令式创建一个名为 pods-viewer、对 pods 具有 get/list/watch 权限的 Role，正确命令是？

- **A.** kubectl create role pods-viewer --verb=get,list,watch --resource=pods
- **B.** kubectl create clusterrole pods-viewer --verb=get,list,watch --resource=pods
- **C.** kubectl create role pods-viewer --resource=pods --verb=all
- **D.** kubectl create rolebinding pods-viewer --clusterrole=pods-viewer

### 43. 【RBAC】将名为 admin 的 ClusterRole 绑定给用户 wang、限定在 test 命名空间，正确命令是？

- **A.** kubectl create rolebinding wang-admin --clusterrole=admin --user=wang -n test
- **B.** kubectl create clusterrolebinding wang-admin --clusterrole=admin --user=wang
- **C.** kubectl create rolebinding wang-admin --role=admin --user=wang
- **D.** kubectl create role wang-admin --clusterrole=admin --user=wang -n test

### 44. 【RBAC】要实现“让某用户对多个指定命名空间（而非全部）具有管理员权限”，推荐的做法是？

- **A.** 为每个命名空间单独创建 Role 与 RoleBinding
- **B.** 创建一个 ClusterRole 配合在每个目标命名空间下创建 RoleBinding（混合绑定）
- **C.** 直接绑定 cluster-admin 的 ClusterRoleBinding
- **D.** 为每个命名空间创建 ClusterRoleBinding

### 45. 【RBAC】关于 SA 与 RoleBinding 的命名空间约束，正确的是？

- **A.** SA 所在命名空间必须等于 RoleBinding 所在命名空间
- **B.** 在命名空间级授权时，ServiceAccount 和 RoleBinding 必须在同一命名空间
- **C.** SA 必须是集群级资源
- **D.** RoleBinding 只能绑定 User，不能绑定 SA

### 46. 【Dashboard】部署 Kubernetes Dashboard 并登录时，通常的做法是？

- **A.** 无需 Service Account，直接用匿名登录
- **B.** 创建专用 Service Account 并绑定 cluster-admin 等 ClusterRole，再用其 token 登录
- **C.** 只能用 X509 客户端证书登录
- **D.** 只能用静态令牌文件登录

### 47. 【准入】kubeadm 部署集群中，kube-apiserver 默认通过以下哪个选项启用准入控制器？

- **A.** --authorization-mode
- **B.** --enable-admission-plugins
- **C.** --admission-control
- **D.** --enable-rbac

### 48. 【安全体系】Kubernetes 对 API Server 的访问必须经过三个安全访问控制步骤：______、______、______。

> 共 3 个空。

### 49. 【用户】Kubernetes 集群中有两类用户：面向现实中的“人”的是 ______，面向 Pod 中运行的进程的是 ______。

> 共 2 个空。

### 50. 【用户组】所有未通过认证测试的请求统一隶属于内置组 ______，而通过认证的用户会自动加入内置组 ______。

> 共 2 个空。

### 51. 【认证】在 X509 客户端证书认证中，证书 subject 的 ______ 字段被识别为用户名，______ 字段被识别为组名。

> 共 2 个空。

### 52. 【认证】使用 openssl 创建 X509 客户端用户证书时，先用 openssl ______ 生成私钥，再用 openssl req -new 生成 ______，最后用 openssl x509 -req 由 CA 签发。

> 共 2 个空。

### 53. 【kubeconfig】kubeconfig 文件由 clusters、users、______ 和 ______ 四部分构成（最后一项指定当前默认上下文）。

> 共 2 个空。

### 54. 【SA】Service Account 的 token 会被挂载到 Pod 内固定路径 ______，该目录下包含 token、ca.crt 和 ______ 三个文件。

> 共 2 个空。

### 55. 【RBAC】启用 RBAC 后，API Server 自动创建的面向用户的默认 ClusterRole 包括 cluster-admin、admin、edit 和 ______。

> 共 1 个空。

### 56. 【RBAC】实现“让某用户仅对多个指定命名空间具有管理员权限”，推荐使用 ______（如 cluster-admin）配合各目标命名空间下的 ______ 进行混合绑定，权限会被降级到对应命名空间。

> 共 2 个空。

### 57. 【准入】kubeadm 集群默认启用的准入控制器中，为没有资源限制的 Pod 添加默认资源限制的叫 ______，限制命名空间资源总量的叫 ______；PodSecurityPolicy 已在 v1.21 被弃用。

> 共 2 个空。


## K8s安全机制面试

### 58. 【面试】请简述 Kubernetes 对 API Server 访问的三层安全控制（认证、授权、准入控制）各自的职责，以及短路模型与一票否决的区别。

### 59. 【面试】User Account 与 Service Account 的本质区别是什么？分别适用于什么场景？

### 60. 【面试】Kubernetes 支持哪些常见的认证方式？并说明多种认证插件并存时的关系。

### 61. 【面试】基于 openssl 命令创建 X509 客户端用户证书（含普通用户与管理员）的完整步骤是什么？

### 62. 【面试】说明基于 Kubernetes CSR API（CertificateSigningRequest 资源）为用户签发客户端证书的流程。

### 63. 【面试】如何配置和使用静态令牌（Static Token）认证？

### 64. 【面试】kubeconfig 文件的结构是什么？kubectl 加载多个 kubeconfig 来源的优先级如何？

### 65. 【面试】描述一个基于 X509 的 User Account 从创建到可经 RBAC 授权的完整流程。

### 66. 【面试】Service Account 如何实现自动化注入？v1.24 前后其 Secret/Token 机制有何变化？

### 67. 【面试】Kubernetes 有哪些授权机制？默认启用哪些？AlwaysAllow/AlwaysDeny/ABAC 各自特点？

### 68. 【面试】RBAC 的四要素是什么？Role 与 ClusterRole、RoleBinding 与 ClusterRoleBinding 的作用范围有何不同？

### 69. 【面试】RBAC 的角色与角色绑定有哪几种组合？重点解释 ClusterRole + RoleBinding 的“权限降级”。

### 70. 【面试】默认面向用户的四个 ClusterRole（cluster-admin、admin、edit、view）权限有何区别？

### 71. 【面试】如何实现一个用户（或 SA）对“多个指定命名空间”具有管理员权限（而非整个集群）？

### 72. 【面试】准入控制（Admission Control）的作用是什么？Mutating 与 Validating 控制器有何区别？列举常见准入控制器。

### 73. 【面试】部署 Kubernetes Dashboard 或 Kuboard 并使用 Service Account Token 登录的做法与注意事项。
