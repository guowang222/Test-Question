# 马哥Redis课件 —— 答案与解析

> 共 61 题，编号与《试题册-马哥Redis课件.md》一致。


## Redis笔试

### 1. 【NoSQL】NoSQL 数据库的全称及含义是？

**答案**

**A**　Not Only SQL，即「不仅仅是 SQL」，是对不同于传统关系型数据库的数据库管理系统的统称

**解析**

NoSQL 全称为 Not Only SQL，意思是适用关系型数据库的场景就用关系型数据库，不适用时可以考虑更合适的数据存储。它不需要固定的模式，无需多余操作就可以横向扩展。

---

### 2. 【NoSQL】NoSQL 一词最早出现于哪一年？

**答案**

**A**　1998 年

**解析**

1998 年由 Carlo Strozzi 开发的一个轻量、开源、不提供 SQL 功能的关系数据库。
【衍生知识点】2009 年 Last.fm 的 Johan Oskarsson 发起分布式开源数据库讨论，Rackspace 的 Eric Evans 再次提出 NoSQL 概念；2009 年亚特兰大「no:sql(east)」讨论会是里程碑。

---

### 3. 【NoSQL】下列数据库中，不属于 NoSQL 的是？

**答案**

**D**　MySQL（关系型数据库）

**解析**

NoSQL 常见分类：列存储（HBase、Cassandra、Hypertable）、文档存储（MongoDB、CouchDB）、key-value 存储（Memcached、Redis、ETCD）、图存储（Neo4J、FlockDB）、对象存储（db4o、Versant）、XML 数据库（Berkeley DB XML、BaseX）。

---

### 4. 【CAP】CAP 定理又被称为布鲁尔定理，它由谁在哪一年提出？

**答案**

**B**　Eric Brewer，1998 年

**解析**

1998 年由加州大学的计算机科学家 Eric Brewer 提出，因此又称布鲁尔定理（Brewer's theorem）。

---

### 5. 【CAP】Zookeeper、ETCD、Consul 以及 MySQL 的 PXC 集群，按 CAP 原理属于哪一类？

**答案**

**B**　CP

**解析**

它们放弃可用性，追求强一致性和分区容错性。跨行转账也属于 CP 场景——一次转账要等双方银行系统都完成整个事务才算完成。

---

### 6. 【CAP】MySQL 主从复制默认采用异步机制，这属于 CAP 中的哪一类？

**答案**

**C**　AP

**解析**

放弃一致性，追求分区容忍性和可用性，这是很多分布式系统设计时的选择。
【衍生知识点】通常实现 AP 都会保证最终一致性，BASE 理论就是根据 AP 扩展的。多数开源分布式系统都先实现 P，再在 C 和 A 中做取舍。

---

### 7. 【Redis 简介】Redis 是由谁在 2009 年发布的？

**答案**

**B**　Salvatore Sanfilippo

**解析**

Redis 是意大利的 Salvatore Sanfilippo 在 2009 年发布的。
【衍生知识点】2010 年 3 月 15 日起开发工作由 VMware 主持；2013 年 5 月起由 Pivotal 公司赞助。

---

### 8. 【Redis 简介】Redis 使用什么语言编写？

**答案**

**C**　ANSI C

**解析**

Redis 是基于 ANSI C 语言编写的 key-value 数据库，单机核心代码只有 23000 行左右。

---

### 9. 【Redis 特性】Redis 单机性能大约可以达到多少 QPS？

**答案**

**B**　10 万

**解析**

Redis 约 10W QPS，Memcached 约 60W（但 Memcached 是纯 key-value、无持久化）。

---

### 10. 【Redis 特性】关于 Redis 的「单线程」，下列说法正确的是？

**答案**

**B**　Redis 6.0 之前以单线程方式处理用户请求，但 3.0 版本后实际还有其它线程实现特定功能（如 fsync/close file descriptor）

**解析**

准确说法是「引号的单线程」：6.0 版本前一直是单线程方式处理用户请求，但 3.0 后实际还有其它线程实现特定功能。

---

### 11. 【Redis 特性】下列哪一项不是 Redis 单线程依然很快的原因？

**答案**

**D**　多线程并行计算

**解析**

单线程快的原因是：纯内存、非阻塞、避免线程切换和竞态消耗、基于 epoll 实现 IO 多路复用。

---

### 12. 【Redis 特性】Redis 单个 String 类型的 value 最大能存储多少数据？

**答案**

**C**　512M

**解析**

字符串类型的值最多能存储 512M 字节的内容。
【衍生知识点】Memcached 的 value 上限为 1M；Redis 虚拟内存机制理论上能存储比物理内存更多的数据。

---

### 13. 【Redis 配置】Redis 默认提供多少个数据库？

**答案**

**C**　16 个

**解析**

配置项 databases 16，编号 0-15。
【衍生知识点】执行 SELECT 16 会返回 (error) ERR DB index is out of range；集群模式下会出现 SELECT is not allowed in cluster mode。

---

### 14. 【命令】下列哪条命令在生产环境应当慎用？

**答案**

**B**　KEYS *

**解析**

KEYS * 会扫描全部 key，同类需慎用的还有 FLUSHALL、FLUSHDB、slow lua script、multi/exec、操作大 value。
【衍生知识点】生产建议用 rename-command 禁用高危命令，例如 rename-command FLUSHALL ""、rename-command shutdown ""。

---

### 15. 【缓存】缓存穿透（Cache Penetration）指的是哪种情况？

**答案**

**B**　缓存和数据库中都没有的数据，而用户不断发起请求（例如 id 为 -1 或特别大的不存在数据）

**解析**

这时的用户很可能是攻击者，会导致数据库压力过大。
【衍生知识点】解决方法：① 接口层增加校验（鉴权、id<=0 直接拦截）；② 取不到的数据写为 key-null 并设置较短过期时间（如 30 秒）。

---

### 16. 【缓存】缓存击穿（Cache breakdown）最直接的解决方案是？

**答案**

**A**　把热点数据设置为永不过期

**解析**

缓存击穿指缓存中没有但数据库中有，典型场景是热点数据的缓存时间到期后，并发用户同时去数据库取数，导致数据库压力瞬间增大。
【衍生知识点】加随机过期时间是解决「缓存雪崩」的手段。

---

### 17. 【缓存】缓存雪崩（Thunder Hurd Problem）指的是？

**答案**

**A**　缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至 down 机

**解析**

与缓存击穿的区别：击穿是并发查同一条数据，雪崩是不同数据都过期了、很多数据都查不到从而查数据库。
【衍生知识点】解决方法：过期时间设置随机、分布式部署时热点数据均匀分布、热点数据永不过期；缓存宕机（crash）则要用 Redis 高可用集群解决。

---

### 18. 【Pipeline】Pipeline 能够提升 Redis 性能的根本原因是？

**答案**

**A**　减少了网络往返时间（RTT）

**解析**

