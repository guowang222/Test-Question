# 马哥K8s安全机制课件 —— 答案与解析

> 共 73 题，编号与《试题册-马哥K8s安全机制课件.md》一致。


## K8s安全机制笔试

### 1. 【安全体系】客户端访问 Kubernetes API Server 时，必须依次经过的三个安全控制阶段是？

**答案**

**A**　认证(Authentication) -> 授权(Authorization) -> 准入控制(Admission Control)

**解析**

安全机制分三层：先认证身份，再授权资源操作权限，最后准入控制做写操作合规校验。【衍生知识点】认证失败返回401，授权不足返回403。

---

### 2. 【安全体系】关于认证(Authentication)阶段的描述，正确的是？

**答案**

**A**　任一认证插件核验成功后即停止后续插件验证（短路模式）

**解析**

认证遵循或逻辑且短路：任一插件成功即认证通过，前面的失败才检查下一个，都不成功则以匿名身份访问。

---

### 3. 【准入】关于准入控制(Admission Control)阶段的逻辑，正确的是？

**答案**

**B**　遵循与逻辑，所有插件均须通过，执行一票否决制

**解析**

准入控制遵循与逻辑，每次写操作都要经由所有插件检验、最后统一返回，任一失败即整体拒绝，一票否决。

---

### 4. 【用户】关于 Kubernetes 中的 User Account（普通用户），正确的是？

**答案**

**B**　由集群外部系统（如证书/用户数据库）管理，无法通过 API 调用创建

**解析**

UA 信息保存于外部文件或认证系统，K8s 不提供保存 UA 的资源类型，无法通过 API 添加普通用户。【衍生知识点】与之相对，SA 是 API 资源且隶属命名空间。

---

### 5. 【SA】Service Account 主要用于以下哪种场景？

**答案**

**B**　Pod 中运行的进程访问 API Server 时使用的身份

**解析**

SA 是 Kubernetes 内建、与 Pod 关联的账号，为 Pod 内进程提供访问 API Server 的身份标识。

---

### 6. 【SA】所有 Pod 默认使用的 Service Account 是？

**答案**

**B**　所在命名空间的 default Service Account

**解析**

每个命名空间自动生成一个名为 default 的 SA，并作为该空间下每个 Pod 默认使用的 SA（权限有限）。

---

### 7. 【认证】在 X509 客户端证书认证中，证书 subject 的哪个字段被 Kubernetes 识别为用户名？

**答案**

**B**　CN（Common Name）

**解析**

证书中的 CN 被识别为用户名，O 被识别为组名；例如 /CN=bob 的用户名为 bob，/O=system:masters 加入该组。

---

### 8. 【用户】User Account 与 Service Account 的本质区别是？

**答案**

**B**　UA 由外部系统管理、无对应 API 资源；SA 是 API 资源、隶属命名空间，但可被授予集群级权限

**解析**

UA 是现实中的人，信息存于外部、无 API 资源；SA 通过 API 管理、隶属命名空间，可经 RBAC 授予集群级权限。

---

### 9. 【用户组】用户通过任一认证插件成功认证后，会自动加入以下哪个内置组？

**答案**

**B**　system:authenticated

**解析**

system:authenticated 是认证成功后用户自动加入的专用组，用于快捷引用所有正常通过认证的用户。

---

### 10. 【用户组】未能通过任何一个认证插件检验的请求，统一隶属于哪个内置组？

**答案**

**B**　system:unauthenticated

**解析**

system:unauthenticated 是所有未通过认证测试的用户统一隶属的用户组（匿名用户）。

---

### 11. 【认证】X509 客户端证书认证中，API Server 通过以下哪个选项指定其信任的客户端 CA？

**答案**

**B**　--client-ca-file

**解析**

API Server 用 --client-ca-file 指定 CA（如 /etc/kubernetes/pki/ca.crt），该 CA 颁发的证书对应用户均为合法用户。

---

### 12. 【认证】kubeadm 部署的集群默认启用的认证机制中，不包括以下哪项？

**答案**

**D**　OpenID Connect（OIDC）令牌认证

**解析**

kubeadm 默认启用 X509 客户端证书、Bootstrap 令牌、front-proxy 前端代理、Service Account 令牌；OIDC 需额外配置，并非默认启用。

---

### 13. 【认证】Kubernetes 的令牌（Token）认证方式包含以下哪些？

**答案**

**D**　以上全部（含 OIDC、Webhook 令牌等）

**解析**

令牌认证包括 Service Account 令牌、静态令牌文件、Bootstrap 令牌、OIDC 令牌、Webhook 令牌等，可多种并存。

---

### 14. 【认证】关于多种认证插件并存时的关系，正确的是？

