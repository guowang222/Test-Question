# 马哥ELK课件 —— 试题册

> 共 85 题。答案与解析见《答案册-马哥ELK课件.md》。


## ELK笔试

### 1. 【ELK概述】ELK 是由三款开源项目组成的日志分析系统，这三个项目分别是？

- **A.** Elasticsearch、Logstash、Kibana
- **B.** Elasticsearch、Fluentd、Kibana
- **C.** Elasticsearch、Filebeat、Kibana
- **D.** Elasticsearch、Logstash、Grafana

### 2. 【ELK概述】「Elastic Stack」这个称呼是在哪个版本加入 Beats 套件之后才出现的？

- **A.** 3.0 版本
- **B.** 5.0 版本
- **C.** 7.0 版本
- **D.** 8.0 版本

### 3. 【ELK概述】Elasticsearch 是基于下列哪款全文搜索引擎开发而来的？

- **A.** Apache Solr
- **B.** Apache Lucene
- **C.** Elasticsearch 自研引擎
- **D.** Apache Kafka

### 4. 【ELK概述】关于 Elasticsearch 的近实时（NRT）特性，说法正确的是？

- **A.** 文档索引后需要等待 1 小时才可搜索
- **B.** 从索引一个文档到该文档可被搜索的延时一般只有约 1 秒
- **C.** ES 是实时系统，写入后立即可搜索且无任何延时
- **D.** 只有重启集群后才能搜索到新数据

### 5. 【ELK概述】Elasticsearch 中用于快速全文搜索的核心数据结构是？

- **A.** B+ 树
- **B.** 倒排索引
- **C.** 哈希表
- **D.** 红黑树

### 6. 【ELK概述】Elasticsearch 中 type（类型）概念在哪个版本被彻底删除？

- **A.** 5.X
- **B.** 6.X
- **C.** 7.X
- **D.** 8.X

### 7. 【ELK概述】在关系型数据库与 Elasticsearch 的概念对应中，关系型数据库的「表 Table」对应 ES 的？

- **A.** 索引 Index
- **B.** 类型 Type（已废弃）
- **C.** 文档 Document
- **D.** 字段 Field

### 8. 【ELK概述】ES 的「副本（Replica）」在数量含义上与 Kafka 的副本有什么不同？

- **A.** 完全一致，都包含主分片
- **B.** ES 的副本数不包括主分片，只包括备份；这与 Kafka 不同
- **C.** ES 副本数包含主分片
- **D.** ES 没有副本概念

### 9. 【ELK概述】Logstash 是基于哪些语言开发的？

- **A.** 纯 Go
- **B.** 纯 Java
- **C.** Java 和 Ruby
- **D.** C 和 Ruby

### 10. 【ELK概述】Kibana 是基于下列哪种语言开发的？

- **A.** Java
- **B.** Ruby
- **C.** Go
- **D.** JavaScript / TypeScript

### 11. 【ELK概述】Loki 日志聚合系统与 ELK 相比，最大的设计差异是？

- **A.** Loki 对全文建立倒排索引
- **B.** Loki 不对日志做全文索引，而是像 Prometheus 一样使用标签作为索引
- **C.** Loki 不支持 Grafana 展示
- **D.** Loki 基于 Java 开发

### 12. 【ELK概述】关于 Fluentd 与 Fluent Bit 的对比，说法正确的是？

- **A.** Fluentd 基于 C 语言，Fluent Bit 基于 Ruby
- **B.** Fluent Bit 基于 C 语言，体积约 450KB，比 Fluentd 更轻量
- **C.** 两者体积都约 40MB
- **D.** Fluent Bit 支持 650 个以上插件

### 13. 【ES部署】Elasticsearch 对外提供 RESTful API 通信所使用的端口是？

- **A.** 9200
- **B.** 9300
- **C.** 5601
- **D.** 5044

### 14. 【ES部署】Elasticsearch 集群中节点之间通信（传输层）使用的端口是？

- **A.** 9200
- **B.** 9300
- **C.** 8080
- **D.** 2181

### 15. 【ES部署】安装 Elasticsearch 前需要修改内核参数 vm.max_map_count，官方建议的值是？

- **A.** 65530
- **B.** 262144
- **C.** 1048576
- **D.** 1000000

### 16. 【ES部署】关于 Elasticsearch 的 JVM 堆内存设置，正确的是？

- **A.** 堆内存越大越好，建议设置为物理内存的 90%
- **B.** Xms/Xmx 不超过物理内存的 50%，且最大不超过 30GB（26GB 较安全）
- **C.** 堆内存必须等于物理内存
- **D.** 堆内存上限固定为 64GB

