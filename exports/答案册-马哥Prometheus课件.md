# 马哥Prometheus课件 —— 答案与解析

> 共 77 题，编号与《试题册-马哥Prometheus课件.md》一致。


## Prometheus笔试

### 1. 【可观测性】CNCF 在《可观测性白皮书》中提出的“可观测性三大信号”（三大支柱）是指？

**答案**

**A**　Metrics 指标、Logging 日志、Tracing 追踪

**解析**

可观测性三大信号（三大支柱）为：指标 Metrics、日志 Logging、追踪 Tracing。可观测性诞生于几十年前的控制理论，指的是“通过检查其输出来衡量系统内部状态的能力”。2018 年 CNCF 率先将“可观测性”一词引入 IT 领域，并称其为云原生时代必须具备的能力。【衍生知识点】监控只是可观测性的一个子集——监控关注“已知的未知”（你预先定义了要看的指标），而可观测性强调通过输出的多维数据回答“未知的未知”。

---

### 2. 【监控系统】一个完整的监控系统通常需要包含六大功能，以下哪一组是正确的？

**答案**

**A**　数据产生、数据采集、数据存储、数据处理、数据展示分析、告警

**解析**

完整监控系统的六大功能：数据产生、数据采集、数据存储、数据处理、数据展示分析、告警。这六环构成了监控数据从“产生”到“产生价值”的完整链路，缺任何一环监控体系都不完整。【衍生知识点】很多自建监控只做了“采集+展示”，把“告警”交给人工巡检或不做“数据处理”（聚合/降采样），结果是数据量大、看得累、没人看——告警才是监控真正产生价值的地方。

---

### 3. 【数据采集】下列采集方式中，属于“硬件方式”采集的是？

**答案**

**A**　IPMI

**解析**

数据采集方式分为两类：软件方式（agent 专用代理、http、ssh、SNMP）与硬件方式（IPMI）。IPMI 是智慧平台管理接口（Intelligent Platform Management Interface），是一种工业标准，用于采集硬件设备的各种物理健康状态数据，如温度、电压、风扇工作状态、电源状态等。【衍生知识点】SNMP 是简单网络管理协议，常用于网络设备（交换机/路由器），虽然名字里有“网络”，但它属于软件方式采集，不要与 IPMI 混淆。

---

### 4. 【时序数据】TSDB 使用高效数据压缩技术后，单个数据点的平均存储空间和存储空间降低比例约为？

**答案**

**A**　1~2 个字节，可降低 90% 存储使用空间

**解析**

TSDB 使用高效的数据压缩技术，将单个数据点的平均使用存储空间降为 1~2 个字节，可以降低 90% 存储使用空间，同时加快数据写入速度。【衍生知识点】题目里的“3.5 字节”是另一个数据点：Prometheus TSDB v2.0 引入 Facebook Gorilla 压缩算法后，每个采样数据约占用 3.5byte。两者语境不同，注意区分。

---

### 5. 【时序数据】以下哪一项不属于时间序列数据的典型特点？

**答案**

**A**　频繁随机修改任意历史时间点的单个值

**解析**

时间序列数据特点：大部分时间是顺序写入、很少修改；删除是删除一段时间的数据而非无规律删除；读操作一般是升序或降序；配合高效压缩算法节省存储；高性能读写（每秒百万级数据点写入、亿级聚合结果秒级返回）。“频繁随机修改任意历史点”恰恰是时序库不擅长、也不鼓励的操作。【衍生知识点】这也是为什么时序库普遍不支持（或弱支持）UPDATE 语义——按时间范围删除（TTL/retention）才是它的主场景。

---

### 6. 【Prometheus】Prometheus 在设计上启发于 Google 的哪套监控系统？

**答案**

**A**　BorgMon

**解析**

Prometheus 启发于 Google 的 borgmon 监控系统，在一定程度上可以理解为是 Google BorgMon 监控系统的开源版本。【衍生知识点】Google 的“四黄金指标”（延迟、流量、错误、饱和度）也出自其 SRE/BorgMon 体系，是服务级监控的经典方法论。

---

### 7. 【Prometheus】关于 Prometheus 的发展历程，下列说法正确的是？

**答案**

**A**　由工作在 SoundCloud 的 Google 前员工于 2012 年创建，2015 年正式发布，2016 年加入 CNCF

**解析**

Prometheus 由工作在 SoundCloud 的 Google 前员工在 2012 年创建，作为社区开源项目开发，并于 2015 年正式发布；2016 年正式加入 CNCF，成为继 Kubernetes 之后第二个在 CNCF 托管的项目。【衍生知识点】注意“加入 CNCF（2016）”与“从 CNCF 毕业”是两回事，Kubernetes 与 Prometheus 是最早一批从 CNCF 毕业的顶级项目。

---

### 8. 【Prometheus】Prometheus 是继哪个项目之后第二个在 CNCF（云原生计算基金会）托管的项目？

**答案**

**A**　Kubernetes

**解析**

2016 年 Prometheus 正式加入 CNCF，成为继 Kubernetes 之后第二个在 CNCF 托管的项目，现已广泛用于容器和微服务领域。【衍生知识点】“K8s + Prometheus”几乎已是云原生监控的事实标准组合：K8s 提供服务发现能力，Prometheus 提供服务发现驱动的动态监控。

---

### 9. 【Prometheus】Prometheus 本身是基于哪种语言开发的一套开源系统监控报警框架和时序数据库？

**答案**

**A**　Go

**解析**

Prometheus 本身基于 Go 语言开发，是一套开源的系统监控报警框架和时序数据库（TSDB）。Prometheus 的监控功能很完善和全面，性能也足够支撑上万台规模的集群。【衍生知识点】正因为用 Go 编写，Prometheus 生态组件（prometheus、alertmanager、pushgateway、各类 exporter）大多编译为静态二进制文件，部署时无依赖、可解压即用，这也是它比 Zabbix 更易容器化的原因之一。

---

### 10. 【Prometheus】以下哪一项是 Prometheus 被公认的不足之处？

**答案**

**A**　不支持集群化、被监控集群规模过大后本身性能有瓶颈

**解析**

Prometheus 的不足：不支持集群化；被监控集群规模过大后本身性能有一定瓶颈；中文支持不好；功能不完整，需要结合其它组件实现监控的全部功能。【衍生知识点】正因为“单节点不支持集群、本地存储有单点瓶颈”，生产上才需要联邦（Federation）做横向分片、用 VictoriaMetrics/Thanos 做远程长期存储。

---

### 11. 【监控选型】关于 Zabbix 与 Prometheus 的差异，下列说法正确的是？

**答案**

**A**　Zabbix 默认采用关系型数据库作为后端存储，Prometheus 采用时序数据库 TSDB

**解析**

Zabbix 诞生时业务数据量相对不多，默认采取的是关系型数据库作为后端存储；随着微服务、云原生场景的发展，大量数据的存储和动态容器的监控缺失成为 Zabbix 本身的限制，于是出现了 Prometheus。Prometheus 内置时序数据库 TSDB。【衍生知识点】采集模型也不同：Prometheus 主动 Pull（类似 Zabbix 的被动模式），Zabbix 则同时有主动/被动两种 agent 模式。

---

### 12. 【监控方法】Google 提出的用于服务级别监控的“四个黄金指标”是指？

**答案**

**A**　延迟 Latency、流量 Traffic、错误 Errors、饱和度 Saturation

**解析**

Google 的四个黄金指标：延迟（服务请求所需时长，需区分失败请求和成功请求）、流量（也称吞吐量，如 QPS/TPS）、错误（失败请求的数量或比例）、饱和度（衡量资源的使用情况，如 CPU、内存、存储、网络的使用量）。适用于应用及服务监控。【衍生知识点】这套指标关注“终端用户体验与服务中断”，属于服务级视角；主机级监控更常看 CPU/内存/磁盘/网络的资源水位。

---

### 13. 【架构】Prometheus 的数据获取逻辑采用的是哪种模型？

**答案**

**A**　主动从各 Target 上拉取（Pull），相当于 Zabbix 里的被动模式

**解析**

Prometheus 同其它 TSDB 相比有一个非常典型的特性：它主动从各 Target 上“拉取（pull）”数据，相当于 Zabbix 里的被动模式，而非等待被监控端的“推送（push）”。Pull 模型的优势在于集中控制：有利于将配置集在 Prometheus Server 上完成，包括指标及采集速率等。【衍生知识点】Pull 的代价是要求目标可被访问（网络可达）、且目标不能太“短命”——短命任务正是 Pushgateway 存在的理由。

---

### 14. 【架构】Alertmanager 组件的主要职责是？

**答案**

**A**　接收 Prometheus 发来的告警，进行去重、分组，并按路由将告警发送到对应接收方

**解析**

Alertmanager 从 Prometheus server 端接收到 alerts 后，会进行去除重复数据、分组，并路由到对应的接收方式，以高效向用户完成告警信息发送。常见接收方式有电子邮件、pagerduty、OpsGenie、webhook 等。【衍生知识点】Alertmanager 还提供静默（silence）与抑制（inhibition）能力，用来优化告警通知行为。

---

### 15. 【架构】Pushgateway 主要用于解决什么场景的监控数据采集？

**答案**

**A**　短生命周期（short-lived）的 jobs——可能在 Prometheus 来 pull 之前就消失了

**解析**

Pushgateway 主要用于短期的 jobs。由于这类 jobs 存在时间较短，可能在 Prometheus 来 pull 之前就消失了，因此这些 jobs 可以直接向 Prometheus server 端推送它们的 metrics。这种方式主要用于服务层面的 metrics；对于机器层面的 metrics，需要使用 node exporter。【衍生知识点】Exporter 的开发需要使用真正的编程语言、不支持 shell 这种快速脚本，而借助 Pushgateway 用 shell 脚本就能上报自定义指标，门槛低得多。

---

### 16. 【架构】关于 Prometheus 各组件的职责边界，下列说法正确的是？

**答案**

**A**　Prometheus Server 只负责时序型指标数据的采集及存储，分析、聚合、展示与告警需配合其它组件实现

**解析**

Prometheus 只负责时序型指标数据的采集及存储；其它的功能，如数据的分析、聚合及直观展示以及告警等功能并非由 Prometheus Server 所负责，需要配合其它组件实现；并支持丰富的 Exporter 实现各种应用的监控。【衍生知识点】这条“分工清晰”的原则是理解整个 Prometheus 生态的钥匙：Server（采集+存储+规则计算）、Exporter（暴露指标）、Pushgateway（推模式接入）、Alertmanager（告警处理）、Grafana（展示）。

---

### 17. 【数据模型】在 Prometheus 中，一条时间序列由什么唯一标识？

**答案**

**A**　指标名称（Metric Name）+ 标签集（Labels）

**解析**