客户端执行一条命令分 6 个过程：发送命令 → 网络传输 → 命令排队 → 命令执行 → 网络传输 → 返回结果，这个往返过程称为 RTT。
【衍生知识点】mget、mset 可批量操作节约 RTT，但 hgetall 等不支持批量，需用 Pipeline；客户端与服务端网络延迟越大，性能提升越明显。

---

### 19. 【部署】Redis 编译安装后，bin 目录下的 redis-sentinel 是什么？

**答案**

**B**　指向 redis-server 的软链接

**解析**

redis-sentinel -> redis-server 是软链接（哨兵程序），同目录还有 redis-cli（客户端）、redis-benchmark（性能测试）、redis-check-aof（AOF 检查）、redis-check-rdb（RDB 检查）。

---

### 20. 【部署】Redis 启动时出现 overcommit_memory 告警，该内核参数的默认值和建议值是？

**答案**

**A**　默认 0，建议设为 1

**解析**

overcommit_memory 实现内存分配策略：0 表示内核检查是否有足够可用内存；1 表示允许分配所有物理内存；2 表示允许分配超过所有物理内存和交换空间总和。默认值为 0，需改为 1（新版只允许 1，不支持 2）。

---

### 21. 【部署】关于透明大页（THP），下列说法正确的是？

**答案**

**B**　THP 页大小为 2M，Redis 建议设置为 never

**解析**

THP（Transparent Huge Pages）不同于一般 4k 内存页，而是 2M，会在 Redis 中造成延迟和内存使用问题。修复方式：echo never > /sys/kernel/mm/transparent_hugepage/enabled 并写入 rc.local，禁用后必须重启 Redis。

---

### 22. 【配置】maxmemory-policy 的默认值是？

**答案**

**C**　noeviction

**解析**

noeviction 表示不驱逐任何东西，只是在写操作时返回错误。
【衍生知识点】其它可选值：volatile-lru / allkeys-lru / volatile-lfu / allkeys-lfu / volatile-random / allkeys-random / volatile-ttl。

---

### 23. 【持久化】AOF 的 appendfsync 默认值（也是生产建议值）是？

**答案**

**C**　everysec

**解析**

everysec 表示每秒执行一次 fsync，可能丢失这 1 秒数据；no 由操作系统保证，Linux 默认 fsync 策略是 30 秒，最多丢 30s；always 每次写入都 fsync，安全性高但性能较差。

---

### 24. 【持久化】同时开启 RDB 和 AOF 时，Redis 重启后默认使用哪个文件恢复？

**答案**

**B**　AOF 文件

**解析**

AOF 文件优先级高于 RDB。
【衍生知识点】这也是个坑：AOF 默认关闭，第一次开启 AOF 并重启服务生效后，会因为 AOF 优先级高于 RDB 而 AOF 默认没有数据文件，从而导致所有数据丢失。

---

### 25. 【持久化】bgsave 执行快照的方式是？

**答案**

**B**　fork 一个子进程写临时文件，完成后改名替换 RDB 文件

**解析**

bgsave 先 fork 子进程，子进程把内存数据保存为临时文件 temp-<子进程pid>.rdb，保存完成后改名为 RDB 文件并替换旧文件，最后关闭子进程。
【衍生知识点】save 使用主进程备份会阻塞其它命令；RDB 只保留最后一个版本，想保存多个版本需人为实现。

---

### 26. 【数据类型】Redis 列表（list）最多可以包含多少个元素？

**答案**

**B**　2^32-1（4294967295）

**解析**

列表最多 2^32-1 = 4294967295 个元素，hash 与 set 的上限同样是 2^32-1。

---

### 27. 【数据类型】关于有序集合（sorted set）的成员与分数，下列说法正确的是？

**答案**

**B**　成员不可重复，分数可以重复

**解析**

有序集合成员不可以重复，但评分（score，双精度浮点型）可以重复，常用于排行榜场景。

---

### 28. 【主从复制】从节点执行写命令会返回什么错误？

**答案**

**B**　(error) READONLY You can't write against a read only replica.

**解析**

主从复制中 master 可读可写、slave 只读（replica-read-only yes），向从节点写入会报 READONLY。

---

### 29. 【哨兵】Redis Sentinel 默认监听的端口是？

**答案**

**C**　26379

**解析**

Sentinel 默认监听 26379/tcp；16379 是集群总线端口（数据端口 + 10000）。

---

### 30. 【集群】Redis Cluster 一共有多少个哈希槽？

**答案**

**C**　16384 个

**解析**

Redis Cluster 设置有 0~16383 共 16384 个槽，每个槽映射一个数据子集。
【衍生知识点】cluster countkeysinslot 16384 会报 (error) ERR Invalid slot。

---

### 31. 【集群】Redis Cluster 模式下关于数据库下列说法正确的是？

**答案**

**B**　只有一个 db 0，执行 SELECT 1 会报 SELECT is not allowed in cluster mode

**解析**

集群模式下不支持多个数据库，只有一个 db 0。
【衍生知识点】集群的局限性还包括：命令无法跨节点使用（mget、keys、scan、flush、sinter 等）、客户端维护更复杂、复制只支持一层不支持级联、Key 事务和 Lua 必须落在同一节点。

---

### 32. 【集群】开启集群模式后，集群总线通信端口与数据端口的关系是？

**答案**

**C**　总线端口 = 数据端口 + 10000（如 6379 → 16379）

**解析**

开启 cluster 后实际端口 = redis port + 10000，如 6379 对应 16379。
【衍生知识点】开启后 redis 进程会多出 [cluster] 标识。

---

### 33. 【Redis 简介】Redis 的全称是 ______，它使用 ______ 语言编写，是 key-value 数据库。

**答案**

- 第 1 空：Remote Dictionary Server / Redis Remote Dictionary Server / redis remote dictionary server
- 第 2 空：ANSI C / ANSI-C / C / C语言

**解析**

Remote Dictionary Server 即远程字典服务，使用 ANSI C 语言编写，遵循 BSD/MIT 开源协议。

---

### 34. 【Pipeline】Redis 客户端执行一条命令需要经历发送命令、网络传输、命令排队、命令执行、网络传输、返回结果 6 个过程，这一过程称为 ______。

**答案**

- 第 1 空：RTT / 往返时间 / Round trip time / round-trip time

**解析**

RTT（Round trip time，往返时间）。网络延迟越大，Pipeline 带来的性能提升越明显。

---

### 35. 【集群】Redis Cluster 共有 ______ 个哈希槽，每个 key 通过 CRC16(key) 与 ______ 取余来确定自己所属的槽位。

**答案**

- 第 1 空：16384
- 第 2 空：16384

**解析**

槽编号 0~16383 共 16384 个；计算方式：CRC16(key) 得到一个整数后对 16384 取余。

---

### 36. 【集群】Redis Cluster 至少需要 ______ 个 master 节点才能实现；开启集群后 redis 进程会多出 ______ 标识。

**答案**