### 17. 【ES部署】为保证查询性能，生产上建议单个分片（shard）的大小控制在什么范围？

- **A.** 1-5 GB
- **B.** 30-50 GB
- **C.** 100-200 GB
- **D.** 不限制

### 18. 【ES部署】Elasticsearch 7.X 创建一个索引时，默认的分片与副本数量为？

- **A.** 5 个主分片、1 个副本
- **B.** 1 个主分片、1 个副本
- **C.** 1 个主分片、0 个副本
- **D.** 3 个主分片、2 个副本

### 19. 【ES部署】创建索引后，下列哪项可以修改，哪项不能修改？

- **A.** 分片数和副本数都能改
- **B.** 分片数不能改，副本数可以改
- **C.** 分片数能改，副本数不能改
- **D.** 两者都不能改

### 20. 【ES部署】Elasticsearch 8.X / 9.X 相比 7.X 版本，在 JDK 与安全方面的重要变化是？

- **A.** 仍需要单独安装 JDK，且默认关闭安全认证
- **B.** 内置 JDK 不再支持自行安装，且默认开启 xpack.security 安全功能
- **C.** 不再需要 Java 环境
- **D.** 默认关闭 TLS

### 21. 【ES部署】要让一个节点只充当 Coordinating（协调）节点，需要如何配置？

- **A.** node.master: true, node.data: true
- **B.** node.master: false, node.data: false, node.ingest: false
- **C.** node.data: true 即可
- **D.** node.ml: true

### 22. 【ES部署】一个 ES 节点在默认情况下会同时扮演哪些角色？

- **A.** 只扮演 Master
- **B.** master-eligible、data node 和 ingest node
- **C.** 只扮演 Data
- **D.** 只扮演 Coordinating

### 23. 【ES部署】ES 集群发生主节点选举时，优先选举哪个节点？

- **A.** Node ID 最大的节点
- **B.** ClusterStateVersion 最大的节点，相同则选 Node ID 最小的
- **C.** 负载最低的节点
- **D.** 磁盘最大的节点

### 24. 【ES部署】ES 文档路由到主分片的计算公式是？

- **A.** shard = hash(routing) % number_of_replicas
- **B.** shard = hash(routing) % number_of_primary_shards
- **C.** shard = routing % number_of_nodes
- **D.** shard = md5(routing) / number_of_primary_shards

### 25. 【ES部署】ES 集群中某节点宕机后，集群状态的颜色变化顺序是？

- **A.** Green → Yellow → Red
- **B.** Red → Yellow → Green
- **C.** Yellow → Green → Red
- **D.** 始终为 Green

### 26. 【ES部署】实现 ES 数据冷热分离时，用于给节点打标签的配置项是？

- **A.** node.tag
- **B.** node.attr.{attribute}: {value}
- **C.** cluster.temperature
- **D.** node.role

### 27. 【ES部署】控制索引分片在哪些标签节点上分配的三个配置项不包括？

- **A.** index.routing.allocation.include.{attribute}
- **B.** index.routing.allocation.require.{attribute}
- **C.** index.routing.allocation.exclude.{attribute}
- **D.** index.routing.allocation.prefer.{attribute}

### 28. 【ES部署】ES 集群冷热分离架构的核心思想是？

- **A.** 所有节点都用最高配 SSD 保证性能
- **B.** 用高性能节点存热点数据、大容量低配节点存冷数据，兼顾性能与成本
- **C.** 只用一台大容量节点存所有数据
- **D.** 热数据放内存、冷数据放磁带

### 29. 【ES部署】Elasticsearch 常用的两个图形化管理插件是？

- **A.** Head 和 Cerebro
- **B.** Grafana 和 Prometheus
- **C.** Kibana 和 Logstash
- **D.** Zabbix 和 Nagios

### 30. 【Beats】生产环境一般用 Filebeat 替代 Logstash 收集日志，最主要的原因是？

- **A.** Filebeat 功能比 Logstash 更丰富
- **B.** Filebeat 基于 Go 开发、部署方便且仅占用约 10M 内存，更省资源
- **C.** Logstash 不支持过滤
- **D.** Filebeat 只支持一种输入

### 31. 【Beats】下列 Beats 组件与其用途对应错误的是？

- **A.** Metricbeat — 采集操作系统和服务的性能指标
- **B.** Heartbeat — ping 远程服务检测可用性
- **C.** Filebeat — 通过抓包监控网络和应用
- **D.** Packetbeat — 通过嗅探数据包监控网络和应用

### 32. 【Beats】关于 Filebeat 的输入输出能力，说法正确的是？