**答案**

**B**　只要任一插件认证成功即视为通过（或关系）

**解析**

K8s 可同时启用多种认证方式，任一成功即通过，即或关系；且 API Server 不保证插件生效顺序与定义相同。

---

### 15. 【认证】基于 openssl 创建 X509 客户端私钥文件，应使用以下哪个命令？

**答案**

**B**　openssl genrsa

**解析**

生成私钥用 openssl genrsa -out xxx.key 4096，再据此生成 CSR，最后用 CA 签发。

---

### 16. 【认证】使用 Kubernetes CA 为证书签名请求(CSR)签发客户端证书，关键命令是？

**答案**

**B**　openssl x509 -req -CA ca.crt -CAkey ca.key

**解析**

用 openssl x509 -req -days 3650 -CA /etc/kubernetes/pki/ca.crt -CAkey ca.key -in xxx.csr -out xxx.crt 签发。

---

### 17. 【认证】创建具有集群管理员权限的 X509 客户端证书（新版 v1.32+），subject 应加入哪个组？

**答案**

**B**　kubeadm:cluster-admins

**解析**

新版使用 /CN=wang/O=kubeadm:cluster-admins；旧版(v1.31 前)用 /O=system:masters，二者均经 cluster-admin 授权为管理员。

---

### 18. 【认证】基于 Kubernetes API 资源（CertificateSigningRequest）签发用户证书时，管理员批准 CSR 使用的命令是？

**答案**

**A**　kubectl certificate approve <name>

**解析**

方法2将 CSR 提交为 CertificateSigningRequest 资源后，用 kubectl certificate approve wang 批准，再获取签发证书。

---

### 19. 【认证】静态令牌认证文件中，每行定义用户采用的字段格式是？

**答案**

**A**　token,user,uid,group（group 可选）

**解析**

静态令牌为 CSV 文本：token,user,uid,group（组为可选字段），由 API Server 通过 --token-auth-file 加载。

---

### 20. 【认证】客户端使用静态令牌访问 API Server 时，应在 HTTP 请求头中如何携带令牌？

**答案**

**A**　Authorization: Bearer TOKEN

**解析**

通过 Authorization: Bearer TOKEN 头附带令牌完成认证；也可在 kubectl 中用 --token=TOKEN。

---

### 21. 【认证】关于静态令牌文件生效方式，正确的是？

**答案**

**B**　加载完成后若文件内容变动，需重启 kube-apiserver 才能重载

**解析**

静态令牌由 API Server 启动时通过 --token-auth-file 加载，文件变更后需重启 API Server 重载。

---

### 22. 【kubeconfig】kubeconfig 文件的核心结构由以下哪三部分（外加 current-context）组成？

**答案**

**A**　clusters、users、contexts

**解析**

kubeconfig 包含 clusters（集群端点）、users（用户凭据）、contexts（user 与 cluster 的关联）以及 current-context（默认上下文）。

---

### 23. 【kubeconfig】kubeconfig 中的 current-context 字段的作用是？

**答案**

**C**　指定当前默认使用的上下文(context)

**解析**

current-context 指明 kubectl 当前默认使用的上下文，即使用哪个 user 访问哪个 cluster。

---

### 24. 【kubeconfig】当存在多个 kubeconfig 来源时，kubectl 加载优先级从高到低依次是？

**答案**

**A**　--kubeconfig 参数 > KUBECONFIG 环境变量 > $HOME/.kube/config

**解析**

优先级：--kubeconfig（仅支持一个文件）最高，其次 KUBECONFIG 环境变量（冒号分隔多文件），再次默认 $HOME/.kube/config。

---

### 25. 【kubeconfig】kubeconfig 文件中 kind: Config 的含义是？

**答案**

**B**　仅表示 kubeconfig 文件的格式规范（客户端配置范畴），并非 API 资源

**解析**

kubeconfig 的 kind: Config 是客户端配置格式标识，不是 Kubernetes API 资源类型。

---

### 26. 【kubeconfig】在命令式创建 kubeconfig 的过程中，建立 user 与 cluster 关联关系（生成上下文）使用的子命令是？

**答案**

**C**　kubectl config set-context

**解析**

set-cluster 定义集群、set-credentials 定义用户、set-context 将二者关联成上下文、use-context 设为默认。

---

### 27. 【SA】Kubernetes v1.24 之后创建 Service Account，关于其配套 Secret 的行为是？

**答案**

**B**　不再自动生成专用 Secret，需手动创建 Secret 并关联

**解析**

v1.24 起不再自动生成专用 Secret，改由 Kubelet 经 TokenRequest API 自动下发短期 token；如需长期 token 需手动建 Secret。

