# 马哥Docker课件 —— 答案与解析

> 共 68 题，编号与《试题册-马哥Docker课件.md》一致。


## Docker笔试

### 1. Docker 容器与虚拟机最本质的区别是？

**答案**

**A**　容器共享宿主机内核，虚拟机各自运行独立内核

**解析**

【马哥Docker课件】容器是宿主机上的一个进程，与宿主机共享同一个内核，仅通过 namespace/cgroups 做隔离与限制；虚拟机则通过 Hypervisor 虚拟出完整硬件，各自运行独立的内核。基于内核的差异，容器秒级启动、体积小，虚拟机启动慢、隔离更彻底。

---

### 2. Docker 实现容器隔离与资源限制，核心依赖 Linux 内核的哪两项技术？

**答案**

**B**　namespace 与 cgroups

**解析**

【马哥Docker课件】namespace 负责『隔离』（让容器看到独立的进程、网络、文件系统等视图），cgroups 负责『限制』（限制进程组可用的 CPU、内存、磁盘、带宽等资源上限）。

---

### 3. 关于 Linux namespace，下列说法正确的是？

**答案**

**A**　共有 6 种 namespace，分别隔离不同的系统资源视图

**解析**

【马哥Docker课件】6 种 namespace：MNT(mount) 挂载点/文件系统、PID 进程、IPC 进程间通信(信号量/消息队列/共享内存)、NET 网络(设备/网络栈/端口)、UTS 主机名与域名、USER 用户与组。限制资源上限的是 cgroups。

---

### 4. cgroups（Control Groups）最早由哪家公司工程师于哪一年发起？

**答案**

**B**　Google，2006 年

**解析**

【马哥Docker课件】cgroups 最早由 Google 工程师(主要 Paul Menage 和 Rohit Seth)于 2006 年发起，最初名为『进程容器(process containers)』；2007 年因 container 一词含义混乱而改名为 cgroup，并合并进 2.6.24 版内核。

---

### 5. cgroups 最主要的作用是？

**答案**

**B**　限制一个进程组能够使用的资源上限(CPU/内存/磁盘/带宽等)

**解析**

【马哥Docker课件】cgroups 最主要作用是限制进程组的资源使用上限，此外还能做优先级设置、资源计量与资源控制(如挂起/恢复进程)。namespace 负责隔离视图，cgroups 负责卡住用量。

---

### 6. OCI（Open Container Initiative）的主要作用是？

**答案**

**A**　定义容器的运行时与镜像格式等开放标准

**解析**

【马哥Docker课件】OCI 由 Docker 等公司推动成立，负责制定开放容器标准——包括运行时规范(runtime-spec)与镜像规范(image-spec)。Docker 把 libcontainer 项目移交 OCI 后演化出 runc，runc 即目前 Docker 默认的容器运行时。

---

### 7. Docker 启动一个容器时，进程调用链的正确顺序是？

**答案**

**B**　docker CLI → Docker Engine → containerd → runc

**解析**

【马哥Docker课件】docker CLI 通过 API 与 Docker Engine(守护进程)交互，Engine 调用高层运行时 containerd，containerd 再调用符合 OCI 标准的低层运行时 runc 创建容器进程。因此容器的进程并非 docker CLI 的子进程，而是由 containerd-shim 托管。

---

### 8. Docker 镜像中是否包含操作系统内核？容器运行依赖什么内核？

**答案**

**B**　不包含内核，所有容器共享宿主机的内核

**解析**

【马哥Docker课件】镜像里只有文件系统(rootfs)没有内核，容器启动后直接使用宿主机内核。所以：① 容器内不能执行与内核强相关的操作(如加载内核模块)；② 镜像可以跨宿主机复用(内核版本兼容前提下)；③ 这也解释了『打镜像不需要做内核参数优化』。

---

### 9. 用镜像启动容器后立即退出(Exited)，最可能的原因是？

**答案**

**B**　容器里的主进程是后台运行或执行完就结束，PID 1 退出导致容器退出

**解析**

【马哥Docker课件】容器的生命周期跟随 PID 1(主进程)。若 Dockerfile 里 CMD/ENTRYPOINT 启动的是后台服务(如 service nginx start)或一次性命令，主进程一结束容器就退出。正确做法是让主进程前台运行(Dockerfile 常用 nginx -g 'daemon off;')。

---

### 10. Dockerfile 中共有指令(Instruction)多少个？其中最常用的约多少个？

**答案**

**B**　共 18 个，常用 12 个

**解析**

【马哥Docker课件】Dockerfile 共有 18 个指令：ADD/ARG/CMD/COPY/ENTRYPOINT/ENV/EXPOSE/FROM/HEALTHCHECK/LABEL/MAINTAINER/ONBUILD/RUN/SHELL/STOPSIGNAL/USER/VOLUME/WORKDIR；最常用 12 个：FROM/LABEL/RUN/ADD/COPY/CMD/ENTRYPOINT/ENV/EXPOSE/USER/VOLUME/WORKDIR。