Prometheus 中存储的数据为时间序列，每个时间序列都由 metric 名称（表示某项指标或度量）和标签（键值对形式，表示属性，为可选项）组合成唯一标识。更改任何标签值，包括添加或删除标签，都会创建一个新的时间序列。【衍生知识点】“指标名+标签”构成唯一键，也解释了一个常见坑：给指标新增一个标签维度，会导致历史曲线断裂（序列变了），因此标签应尽量保持稳定。

---

### 18. 【数据模型】关于 Metric 名称的命名规范，下列说法正确的是？

**答案**

**A**　由 ASCII 字母、数字、下划线和冒号组成，其中冒号是为用户定义的记录规则保留的

**解析**

metric 名字由 ASCII 字符、数字、下划线以及冒号组成，且必须满足正则表达式 [a-zA-Z_:][a-zA-Z0-9_:]* 的查询需求。注意：冒号是为用户定义的记录规则保留的。【衍生知识点】标签名同样受 [a-zA-Z_:][a-zA-Z0-9_:]* 约束，但“以 __ 开头的标签名称保留供内部使用”；而标签**值**可以包含任何 Unicode 字符，标签值为空的标签被认为等同于不存在的标签。

---

### 19. 【数据模型】在 Prometheus 中，Job（任务）与 Instance（实例）的关系是？

**答案**

**A**　一个 scrape 目标（<host>:<port>）称为一个 instance，一组同种类型的 instances 集合称为一个 job

**解析**

一个单独 scrape（<host>:<port>）的目标 Target 也称为一个实例 instance，通常为 IP:PORT 形式，对应于单个应用的进程。一组同种类型的 instances 集合称为一个 job，主要用于保证可扩展性和可靠性。例如一个 api-server 的 job 包含 4 个 instances。【衍生知识点】抓取后 Prometheus 会自动附加标签：job 标签的值取自配置中的 job_name，instance 标签的值默认取自 __address__ 的值。

---

### 20. 【数据模型】Prometheus 客户端库提供的四种核心度量标准类型是？

**答案**

**A**　Counter、Gauge、Histogram、Summary

**解析**

Prometheus 客户端库提供了四种核心度量标准类型：Counter（计数器）、Gauge（计量器）、Histogram（直方图）、Summary（摘要）。【衍生知识点】在/metrics 暴露的文本格式中还会出现第五种 untyped 类型（未指定类型时的默认值）——课件实测某 node_exporter 实例上 untyped 有 47 个，gauge 多达 199 个。

---

### 21. 【指标类型】关于 Counter（计数器）类型，下列说法正确的是？

**答案**

**A**　代表一个从 0 开始累积单调递增的计数器，只能在重启时增加或重置为零，不能表示递减值

**解析**

Counter 是一个累加的计数器，代表一个从 0 开始累积单调递增的计数器，其值只能在重新启动时增加或重置为零。典型应用如用户的访问量、请求的总个数、任务的完成数量或错误的总数量等。不能使用 Counter 来表示递减值，但可以重置为 0 重新计数。【衍生知识点】生产上一般不会直接看 Counter 的原值，而是用 rate()/irate()/increase() 等函数把它转成“变化率/增长量”才有意义。

---

### 22. 【指标类型】需要监控“硬盘剩余空间、当前内存使用量、待处理队列中任务个数、并发请求数”这类可增可减的瞬时状态值，应使用哪种指标类型？

**答案**

**A**　Gauge 计量器

**解析**

Gauge 是一种度量标准，只有一个简单的返回值，或者叫瞬时状态，可以代表任意上下波动的数值。通常用于指定时间的测量值，例如硬盘剩余空间、当前内存使用量、一个待处理队列中任务的个数等；还用于可能上升和下降的“计数”，例如并发请求数。【衍生知识点】Gauge 常配合 sum/avg/min/max 等聚合，以及 delta()（首尾差值）、predict_linear()（线性回归预测）一起使用。

---

### 23. 【指标类型】关于 Histogram 与 Summary 的分位数（quantile）计算位置，下列说法正确的是？

**答案**

**A**　Histogram 的分位数由 Prometheus Server 基于样本数据估算，Summary 的分位数由客户端计算并直接存储

**解析**

Histogram 在客户端仅是简单的桶划分和分桶计数，分位数计算由 Prometheus Server 基于样本数据进行估算，因而其结果未必准确，甚至不合理的 bucket 划分会导致较大的误差；Summary 则在客户端于一段时间内（默认为 10 分钟）的每个采样点进行统计，计算并存储了分位数数值，Server 端直接抓取相应值即可。【衍生知识点】由此带来的取舍：Summary 查询性能更好但分位数在客户端固定死了；Histogram 可通过 PromQL 任意定义分位数、支持聚合，灵活性更好。

---

### 24. 【指标类型】Histogram 类型的指标会衍生出多个时间序列，其中用于统计分布的桶序列命名为？

**答案**

**A**　<basename>_bucket{le="<upper inclusive bound>"}，最大桶为 le="+Inf"

**解析**

Histogram 每个指标以基础名称为前缀生成：<basename>_bucket{le="上边界"}（最大区间包含所有样本，名称为 basename_bucket{le="+Inf"}）、<basename>_sum（所有样本观测值总和）、<basename>_count（采样次数，本质是 Counter）。Prometheus 采用累积（Cumulative）区间间隔机制，每个 bucket 都包含其前面所有 bucket 的样本，因此也称累积直方图。【衍生知识点】配合 histogram_quantile() 可估算分位数，但该函数假定每个区间内样本满足线性分布，结果只是预估值，准确度取决于 bucket 划分粒度——粒度越大，准确度越低。

---

### 25. 【指标类型】关于 Summary 类型的能力边界，下列说法正确的是？

**答案**

**A**　Summary 不支持 sum 或 avg 一类的聚合运算，且分位数由客户端计算，Server 端无法获取客户端未定义的分位数

**解析**

Summary 不支持 sum 或 avg 一类的聚合运算，而且其分位数由客户端计算并生成，Server 端无法获取客户端未定义的分位数；Histogram 则可通过 PromQL 任意定义，有着较好的灵活性。Summary 以 <basename>{quantile="x"}（0≤x≤1）形式给出分位点，如 0.5/0.9/0.99。【衍生知识点】这也是为什么在 Kubernetes/微服务监控中，Histogram 的使用远比 Summary 普遍——因为聚合（多实例合并算 P99）是刚需，而 Summary 的分位数在数学上不可聚合。

---

### 26. 【部署】Prometheus 二进制安装时，官方约定的安装位置与目录划分通常是？

**答案**

**A**　/usr/local/prometheus，内部划出 bin、conf、data 三个目录

**解析**

课件中的安装脚本（install_prometheus.sh）将程序解压到 /usr/local 并创建软链接 /usr/local/prometheus，随后 mkdir -p /usr/local/prometheus/{bin,conf,data}，把 prometheus、promtool 移入 bin/，prometheus.yml 移入 conf/。【衍生知识点】data 目录是默认的存放数据目录，可以不预先创建（系统会自动创建），也可以通过启动参数 --storage.tsdb.path="data/" 修改。

---

### 27. 【部署】Prometheus 默认监听的端口是？

**答案**

**A**　9090

**解析**

Prometheus Server 默认监听 9090 端口（--web.listen-address="0.0.0.0:9090"）。访问 http://<prometheus服务器IP>:9090 即可打开 Web UI 与 PromQL 查询界面。【衍生知识点】容易混淆的一组默认端口：node_exporter 9100、Pushgateway 9091、Alertmanager 9093（集群通信 9094）、Grafana 3000、mysqld_exporter 9104、redis_exporter 9121、blackbox_exporter 9115。

---

### 28. 【部署】启动参数 --web.enable-lifecycle 的作用是？

**答案**

**A**　开启后支持通过 HTTP 请求实现 reload 加载配置和 quit 关闭服务，但存在安全风险

**解析**

--web.enable-lifecycle 可以被用来通过 HTTP 方式实现 reload 和 shutdown 功能，意味着服务可以被远程关闭，有安全风险，不建议开启，默认关闭。开启后可用 curl -X POST http://<ip>:9090/-/reload 热加载配置、curl -X POST http://<ip>:9090/-/quit 关闭服务。【衍生知识点】没有开启该选项时 reload 仍可通过 systemctl reload prometheus（本质是给进程发 SIGHUP）实现；关闭后访问 /-/reload 会返回 “Lifecycle API is not enabled.”。

---

### 29. 【部署】检查 Prometheus 配置文件与规则文件语法是否正确，应使用什么命令？

**答案**

**A**　promtool check config <prometheus.yml>、promtool check rules <rules.yml>

**解析**

promtool 是随 Prometheus 一起发布的工具：promtool check config <prometheus.yml> 校验主配置及其引用的规则文件；promtool check rules <rules.yml> 单独校验规则文件。校验通过会打印 SUCCESS 并以状态码 0 退出；有语法错误或无效参数则打印错误并以 1 退出。【衍生知识点】改配置的标准动作是：promtool 校验 → reload（systemctl reload 或 POST /-/reload）→ 到 Web 的 Status→Configuration/Targets/Rules 页面确认。

---

### 30. 【部署】Prometheus 的全局配置中，scrape_interval 的默认值与课件示例中的常用取值分别是？

**答案**

**A**　默认 1 分钟，示例常用 15 秒

**解析**

配置文件默认注释写明：scrape_interval 默认是 every 1 minute（1 分钟），课件示例中按需改为 15s；evaluation_interval（规则计算间隔）默认同样是 1 分钟，示例改为 15s。【衍生知识点】单条 job 可以覆盖全局设置（如 file_sd 示例里给某个 job 单独设 scrape_interval: 10s）；告警规则的 for 时长应当大于抓取间隔，避免因偶发抖动误报。

---

### 31. 【部署】控制 Prometheus 本地数据保留时长与保留容量的参数是？

**答案**

**A**　--storage.tsdb.retention.time（默认 15d）与 --storage.tsdb.retention.size

**解析**

--storage.tsdb.retention.time 控制样本保留时长，若该参数与 --storage.tsdb.retention.size 都未设置，则保留时长默认为 15d；--storage.tsdb.retention.size 控制 Block 可占用的最大字节数（不含 WAL）。注意：两个参数只要有一个满足条件，就会删除旧数据。--storage.tsdb.retention 已废弃。【衍生知识点】课件给出的磁盘容量估算公式：needed_disk_space = retention_time_seconds × ingested_samples_per_second × bytes_per_sample，其中 bytes_per_sample 可取约 1~2 字节。

---

### 32. 【部署】以下哪个启动参数用于限制单个查询可加载进内存的最大样本数？

**答案**

**A**　--query.max-samples（默认 50000000）

**解析**

