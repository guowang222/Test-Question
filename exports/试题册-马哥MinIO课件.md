# 马哥MinIO课件 —— 试题册

> 共 75 题。答案与解析见《答案册-马哥MinIO课件.md》。


## MinIO笔试

### 1. 【MinIO】以下哪种传统存储方案属于块设备(Block)级别，存储设备直接与主机服务器连接、其它主机不能使用？

- **A.** DAS(直连存储)
- **B.** NAS(网络附加存储)
- **C.** 对象存储
- **D.** CDN(内容分发网络)

### 2. 【MinIO】NAS(网络附加存储)采用的共享协议是以下哪一组？

- **A.** iSCSI、FC、FCoE
- **B.** FTP、CIFS、NFS
- **C.** HTTP、HTTPS、REST
- **D.** S3、Swift、OSS

### 3. 【MinIO】关于对象存储(Object Storage)，以下说法错误的是？

- **A.** 每个对象包含数据、元数据、唯一标识符三部分
- **B.** 对象存储采用扁平结构，所有对象存放在同一个命名空间中
- **C.** 对象存储可以通过 URL 直接访问对象，并支持像 NFS 一样挂载为本地目录
- **D.** 对象存储通常适合读多写少的场景

### 4. 【MinIO】对象存储的三个核心组成部分是？

- **A.** 数据、索引、副本
- **B.** 数据、元数据、唯一标识符
- **C.** 元数据、校验码、分片
- **D.** 数据、校验码、目录树

### 5. 【MinIO】以下哪些属于**私有云**对象存储方案？

- **A.** 阿里云 OSS、腾讯云 COS
- **B.** MinIO、Ceph RGW
- **C.** Amazon S3、Azure Blob
- **D.** 天翼云 OSS、Google Cloud Storage

### 6. 【MinIO】阿里云 OSS 承诺的数据持久性和可用性分别是？

- **A.** 99.9999999999%(12个9)持久性、99.995%可用性
- **B.** 99.9999999%(9个9)持久性、99.99%可用性
- **C.** 99.9%(3个9)持久性、99.9%可用性
- **D.** 99.99999999999%(13个9)持久性、99.999%可用性

### 7. 【MinIO】MinIO 是使用什么语言开发、基于什么开源协议的对象存储服务？

- **A.** Java / Apache 2.0
- **B.** GoLang / GNU AGPL v3
- **C.** C++ / MIT
- **D.** Rust / BSD 3-Clause

### 8. 【MinIO】MinIO 支持存储的单个对象文件大小范围是？

- **A.** 几 KB 到最大 5 GB
- **B.** 几 KB 到最大 5 TB
- **C.** 几 MB 到最大 5 TB
- **D.** 几 KB 到最大 5 PB

### 9. 【MinIO】MinIO 官方公布的性能数据中，在 32 个 NVMe 驱动器节点和 100Gbe 网络上 GET/PUT 结果分别超过？

- **A.** 325 GiB/秒 和 165 GiB/秒
- **B.** 165 GiB/秒 和 325 GiB/秒
- **C.** 100 GiB/秒 和 50 GiB/秒
- **D.** 1 TiB/秒 和 500 GiB/秒

### 10. 【MinIO】在 MinIO 术语中，用来存储 Object 的逻辑空间、各 Bucket 之间数据相互隔离的是？

- **A.** Drive 驱动器
- **B.** Bucket 桶
- **C.** Set 存储集
- **D.** Object 对象

### 11. 【MinIO】关于 MinIO 中的 Set(存储集)，以下说法错误的是？

- **A.** Set 是一组相关磁盘(Drive)的集合
- **B.** 分布式部署时一个集群会划分一个或多个 Set
- **C.** 一个 Set 中的 Drive 数量由用户随意指定，不受集群规模影响
- **D.** 一个对象存储在一个 Set 上，一个 Set 中的 Drive 尽可能分布在不同的节点上