- 第 1 空：3
- 第 2 空：[cluster] / cluster / [cluster]标识

**解析**

集群至少 3 个 master 节点，且 master 必须超过半数以上可用，否则集群不可用，因此 master 节点数量一般为奇数。

---

### 37. 【哨兵】Redis Sentinel 默认监听 ______ 端口；Sentinel 节点个数应该大于等于 ______ 且最好为 ______。

**答案**

- 第 1 空：26379
- 第 2 空：3
- 第 3 空：奇数 / 奇数个

**解析**

Sentinel 默认 26379/tcp；节点个数 ≥3 且最好为奇数（如 3、5、7），quorum 取总数一半以上的整数。

---

### 38. 【配置】Redis 默认提供 ______ 个数据库，编号从 0 到 ______。

**答案**

- 第 1 空：16
- 第 2 空：15

**解析**

配置项 databases 16；SELECT 16 会报 DB index is out of range。

---

### 39. 【持久化】RDB 持久化有两条实现命令：同步阻塞主进程的 ______，以及异步 fork 子进程的 ______。

**答案**

- 第 1 空：save
- 第 2 空：bgsave / BGSAVE

**解析**

save 使用主进程完成快照会阻塞其它命令执行，不推荐使用；bgsave 异步后台执行不影响其它命令。

---

### 40. 【持久化】AOF 的 appendfsync 有三个可选值，分别是 ______、______、______。

**答案**

- 第 1 空：no
- 第 2 空：always
- 第 3 空：everysec

**解析**

no 由操作系统保证（最多丢 30s）、always 每次写入都 fsync（安全但慢）、everysec 每秒一次（默认值也是生产建议值，最多丢 1s）。

---

### 41. 【主从复制】主节点重启会导致 ______ 复制，从节点重启只会导致 ______ 复制。

**答案**

- 第 1 空：全量 / 全量复制 / full / full resync
- 第 2 空：增量 / 增量复制 / partial / partial resynchronization

**解析**

主节点重启会导致 master_replid/RUN_ID 变化，可能触发全量复制；从节点重启不会导致全量复制，只会增量复制。
【衍生知识点】故障转移（哨兵或集群选举新主）也不会全量复制。

---

### 42. 【配置】Redis 慢日志配置 slowlog-log-slower-than 的单位是 ______，默认值是 10000，即 ______ 毫秒。

**答案**

- 第 1 空：微秒 / us / µs
- 第 2 空：10 / 10ms

**解析**

该配置以微秒为单位，默认值 10000us 即 10ms；生产建议设为 1ms-10ms 之间；slowlog-max-len 默认 128，生产建议 1000 以上。

---


## Redis面试

### 43. 【面试】Redis 是什么？你在哪些场景下会使用 Redis？

**答案**

Redis（Remote Dictionary Server，远程字典服务）是一个遵循 BSD/MIT 开源协议的高性能 NoSQL key-value 数据库，基于 ANSI C 语言编写，2009 年由意大利人 Salvatore Sanfilippo 发布。
它把数据放在内存中，提供 RDB/AOF 持久化、主从复制、哨兵、集群等高可用能力，在 DB-Engine 月度排行榜的键值型存储类中长期居于首位。

常见应用场景：
1. 缓存：缓存 RDBMS 中的数据，如网站查询结果、商品信息、微博、新闻、消息；
2. Session 共享：实现 Web 集群中多服务器之间的 session 共享；
3. 计数器：商品访问排行榜、浏览数、粉丝数、关注、点赞、评论等与次数相关的统计场景；
4. 社交：朋友圈、共同好友、可能认识的人等；
5. 地理位置：基于 GIS 实现摇一摇、附近的人、外卖等功能；
6. 消息队列：ELK 等日志系统缓存、业务的订阅/发布系统。

一句话总结：适合「读多写少、要求高并发低延迟、数据结构复杂、有持久化与高可用需求」的场景。

---

### 44. 【面试】Redis 部署有哪几种模式？各自解决什么问题？

**答案**

课件里把 Redis 部署分为四种模式，解决的问题层层递进：

1. 单机模式：最简单，部署一个 redis-server。存在数据和服务的单点问题，单机性能也存在上限（约 10W QPS）。
2. 主从复制（master/slave）：解决数据备份与读扩展问题。一个 master 可以有多个 slave，一个 slave 只能有一个 master，数据从 master 单向流向 slave；master 可读可写，slave 只读。但 master 故障时需要手动提升 slave，无法自动切换。
3. 哨兵 Sentinel：解决主从模式无法自动故障转移的问题。Sentinel 监控 master 状态，master 故障时自动完成主从角色切换，实现高可用。但单个 Master 的性能瓶颈问题并没有解决，且 Sentinel 只是配置中心不是代理。
4. 集群 Cluster（Redis 3.0 之后）：无中心架构，支持多个 master 节点并行写入和故障自动转移，解决了单机性能瓶颈与容量瓶颈问题。

另外从「安装方式」维度还可分为：包安装（apt/yum/dnf）、源码编译安装、容器（Docker）运行。

---

### 45. 【面试】Redis 支持哪些数据类型？各自适用的场景是什么？

**答案**

Redis 支持 5 种基本数据类型：

1. string（字符串）：最基本的值类型，二进制安全，可存 JPEG 图片或序列化对象，单值最大 512M。所有 key 都是字符串类型。最常用，适合缓存、计数器（INCR/DECR 原子自增）。
2. list（列表）：简单的字符串数组，按插入顺序排序，支持双向读写（LPUSH/RPUSH、LPOP/RPOP），最多 2^32-1 个元素，元素可重复。常用于消息队列、日志、最新列表。
3. set（集合）：无序且元素唯一无重复，支持集合间运算（SINTER 交集、SUNION 并集、SDIFF 差集）。适合共同好友、可能认识的人、去重统计。
4. sorted set（有序集合）：成员不重复，每个成员关联一个双精度浮点型评分 score，score 可重复，按 score 从小到大排序，最多 2^32-1 个成员。典型场景是排行榜。
5. hash（哈希）：字符串 field 与 value 的映射，即「key 里再放 key/value」，最多 2^32-1 个键值对，适合存储对象。

此外 Redis 还支持位图、HyperLogLog、GEO、Stream 等扩展类型，并通过 Lua 脚本、发布订阅、事务、pipeline 提供更丰富的功能。

---

### 46. 【面试】RDB 和 AOF 持久化的区别是什么？生产环境如何选择？

**答案**

RDB（Redis DataBase）是基于某个时间点的快照，相当于 MySQL 中的完全备份，生成经过压缩的二进制文件；AOF（AppendOnlyFile）则是按操作顺序把变更命令追加到日志文件尾部，两者都采用 COW 机制。