---

### 28. 【SA】在 Pod 中指定使用自定义 Service Account，应在 Pod 模板中设置哪个字段？

**答案**

**A**　spec.serviceAccountName

**解析**

通过 pod.spec.serviceAccountName 指定要使用的特定 SA；未指定则使用所在命名空间的 default SA。

---

### 29. 【认证】在基于 X509 的 User Account 创建流程中，“创建 Kubernetes 用户（写入凭据）”对应的 kubectl config 子命令是？

**答案**

**A**　kubectl config set-credentials

**解析**

创建用户即 set-credentials（关联证书/密钥或 token）；set-cluster 定义集群端点；set-context 关联用户与集群。

---

### 30. 【认证】在 User Account 创建流程中，“关联用户和集群（建立上下文）”对应的 kubectl config 子命令是？

**答案**

**C**　kubectl config set-context

**解析**

set-context 将已定义的 user 与 cluster 绑定为上下文，再 use-context 设为默认当前上下文。

---

### 31. 【授权】kubeadm 部署的集群中，kube-apiserver 的 --authorization-mode 默认值为？

**答案**

**A**　Node,RBAC

**解析**

默认授权模式为 Node,RBAC；ABAC 为 1.6 前使用、当前默认不支持，AlwaysAllow 仅用于无需鉴权的场景。

---

### 32. 【授权】关于授权(Authorization)阶段的描述，正确的是？

**答案**

**B**　任一授权模块许可即通过（或逻辑，短路）

**解析**

授权遵循或逻辑且短路：任一插件许可后即停止后续校验；若都未许可则拒绝。

---

### 33. 【授权】关于 ABAC（基于属性的访问控制）的特点，正确的是？

**答案**

**B**　策略写在 API Server 本地文件，新增规则需重启 API Server

**解析**

ABAC 在 1.6 之前使用，规则写本地文件，修改需重启 apiserver，生产用得少。

---

### 34. 【授权】授权模式 AlwaysAllow 的含义是？

**答案**

**B**　允许所有请求

**解析**

AlwaysAllow 允许所有请求（不需鉴权）；AlwaysDeny 才阻止所有请求用于测试。默认鉴权失败即拒绝。

---

### 35. 【RBAC】RBAC 中的 Role 的作用范围是？

**答案**

**B**　其所属的命名空间

**解析**

Role 是命名空间级，生效范围为其所属命名空间；ClusterRole 才是集群级。

---

### 36. 【RBAC】ClusterRoleBinding 的作用范围是？

**答案**

**B**　整个集群中所有命名空间

**解析**

ClusterRoleBinding 在集群级别绑定，授予主体在整个集群所有命名空间中的 ClusterRole 权限。

---

### 37. 【RBAC】当使用 RoleBinding 把 Subject 关联到 ClusterRole 时，该主体实际获得的权限范围是？

**答案**

**B**　降级到 RoleBinding 所属命名空间的范围

**解析**

ClusterRole+RoleBinding 混合绑定时，权限被降级到 RoleBinding 所在命名空间，即二者交集。

---

### 38. 【RBAC】在 RBAC 四种角色/绑定组合中，以下哪种组合是不支持的？

**答案**

**C**　Role + ClusterRoleBinding

**解析**

Role（命名空间级）无法与 ClusterRoleBinding（集群级）组合；支持的有 Role+RoleBinding、ClusterRole+ClusterRoleBinding、ClusterRole+RoleBinding（混合）。

---

### 39. 【RBAC】启用 RBAC 后自动创建的面向用户的默认 ClusterRole 不包括以下哪个？

**答案**

**D**　superuser

**解析**

面向用户的默认 ClusterRole 为 cluster-admin、admin、edit、view；没有名为 superuser 的默认角色。

---

### 40. 【RBAC】默认 ClusterRole 中，view 的权限特征是？

**答案**

**B**　只读访问命名空间中大多数对象，但不包括 Role、RoleBinding 和 Secret

**解析**

view 以只读方式访问命名空间内大多数对象，但排除 Role、RoleBinding 和 Secret。

---

### 41. 【RBAC】默认 ClusterRole 中，admin 与 cluster-admin 的主要区别是？

**答案**

**B**　admin 用于结合 RoleBinding 授予命名空间管理员，但不能操作 ResourceQuota 和 Namespace 自身；cluster-admin 可操作任意资源

**解析**

admin 经 RoleBinding 给特定命名空间管理员权限（不含 ResourceQuota/Namespace 本身操作）；cluster-admin 经 ClusterRoleBinding 拥有集群任意资源任意操作。

---

### 42. 【RBAC】命令式创建一个名为 pods-viewer、对 pods 具有 get/list/watch 权限的 Role，正确命令是？