### 12. 【MinIO】MinIO 采用纠删码(Erasure Code)技术，其底层使用的编码算法是？

- **A.** CRC32
- **B.** Reed-Solomon code
- **C.** LZ4
- **D.** SHA-256

### 13. 【MinIO】MinIO 纠删码机制下，12 块盘时一个对象会被如何拆分，最多可以损坏多少块盘仍能恢复数据？

- **A.** 6 个数据块 + 6 个奇偶校验块，可损坏任意 6 块
- **B.** 12 个数据块 + 0 个校验块，不可损坏任何盘
- **C.** 4 个数据块 + 8 个校验块，可损坏任意 8 块
- **D.** 8 个数据块 + 4 个校验块，可损坏任意 4 块

### 14. 【MinIO】启用 MinIO 纠删码(EC)模式，至少需要多少块 Drive 磁盘？

- **A.** 2 块
- **B.** 3 块
- **C.** 4 块
- **D.** 8 块

### 15. 【MinIO】当一个大文件(>10 MB)写入 MinIO 时，S3 API 会将其分解为分段上传，关于分段以下说法错误的是？

- **A.** 每个部分至少 5 MB(最后一部分除外)且不超过 5 GB
- **B.** 根据 S3 规范，一个对象最多可以分成 10000 个 Part 部分
- **C.** 320 MB 的对象会被拆分为 64 个 5 MB 的部分
- **D.** 分段大小只能由服务端强制指定，客户端无法决定

### 16. 【MinIO】MinIO 对象上传到服务器后，磁盘上的目录结构中 `xl.meta` 文件存放的是？

- **A.** 原始数据块
- **B.** 奇偶校验块
- **C.** 对象的元数据
- **D.** 对象访问日志

### 17. 【MinIO】MinIO 单机 standalone 模式下，若要启用纠删码(erasure code mode)，需要满足什么条件？

- **A.** 只传入一个本地磁盘参数
- **B.** 传入多个本地磁盘参数且至少 4 个
- **C.** 必须启用 SSL 证书
- **D.** 必须配置分布式节点列表

### 18. 【MinIO】MinIO 默认的 S3-API 端口与控制台(Console)端口分别是？

- **A.** 9000 和 9001
- **B.** 9001 和 9000
- **C.** 8080 和 8081
- **D.** 9090 和 9091

### 19. 【MinIO】MinIO 默认的管理后台 Root 用户和密码是？

- **A.** admin/admin
- **B.** minioadmin/minioadmin
- **C.** root/root
- **D.** minio/123456

### 20. 【MinIO】通过环境变量指定 MinIO 管理员账号密码时，用户名和密码的最低长度要求是？

- **A.** 用户名至少 3 个字符，密码至少 8 个字符
- **B.** 用户名至少 5 个字符，密码至少 6 个字符
- **C.** 用户名至少 1 个字符，密码至少 6 个字符
- **D.** 用户名和密码都至少 12 个字符

### 21. 【MinIO】分布式 MinIO 部署时，各节点之间的时间差不能超过多少，通常用什么保证时间一致？

- **A.** 不能超过 3 秒，使用 NTP 保证时间一致
- **B.** 不能超过 30 秒，使用 DNS 保证时间一致
- **C.** 不能超过 5 分钟，使用 NFS 保证时间一致
- **D.** 没有时间限制

### 22. 【MinIO】关于 MinIO 数据磁盘的规划建议，以下说法错误的是？

- **A.** 多块数据磁盘需要使用独立磁盘，在物理底层相互独立以避免磁盘 IO 竞争
- **B.** 数据磁盘最大不超过 2T，使用 LVM 时逻辑卷大小也不要超过 2T
- **C.** 为提高利用率，应把 MinIO 数据目录和系统根文件系统 rootfs 放在同一文件系统
- **D.** 建议配置双网卡，将节点通信网络与客户端访问网络分开

