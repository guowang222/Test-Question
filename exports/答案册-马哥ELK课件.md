# 马哥ELK课件 —— 答案与解析

> 共 85 题，编号与《试题册-马哥ELK课件.md》一致。


## ELK笔试

### 1. 【ELK概述】ELK 是由三款开源项目组成的日志分析系统，这三个项目分别是？

**答案**

**A**　Elasticsearch、Logstash、Kibana

**解析**

ELK 是 Elastic 公司开发的三个开源项目首字母缩写：Elasticsearch（实时全文搜索/存储库/分析引擎）、Logstash（数据处理管道）、Kibana（数据可视化）。【衍生知识点】EFK 则是把 Logstash 换成 Fluentd，即 Elasticsearch+Fluentd+Kibana。

---

### 2. 【ELK概述】「Elastic Stack」这个称呼是在哪个版本加入 Beats 套件之后才出现的？

**答案**

**B**　5.0 版本

**解析**

Elastic Stack 是原 ELK Stack 在 5.0 版本加入 Beats 套件后的新称呼，指一套适用于数据采集、扩充、存储、分析和可视化的免费开源工具。通常 Elastic Stack 也被称为 ELK Stack。【衍生知识点】ELK 版本演进为 0.X、1.X、2.X、5.X、6.X、7.X、8.X、9.X。

---

### 3. 【ELK概述】Elasticsearch 是基于下列哪款全文搜索引擎开发而来的？

**答案**

**B**　Apache Lucene

**解析**

Elasticsearch 基于 Java 语言开发，底层利用全文搜索引擎 Apache Lucene 实现，由 Elasticsearch N.V.（即现在的 Elastic）于 2010 年首次发布。它以简单的 REST 风格 API、分布式特性、速度和可扩展性闻名。【衍生知识点】ES 支持分布式、高可用，可处理 PB 量级数据。

---

### 4. 【ELK概述】关于 Elasticsearch 的近实时（NRT）特性，说法正确的是？

**答案**

**B**　从索引一个文档到该文档可被搜索的延时一般只有约 1 秒

**解析**

Elasticsearch 是一个近实时的搜索平台，从文档索引操作到文档变为可搜索状态之间的延时很短，一般只有一秒（毫秒级）。这得益于 refresh 机制，默认每隔 1 秒将新数据加载到内存使其可被搜索。【衍生知识点】refresh 在主分片和所有副本分片上独立进行。

---

### 5. 【ELK概述】Elasticsearch 中用于快速全文搜索的核心数据结构是？

**答案**

**B**　倒排索引

**解析**

Elasticsearch 使用的是一种名为倒排索引（inverted index）的数据结构，会列出在所有文档中出现的每个特有词汇，并能找到包含每个词汇的全部文档，从而支持极快的全文本搜索。【衍生知识点】正排索引是「文档→词」，倒排索引是「词→文档」，这是全文检索快的关键。

---

### 6. 【ELK概述】Elasticsearch 中 type（类型）概念在哪个版本被彻底删除？

**答案**

**D**　8.X

**解析**

type 概念演变：5.X 一个 index 下可创建多个 type；6.X 一个 index 下只能存在一个 type；7.X 默认支持 type 但可禁用；8.X 直接删除 type，即 index 不再支持 type。【衍生知识点】因此 8.X 后写入文档由 POST {index}/{type}/ 改为 POST {index}/_doc/。

---

### 7. 【ELK概述】在关系型数据库与 Elasticsearch 的概念对应中，关系型数据库的「表 Table」对应 ES 的？

**答案**

**B**　类型 Type（已废弃）

**解析**

对应关系为：数据库 Database→索引 Index（支持全文检索）；表 Table→类型 Type（已废弃）；数据行 Row→文档 Document（无需固定结构）；数据列 Column→字段 Field；SQL→DSL（JSON 风格请求语句）。

---

### 8. 【ELK概述】ES 的「副本（Replica）」在数量含义上与 Kafka 的副本有什么不同？

**答案**

**B**　ES 的副本数不包括主分片，只包括备份；这与 Kafka 不同

**解析**

ES 的副本指不包括主分片的其它副本，即只包括备份，这与 Kafka 是不同的。例如 number_of_replicas=1 表示每个主分片有 1 个副本分片。【衍生知识点】副本分片只支持读，主分片负责读写；副本不能与主分片分配在同一节点。

---

### 9. 【ELK概述】Logstash 是基于哪些语言开发的？

**答案**

**C**　Java 和 Ruby

**解析**

Logstash 基于 Java 和 Ruby 语言开发，是整个 ELK 中拥有最丰富插件的一个组件，而且支持水平伸缩。它是服务器端数据处理管道，能够从多个来源采集数据、转换数据，再发送到一个或多个「存储库」。【衍生知识点】正因基于 Java 运行，Logstash 运行时至少需要 500M 以上内存，这也是生产用 Filebeat 替代它的原因。

---

### 10. 【ELK概述】Kibana 是基于下列哪种语言开发的？

**答案**

**D**　JavaScript / TypeScript

**解析**

Kibana 是基于 JavaScript/TypeScript 语言实现的数据可视化和管理工具，可以提供实时的直方图、线形图、饼状图和地图。它还包含 Canvas 和 Elastic Maps 等高级应用。【衍生知识点】Kibana 通过接口调用 Elasticsearch 的数据并进行前端可视化展现。

---

### 11. 【ELK概述】Loki 日志聚合系统与 ELK 相比，最大的设计差异是？

**答案**

**B**　Loki 不对日志做全文索引，而是像 Prometheus 一样使用标签作为索引

**解析**

Loki 由 Grafana Labs 开源、基于 Go 语言开发，受 Prometheus 启发，使用标签（label）作为索引而不是对全文进行检索，极大降低了日志索引的存储成本。典型堆栈为 Loki（存储/查询）+ Promtail（采集代理）+ Grafana（UI）。【衍生知识点】Loki 与 ES 相比更简单、更省成本，适用于中小型规模环境。

---

### 12. 【ELK概述】关于 Fluentd 与 Fluent Bit 的对比，说法正确的是？

**答案**

**B**　Fluent Bit 基于 C 语言，体积约 450KB，比 Fluentd 更轻量

**解析**

Fluentd 约 40MB，基于 C 和 Ruby，插件超 650 个；Fluent Bit 约 450KB，基于 C 语言，插件约 35 个，除编译插件外零依赖。二者均由 Treasure Data 赞助、都是 CNCF 项目、均使用 Apache 2.0 许可证。【衍生知识点】Fluent Bit 适合嵌入式、边缘及资源受限环境；Fluentd 具备更强的聚合功能。

---

### 13. 【ES部署】Elasticsearch 对外提供 RESTful API 通信所使用的端口是？

**答案**

**A**　9200

**解析**

ES 支持各种语言通过 9200 端口用 RESTful API 与之通信（HTTP 层）。9300 是集群内部节点间通信的 transport 端口，直接访问会提示 This is not an HTTP port。【衍生知识点】Kibana 端口 5601，Logstash Beats 输入端口 5044，Logstash API 端口 9600。

---

### 14. 【ES部署】Elasticsearch 集群中节点之间通信（传输层）使用的端口是？

**答案**

**B**　9300

**解析**

9300 是 ES 集群内部节点间通信使用的 transport 端口。集群模式必须把 network.host 由默认的 127.0.0.1 改为 0.0.0.0，否则各节点无法通过 9300 端口互相通信。【衍生知识点】单机模式默认只监听 127.0.0.1:9200 和 127.0.0.1:9300。

---

### 15. 【ES部署】安装 Elasticsearch 前需要修改内核参数 vm.max_map_count，官方建议的值是？

**答案**

**B**　262144

**解析**

vm.max_map_count 用于限制一个进程可以拥有的 VMA（虚拟内存区域）数量，官方建议设置为 262144（echo "vm.max_map_count = 262144" >> /etc/sysctl.conf）。包安装会自动修改此配置，二进制安装需手动设置。【衍生知识点】Ubuntu 24.04 默认值 1048576 已满足；Ubuntu 22.04 与 CentOS 7 默认 65530 不满足。

---

### 16. 【ES部署】关于 Elasticsearch 的 JVM 堆内存设置，正确的是？

**答案**

**B**　Xms/Xmx 不超过物理内存的 50%，且最大不超过 30GB（26GB 较安全）

**解析**

官方建议将 Xms 和 Xmx 设置为不超过总内存的 50%，且不超过压缩普通对象指针（oops）的阈值——大多数系统上 26GB 是安全的，某些系统可达 30GB，超过会退化为 64 位指针反而更耗内存。【衍生知识点】ES 除堆内存外还需要堆外缓冲区与文件系统缓存，因此 ES 实际内存占用高于 Xmx 是正常的。

---

### 17. 【ES部署】为保证查询性能，生产上建议单个分片（shard）的大小控制在什么范围？

**答案**

**B**　30-50 GB

**解析**

单个分片建议控制在 30-50GB：分片太大查询会比较慢，索引恢复和更新时间越长；分片太小则会导致索引碎片化越严重，性能也会下降。【衍生知识点】官方经验值：对于一般日志类文件，1G 内存能存储 48G~96GB 数据，据此反推单个节点的堆内存大小。