**答案**

**A**　kubectl create role pods-viewer --verb=get,list,watch --resource=pods

**解析**

Role 用 kubectl create role NAME --verb=... --resource=资源.group/subresource；clusterrole 同理用 create clusterrole。

---

### 43. 【RBAC】将名为 admin 的 ClusterRole 绑定给用户 wang、限定在 test 命名空间，正确命令是？

**答案**

**A**　kubectl create rolebinding wang-admin --clusterrole=admin --user=wang -n test

**解析**

在命名空间内用 RoleBinding 关联 ClusterRole 即实现权限降级；跨集群则用 create clusterrolebinding。

---

### 44. 【RBAC】要实现“让某用户对多个指定命名空间（而非全部）具有管理员权限”，推荐的做法是？

**答案**

**B**　创建一个 ClusterRole 配合在每个目标命名空间下创建 RoleBinding（混合绑定）

**解析**

用 ClusterRole（如 cluster-admin/admin）+ 多个命名空间下的 RoleBinding 混合绑定，避免重复定义、且权限被限制在各自命名空间。

---

### 45. 【RBAC】关于 SA 与 RoleBinding 的命名空间约束，正确的是？

**答案**

**B**　在命名空间级授权时，ServiceAccount 和 RoleBinding 必须在同一命名空间

**解析**

命名空间级授权要求 SA 与 RoleBinding 同处一个命名空间；但 SA 所管理的对象命名空间可与其自身命名空间不同。

---

### 46. 【Dashboard】部署 Kubernetes Dashboard 并登录时，通常的做法是？

**答案**

**B**　创建专用 Service Account 并绑定 cluster-admin 等 ClusterRole，再用其 token 登录

**解析**

Dashboard 需先配置 SA，将其绑定合适 ClusterRole（如 cluster-admin），再从对应 Secret 中取 token 登录。

---

### 47. 【准入】kubeadm 部署集群中，kube-apiserver 默认通过以下哪个选项启用准入控制器？

**答案**

**B**　--enable-admission-plugins

**解析**

API Server 用 --enable-admission-plugins 启用准入控制器（如默认 NodeRestriction）；关闭用 --disable-admission-plugins。

---

### 48. 【安全体系】Kubernetes 对 API Server 的访问必须经过三个安全访问控制步骤：______、______、______。

**答案**

- 第 1 空：认证 / Authentication / 身份认证 / Authentication认证
- 第 2 空：授权 / Authorization / 鉴权 / Authorization授权
- 第 3 空：准入控制 / Admission Control / Admission / 准入

**解析**

三层依次为认证（确认身份）、授权（分配资源操作权限）、准入控制（写操作合规校验）。【衍生知识点】认证/授权走短路或逻辑，准入控制走与逻辑一票否决。

---

### 49. 【用户】Kubernetes 集群中有两类用户：面向现实中的“人”的是 ______，面向 Pod 中运行的进程的是 ______。

**答案**

- 第 1 空：User Account / UA / 用户账户 / 普通用户
- 第 2 空：Service Account / SA / 服务账户 / 服务帐号

**解析**

UA 由外部系统管理、无对应 API 资源；SA 是 API 资源、隶属命名空间，供 Pod 内进程访问 API Server。

---

### 50. 【用户组】所有未通过认证测试的请求统一隶属于内置组 ______，而通过认证的用户会自动加入内置组 ______。

**答案**

- 第 1 空：system:unauthenticated / system:unauthenticated组
- 第 2 空：system:authenticated / system:authenticated组

**解析**

system:unauthenticated 为匿名未认证用户组；system:authenticated 为认证成功后自动加入的组。

---

### 51. 【认证】在 X509 客户端证书认证中，证书 subject 的 ______ 字段被识别为用户名，______ 字段被识别为组名。

**答案**

- 第 1 空：CN / Common Name / CommonName / Subject.CN
- 第 2 空：O / Organization / 组织 / Subject.O

**解析**

例如 /CN=bob/O=system:masters 得到用户名 bob、加入 system:masters 组，再经 RBAC 决定权限。

---

### 52. 【认证】使用 openssl 创建 X509 客户端用户证书时，先用 openssl ______ 生成私钥，再用 openssl req -new 生成 ______，最后用 openssl x509 -req 由 CA 签发。

**答案**

- 第 1 空：genrsa / openssl genrsa
- 第 2 空：CSR / csr / 证书签名请求 / 签名请求文件 / 证书请求

**解析**

典型流程：(umask 077; openssl genrsa -out xxx.key 4096) -> openssl req -new -> openssl x509 -req -CA ca.crt -CAkey ca.key。

---