---

### 11. Dockerfile 中 FROM 指令的要求是？

**答案**

**B**　通常必须是第一个非注释行，指定基础镜像

**解析**

【马哥Docker课件】FROM 指定基础镜像，后续指令都运行在该基础镜像提供的环境中，因此通常必须是第一个非注释行。基础镜像若本地不存在，docker build 会从 Docker Hub 拉取，找不到则报错。FROM scratch 表示从空白开始构建(如静态编译的镜像)。

---

### 12. 关于 CMD 与 ENTRYPOINT 的区别，下列说法正确的是？

**答案**

**A**　CMD 提供默认参数，可被 docker run 后面的命令覆盖；ENTRYPOINT 指定入口可执行程序，不易被覆盖

**解析**

【马哥Docker课件】CMD 设定默认启动命令/参数，docker run 后面跟的命令会覆盖 CMD；ENTRYPOINT 设定容器入口程序，docker run 后面的参数会作为其参数(除非用 --entrypoint 覆盖)。最佳实践常组合：ENTRYPOINT 定可执行文件，CMD 传默认参数。

---

### 13. 关于 ADD 与 COPY 的区别，正确的是？

**答案**

**B**　ADD 支持自动解压本地 tar 包和从 URL 下载，COPY 仅复制本地文件

**解析**

【马哥Docker课件】两者都用于复制构建上下文中的文件到镜像。ADD 额外支持：① 源为 URL 时自动下载；② 源为本地 tar 压缩包时自动解压到目标目录。COPY 则是纯粹的复制。遵循最佳实践，除非需要自动解压，否则建议用 COPY(语义更清晰)。

---

### 14. Dockerfile 中 EXPOSE 指令的作用是？

**答案**

**B**　声明容器运行时监听的端口(元数据)，仅作说明并被 -P 随机映射参考

**解析**

【马哥Docker课件】EXPOSE 只是『声明/文档化』容器内服务监听的端口，写进镜像元数据，并不会在宿主机上真正打开端口。真正对外映射需要 docker run -p 或 -P(配合 EXPOSE 做随机映射)。这与在构建时用命令执行暴露端口是有本质区别的。

---

### 15. Dockerfile 中 WORKDIR 指令的作用是？

**答案**

**B**　为后续的 RUN/CMD/ENTRYPOINT/COPY/ADD 指定工作目录(不存在会自动创建)

**解析**

【马哥Docker课件】WORKDIR 为后续指令设定工作目录，若目录不存在会自动创建。它在镜像层之间是持久的，可多次使用(相对路径基于上一次 WORKDIR)。注意：WORKDIR 不是 cd，只对 Dockerfile 后续指令生效。

---

### 16. Dockerfile 中 VOLUME 指令创建的数据卷，默认属于哪种类型？

**答案**

**C**　匿名卷

**解析**

【马哥Docker课件】Dockerfile 中 VOLUME 指定的是匿名卷(无卷名)。其目的是把易变目录声明为卷，即便用户运行时忘记 -v，也不会把数据写进容器存储层。运行时可用 -v 命名卷覆盖它，如 docker run -v mydata:/data 就把匿名卷覆盖为命名卷。

---

### 17. Docker 镜像分层与容器读写层采用了什么机制来节约空间？

**答案**

**A**　写时复制 COW（Copy On Write）

**解析**

【马哥Docker课件】镜像层只读，容器启动时在镜像栈顶添加一个可读写层。修改只读层中的已有文件时，该文件会被复制到读写层(只读层原文件仍在，被副本隐藏)，即写时复制 COW。COW 节约空间，但频繁修改会带来性能损耗；需要持久化的数据应使用数据卷。

---

### 18. docker inspect 查看容器存储分层中，MergedDir 的含义是？

**答案**

**C**　用 Union FS 把 LowerDir 和 UpperDir 合并后呈现给容器的统一视图

**解析**

【马哥Docker课件】LowerDir=镜像层(只读)；UpperDir=容器上层(可读写，容器变化的数据放这里)；MergedDir=通过 Union FS(联合文件系统)把 lowerdir 与 upperdir 合并后的统一视图，是最终呈现给容器的文件系统；WorkDir 是容器在宿主机的工作目录。

---

### 19. Docker 数据卷的分类中，以下哪种说法正确？

**答案**

**D**　B 与 C 都正确

**解析**

【马哥Docker课件】启动容器实现数据持久化有三种：① 指定宿主机目录/文件(绑定挂载 Bind Mount)，不创建数据卷；② 匿名卷(只给容器内路径，Docker 自动生成宿主机路径)；③ 命名卷(指定卷名与容器路径)。匿名卷和命名卷会在 /var/lib/docker/volumes 下创建数据卷。

---