--query.max-samples 默认 50000000，表示单个查询可加载进内存的最大样本数，超出会导致查询失败（因此也限制了查询能返回的样本数）；相关参数还有 --query.timeout（默认 2m，查询超时）、--query.max-concurrency（默认 20，并发查询数）、--query.lookback-delta（默认 5m）。【衍生知识点】--web.max-connections 默认 512、--web.read-timeout 默认 5m——这两个是 Web 层的连接保护，和查询资源限制是两回事。

---

### 33. 【Node Exporter】node_exporter 默认监听的端口与指标暴露路径是？

**答案**

**A**　9100 端口，/metrics 路径

**解析**

node_exporter 默认监听 :9100，通过 http://<ip>:9100/metrics 暴露符合 Prometheus 格式的指标文本。它的 systemd 单元通过 User=prometheus、Group=prometheus 以非 root 身份运行。【衍生知识点】node_exporter 常见指标前缀：node_cpu_*（CPU 使用量）、node_memory_*（内存）、node_disk_*（磁盘 IO）、node_filesystem_*（文件系统用量）、node_network_*（网络带宽）、node_load1（1 分钟负载）、node_boot_time_seconds（开机时间戳）、node_time（系统时间）；go_* 和 process_* 则是 exporter 自身进程的指标。

---

### 34. 【Grafana】Grafana 默认监听的端口与初始登录账号密码是？

**答案**

**A**　3000 端口，admin/admin

**解析**

Grafana 默认监听于 TCP 协议的 3000 端口，首次登录使用 admin/admin，会强制进入修改密码页面；它也支持集成其他认证服务，并能通过 /metrics 输出内建指标。【衍生知识点】Grafana 本身也可被 Prometheus 监控——把 grafana:3000/metrics 加入 Prometheus 配置后，即可用内置的 “Grafana metrics” 模板展示 Grafana 自身状态。

---

### 35. 【Pushgateway】配置 Prometheus 抓取 Pushgateway 数据时，honor_labels: true 的作用是？

**答案**

**A**　让 Prometheus 使用 Pushgateway 上的 job 和 instance 标签，避免自身标签覆盖源标签

**解析**

honor_labels: true 时，Prometheus 将使用 Pushgateway 上的 job 和 instance 标签；如果设置为 false，那么它将重命名这些值，在它们前面加上 exported_ 前缀，并在服务器上为这些标签附加新值。推送时 URL 中的 <job_name> 会成为 Pushgateway 中的 job 名称，而在 Prometheus 中体现为新增标签 exported_<job_name> 的值。【衍生知识点】联邦抓取（/federate）同样需要开启 honor_labels，否则上级 Prometheus 的 job/instance 会覆盖掉从下级带过来的标签，导致“看不出数据来自哪个分片”。

---

### 36. 【Pushgateway】关于 Pushgateway 的缺点，下列说法错误的是？

**答案**

**A**　Pushgateway 会自己判断并丢弃异常数据，只上报合法指标

**解析**

Pushgateway 的缺点：会形成一个单点瓶颈；将失去 Prometheus 通过 up 指标（每次抓取时生成）的自动实例运行状况监控；永远不会忘记推送给它的数据，并将它们永远暴露给 Prometheus，除非通过 API 手动删除；并不能对发送过来的数据进行更智能的判断，假如脚本中间采集出问题，有问题的数据一样照单全收发给 Prometheus。【衍生知识点】所以要“停止上报某个序列”，必须显式调用 DELETE /metrics/job/<job>/instance/<instance>；清空全部需启用 --web.enable-admin-api 后 PUT /api/v1/admin/wipe。

---

### 37. 【PromQL】PromQL 表达式的计算结果可以为四种类型，下列说法正确的是？

**答案**

**A**　instant vector（即时向量）、range vector（范围向量）、scalar（标量）、string（字符串）

**解析**

PromQL 表达式的计算结果可为：instant vector 即时向量（具有相同时间戳的一组样本值集合）、range vector 范围向量（每个序列随时间变化的一系列数据点）、scalar 标量（一个简单的浮点数值）、string 字符串（当前并未使用）。【衍生知识点】表达式使用有强类型约束：需要绘制成图形时仅支持即时向量类型；而 rate 一类速率函数要求必须传入范围向量——若把范围向量直接画图，浏览器会报 “invalid expression type "range vector" for range query, must be Scalar or instant Vector”。

---

### 38. 【PromQL】关于标签匹配器中的正则匹配 =~，下列说法正确的是？

**答案**

**A**　正则表达式的匹配是完全锚定（整值匹配）的，要匹配前缀必须写成 ^ge.* 而不是 ^ge

**解析**

匹配器支持 4 种操作符：=（精确匹配）、!=（不匹配）、=~（正则匹配）、!~（正则不匹配）。正则表达式将执行完全锚定机制，需要匹配指定标签的整个值——例如 {method=~"^ge"} 是错误的，应该是 {method=~"^ge.*"}。多个条件可用逗号分隔，条件内多值可用 “|” 表示或，如 env=~"staging|testing|development"。【衍生知识点】匹配到空标签值的匹配器时，所有未定义该标签的时间序列同样符合条件；向量选择器至少要包含一个指标名称，或条件中至少有一个非空标签值的选择器（不能写成 {job=~".*"}）。

---

### 39. 【PromQL】rate() 与 irate() 的核心区别是？

**答案**

**A**　rate 取时间范围内所有数据点算出一组速率再取平均；irate 只用最近两个样本点计算瞬时速率，对突发峰值更敏感

**解析**

rate 计算的是指定时间范围内计数器每秒增加量的平均值（(last 值-first 值)/时间差的秒数），irate 则取时间范围内最近两个数据点来计算瞬时速率。官网文档表述：irate 适合快速变化的计数器，rate 适合缓慢变化的计数器。对于快速变化的计数器，如果使用 rate，因为使用了平均值，很容易把峰值削平。【衍生知识点】两者都要求传入范围向量且用于 Counter；画图时 irate 峰值变化大、rate 曲线较为平缓，CPU 使用率常写 (1 - avg(irate(node_cpu_seconds_total{mode='idle'}[5m])) by (instance)) * 100。

---

### 40. 【PromQL】PromQL 的聚合操作符中，用于按标签分组的两个修饰符是？

**答案**

**A**　by（仅按指定标签分组统计）与 without（排除指定标签，对其余标签分组统计）

**解析**

聚合操作共有 11 种：sum、min、max、avg、count、count_values、stddev、stdvar、bottomk、topk、quantile。by 表示仅显示指定标签的分组统计（针对哪些标签分组）；without 表示排除此处指定的标签列表，对以外的标签进行分组统计。格式：<aggr-op>([parameter,] <vector expression>) [without|by (<label list>)]。【衍生知识点】不要混淆：on/ignoring 是二元运算的向量匹配关键字（ignoring 定义匹配时忽略的标签、on 定义只使用哪些标签），group_left/group_right 是一对多/多对一的组修饰符，它们不属于聚合操作。

---

### 41. 【标签管理】关于 relabel_configs 与 metric_relabel_configs 的区别，下列说法正确的是？

**答案**

**A**　relabel_configs 在 scrape 目标之前生效、针对 target 本身；metric_relabel_configs 在 scrape 之后生效、针对抓取到的 metric，是保存数据前的最后一步

**解析**

relabel_configs 用于 scrape 目标上 metric 前的标签设置，在 scrape_configs 前生效，针对的是 target 对象本身；metric_relabel_configs 作用于 scrape_configs 生效后，即针对 target 对象上的 metric 监控数据，是 Prometheus 在保存数据前的最后一步标签重新编辑，默认情况下它会将监控不需要的数据直接丢掉、不在 Prometheus 中保存。【衍生知识点】relabel 期间可使用 target 上以 __meta_ 开头的元标签；重新标记完成后，该 target 上以 __ 开头的所有标签都会被移除，若需临时存储标签值要用 __tmp 前缀以避免冲突。

---

### 42. 【标签管理】relabel_configs 的 action 字段中，用于“删除标签（相当于黑名单）”和“只保留标签（相当于白名单）”的分别是？

**答案**

**A**　labeldrop 与 labelkeep

**解析**

创建或删除标签类动作：labeldrop（source labels 中指定的标签名称与 regex 匹配则删除此标签，相当于标签黑名单）、labelkeep（匹配则保留，不匹配则删除，相当于标签白名单）、labelmap（对标签名称做正则匹配后生成新标签，旧标签仍存在）。此外 replace 为默认动作；keep/drop 针对“指标/目标”的保留与删除（每个指标名称对应一个 target 或 metric）；还有 hashmod、lowercase、uppercase。【衍生知识点】组合使用的经典案例：先用 labelmap 把 (job|app) 重命名生成 job_name/app_name，再用 labeldrop 删掉旧的 job/app 标签——顺序不能颠倒。

---

### 43. 【告警】一条告警规则中的 for 字段含义与告警状态流转是？

**答案**

**A**　条件表达式持续满足该时长后才真正告警；此前为 pending 状态，之后变为 firing

**解析**

for 表示条件表达式被触发后，一直持续满足该条件长达此处时长后才会告警，即发现满足 expr 表达式后、在告警前的等待时长，默认为 0。此时间前为 pending 状态，之后为 firing。此值应该大于抓取间隔时长，避免偶然性的故障。【衍生知识点】告警三种状态：Inactive（正常）、Pending（已触发阈值但未满足 for 持续时间）、Firing（已触发阈值且满足 for 持续时间）。恢复后会发送恢复通知（send_resolved: true）。

---

### 44. 【告警】Alertmanager 默认的 Web 监听端口与集群（HA）通信端口分别是？

**答案**

**A**　9093 与 9094

**解析**

Alertmanager 默认 Web 监听 9093（--web.listen-address=":9093"），集群 HA 模式使用 9094（--cluster.listen-address），主机上会出现这两个端口。课件提示：最好显式配置 --web.listen-address，因为默认配置是 :9093，有可能在启动时候报错。【衍生知识点】Alertmanager 高可用有两种实现：前置负载均衡，以及基于 Gossip 谣言协议的多实例集群；提示重载配置可用 curl -XPOST localhost:9093/-/reload。

---

### 45. 【告警】Alertmanager 路由的默认时间参数 group_wait、group_interval、repeat_interval 分别是？

**答案**

**A**　30s、5m、4h

**解析**

group_wait 默认 30s：发出一组告警通知的初始等待时长（允许等待一个抑制告警到达或收集同一组的更多初始告警）；group_interval 默认 5m：发送关于新告警的消息之前需要等待多久（新告警将被添加到已发送初始通知的告警组中）；repeat_interval 默认 4h：成功发送告警后再次发送告警信息需要等待的时长（一般至少为 3 个小时）。【衍生知识点】根路由（顶级 route）必须匹配所有告警，不能有 match；新版使用 matchers 替换了 match 与 match_re 指令。

---

### 46. 【存储】Prometheus 本地 TSDB 以多长时间为一个 Block 时间窗口？WAL 文件段的默认大小是多少？

**答案**

**A**　2 小时；128MB

**解析**