### 53. 【kubeconfig】kubeconfig 文件由 clusters、users、______ 和 ______ 四部分构成（最后一项指定当前默认上下文）。

**答案**

- 第 1 空：contexts / 上下文 / context列表
- 第 2 空：current-context / 当前上下文 / current context

**解析**

clusters 定义集群端点，users 定义凭据，contexts 关联 user 与 cluster，current-context 选定默认上下文。

---

### 54. 【SA】Service Account 的 token 会被挂载到 Pod 内固定路径 ______，该目录下包含 token、ca.crt 和 ______ 三个文件。

**答案**

- 第 1 空：/var/run/secrets/kubernetes.io/serviceaccount / /var/run/secrets/kubernetes.io/serviceaccount/
- 第 2 空：namespace / 命名空间

**解析**

v1.21 前用 Secret 卷挂载；v1.21 后用 projected 卷（serviceAccountToken/configMap/kube-root-ca.crt/downwardAPI）映射到同一路径。

---

### 55. 【RBAC】启用 RBAC 后，API Server 自动创建的面向用户的默认 ClusterRole 包括 cluster-admin、admin、edit 和 ______。

**答案**

- 第 1 空：view

**解析**

四个面向用户默认角色：cluster-admin（超级）、admin（命名空间管理员）、edit（读写含 Secret）、view（只读不含 Role/Secret）。

---

### 56. 【RBAC】实现“让某用户仅对多个指定命名空间具有管理员权限”，推荐使用 ______（如 cluster-admin）配合各目标命名空间下的 ______ 进行混合绑定，权限会被降级到对应命名空间。

**答案**

- 第 1 空：ClusterRole / clusterrole / 集群角色
- 第 2 空：RoleBinding / rolebinding / 角色绑定

**解析**

ClusterRole+RoleBinding 混合组合：一个 ClusterRole 被多个命名空间的 RoleBinding 引用，既减少重复定义又限制权限范围。

---

### 57. 【准入】kubeadm 集群默认启用的准入控制器中，为没有资源限制的 Pod 添加默认资源限制的叫 ______，限制命名空间资源总量的叫 ______；PodSecurityPolicy 已在 v1.21 被弃用。

**答案**

- 第 1 空：LimitRanger / LimitRange / limitranger
- 第 2 空：ResourceQuota / resourcequota

**解析**

LimitRanger 针对 Pod/容器个体设默认与最大限制；ResourceQuota 针对命名空间总量限制；PSP 在 v1.21 弃用、v1.25 移除。

---


## K8s安全机制面试

### 58. 【面试】请简述 Kubernetes 对 API Server 访问的三层安全控制（认证、授权、准入控制）各自的职责，以及短路模型与一票否决的区别。

**答案**

1. 认证(Authentication)：确认请求者身份，只允许被许可的用户进入集群，失败返回401；遵循或逻辑且短路，任一插件成功即停止后续校验。
2. 授权(Authorization)：在认证基础上判断该用户能对哪些资源执行什么操作，权限不足返回403；同样遵循或逻辑短路，任一模块许可即通过。
3. 准入控制(Admission Control)：认证授权之后、对写操作做进一步合规校验（如资源配额、默认值填充），遵循与逻辑，每次写操作须经所有插件检验、一票否决，任一失败整体拒绝。
【衍生】认证/授权属于“或逻辑短路”，准入控制属于“与逻辑一票否决”，因为要记录不执行的原因便于审计。

**解析**

强调三层顺序与逻辑差异，认证/授权是或短路，准入是与逻辑。

---

### 59. 【面试】User Account 与 Service Account 的本质区别是什么？分别适用于什么场景？

**答案**

1. User Account（UA）：代表现实中的人，信息保存于集群外部的文件或认证系统，Kubernetes 不提供保存 UA 的资源类型，无法通过 API 创建；作用域为整个集群；常见由 openssl/证书/用户数据库管理。
2. Service Account（SA）：K8s 内建、与 Pod 关联的账号，通过 API 管理，隶属命名空间但可经 RBAC 授予集群级权限；凭据保存于同名专用 Secret；专供 Pod 内进程访问 API Server。
3. 默认每个命名空间有 default SA，所有 Pod 默认使用它（权限有限）。
【衍生】K8s 无法将 SA 直接加入某个用户组，需用 RBAC 绑定角色实现类似效果。

**解析**

回答要点落在“UA外部管理无API资源 / SA是API资源属命名空间”。

---

### 60. 【面试】Kubernetes 支持哪些常见的认证方式？并说明多种认证插件并存时的关系。

**答案**