### 20. 命名卷默认存放在宿主机的哪个位置？

**答案**

**B**　/var/lib/docker/volumes/<卷名>/_data

**解析**

【马哥Docker课件】命名卷固定存放在 /var/lib/docker/volumes/<卷名>/_data；匿名卷则是 /var/lib/docker/volumes/<卷ID>/_data。生产环境一般不需要、也不应该直接访问这个目录，应通过 docker volume 命令管理。

---

### 21. 以下哪个命令可以删除所有未被使用的数据卷？

**答案**

**B**　docker volume prune

**解析**

【马哥Docker课件】docker volume 子命令：create 创建、inspect 查看详情、ls 列出、prune 删除所有未使用的本地卷、rm 删除指定卷。清理已退出容器时也可用 docker volume prune -f 批量清理。

---

### 22. Harbor 是由哪家公司开源的企业级镜像仓库？

**答案**

**C**　VMware

**解析**

【马哥Docker课件】Harbor(港口)是 VMware 开源的企业级 Registry 服务器，通过扩展开源 Docker Distribution 增加了安全、标识和管理等企业必需功能。官方站点 goharbor.io；相比原生 registry，它支持基于角色的访问控制、镜像复制、图形界面、AD/LDAP 集成、审计管理等。

---

### 23. Docker 支持的网络模式共有几种？默认内置的有几种？

**答案**

**B**　共 5 种，默认内置 3 种(bridge/host/none)

**解析**

【马哥Docker课件】Docker 网络模式共 5 种：none、host、bridge、container:<容器名或ID>、<自定义网络名称>。docker network ls 默认能看到 3 个内置网络：bridge、host、none。默认新建容器使用 bridge 模式。

---

### 24. Docker 默认使用的网络模式是？其默认网段和网桥名是？

**答案**

**B**　bridge，172.17.0.0/16，docker0

**解析**

【马哥Docker课件】不指定任何模式即为 bridge 模式(默认)。它给每个容器分配自己的 IP，并连接到虚拟网桥 docker0；默认网段 172.17.0.0/16、网关 172.17.0.1(网桥自身地址)。可用 daemon.json 的 bip/fixed-cidr 修改。

---

### 25. bridge 模式能让容器访问外网、并被外部主机访问，分别借助什么技术？

**答案**

**A**　SNAT 访问外网，DNAT 接受外部访问

**解析**

【马哥Docker课件】bridge 模式也称 NAT 模式：容器出外网时经宿主机的物理网卡做 SNAT(源地址转换/MASQUERADE)；外部主机访问容器时靠 DNAT(目的地址转换/端口映射 -p)把宿主机端口转发到容器。此模式需要宿主机开启 ip_forward。

---

### 26. 关于 host 网络模式，下列说法错误的是？

**答案**

**D**　host 模式下容器完全不做任何隔离，文件系统与进程也与宿主机共享

**解析**

【马哥Docker课件】host 模式(--network host)下容器不创建自己的虚拟网卡，直接使用宿主机网卡和 IP，除『网络以外』的文件系统、进程等仍与宿主机隔离。它网络性能最高、但不支持端口映射(-p 会被忽略并警告 Published ports are discarded)，且各容器端口不能冲突，也不支持 --link。

---

### 27. 关于 none 网络模式，下列说法正确的是？

**答案**

**B**　容器没有网卡、没有 IP、没有路由，无法与外界通信，需手动配置

**解析**

【马哥Docker课件】none 模式(--network none)下 Docker 不为容器做任何网络配置：没有网卡、没有 IP、没有路由，默认无法与外界通信，也无法实现端口映射，需要手动添加网卡、配置 IP。因此极少使用，主要用于测试环境。

---

### 28. 关于 container 网络模式，下列说法正确的是？

**答案**

**B**　新容器与一个已存在的容器共享网络命名空间(IP/端口)，两容器可通过 lo 通信

**解析**

【马哥Docker课件】container 模式(--network container:名称或ID)让新容器与指定容器共享网络空间，不创建自己的网卡与 IP，共享对方的 IP 和端口范围，两个容器的进程可通过 lo(127.0.0.1)通信；因此端口不能与被共享容器冲突；被共享容器停止会导致新容器无法创建；默认不支持端口映射，较少使用。

---

### 29. 以下关于 --link 的说法正确的是？

**答案**

**B**　--link 只在用户自定义网络下受支持，host 等模式下使用会报错

**解析**

【马哥Docker课件】--link 只支持用户自定义网络(user-defined networks)。在 host 模式下使用会提示 links are only supported for user-defined networks。它主要用于同一宿主机内容器间通过容器名/别名互相解析，跨宿主机无法使用。

---

### 30. 自定义网络（用户自定义 bridge）相比默认 bridge 模式的优势主要是？

**答案**

**A**　提供容器名自动 DNS 解析，容器间可直接用名称互访

**解析**