主要区别：
1. 数据安全：RDB 不能实时保存，一般超过 5 分钟才保存一次，故障可能丢失较长时间的数据；AOF 默认 everysec，最多只丢失 1 秒数据。
2. 文件体积：AOF 会把重复操作也全部记录，文件一般大于 RDB。
3. 恢复速度：RDB 在大数据集下恢复速度比 AOF 快（直接加载到内存，不用做其他处理）。
4. 可读性与容错：RDB 是二进制文件；AOF 是 Redis 协议格式的文本日志，易读、可 parse，支持误操作恢复——例如误执行 FLUSHALL 后，只要 AOF 未被重写，停止服务器、移除 AOF 末尾的 FLUSHALL 命令再重启，就能恢复到执行前的状态。AOF 文件末尾异常可用 redis-check-aof 修复。
5. fork 开销：RDB 在数据集庞大时 fork 子进程可能耗时，造成服务器在一定时间内停止处理客户端请求。

生产选择建议：
- 如果主要充当缓存功能，或者可以承受数分钟数据丢失，通常只需启用 RDB 即可（这也是默认值）；
- 如果一点数据都不能丢失，可以同时开启 RDB 和 AOF；
- 一般不建议只开启 AOF。
【衍生知识点】同时开启时 AOF 优先级高于 RDB。坑在于 AOF 默认关闭，第一次开启 AOF 并重启生效后，因 AOF 优先级高而 AOF 又没有数据文件，会导致所有数据丢失，正确做法是先 config set appendonly yes 触发 AOF 重写把数据落盘。

---

### 47. 【面试】Redis 如何实现消息队列？生产者/消费者模式与发布/订阅模式有什么区别？

**答案**

消息队列的作用是把要传输的数据放在队列中，从而实现应用之间的数据交换，常用功能包括解耦、异步、削峰/限流。常用消息队列有 Kafka、RabbitMQ、Redis。消息队列分为两种模式：

一、生产者/消费者模式（Producer/Consumer）
多个消费者同时监听一个频道（Redis 用列表实现），但生产者产生的一条消息只能被最先抢到消息的一个消费者消费一次。实现方式：
- 生产者：LPUSH channel1 message1 …（从管道左侧写入）
- 消费者：RPOP channel1（从右侧消费，实现先进先出）
- 验证：LRANGE channel1 0 -1 为空表示消费完成

二、发布者/订阅者模式（Publisher/Subscriber）
发布者把消息发布到指定频道，事先监听该频道的一个或多个订阅者都会收到相同的消息，即一条消息可以由多个订阅者获取，适用于群聊、群发、群公告等场景。命令：
- 订阅：SUBSCRIBE channel01、SUBSCRIBE channel01 channel02、PSUBSCRIBE chann*（支持通配符）
- 发布：PUBLISH channel01 message1（返回值为订阅者个数）
- 退订：UNSUBSCRIBE channel01

核心区别：生产者/消费者模式是「一条消息只被一个消费者抢到并消费一次」，具备竞争消费语义；发布/订阅模式是「一条消息被所有订阅者同时收到」，是广播语义，且订阅者必须先订阅才能收到之后发布的消息。

---

### 48. 【面试】请描述 pipeline 功能，为什么 pipeline 功能能提升 Redis 性能？

**答案**

Redis 客户端执行一条命令分为 6 个过程：发送命令 → 网络传输 → 命令排队 → 命令执行 → 网络传输 → 返回结果，这个过程称为 RTT（Round trip time，往返时间）。

如果不使用 pipeline，执行 N 条命令就需要消耗 N 次 RTT；由于 Redis 是单线程一次只运行一条命令，命令执行本身极快（微秒级），真正的开销大头是网络往返。

mget、mset 这类指令可以一次性批量操作多个数据，从而节约 RTT，但大部分命令（如 hgetall）不支持批量操作，这时就需要 Pipeline：客户端把多条命令一次性打包发送，服务端依次执行后一次性返回结果，从而把 N 次 RTT 压缩成 1 次。

因此 Pipeline 提升性能的根本原因是减少了网络往返次数。性能对比实验表明，使用 Pipeline 执行比逐条执行要快，且客户端与服务端的网络延迟越大，性能提升越明显。
【衍生知识点】Pipeline 只是客户端侧的批处理技术，它不保证原子性，也不减少命令本身的执行时间；若需要原子性应使用事务（MULTI/EXEC）或 Lua 脚本。

---

### 49. 【面试】描述 Redis 主从复制的工作原理（全量复制与增量复制）。

**答案**

Redis 支持主从模式（master/slave），可以实现数据的跨主机远程备份。特点：一个 master 可以有多个 slave，一个 slave 只能有一个 master；数据流向是从 master 到 slave 单向的；master 可读可写，slave 只读。Redis 主从同步是非阻塞的，同步过程不会影响主服务器的正常访问。

一、全量复制（Full resync）过程：
1. 主从节点建立连接、验证身份后，从节点向主节点发送 PSYNC 命令（2.8 版本之前是 SYNC）；
2. 主节点向从节点发送 FULLRESYNC，包含 master_replid（runID）和 offset；
3. 从节点保存主节点信息；
4. 主节点执行 BGSAVE 保存 RDB 文件，同时把新的写记录到 buffer 中；
5. 主节点发送 RDB 文件给从节点；
6. 主节点把 buffer 中新的记录发送给从节点；
7. 从节点先删除本机旧数据，再加载 RDB，最后同步主节点 buffer 中的信息。

触发全量复制的三种情况：从节点首次连接主节点（无 master_replid/run_id）；从节点的复制偏移量不在复制积压缓冲区内；从节点无法连接主节点超过一定时间。

二、增量复制（Partial resynchronization）：
首次全量同步完成后再次同步时，从服务器只要把当前的 offset（类似 MySQL binlog 位置）发给主服务器，主服务器根据该位置把之后的数据（含缓冲区的积压数据）发送给从节点并保存到内存即可。即「首次全量复制，之后的复制基本都是增量复制」。

要点与坑：
- 2.8 版本以前不支持部分同步，主从连接断开后都是全量同步；
- 4.0 之前用 run_id 和复制偏移量判断，4.0 之后用 master_replid 和复制偏移量判断；
- master_replid2 保存的是上一个主节点的 master_replid；
- 主节点重启会导致全量同步（replid/runID 变化），从节点重启只会增量同步；
- 复制缓冲区 repl-backlog-size 计算公式：允许从节点最大中断时长 × 主实例 offset 每秒写入量；太小会造成全量复制。
【衍生知识点】强烈建议打开主服务器持久化，并禁止「主服务器关闭持久化 + 自动拉起」的组合，否则主节点重启后数据为空，从节点会把自身数据副本删除，导致主从数据全部丢失。

---

### 50. 【面试】Redis 如何实现高可用？

**答案**

Redis 的高可用是通过「持久化 + 主从复制 + 自动故障转移」三层机制实现的，并按规模逐步升级：

