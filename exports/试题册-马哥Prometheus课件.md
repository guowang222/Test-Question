# 马哥Prometheus课件 —— 试题册

> 共 77 题。答案与解析见《答案册-马哥Prometheus课件.md》。


## Prometheus笔试

### 1. 【可观测性】CNCF 在《可观测性白皮书》中提出的“可观测性三大信号”（三大支柱）是指？

- **A.** Metrics 指标、Logging 日志、Tracing 追踪
- **B.** CPU、内存、磁盘
- **C.** 采集、存储、告警
- **D.** 日志、告警、报表

### 2. 【监控系统】一个完整的监控系统通常需要包含六大功能，以下哪一组是正确的？

- **A.** 数据产生、数据采集、数据存储、数据处理、数据展示分析、告警
- **B.** 采集、清洗、转换、加载、建模、出图
- **C.** 登录、鉴权、审计、备份、恢复、告警
- **D.** 采集、存储、索引、检索、可视化、导出

### 3. 【数据采集】下列采集方式中，属于“硬件方式”采集的是？

- **A.** IPMI
- **B.** SNMP
- **C.** SSH
- **D.** HTTP

### 4. 【时序数据】TSDB 使用高效数据压缩技术后，单个数据点的平均存储空间和存储空间降低比例约为？

- **A.** 1~2 个字节，可降低 90% 存储使用空间
- **B.** 10~20 个字节，可降低 50%
- **C.** 3.5 个字节，可降低 70%
- **D.** 1 个字节，可降低 99%

### 5. 【时序数据】以下哪一项不属于时间序列数据的典型特点？

- **A.** 频繁随机修改任意历史时间点的单个值
- **B.** 大部分时间都是顺序写入操作，很少涉及修改数据
- **C.** 删除操作通常是删除一段时间的数据，而非无规律数据
- **D.** 读操作一般都是升序或降序

### 6. 【Prometheus】Prometheus 在设计上启发于 Google 的哪套监控系统？

- **A.** BorgMon
- **B.** Monarch
- **C.** Dapper
- **D.** Chubby

### 7. 【Prometheus】关于 Prometheus 的发展历程，下列说法正确的是？

- **A.** 由工作在 SoundCloud 的 Google 前员工于 2012 年创建，2015 年正式发布，2016 年加入 CNCF
- **B.** 由 Google 于 2004 年创建，2010 年开源
- **C.** 由 Facebook 于 2010 年创建，2014 年捐赠给 CNCF
- **D.** 由 CNCF 于 2018 年从零发起的新项目

### 8. 【Prometheus】Prometheus 是继哪个项目之后第二个在 CNCF（云原生计算基金会）托管的项目？

- **A.** Kubernetes
- **B.** etcd
- **C.** Envoy
- **D.** containerd

### 9. 【Prometheus】Prometheus 本身是基于哪种语言开发的一套开源系统监控报警框架和时序数据库？

- **A.** Go
- **B.** C++
- **C.** Rust
- **D.** Java

### 10. 【Prometheus】以下哪一项是 Prometheus 被公认的不足之处？

- **A.** 不支持集群化、被监控集群规模过大后本身性能有瓶颈
- **B.** 不支持多维数据模型
- **C.** 仅支持推（Push）模式采集
- **D.** 不支持自定义查询语言

### 11. 【监控选型】关于 Zabbix 与 Prometheus 的差异，下列说法正确的是？

- **A.** Zabbix 默认采用关系型数据库作为后端存储，Prometheus 采用时序数据库 TSDB
- **B.** Zabbix 默认使用 TSDB，Prometheus 默认使用 MySQL
- **C.** 两者都不支持告警
- **D.** Zabbix 只支持容器监控

### 12. 【监控方法】Google 提出的用于服务级别监控的“四个黄金指标”是指？

- **A.** 延迟 Latency、流量 Traffic、错误 Errors、饱和度 Saturation
- **B.** CPU、内存、磁盘、网络
- **C.** 可用性、可靠性、安全性、可维护性
- **D.** QPS、TPS、RT、并发数