【马哥Docker课件】用户自定义 bridge 网络内置 DNS，容器可通过容器名/别名直接解析对方地址；而默认 bridge 网络不支持自动 DNS，传统上需用 --link。这也是推荐用自定义网络实现容器互联的原因。

---

### 31. Docker Compose 的定位是？

**答案**

**B**　单机多容器编排工具，用 YAML 文件定义并批量管理容器

**解析**

【马哥Docker课件】docker-compose 是 Docker 官方开源的单机多容器编排工具，通过 docker-compose.yml 定义服务，能解决容器间依赖关系(如先起 MySQL 再起 Tomcat)，并批量创建、启动、停止容器。类比：docker 命令像 shell 命令，compose 文件像 shell 脚本。跨多主机的编排属于 K8s/Swarm 的范畴。

---

### 32. 从哪个 Docker 版本开始内置了 compose 子命令（如 docker compose up）？

**答案**

**C**　23.0.0

**解析**

【马哥Docker课件】从 Docker 23.0.0 起内置了 compose 子命令，可直接用 docker compose(中间是空格) 调用，无需单独安装 docker-compose 二进制。旧版本则需独立安装 docker-compose 命令。

---

### 33. 使用 -m/--memory 限制容器内存，其最小允许值是？

**答案**

**B**　4m

**解析**

【马哥Docker课件】--memory 是硬限制，指定容器可使用的最大物理内存(RSS)，最小允许值为 4m(4MB)。它是常用选项。注意宿主机需开启 swapaccount 等 cgroup 支持才能同时限制 swap。

---

### 34. 关于 --memory-swap 的取值规则，下列说法错误的是？

**答案**

**D**　设为 -1 时容器不能使用任何 swap

**解析**

【马哥Docker课件】--memory-swap=-1 表示：若宿主机启用了 swap，容器可以使用主机上所有 swap 空间。规则：正数 S 且 --memory=M 时，ram=M、swap=S-M(S=M 则无 swap)；0=忽略(视为未设置)；不设置=最大 2×--memory；-1=用尽主机全部 swap。该选项必须在设置了 --memory 后才生效。

---

### 35. --memory-reservation 属于？

**答案**

**B**　--memory 的软限制，当主机内存争用时才激活，不保证容器不超过该值

**解析**

【马哥Docker课件】--memory-reservation 指定小于 --memory 的软限制，仅在主机出现内存争用或不足时激活；因为是软限制，不能保证容器不超过该值。它必须设置为低于 --memory 才优先生效。

---

### 36. 关于 CPU 限制参数，下列说法正确的是？

**答案**

**B**　--cpus 用于指定容器可使用多少 CPU 核心(如 1.5)，等价于设置 --cpu-period=100000 与 --cpu-quota=150000

**解析**