---

### 18. 【ES部署】Elasticsearch 7.X 创建一个索引时，默认的分片与副本数量为？

**答案**

**B**　1 个主分片、1 个副本

**解析**

ES 7.X 默认每个索引只有一个主分片和一个副本分片，而 7.X 之前的版本默认是 5 个分片 1 个副本。【衍生知识点】想自定义默认分片数可用 _template 模板接口；分片数创建后不能改，副本数可随时调整。

---

### 19. 【ES部署】创建索引后，下列哪项可以修改，哪项不能修改？

**答案**

**B**　分片数不能改，副本数可以改

**解析**

每个分片的主分片在创建索引时自动指定且后续不能人为更改，因为文档路由算法 shard = hash(routing) % number_of_primary_shards 与主分片数相关，改变分片数会导致所有数据重新分配。副本数则可以通过 _settings 接口动态调整。【衍生知识点】PUT {index}/_settings 可改 number_of_replicas。

---

### 20. 【ES部署】Elasticsearch 8.X / 9.X 相比 7.X 版本，在 JDK 与安全方面的重要变化是？

**答案**

**B**　内置 JDK 不再支持自行安装，且默认开启 xpack.security 安全功能

**解析**

8.X 版本内置 JDK，不再支持自行安装的 JDK；同时 8.X/9.X 默认开启 xpack.security 安全功能（认证、授权、TLS），导致直接 curl http://127.0.0.1:9200 返回 curl: (52) Empty reply from server。【衍生知识点】关闭方式：elasticsearch.yml 中设置 xpack.security.enabled: false。7.X 有含 JDK 和不含 JDK 两种包，8.X 只有含 JDK 的包。

---

### 21. 【ES部署】要让一个节点只充当 Coordinating（协调）节点，需要如何配置？

**答案**

**B**　node.master: false, node.data: false, node.ingest: false

**解析**

当配置 node.master: false、node.data: false、node.ingest: false 时该节点只充当 Coordinating 节点，不存储数据，仅负责接收客户端请求并路由分发到其他节点，作用类似负载均衡器，可减轻 Data 节点负载。【衍生知识点】Coordinating 是所有节点的默认角色，不能取消；在 Cerebro 等插件的首页不会显示，需在 nodes 页才可见。

---

### 22. 【ES部署】一个 ES 节点在默认情况下会同时扮演哪些角色？

**答案**

**B**　master-eligible、data node 和 ingest node

**解析**

一个节点默认会同时扮演 master eligible（node.master 默认 true）、data node（node.data 默认 true）和 ingest node（node.ingest 默认 true）。生产建议采用单一职责节点：3 台专用 Master、高配 Data 节点、独立 Ingest 节点与 Coordinating 节点。【衍生知识点】Machine Learning 节点需 node.ml: true 且启用 x-pack。

---

### 23. 【ES部署】ES 集群发生主节点选举时，优先选举哪个节点？

**答案**

**B**　ClusterStateVersion 最大的节点，相同则选 Node ID 最小的

**解析**

选举由 master-eligible 节点发起，优先选举 ClusterStateVersion（集群状态版本号）最大的 Node；若相同则选 Node ID 最小的。ClusterStateVersion 最大者与原集群数据最接近，能尽量避免数据丢失；选最小 Node ID 是为了选举稳定性。【衍生知识点】每个集群只有一个 Master，损坏节点不能超过集群一半。

---

### 24. 【ES部署】ES 文档路由到主分片的计算公式是？

**答案**

**B**　shard = hash(routing) % number_of_primary_shards

**解析**

shard = hash(routing) % number_of_primary_shards，其中 routing 默认是文档 _id，也可自定义。哈希算法保证数据均匀分散在各分片。该算法与主分片数相关，一旦确定便不能更改主分片数。【衍生知识点】读取文档时可从主分片或任意副本分片读取，协调节点轮询各分片实现负载均衡。

---

### 25. 【ES部署】ES 集群中某节点宕机后，集群状态的颜色变化顺序是？

**答案**

**B**　Red → Yellow → Green

**解析**

以 3 节点集群为例：Master 节点宕机导致主分片 P0 丢失时集群变为 Red；新 Master 将副本 R0 提升为主分片后，所有主分片正常但部分分片无副本，集群变为 Yellow；随后重新生成副本分片 R0、R1，集群恢复 Green。【衍生知识点】Green=主副本都正常，Yellow=主分片正常但副本未分配，Red=有主分片未分配。

---

### 26. 【ES部署】实现 ES 数据冷热分离时，用于给节点打标签的配置项是？

**答案**

**B**　node.attr.{attribute}: {value}

**解析**

ES 支持给节点打标签，在 elasticsearch.yml 中通过 node.attr.{attribute}: {value} 配置，例如 node.attr.temperature: hot（热节点）或 warm（冷节点）。可用 _cat/nodeattrs 查看。【衍生知识点】索引侧通过 index.routing.allocation.require.temperature: hot 把索引绑定到指定标签节点。

---

### 27. 【ES部署】控制索引分片在哪些标签节点上分配的三个配置项不包括？

**答案**

**D**　index.routing.allocation.prefer.{attribute}

**解析**

ES 提供了三个分片过滤（shard filtering）配置：include 表示可分配在包含指定值之一的节点；require 表示必须分配在全部匹配指定值的节点上；exclude 表示只能分配在不包含指定值的节点上。不存在 prefer 配置项。【衍生知识点】该功能自 2.x 起提供，是冷热分离的实现基础。

---

### 28. 【ES部署】ES 集群冷热分离架构的核心思想是？

**答案**

**B**　用高性能节点存热点数据、大容量低配节点存冷数据，兼顾性能与成本

**解析**

官方建议磁盘使用 SSD，但海量数据全用 SSD 成本过高。冷热分离把节点按性能分组：部分高性能节点存热点数据、部分大容量低配节点存冷数据，既保证热数据性能又降低存储成本。【衍生知识点】典型配置如 3 台 16C 64G 1TB SSD 做热节点，2 台 8C 32G 5TB HDD 做冷节点。

---

### 29. 【ES部署】Elasticsearch 常用的两个图形化管理插件是？

**答案**

**A**　Head 和 Cerebro

**解析**

ES 常用插件为 Head 和 Cerebro，可实现在节点上图形化操作、查看数据。此外还可以用 Kibana（需 Java 环境并配置，图形操作、显示格式丰富）。【衍生知识点】交互 ES 的三种方式：curl/浏览器、插件（Head/Cerebro）、Kibana。

---

### 30. 【Beats】生产环境一般用 Filebeat 替代 Logstash 收集日志，最主要的原因是？

**答案**

**B**　Filebeat 基于 Go 开发、部署方便且仅占用约 10M 内存，更省资源

**解析**

Logstash 基于 Java 实现，需要在采集主机上安装 Java 环境，运行时至少需要 500M 以上内存，消耗较多内存和磁盘；而基于 Go 开发的 Beats（Filebeat）部署更方便，只占用 10M 左右内存及更小磁盘空间。【衍生知识点】Beats 是一个免费开放的平台，集合了多种单一用途数据采集器。

---

### 31. 【Beats】下列 Beats 组件与其用途对应错误的是？

**答案**

**C**　Filebeat — 通过抓包监控网络和应用

**解析**

Filebeat 用于 tail 并发送日志文件（Tails and ships log files）；通过抓包监控网络和应用的是 Packetbeat。其余对应关系正确：Metricbeat 采集指标、Heartbeat 检测可用性、Auditbeat 采集 Linux 审计数据。【衍生知识点】其他 Beats 还有 Functionbeat（无服务器）、Winlogbeat（Windows 事件日志）、Osquerybeat。

---

### 32. 【Beats】关于 Filebeat 的输入输出能力，说法正确的是？

**答案**

**B**　支持多个输入，但不支持同时多个输出

**解析**

Filebeat 支持配置多个输入（inputs），但不支持同时配置多个输出，如果配置多输出会报错：Exiting: error unpacking config data: more than one namespace configured accessing 'output'。【衍生知识点】输出可选 Elasticsearch、Logstash、Redis、Kafka 等，但只能选其一。

---

### 33. 【Beats】Filebeat 处理跨多行日志（如 Java 堆栈）时，multiline.max_lines 的默认值是？

**答案**

**B**　500

**解析**

multiline.max_lines 表示可以组合成一个事件的最大行数，超过将丢弃，默认值为 500；multiline.timeout 定义超时时间（默认 5s），如果开始一个新的事件在超时时间内没有发现匹配也会发送日志。【衍生知识点】multiline.pattern 指定正则，multiline.negate 定义是否否定匹配，multiline.match 指定匹配行组合在之前或之后。

---

### 34. 【Beats】Filebeat 配置中 json.keys_under_root: true 的作用是？

**答案**

**B**　将 JSON 的 key 提升为输出文档的顶级字段，而不是嵌套在 message 中

**解析**