### 13. 【架构】Prometheus 的数据获取逻辑采用的是哪种模型？

- **A.** 主动从各 Target 上拉取（Pull），相当于 Zabbix 里的被动模式
- **B.** 被动等待被监控端推送（Push）
- **C.** 双向同步
- **D.** 仅支持从消息队列消费

### 14. 【架构】Alertmanager 组件的主要职责是？

- **A.** 接收 Prometheus 发来的告警，进行去重、分组，并按路由将告警发送到对应接收方
- **B.** 采集各 Target 的指标数据
- **C.** 存储时序数据并提供 PromQL 查询
- **D.** 图形化展示监控数据

### 15. 【架构】Pushgateway 主要用于解决什么场景的监控数据采集？

- **A.** 短生命周期（short-lived）的 jobs——可能在 Prometheus 来 pull 之前就消失了
- **B.** 主机级别的资源指标采集
- **C.** Kubernetes 集群状态采集
- **D.** 网络设备的硬件健康状态采集

### 16. 【架构】关于 Prometheus 各组件的职责边界，下列说法正确的是？

- **A.** Prometheus Server 只负责时序型指标数据的采集及存储，分析、聚合、展示与告警需配合其它组件实现
- **B.** Prometheus Server 内置了全部告警发送能力，无需 Alertmanager
- **C.** Grafana 负责数据采集
- **D.** Exporter 负责数据存储

### 17. 【数据模型】在 Prometheus 中，一条时间序列由什么唯一标识？

- **A.** 指标名称（Metric Name）+ 标签集（Labels）
- **B.** 仅指标名称
- **C.** 仅标签集
- **D.** 时间戳 + 数值

### 18. 【数据模型】关于 Metric 名称的命名规范，下列说法正确的是？

- **A.** 由 ASCII 字母、数字、下划线和冒号组成，其中冒号是为用户定义的记录规则保留的
- **B.** 可以包含任意 Unicode 字符，包括中文和空格
- **C.** 只能由小写字母组成
- **D.** 必须以数字开头

### 19. 【数据模型】在 Prometheus 中，Job（任务）与 Instance（实例）的关系是？

- **A.** 一个 scrape 目标（<host>:<port>）称为一个 instance，一组同种类型的 instances 集合称为一个 job
- **B.** 一个 job 就是一个 instance，两者完全等价
- **C.** 一个 instance 包含多个 job
- **D.** job 是进程名，instance 是主机名

### 20. 【数据模型】Prometheus 客户端库提供的四种核心度量标准类型是？

- **A.** Counter、Gauge、Histogram、Summary
- **B.** int、float、string、bool
- **C.** Counter、Meter、Timer、Gauge
- **D.** Metric、Log、Trace、Event

### 21. 【指标类型】关于 Counter（计数器）类型，下列说法正确的是？

- **A.** 代表一个从 0 开始累积单调递增的计数器，只能在重启时增加或重置为零，不能表示递减值
- **B.** 可以任意增大或减小
- **C.** 用于统计数据的分布情况
- **D.** 由客户端直接计算分位数

### 22. 【指标类型】需要监控“硬盘剩余空间、当前内存使用量、待处理队列中任务个数、并发请求数”这类可增可减的瞬时状态值，应使用哪种指标类型？

- **A.** Gauge 计量器
- **B.** Counter 计数器
- **C.** Histogram 直方图
- **D.** Summary 摘要

### 23. 【指标类型】关于 Histogram 与 Summary 的分位数（quantile）计算位置，下列说法正确的是？

- **A.** Histogram 的分位数由 Prometheus Server 基于样本数据估算，Summary 的分位数由客户端计算并直接存储
- **B.** 两者都由服务端计算
- **C.** 两者都由客户端计算
- **D.** Histogram 由客户端计算，Summary 由服务端计算

### 24. 【指标类型】Histogram 类型的指标会衍生出多个时间序列，其中用于统计分布的桶序列命名为？