【马哥Docker课件】--cpus(1.13+) 用于指定可用核心数，如 --cpus=1.5 即最多用 1.5 个核心，等价于 --cpu-period=100000 与 --cpu-quota=150000，目的是替代这两个过时参数。--cpu-shares 是软限制(相对权重，默认 1024；--cpuset-cpus 才是 CPU 绑定。

---

### 37. --cpu-shares 的默认值和最大值分别是？

**答案**

**A**　默认 1024，最大 262144

**解析**

【马哥Docker课件】--cpu-shares 设置 CFS 调度中的相对权重，是软限制：A=1024、B=2048 时，B 最多可用到 A 的两倍 CPU。默认 1024，最大 262144。注意进程数要多于 CPU 核数才能看到效果，且该值不能设置太小。

---

### 38. Linux CFS(完全公平调度)为每个进程维护的调度依据是？

**答案**

**B**　虚拟运行时间 vruntime，调度器总选 vruntime 最小的进程

**解析**

【马哥Docker课件】CFS 给每个进程安排一个虚拟时钟 vruntime：进程运行则 vruntime 增长，未运行则不变，调度器总选择 vruntime 最小(跑得最慢)的进程执行，即『完全公平』。优先级高的进程 vruntime 增长更慢，从而获得更多运行机会。CFS 对 IO 交互型进程更友好。

---

### 39. 向容器开放 GPU 使用 --gpus 参数，下列写法正确的是？

**答案**

**A**　--gpus all 公开所有 GPU

**解析**

【马哥Docker课件】使用 --gpus 公开 GPU，如 --gpus all 公开全部、--gpus '"device=0,2"' 公开第 1、3 块、也可用 --gpus device=<GPU-UUID> 指定某块。前提是宿主机已安装正确的 NVIDIA 驱动并安装 nvidia-container-toolkit。

---

### 40. Docker 实现容器隔离与资源限制，核心依赖 Linux 内核的 namespace 与 ______ 两大技术。

**答案**

- 第 1 空：cgroups / cgroup / Control Groups

**解析**

【马哥Docker课件】namespace 负责隔离视图，cgroups(Control Groups) 负责限制 CPU/内存/磁盘/带宽等资源上限。

---

### 41. Docker 安装后默认创建的虚拟网桥名称是 ______，其默认网段为 ______。

**答案**

- 第 1 空：docker0
- 第 2 空：172.17.0.0/16 / 172.17.0.0

**解析**

【马哥Docker课件】默认网桥名为 docker0，默认网段 172.17.0.0/16、网关 172.17.0.1(网桥自身地址)。

---

### 42. 数据卷容器默认存放在宿主机的 ______ 目录下，命名卷对应子目录 ______。

**答案**

- 第 1 空：/var/lib/docker/volumes / /var/lib/docker/volumes/
- 第 2 空：_data

**解析**

【马哥Docker课件】命名卷固定为 /var/lib/docker/volumes/<卷名>/_data；匿名卷为 /var/lib/docker/volumes/<卷ID>/_data。

---

### 43. Dockerfile 中共有 ______ 个指令，其中通常必须是第一个非注释行的指令是 ______。

**答案**

- 第 1 空：18 / 十八
- 第 2 空：FROM

**解析**

【马哥Docker课件】Dockerfile 共 18 个指令；FROM 指定基础镜像，通常必须是第一个非注释行。

---

### 44. Docker 默认的存储驱动是 ______，其镜像数据一般位于 /var/lib/docker 下同名目录。

**答案**

- 第 1 空：overlay2 / overlay

**解析**

【马哥Docker课件】overlay2 是 Docker 默认存储驱动(基于联合文件系统 OverlayFS)，数据位于 /var/lib/docker/overlay2。

---

### 45. 使用 -m/--memory 限制容器内存，其最小允许值为 ______。

**答案**

- 第 1 空：4m / 4M / 4MB / 4mB

**解析**

【马哥Docker课件】--memory 为硬限制，最小允许值为 4m(4MB)。

---

### 46. --cpu-shares 用于设置 CFS 调度的相对权重，其默认值为 ______，最大值为 ______。

**答案**

- 第 1 空：1024
- 第 2 空：262144

**解析**

【马哥Docker课件】--cpu-shares 默认 1024、最大 262144，是软限制(相对权重)。

---

### 47. Harbor 是 ______ 公司开源的企业级镜像仓库服务器，官方站点为 goharbor.io。

**答案**

- 第 1 空：VMware / vmware / 威睿

**解析**

【马哥Docker课件】Harbor 由 VMware 开源，通过扩展开源 Docker Distribution 增加了安全、标识、管理等企业级特性。

---

### 48. Docker 的网络模式中，与宿主机共享网络(性能无损耗但端口易冲突)的是 ______ 模式；不做任何网络配置、无法与外界通信的是 ______ 模式。

**答案**

- 第 1 空：host
- 第 2 空：none

**解析**

【马哥Docker课件】host 模式共享宿主机网络、性能最高但不支持端口映射；none 模式无网卡/IP/路由，无法通信。

---

### 49. Docker 使用 ______ 机制实现镜像分层与容器读写层，修改只读层文件时复制到读写层。

**答案**

- 第 1 空：写时复制 / COW / Copy On Write / copy-on-write

**解析**

【马哥Docker课件】COW(Copy On Write，写时复制)：镜像层只读，容器启动在栈顶加读写层，修改只读层文件时复制到读写层，节约空间但频繁修改会有性能损耗。

---


## Docker面试

### 50. 请简述容器与虚拟机的区别。

**答案**

1) 隔离级别：虚拟机通过 Hypervisor 虚拟硬件、每台虚拟机运行独立内核(强隔离)；容器与宿主机共享同一个内核，仅用 namespace/cgroups 隔离与限制，隔离性相对弱。
2) 资源占用与启动速度：虚拟机体积大(含完整 OS)、启动分钟级；容器体积小(仅应用+依赖)、启动秒级甚至毫秒级。
3) 密度：一台宿主机可跑成百上千个容器，而虚拟机数量有限。
4) 本质：容器本质是宿主机上的一个进程，虚拟机是独立的操作系统实例。
5) 适用场景：虚拟机适合强隔离/异构内核；容器适合快速交付、弹性伸缩、微服务。
【衍生】容器并非『轻量级虚拟机』，它没有自己的内核，因此不能执行与内核强相关的操作(如加载内核模块)。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 51. Docker 使用了哪些核心技术？分别有什么作用？

**答案**

1) namespace(6 种)：提供隔离。MNT 隔离挂载点/文件系统；PID 隔离进程；IPC 隔离进程间通信(信号量/消息队列/共享内存)；NET 隔离网络设备/栈/端口；UTS 隔离主机名与域名；USER 隔离用户与组。
2) cgroups：限制进程组可用的资源上限(CPU、内存、磁盘、网络带宽)，并支持优先级、计量与控制(挂起/恢复)。
3) Union FS(联合文件系统/overlay2)：实现镜像分层与写时复制，多个只读层叠加并在顶部加一个可写层。
4) veth + docker0 网桥：实现容器网络，容器网卡与宿主机 docker0 通过 veth 对连接。
5) libcontainer/runc(OCI 运行时)：负责真正创建容器、设置 namespace/cgroups。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 52. 请说出 6 种 Linux namespace 及其分别隔离的资源。