### 23. 【MinIO】MinIO 在分布式和单机模式下，所有读写操作严格遵守的一致性模型是？

- **A.** 最终一致性(eventual consistency)
- **B.** 读写后一致性(read-after-write)
- **C.** 弱一致性
- **D.** 因果一致性

### 24. 【MinIO】关于基于 Kubernetes 部署 MinIO，以下哪种方式不是课件中提到的部署方法？

- **A.** Manifest YAML 清单文件
- **B.** MinIO Operator
- **C.** Helm 安装
- **D.** Ansible Playbook 一键部署

### 25. 【MinIO】在 Kubernetes 的 MinIO StatefulSet 清单中，需要配置哪个字段让所有 Pod 并行启动？

- **A.** podManagementPolicy: "Parallel"
- **B.** updateStrategy: RollingUpdate
- **C.** restartPolicy: Always
- **D.** concurrencyPolicy: Parallel

### 26. 【MinIO】使用 Helm 安装 MinIO 时，添加仓库的命令是？

- **A.** helm repo add minio https://charts.min.io/
- **B.** helm repo add minio https://helm.minio.io/
- **C.** helm chart add minio https://minio.io/charts/
- **D.** helm install repo minio https://charts.min.io/

### 27. 【MinIO】MinIO 的 systemd 服务单元文件中，`ExecStartPre` 的主要作用是？

- **A.** 检查并创建数据目录
- **B.** 校验 MINIO_VOLUMES 环境变量是否为空，为空则报错退出
- **C.** 下载 MinIO 二进制程序
- **D.** 开启自动补全

### 28. 【MinIO】MinIO 的 Docker 部署中，挂载数据目录和指定控制台端口的参数组合正确的是？

- **A.** -v /data/minio:/data -e "MINIO_ROOT_USER=admin" -e "MINIO_ROOT_PASSWORD=12345678" ... server /data --console-address ":9090"
- **B.** -v /data:/minio -e USER=admin -e PASS=12345678 ... server --port 9090
- **C.** --mount data1:/data --root user=admin ... server /data
- **D.** -v /data/minio:/data --console 9090 server

### 29. 【MinIO】MC 是指什么，其使用方法类似于哪类命令？

- **A.** MinIO Console，类似于 Windows 资源管理器
- **B.** MinIO Client，类似于常用的 UNIX 命令(ls/cat/cp/rm/diff/find 等)
- **C.** MinIO Cache，类似于 Redis 命令
- **D.** MinIO Cloud，类似于 S3 API

### 30. 【MinIO】MC 客户端的连接别名(alias)配置信息默认保存在哪个文件？

- **A.** /etc/mc/config.json
- **B.** ~/.mc/config.json
- **C.** ~/.config/minio/mc.conf
- **D.** /usr/local/bin/mc.json

### 31. 【MinIO】使用 MC 创建存储桶(Bucket)和删除存储桶的命令分别是？

- **A.** mc mb 和 mc rb
- **B.** mc create 和 mc delete
- **C.** mc bucket 和 mc remove
- **D.** mc mkdir 和 mc rmdir

### 32. 【MinIO】要查看 MinIO 集群各节点/磁盘的运行状态信息(如 Uptime、Network、Drives、Erasure sets)，应使用哪个命令？

- **A.** mc admin info <alias>
- **B.** mc ls <alias>
- **C.** mc stat <alias>
- **D.** mc du <alias>

### 33. 【MinIO】MinIO 在控制台创建的 Access key 和 Secret key 中，关于 Secret key 的说法正确的是？

- **A.** Secret key 可随时重复查看
- **B.** Secret key 只显示一次，需立即复制保存，否则只能重新生成新的 Access key
- **C.** Secret key 与 Access key 相同
- **D.** Secret key 只能在服务端配置文件中查看

### 34. 【MinIO】关于使用 Golang SDK 访问 MinIO，以下要求正确的是？