1. 持久化（RDB/AOF）：保证数据在重启后不丢失，是数据安全的基础。
2. 主从复制：实现数据的跨主机远程备份与读扩展，master 故障后可手动提升一个 slave 为新 master（REPLICAOF NO ONE / SLAVEOF NO ONE），并把其它 slave 重新指向新 master。缺点是需要人工介入，无法自动切换。
3. 哨兵 Sentinel：Redis 2.6 引入、2.8 之后稳定可用。它在多个节点上各运行一个 sentinel 进程组成分布式系统，通过 gossip 协议交换 master 是否下线的状态，用投票协议决定是否执行自动故障转移并选出合适的 slave 作为新 master，实现角色自动切换，对客户端透明（客户端连接 Sentinel 集合而不是具体 Redis 节点）。
4. 集群 Cluster：Redis 3.0 之后提供无中心架构，多个 master 节点并行写入，自身具备自动故障转移能力，不再需要 Sentinel。

选择建议：中小规模、并发未饱和时用「主从 + 哨兵」即可实现高可用；当单机 Redis 已不能满足业务并发量时才考虑 Cluster，否则搭建集群反而是画蛇添足。
【衍生知识点】无论哪种方案，都建议开启持久化并保证所有节点密码一致（masterauth 与 requirepass 相同），这样 slave 提升为 master 后仍可正常提供服务。

---

### 51. 【面试】哨兵（Sentinel）的工作原理是什么？主观下线（SDOWN）和客观下线（ODOWN）有什么区别？

**答案**

Sentinel 是一个专门的、用于监控 Redis 集群中 Master 工作状态的服务进程，当 Master 主服务器发生故障时实现 Master 和 Slave 角色的自动切换，从而实现系统高可用。Sentinel 从 Redis 2.6 版本开始引入，2.8 之后稳定可用。

工作流程：
1. Sentinel 是分布式系统，需要在多个节点上各自同时运行一个 sentinel 进程，节点个数应 ≥3 且最好为奇数（3、5、7）；
2. 每个 Sentinel 进程会向其它 Sentinel、Master、Slave 定时发送消息确认对方是否存活，如果某个节点在指定配置时间内未得到响应，就认为该节点已离线，即主观宕机 SDOWN（Subjective Down）；
3. 如果哨兵集群中的多数 Sentinel 进程都认为 Master 存在 SDOWN，通过 is-master-down-by-addr 命令互相通知后，即认为客观宕机 ODOWN（Objectively Down）；
4. 接下来利用投票算法（Raft 类似），从所有 slave 节点中选出一台合适的 slave 提升为新 Master，然后自动修改其它 slave 的配置指向新的 master，最终完成故障转移 failover。

主观下线与客观下线的区别：
- SDOWN 是「单个 Sentinel 自己认为」节点不可达，只代表个体判断；
- ODOWN 是「多数 Sentinel 共同确认」，以 quorum（法定人数）为依据，是真正触发故障转移的条件。配置项 sentinel monitor mymaster <ip> <port> <quorum> 中的 quorum 一般取所有 sentinel 节点总数一半以上的整数（如 3 个节点取 2）。

Sentinel 的三个定时任务：
- 每 10 秒每个 sentinel 对 master 和 slave 执行 info（发现 slave 节点、确认主从关系）；
- 每 2 秒每个 sentinel 通过 master 节点的 sentinel__:hello 频道交换信息（pub/sub），交互对节点的「看法」和自身信息；
- 每 1 秒每个 sentinel 对其它 sentinel 和 redis 执行 ping。

关键点：Sentinel 只是配置中心不是代理，客户端初始化时连接的是 Sentinel 节点集合；Sentinel 与普通 Redis 没有区别（都是 redis-server 启动的），读写分离依赖客户端程序实现；Sentinel 机制类似 MySQL 的 MHA，只解决自动故障转移问题，不解决单 Master 的性能瓶颈。手动触发故障转移可用 sentinel failover <masterName>。
【衍生知识点】故障转移完成后 Sentinel 会自动修改 redis.conf 的 replicaof 行和 sentinel.conf 的 sentinel monitor IP；原 master 重新加入时会自动成为新 master 的 slave。

---

### 52. 【面试】Redis Cluster 的工作原理是什么？数据是怎么定位到节点的？

**答案**

Redis Cluster 是 Redis 3.0 版本之后推出的无中心（去中心化）架构，支持多个 master 节点并行写入和故障自动转移。

核心原理：
1. 槽位划分：集群设置 0~16383 共 16384 个哈希槽，每个槽映射一个数据子集，每个集群节点保存一部分槽。三个 master 的典型分配是 M1 承担 0-5460、M2 承担 5461-10922、M3 承担 10923-16383。
2. 数据定位：每个 key 存储时先经过算法函数 CRC16(key) 得到一个整数，然后与 16384 取余得到槽的数值，再找到负责该槽的节点，把数据存入对应槽中。CRC16 是一种错误检测码（校验码），具有与哈希函数类似的确定性——相同输入始终产生相同输出。
3. 集群通信：集群节点之间通过 ping/pong 交互消息，并保存其它节点的信息（知道哪个槽由哪个节点负责）。因此寻找槽最多两次就能命中：如果第一次访问的节点不负责该槽，会通知客户端该槽在哪个节点，客户端再访问对应节点即可精准命中。节点间通过 meet 操作互相建立联系，直到所有节点都建立联系。
4. 客户端访问：如果 key 的槽不在当前连接的节点上，会返回 (error) MOVED <slot> <ip:port> 重定向；使用 redis-cli -c 可以开启集群模式自动跟随重定向。对应的 slave 节点上 KEYS * 可能看到 key，但 GET 会返回 MOVED。

集群规模与部署要点：
- 至少需要 3 个 master 节点才能实现（否则报 Redis Cluster requires at least 3 master nodes），slave 节点数量不限；
- Master 节点必须超过半数以上可用，否则集群将不可用（数据访问和选举都无法实现），因此 master 节点数量一般为奇数；
- 生产环境推荐 6 台服务器构成三组 master/slave；
- 所有节点必须使用相同的 Redis 版本、相同的密码、相同（或相近）的硬件配置，且建立集群前必须清空数据；
- 需要开启 cluster-enabled yes，cluster-config-file nodes-6379.conf，并建议把 cluster-require-full-coverage 设为 no。
【衍生知识点】导出集群信息：redis-cli --cluster check/info <任意节点>，或 CLUSTER INFO / CLUSTER NODES / CLUSTER SLOTS。

---

### 53. 【面试】Redis 集群最少需要几个节点？为什么？槽位一共有多少个？某个节点缺少一个槽位还能使用吗？

**答案**

最少节点数：Redis Cluster 至少需要 3 个 master 节点。若少于 3 个会直接报错：Redis Cluster requires at least 3 master nodes / This is not possible with 2 nodes and 0 replicas per node。

为什么是 3 个：
1. 集群要求 Master 节点必须超过半数以上可用，否则集群整体不可用，数据访问和选举都无法实现；
2. 只有 ≥3 个 master 时，才能在某个 master 宕机后由剩余节点形成多数派完成故障转移与选举，与哨兵的奇数节点设计同理；
3. 因此生产环境一般建议 master 节点数为奇数（3、5、7），以防止脑裂现象。