最新的数据保存在内存中的，并同时写入预写日志（WAL）；以每 2 小时为一个时间窗口，将内存中的数据存储为一个单独的 Block；Block 会被压缩及合并历史 Block 块；Block 的大小并不固定，但最小会保存 2 个小时的数据。WAL 被分割为默认为 128MB 大小的文件段，它们都位于 WAL 目录下；Prometheus 至少保留 3 个预写日志文件。【衍生知识点】exporter 的 chunks 目录中每个 chunk 文件的默认最大上限为 512MB（达到上限则截断并创建另一个 Chunk 文件）——512MB 是 chunk 上限，不是 WAL 段大小，两个数值不要混淆。

---

### 47. 【远程存储】VictoriaMetrics（VM）默认的监听端口与实现的查询语言分别是？

**答案**

**A**　8428；MetricsQL（基于 PromQL 改进）

**解析**

VictoriaMetrics 默认监听 0.0.0.0:8428（-httpListenAddr），数据目录默认当前目录下的 victoria-metrics-data（-storageDataPath），保留时长由 -retentionPeriod 控制（支持 h/d/w/y，不带后缀则按月计）。它实现了基于 PromQL 的查询语言 MetricsQL，在 PromQL 之上提供了改进的功能；同时支持 Prometheus 查询 API 与 Graphite API，可作为 Grafana 中两者的直接替代品。【衍生知识点】它与 Thanos 的核心差异：VM 是“本地全量持久化 + 可水平扩容”，而 Thanos 的很多历史数据存放在对象存储中、查询需从对象存储拉取，因此 VM 性能更好；官方建议数据点低于 100w/s 时用单节点（但不支持告警），集群版支持水平拆分。

---

### 48. 【数据模型】metric 名称由 ASCII 字符、数字、下划线和______组成，其中______是为用户定义的记录规则保留的。

**答案**

- 第 1 空：冒号 / : / ：
- 第 2 空：冒号 / : / ：

**解析**

metric 名字必须满足正则表达式 [a-zA-Z_:][a-zA-Z0-9_:]*，冒号是为用户定义的记录规则保留的。标签名规则类似，但以 __ 开头的名称保留供内部使用。【衍生知识点】标签**值**的限制比名称宽松得多：可以包含任何 Unicode 字符，而且“标签值为空的标签被认为等同于不存在的标签”。

---

### 49. 【数据模型】Prometheus 中一个单独 scrape（<host>:<port>）的目标称为一个______，一组同种类型的集合称为一个______。

**答案**

- 第 1 空：instance / 实例 / target / 目标
- 第 2 空：job / 任务

**解析**

一个单独 scrape 的目标 Target 也称为一个实例 instance（通常是 IP:PORT 形式，对应单个应用进程）；一组同种类型的 instances 集合称为一个 job（任务），主要用于保证可扩展性和可靠性。【衍生知识点】抓取后自动附加的标签中，job 取自 job_name，而 instance 默认取自 __address__ 的值——这也是为什么“改了 target 地址，曲线会断”的常见原因。

---

### 50. 【存储】Prometheus 以每______小时为一个时间窗口将内存中的数据存储为一个单独的 Block；WAL 被分割为默认______MB 大小的文件段。

**答案**

- 第 1 空：2 / 二 / 两
- 第 2 空：128

**解析**

以每 2 小时为一个时间窗口，将内存中的数据存储为一个单独的 Block，Block 会被压缩及合并；WAL 被分割为默认 128MB 大小的文件段，位于 WAL 目录下，Prometheus 至少保留 3 个预写日志文件以保证至少 2 小时的原始数据。【衍生知识点】之所以是 2 小时，源于 Gorilla 论文的观察结论——压缩率在 2 小时时达到最高，保留时间更短就无法最大化压缩（该值由 --storage.tsdb.min-block-duration 控制）。

---

### 51. 【端口】Prometheus 默认监听______端口，Alertmanager 默认 Web 端口为______，其集群（HA）通信端口为______。

**答案**

- 第 1 空：9090
- 第 2 空：9093
- 第 3 空：9094

**解析**

Prometheus 默认 9090（--web.listen-address="0.0.0.0:9090"）；Alertmanager 默认 Web 9093，集群地址默认 9094。主机上会同时看到这两个 Alertmanager 端口。【衍生知识点】便于对照的一整套默认端口：Pushgateway 9091、node_exporter 9100、mysqld_exporter 9104、redis_exporter 9121、blackbox_exporter 9115、Grafana 3000、VictoriaMetrics 8428、cAdvisor 8080。

---

### 52. 【端口】node_exporter 默认监听______端口，Grafana 默认监听______端口。

**答案**

- 第 1 空：9100
- 第 2 空：3000

**解析**

node_exporter 默认监听 :9100，指标路径为 /metrics；Grafana 默认监听 TCP 3000，首次登录 admin/admin。【衍生知识点】Grafana 自带 /metrics 端点，把 grafana:3000/metrics 加入 Prometheus 的抓取配置，就能用内置 Dashboard 监控 Grafana 自身。

---

### 53. 【存储】控制样本保留时长的参数 --storage.tsdb.retention.time 默认为______天；Prometheus 默认把数据存储在安装目录下的______目录。

**答案**

- 第 1 空：15 / 十五
- 第 2 空：data / data/ / ./data/

**解析**

--storage.tsdb.retention.time 若未设置（且未设置 retention.size），保留时长默认 15d；--storage.tsdb.path 默认 data/（安装目录下的 data 子目录）。两个参数值（time 与 size）只要有一个满足条件，就会删除旧数据。【衍生知识点】课件建议：存储路径应放在独立分区，防止把根目录塞满；企业中一般设置保留 15 天为宜。

---

### 54. 【告警】告警规则中，______字段表示条件持续满足多久后才真正告警；告警状态会由 pending 转变为______。

**答案**

- 第 1 空：for
- 第 2 空：firing / Firing / 触发

**解析**

for 表示条件表达式被触发后，一直持续满足该条件长达此处时长后才会告警，默认为 0；此时间前为 pending 状态，之后为 firing。该值应大于抓取间隔时长，避免偶然性故障引发误报。【衍生知识点】三种告警状态：Inactive（正常）、Pending（已触发阈值但未满足 for）、Firing（已触发且满足 for）。

---

### 55. 【告警】Alertmanager 路由中 group_wait 默认______，group_interval 默认______，repeat_interval 默认______。

**答案**

- 第 1 空：30s / 30秒 / 30 s
- 第 2 空：5m / 5分钟 / 5 m
- 第 3 空：4h / 4小时 / 4 h

**解析**

group_wait 默认 30s（一组告警通知的初始等待时长）；group_interval 默认 5m（发送新告警消息前的等待时长，一般 5 分钟或以上）；repeat_interval 默认 4h（成功发送后再次发送的等待时长，一般至少 3 小时）。【衍生知识点】route 的 receiver 是必须项，否则程序启动不成功；continue 默认 false，即遇到第一个匹配的分支后即终止，设为 true 会继续匹配后续子节点。

---

### 56. 【联邦】上级 Prometheus 从另一个 Prometheus 抓取数据使用的是______端点，且必须至少指定一个______ URL 参数；为避免自身标签覆盖源标签，还需启用______选项。

**答案**

- 第 1 空：/federate / federate
- 第 2 空：match[] / match / match[]参数
- 第 3 空：honor_labels / honor_labels: true

**解析**

在任何给定的 Prometheus 服务器上，/federate 端点允许检索该服务器中所选时间序列集的当前值；必须至少指定一个 match[] URL 参数（需为即时向量选择器），提供多个 match[] 则取所有匹配系列的并集；同时需启用 honor_labels 抓取选项以不覆盖源服务器公开的任何标签。【衍生知识点】联邦配置里 metrics_path 要显式写成 '/federate'，采集间隔常设 15s。

---

### 57. 【联邦】Prometheus 联邦有______联邦和______联邦两种模式，其中前者较为常用且配置简单。

**答案**

- 第 1 空：分层 / 分层式 / hierarchical
- 第 2 空：跨服务 / 跨服务式 / cross-service

**解析**

联邦模式有分层联邦和跨服务联邦两种模式，分层联邦较为常用且配置简单。分层联邦允许 Prometheus 扩展到具有数十个数据中心和数百万个节点的环境，拓扑类似树：较高级别的 Prometheus 从大量从属服务器收集聚合时间序列数据，同时提供聚合的全局视图和详细的本地视图。跨服务联邦则是一个服务的 Prometheus 从另一个服务的 Prometheus 中提取所选数据，以便在单个服务器中对两组数据集启用告警与查询。【衍生知识点】阿里云全球监控告警架构即采用三层联邦：边缘 Prometheus（下沉到每个元集群）→ 级联 Prometheus（汇聚大区域）→ 中心 Prometheus（双活，全局视图与告警）。

---


## Prometheus面试

### 58. 【面试】请简述 Prometheus 的整体架构，以及各核心组件的职责。

**答案**

Prometheus 由几个主要组件构成，各司其职：
1）Prometheus Server：核心组件，负责时序数据的抓取（scrape）、存储（内置 TSDB）与规则计算（记录规则/告警规则），彼此独立运行，仅依靠本地存储实现核心功能。
2）Client Library 客户端库：为需要监控的服务生成相应 metrics 并暴露给 Prometheus Server，Server 来 pull 时直接返回实时状态的 metrics（Instrumentation，适合天然支持 Prometheus 的新应用）。
3）Exporter：部署到第三方软件主机上，把原本不支持 Prometheus 的应用的原始格式数据采集、聚合并转换为 Prometheus 格式，以 http 方式暴露（如 node_exporter 9100、mysqld_exporter 9104）。
4）Pushgateway：为无法被抓取的短生命周期 job 提供推送入口，job 主动 push 数据，Server 再 pull。
5）Alertmanager：接收 Server 发来的告警，做去重、分组、路由，并按静默/抑制规则发送邮件、微信、钉钉、webhook 等通知。
6）Service Discovery：动态发现待监控 Target，由 Server 内建支持（文件、DNS、Consul、K8s 等）。
7）可视化：Prometheus 自带 Web UI（集群状态管理 + PromQL 查询），以及 Grafana 等第三方可视化。
工作流程：Server 定期从 jobs/exporters 拉取指标（或接收 Pushgateway 推送、从其它 Prometheus 联邦拉取）→ 本地存储并运行告警规则 → 将告警推给 Alertmanager → Alertmanager 去重分组后路由发送；Grafana 或 API 消费数据做展示。
关键理解：Prometheus 只负责时序指标数据的采集及存储，分析、聚合、展示、告警均需配合其它组件完成。

**解析**

答题要点：① 先给“分工清晰”的总纲——Server 只管采集+存储+规则计算；② 逐个点出 7 类组件及其一句话职责；③ 用数据流串起来（Pull → 本地 TSDB → 规则 → Alertmanager → 通知；Grafana 展示）；④ 提一句大多数组件用 Go 编写、静态二进制易部署。