- **A.** 要求 golang v1.20 以上版本
- **B.** 要求 golang v1.10 以上版本
- **C.** 要求 golang v1.16 以上版本
- **D.** 对 golang 版本无要求

### 35. 【MinIO】MinIO 集群中某节点服务故障、重启后，关于数据的说法正确的是？

- **A.** 必须手动导入备份才能恢复数据
- **B.** 节点服务启动后会自动同步数据，无需人为干预
- **C.** 必须重新部署整个集群
- **D.** 数据会永久丢失

### 36. 【MinIO】更换 MinIO 集群故障节点时，以下注意事项错误的是？

- **A.** 更换新节点时需停止 MinIO 集群客户端的读写
- **B.** 新节点的配置信息(版本/配置文件/数据目录)要和旧节点保持一致
- **C.** 最好用 hosts 文件做地址解析，避免更换节点时修改 minio 配置文件参数
- **D.** 新节点可以使用与旧节点不同的 MinIO 版本以获得新特性

### 37. 【MinIO】通常当 MinIO 容量使用到多少时，建议考虑进行扩容？

- **A.** 50%
- **B.** 60%
- **C.** 70%
- **D.** 90%

### 38. 【MinIO】通过增加相同规格的集群节点扩容时，对新节点的磁盘数量有什么要求？

- **A.** 可以任意数量的节点和磁盘组合
- **B.** 必须是原有集群磁盘总数的整数倍，且数据盘大小配置与原集群一致
- **C.** 必须是原有集群磁盘总数的 2 倍，不能是 4 倍
- **D.** 新节点磁盘数可以少于原节点

### 39. 【MinIO】关于 MinIO 缩容，以下说法正确的是？

- **A.** 缩容只是简单地删除节点数据即可
- **B.** 如果 MinIO 不是基于 LVM 的存储，缩容相当于重新部署集群；缩容需要重建数据和 Access Key 信息
- **C.** 缩容不影响已有数据，无需备份
- **D.** 缩容只能在单机模式下进行

### 40. 【MinIO】Rclone 被称为什么，是用什么语言编写的、支持多少种云存储服务？

- **A.** “云存储的瑞士军刀”，Golang 编写，支持超过 40 种云存储服务
- **B.** “分布式文件系统”，C 语言编写，支持 10 种云存储服务
- **C.** “块存储网关”，Java 编写，支持 20 种云存储服务
- **D.** “消息队列”，Python 编写，支持 5 种云存储服务

### 41. 【MinIO】Rclone 的配置文件默认保存在哪个路径？

- **A.** /etc/rclone/rclone.conf
- **B.** ~/.config/rclone/rclone.conf
- **C.** ~/.rclone.conf
- **D.** /usr/local/rclone/config

### 42. 【MinIO】使用 Rclone 备份 MinIO 集群数据时，对备份服务器存储空间的要求是？

- **A.** 至少满足 minio 集群存储空间的一半
- **B.** 必须与 minio 集群存储空间完全相同
- **C.** 至少是 minio 集群存储空间的 2 倍
- **D.** 无空间要求

### 43. 【MinIO】在 Rclone 备份命令中，`--checksum` 参数的作用是？

- **A.** 通过文件大小判断是否需要同步
- **B.** 通过 md5 判断文件是否需要重新同步(消耗 CPU 比较高)
- **C.** 启用压缩传输
- **D.** 限制上传下载带宽

### 44. 【MinIO】MinIO 内置支持哪种监控方案，推荐的组合是？

- **A.** Zabbix + Grafana
- **B.** Prometheus + Grafana
- **C.** Nagios + Graphite
- **D.** ELK + Kibana

### 45. 【MinIO】MinIO 暴露给 Prometheus 采集集群指标的默认 metrics_path 是？

- **A.** /metrics
- **B.** /minio/v2/metrics/cluster
- **C.** /api/v1/metrics
- **D.** /minio/metrics