1. 常见方式：X509 客户端证书、持有者令牌（Bearer Token，含 Service Account 令牌、静态令牌文件、Bootstrap 令牌、OIDC、Webhook 令牌）、前端代理认证、匿名。
2. 或关系：可同时启用多种认证方式，只要任一插件认证成功即视为通过；任一失败才尝试下一个，都不成功则以匿名身份访问。
3. kubeadm 默认启用：X509 客户端证书、Bootstrap 令牌、front-proxy、Service Account 令牌；API Server 不保证插件生效顺序与定义相同。
【衍生】X509 用 --client-ca-file 指定信任 CA，证书的 CN 为用户名、O 为组名。

**解析**

列举认证方式并强调或关系/短路。

---

### 61. 【面试】基于 openssl 命令创建 X509 客户端用户证书（含普通用户与管理员）的完整步骤是什么？

**答案**

1. 生成私钥：(umask 077; openssl genrsa -out pki/test.key 4096)。
2. 生成 CSR：openssl req -new -key pki/test.key -out pki/test.csr -subj "/CN=用户名/O=组名"（普通用户可加 /O=ops，管理员新版加 /O=kubeadm:cluster-admins、旧版 /O=system:masters）。
3. 用集群 CA 签发：openssl x509 -req -days 3650 -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key -CAcreateserial -in pki/test.csr -out pki/test.crt。
4. 将证书写入 kubeconfig（set-credentials/set-cluster/set-context）后即可用 kubectl 访问；权限需再经 RBAC 授权。
【衍生】仅认证通过但无 RBAC 授权时访问会返回 Forbidden。

**解析**

步骤：私钥->CSR->CA签发->kubeconfig；管理员靠 O 组命中 cluster-admin 绑定。

---

### 62. 【面试】说明基于 Kubernetes CSR API（CertificateSigningRequest 资源）为用户签发客户端证书的流程。

**答案**

1. 用 openssl 生成私钥与 CSR，并对 CSR 做 base64 编码。
2. 创建 CertificateSigningRequest 资源，metadata.name 为用户标识，spec.signerName 指定签名者（如 kubernetes.io/kube-apiserver-client），spec.request 填入 base64 后的 CSR。
3. 管理员审批：kubectl certificate approve <name>（拒绝用 kubectl certificate deny）。
4. 审批通过后从 status.certificate 取回签发证书：kubectl get csr <name> -o jsonpath={.status.certificate}|base64 -d > xxx.crt。
【衍生】这是方法2，相比 openssl 直接签发更贴合 API 驱动、可结合自动审批控制器。

**解析**

CSR 资源 + signerName + certificate approve + 取回证书。

---

### 63. 【面试】如何配置和使用静态令牌（Static Token）认证？

**答案**

1. 准备 CSV 文件，每行格式：token,user,uid,group（group 可选），例如 1a2dab.xxx,wang,1001,ops。
2. 在 kube-apiserver 静态 Pod 中添加 --token-auth-file=/path/token.csv 并挂载该文件目录。
3. 文件内容变更后需重启 kube-apiserver 才能重载。
4. 客户端使用：HTTP 头 Authorization: Bearer TOKEN，或 kubectl --token=$TOKEN -s https://API:6443。
【衍生】静态令牌仅完成认证，仍需 RBAC 授权；且明文 token 有安全隐患，生产多用 SA 令牌。

**解析**

CSV格式 + --token-auth-file + 重启 + Bearer头。

---

### 64. 【面试】kubeconfig 文件的结构是什么？kubectl 加载多个 kubeconfig 来源的优先级如何？

**答案**

1. 结构：clusters（集群端点 server 与 CA）、users（用户凭据：client-cert/key 或 token）、contexts（将某 user 关联到某 cluster）、current-context（默认上下文）；kind: Config 仅是格式标识而非 API 资源。
2. 优先级（高到低）：--kubeconfig 命令行参数（只支持一个文件） > KUBECONFIG 环境变量（冒号分隔多文件） > 默认 $HOME/.kube/config。
3. 可用 kubectl config get-clusters / get-contexts / use-context 管理；合并多个文件用 KUBECONFIG 或 kubectl config 命令。
【衍生】--kubeconfig 只接受一个文件，但 KUBECONFIG 可列多个实现合并。

**解析**

四段结构 + 优先级 --kubeconfig > KUBECONFIG > 默认。

---

### 65. 【面试】描述一个基于 X509 的 User Account 从创建到可经 RBAC 授权的完整流程。

**答案**