- **A.** <basename>_bucket{le="<upper inclusive bound>"}，最大桶为 le="+Inf"
- **B.** <basename>_bucket{gt="..."}
- **C.** <basename>_quantile{x="..."}
- **D.** <basename>_range{le="..."}

### 25. 【指标类型】关于 Summary 类型的能力边界，下列说法正确的是？

- **A.** Summary 不支持 sum 或 avg 一类的聚合运算，且分位数由客户端计算，Server 端无法获取客户端未定义的分位数
- **B.** Summary 支持任意维度的聚合计算
- **C.** Summary 的分位数可以由 Server 端任意指定
- **D.** Summary 会在服务端做桶划分

### 26. 【部署】Prometheus 二进制安装时，官方约定的安装位置与目录划分通常是？

- **A.** /usr/local/prometheus，内部划出 bin、conf、data 三个目录
- **B.** /etc/prometheus，仅一个 conf 目录
- **C.** /opt/prometheus，数据强制放在 /var/lib
- **D.** /root/prometheus，无需划分子目录

### 27. 【部署】Prometheus 默认监听的端口是？

- **A.** 9090
- **B.** 9100
- **C.** 9093
- **D.** 3000

### 28. 【部署】启动参数 --web.enable-lifecycle 的作用是？

- **A.** 开启后支持通过 HTTP 请求实现 reload 加载配置和 quit 关闭服务，但存在安全风险
- **B.** 开启 TLS 加密
- **C.** 开启服务自动发现
- **D.** 开启远程写接收

### 29. 【部署】检查 Prometheus 配置文件与规则文件语法是否正确，应使用什么命令？

- **A.** promtool check config <prometheus.yml>、promtool check rules <rules.yml>
- **B.** prometheus --check
- **C.** promql verify
- **D.** systemctl verify prometheus

### 30. 【部署】Prometheus 的全局配置中，scrape_interval 的默认值与课件示例中的常用取值分别是？

- **A.** 默认 1 分钟，示例常用 15 秒
- **B.** 默认 15 秒，示例常用 1 分钟
- **C.** 默认 5 分钟，示例常用 30 秒
- **D.** 默认 10 秒，示例常用 60 秒

### 31. 【部署】控制 Prometheus 本地数据保留时长与保留容量的参数是？

- **A.** --storage.tsdb.retention.time（默认 15d）与 --storage.tsdb.retention.size
- **B.** --storage.retention.days 与 --storage.retention.gb
- **C.** --data.keep-time 与 --data.keep-size
- **D.** --tsdb.max-age 与 --tsdb.max-size

### 32. 【部署】以下哪个启动参数用于限制单个查询可加载进内存的最大样本数？

- **A.** --query.max-samples（默认 50000000）
- **B.** --query.max-concurrency（默认 20）
- **C.** --query.timeout（默认 2m）
- **D.** --web.max-connections（默认 512）

### 33. 【Node Exporter】node_exporter 默认监听的端口与指标暴露路径是？

- **A.** 9100 端口，/metrics 路径
- **B.** 9090 端口，/metrics 路径
- **C.** 9100 端口，/node/metrics 路径
- **D.** 9200 端口，/api/v1/metrics 路径

### 34. 【Grafana】Grafana 默认监听的端口与初始登录账号密码是？

- **A.** 3000 端口，admin/admin
- **B.** 9090 端口，admin/admin
- **C.** 3000 端口，root/root
- **D.** 8080 端口，admin/password

### 35. 【Pushgateway】配置 Prometheus 抓取 Pushgateway 数据时，honor_labels: true 的作用是？

- **A.** 让 Prometheus 使用 Pushgateway 上的 job 和 instance 标签，避免自身标签覆盖源标签
- **B.** 开启 TLS 校验
- **C.** 开启数据去重
- **D.** 强制推送数据到 Alertmanager

### 36. 【Pushgateway】关于 Pushgateway 的缺点，下列说法错误的是？