**答案**

① MNT(mount)：隔离磁盘挂载点与文件系统；
② PID：隔离进程(PID 视图)，不同 namespace 可有相同 PID；
③ IPC：隔离进程间通信资源——信号量、消息队列、共享内存(每个 IPC 资源有唯一 32 位 ID)；
④ NET：隔离网络设备、IP 地址、路由表、/proc/net；Docker 默认用 veth 对把容器网卡连到 docker0；
⑤ UTS(UNIX Time-sharing System)：隔离主机名与域名，使容器在网络中可被视为独立节点；
⑥ USER：隔离用户与组 ID，容器内可用容器内用户执行程序，而非宿主机用户。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 53. cgroups 的作用是什么？为什么容器需要它？

**答案**

作用：限制一个进程组能够使用的资源上限，包括 CPU、内存、磁盘 IO、网络带宽等；此外还能设置进程优先级、做资源计量，以及资源控制(如挂起/恢复进程)。
为什么需要：若不对容器做任何限制，容器可占用宿主机无限内存/CPU，一旦应用有 bug 持续申请内存，可能把宿主机资源耗尽，危及其他容器与服务。因此必须用 cgroups 对容器做资源分配限制。cgroups 在内核层默认已开启，内核越新支持的功能越多(与 docker run 的 -m/--cpus 等参数对应)。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 54. Docker 有哪些网络模式？各自的特点和适用场景是什么？

**答案**

共 5 种：
① bridge(默认)：每容器独立 IP，连到 docker0，通过 SNAT 出外网、DNAT 接受外部访问(又称 NAT 模式)；需开 ip_forward；隔离好但性能有损、端口管理繁琐。
② host：共享宿主机网卡和 IP，性能无损耗、排障简单，但端口易冲突、不支持端口映射，适用于端口固定的业务。
③ none：不做任何网络配置，无网卡/IP/路由，无法通信，适用于测试环境。
④ container:<名称|ID>：与指定容器共享网络命名空间，两容器通过 lo 通信，端口不能冲突，被共享容器停止则无法创建，少用。
⑤ <自定义网络名>：用户自定义 bridge，内置 DNS，容器可用名称互访，推荐用于容器互联(--link 仅用户自定义网络支持)。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 55. Dockerfile 常用的指令有哪些？各是什么含义？

**答案**

常用 12 个：
FROM：指定基础镜像(通常第一个非注释行)；
LABEL：指定镜像元数据；
RUN：构建时执行命令；
ADD：复制文件，支持 URL 下载与 tar 自动解压；
COPY：纯复制文本/目录到镜像；
CMD：默认启动命令/参数，可被 docker run 覆盖；
ENTRYPOINT：容器入口程序，参数不易被覆盖；
ENV：设置环境变量；
EXPOSE：声明监听端口(仅元数据，不真正打开)；
USER：指定运行用户与组；
VOLUME：声明匿名数据卷；
WORKDIR：为后续指令指定工作目录。
另外还有 ARG、HEALTHCHECK、ONBUILD、SHELL、STOPSIGNAL、MAINTAINER 等，合计 18 个。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 56. CMD 和 ENTRYPOINT 有什么区别？请举例说明。

**答案**

区别：
① CMD 提供容器默认的启动命令/参数，docker run <镜像> <命令> 会把 CMD 覆盖掉；ENTRYPOINT 指定入口可执行程序，docker run 后面的内容会作为 ENTRYPOINT 的参数，而不是覆盖它(除非显式用 --entrypoint 覆盖)。
② 若同时存在，CMD 的值会作为 ENTRYPOINT 的默认参数。
写法：exec 格式(JSON 数组)不经过 shell，如 ENTRYPOINT ["nginx","-g","daemon off;"]；shell 格式会以 /bin/sh -c 执行。
最佳实践：ENTRYPOINT ["/usr/sbin/nginx"] + CMD ["-g","daemon off;"]，既固定入口又给默认参数。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 57. ADD 和 COPY 有什么区别？应该用哪个？

**答案**

相同点：都用于把构建上下文中的文件/目录复制到镜像指定路径。
不同点：ADD 额外支持两点——① 源为 URL 时自动下载；② 源为本地 tar 压缩包时自动解压到目标目录。COPY 只做纯粹的复制，不支持解压与下载。
建议：遵循最佳实践，除非确需 tar 自动解压，否则优先用 COPY——语义更清晰、行为更可预测。需要下载远程文件一般也不建议用 ADD，而是 RUN curl/wget。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 58. Dockerfile 可以做哪些优化？