1. 创建私钥：openssl genrsa 生成 .key。
2. 签名请求：openssl req -new 生成 .csr，subject 指定 CN（用户名）与 O（组）。
3. 生成证书：用集群 CA 通过 openssl x509 -req 签发 .crt。
4. 创建 Kubernetes 用户凭据：kubectl config set-credentials 关联证书与密钥。
5. 创建集群：kubectl config set-cluster 指定 API Server 地址与 CA。
6. 关联用户和集群：kubectl config set-context 建立上下文，use-context 设为默认。
7. 授权：用 RoleBinding/ClusterRoleBinding 将用户（或所在组）绑定到合适角色，否则访问返回 Forbidden。
【衍生】管理员证书靠 O=kubeadm:cluster-admins（新版）/system:masters（旧版）命中 cluster-admin 绑定。

**解析**

私钥->CSR->证书->set-credentials->set-cluster->set-context->RBAC绑定。

---

### 66. 【面试】Service Account 如何实现自动化注入？v1.24 前后其 Secret/Token 机制有何变化？

**答案**

1. 自动化：ServiceAccount 准入控制器为未指定 serviceAccountName 的 Pod 自动附加所在命名空间的 default SA；SA 的 token 凭据由 Token Controller 管理。
2. v1.20 前：创建 SA 自动生成同名 Secret 并永久有效（有安全隐患）。
3. v1.21-v1.23：自动生成 Secret 但改用 projected 卷，由 Kubelet 经 TokenRequest API 下发、默认一年有效并每小时轮换。
4. v1.24 后：不再自动生成专用 Secret，完全由 Kubelet 经 TokenRequest API 自动下发短期 token；如需长期 token 需手动创建 kubernetes.io/service-account-token 类型 Secret 并注解关联 SA。
5. token 挂载路径固定为 /var/run/secrets/kubernetes.io/serviceaccount，含 token、ca.crt、namespace。
【衍生】Pod 经 pod.spec.serviceAccountName 指定自定义 SA。

**解析**

准入控制器自动注入 + v1.24 改为 TokenRequest 短期 token + 固定挂载路径。

---

### 67. 【面试】Kubernetes 有哪些授权机制？默认启用哪些？AlwaysAllow/AlwaysDeny/ABAC 各自特点？

**答案**

1. 常见：Node（专用于 kubelet 通信授权）、RBAC（1.6+主推，基于角色）、ABAC（基于属性，1.6 前用、本地文件策略需重启）、Webhook（第三方 HTTP 回调）、AlwaysAllow（允许所有）、AlwaysDeny（拒绝所有，仅测试）。
2. 默认：kubeadm 集群 --authorization-mode=Node,RBAC。
3. ABAC：规则写 API Server 本地文件，新增规则必须重启 apiserver，生产少用。
4. 任何鉴权方式都不允许时默认拒绝。
【衍生】授权同样遵循或逻辑短路：任一模块许可即通过。

**解析**

Node+RBAC 默认；ABAC 需重启；AlwaysAllow/Deny 用途。

---

### 68. 【面试】RBAC 的四要素是什么？Role 与 ClusterRole、RoleBinding 与 ClusterRoleBinding 的作用范围有何不同？

**答案**

1. 四要素：Role、RoleBinding、ClusterRole、ClusterRoleBinding。
2. Role：命名空间级，生效于所属命名空间；ClusterRole：集群级，覆盖集群及所有命名空间资源。
3. RoleBinding：命名空间级绑定，将 Subject 关联到 Role 或 ClusterRole，权限限在该命名空间；ClusterRoleBinding：集群级绑定，将 Subject 关联到 ClusterRole，权限覆盖整个集群。
4. 主体是否获得集群级还是命名空间级权限，由绑定（Binding）类型决定，而非角色本身。
【衍生】RoleBinding 引用 ClusterRole 时权限会“降级”到该命名空间。

**解析**

四要素 + Role/ClusterRole 范围 + Binding 决定实际范围。

---

### 69. 【面试】RBAC 的角色与角色绑定有哪几种组合？重点解释 ClusterRole + RoleBinding 的“权限降级”。

**答案**

1. 三类组合：命名空间级（Role+RoleBinding）、集群级（ClusterRole+ClusterRoleBinding）、混合级（ClusterRole+RoleBinding）。
2. Role+RoleBinding：最常用，单命名空间内授权。
3. ClusterRole+ClusterRoleBinding：跨所有命名空间授予集群级权限。
4. ClusterRole+RoleBinding（混合）：用一份 ClusterRole 定义权限，在每个目标命名空间创建 RoleBinding 引用它；此时 ClusterRole 的权限被“降级”到 RoleBinding 所在命名空间，即角色权限与该命名空间的交集。
5. 不支持 Role+ClusterRoleBinding。
【衍生】混合组合适合“多个命名空间的管理员”等场景，减少重复定义。

**解析**

三种组合 + 混合绑定的权限降级 + 不支持 Role+ClusterRoleBinding。