- **A.** Pushgateway 会自己判断并丢弃异常数据，只上报合法指标
- **B.** Pushgateway 会形成单点瓶颈，进程故障则监控数据无法获取
- **C.** 会失去 Prometheus 通过 up 指标自动进行实例运行状况监控的能力
- **D.** 数据会永远暴露给 Prometheus，除非通过 Pushgateway 的 API 手动删除

### 37. 【PromQL】PromQL 表达式的计算结果可以为四种类型，下列说法正确的是？

- **A.** instant vector（即时向量）、range vector（范围向量）、scalar（标量）、string（字符串）
- **B.** int、float、bool、string
- **C.** Series、Table、Graph、Alert
- **D.** Metric、Label、Sample、Target

### 38. 【PromQL】关于标签匹配器中的正则匹配 =~，下列说法正确的是？

- **A.** 正则表达式的匹配是完全锚定（整值匹配）的，要匹配前缀必须写成 ^ge.* 而不是 ^ge
- **B.** =~ 是包含匹配，写 ^ge 即可匹配 get
- **C.** =~ 只能用于指标名称，不能用于普通标签
- **D.** =~ 不支持 | 表示或

### 39. 【PromQL】rate() 与 irate() 的核心区别是？

- **A.** rate 取时间范围内所有数据点算出一组速率再取平均；irate 只用最近两个样本点计算瞬时速率，对突发峰值更敏感
- **B.** rate 只取最近两个点，irate 取全部点
- **C.** 两者完全等价，只是性能不同
- **D.** irate 只能用于 Gauge，rate 只能用于 Counter

### 40. 【PromQL】PromQL 的聚合操作符中，用于按标签分组的两个修饰符是？

- **A.** by（仅按指定标签分组统计）与 without（排除指定标签，对其余标签分组统计）
- **B.** on 与 ignoring
- **C.** group_left 与 group_right
- **D.** keep 与 drop

### 41. 【标签管理】关于 relabel_configs 与 metric_relabel_configs 的区别，下列说法正确的是？

- **A.** relabel_configs 在 scrape 目标之前生效、针对 target 本身；metric_relabel_configs 在 scrape 之后生效、针对抓取到的 metric，是保存数据前的最后一步
- **B.** 两者完全等价，可任意互换
- **C.** relabel_configs 针对 metric，metric_relabel_configs 针对 target
- **D.** metric_relabel_configs 在抓取之前生效

### 42. 【标签管理】relabel_configs 的 action 字段中，用于“删除标签（相当于黑名单）”和“只保留标签（相当于白名单）”的分别是？

- **A.** labeldrop 与 labelkeep
- **B.** drop 与 keep
- **C.** replace 与 labelmap
- **D.** lowercase 与 uppercase

### 43. 【告警】一条告警规则中的 for 字段含义与告警状态流转是？

- **A.** 条件表达式持续满足该时长后才真正告警；此前为 pending 状态，之后变为 firing
- **B.** for 表示告警重复发送的间隔
- **C.** for 表示告警超时时间，超时后自动关闭
- **D.** for 表示首次告警的延迟发送时间，与状态无关

### 44. 【告警】Alertmanager 默认的 Web 监听端口与集群（HA）通信端口分别是？

- **A.** 9093 与 9094
- **B.** 9090 与 9091
- **C.** 9093 与 9095
- **D.** 8080 与 8081

### 45. 【告警】Alertmanager 路由的默认时间参数 group_wait、group_interval、repeat_interval 分别是？

- **A.** 30s、5m、4h
- **B.** 10s、10s、10s
- **C.** 1m、1m、1h
- **D.** 5m、30m、24h

### 46. 【存储】Prometheus 本地 TSDB 以多长时间为一个 Block 时间窗口？WAL 文件段的默认大小是多少？

- **A.** 2 小时；128MB
- **B.** 1 小时；64MB
- **C.** 2 小时；512MB
- **D.** 6 小时；256MB

### 47. 【远程存储】VictoriaMetrics（VM）默认的监听端口与实现的查询语言分别是？