- **A.** 支持多个输入，也支持同时多个输出
- **B.** 支持多个输入，但不支持同时多个输出
- **C.** 只支持一个输入
- **D.** 支持多个输出但不支持多个输入

### 33. 【Beats】Filebeat 处理跨多行日志（如 Java 堆栈）时，multiline.max_lines 的默认值是？

- **A.** 100
- **B.** 500
- **C.** 1000
- **D.** 5000

### 34. 【Beats】Filebeat 配置中 json.keys_under_root: true 的作用是？

- **A.** 把 JSON 数据存储到 message 字段下
- **B.** 将 JSON 的 key 提升为输出文档的顶级字段，而不是嵌套在 message 中
- **C.** 删除 JSON 格式的日志
- **D.** 把日志转为 multiline 格式

### 35. 【Beats】Filebeat 中负责读取单个日志文件并把新数据发送到 libbeat 的进程是？

- **A.** prospector
- **B.** harvester
- **C.** libbeat
- **D.** shipper

### 36. 【Beats】Heartbeat 与 Metricbeat 的主要区别是？

- **A.** Heartbeat 采集性能指标，Metricbeat 检测可用性
- **B.** Heartbeat 用于 ping 远程服务检测可用性，Metricbeat 用于采集性能指标
- **C.** 两者功能完全一样
- **D.** Heartbeat 用于采集网络包

### 37. 【Logstash】Logstash 数据处理架构的三个阶段依次是？

- **A.** 采集、存储、展示
- **B.** 输入 Input、过滤 Filter、输出 Output
- **C.** 提取、转换、加载
- **D.** 接收、缓存、转发

### 38. 【Logstash】用于把非结构化日志（如 Nginx、syslog）解析为结构化 JSON 的 Logstash 过滤插件是？

- **A.** date
- **B.** grok
- **C.** mutate
- **D.** geoip

### 39. 【Logstash】Logstash 的 date 插件默认将解析出的时间写入哪个字段？

- **A.** timestamp
- **B.** access_time
- **C.** @timestamp
- **D.** date

### 40. 【Logstash】Logstash 中用于对字段做增删改（如删除字段、切割、类型转换、字符串替换）的过滤插件是？

- **A.** grok
- **B.** mutate
- **C.** geoip
- **D.** useragent

### 41. 【Logstash】执行 Logstash 时，用于检查配置文件语法是否正确的参数是？

- **A.** -e
- **B.** -f
- **C.** -t 或 --config.test_and_exit
- **D.** -r

### 42. 【Logstash】Logstash 接收 Filebeat 数据的默认 Beats 输入端口是？

- **A.** 5044
- **B.** 9200
- **C.** 9600
- **D.** 514

### 43. 【Logstash】关于 Logstash 配置文件 pipelines.yml 的默认配置，说法正确的是？