槽位数量：一共 16384 个哈希槽（编号 0~16383），由所有 master 节点分片承担。

某个节点缺少一个槽位还能不能使用，要分情况：
1. 如果集群开启了 cluster-require-full-coverage yes（默认值），那么只要有任意一个主库宕机且没有备库，就会出现集群槽位不全，此时 redis 集群槽位验证不全就不再对外提供服务——对 key 赋值会出现 CLUSTERDOWN The cluster is down 的提示、cluster_state 变为 fail（但 ping 仍返回 PONG）；
2. 如果设为 no，集群可以继续使用，但会出现查询数据查不到的情况（因为那部分数据丢失了）。生产建议设为 no。

结论：从「集群对外可用」角度看，缺槽位在默认配置下会导致整个集群不可用，这也是推荐 cluster-require-full-coverage 设为 no 的原因——避免一组主从节点不可用拖垮整个集群。
【衍生知识点】cluster info 中 cluster_slots_assigned:16384、cluster_slots_ok:16384 表示槽位完整；扩容后新节点 slots 为 0，必须 reshard 分配槽位后才能被访问。

---

### 54. 【面试】Redis 集群如何避免脑裂？

**答案**

脑裂（split-brain）指集群因为网络分区被拆成多个孤立子系统，各部分都认为自己是「主」，导致数据不一致或双写。

Redis Cluster 避免脑裂依赖以下机制：
1. Master 节点数保持为奇数（3、5、7）：集群要求 Master 必须超过半数以上可用才对外服务，偶数节点在分区时容易出现两边票数相等而无法达成多数派；
2. 过半投票 + 最少从节点数：故障转移需要半数以上持有槽的主节点共同确认（客观下线）才能选举新 master，仅少数派分区无法完成选举，因此少数派一侧不会产生新的 master；
3. cluster-node-timeout 与 cluster-replica-validity-factor：节点间超过 cluster-node-timeout（默认 15000ms）未响应即踢出集群；选举时要做资格检查，如果从节点与故障主节点的断线时间超过 node-timeout × replica-validity-factor（默认 10），就取消其选举资格，避免数据过旧的节点被选为主；
4. 偏移量选举顺位：参与选举时 offset 最大的 slave 节点选举顺位最高、最优先选举，offset 较低的节点要延迟选举，保证新主数据尽可能新；
5. min-replicas-to-write / min-replicas-max-lag：主节点可以要求至少有 N 个可用从节点、且从节点延迟不超过 M 秒才接受写操作，一旦不满足就拒绝写入，从源头减少脑裂期间的数据丢失。

【衍生知识点】Redis 集群自身具备故障转移能力，不需要 Sentinel；而哨兵方案同样依靠「多数哨兵确认 ODOWN」来避免脑裂。

---

### 55. 【面试】Redis 集群写入数据时，是怎么在各个节点的槽位上分配数据的？

**答案**

核心机制是「虚拟槽分区 + 哈希取余」。

1. 集群预置 16384 个槽（0~16383），每个槽映射一个数据子集，每个 master 节点负责一部分槽。3 个 master 的典型分配：M1 → 0-5460、M2 → 5461-10922、M3 → 10923-16383，保证槽区间连续且总数为 16384。
2. 写入任意 key 时，先用 CRC16(key) 计算得到一个整数，再对 16384 取余，结果就是该 key 所属的槽位，然后由负责该槽的节点来存储。
3. 客户端若把命令发到了不负责该槽的节点，该节点会返回 MOVED 重定向（如 (error) MOVED 9189 10.0.0.18:6379）；用 redis-cli -c 可开启集群模式自动跳转。
4. 节点间互相保存「哪个槽由哪个节点负责」的信息，所以最多两次访问即可命中槽所在节点。

数据分布方式对比（课件给出的分区方式）：
- 顺序分布：保障数据有序性，但离散性低，可能导致某个分区数据热度高、其它分区热度低，分区访问不均衡；支持顺序访问。
- 哈希分布：分布散列、不支持顺序访问，又分为区域哈希、一致性哈希等；Redis Cluster 采用的是其中的虚拟槽分区。
- 相对于一致性哈希，虚拟槽分区的优势在于槽数量固定、节点与槽解耦，扩容缩容时只需迁移槽与数据，便于管理。

扩容/缩容时槽与数据的迁移：
- 扩容：先把新节点 add-node 加入集群（此时新节点是 master 但 slots 为 0），再用 --cluster reshard 把若干槽分配到新节点，迁移多少个槽一般按 16384 / master 个数计算（如 4 个 master 各 4096 个）；
- 缩容：顺序相反，先把要下线节点上的槽迁移到其它节点（源节点必须保证没有数据，否则迁移报错并强制中断），槽全部迁走后才能 del-node 删除，否则删除会失败。
- 判断槽归属与分布：cluster keyslot <key> 查看 key 所在槽；cluster countkeysinslot <slot> 查看槽内 key 个数（最大槽号只能到 16383，16384 会报 ERR Invalid slot）；--cluster rebalance 可做自动平衡（会影响客户端访问，慎用）；--bigkeys 查找 bigkey，建议在 slave 节点执行。
【衍生知识点】集群偏斜的常见原因：节点和槽分配不均、不同槽对应键值数量差异较大、包含 bigkey、内存相关配置不一致、热点数据不均衡。

---

### 56. 【面试】常见的 Redis 集群架构有哪些？它们之间的优缺点如何对比？

**答案**

按演进顺序，常见的 Redis 集群架构有以下几种：

1. 单机架构：部署简单，无额外组件。缺点是存在数据与服务的单点问题，单机性能存在上限（约 10W QPS），无高可用能力。适用于开发测试或数据可丢失的纯缓存场景。

2. 主从复制架构：一主多从，数据单向从 master 复制到 slave。优点是实现简单，能做数据备份与读扩展（读写分离）。缺点是 master 故障需要手动提升 slave（不能自动切换），写能力受限于单个 master，性能存在瓶颈。

3. 哨兵（Sentinel）架构：在主从基础上增加多个 sentinel 进程。优点是能自动完成故障转移，对客户端透明、无需程序改动。缺点是只解决高可用，没解决单 Master 的性能瓶颈；客户端需维护 sentinel 连接集合；读写分离仍依赖客户端程序实现。适合并发未饱和、需要高可用的场景。

4. 客户端分区方案（早期）：由客户端程序自己实现写入分配、高可用管理和故障转移。缺点是对客户端开发实现较为复杂。

5. 代理服务方案（早期）：客户端不直接连接 Redis，而是先连到代理服务（如 Twitter 开源的 Twemproxy、豌豆荚的 codis），由代理实现读写分配。优点是客户端无需特殊开发、实现容易；缺点是代理服务节点仍存在单点故障和性能瓶颈。