### 46. 【MinIO】MinIO 是使用 ______ 语言开发的、基于 ______ 开源协议的对象存储服务，兼容亚马逊 S3 云存储服务接口。

> 共 2 个空。

### 47. 【MinIO】对象存储的每个对象包含三部分：数据、______ 和唯一的标识符。

> 共 1 个空。

### 48. 【MinIO】阿里云 OSS 提供 ______%（即 12 个 9）的数据持久性和 ______% 的数据可用性。

> 共 2 个空。

### 49. 【MinIO】MinIO 默认的 S3-API 监听端口为 ______，控制台(Console)监听端口为 ______。

> 共 2 个空。

### 50. 【MinIO】实现纠删码(Erasure Code)至少需要 ______ 块 Drive 磁盘，分布式 MinIO 也至少需要该数量的硬盘。

> 共 1 个空。

### 51. 【MinIO】MinIO 支持的一个对象文件可以是任意大小，从几 KB 到最大 ______ 不等。

> 共 1 个空。

### 52. 【MinIO】分布式 MinIO 中，各节点的时间差不能超过 ______ 秒，通常使用 NTP 来保证时间一致。

> 共 1 个空。

### 53. 【MinIO】规划 MinIO 数据磁盘时，单块数据磁盘最大不超过 ______，使用 LVM 时逻辑卷大小也不要超过该值，否则会导致后期 IO 延迟较高、性能降低。

> 共 1 个空。

### 54. 【MinIO】通常当 MinIO 容量使用到 ______% 时，建议考虑进行扩容。

> 共 1 个空。

### 55. 【MinIO】大文件（>10MB）写入 MinIO 时由 S3 API 分段上传，S3 要求每个部分至少为 ______ MB（最后一部分除外）且不超过 ______ GB，一个对象最多可分成 10000 个部分。

> 共 2 个空。


## MinIO面试

### 56. 【面试】请说明对象存储与传统存储(DAS/NAS/SAN)的区别，以及对象存储的适用场景。

### 57. 【面试】什么是 MinIO？它的核心特点有哪些？

### 58. 【面试】请解释 MinIO 中的 Object、Bucket、Drive、Set 四个核心术语。

### 59. 【面试】什么是纠删码(Erasure Code)？MinIO 的纠删码机制是如何工作的？与传统 RAID 有何区别？

### 60. 【面试】MinIO 的存储机制是怎样的？xl.meta 与 part.N 分别存放什么？

### 61. 【面试】MinIO 有哪些部署模式和部署方法？

### 62. 【面试】MinIO 单机模式下的 non-erasure code mode 和 erasure code mode 有何区别？

### 63. 【面试】如何部署一个分布式 MinIO 集群？需要满足哪些条件？

### 64. 【面试】分布式 MinIO 部署有哪些注意事项？

### 65. 【面试】请说明 MinIO 常用环境变量 MINIO_ROOT_USER、MINIO_ROOT_PASSWORD、MINIO_VOLUMES、MINIO_OPTS 的作用与取值要求。

### 66. 【面试】MinIO 的 MC 客户端是什么？请列举常用命令并说明如何连接集群。

### 67. 【面试】如何通过编程语言(Python/Golang/Java)访问 MinIO？

### 68. 【面试】MinIO 集群中一个节点故障后如何恢复？有哪些注意事项？

### 69. 【面试】MinIO 如何扩容？LVM 扩容与增加集群节点扩容有何区别？

### 70. 【面试】MinIO 如何缩容？需要注意什么？

### 71. 【面试】如何使用 Rclone 备份和还原 MinIO 数据？

### 72. 【面试】如何对 MinIO 进行监控？

### 73. 【面试】如何在 Kubernetes 中部署 MinIO？

### 74. 【面试】MinIO 的读写一致性模型是什么？其高可用性如何体现？

### 75. 【面试】MinIO 相比公有云 OSS(如阿里云 OSS)有什么优势？中小企业在对象存储选型时应如何考虑？