---

### 59. 【面试】Prometheus 的 Pull（拉）与 Push（推）模式有何区别？Pushgateway 适用什么场景、有哪些缺点？

**答案**

一、Pull（拉）模式——Prometheus 的原生方式
Prometheus Server 主动从各 Target 上周期性地 pull 数据，相当于 Zabbix 里的被动模式。优势是集中控制：抓取配置（目标、指标、采集速率）集中在 Prometheus Server 上完成。限制是必须能网络可达目标，且目标要“活得够久”——短命任务来不及被抓到。
二、Push（推）模式——由 Pushgateway 承载
Pushgateway 是一项中介/代理服务，允许从无法被抓取的作业中推送指标。短生命周期 job（如批处理、定时脚本）主动把指标推给 Pushgateway，Prometheus 再周期性向 Pushgateway 拉取。Pushgateway 可运行在任何节点，不一定要在被监控客户端上。
三、Pushgateway 的缺点
1）单点瓶颈：多个应用同时推给一个 pushgateway 进程，进程故障则数据无法获取。
2）失去 up 指标：up 是每次抓取时生成的，走推送就没有这个自动健康判断能力。
3）数据永不过期：Pushgateway 永远不会忘记推送给它的数据，会一直暴露给 Prometheus，除非通过 API 手动删除（DELETE /metrics/job/<job>[/instance/<instance>]，全清需 --web.enable-admin-api 后 PUT /api/v1/admin/wipe）。
4）无数据校验：不做更智能的判断，脚本采集出错时异常数据照单全收。
四、选用原则
机器级别的指标必须用 node exporter（拉），服务层面的短命任务指标才用 Pushgateway（推），且要配合 honor_labels: true 保留源标签。

**解析**

答题要点：① 讲清 Pull 是原生、Push 是补充；② Pushgateway 的关键词是“short-lived jobs / 无法被抓取”；③ 缺点必答单点、up 指标失效、数据不自动过期，并给出删除方法；④ 补一句“机器级指标不要用 Pushgateway”。

---

### 60. 【面试】Prometheus 与 Zabbix 有什么区别？如何选型？

**答案**

1）后端存储不同：Zabbix 诞生时业务数据量不多，默认采用关系型数据库（MySQL/PostgreSQL）作为后端存储；Prometheus 内置专为时序设计的 TSDB，压缩比高（单点 1~2 字节）、写入快（单机每秒百万级样本）。
2）数据模型不同：Prometheus 是多维数据模型，由“指标名 + 键值对标签”唯一标识一条时间序列，天然支持多维过滤与聚合；Zabbix 更偏传统的主机-监控项模型。
3）采集模型不同：Prometheus 主动 Pull（相当于 Zabbix 的被动模式），配置集中在服务端；Zabbix 支持 agent 主动与被动两种模式。
4）动态环境适应力不同：Prometheus 内建 20 多种服务发现（文件、DNS、Consul、K8s API 等），非常适合微服务/容器这种 IP 频繁变动的场景；Zabbix 在这方面较弱，大量数据存储与动态容器监控的缺失正是其限制所在。
5）查询与告警：Prometheus 提供函数式查询语言 PromQL（实时查询与聚合），告警由独立的 Alertmanager 处理（去重/分组/抑制/静默/路由）；Zabbix 报警内置但表达力相对有限。
6）生态定位：Prometheus 已成为容器与云原生监控的事实标准（CNCF 第二个托管项目、继 K8s 之后），与 K8s 结合实现服务发现和对动态调度服务的监控优势明显。
选型建议：传统物理机/虚拟化的稳态业务、需要完备的资产台账与内置告警，Zabbix 更省事；容器化、微服务、动态扩缩容、需要多维指标聚合与强大生态（Grafana + Exporter 全家桶）的场景选 Prometheus。两者也可并存——Prometheus 管云原生，Zabbix 管传统资产。

**解析**

答题要点：从“存储、数据模型、采集方式、动态环境适应力、查询与告警、生态”六个维度对比；结尾给出“稳态选 Zabbix、动态云原生选 Prometheus，可并存”的选型结论，比单纯罗列差异更能体现判断力。

---

### 61. 【面试】什么是时间序列数据？时序数据库（TSDB）有哪些特点？

**答案**

时间序列数据（Time Series Data）：按照时间顺序记录系统、设备状态变化的数据称为时序数据，每个数据称为一个样本。数据库以时间为横坐标、以数据为纵坐标。IT 监控领域的“样本数据”不是一次性使用的，单个数据没有意义，必须带时间属性存储下来以便后续聚合，因此称为 TS（Time series data），存储它的数据库称为 TSDB。
TSDB 的典型特点：
1）大部分时间都是顺序写入操作，很少涉及修改数据；
2）删除操作都是删除一段时间的数据，而不涉及无规律数据的删除；
3）读操作一般都是升序或降序；
4）使用高效的数据压缩算法，节省存储空间、降低 IO——单个数据点的平均存储空间可降到 1~2 个字节，降低约 90% 存储占用；
5）高性能读写：每秒百万级数据点写入，亿级数据点聚合结果秒级返回；
6）数据结构简单：某一度量指标在某一时间点只有一个值，没有复杂的结构（嵌套、层次）和关系（关联、主外键）；
适用场景：物联网设备监控、企业能源管理系统（EMS）、生产安全监控、电力检测、系统运维与业务实时监控等。

**解析**

答题要点：先给定义（按时间顺序记录状态变化、每点为一个样本），再逐条列 6 个特点（顺序写少修改、按时间段删除、升降序读、高压缩、高性能、结构简单）；最后补一句典型应用场景（IoT/EMS/监控）即可。

---

### 62. 【面试】Prometheus 的四种指标类型有什么区别？Histogram 与 Summary 该如何选择？

**答案**

四种核心类型：
1）Counter（计数器）：从 0 开始累积单调递增，只能在重启时增加或重置为 0，不能表示递减值。典型如访问量、请求总个数、完成任务数、错误总数。
2）Gauge（计量器）：只有一个简单返回值，代表可任意上下波动的瞬时状态。典型如硬盘剩余空间、当前内存使用量、待处理队列任务数、并发请求数。
3）Histogram（直方图）：统计数据分布，客户端只做桶划分与分桶计数，分位数由 Prometheus Server 用 histogram_quantile() 估算。生成 <basename>_bucket{le="..."}（累积区间，最大桶 le="+Inf"）、_sum、_count。
4）Summary（摘要）：类似 Histogram，但分位数在客户端计算并直接存储，以 <basename>{quantile="x"}（0≤x≤1）暴露，另有 _sum、_count。
Histogram 与 Summary 的核心区别与选型：
- 计算位置：Histogram 分位数由服务端估算（仅预估值，准确度取决于 bucket 粒度，粒度越大准确度越低）；Summary 分位数在客户端于一段时间内（默认 10 分钟）统计并存储，Server 直接抓取，查询性能更好。
- 聚合能力：Summary 不支持 sum 或 avg 一类的聚合运算，且 Server 端无法获取客户端未定义的分位数；Histogram 可通过 PromQL 任意定义分位数，可以聚合。
- 资源消耗：Histogram 的累积区间机制使分位数计算消耗更多资源但维护成本较低；Summary 在客户端消耗更多计算。
选型建议：需要多实例聚合、需要灵活调整分位数（如统一看 P90/P95/P99）、K8s/微服务场景 → 选 Histogram；只需要单实例的固定分位数、追求查询性能 → 可考虑 Summary。实践中 Histogram 更主流，因为“分位数不可聚合”是硬伤。

**解析**

答题要点：四种类型各给一句语义 + 一个典型例子；Comparison 部分抓两点——① 分位数算在客户端还是服务端；② Summary 不能聚合、Histogram 可以。最后给选型结论：默认用 Histogram，因为聚合是刚需。

---

### 63. 【面试】请说明 Prometheus 本地存储（TSDB）的存储机制。

**答案**

1）整体结构
Prometheus 采用自定义格式把时间序列数据存储在本地硬盘上。数据按每 2 小时为一个时间窗口切分为 Block，每个 Block 是一个独立目录（形如 01GH5S5W4PDFXCS40VF7NZCP0G），内部包含 chunks（时序数据）、index（索引）、meta.json（元数据）、tombstones（软删除标记）。
2）关键文件的作用
- chunks：时序数据文件，样例被分组到一个或多个段文件中，以数字编号（如 000001），单个 chunk 文件默认最大上限 512MB，达到上限则截断并新建。
- index：索引文件，是 TSDB 实现高效查询的基础，可通过 Metrics Name 和 Labels 查找时间序列在 chunk 文件中的位置。
- meta.json：Block 的元数据（样本数、时间范围、合并信息等），是 Block 合并、删除等操作的基础依赖。
- tombstones：软删除（标记删除）信息，不立即删除 chunk segment 中的数据以降低删除开销，读取时按 tombstones 过滤已删除部分。
3）内存与 WAL
最新数据保存在内存（Head 块）中，同时写入预写日志 WAL。传入的样本首先进入 Head 并在内存停留默认 2 小时，随后被刷写到磁盘并映射回内存（mmap）；内存存储的只是引用，需要时通过引用动态加载 chunk。WAL 是事件的顺序日志，先记日志再落 Block，用于保证原子性并在崩溃重启时重放恢复数据。WAL 被分割为默认 128MB 的文件段，至少保留 3 个。
4）压缩机制
compactor 定时把内存数据打包到磁盘，并对历史 Block 做压缩合并（compaction），合并后 Block 数量减少；超过保留期限的 Block 最终被删除。之所以 Block 最小 2 小时，是因为压缩率在 2 小时时达到最高。
5）TSDB 三个版本演进
v1.0 基于 LevelDB，每秒 5 万样本；v2.0 基于 LevelDB + Facebook Gorilla 压缩算法（单样本约 3.5byte），每秒 8 万样本；v3.0 自研 Prometheus 数据库（2.0 时引入），单机每秒可处理数百万样本。
6）局限与出路
本地存储阻碍了 Prometheus 集群化的实现，存在单点可用性与性能瓶颈；集群中可用 VictoriaMetrics、Thanos、InfluxDB 等做远程存储，或通过 adapter 间接写入 Elasticsearch/PostgreSQL。

**解析**

答题要点：按“Block 切分 → 目录结构四件套 → 内存+WAL → 压缩合并 → 版本演进（5 万/8 万/数百万样本）→ 本地存储局限与远程存储”这条主线讲，特别注意 512MB 是 chunk 上限、128MB 是 WAL 段这两组数值要区分清楚。

---

### 64. 【面试】为什么说 Prometheus 不适合做计费用途？

**答案**