6. Redis Cluster（Redis 3.0 之后）：无中心架构，多 master 并行写入 + 自动故障转移。优点是支持水平扩展、高并发、无代理、自身具备故障转移能力。缺点是客户端性能会「降低」、命令无法跨节点使用（mget、keys、scan、flush、sinter 等）、客户端维护更复杂、只支持 db 0、复制只支持一层不支持级联、Key 事务和 Lua 支持有限。

选择建议：单机 redis 若已能满足业务并发量，且 redis sentinel 已能保证高可用，那么搭建集群反而是画蛇添足；只有在单机性能确实达到瓶颈、需要横向扩展时才上 Cluster。官方建议集群节点数不超过 1000 个。

---

### 57. 【面试】如何监控 Redis 是否出现故障？客户端 timeout 报错突然增加该怎么排查？

**答案**

一、监控 Redis 的手段
1. 用 redis-cli info <section> 查看运行状态，重点 section 包括 Server、Clients、Memory、Persistence、Stats、Replication、CPU、Cluster、Keyspace。例如：redis-cli info cluster 看 cluster_enabled，redis-cli info Persistence | grep rdb_bgsave_in_progress 判断快照是否完成。
2. 用 redis-cli -p 26379 INFO sentinel 检查哨兵状态，最后一行 master0:name=...,status=ok,address=...,slaves=N,sentinels=M 必须与实际服务器数量吻合（不符要检查 sentinel myid 是否冲突）。
3. 用 redis-cli --cluster check/info <节点> 检查集群槽位覆盖（[OK] All 16384 slots covered）、各 master 的 key 数与 slave 数。
4. 用 CLUSTER NODES / CLUSTER INFO 观察 cluster_state 是否为 ok、cluster_known_nodes、cluster_size。
5. Zabbix 常监控的指标：redis_version、connected_clients、blocked_clients、used_memory / used_memory_rss、mem_fragmentation_ratio（内存碎片率）、maxmemory 与 used_memory_peak、keyspace_hits/keyspace_misses（缓存命中率）、expired_keys、evicted_keys、total_commands_processed、instantaneous_ops_per_sec、rejected_connections、latest_fork_usec、rdb_last_bgsave_status、aof_last_write_status、master_link_status、connected_slaves、role、cluster_state。
6. 慢日志：slowlog-log-slower-than（微秒，默认 10000）配合 SLOWLOG LEN / SLOWLOG GET n / SLOWLOG RESET，定位执行时间长的命令。
7. 客户端侧：关注 timeout、连接池耗尽、MOVED/ASK 重定向激增、READONLY、CLUSTERDOWN 等错误。

二、客户端 timeout 报错突然增加的排查思路
1. 先确认是全局性还是单节点：看是全部客户端还是某个业务/某台机器；用 ss -ntl 或 netstat 确认端口监听与连接数（连接数可能已达 maxclients 10000 上限，出现 rejected_connections）。
2. 查慢命令与阻塞源：SLOWLOG GET 看是否有 keys *、flushall/flushdb、slow lua script、multi/exec、操作大 value（大 collection）等；对比业务是否新上线了批量扫描类逻辑。
3. 查大 key：redis-cli --bigkeys（建议在 slave 上执行）确认是否有超大 key 或单 key QPS 超高。
4. 查持久化与 fork 影响：info Persistence 看 rdb_bgsave_in_progress / aof_rewrite_in_progress，结合 latest_fork_usec，判断是否因大数据集 fork 或 AOF rewrite 导致主线程阻塞；检查 stop-writes-on-bgsave-error 是否被触发。
5. 查内存与淘汰：used_memory 是否接近 maxmemory、maxmemory-policy 是否为 noeviction（写操作会直接报错）、evicted_keys 是否激增、mem_fragmentation_ratio 是否过高。
6. 查网络与内核参数：慢查询也可能是网络问题——检查 repl-backlog-size 是否过小导致频繁全量复制、repl-timeout、主从 master_link_status 是否 down、以及 /proc/sys/net/core/somaxconn（全连接队列）与 THP 是否按要求调优。
7. 查连接方式：是否大量短连接未复用连接池；是否客户端与服务端跨机房导致 RTT 变大——此时考虑用 pipeline 合并命令。

【衍生知识点】timeout 是结果不是原因，排查主线是「先看是不是被大 key/慢命令阻塞，再看持久化 fork 与内存淘汰，最后看网络与连接数」。

---

### 58. 【面试】本地 redis-cli 访问远程 Redis 服务出错，请说出几种常见错误及原因。

**答案**

常见错误及原因如下：

1. (error) DENIED Redis is running in protected mode...：对方开启了保护模式（protected-mode，Redis 3.2 之后加入），且没有设置 bind 地址和密码，此时只允许 127.0.0.1 访问。解决：设置 bind 地址或 requirepass 密码，或（仅测试时）执行 CONFIG SET protected-mode no 或用 --protected-mode no 启动。注意 Redis 7 版本后只要没有密码就不能远程访问。
2. (error) NOAUTH Authentication required.：服务端设置了 requirepass 但客户端没认证。解决：redis-cli -h IP -p PORT -a PASSWORD --no-auth-warning，或连接后执行 AUTH password。
3. Could not connect to Redis at IP:6379: Connection refused：服务没启动、端口不对、或只监听了 127.0.0.1（bind 未改为 0.0.0.0）；也可能是防火墙/安全组未放行。
4. (error) WRONGPASS invalid username-password pair / Unable to AUTH to MASTER: -ERR invalid password：密码错误——主从场景下从节点 masterauth 与主节点 requirepass 不一致时，同步日志会出现此错误。
5. (error) READONLY You can't write against a read only replica.：连到了从节点做写操作，slave 是只读的。
6. (error) MOVED 5798 10.0.0.18:6379：连接在集群模式下，key 所属槽不在此节点。解决：连到正确节点，或用 redis-cli -c 开启集群模式自动重定向。
7. (error) CROSSSLOT Keys in request don't hash to the same slot：集群模式下执行 mget/mset 等跨槽命令，key 不在同一个槽。
8. (error) CLUSTERDOWN The cluster is down：集群槽位覆盖不全（如某主从组不可用且 cluster-require-full-coverage 为 yes），cluster_state:fail（但 ping 仍返回 PONG）。
9. (error) ERR SELECT is not allowed in cluster mode：集群模式只有一个 db 0，执行 SELECT 会报错。
10. 连接超时 timeout：网络不通、带宽打满、服务端被慢命令阻塞或达到 maxclients 上限。
11. Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.：这不是错误，是密码写在命令行上的安全提示，可加 --no-auth-warning 屏蔽。
【衍生知识点】排查顺序：先 ping 测活，再看是否认证/保护模式问题，再看是主从只读还是集群重定向问题，最后查网络与端口。

---

### 59. 【面试】key-value 大小超大或单 key 的 QPS 超高，会对 Redis 本身和访问 Redis 的其他客户端造成什么影响？

**答案**