- **A.** 8428；MetricsQL（基于 PromQL 改进）
- **B.** 9090；PromQL
- **C.** 8428；PromQL 的原样实现
- **D.** 3000；GraphiteQL

### 48. 【数据模型】metric 名称由 ASCII 字符、数字、下划线和______组成，其中______是为用户定义的记录规则保留的。

> 共 2 个空。

### 49. 【数据模型】Prometheus 中一个单独 scrape（<host>:<port>）的目标称为一个______，一组同种类型的集合称为一个______。

> 共 2 个空。

### 50. 【存储】Prometheus 以每______小时为一个时间窗口将内存中的数据存储为一个单独的 Block；WAL 被分割为默认______MB 大小的文件段。

> 共 2 个空。

### 51. 【端口】Prometheus 默认监听______端口，Alertmanager 默认 Web 端口为______，其集群（HA）通信端口为______。

> 共 3 个空。

### 52. 【端口】node_exporter 默认监听______端口，Grafana 默认监听______端口。

> 共 2 个空。

### 53. 【存储】控制样本保留时长的参数 --storage.tsdb.retention.time 默认为______天；Prometheus 默认把数据存储在安装目录下的______目录。

> 共 2 个空。

### 54. 【告警】告警规则中，______字段表示条件持续满足多久后才真正告警；告警状态会由 pending 转变为______。

> 共 2 个空。

### 55. 【告警】Alertmanager 路由中 group_wait 默认______，group_interval 默认______，repeat_interval 默认______。

> 共 3 个空。

### 56. 【联邦】上级 Prometheus 从另一个 Prometheus 抓取数据使用的是______端点，且必须至少指定一个______ URL 参数；为避免自身标签覆盖源标签，还需启用______选项。

> 共 3 个空。

### 57. 【联邦】Prometheus 联邦有______联邦和______联邦两种模式，其中前者较为常用且配置简单。

> 共 2 个空。


## Prometheus面试

### 58. 【面试】请简述 Prometheus 的整体架构，以及各核心组件的职责。

### 59. 【面试】Prometheus 的 Pull（拉）与 Push（推）模式有何区别？Pushgateway 适用什么场景、有哪些缺点？

### 60. 【面试】Prometheus 与 Zabbix 有什么区别？如何选型？

### 61. 【面试】什么是时间序列数据？时序数据库（TSDB）有哪些特点？

### 62. 【面试】Prometheus 的四种指标类型有什么区别？Histogram 与 Summary 该如何选择？

### 63. 【面试】请说明 Prometheus 本地存储（TSDB）的存储机制。

### 64. 【面试】为什么说 Prometheus 不适合做计费用途？

### 65. 【面试】PromQL 有哪几种表达式返回类型？它们分别适用于什么场景？

### 66. 【面试】rate() 和 irate() 有什么区别？实际工作中如何选择？

### 67. 【面试】什么是记录规则（Recording Rule）？为什么需要它？

### 68. 【面试】Prometheus 与 Alertmanager 在告警链路中如何分工？告警状态如何流转？

### 69. 【面试】Alertmanager 的去重、分组、抑制、静默、路由分别解决什么问题？

### 70. 【面试】告警规则中的 for 字段有什么作用？配置时要注意什么？

### 71. 【面试】如何配置 Alertmanager 的告警路由？根路由有什么限制？

### 72. 【面试】如何定制告警通知模板？模板中如何引用标签和数值？

### 73. 【面试】Prometheus 有哪些服务发现机制？文件服务发现的原理与配置是怎样的？

### 74. 【面试】relabel_configs 与 metric_relabel_configs 有什么区别？常用的 action 有哪些？

### 75. 【面试】Prometheus 单机存在哪些瓶颈？如何实现高可用与水平扩展？

### 76. 【面试】如何监控容器（cAdvisor）？黑盒监控与白盒监控有什么区别？

### 77. 【面试】在 Kubernetes 中部署 Prometheus 有哪几种方式？Prometheus Operator 提供了哪些 CRD？