**答案**

1) 合理利用构建缓存：把不常变的指令(如依赖安装)放前面，常变的(如 COPY 源码)放后面，减少缓存失效。
2) 合并 RUN 指令并用 && 串联，减少镜像层数；同一 RUN 内清理临时文件(yum clean all、rm -rf 缓存)。
3) 选用更小的基础镜像(alpine、slim、distroless)，或采用多阶段构建(multi-stage)只保留运行所需产物。
4) .dockerignore 排除无用文件，减小构建上下文体积。
5) 用 COPY 替代 ADD(除需自动解压)，减少隐式行为。
6) 固定基础镜像 tag/摘要，避免 latest 漂移。
7) 尽量以非 root 用户运行(USER)。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 59. 容器与宿主机之间如何实现文件共享/数据持久化？数据卷有哪几种？

**答案**

容器数据持久化用『数据卷』实现，它是宿主机上的目录或文件，可直接挂载到容器使用。三种方式：
① 绑定挂载(Bind Mount)：指定宿主机具体路径，如 -v /data/testdir:/usr/share/nginx/html；不创建数据卷；宿主机目录/容器目录不存在会自动创建；初始容器旧数据会被宿主机目录覆盖。
② 匿名卷：只给容器内路径，如 -v /etc/nginx，Docker 自动在 /var/lib/docker/volumes/<卷ID>/_data 生成；容器旧数据会复制进来。
③ 命名卷：指定卷名，如 docker volume create vol1 后 -v vol1:/usr/share/nginx/html；固定存于 /var/lib/docker/volumes/<卷名>/_data；可被多个容器复用共享。
另外 -v 可加 ro/rw 控制读写权限；docker rm -v 或 --rm 可在删除容器时删除关联匿名卷。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 60. 两台服务器都装了 Docker，双方的容器如何实现通信？有几种方式？

**答案**

同一宿主机内容器通信：
① 默认 bridge 网络 + --link(仅用户自定义网络支持)，通过容器名/别名解析；
② 推荐用自定义 bridge 网络，内置 DNS，容器直接用容器名互访；
③ container 模式共享网络命名空间，用 lo 通信。
跨宿主机容器通信(不同主机的两个容器)：原生 Docker 默认隔离，不能直接互通，需借助：
① 端口映射到宿主机，通过宿主机 IP + 映射端口访问；
② overlay 网络(需 Swarm/consul 等 key-value 存储支持)；
③ macvlan/ipvlan 让容器直接接入物理网络；
④ 或用 CNI/第三方网络插件(如 flannel、calico)，K8s 场景下由 Pod 网络实现。
总结：同主机靠 bridge/自定义网络；跨主机需 overlay/macvlan 或经宿主机端口暴露。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 61. Docker 打镜像时，需不需要对容器内的操作系统做内核参数优化？为什么？

**答案**

不需要。因为容器与宿主机共享同一个内核，容器内并没有独立内核，/proc/sys 下的许多内核参数(如 net.core.somaxconn、vm.swappiness、ip_forward 等)是宿主机的，属于全局资源。
在容器内修改这些内核参数，通常会报『Read-only file system』或直接被限制(部分 net.* 参数虽可写，但写的是宿主机网络命名空间内的值，需谨慎)。
正确做法：内核参数优化应在宿主机(节点)层面统一进行，镜像只负责应用运行环境。这也是容器与虚拟机的一个重要区别。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 62. Docker 是使用什么协议进行通信的？

**答案**