默认（false）会将以 JSON 格式读取的数据整体存储到 message 字段；设置为 true 则会把 JSON 的各个 key 独立存储在 message 之外，作为输出文档的顶级字段。json.overwrite_keys: true 则用自定义 JSON 的 key 覆盖默认字段。【衍生知识点】Filebeat 处理 JSON 日志时通常两者配合使用。

---

### 35. 【Beats】Filebeat 中负责读取单个日志文件并把新数据发送到 libbeat 的进程是？

**答案**

**B**　harvester

**解析**

启动 Filebeat 时会启动一个或多个 input，在指定位置查找日志；对于找到的每个日志，Filebeat 都会启动收集器 harvester 进程，每个 harvester 读取一个日志以获取新内容，并将新数据发送到 libbeat，libbeat 汇总事件后发送到配置的输出。【衍生知识点】logstash 的 harvest 关闭后若文件被更新，会在 scan_frequency 后重新拾取。

---

### 36. 【Beats】Heartbeat 与 Metricbeat 的主要区别是？

**答案**

**B**　Heartbeat 用于 ping 远程服务检测可用性，Metricbeat 用于采集性能指标

**解析**

Heartbeat 通过 ping 远程服务来监控可用性（uptime），Metricbeat 用于按周期采集操作系统和服务的性能指标（CPU/内存/磁盘/网络等）。【衍生知识点】两者收集的数据都会写入以 beat 名称命名的索引（如 heartbeat-7.6.2-日期、metricbeat-7.6.2-日期）。

---

### 37. 【Logstash】Logstash 数据处理架构的三个阶段依次是？

**答案**

**B**　输入 Input、过滤 Filter、输出 Output

**解析**

Logstash 架构分为三部分：Input（输入，用于日志收集，常见插件 Stdin、File、Kafka、Redis、Beats、Http）、Filter（过滤，日志过滤和转换，常用插件 grok、date、geoip、mutate、useragent）、Output（输出，常见插件 File、Stdout、Elasticsearch、MySQL、Redis、Kafka）。

---

### 38. 【Logstash】用于把非结构化日志（如 Nginx、syslog）解析为结构化 JSON 的 Logstash 过滤插件是？

**答案**

**B**　grok

**解析**

Grok 是一个过滤器插件，可帮助用户描述日志格式的结构，有超过 120 种 grok 模式抽象概念（如 IPv6 地址、UNIX 路径、月份名称），基于正则表达式把非结构化文本解析为可查询的结构化数据。【衍生知识点】Nginx/Apache 日志常用内置模式 %{COMBINEDAPACHELOG} 一行搞定。

---

### 39. 【Logstash】Logstash 的 date 插件默认将解析出的时间写入哪个字段？

**答案**

**C**　@timestamp

**解析**

date 插件可以把日志中指定的日期字符串生成新的字段，其 target 参数默认是 @timestamp（该字段默认为 logstash 写入的时间而非日志本身的时间），可用 target 指定其他字段名。【衍生知识点】date 插件参数还包括 match（源字段与时间格式）和 timezone（时区）。

---

### 40. 【Logstash】Logstash 中用于对字段做增删改（如删除字段、切割、类型转换、字符串替换）的过滤插件是？

**答案**

**B**　mutate

**解析**

mutate 插件提供多种字段操作：remove_field（删除字段）、split（切割）、add_field（添加字段）、convert（转换）、gsub（替换）等。geoip 按 IP 解析地理位置，useragent 解析浏览器/操作系统信息。【衍生知识点】常见 filter 插件：grok、date、geoip、mutate、useragent。

---

### 41. 【Logstash】执行 Logstash 时，用于检查配置文件语法是否正确的参数是？

**答案**

**C**　-t 或 --config.test_and_exit

**解析**

常用选项：-e 指定配置内容；-f 指定配置文件（支持绝对路径，相对路径相对于 /usr/share/logstash/）；-t（--config.test_and_exit）做语法检查；-r（--config.reload.automatic）配置文件修改后自动加载生效。【衍生知识点】注意 Logstash 版本要和 Elasticsearch 相同，否则可能出错。

---

### 42. 【Logstash】Logstash 接收 Filebeat 数据的默认 Beats 输入端口是？

**答案**

**A**　5044

**解析**

Filebeat 通过 output.logstash 把数据发送到 Logstash 的 5044 端口（Beats 输入插件默认端口）。9600 是 Logstash 的 Web API 端口。【衍生知识点】多台 Logstash 时可配置 hosts 列表并设置 loadbalance: true 让数据输出至全部 Logstash。

---

### 43. 【Logstash】关于 Logstash 配置文件 pipelines.yml 的默认配置，说法正确的是？

**答案**