一、key 或 value 超大（bigkey）的影响
对 Redis 本身：
1. 单线程模型下，一次只运行一条命令，操作大 value（大 collection）会长时间占用主线程，阻塞其它所有命令——这就是为什么 keys *、flushall、operation big value 都被列为要避免的长/慢命令；
2. 内存使用不均衡，容易造成集群节点内存偏斜（某个节点内存消耗明显更大），甚至触发 maxmemory 淘汰或 OOM；
3. 生成 RDB、AOF rewrite 时耗时明显变长，fork 子进程耗时增加，COW 期间可能占用双倍内存；
4. 主从复制时全量同步传输的 RDB 变大，复制缓冲区（repl-backlog-size）更容易被写满，从而触发全量复制；
5. 网络传输时间变长，删除/过期大 key 本身也可能造成阻塞（可用 lazyfree 相关配置缓解）。

对其它客户端：
1. 请求排队等待，表现为客户端 timeout 报错突然增加；
2. 若配置了 maxclients（默认 10000）达到上限会出现 rejected_connections；
3. 集群场景下会引发数据偏斜和热点节点，其它节点资源闲置而热点节点过载。

二、单 key 的 QPS 超高（热点 key）的影响
1. 热点 key 都落在同一个节点/同一个槽上，单节点 CPU 与带宽被打满，其它节点空闲，集群的水平扩展能力失效；
2. 缓存击穿风险剧增：一旦该热点 key 过期，海量并发会同时打到数据库，导致数据库压力瞬间增大；
3. 主从复制延迟增大，该 master 的 offset 写入量远超从节点同步速度，repl-backlog 可能被写满触发全量复制（单主节点复制风暴）；
4. 如果客户端做读写分离，热点读压力集中到某一个从节点。

三、应对思路
1. 拆分：把大 key 拆成多个小 key（如 hash 分片、按业务维度拆分），避免单个 value 过大；
2. 控制写入：禁止在生产使用 keys *、flushall，用 scan 替代 keys；大 key 删除走异步/分批；
3. 热点分散：多级缓存、本地缓存 + MQ 削峰、key 加随机后缀分散到不同槽；热点数据设置永不过期；
4. 监控与巡检：用 redis-cli --bigkeys 定期查找 bigkey（建议在 slave 执行），用 cluster countkeysinslot 检查槽位数据分布是否偏斜；
5. 架构层面：单机/主从/哨兵已到瓶颈时再用 Cluster 横向扩展，并注意集群节点数不超过 1000。
【衍生知识点】课件把「包含 bigkey、热点数据不均衡、节点和槽分配不均、不同槽对应键值数量差异较大、内存配置不一致」列为集群偏斜的主要原因。

---

### 60. 【面试】Redis Cluster 有哪些局限性？单机、主从、哨兵、集群该如何选择？

**答案**

一、Redis Cluster 的局限性
1. 客户端性能会「降低」：需要维护槽位映射与重定向逻辑；
2. 命令无法跨节点使用：mget、keys、scan、flush、sinter 等跨槽命令不可用，跨槽操作会报 CROSSSLOT，必须保证操作的 key 在同一节点（可用 hash tag 把相关 key 落到同一槽）；
3. 客户端维护更复杂：SDK 和应用本身消耗更多资源（例如更多的连接池）；
4. 不支持多个数据库：集群模式下只有一个 db 0，SELECT 会报错；
5. 复制只支持一层：不支持树形复制结构、不支持级联复制；
6. Key 事务和 Lua 支持有限：操作的 key 必须在一个节点，Lua 和事务无法跨节点使用；
7. 读写分离更复杂：集群模式下从节点默认拒绝读写请求，会重定向到负责槽的节点；虽然 slave 可以执行 readonly 命令让本次连接可读，但连接断开重连后又会变回重定向，因此通常不建议在集群模式下做读写分离，而是通过加节点解决需求；
8. 规模上限：考虑节点间信息交流带来的带宽问题，官方建议节点数不超过 1000 个；
9. 运维成本高：扩缩容需要迁移槽与数据（缩容时源节点必须无数据否则迁移会报错中断），期间可能影响业务。

二、选型建议
1. 单机：仅用于开发测试，或数据可丢失的纯缓存场景，最易运维；
2. 主从：需要数据备份和读扩展，能接受手动故障切换时的停机时间；
3. 哨兵：需要自动故障转移（高可用），并发量未饱和——这是 Redis 3.0 之前生产环境的主流选择，机制类似 MySQL 的 MHA；
4. 集群：单机/哨兵已经不能满足业务的并发量、需要横向扩展容量与吞吐时才搭建。
判断标准（课件原话）：集群搭建要考虑单机 redis 是否已经不能满足业务的并发量；在 redis sentinel 同样能够满足高可用、且并发并未饱和的前提下，搭建集群反而是画蛇添足。
【衍生知识点】若只是读能力不足，优先考虑加从节点做读写分离；若是写能力或容量不足，才需要 Cluster。

---

### 61. 【面试】用 Docker 拉取一个 Redis 如何实现数据持久化保存？

**答案**

核心是「数据卷（volume）挂载」：把容器内 Redis 的工作目录挂载到宿主机，使 RDB/AOF 文件落在宿主机磁盘上，容器重建后数据仍在。

常见做法（课件范例）：
1. 最简持久化启动：docker run --name redis -p 6379:6379 -d -v /data/redis:/data redis
   —— 把宿主机 /data/redis 挂载到容器 /data，Redis 默认 dir 就是 /data，RDB 会写到宿主机的 dump.rdb。
2. 指定连接密码：docker run --name redis -p 6379:6379 -d redis:7.2.4 --requirepass 123456
3. 使用自定义配置文件启动：docker run -d -p 6379:6379 -v /myredis/conf:/usr/local/etc/redis --name myredis redis redis-server /usr/local/etc/redis/redis.conf
   —— 若要在配置里开启 AOF（appendonly yes），同样需要把 dir 指向挂载目录，否则 AOF 文件会随容器删除而丢失。

验证步骤：
1. 写入数据：docker exec redis redis-cli set name wang
2. 手动落盘：docker exec redis redis-cli save（生成 dump.rdb）
3. 在宿主机确认文件：ls -l /data/redis/ 可以看到 dump.rdb
4. 查看版本等信息：docker exec redis redis-cli info server

注意事项：
- 不挂载目录时数据只存在于容器可写层，容器删除即数据丢失；
- 默认 Redis 容器可以直接被远程连接（类似 protected-mode 未生效），生产需配置密码与网络隔离；
- 持久化策略仍由配置文件中的 save/appendonly/appendfsync 决定，容器只负责把文件留在宿主机；
- 多实例部署可用不同宿主机端口映射到同一镜像，配合 --restart always 实现开机自启。
【衍生知识点】若使用 AOF 并希望 7.x 多文件结构（appendonlydir）也持久化，务必确认 appenddirname 位于挂载目录之下。

---