Docker 采用 C/S 架构，客户端与守护进程(Docker daemon)之间通过 RESTful API 通信，底层默认使用 Unix 域套接字 /var/run/docker.sock；也可配置为 TCP 套接字(如 tcp://0.0.0.0:2375 明文 / 2376 TLS 加密)供远程调用。
镜像仓库(Registry)的拉取/推送则基于 HTTP/HTTPS 协议(Registry V2 API)，默认走 TLS。
容器内进程之间的通信仍是 Linux 常规方式(通过 IPC namespace 下的信号量、消息队列、共享内存，或网络)。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 63. docker run 一个容器时把端口映射成了 8080，后来忘记了当初的命令，如何修改这个容器的映射端口？

**答案**

容器的端口映射在创建时写入配置，运行中无法直接修改，需按以下思路处理：
① 推荐做法：用 docker inspect 查出原始配置(命令、端口、挂载、环境变量等)，然后 docker commit 保存为新镜像或直接用原镜像，重新用新端口 docker run 一个新容器，再删掉旧容器。
② 或修改宿主机的 iptables/DOCKER 链规则做临时转发(不推荐，重启易丢失)。
③ 更彻底的方案：改用 docker-compose 管理，端口写在 docker-compose.yml 里，docker compose up -d 重建即可。
要点：端口映射属于不可变配置，实践上都是『重建容器』而不是原地改。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 64. 如何找到某个 Docker 容器日志在宿主机的输出位置？

**答案**

有两种方式：
① 直接用 docker logs <容器ID/名> 查看(最常用)，可加 -f 实时跟踪、--tail N 看末尾 N 行；
② 找宿主机文件位置：先 docker inspect --format='{{.LogPath}}' <容器> 直接得到日志文件路径，通常位于 /var/lib/docker/containers/<容器ID>/<容器ID>-json.log，日志驱动默认是 json-file。
可在 /etc/docker/daemon.json 配置 log-driver 与 log-opts(如 max-size、max-file)做日志轮转，也可改为 journald、syslog 等驱动。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 65. 请简述 docker run 与 docker-compose 的关系与区别。

**答案**

关系：compose 是建立在 docker run 之上的『编排层』。docker 命令像 Linux 命令，docker-compose.yml 像 shell 脚本——把多条 docker run 及其参数固化到 YAML 中批量执行。
区别：
① 编排能力：docker run 一次只起一个容器；compose 一次管理一组容器(docker compose up/down)。
② 依赖关系：compose 能处理服务启动顺序/依赖(先 MySQL 再 Tomcat 再 Nginx)，docker run 需人工保证顺序。
③ 可维护性：compose 配置声明式、可版本管理，便于团队复用；docker run 命令长、易错。
④ 范围：compose 面向单机；跨主机编排需 K8s/Swarm。
类比：docker 命令 ≈ ansible 命令，compose 文件 ≈ ansible-playbook。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 66. 如何对容器的 CPU 和内存做资源限制？涉及哪些参数？

**答案**

内存：
① -m/--memory：硬限制，容器可用最大物理内存(RSS)，最小 4m；
② --memory-swap：swap 上限，需配合 -m 使用(相等则无 swap、0 视为未设置、不设置为 2×内存、-1 用尽主机 swap)；
③ --memory-reservation：软限制，内存争用时才激活；
④ --memory-swappiness：0-100，交换倾向；--oom-kill-disable：禁用 OOM Kill(需先设 -m，新内核可能不支持)。
CPU：
① --cpus=1.5：限制可用核心数(1.13+，等价 --cpu-period=100000 + --cpu-quota=150000)；
② --cpu-shares：相对权重(软限制，默认 1024，最大 262144)；
③ --cpuset-cpus：CPU 绑定(如 2,4-5)；
④ --cpu-quota/--cpu-period：过时选项，被 --cpus 取代。
查看效果：docker stats、docker stats --no-stream。底层由 cgroups 落实。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 67. 请简述 Harbor 的作用与主要组成。

**答案**

作用：Harbor 是 VMware 开源的企业级 Registry 服务器，通过扩展开源 Docker Distribution，增加了安全、标识、管理等企业特性，用于存储和分发 Docker 镜像。相比原生 registry，提供基于角色的访问控制(RBAC)、镜像复制(多 Registry 同步，适合负载均衡/高可用/混合云)、图形化界面、AD/LDAP 集成、操作审计、RESTful API、国际化与简单部署。
主要组成(由多个容器协作)：
① Proxy：nginx 反向代理，转发 Notary/Docker client/浏览器请求；
② Core Service(UI)：Web 管理界面、API、Auth 认证、Token 服务(基于用户在每个 project 的 role 发放 token)；
③ Registry：负责存储镜像文件、处理 pull/push，强制访问控制；
④ Admin Service(harbor-adminserver)：配置管理中心，附带存储用量检查；
⑤ Job Service(harbor-jobservice)：负责镜像复制，pull 后 push 到另一个 registry 并记录 job_log；
⑥ Log Collector(harbor-log)：日志汇总；
⑦ DB(harbor-db)：存储 project/user/role/replication 等元数据；另有 Redis 做缓存。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---

### 68. 生产环境中为什么建议用数据卷而不是把数据写在容器里？

**答案**

1) 容器可写层随容器删除而消失：容器内写入的数据保存在最上层的可读写层，容器一删除，数据即丢失，无法持久化。
2) 性能：可写层基于 COW，频繁修改已有文件会带来明显的复制与写放大开销；数据卷直接映射宿主机目录/卷，性能更好。
3) 共享与复用：数据卷可在多个容器间共享(如数据库数据、日志、静态页面、配置文件)，命名卷还能被其他容器按名称挂载复用。
4) 与镜像解耦：数据卷的变化不影响镜像，便于镜像独立升级；也便于用 volume 做备份/迁移。
5) 最佳实践：遵循『容器存储层不做数据写入』原则，Dockerfile 中可用 VOLUME 声明易变目录为匿名卷作为保险。
注意：数据卷依赖宿主机目录，宿主机故障会影响数据，多宿主机场景管理不便，生产上常配合共享存储/分布式存储。

**解析**

【马哥Docker课件】面试简答题，参考答案见答案要点。

---