**A**　默认加载 /etc/logstash/conf.d/*.conf

**解析**

默认 pipelines.yml 中 pipeline.id: main 且 path.config 指向 /etc/logstash/conf.d/*.conf，因此放在该目录下的 .conf 文件都会被作为管道配置加载。【衍生知识点】Logstash 默认以 logstash 用户运行，若需收集本机日志可能有权限问题，可把 service 文件中的 User/Group 改为 root。

---

### 44. 【Kibana】Kibana 默认监听的端口是？

**答案**

**B**　5601

**解析**

Kibana 默认监听 5601 端口（server.port: 5601）。需修改 server.host 由默认的 localhost 改为 0.0.0.0 才能被远程访问，并在 elasticsearch.hosts 中配置 ES 地址（可写多个实现容错）。【衍生知识点】i18n.locale: "zh-CN" 可切换中文界面。

---

### 45. 【Kibana】Kibana 中的「索引模式 / 索引视图」的作用是？

**答案**

**B**　用于匹配一组索引，供后续检索与可视化使用

**解析**

索引模式（8.X 版改名为「索引视图」）用于匹配一组索引（支持通配符，如 nginx-access.*），Kibana 基于它来检索和可视化数据。数据要先写入 ES 并生成索引，才能创建索引模式。【衍生知识点】Kibana 8.X 可通过开启或禁用 xpack.security 功能连接 ES。

---

### 46. 【Kibana】通过 Nginx 为 Kibana 增加登录安全认证时，生成用户名密码文件的命令是？

**答案**

**B**　htpasswd -bc

**解析**

使用 apache2-utils 提供的 htpasswd 命令生成认证文件，如 htpasswd -bc /etc/nginx/conf.d/kibana.users admin 123456；然后在 Nginx 配置中通过 auth_basic 与 auth_basic_user_file 启用 basic 认证，并把 Kibana 的 server.host 改为 127.0.0.1 只允许本机反向代理访问。【衍生知识点】还需 chmod 600 保护密码文件。

---

### 47. 【综合实战】在 ELK 架构中引入 Redis（或 Kafka）作为日志缓冲层，其主要目的是？

**答案**

**B**　实现应用解耦、异步消息、流量削峰

**解析**

利用 Redis 缓存日志数据主要解决应用解耦、异步消息、流量削峰等问题。典型链路为 Filebeat → Redis → Logstash → Elasticsearch。【衍生知识点】局限性：不支持 Redis 集群、存在单点问题（可多节点负载均衡）；Redis 基于内存，存放数据量有限。

---

### 48. 【综合实战】要让 Logstash 把日志写入 MySQL 数据库，需要安装的插件是？

**答案**

**B**　logstash-output-jdbc

**解析**

写入 MySQL 需要通过 logstash-output-jdbc 插件，并配置 mysql-connector-java 驱动包。此外还需更换 Gem 源（可选）。【衍生知识点】Logstash 输出插件还有 File、Stdout、Elasticsearch、Redis、Kafka 等。

---

### 49. 【综合实战】在 Filebeat → Kafka → Logstash → Elasticsearch 链路中，Filebeat 输出到 Kafka 时 required_acks 的默认值是？

**答案**

**B**　1

**解析**

required_acks 默认为 1（等待写入主分区），0 表示不启用确认机制（错误消息可能丢失），-1 表示等待写入副本分区。【衍生知识点】Kafka 输出还可配置 compression: gzip 与 max_message_bytes（每条消息最大长度，超过将丢弃）。

---

### 50. 【ELK概述】ELK 是三个开源项目首字母的缩写，分别是 ______、______ 和 ______。

**答案**

- 第 1 空：Elasticsearch / elasticsearch / ES
- 第 2 空：Logstash / logstash
- 第 3 空：Kibana / kibana

**解析**

ELK 由 Elastic 公司的三个开源项目组成：Elasticsearch（实时全文搜索/存储库/分析引擎）、Logstash（数据处理管道）、Kibana（数据可视化）。【衍生知识点】5.0 版本加入 Beats 后统称 Elastic Stack。

---

### 51. 【ES部署】安装 ES 前需修改内核参数，官方建议设置 vm.max_map_count = ______，该参数用于限制一个进程可拥有的 ______（虚拟内存区域）数量。

**答案**

- 第 1 空：262144
- 第 2 空：VMA / vma

**解析**

vm.max_map_count 用于限制一个进程可以拥有的 VMA（虚拟内存区域）数量，官方建议设置为 262144。包安装会自动修改此配置，二进制安装需手动设置。【衍生知识点】Ubuntu 24.04 默认 1048576 已满足，Ubuntu 22.04 与 CentOS 7 默认 65530 不满足。

---

### 52. 【ES部署】Elasticsearch 对外提供 RESTful API 的端口是 ______，集群内部节点间通信的 transport 端口是 ______。

**答案**

- 第 1 空：9200
- 第 2 空：9300

**解析**

9200 是 HTTP/REST 端口，9300 是集群内部节点间通信的 transport 端口。集群模式必须把 network.host 改为 0.0.0.0，否则节点无法通过 9300 端口互相通信。【衍生知识点】Kibana 端口 5601，Logstash Beats 输入端口 5044。

---

### 53. 【ES部署】ES 的 JVM 堆内存建议设置为物理内存的一半，且最大不超过 ______ GB，在多数系统上 ______ GB 是比较安全的。

**答案**

- 第 1 空：30 / 30G
- 第 2 空：26 / 26G

**解析**

官方建议 Xms/Xmx 不超过总内存的 50%，且不超过压缩普通对象指针（oops）的阈值——大多数系统上 26GB 安全，某些系统可达 30GB。超过该阈值对象指针会从 32 位压缩指针变为 64 位，反而增加内存消耗。【衍生知识点】GC 的 Stop-the-World 暂停也随堆增大而变长。

---

### 54. 【ES部署】ES 文档路由到主分片的公式为 shard = hash(routing) % ______，其中 routing 默认是文档的 ______。

**答案**

- 第 1 空：number_of_primary_shards
- 第 2 空：_id / id / 文档id / 文档ID

**解析**

shard = hash(routing) % number_of_primary_shards。routing 用于指定 hash 计算的可变参数，默认是文档 _id，也可以自定义。该算法与主分片数相关，因此主分片数一旦确定便不能更改。【衍生知识点】读取文档时协调节点用 _id 定位分片，并轮询主分片与各副本分片实现负载均衡。

---

### 55. 【Logstash】Logstash 的数据处理架构分为三个阶段：______、______ 和 ______。

**答案**

- 第 1 空：Input / input / 输入
- 第 2 空：Filter / filter / 过滤
- 第 3 空：Output / output / 输出

**解析**

Logstash 架构：Input（输入，常见插件 Stdin、File、Kafka、Redis、Beats、Http）、Filter（过滤，常用插件 grok、date、geoip、mutate、useragent）、Output（输出，常见插件 File、Stdout、Elasticsearch、MySQL、Redis、Kafka）。

---

### 56. 【Beats】Filebeat 处理多行日志时，可组合成一个事件的最大行数由 multiline.max_lines 控制，默认值为 ______ 行；超时时间由 multiline.timeout 控制，默认值为 ______ 秒。

**答案**

- 第 1 空：500
- 第 2 空：5 / 5s

**解析**

multiline.max_lines 默认 500，超过将丢弃；multiline.timeout 默认 5s，如果开始一个新的事件在超时时间内没有发现匹配也会发送日志。【衍生知识点】multiline.pattern 指定正则，negate 定义是否否定匹配，match 指定匹配行组合在之前或之后。

---

### 57. 【Kibana】Kibana 默认监听的端口是 ______，其配置项 i18n.locale 设置为 ______ 可切换为中文界面。

**答案**

- 第 1 空：5601
- 第 2 空：zh-CN / zh-cn / zh_CN

**解析**

Kibana 默认监听 5601 端口，需修改 server.host 由 localhost 改为 0.0.0.0 才能被远程访问；i18n.locale: "zh-CN" 可切换中文界面。【衍生知识点】elasticsearch.hosts 可配置多个 ES 地址实现容错。

---

### 58. 【ELK概述】Elasticsearch 使用的数据结构称为 ______ 索引，它列出所有文档中出现的每个特有词汇，并能找到包含该词汇的全部文档；对应地，查询时使用的 JSON 风格请求语言称为 ______。

**答案**

- 第 1 空：倒排 / inverted / 倒排索引
- 第 2 空：DSL / dsl / Domain Specific Language

**解析**

ES 使用倒排索引实现快速全文本搜索，存储数据以 JSON 文档形式组织。ES 对外提供的 JSON 风格请求语句称为 DSL（Domain Specific Language），用于实现各类增删改查。

---

### 59. 【ES部署】为保证查询性能，生产上单个分片的大小建议控制在 ______ GB 之间；ES 7.X 创建索引时默认的副本数为 ______。

**答案**

- 第 1 空：30-50 / 30~50 / 30到50
- 第 2 空：1 / 1个 / 一

**解析**

单个分片建议 30-50GB：太大则查询慢、恢复和更新时间长；太小则索引碎片化严重、性能下降。ES 7.X 默认每个索引 1 个主分片和 1 个副本。【衍生知识点】7.X 之前默认 5 分片 1 副本。

---

### 60. 【ES部署】实现数据冷热分离时，在 elasticsearch.yml 中通过 node.attr.______: hot（或 warm）给节点打标签，索引侧通过 index.routing.allocation.______.temperature: hot 把索引绑定到热节点。

**答案**

- 第 1 空：temperature
- 第 2 空：require

**解析**

节点侧用 node.attr.{attribute}: {value} 打标签，如 node.attr.temperature: hot；索引侧用 index.routing.allocation.require.{attribute} 强制索引分配到匹配节点。【衍生知识点】三个分片过滤配置项：include（包含其一）、require（全部匹配）、exclude（不含）。

---

### 61. 【Logstash】解析 Nginx / Apache 访问日志时，常用的 grok 内置模式是 %{______}；date 插件的 target 参数默认值是 ______。

**答案**

- 第 1 空：COMBINEDAPACHELOG
- 第 2 空：@timestamp / timestamp

**解析**

Nginx / Apache 访问日志常直接用 %{COMBINEDAPACHELOG} 模式解析为 JSON。date 插件的 target 默认为 @timestamp（默认该字段是 logstash 写入时间而非日志本身时间），可指定其他字段名。【衍生知识点】date 插件还有 match（源字段与格式）和 timezone 参数。

---


## ELK面试

### 62. 【面试】ES 用了几台机器，分别是什么角色？请说明生产环境的节点规划原则。

**答案**

生产环境一般按「单一职责」规划节点，典型规模为 3 台专用 Master 节点 + 若干 Data 节点 + 可选的 Ingest / Coordinating 节点。
1) Dedicated Master nodes（建议 3 台）：只负责集群状态（cluster state）管理，即增删索引、增删节点、分片重新分配，并用低配 CPU/RAM/磁盘。3 台是为了高可用与避免脑裂，一个集群只有 1 台活跃 Master。配置 node.master: true、node.data: false。
2) Dedicated Data nodes：负责数据存储及处理客户端请求，使用高配 CPU/RAM/磁盘，配置 node.data: true。
3) Dedicated Ingest nodes：负责数据预处理（如日志解析、字段提取），用高配 CPU、中等 RAM、低配磁盘。
4) Coordinating Only Node：node.master、node.data、node.ingest 全为 false，不存数据，仅接收请求并路由分发，相当于负载均衡器，可减轻 Master 与 Data 节点负载。
示例（课程实战 3 节点集群）：3 台 16C 64G 1TB SSD 用作热节点（含 Master 角色），另 2 台 8C 32G 5TB HDD 作冷节点。
原则：master-eligible 节点建议奇数台（3 台）；损坏节点不能超过集群一半，否则集群无法提供服务。

**解析**

回答要点：3 台专用 Master（奇数、低配）+ Data（高配）+ Ingest + Coordinating；单一职责；每台节点都保存完整的 Cluster State。【衍生知识点】node.master/node.data/node.ingest 默认均为 true；Coordinating 是所有节点的默认角色，不能取消。

---

### 63. 【面试】如何实现 ES 节点数据的冷热分离？

**答案**

冷热分离的核心思想是把集群节点按性能分组：高性能节点存热点数据、大容量低配节点存冷数据，既保证热数据读写性能，又降低存储成本。
实现分两步：
1) 给节点打标签：在 elasticsearch.yml 中配置 node.attr.temperature: hot（热节点）或 node.attr.temperature: warm（冷节点），重启生效。可用 GET _cat/nodeattrs?v&h=node,attr,value&s=attr:desc 验证。
2) 给索引指定冷热属性：冷热分离的数据分布基本单位是索引，通过分片过滤（shard filtering）配置控制索引在不同标签节点上的分配：
   index.routing.allocation.require.temperature: hot  → 索引必须分配在热节点；
   改为 warm 则索引迁移到冷节点，实现数据「降温」。
常用做法是配合 ILM（索引生命周期管理）自动把旧索引从 hot 滚到 warm/cold。
其他两个分片过滤配置：include（可分配在包含指定值之一的节点）、exclude（只能分配在不含指定值的节点）。
硬件示例：3 台 16C 64G 1TB SSD 作热节点，2 台 8C 32G 5TB HDD 作冷节点。

**解析**

回答要点：node.attr.temperature 打标签 + index.routing.allocation.require.temperature 指定索引冷热；单位是索引；常配合 ILM。【衍生知识点】include/require/exclude 三个配置均可用于索引分配控制。

---

### 64. 【面试】ES 用的什么磁盘？为什么这样选？

**答案**

官方建议 Elasticsearch 使用 SSD 固态硬盘，因为 ES 要解决海量数据的存储和检索问题，对随机读写 IO 要求高，SSD 能显著提升读写性能和查询响应速度。
但海量数据全用 SSD 成本过高，这也是制约很多企业使用 ES 的因素之一，因此实际生产采用冷热分离架构：
- 热节点（存当天/近期热点数据）使用高性能 SSD，如 1TB SSD；
- 冷节点（存历史数据）使用大容量、低成本的 HDD（机械盘），如 5TB HDD。
另外从操作系统盘考虑，安装前一般准备 50G 系统盘，并建议为 ES 单独准备数据盘（生产环境），把 path.data 指向独立数据盘以隔离 IO。
内存与磁盘配比经验值：对于一般日志类文件，1G 内存能存储 48G~96GB 数据。

**解析**

回答要点：SSD 为主（性能）；历史数据用 HDD 降成本（冷热分离）；独立数据盘隔离 IO。【衍生知识点】1G 内存≈48G~96GB 日志数据，可据此反推节点堆内存与分片数。

---

### 65. 【面试】Logstash 和 Filebeat 的区别是什么？

**答案**

1) 实现语言与资源占用：Logstash 基于 Java + Ruby，运行时至少需要 500M 以上内存，消耗较多内存和磁盘；Filebeat 基于 Go 开发，只占用 10M 左右内存，部署方便、更省资源。
2) 功能定位：Logstash 功能更丰富，是完整的数据处理管道，可以把非 JSON 格式日志统一转换为 JSON，支持多目标输出，具备更强大的过滤转换能力（grok/date/geoip/mutate/useragent 等大量插件）；Filebeat 轻量，只做日志采集并转发，处理能力相对简单（仅支持简单处理）。
3) 部署位置：Logstash 资源消耗大，不适合在每个采集主机上安装，通常集中部署在几台服务器上；Filebeat 作为代理安装在每台需要采集日志的主机上。
4) 生产组合：一般用 Filebeat 在各业务主机采集日志，再发送到集中部署的 Logstash 做过滤转换，最后写入 Elasticsearch，形成 Filebeat + Logstash + Elasticsearch + Kibana 架构。

**解析**

回答要点：语言/资源（Java+Ruby 500M vs Go 10M）、功能（全功能管道 vs 轻量采集）、部署位置（集中 vs 每台主机）。【衍生知识点】Filebeat 支持多输入但不支持多输出。

---

### 66. 【面试】ELK 有哪些优化点？

**答案**

可以从 JVM、系统、分片、架构四个层面优化：
1) JVM/内存优化：Xms 与 Xmx 设置为物理内存的一半且两者相等，最大不超过 30GB（26GB 较安全），避免超过压缩 oops 阈值导致指针变 64 位；开启 bootstrap.memory_lock: true 锁定内存减少 swap，需配合 LimitMEMLOCK=infinity。
2) 系统内核参数：vm.max_map_count=262144、fs.file-max；limits.conf 中调大 nofile/nproc/memlock；systemd 服务中 LimitNOFILE=1000000、LimitNPROC=65535。
3) 分片优化：单个分片控制在 30-50GB；合理设置 number_of_shards/number_of_replicas（7.X 默认 1 主 1 副）；分片尽量均匀分布在节点上；避免过多小分片导致碎片化。
4) 架构优化：冷热分离（热数据 SSD、冷数据 HDD）；读写分离；大数据量时增加 Coordinating 节点做负载均衡、降低 Master 与 Data 节点负载；引入 Redis/Kafka 做缓冲削峰。
5) 引擎侧：Logstash 侧调优 pipeline.workers / pipeline.batch.size（默认 125）/ pipeline.batch.delay；Filebeat 侧调优 spool_size、backoff 等。
6) 磁盘：数据盘使用 SSD，单独挂载，预留 20% 空间。

**解析**

回答要点：JVM（一半内存、≤30G、memory_lock）、系统参数、分片大小与数量、冷热分离/读写分离/协调节点、Logstash+Filebeat 参数。【衍生知识点】堆内存过大还会导致 GC 的 Stop-the-World 时间过长。

---

### 67. 【面试】日志分析管理平台用了 ES、Logstash、Filebeat，你负责部署还是开发？主要负责哪部分？

**答案**

这是一道考察个人职责与项目经验的开放题，回答要具体、可落地，建议按「平台搭建 + 采集配置 + 可视化 + 运维优化」展开：
1) 平台部署：我负责 ELK 集群的部署，包括 ES 集群（3 节点，规划 Master/Data 角色）、配置文件编写（cluster.name、node.name、network.host、discovery.seed_hosts、cluster.initial_master_nodes）、内核与 JVM 参数优化（vm.max_map_count、堆内存设置）、目录权限、systemd 服务；Kibana 部署与索引模式创建；Logstash 集中部署与管道配置。
2) 日志采集：在各业务主机安装 Filebeat，配置 filebeat.inputs 采集 Nginx/Tomcat/系统日志，配置 multiline 处理 Java 堆栈，用 tags/fields 区分日志类型，output 指向 Logstash/Redis/Kafka。
3) 日志解析与存储：用 Logstash 的 grok 解析日志为 JSON，date 修正 @timestamp，geoip 做地理分析；用模板控制索引分片数，按日期滚动索引。
4) 可视化与告警：Kibana 创建索引模式与仪表盘，做访问量 TOP IP、状态码分布、地图等图表。
5) 运维优化：冷热分离、扩容缩容、故障恢复（节点宕机自动重新分配分片）、监控 ES 健康状态（_cluster/health）。
（回答时结合自己的实际角色说明「哪些是我独立完成、哪些是团队协作」，突出可复现的细节更能体现真实经验。）

**解析**

回答要点：先说清个人角色，再按部署→采集→解析存储→可视化→运维优化分层说明负责内容，用具体配置细节体现真实性。【衍生知识点】面试官常在追问中考察「是否真做过」，要能回答具体版本、参数、踩过的坑。

---

### 68. 【面试】Logstash 与 Filebeat 的工作流程是怎么样的？数据是如何传递的？

**答案**

一、Filebeat 工作流程：
1) 启动 Filebeat 时启动一个或多个 input，在指定位置（paths）查找日志文件；
2) 对找到的每个日志启动收集器 harvester 进程，每个 harvester 读取一个日志文件的新内容；
3) harvester 把新日志数据发送到 libbeat，libbeat 汇总事件并发送到配置的输出（Elasticsearch/Logstash/Redis/Kafka）；
4) Filebeat 通过注册表（registry）文件记录每个文件的读取状态（offset），避免重启后重复采集。
二、Logstash 工作流程（管道三段式）：
1) Input：从多个来源采集数据（stdin/file/kafka/redis/beats/http/syslog/tcp 等）；
2) Filter：对数据做过滤和转换（grok 结构化为 JSON、date 修正时间、geoip 解析地理、mutate 增删改字段）；
3) Output：把处理后的数据输出到 Elasticsearch、File、Stdout、Redis、Kafka、MySQL 等。
三、数据传递链路（典型）：业务主机 Filebeat 采集 → 发送到 Logstash 的 5044 端口（Beats input）→ Logstash 做 grok/date 解析 → 写入 Elasticsearch → Kibana 检索与可视化。
若要削峰解耦，可在中间加一层 Redis/Kafka：Filebeat → Redis/Kafka → Logstash → ES。
Filebeat 支持多输入但不支持多输出；Logstash 支持多目标输出。

**解析**

回答要点：Filebeat 的 input→harvester→libbeat→output 流程与 registry 记录；Logstash 的 input→filter→output 管道；完整链路 Filebeat→Logstash(5044)→ES→Kibana，可加 Redis/Kafka 缓冲。【衍生知识点】多台 Logstash 时配 loadbalance: true。

---

### 69. 【面试】在 ES 里进行了怎样的索引设计和索引管理？

**答案**

1) 索引命名：索引名必须全部小写（不支持大写字母），并按业务/来源+日期命名，如 nginx-accesslog-0.107-2021.02.04、filebeat-7.6.2-2024.04.21-000001，便于用索引模式（通配符 nginx-access.*）统一检索，也便于按日期滚动和清理。
2) 分片与副本设计：创建索引时指定 number_of_shards 与 number_of_replicas（7.X 默认 1 主 1 副），单个分片控制在 30-50GB；分片数创建后不能改，副本数可动态调整。大规模集群可用 _template 模板统一默认分片配置，如 index_patterns: ["*"]。
3) 冷热设计：通过 node.attr.temperature 打标签 + index.routing.allocation.require.temperature 把索引分为热索引/冷索引，实现冷热分离，降低存储成本。
4) 索引生命周期：配合 ILM 做 rollover、删除历史索引，控制磁盘占用（每天数据量大时要定期清理磁盘）。
5) 写入与查询：8.X 后写入用 PUT {index}/_doc/（type 已删除）；查询用 DSL，如 GET _search { "query":{"match_all":{}} }；常用 _cat/indices?v、_cat/shards?v&h=index,shard,prirep,node 观察索引与分片分布。
6) 索引模板：用 PUT _template 定义索引的默认分片/副本数，保证新建索引规格一致。

**解析**

回答要点：命名（小写+日期）、分片副本设计（30-50GB、1主1副）、模板、冷热索引、ILM、写入查询 API。【衍生知识点】索引名不支持大写字母；分片数不可改。

---

### 70. 【面试】ELK 监控什么样的日志？

**答案**

ELK 可监控各类日志，常见包括：
1) Web/中间件访问与错误日志：Nginx 的 access.log（访问日志）和 error.log（错误日志）、Tomcat 的访问日志与 catalina 错误日志、Haproxy 日志等，用于分析访问量、响应码分布、慢请求、异常。
2) 系统日志：Linux 的 syslog（/var/log/syslog）、secure、messages，用于登录与系统事件监控。
3) 应用日志：Java 应用日志（含多行堆栈，用 Filebeat/Logstash 的 multiline 合并）、自定义业务日志。
4) 数据库/中间件日志：MySQL、Redis 等日志。
5) 容器日志：Kubernetes/容器环境下采集 /var/log/containers/*.log。
6) 性能与可用性指标：用 Metricbeat 采集系统和服务性能指标（CPU/内存/磁盘/网络），用 Heartbeat 检测服务可用性（uptime）。
监控目的：通过汇总分布在不同主机/容器的日志，集中检索与可视化，快速定位故障根因、做安全与事件管理、业务分析（如访问量统计、TOP IP、状态码趋势、地理分布）。

**解析**

回答要点：Web/中间件日志、系统日志、应用日志、数据库日志、容器日志、性能指标与可用性；目的是集中检索、故障定位、安全与业务分析。【衍生知识点】Metricbeat 采指标、Heartbeat 测可用性，也常与 ES 一起使用。

---

### 71. 【面试】Logstash 用到了哪些插件？请按输入、过滤、输出分类说明。

**答案**

Logstash 是 ELK 中插件最丰富的组件，按管道三段分类：
1) 输入 Input 插件：stdin（标准输入）、file（文件）、beats（接收 Filebeat，默认 5044）、http（HTTP 请求）、redis、kafka、syslog、tcp/udp 等。
2) 过滤 Filter 插件：
   - grok：把非结构化日志（Nginx/syslog/apache/MySQL）解析为 JSON，常用内置模式 %{COMBINEDAPACHELOG}；
   - date：把日志中的时间字符串解析后写入 @timestamp 或指定字段（参数 match/target/timezone）；
   - geoip：按 IP 地址解析经纬度、国家、城市等地域信息，用于地理数据分析；
   - useragent：解析 user-agent，提取浏览器、设备、操作系统；
   - mutate：字段增删改（remove_field/split/add_field/convert/gsub）；
   - 以及条件判断（if/else）用于分流处理。
3) 输出 Output 插件：stdout（调试）、file、elasticsearch（最常用）、redis、kafka、mysql（需 logstash-output-jdbc 插件）等。
安装/查看插件：/usr/share/logstash/bin/logstash-plugin list。

**解析**

回答要点：Input（stdin/file/beats/http/redis/kafka/syslog）、Filter（grok/date/geoip/useragent/mutate）、Output（stdout/file/elasticsearch/redis/kafka/mysql）。【衍生知识点】写入 MySQL 需额外安装 logstash-output-jdbc 插件与 mysql-connector-java 驱动。

---

### 72. 【面试】日志分析平台的架构是怎样的？请给出完整的方案。

**答案**

标准方案：Filebeat + Logstash + Elasticsearch + Kibana（可加 Redis/Kafka 做缓冲）。
1) 采集层：各业务主机部署 Filebeat（Go，约 10M 内存），tail 采集 Nginx/Tomcat/系统/应用日志，用 tags、fields 区分日志类型，多行日志用 multiline 合并；输出到 Logstash / Redis / Kafka。
2) 缓冲层（可选，用于削峰解耦）：Filebeat → Redis 或 Kafka → Logstash。Redis 基于内存、支持多节点负载均衡但存在单点（不支持集群）；Kafka 吞吐更高、更可靠，适合大流量。
3) 处理层：Logstash 集中部署，用 grok 解析为 JSON、date 修正 @timestamp、geoip 做地理分析、mutate 清洗字段；可多台 Logstash 配 loadbalance: true 做负载均衡。
4) 存储层：Elasticsearch 集群（3 台 Master+Data 节点，或专用 Master），9200/9300 端口，做冷热分离（热 SSD、冷 HDD），用索引模板与 ILM 管理索引，单个分片 30-50GB。
5) 展示层：Kibana（5601）创建索引模式与 Dashboard，做访问量、状态码、TOP IP、地图等可视化；可用 Nginx 反向代理 + htpasswd 加登录认证。
6) 监控指标：Metricbeat 采性能指标、Heartbeat 检测可用性，也写入 ES 统一展示。
7) 运维：_cluster/health 监控集群状态（green）；节点宕机自动故障转移；按需扩容缩容（新增 Data 节点自动重新分配分片）。
一句话概括：Filebeat 采集 → Redis/Kafka 缓冲 → Logstash 解析过滤 → Elasticsearch 存储 → Kibana 展示。

**解析**

回答要点：采集（Filebeat）+缓冲（Redis/Kafka）+处理（Logstash）+存储（ES 集群，冷热分离）+展示（Kibana），附端口与运维要点。【衍生知识点】能画出数据流图并说明每层选型理由是加分项。

---

### 73. 【面试】简述 ELK 的部署架构和工作原理。

**答案**

一、部署架构（以 3 节点 ES 集群为例）：
1) Elasticsearch 集群：3 台主机（如 es-node1/2/3，10.0.0.101-103），配置相同的 cluster.name、discovery.seed_hosts、cluster.initial_master_nodes，不同的 node.name；9200 对外 HTTP，9300 集群内部通信；规划 Master/Data 角色，做 JVM（一半内存、≤30G）与内核参数优化。
2) 日志采集端：各业务主机安装 Filebeat 采集日志。
3) 处理端：Logstash 集中部署（可多台），监听 5044 接收 Filebeat 数据。
4) 展示端：Kibana 部署在独立节点（建议，性能原因），5601 端口，连接 ES 集群。
5) 可选缓冲：Redis/Kafka 插在 Filebeat 与 Logstash 之间。
二、工作原理：
1) 采集：Filebeat 的 input 发现日志文件，harvester 逐行读取，libbeat 汇总后输出；
2) 传输：数据经 Beats 协议（5044）发往 Logstash；
3) 处理：Logstash input→filter→output 管道，grok 解析、date 修正时间、geoip 加地理信息；
4) 存储：数据以 JSON 文档写入 ES 索引，ES 用倒排索引建立全文检索能力，文档按 shard = hash(routing) % 主分片数 路由到对应主分片，并同步到副本分片（最终一致性 + refresh 每秒可见）；
5) 检索与展示：Kibana 通过 REST API 查询 ES 并按索引模式做可视化；
6) 高可用：Master 通过选举产生，节点宕机时自动故障转移（Red→Yellow→Green），分片自动重新分布。

**解析**

回答要点：部署（ES 集群 + Filebeat + Logstash + Kibana + 可选 Redis/Kafka）与原理（采集→传输→处理→倒排索引存储与分片路由→可视化→选举与故障转移）。【衍生知识点】ES 基于 Lucene、近实时（约 1 秒）、最终一致性。

---

### 74. 【面试】什么是倒排索引？为什么 Elasticsearch 检索这么快？

**答案**

1) 定义：倒排索引（inverted index）是 ES 使用的核心数据结构，它列出在所有文档中出现的每个特有词汇，并记录包含每个词汇的全部文档（词→文档）。与之相对的正排索引是「文档→词」，查找某个词需要遍历所有文档。
2) 为什么快：全文检索时，ES 只需在倒排索引中直接定位关键词对应的文档列表（文档 ID 集合），再做交集/并集运算，无需逐条扫描文档内容，因此即使百亿级数据也能达到秒级响应。
3) 存储形式：ES 以 JSON 文档形式存储数据，索引时把文档内容分词后构建倒排索引；文档物理上按分片分布在不同节点，查询时各分片并行执行再由协调节点汇总（Gather/Reduce）。
4) 实现基础：底层基于 Apache Lucene，Lucene 提供了高性能的倒排索引与分词、评分能力。
此外 ES 是近实时（NRT）的：文档写入后默认经 refresh（约 1 秒）即可被搜索到，兼顾写入吞吐与检索实时性。

**解析**

回答要点：倒排索引是词→文档的映射；检索时直接定位文档集合而非全表扫描；基于 Lucene；分片并行 + 协调节点聚合；NRT 约 1 秒可见。【衍生知识点】ES 快还依赖分片水平拆分与副本并行读。

---

### 75. 【面试】ES 集群的选举机制是怎样的？

**答案**

1) 发起者：选举由 master-eligible（有资格充当 Master 的）节点发起。当该节点发现当前节点不是 Master，并通过 ZenDiscovery 模块 ping 其他节点，发现超过 minimum_master_nodes 个节点无法连接 Master 时，就会发起新的选举。
2) 选举规则：优先选举 ClusterStateVersion（集群状态版本号）最大的 Node；如果 ClusterStateVersion 相同，则选举 Node ID 最小的 Node。
3) 为什么这样选：ClusterStateVersion 每次集群选举都会更新，最大的版本号意味着与原集群数据最接近或相同，从而尽量避免数据丢失；Node ID 是第一次服务启动时随机生成的，选用最小的 ID 主要是为了选举的稳定性，尽量少出现选不出 Master 的问题。
4) 约束：每个集群中只有一个 Master 节点；能参与投票的 master-eligible 节点建议为奇数台（生产通常 3 台，避免脑裂）；集群中损坏的节点不能超过集群一半以上，否则集群将无法提供服务。
5) 初始化：集群第一次初始化时由 cluster.initial_master_nodes 指定有选举资格的节点，只在初始化时有效，后续配置无效。

**解析**

回答要点：master-eligible 发起、ZenDiscovery ping、超半数失联则选举；优先 ClusterStateVersion 最大，其次 Node ID 最小；只有一个 Master；损坏节点不超一半。【衍生知识点】Master 维护并同步 Cluster State 给所有节点。

---

### 76. 【面试】ES 中分片（Shard）和副本（Replica）的作用与区别是什么？

**答案**

一、分片 Shard：
1) 作用：ES 数据可能达到 PB 级，单节点容量和性能无法满足，于是把一个索引的数据分割成多个小的分片，分布到不同节点，实现数据的分布存储与性能/容量的水平扩展；读取时可多节点并行读取，提升性能；某个分片所在主机宕机也不影响其他节点分片的读取。
2) 特性：7.X 默认每个索引 1 个分片（之前默认 5 个）；分片数是索引创建时指定的，之后不能修改，因为文档路由 shard = hash(routing) % number_of_primary_shards 依赖它。
二、副本 Replica：
1) 作用：对每个分片进行复制生成副本（备份），实现数据高可用；副本还允许扩展搜索量或吞吐量，因为搜索可以在所有副本上并行执行。
2) 特性：ES 分片分为主分片（primary shard）和副本分片（replica shard），通常分布在不同节点；主分片负责读写，副本分片只支持读；每个分片只有一个主分片，副本可以有多个；一个副本本质上是一个主分片的备份；副本是从主分片复制过来的。
三、关键区别：number_of_replicas 表示副本分片数量，不包含主分片（只包括备份），这与 Kafka 的副本概念不同。例如 1 主 1 副时，number_of_replicas=1。
四、数据同步：主分片处理所有写操作并复制到副本分片，主分片失败时副本会被提升为新的主分片。

**解析**

回答要点：分片→水平拆分/并行读写/容量扩展，数量不可改；副本→高可用/并行读，只读、不含主分片、可动态调整。【衍生知识点】副本不能与主分片分在同一节点。

---

### 77. 【面试】请说明 ES 中文档的创建/删除流程与读取流程。

**答案**

一、写入（创建/删除）流程：
1) 客户端向集群中某个节点 Node1 发送新建或删除文档的请求；
2) Node1（协调节点）使用文档的 _id 通过公式 shard = hash(routing) % number_of_primary_shards 确定文档属于哪个分片（如分片 0）；
3) 根据集群状态找到该分片主分片所在的节点（如 Node3），把请求转发过去；
4) Node3 在主分片上执行创建或删除操作；
5) 执行成功后，Node3 将请求并行转发到其他节点（Node1、Node2）上的副本分片；
6) Node3 向协调节点 Node1 报告成功，协调节点再向客户端报告成功。
二、读取流程：
1) 客户端向某个节点 Node1 发送读取请求；
2) 节点用文档 _id 确定文档属于哪个分片（如分片 0，其主副本分片存在于所有三个节点上）；
3) 协调节点在处理读取请求时，每次请求都会通过轮询（round-robin）主分片与各副本分片来达到负载均衡，此次将请求转发到 Node2；
4) Node2 将文档返回给 Node1，再由 Node1 返回给客户端。
三、要点理解：可以发送请求到集群中的任一节点，每个节点都知道集群中任一文档的位置，都有能力接收请求并转发到真正存储数据的节点上。

**解析**

回答要点：写入=协调节点按 _id 定位分片→转主分片执行→并行复制到副本→逐级报告；读取=按 _id 定位分片→协调节点轮询主/副本分片负载均衡→返回。【衍生知识点】写操作必须经主分片，读操作可走副本。

---

### 78. 【面试】ES 集群发生故障时如何进行故障转移？请描述完整过程。

**答案**

以 3 节点集群、一个索引有 3 个主分片和 3 个副本分片为例，假设 Master 节点 node3 宕机：
1) 重新选举：node1 和 node2 发现 Master 节点 node3 无法响应，过一段时间后重新发起 Master 选举，比如选出 node1 为新 Master；此时集群状态变为 Red（因为 node3 上原有的主分片 P0 和副本 R2 丢失）。无论选出哪个新 Master，都不影响后续分片的重新分布结果。
2) 主分片调整：新 Master node1 发现在原来 node3 上的主分片 P0 丢失，于是将 node2 上的副本 R0 提升为主分片；此时所有主分片都正常分配，但分片 0 和 2 没有副本分片，集群状态变为 Yellow。
3) 副本分片调整：node1 为 P0 和 P2 主分片重新生成新的副本分片 R0、R1，此时集群状态恢复 Green。
4) 后续：修复好 node3 节点后，Master 不会重新选举，但会自动将各个分片重新均匀分配，保证主分片尽可能分布在每个节点上、副本分片也尽可能分布在不同节点上；重新分配的过程需要一段时间才能完成。
颜色含义：Green=主副本都正常；Yellow=主分片正常但有副本未分配；Red=有主分片未分配（数据不完整）。

**解析**

回答要点：重新选举（Red）→ 提升副本为主分片（Yellow）→ 重建副本（Green）→ 节点恢复后自动均衡；三色含义。【衍生知识点】配置 _template 可统一新索引的分片/副本数。

---

### 79. 【面试】ES 集群如何做扩容与缩容？各需要注意什么？

**答案**

一、扩容：
1) 增加 Data 节点：当磁盘容量无法满足需求，或磁盘读写压力大时，可以增加数据节点。在新节点安装 ES，配置与集群一致的 cluster.name、discovery.seed_hosts，设置唯一的 node.name，启动后节点自动加入集群。
2) 集群会动态地把分片重新均匀分配和负载均衡：例如原来 2 个节点每节点 3 个分片（共 6 个），新增 1 个节点后集群动态把这 6 个分片分配到 3 个节点上，最终每节点 2 个分片。
3) 增加 Coordinating 节点：当系统中有大量复杂查询及聚合时，增加 Coordinating 节点提升查询性能，实现读写分离、扮演负载均衡。
二、缩容：
1) 从集群中删除节点时，需按一定顺序逐个停止服务，节点即可自动退出集群；
2) 关键注意：停止服务前要观察索引情况，按顺序关机——先关闭一台主机，等数据同步完成后，再关闭第二台主机，防止数据丢失。
3) Data 节点转 Coordinating 节点：修改 elasticsearch.yml 把 node.data 改为 false（并设 node.master: false）；注意如果原节点已存有数据，把 node.data 由 true 改为 false 时必须先执行 /usr/share/elasticsearch/bin/elasticsearch-node repurpose 清理数据，否则无法启动。

**解析**

回答要点：扩容=加 Data 节点（自动重新分配分片）/加 Coordinating 节点；缩容=按顺序逐台停服并等数据同步完成；Data→Coordinating 需先 elasticsearch-node repurpose。【衍生知识点】新增节点到已有集群时可不配置 cluster.initial_master_nodes。

---

### 80. 【面试】ELK、EFK、Loki 三种日志方案有何区别？如何选型？

**答案**

1) ELK：Elasticsearch + Logstash + Kibana（生产常用 Filebeat 采集）。Elasticsearch 是实时全文搜索/存储/分析引擎（基于 Lucene、Java）；Logstash 是功能最丰富的数据处理管道（Java+Ruby，占用 500M 以上内存）；Kibana 做可视化。功能强大、生态成熟，但规模复杂、资源占用高。
2) EFK：Elasticsearch + Fluentd（或 Fluent Bit）+ Kibana。Fluentd 由 Treasure Data 赞助、基于 C 和 Ruby，约 40MB，插件超 650 个，是 DevOps 尤其是 Kubernetes 部署的热门选择；Fluent Bit 基于 C，约 450KB，插件约 35 个，资源占用极小，适合嵌入式、边缘及资源受限环境。两者都是 CNCF 项目、Apache 2.0 许可、供应商中立。
3) Loki：由 Grafana Labs 开源、基于 Go 的水平可扩展多租户日志聚合系统。受 Prometheus 启发，使用标签作为索引而不是全文检索，极大降低索引存储；堆栈为 Loki（存储/查询，功能类似 ES）+ Promtail（采集代理，类似 Filebeat）+ Grafana（展示，类似 Kibana）。更简单、更省成本，适合中小型规模环境。
选型建议：需要强大的全文检索与复杂分析、生态成熟 → ELK/EFK；Kubernetes 化、追求轻量与供应商中立 → EFK（Fluent Bit）；已有 Grafana/Prometheus 体系、追求低成本与简单运维 → Loki。

**解析**

回答要点：ELK（成熟功能强）、EFK（Fluentd/Fluent Bit，轻量、K8s 友好、CNCF）、Loki（标签索引、省成本、Grafana 体系）。【衍生知识点】Loki 不对日志做全文索引，这是与 ES 最本质的差异。

---

### 81. 【面试】grok 插件是什么？如何使用 grok 把 Nginx 日志解析为 JSON？

**答案**

1) grok 是 Logstash 的过滤器插件，用于描述日志格式的结构，内置超过 120 种 grok 模式抽象概念（如 IPv6 地址、UNIX 路径、月份名称）。它基于正则表达式技术，用内置正则别名来表示和匹配日志，从而把非结构化日志解析为可查询的结构化 JSON。
2) 适用场景：非常适合将 syslog 日志、Apache/Nginx 等 web 服务器日志、MySQL 日志等格式转换为 JSON。
3) 用法示例（解析 Nginx 访问日志）：
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
}
其中 %{COMBINEDAPACHELOG} 是内置模式，一行即可把 Nginx/Apache 访问日志解析为 clientip、timestamp、verb、request、response、bytes 等字段。
4) 自定义模式写法：%{PATTERN_NAME:field_name}，例如 %{TIMESTAMP_ISO8601:timestamp} \[%{IPV4:ip};%{WORD:environment}\] %{LOGLEVEL:log_level} %{GREEDYDATA:message}。
5) 调试工具：可用 grokdebugger / grokconstructor / Kibana 的 Dev Tools → Grok Debugger 自动生成与验证模式。

**解析**

回答要点：grok 是基于正则别名的解析过滤器，120+ 内置模式；Nginx 日志用 %{COMBINEDAPACHELOG}；自定义用 %{模式:字段名}；可用 Grok Debugger 调试。【衍生知识点】grok 支持的 regexp 与 Filebeat 的 multiline 正则有所不同。

---

### 82. 【面试】Filebeat / Logstash 如何处理 Java 的多行异常堆栈日志？

**答案**

Java 异常堆栈是多行日志（第一行是异常信息，后续行是 at ... 调用链），必须合并成一个事件，否则每行会被当成独立日志，无法检索完整异常。
一、Filebeat 的 multiline 配置：
filebeat.inputs:
- type: log
  paths: [/var/log/tomcat/catalina.out]
  multiline.pattern: '^\['
  multiline.negate: true
  multiline.match: after
- multiline.pattern：指定匹配的正则表达式；
- multiline.negate：默认 false 表示按模式匹配合并，true 表示对匹配条件取反（如「将所有不以 [ 开头的行合并到上一行」）；
- multiline.match：指定匹配行组合成事件的位置（before 或 after）;
- multiline.max_lines：可组合成一个事件的最大行数，默认 500，超过则丢弃；
- multiline.timeout：超时时间，默认 5s，超时后即使没匹配也发送日志。
二、Logstash 的 multiline 过滤器：在 filter 中使用 multiline codec/pattern 合并堆栈行，或用 grok 提取异常类与堆栈信息。
三、要点：正则要锚定在「日志行的起始标记」上（如时间戳 ^\d{4}- 或 ^\[），negate/match 组合决定了合并方向，配置不当时会把整个文件合并成一个事件或每行独立成一个事件。

**解析**

回答要点：用 multiline.pattern（正则）+ negate + match 合并；max_lines 默认 500、timeout 默认 5s；Logstash 侧用 multiline filter。【衍生知识点】Tomcat 日志转 JSON 后更易解析，可直接用 Filebeat 的 json 选项。

---

### 83. 【面试】为什么要在 ELK 架构中引入 Redis 或 Kafka 做日志缓冲？有何局限？

**答案**

1) 目的：利用 Redis/Kafka 缓存日志数据，主要解决三个问题——应用解耦（采集端与处理端不直接依赖，Logstash 宕机不影响采集）、异步消息（Filebeat 写完即返回，不必等待 Logstash 处理）、流量削峰（日志高峰先写入缓冲，Logstash 按自己节奏消费，避免 ES 被打垮）。
2) 典型链路：Filebeat → Redis/Kafka → Logstash → Elasticsearch → Kibana。例如 Nginx 服务器的 Filebeat 把日志写入 Redis，再由另一台 Logstash 从 Redis 取出写入 ES。
3) Redis 的局限：不支持 Redis 集群，存在单点问题（但可以多节点负载均衡）；基于内存，存放数据量有限。
4) Kafka 的优势：高吞吐、可持久化、支持分区与多副本，更适合大流量与高可靠场景；Filebeat 输出到 Kafka 时可配置 required_acks（默认 1）、compression、max_message_bytes。
5) 选择建议：日志量大且要求可靠 → Kafka；规模较小、追求简单 → Redis（注意内存与单点）。

**解析**

回答要点：解耦/异步/削峰；链路 Filebeat→Redis/Kafka→Logstash→ES；Redis 单点+内存有限，Kafka 高吞吐可靠。【衍生知识点】Redis 输出可配多节点做负载均衡。

---

### 84. 【面试】Kibana 如何做访问安全认证？如何管理索引与可视化？

**答案**

一、安全认证（常用 Nginx 反向代理 + Basic 认证）：
1) 修改 kibana.yml：把 server.host 由 0.0.0.0 改为 127.0.0.1，使 Kibana 只允许本机访问；server.port 保持 5601；
2) 安装 nginx 与 apache2-utils，用 htpasswd -bc /etc/nginx/conf.d/kibana.users admin 123456 生成用户密码文件，并 chmod 600、chown 给 www-data；
3) 配置 Nginx：server 中设置 auth_basic "Kibana Website" 与 auth_basic_user_file，location / 下 proxy_pass http://127.0.0.1:5601（可配 upstream 做负载均衡 + Upgrade/Connection 头支持 WebSocket）；
4) nginx -t 检查后 reload，浏览器访问域名用 admin/123456 登录。
此外 Kibana 8.X 可开启 xpack.security 功能连接 ES 做原生认证，或禁用 xpack.security 简化连接。
二、索引与可视化管理：
1) 管理索引：在 Dev Tools 中执行 GET _search、GET _search { "query":{"match_all":{}} }，或 POST /index_wang/_doc/1 写入文档、GET /index_wang/_doc/1 查询；
2) 创建索引模式（8.X 改名为索引视图）：用通配符匹配一组索引（如 nginx-access.*），供检索与可视化使用；
3) 可视化：支持 lens、垂直/水平条形图、饼状图、面积图、线图、热力图、标签云、地图、数据表、Markdown 等；把多个可视化放入 Dashboard 仪表盘，并通过固定链接或嵌入代码（iframe embed=true）共享。

**解析**

回答要点：Nginx 反向代理 + htpasswd Basic 认证（server.host 改 127.0.0.1）；索引模式/索引视图做匹配；Dev Tools 管理索引；多种可视化 + Dashboard 共享。【衍生知识点】Kibana 版本需与 ES 相同。

---

### 85. 【面试】如何监控 ES 集群的健康状态？各状态颜色代表什么？

**答案**

1) 常用命令（REST API，9200 端口）：
   - curl http://127.0.0.1:9200/_cat/health?v 或 curl 'http://127.0.0.1:9200/_cluster/health?pretty=true' 查看集群健康；
   - curl 'http://127.0.0.1:9200/_cat/nodes?v' 查看所有节点信息（heap.percent、ram.percent、cpu、load、node.role、master 标记 *）；
   - curl 'http://127.0.0.1:9200/_cat/indices?v' 查看所有索引及其主/副本数、文档数、存储大小；
   - curl 'http://127.0.0.1:9200/_cat/shards?v&h=index,shard,prirep,node' 查看分片分布；
   - curl 'http://127.0.0.1:9200/_cat/nodeattrs?v' 查看节点标签（冷热属性）；
   - curl http://127.0.0.1:9200/_cat 查看支持的全部指令。
2) 健康状态颜色：
   - Green：主分片和副本分片都正常分配，集群完全健康（status 字段为 green 才是正常状态）；
   - Yellow：所有主分片正常，但部分副本分片未分配（常见于单节点或节点故障后副本待重建）；
   - Red：至少有一个主分片未分配，数据不完整，需要立即处理。
3) 自动化监控：可写 Python 脚本定时 curl _cluster/health 解析 status，非 green 则发邮件告警（课程提供 els-cluster-monitor.py 示例）；也可用 Prometheus + Grafana 或 Kibana 自身做可视化监控。
4) 常见异常：unassigned_shards 不为 0、pending_tasks 积压、节点堆内存接近上限（heap.percent）等。

**解析**

回答要点：_cat/health、_cluster/health、_cat/nodes/indices/shards 等命令；Green/Yellow/Red 含义；脚本定时检查 + 邮件告警。【衍生知识点】status 为 green 才是正常；节点损坏不能超过集群一半。

---