- **A.** 默认加载 /etc/logstash/conf.d/*.conf
- **B.** 默认只加载 /etc/logstash/logstash.conf
- **C.** 默认不加载任何配置
- **D.** 默认加载 /usr/share/logstash/*.conf

### 44. 【Kibana】Kibana 默认监听的端口是？

- **A.** 9200
- **B.** 5601
- **C.** 8080
- **D.** 3000

### 45. 【Kibana】Kibana 中的「索引模式 / 索引视图」的作用是？

- **A.** 用于存储日志原始数据
- **B.** 用于匹配一组索引，供后续检索与可视化使用
- **C.** 用于修改 ES 分片数量
- **D.** 用于配置 Logstash 管道

### 46. 【Kibana】通过 Nginx 为 Kibana 增加登录安全认证时，生成用户名密码文件的命令是？

- **A.** useradd
- **B.** htpasswd -bc
- **C.** openssl passwd
- **D.** echo > .htpasswd

### 47. 【综合实战】在 ELK 架构中引入 Redis（或 Kafka）作为日志缓冲层，其主要目的是？

- **A.** 提高日志的搜索速度
- **B.** 实现应用解耦、异步消息、流量削峰
- **C.** 替代 Elasticsearch 存储日志
- **D.** 压缩日志体积

### 48. 【综合实战】要让 Logstash 把日志写入 MySQL 数据库，需要安装的插件是？

- **A.** logstash-output-mysql
- **B.** logstash-output-jdbc
- **C.** logstash-output-elasticsearch
- **D.** logstash-filter-mutate

### 49. 【综合实战】在 Filebeat → Kafka → Logstash → Elasticsearch 链路中，Filebeat 输出到 Kafka 时 required_acks 的默认值是？

- **A.** 0
- **B.** 1
- **C.** -1
- **D.** all

### 50. 【ELK概述】ELK 是三个开源项目首字母的缩写，分别是 ______、______ 和 ______。

> 共 3 个空。

### 51. 【ES部署】安装 ES 前需修改内核参数，官方建议设置 vm.max_map_count = ______，该参数用于限制一个进程可拥有的 ______（虚拟内存区域）数量。

> 共 2 个空。

### 52. 【ES部署】Elasticsearch 对外提供 RESTful API 的端口是 ______，集群内部节点间通信的 transport 端口是 ______。

> 共 2 个空。

### 53. 【ES部署】ES 的 JVM 堆内存建议设置为物理内存的一半，且最大不超过 ______ GB，在多数系统上 ______ GB 是比较安全的。

> 共 2 个空。

### 54. 【ES部署】ES 文档路由到主分片的公式为 shard = hash(routing) % ______，其中 routing 默认是文档的 ______。

> 共 2 个空。

### 55. 【Logstash】Logstash 的数据处理架构分为三个阶段：______、______ 和 ______。

> 共 3 个空。

### 56. 【Beats】Filebeat 处理多行日志时，可组合成一个事件的最大行数由 multiline.max_lines 控制，默认值为 ______ 行；超时时间由 multiline.timeout 控制，默认值为 ______ 秒。

> 共 2 个空。

### 57. 【Kibana】Kibana 默认监听的端口是 ______，其配置项 i18n.locale 设置为 ______ 可切换为中文界面。

> 共 2 个空。

### 58. 【ELK概述】Elasticsearch 使用的数据结构称为 ______ 索引，它列出所有文档中出现的每个特有词汇，并能找到包含该词汇的全部文档；对应地，查询时使用的 JSON 风格请求语言称为 ______。

> 共 2 个空。

### 59. 【ES部署】为保证查询性能，生产上单个分片的大小建议控制在 ______ GB 之间；ES 7.X 创建索引时默认的副本数为 ______。

> 共 2 个空。

### 60. 【ES部署】实现数据冷热分离时，在 elasticsearch.yml 中通过 node.attr.______: hot（或 warm）给节点打标签，索引侧通过 index.routing.allocation.______.temperature: hot 把索引绑定到热节点。

> 共 2 个空。

### 61. 【Logstash】解析 Nginx / Apache 访问日志时，常用的 grok 内置模式是 %{______}；date 插件的 target 参数默认值是 ______。

> 共 2 个空。


## ELK面试

### 62. 【面试】ES 用了几台机器，分别是什么角色？请说明生产环境的节点规划原则。

### 63. 【面试】如何实现 ES 节点数据的冷热分离？

### 64. 【面试】ES 用的什么磁盘？为什么这样选？

### 65. 【面试】Logstash 和 Filebeat 的区别是什么？

### 66. 【面试】ELK 有哪些优化点？

### 67. 【面试】日志分析管理平台用了 ES、Logstash、Filebeat，你负责部署还是开发？主要负责哪部分？

### 68. 【面试】Logstash 与 Filebeat 的工作流程是怎么样的？数据是如何传递的？

### 69. 【面试】在 ES 里进行了怎样的索引设计和索引管理？

### 70. 【面试】ELK 监控什么样的日志？

### 71. 【面试】Logstash 用到了哪些插件？请按输入、过滤、输出分类说明。

### 72. 【面试】日志分析平台的架构是怎样的？请给出完整的方案。

### 73. 【面试】简述 ELK 的部署架构和工作原理。

### 74. 【面试】什么是倒排索引？为什么 Elasticsearch 检索这么快？

### 75. 【面试】ES 集群的选举机制是怎样的？

### 76. 【面试】ES 中分片（Shard）和副本（Replica）的作用与区别是什么？

### 77. 【面试】请说明 ES 中文档的创建/删除流程与读取流程。

### 78. 【面试】ES 集群发生故障时如何进行故障转移？请描述完整过程。

### 79. 【面试】ES 集群如何做扩容与缩容？各需要注意什么？

### 80. 【面试】ELK、EFK、Loki 三种日志方案有何区别？如何选型？

### 81. 【面试】grok 插件是什么？如何使用 grok 把 Nginx 日志解析为 JSON？

### 82. 【面试】Filebeat / Logstash 如何处理 Java 的多行异常堆栈日志？

### 83. 【面试】为什么要在 ELK 架构中引入 Redis 或 Kafka 做日志缓冲？有何局限？

### 84. 【面试】Kibana 如何做访问安全认证？如何管理索引与可视化？

### 85. 【面试】如何监控 ES 集群的健康状态？各状态颜色代表什么？