Prometheus 的设计目标是提高可靠性，使其成为系统中断期间可依赖的诊断工具——每个 Prometheus 服务器都是独立的，不依赖网络存储或其它远程服务，当基础架构其它部分故障时你仍可以依靠它。
但正因为重视可靠性，它牺牲了准确性：如果你需要 100% 的准确性，Prometheus 并不是一个不错的选择，因为所收集的数据可能不会足够详细和完整。典型原因包括：
1）抓取可能失败或超时，导致样本缺失，而 Prometheus 不会“补齐”丢失的样本；
2）范围向量选择器返回的数据虽然抓取时间点相同，但不同时间序列的时间戳并不会严格对齐，多个 Target 上的数据抓取需要分散在抓取时间点前后一定的时间范围内以均衡 Server 负载——因此 Prometheus 在**趋势上准确，但并非绝对精准**；
3）指标本身是聚合后的“采样”，而非逐笔的原始交易流水，缺少计费所需的明细与可审计性。
正确做法：计费类业务使用专门的、面向准确性设计的系统来收集和分析原始数据，而把 Prometheus 用于其余的监控场景。

**解析**

答题要点：核心是“可靠性优先于精确性”这一设计取舍，再给出三条技术原因（抓取可能失败/时间戳不严格对齐/指标是聚合采样而非流水），最后给结论——计费用专用系统，Prometheus 做监控。

---

### 65. 【面试】PromQL 有哪几种表达式返回类型？它们分别适用于什么场景？

**答案**

PromQL 表达式的计算结果可以为以下四种类型：
1）instant vector 即时向量：具有相同时间戳的一组样本值集合，即“某一时刻抓取的所有监控项数据”。图形展示仅支持这一类型。
2）range vector 范围向量：指定时间范围内的所有时间戳上的数据指标，即“一个时间段内抓取的所有监控项数据”，是一组时间序列各自随时间变化的一系列数据点。range 选择器几乎总是结合 rate 一类速率函数使用。
3）scalar 标量：一个简单的浮点类型数值（只有大小没有方向）。可用 scalar() 函数把即时向量转换而来。
4）string 字符串：一个简单字符串类型，目前并未实际使用（currently unused）。字符串可用单引号、双引号或反引号指定为文字；若字符串内的特殊符号想保持原样，可用反引号。
使用要点（类型约束）：
- 需要将返回值绘制成图形时，仅支持即时向量类型的数据；
- 对于 rate 一类的速率函数，其要求使用的必须是范围向量型的数据；
- 把范围向量直接用于图形绘制会报错：invalid expression type "range vector" for range query, must be Scalar or instant Vector；
- 默认情况下，PromQL 以当前时间为基准点进行数据获取，取历史数据需配合 offset。

**解析**

答题要点：四种类型要能准确说出“是什么”；务必补上两条类型约束（画图只认即时向量、rate 只吃范围向量），这是面试官判断你是否真的用过 PromQL 的分水岭。

---

### 66. 【面试】rate() 和 irate() 有什么区别？实际工作中如何选择？

**答案**

两者都用于计算 Counter 指标的变化速率，但计算方式不同：
- rate()：计算在指定时间范围内计数器每秒增加量的平均值，即 (last 值 - first 值) / 时间差的秒数。它取指定时间范围内所有数据点，算出一组速率后取平均值作为结果。常用于求某个时间区间内的请求速率，也就是常说的 QPS。
- irate()：查看瞬时变化率，即 (last 值 - last 前一个采样的值) / 时间戳差值。它是高灵敏度函数，基于样本范围内的最后两个样本进行计算。
差异的本质与影响：rate 只反映区间平均速率，无法反映突发变化。例如一分钟内前 50 秒请求量都在 0~10，最后 10 秒暴增到 100 以上，rate 算出的值会把这个峰值削平；irate 则能敏锐捕捉到这个尖峰。
选择原则：
- irate 适合快速变化的计数器，需要观察瞬时抖动/尖峰时使用（曲线峰值变化大）；
- rate 适合缓慢变化的计数器，适合做长期趋势与容量规划（曲线较为平缓）；
- 若一定要用 rate 看突发，应把时间区间设置得足够小，以减弱平均值削峰效应。
典型用例：CPU 使用率常用 (1 - avg(irate(node_cpu_seconds_total{mode='idle'}[5m])) by (instance)) * 100；磁盘读取速率常用 rate(node_disk_read_bytes_total[1m])。

**解析**

答题要点：① 给出两者公式差异（全部点取平均 vs 最近两点）；② 用“削峰”这个例子说明后果；③ 给出选择原则（快变用 irate、慢变用 rate）；④ 补一个真实表达式加分。

---

### 67. 【面试】什么是记录规则（Recording Rule）？为什么需要它？

**答案**