---

### 70. 【面试】默认面向用户的四个 ClusterRole（cluster-admin、admin、edit、view）权限有何区别？

**答案**

1. cluster-admin：可在目标范围任意资源上执行任意操作；用 ClusterRoleBinding 关联即拥有整个集群所有资源权限，用 RoleBinding 关联则拥有其命名空间所有资源（含 Namespace 自身）。
2. admin：命名空间管理员，经 RoleBinding 授予后可读写该命名空间大多数资源、并能创建 Role/RoleBinding，但不能操作 ResourceQuota 与 Namespace 本身。
3. edit：近似 admin，可读写命名空间内大多数对象（含 Secret），但不能查看或修改 Role 与 RoleBinding。
4. view：只读访问命名空间内大多数对象，但排除 Role、RoleBinding 和 Secret。
【衍生】这些默认 ClusterRole 多数带 system: 前缀，面向用户的几个无此前缀。

**解析**

四级默认角色权限梯度，重点 admin 不能管 Quota/Namespace、view 不含 Secret。

---

### 71. 【面试】如何实现一个用户（或 SA）对“多个指定命名空间”具有管理员权限（而非整个集群）？

**答案**

1. 采用 ClusterRole + RoleBinding 混合绑定。
2. 定义一个 ClusterRole（如直接用内置 cluster-admin 或自定义 admin 类权限）。
3. 在每个目标命名空间（如 prod-ns、test-ns、dev-ns）分别创建 RoleBinding，roleRef 指向该 ClusterRole，subjects 指向同一用户/SA。
4. 效果：该主体仅在这些命名空间内获得管理员权限，权限被降级到各自命名空间；其余命名空间无权限。
5. 若用 ServiceAccount，注意 SA 自身所在命名空间可与管理目标命名空间不同，但 RoleBinding 与其管理的命名空间须一致。
【衍生】相比直接 ClusterRoleBinding，混合方式避免授予整个集群权限，更安全。

**解析**

ClusterRole + 多命名空间 RoleBinding 混合实现多ns管理员。

---

### 72. 【面试】准入控制（Admission Control）的作用是什么？Mutating 与 Validating 控制器有何区别？列举常见准入控制器。

**答案**

1. 作用：认证授权之后、对写操作做进一步合规校验（资源限制、默认值填充、安全策略），遵循与逻辑一票否决。
2. 两阶段：先运行变更（Mutating）控制器（可修改被接受的对象），再运行验证（Validating）控制器（不可修改，仅校验）；任一阶段任一控制器拒绝即整体拒绝。
3. 常见控制器：NamespaceLifecycle、LimitRanger（Pod 默认资源限制）、ResourceQuota（命名空间资源总量）、ServiceAccount、NodeRestriction（限制 kubelet 只能改自己节点）、PodSecurity（替代已弃用的 PSP）、DefaultStorageClass、MutatingAdmissionWebhook、ValidatingAdmissionWebhook 等。
4. 启用：API Server 的 --enable-admission-plugins；关闭用 --disable-admission-plugins。
【衍生】PodSecurityPolicy(PSP) 在 v1.21 弃用、v1.25 移除，由 PodSecurity 标准替代。

**解析**

写操作合规校验 + Mutating可改/Validating只读 + NodeRestriction/LimitRanger/ResourceQuota 等。

---

### 73. 【面试】部署 Kubernetes Dashboard 或 Kuboard 并使用 Service Account Token 登录的做法与注意事项。

**答案**

1. Dashboard：创建专用 SA（如 dashboard-admin），用 ClusterRoleBinding 将其绑定到 cluster-admin（或按需绑定最小权限角色）；v1.24 后需手动创建 kubernetes.io/service-account-token 类型 Secret 并注解关联该 SA；从 Secret 的 data.token 取令牌填入 Dashboard 登录页。
2. Kuboard：创建 kuboard 命名空间与 SA（如 kuboard-admin），用 ClusterRoleBinding 绑定 cluster-admin，再创建同类型 Secret 取其 token，粘贴到 Kuboard 的 Token 导入框即可纳管集群；也支持用 kubeconfig 导入。
3. 注意事项：SA 的命名空间不决定其能管理的命名空间，真正权限由绑定决定；最小权限原则下应避免直接给 cluster-admin；token 长期有效需注意泄露风险；命名空间级用户需保证 SA 与 RoleBinding 同命名空间。
【衍生】kuboard 示例用 cat <<EOF 生成 kuboard-create-token.yaml，包含 Namespace/SA/ClusterRoleBinding/Secret 四段。

**解析**

建SA->绑cluster-admin->建Secret取token->登录；强调最小权限与v1.24手动Secret。

---