定义：记录规则（Recording rule）能够预先运行频繁用到或计算消耗较大的表达式，并将其结果保存为一组新的时间序列。它是定义在 Prometheus 配置文件中的查询语句，由 Server 加载后以类似批处理任务的方式在后台周期性（evaluation_interval）执行并记录查询结果。
为什么需要：
1）性能：在样本数据量较大、工作繁忙的 Prometheus Server 上，对于那些查询频率较高且运算较为复杂的查询，实时查询可能存在响应延迟；预计算结果的查询速度远快于每次实时查询，对仪表板尤其有用（仪表板每次刷新都要重复查询相同表达式）。
2）可读性与可维护性：把冗长的 PromQL（如 request_processing_seconds_sum / request_processing_seconds_count）固化为一个指标名，避免每次在 Grafana 里手工写长表达式、易出错——效果与 shell 中的别名相似。
3）复用：常用于跨多个时间序列生成聚合数据，告警规则中也可以引用记录规则生成的时间序列，避免实时查询带来的较长延迟。
配置方式与关键字段：
- 通过 prometheus.yml 的 rule_files 字段加载规则文件（支持 ../rules/*.yml 这种相对路径/通配写法，相对路径是相对 prometheus.yml 的路径）；
- 规则文件为 YAML 格式，结构为 groups → name（规则组名，必须唯一）、interval（执行间隔，默认取 global.evaluation_interval）、limit（限制最多可生成的序列数量）、rules → record（新指标名）、expr（PromQL）、labels（附加标签）；
- 校验：promtool check rules <file> 或 promtool check config <prometheus.yml>（会一并检查引用的规则文件）；
- 生效：systemctl reload prometheus 或 curl -X POST http://ip:9090/-/reload，在 Web 的 Status→Rules 查看。
命名惯例：官方推荐用 冒号 分隔的命名（如 job:http_inprogress_requests:sum、instance:node_cpu:avg_rate5m）——这也是 metric 名称中冒号“保留给记录规则”的原因。

**解析**

答题要点：定义 + 三条价值（性能/可读性/可复用）+ 配置要点（rule_files、groups/rules/record/expr、promtool 校验、reload 生效）+ 命名惯例（冒号专属于记录规则），最后一句把“冒号保留”这个细节串起来会很亮眼。

---

### 68. 【面试】Prometheus 与 Alertmanager 在告警链路中如何分工？告警状态如何流转？

**答案**

分工：告警能力在 Prometheus 架构中被划分为两个独立部分。
1）Prometheus 侧：通过定义 AlertRule（告警规则），周期性地对告警规则进行计算（按 evaluation_interval），如果满足触发条件就向 Alertmanager 发送告警信息。Prometheus Server 仅负责生成告警指示，不负责通知。
2）Alertmanager 侧：接收 Prometheus 或其它客户端发来的 Alerts，进行去重复、分组、按标签内容发送不同报警组（邮件、微信、Webhook），并提供静默与抑制机制来优化告警通知行为。
告警规则的核心字段：alert（告警名称）、expr（布尔型条件表达式）、for（持续满足多久才告警）、labels（如 severity 告警级别）、annotations（summary/description 等注释信息，支持模板变量）。
告警状态流转：
- Inactive：正常，表达式不满足；
- Pending：已触发阈值，但未满足告警持续时间（即 rule 中的 for 字段）；
- Firing：已触发阈值且满足告警持续时间，此时才会推送给 Alertmanager 并发出通知。
服务恢复后（表达式不再满足）会进入恢复流程，配置 send_resolved: true 时会收到恢复通知。
关键约束：for 的时长应大于抓取间隔（scrape_interval），避免因偶发抖动误报；告警规则中查询语句较复杂时可先保存为记录规则，再查记录规则生成的时间序列参与比较，从而避免实时查询的长延迟。

**解析**

答题要点：① 强调“Prometheus 只生成告警指示、Alertmanager 负责通知”的分工；② 三种状态（Inactive/Pending/Firing）与 for 的对应关系要说准；③ 补上 for > scrape_interval 这条实践约束。

---

### 69. 【面试】Alertmanager 的去重、分组、抑制、静默、路由分别解决什么问题？

**答案**

1）去重：将多个相同的告警去掉重复的告警，只保留不同的告警——避免同一问题因多次评估被反复通知。
2）分组 Grouping：将相似的告警信息合并成一个通知。例如系统宕机导致大量告警被同时触发时，分组机制把这些告警合并为一个通知，避免一次性收到海量通知而无法快速定位问题。分组的标签、时间、接收方式都可在 Alertmanager 配置文件中设置（group_by、group_wait、group_interval）。
3）抑制 Inhibition：系统中某个组件或服务故障时，依赖它的其它组件也会随之触发告警，抑制就是避免这类级联告警的特性，让用户能把精力集中于真正的故障所在。其关键作用在于：同时存在的两组告警条件中，其中一组生效能使另一组失效（例如“主机宕机”抑制“该主机上的服务不可用”）。
4）静默 Silent：提供一个简单机制，可以快速根据标签在一定时间内对告警进行静默处理；匹配到的告警不会发送通知。通常用于系统例行维护期间，静默设置可以在 Alertmanager 的 Web 页面上进行。
5）路由 Route：将不同的告警按定制策略路由发送至不同的目标（不同的接收人或接收媒介），例如 warning 发邮件、critical 同时发邮件+电话。
补充：这些特性的入口都是 Alertmanager 的配置文件（alertmanager.yml），重载可用 curl -XPOST localhost:9093/-/reload 或重启服务。

**解析**

答题要点：五个特性各用一句话讲“解决什么问题”，并各配一个实例（去重→重复评估；分组→宕机海啸；抑制→级联告警；静默→计划维护；路由→分级通知）。能举例说明是最加分的。

---

### 70. 【面试】告警规则中的 for 字段有什么作用？配置时要注意什么？

**答案**

作用：for 表示条件表达式被触发后，需要一直持续满足该条件长达此处时长之后，才会真正触发告警。它本质上是“告警前的等待时长”，默认为 0（即表达式一满足就告警）。
它的存在解决了“偶发抖动导致误报”问题，例如网络瞬时抖动使 up 瞬间为 0，如果 for=0 就会立刻报故障；设置 for: 1m 后，只有持续 1 分钟不健康才判定为真实故障。
状态对应关系：从表达式首次满足到 for 触发之前的这段时间，告警处于 pending 状态；满足 for 之后变为 firing。因此在页面上看到 Pending 并不意味着异常，只是“观察期内”。
注意事项：
1）for 的时长应该大于抓取间隔（scrape_interval），否则单次抓取抖动就可能直接进入 firing，for 失去意义；
2）for 不宜设置过长，否则会延误真实故障的发现，需按业务容忍度权衡（通常 1m~10m）；
3）Prometheus 重启期间会涉及 for 状态的恢复，相关行为由 --rules.alert.for-outage-tolerance（默认 1h）与 --rules.alert.for-grace-period（默认 10m）控制：前者定义容忍 Prometheus 中断以恢复 for 状态的最大时长，后者定义告警与恢复 for 状态之间的最小时长；
4）配合 annotate 中的 {{ $value }} 把触发时的实际值带进通知，便于判断严重程度（需在 annotations 里显式定义 value 字段才能在模板中引用）。

**解析**

答题要点：先讲“告警前等待时长 + 默认 0”，再讲 pending/firing 的对应关系；注意事项至少答出“for 要大于 scrape_interval”这条硬约束，能补上 for-outage-tolerance/for-grace-period 两个参数就算深度加分。

---

### 71. 【面试】如何配置 Alertmanager 的告警路由？根路由有什么限制？

**答案**

路由模型：Alertmanager 的 route 配置段支持定义“树”状路由表，入口位置称为根节点，每个子节点可以基于匹配条件定义出一个独立的路由分支。所有告警都将进入路由根节点，而后进行子节点遍历。
核心配置项：
- receiver：默认信息的接收者，**这一项是必须选项，否则程序启动不成功**；
- group_by：分组时使用的标签，一旦指定，Alertmanager 将按这些标签分组（默认所有告警组织在一起）；
- continue：在匹配成功的前提下是否继续进行深层次的告警规则匹配（默认 false，即遇到第一个匹配的分支后即终止）；
- matchers：基于标签匹配判断当前告警是否进入该分支，支持 =、!=、=~、!~（新版用 matchers 替换了旧的 match 与 match_re 指令）；
- group_wait / group_interval / repeat_interval：默认 30s / 5m / 4h；
- routes：子路由列表。
根路由的限制：每一个告警都会从配置文件中顶级的 route 进入路由树，**顶级的 route 必须匹配所有告警，不能有 match 和 match_re**（即不能在根节点做条件过滤）。
实现分组路由的思路：先在 Prometheus 的告警规则中给不同告警打上不同 label（如 severity: critical / warning），再在 Alertmanager 中针对不同 label 配置不同的子路由指向不同 receiver，即实现了按级别/按业务分流。
典型示例：route 下 group_by: ['alertname','cluster']，receiver: 'email'；子路由用 matchers: [severity =~ "warning|critical"] 分流。

**解析**

答题要点：① 用“树 + 根节点 + 子分支”说明模型；② 必须点出两条硬约束——receiver 必填、根路由不能有匹配条件；③ 给出“Prometheus 打标签 → Alertmanager 按标签分流”的落地思路；④ 顺带说明新版 matchers 替代 match/match_re。

---

### 72. 【面试】如何定制告警通知模板？模板中如何引用标签和数值？

**答案**

背景：默认的告警信息界面比较简单，可借助 Alertmanager 的模板功能丰富告警内容。使用流程：分析关键信息 → 定制模板内容 → Alertmanager 加载模板文件 → 告警信息使用模板内容属性。
模板语法：模板文件使用标准的 Go 模板语法（课件中也称其用法类似 jinja2），并暴露一些包含时间标签和值的变量；为了更好的显示效果需要了解 HTML 相关技术（模板通常输出 HTML 表格）。
变量引用：
- 标签引用：{{ $labels.<label_name> }}，如 {{ $labels.instance }}、{{ $labels.job }}；
- 指标样本值引用：{{ $value }}；
- 遍历告警：{{ range .Alerts }} ... {{ end }}；取对象字段 {{ .Labels.severity }}、{{ .Annotations.summary }}、{{ .StartsAt }}、{{ .EndsAt }}；
- 时间格式化：{{ .StartsAt.Format "2006-01-02 15:04:05" }}——这是 Go 语言特殊的日期时间格式化模式（用参考时间本身作为格式串）；
- 条件判断：{{- if gt (len .Alerts.Firing) 0 -}} 可区分 firing 与 resolved（{{- if gt (len .Alerts.Resolved) 0 -}}）。
落地步骤：
1）在 Alertmanager 节点创建模板目录与文件，例如 /usr/local/alertmanager/tmpl/email.tmpl，用 {{ define "test.html" }} ... {{ end }} 定义模板名；
2）在 alertmanager.yml 中通过 templates: - '../tmpl/*.tmpl' 加载模板（相对路径是相对 alertmanager.yml 的路径），注意该配置必须写在 global 段中；
3）在 receiver 的 email_configs 中调用：html: '{{ template "test.html" . }}'，同时可用 headers: { Subject: "[WARN] 报警邮件" } 定制标题、send_resolved: true 发送恢复通知；
4）若模板里要显示告警阈值，需先在告警规则的 annotations 中增加 value: "{{$value}}" 字段（否则邮件中阈值是空的）；
5）重启或重载：systemctl restart alertmanager 或 curl -XPOST localhost:9093/-/reload，并可用 amtool 校验。
一个重要语法坑：调用模板时必须用单引号把 {{}} 包起来——'{{ template "test.html" . }}'；而纯 {} 不需要单引号，否则服务可能启动不成功。

**解析**

答题要点：① 说清流程（定模板→加载→引用）；② 记牢两个变量 {{ $labels.x }} 与 {{ $value }}；③ 补上 templates 配置要写在 global 段、以及调用时 {{}} 必须加单引号这两个易错点；④ 提“阈值要在 annotations 里显式加 value 字段才会有值”。

---

### 73. 【面试】Prometheus 有哪些服务发现机制？文件服务发现的原理与配置是怎样的？

**答案**

服务发现的意义：Prometheus Server 的数据抓取工作于 Pull 模型，必须事先知道各 Target 的位置。小型环境用 static_configs 手工指定即可；中大型或动态性强的云计算环境必须依赖服务发现——各节点主动注册属性到服务注册中心，属性变动随之更新，节点过期/失效则被周期性清理。
常见机制（Prometheus 提供二十多种）：
1）静态服务发现：配置文件中 static_configs 手动添加；
2）基于文件的服务发现：将 target 记录到文件中，Prometheus 周期性刷新；
3）基于 DNS 的服务发现：对一组 DNS 域名定期查询并持续监视资源变动（含 SRV 记录）；
4）基于 Consul 的服务发现：借助 Consul 实现动态自动发现；
5）基于 HTTP 的服务发现：从返回 JSON 的 HTTP 端点获取目标（要求 HTTP 200、Content-Type: application/json）；
6）基于 Kubernetes API 的服务发现：支持 Node、Service、Endpoint、Pod、Ingress 等资源类型作 target。
实现原理（三个组件协作）：配置处理模块解析 scrape_configs，为每个 job 生成对应的 Discoverer（不同协议各自实现），把发现的 target 放入 targets 列表；DiscoveryManager 组件内部有定时周期任务，**每 5 秒**检查 target 列表，有变更则把 target 信息放入 syncCh 消息池；scrape 组件监听 syncCh，拿到需要监控的 target 后 reload 纳入监控开始抓取。DiscoveryManager 相当于搬运工、scrape 相当于使用者，两者对不同服务发现协议的差异无所感知。
文件服务发现的原理与配置：
- 定位：仅略优于静态配置，不依赖任何平台或第三方服务，是最简单通用的实现方式；文件可由手动创建，也可用 Ansible/Saltstack 生成或脚本基于 CMDB 定期查询生成；
- 支持 YAML 和 JSON 两种格式（YAML 适合运维场景、JSON 更适合开发场景），内容含 target 列表及可选的标签；
- 配置方式：job 下用 file_sd_configs，files 指定文件路径（支持 glob 通配符，相对路径相对于 prometheus.yml），refresh_interval 指定重新加载间隔（**默认 5m**）；
- 注意：文件不建议就地编写生成，否则可能出现加载一部分的情况；发现后会生成 __meta_filepath 元标签。

**解析**

答题要点：① 先讲“Pull 必须知道 target 位置”的动因；② 六种机制点名即可；③ 原理部分务必说出“DiscoveryManager 每 5 秒检查 + syncCh 消息池 + scrape 监听”这条链路；④ 文件发现要给出 YAML/JSON 双格式、glob 通配、refresh_interval 默认 5m 三个细节。

---

### 74. 【面试】relabel_configs 与 metric_relabel_configs 有什么区别？常用的 action 有哪些？

**答案**

一、本质区别（两个维度）
1）执行顺序：relabel_configs 用于 scrape 目标上 metric 前的标签设置，在 scrape_configs 前生效，**针对的是 target 对象本身**；metric_relabel_configs 作用于 scrape_configs 生效之后，即**针对 target 对象上的 metric 监控数据**。
2）数据处理：metric_relabel_configs 是 Prometheus 在保存数据前的**最后一步**标签重新编辑，针对的是 metric 对象；默认情况下它将监控不需要的数据直接丢掉、不在 Prometheus 中保存。
二、各自常用功能
- relabel_configs：将来自服务发现的元数据标签中的信息附加到指标的标签上、过滤目标。例如从 __meta_consul_service 生成 consul_service 标签，或对 __meta_kubernetes_service_annotation_prometheus_io_scrape 做 keep:true 过滤。
- metric_relabel_configs：删除不必要的指标、从指标中删除敏感或不需要的标签、添加/编辑/修改指标的标签值或格式。例如删除以 node_network_receive 或 go 开头的指标。
三、常用配置字段
source_labels（列表）、separator（默认分号，拼接多个 source_labels）、regex（默认 (.*)，注意正则用于匹配拼接后的值）、replacement（默认 $1）、target_label、action（默认 replace）。
四、常见 action
1）replace（默认）：把 source_labels 各值用 separator 串连，与 regex 匹配则用 replacement 对 target_label 赋值，target_label 不存在时可创建新标签；
2）keep：串连值与 regex 匹配则保留该指标（目标），反之删除；
3）drop：与 keep 相反，匹配则删除该指标（目标）；
4）labeldrop：标签名与 regex 匹配则删除该标签（标签黑名单）；
5）labelkeep：匹配则保留、不匹配则删除（标签白名单）；
6）labelmap：用 regex 匹配标签名称，把匹配到的标签值赋给 replacement 指定的新标签名（常用于提取标签名的一部分生成新标签，旧标签仍会存在）；
7）hashmod：把 target_label 设为对 source_labels 串连值的 hash 值（用于分片）；
8）lowercase / uppercase：大小写转换。
五、两个必须注意的细节
1）重新标记期间可使用 target 上以 __meta_ 开头的元标签；重新标记完成后，target 上以 __ 开头的所有标签都会被移除，若需临时存储标签值要用 __tmp 前缀以避免与内建标签冲突。
2）更改或添加标签会创建新的时间序列，因此标签应尽量保持稳定，否则会形成动态数据环境，使图形、告警与记录规则失效；删除标签并导致时间序列重复时，可能导致系统出现问题。

**解析**

答题要点：先用“执行顺序 + 处理对象”两条讲清区别（target vs metric、抓取前 vs 保存前）；action 至少答出 replace/keep/drop/labelmap/labeldrop 五个；最后补 __meta_ 与 __tmp 这两个实战细节，以及“改标签 = 造新序列”的副作用。

---

### 75. 【面试】Prometheus 单机存在哪些瓶颈？如何实现高可用与水平扩展？

**答案**

瓶颈来源：
1）不支持集群化：一个 Prometheus 服务节点所能接管的主机数量有限，只用一个节点时随着监控数据持续增长压力越来越大；
2）本地存储单点：Prometheus 默认提供本地 TSDB 存储，本地存储阻碍了集群化实现，存在单点可用性与性能瓶颈，数据保留受磁盘限制（默认 15 天）；
3）官方明确“不支持集群化、被监控集群规模过大后本身性能有瓶颈”。
方案一：联邦 Federation（横向分片 + 汇总）
在原有 Master 基础上部署多个 Slave 从节点分别负责不同监控数据采集，Master 只负责汇总数据与 Grafana 展示。联邦允许 Prometheus 从另一个 Prometheus 抓取特定数据，具体通过源服务器的 /federate 端点：必须至少指定一个 match[] URL 参数（需为即时向量选择器），并启用 honor_labels 以不覆盖源服务器公开的标签；上级配置里 metrics_path 要写成 '/federate'。
两种模式：分层联邦（常用、配置简单，拓扑类似树——较高级别 Prometheus 从大量从属服务器收集聚合数据，兼得全局视图与本地细节）与跨服务联邦（一个服务的 Prometheus 从另一个服务的 Prometheus 提取所选数据，以便对单个服务器中的两组数据集启用告警和查询）。
工业级实践（阿里云全球监控告警架构）：三层树形结构——边缘 Prometheus（下沉到每个元集群，采集本集群 OS/K8s/etcd 指标）→ 级联 Prometheus（汇聚单个大区域，如中国区/欧美区/亚洲区，可随规模拆分扩展）→ 中心 Prometheus（连接所有级联，实现全局聚合、全局视图与告警；采用双活架构，在不同可用区布置两个中心节点连相同的下级）。
方案二：远程存储（解决长期存储与高可用）
远程存储方案有 VictoriaMetrics、Thanos 和 InfluxDB，也可通过 adapter 适配器间接存储到 Elasticsearch 或 PostgreSQL。
- VictoriaMetrics：Go 实现，支持高可用、经济高效且可水平扩容的**本地全量持久化**方案；实现 MetricsQL（在 PromQL 之上改进）；提供全局查询视图；比 InfluxDB/TimescaleDB 性能高 20 倍；高基数场景下 RAM 占用比 InfluxDB 少 10 倍、比 Prometheus/Thanos/Cortex 少 7 倍；分为单节点与集群两个方案，官方建议数据点低于 100w/s 用单节点（不支持告警），集群版支持数据水平拆分。
- Thanos：也能解决高可用与远程存储，但它不是本地全量的——很多历史数据存放在对象存储中，查历史需从对象存储拉取，因此性能不如 VictoriaMetrics。
方案三：Alertmanager 自身高可用（避免告警单点）：通过负载均衡前置，或基于 Gossip 谣言协议实现多实例集群（集群端口 9094）。

**解析**

答题要点：按“瓶颈 → 联邦（横向扩展）→ 远程存储（长期存储与 HA）→ Alertmanager HA”四段组织；联邦要说出 /federate + match[] + honor_labels 三要素、两种模式；远程存储要能对比 VM（本地全量、性能好）与 Thanos（对象存储、查历史慢）。

---

### 76. 【面试】如何监控容器（cAdvisor）？黑盒监控与白盒监控有什么区别？

**答案**

一、容器监控 cAdvisor
物理主机可装 node_exporter，但容器场景不适用。cAdvisor（Container Advisor，容器顾问）是 Google 开源的一个容器监控工具，以守护进程方式运行，用于收集、聚合、处理和导出正在运行容器的有关信息：对每个容器记录其资源隔离参数、历史资源使用情况、完整历史资源使用情况的直方图和网络统计信息，并提供基础查询界面与 http 接口供 Prometheus 抓取。
实现要点：用 Go 语言开发，对 Node 上的资源及容器做实时监控与性能数据采集，覆盖 CPU 使用情况、内存使用情况、网络吞吐量及文件系统使用情况；利用 Linux 的 cgroups 获取容器的资源使用信息。安装后通过 http://cAdvisor-server:8080/metrics 暴露 metrics。
部署注意：一个 cAdvisor 仅对一台主机进行监控，K8s 集群中通常通过 DaemonSet 在每个节点主机安装；cAdvisor 已内置在 kubelet 中，在 Kubernetes v1.10 之前通过启动参数 --cadvisor-port 定义对外服务端口（默认 4194），**v1.12 之后删除了 cAdvisor 监听的端口**，改为通过 kubelet 的 /metrics/cadvisor 路径暴露。
二、黑盒监控（blackbox_exporter）
黑盒监视也称远端探测，监测应用程序的外部，可以查询应用程序的外部特征——比如是否开放相应端口并返回正确的数据或响应代码，执行 ICMP 或 echo 检查并确认收到响应。它是通过运行一个 blackbox exporter 探测远程目标，并把结果公开在本地端点上。
能力：允许通过 HTTP、HTTPS、DNS、TCP 和 ICMP 等协议探测端点状态；在配置中定义一系列执行特定检查的模块（modules），例如 http_2xx（prober: http）、tcp_connect（prober: tcp）、http_post_2xx（method: POST）等；默认监听 9115 端口（二进制 Go 应用）。
典型用例：网络连通性监控（ICMP）、TCP 端口连通性监控、HTTP/HTTPS 网站可用性监控，配合 probe_success、probe_duration_seconds、probe_http_status_code 等指标做告警（如 probe_success == 0 触发 BlackboxProbeFailed）。
三、黑盒 vs 白盒
白盒监控（如 node_exporter、各类应用 Exporter）从系统/应用**内部**采集细粒度指标，能看到 CPU 各模式耗时、GC 次数、连接池状态等内部状态，适合定位根因与容量分析；黑盒监控从**外部**探测服务的可用性与响应特征（能否访问、状态码、响应时长、证书、DNS 解析），视角等同真实用户，适合做 SLA/可用性告警。实践中两者互补：黑盒先告诉你“服务不可用了”，白盒再帮你回答“为什么不可用”。

**解析**

答题要点：① cAdvisor 抓 Google 开源、cgroups、8080/metrics、内置 kubelet、1.12 后端口被移除这四个点；② blackbox 抓 9115 端口、支持的 5 种协议、modules 机制；③ 黑盒 vs 白盒的对比要给“外部用户视角 vs 内部细粒度”这个本质，并点出两者互补关系。

---

### 77. 【面试】在 Kubernetes 中部署 Prometheus 有哪几种方式？Prometheus Operator 提供了哪些 CRD？

**答案**

一、三种部署方式
1）基于 YAML 文件：手工编写 ServiceAccount、ConfigMap（存放 prometheus.yml）、Deployment/StatefulSet、Service、RBAC 等清单，例如 Istio 自带的 samples/addons/prometheus.yaml。灵活可控，但组件多、维护成本高。
2）基于 Helm：使用 prometheus-community/helm-charts 之类的 Chart 部署，参数化程度高、升级方便，适合标准化交付。
3）基于 Operator：kube-prometheus / Prometheus Operator，把复杂的部署与配置抽象为 CRD，是 K8s 上最主流的方式。
二、Prometheus Operator 说明
部署 Prometheus 及其相关各组件是一项复杂的任务，而 Prometheus Operator 项目能够在 Kubernetes 环境上简化和自动化该过程。Operator 建立在 Kubernetes 的两个关键原则之上：自定义资源（CR，通过 CRD 定义）和自定义的 Controller。Kube-Prometheus Operator 的主要目的是用于简化和自动化管理在 Kubernetes 集群上运行的 Prometheus 监控套件，本质上它是一个自定义控制器，用于监视通过 CRD 引入的资源类型下的对象。
三、主要 CRD
- Prometheus：编排运行 Prometheus Server 实例；
- Alertmanager：编排运行 Alertmanager 实例；
- ServiceMonitor：定义要监视的 Kubernetes Service 资源对象；
- PodMonitor：定义要监视的 Pod 资源对象；
- Probe：定义要监控的 Ingress 或静态 Target，属于黑盒监控模式；
- PrometheusRule：为 Prometheus Server 定义告警规则或记录规则；
- AlertmanagerConfig：以声明方式为 Alertmanager 提供配置段；
- PrometheusAgent：编排运行 Prometheus Agent；
- ScrapeConfig：为 Prometheus Server 提供 scrape_config 相关的配置段；
- ThanosRuler：运行 Thanos Ruler 做跨集群规则计算。
四、部署要点（课件 kube-prometheus v0.9.0 实践）
- 获取代码：git clone -b v0.9.0 https://github.com/prometheus-operator/kube-prometheus.git 或下载 tar 包；
- 创建命名空间 kubectl create ns monitoring；修改 prometheus-service.yaml（如 nodePort: 30090、type: LoadBalancer）、grafana-service.yaml、alertmanager-service.yaml；
- 镜像拉取问题：由于原始 manifest 使用 k8s.gcr.io 等不可达镜像，需要 sed 批量替换为自有 Harbor 地址（如 harbor.wang.org:80/helm/...）；
- 依次 apply setup 目录（CRD 与 RBAC）与主 manifests 目录，最后按需创建 Ingress 暴露 Prometheus/Grafana/Alertmanager。
五、K8s 内服务发现的优势
Prometheus 与 Kubernetes 结合可实现服务发现和对动态调度服务的监控（基于 Kubernetes API 将 Node、Service、Endpoint、Pod、Ingress 视作 target 并持续监视变动），在各种监控方案中具有很大优势，实际上已成为容器监控方案的标准。

**解析**

答题要点：① 三种方式点名（YAML/Helm/Operator）并说清各自适用场景；② CRD 至少要背出 Prometheus、Alertmanager、ServiceMonitor、PodMonitor、Probe、PrometheusRule 六个；③ 补一句“为什么用 Operator——把复杂部署抽象为 CRD + Controller 自动化”；④ 能说 K8s 服务发现角色（node/service/endpoint/pod/ingress）更好。

---
