# 马哥KVM课件 —— 答案与解析

> 共 47 题，编号与《试题册-马哥KVM课件.md》一致。


## KVM笔试

### 1. KVM 虚拟化方案最初由哪家公司开发，后来被哪家公司收购并成为其默认虚拟化引擎？

**答案**

**B**　Qumranet → RedHat

**解析**

KVM 由以色列 Qumranet 公司于 2006 年推出，2008 年被 RedHat 收购，2010 年起成为 RHEL6 的默认虚拟化方案。Xen 则诞生于 2003 年。

---

### 2. 从实现方式上，系统级虚拟化技术通常分为以下哪四类？

**答案**

**B**　模拟、完全虚拟化、半虚拟化、硬件辅助虚拟化

**解析**

按实现方式分为：模拟（纯软件如 QEMU）、完全虚拟化（含 BT 二进制转换）、半虚拟化（修改客户机内核）、硬件辅助虚拟化（Intel VT-x/AMD AMD-V）。

---

### 3. 下列 hypervisor 中，属于 Type-I（裸金属型，直接运行在硬件之上）的是？

**答案**

**C**　VMware ESXi

**解析**

Type-I 直接运行在物理硬件上，如 ESXi、Hyper-V Server、XenServer；Type-II 运行在宿主操作系统之上，如 VMware Workstation、KVM。

---

### 4. 从"实现方式"与"是否依赖硬件辅助"两个维度看，KVM 的定位是？

**答案**

**C**　完全虚拟化 + 硬件辅助虚拟化

**解析**

KVM 是全虚拟化（客户机内核无需修改），同时依赖 Intel VT-x/AMD-V 硬件辅助，两个维度并不冲突。

---

### 5. 检查 CPU 是否支持硬件辅助虚拟化，下列正确的是？

**答案**

**A**　egrep '(vmx|svm)' /proc/cpuinfo，Intel 为 vmx、AMD 为 svm

**解析**

硬件虚拟化标志在 /proc/cpuinfo 的 flags 中：Intel 为 vmx，AMD 为 svm。

---

### 6. 关于 KVM 体系架构三层组件分工，说法错误的是？

**答案**

**D**　libvirt 是内核模块，直接负责 vCPU 调度

**解析**

libvirt 是运行在用户空间的通用虚拟化管理工具层（守护进程 libvirtd + API），不是内核模块；内核侧的虚拟化由 kvm.ko（及 kvm-intel.ko/kvm-amd.ko）承担。

---

### 7. 安装 KVM 后宿主机默认生成的 virbr0 虚拟网卡，其作用描述正确的是？

**答案**

**A**　类似 VMware Workstation 的 VMnet8，为虚拟机提供 NAT 上网能力

**解析**

virbr0 是默认 NAT 网桥（网关 192.168.122.1，网段 192.168.122.0/24），该网段的 DNS 与 DHCP 服务由 dnsmasq 进程提供。

---

### 8. libvirt 默认 NAT 网络（default 网络）使用的网段是？

**答案**

**C**　192.168.122.0/24

**解析**

默认网络定义在 /etc/libvirt/qemu/networks/default.xml，IP 192.168.122.1，DHCP 范围 192.168.122.2~254。

---

### 9. virsh shutdown 能优雅关闭虚拟机，依赖虚拟机内部运行的什么服务？

**答案**

**B**　acpid

**解析**

acpid 是用户空间电源管理事件转发服务。Ubuntu 默认自动安装运行，CentOS 需手工 yum install acpid 并启动。若 shutdown 无效可改用 virsh destroy 强制关闭。

---

### 10. virsh create 与 virsh define 基于同一份 XML 创建虚拟机，二者的区别是？

**答案**

**B**　create 临时创建（虚拟机关闭后即消失），define 永久注册到 libvirt

**解析**

virsh create file.xml 临时创建并启动（不持久化）；virsh define file.xml 注册持久域（关闭后仍在 virsh list --all 中），再用 virsh start 启动。

---

### 11. 从 virsh console 会话中退回到宿主机 shell 的组合键是？

**答案**

**C**　Ctrl+]

**解析**

virsh console 的转义字符是 ^]（Ctrl+]）。注意：新装虚拟机需先在虚拟机内执行 grubby --update-kernel=ALL --args="console=ttyS0" 并重启，才能使用 console 登录。

---

### 12. 关于 virsh autostart 设置虚拟机开机自启动，说法正确的是？

**答案**

**B**　仅已注册的持久虚拟机支持，临时虚拟机不支持

**解析**

virsh autostart 虚拟机名 开启（在 /etc/libvirt/qemu/autostart/ 下建软链接），virsh autostart --disable 取消；临时（transient）虚拟机没有该功能。

---

### 13. 创建"持久化（永久）"存储池的正确命令组合是？

**答案**

**B**　virsh pool-define-as 定义 + virsh pool-build 构建，之后 pool-start 启动

**解析**

pool-define-as 定义永久池（生成 /etc/libvirt/storage/xxx.xml）→ pool-build 构建 → pool-start 启动 → pool-autostart 设自启；pool-create-as 创建的是临时池，libvirt 重启后消失。

---

### 14. virsh vol-create-as 创建存储卷时未指定 --format 参数，默认的卷格式是？

**答案**

**C**　raw

**解析**

如 virsh vol-create-as --pool p1 --name a.img --capacity 2G --allocation 1G 默认创建 raw 格式卷；需要 qcow2 时必须显式 --format qcow2。

---

### 15. 关于 virsh vol-resize 调整存储卷容量，说法正确的是？

**答案**

**B**　默认支持扩容，不支持缩容

**解析**

vol-resize 只改磁盘容量不改数据；尝试缩小时报错"无法缩小现有分配的容量"。

---

### 16. KVM 默认 NAT 网络模型在大流量场景下的主要问题是什么？生产环境一般改用什么模型？

**答案**

**B**　NAT 数据包转换开销成为瓶颈；改用桥接模型

**解析**

NAT 模型靠数据包地址转换与外界通信，大流量时转换成为瓶颈；生产环境一般采用桥接模型，借助宿主机物理网卡直接与外网通信。

---

### 17. TAP 与 TUN 两种虚拟网络设备的区别是？

**答案**

**A**　TAP 模拟以太网设备、操作第二层数据帧，TUN 模拟网络层设备、操作第三层数据包

**解析**

虚拟网卡成对出现（虚拟机侧与 hypervisor 侧各一）。TAP 模拟以太网设备处理二层帧；TUN 模拟网络层设备处理三层数据包（基本不用）。

---

### 18. 关于 raw 与 qcow2 磁盘格式，说法错误的是？

**答案**

**D**　raw 格式也原生支持 backing_file 后端镜像

**解析**

后端镜像（前后端/差异保存）是 qcow2 的特性，raw 不支持；qemu-img create -f qcow2 -o backing_file=基础镜像 test.qcow2 3G 可创建差异盘。

---

### 19. 对正在运行中的虚拟机的磁盘执行 qemu-img convert 转换格式，会发生什么？

**答案**

**B**　失败，报 Failed to get write lock，需先关闭虚拟机

**解析**

运行中的磁盘被 qemu 进程持有写锁，convert、qemu-img info 都会报锁错误；正确做法是 virsh shutdown 后再 qemu-img convert -f raw 旧 -O qcow2 新。

---

### 20. virsh setvcpus 对运行中虚拟机做 CPU 热调整的限制是？

**答案**

**A**　只能增加，不能减少

**解析**

CPU 热调整（RedHat 7.0+）只能加不能减，默认 --live 只改运行态不改后端配置，改配置需 --config；前提是 XML 中 <vcpu placement='static' current='1'>4</vcpu> 这类配置。公有云不支持 CPU 热调整的原因：机型不一致+调度目标宿主机不确定。

---

### 21. virsh qemu-monitor-command --hmp --cmd balloon 2048 在线调整虚拟机内存时，上限受什么约束？

**答案**

**B**　XML 中 <memory> 定义的最大内存限制

**解析**

balloon 只能在 <memory>（最大内存）范围内伸缩 <currentMemory>；要突破上限需 virsh edit 修改 memory 值并重启虚拟机。memballoon 需为 virtio 模型。

---

### 22. virtio-win-0.1.266 驱动 ISO 支持的最低 Windows Server 版本是？

**答案**

**C**　Windows Server 2016

**解析**

0.1.141 版本最低支持 Windows Server 2008，0.1.266 最低支持 Windows Server 2016。Windows 默认没有 KVM 虚拟设备驱动，安装系统时需手动加载 virtio 驱动（amd64/2k16 目录）。

---

### 23. Windows 虚拟机直接克隆会导致所有克隆机 SID 相同，克隆前应使用什么工具"通用化"去除 SID？

**答案**

**B**　sysprep

**解析**

whoami /user 查看 SID；运行 C:\Windows\System32\Sysprep\sysprep.exe，勾选"通用"、关机选项选"关机"，重启后会生成新的主机身份，之后再 virt-clone。

---

### 24. virt-clone 克隆虚拟机后，新虚拟机配置文件相对源虚拟机主要发生变化的是？

**答案**

**B**　name、uuid、磁盘 source、mac

**解析**

克隆会生成新的磁盘文件与配置文件，XML 中变化的是 name/uuid/source（磁盘路径）/mac 四项；克隆仅限关闭状态的虚拟机。

---

### 25. Intel EPT 与 AMD NPT 技术属于哪一类虚拟化技术？

**答案**

**B**　内存（MMU）硬件辅助虚拟化

**解析**

EPT（Intel）/NPT（AMD）在硬件层面支持多级页表转换，让虚拟机页表和宿主机页表同时存在于硬件中，替代软件影子页表，减少 VMM 干预、提升内存虚拟化性能。

---

### 26. 采用 virtio 半虚拟化前后端驱动方式的 IO 设备（磁盘/网卡），性能大约可达物理硬件的？

**答案**

**C**　95%

**解析**

课件数据：纯模拟 IO 约 60%；CPU 的 BT 二进制转换约 80%，硬件辅助约 85%；半虚拟化前后端驱动约 90~95%；IO 半虚拟化约 95%。

---

### 27. 执行 virt-clone 克隆虚拟机的前提条件是？

**答案**

**B**　虚拟机处于关闭状态

**解析**

clone 方式仅限于关闭的主机场景；命令如 virt-clone -o 源虚拟机 -n 新虚拟机 -f /opt/新磁盘.img，或 --auto-clone 自动分配。

---

### 28. 检查 CPU 硬件辅助虚拟化支持时，egrep '(vmx|svm)' /proc/cpuinfo 中：Intel CPU 的标志是______，AMD CPU 的标志是______。

**答案**

- 第 1 空：vmx / VMX
- 第 2 空：svm / SVM

**解析**

flags 字段中 Intel 显示 vmx（VT-x），AMD 显示 svm（AMD-V/SVM）。

---

### 29. KVM 的虚拟化核心以内核模块实现，其基础模块文件名为______（配合 kvm-intel.ko / kvm-amd.ko 架构特定模块工作），加载后表现为字符设备 /dev/kvm。

**答案**

- 第 1 空：kvm.ko / kvm

**解析**

kvm.ko 是基础内核模块，Intel 平台加载 kvm-intel.ko、AMD 平台加载 kvm-amd.ko；lsmod | grep kvm 可验证，设备节点为 /dev/kvm。

---

### 30. libvirt 创建的虚拟机 XML 配置文件默认保存在______目录下（该文件原则上只能用 virsh edit 编辑）。

**答案**

- 第 1 空：/etc/libvirt/qemu / /etc/libvirt/qemu/

**解析**

虚拟机配置如 /etc/libvirt/qemu/CentOS7.xml；网络配置在 /etc/libvirt/qemu/networks/，存储池配置在 /etc/libvirt/storage/。手改 XML 会被覆盖，必须用 virsh edit。

---

### 31. cockpit 是基于 Web 的虚拟化管理平台，其默认监听端口是______。Ubuntu 中允许 root 登录需注释 /etc/cockpit/disallowed-users 中的 root 行。

**答案**

- 第 1 空：9090

**解析**

cockpit.socket 监听 9090 端口，浏览器访问 http://主机IP:9090，可用 netstat -tnulp | grep 9090 确认。

---

### 32. KVM 虚拟机的 VNC 端口默认从______开始分配；virsh domdisplay 输出 vnc://localhost:0 中的 :n 表示实际端口为 5900+n。

**答案**

- 第 1 空：5900

**解析**

第一台虚拟机 VNC 端口为 5900，依次递增；XML 中 <graphics type='vnc' port='-1' autoport='yes'/> 表示自动分配。

---

### 33. 修改虚拟机 XML 配置（如磁盘格式、网卡桥接、内存上限）时，正规做法是使用命令______编辑，避免直接 vim 修改 /etc/libvirt/qemu 下的文件。

**答案**

- 第 1 空：virsh edit

**解析**

virsh edit 虚拟机名 会调用编辑器修改当前生效的定义并做校验；备份用 virsh dumpxml 虚拟机名 > 备份.xml。

---


## KVM面试

### 34. 【面试】什么是虚拟化？虚拟化解决的核心问题与价值是什么？

**答案**

虚拟化是把固定、有限的物理资源（CPU、内存、磁盘、网络等）通过抽象与重新划分，形成多份可独立使用的逻辑资源的技术。操作系统本身就是 CPU 的一种"分时"虚拟化。核心价值：① 提高硬件资源利用率（一台物理机跑多个隔离的虚拟机）；② 降低成本、便于迁移与弹性扩展；③ 环境隔离，便于测试与快速部署。

**解析**

考察对虚拟化本质的理解：资源抽象 + 分时复用 + 隔离。

---

### 35. 【面试】完全虚拟化、半虚拟化、硬件辅助虚拟化三者的区别是什么？各自性能如何？

**答案**

① 完全虚拟化：客户机不知道自己在虚拟环境中，无需修改内核。早期靠软件模拟（分时转发指令，性能差），后发展出 BT 二进制转换（执行瞬间把特权指令翻译成宿主机指令），性能约为物理机的 80%。② 半虚拟化：修改客户机内核，让其知道自己运行在虚拟环境中，不能直接执行特权指令，需要执行特权操作时通过 hyper call 主动交给宿主机 hypervisor 执行，性能约 90%~95%（典型代表 Xen）。③ 硬件辅助虚拟化：借助 CPU 硬件特性（Intel VT-x 的 VMX 模式 / AMD-V 的 SVM），由硬件直接捕获和处理敏感指令，VMM 运行在 root 模式、虚拟机运行在 non-root 模式，性能约 85%。KVM 属于"全虚拟化 + 硬件辅助"的组合。

**解析**

三分类 + 性能数字（80% / 85% / 90~95%）是课件重点。

---

### 36. 【面试】Type-I 与 Type-II hypervisor 的区别是什么？KVM 属于哪一类？

**答案**

Type-I（裸金属型）：hypervisor 直接运行在物理硬件上，无需宿主操作系统，如 VMware ESXi、Hyper-V Server、XenServer，性能和安全性更好，多用于生产/数据中心。Type-II（宿主型）：hypervisor 作为应用程序运行在宿主操作系统之上，如 VMware Workstation、VirtualBox、KVM。按课件的分类，KVM 属于 Type-II 宿主型（依托 Linux 内核模块运行，Linux 就是宿主机）。也有观点认为 Linux 内核直接充当 hypervisor 使 KVM 具备 Type-I 的特征，答出课件口径并说明理由即可。

**解析**

考察 hypervisor 分类概念 + KVM 定位辨析。

---

### 37. 【面试】请描述 KVM 的基本架构，说明 kvm.ko、QEMU、libvirt 三个组件各自的职责。

**答案**

KVM 采用"内核模块 + 用户空间工具 + 管理层"三层架构：① kvm.ko（及 kvm-intel.ko/kvm-amd.ko）：Linux 内核模块，把 Linux 内核变成 hypervisor，利用 CPU 硬件辅助（VT-x/AMD-V）实现 CPU 与内存的虚拟化，加载后暴露字符设备 /dev/kvm。② QEMU：用户空间程序（qemu-kvm），负责设备模拟与 IO 处理（磁盘、网卡、显卡、键鼠等），每个虚拟机本质上就是一个 qemu-kvm 进程。③ libvirt：通用虚拟化管理层，提供统一 API 与守护进程 libvirtd，其上的工具包括 virsh（命令行管理）、virt-install（创建虚拟机）、virt-manager（图形管理）、virt-viewer、cockpit（Web 界面）等。

**解析**

KVM 架构三件套职责划分是最高频面试题之一。

---

### 38. 【面试】拿到一台 Linux 服务器，如何验证它是否支持并已正确启用 KVM？

**答案**

三步验证：① 检查 CPU 硬件虚拟化支持：egrep '(vmx|svm)' /proc/cpuinfo，Intel 出 vmx、AMD 出 svm（未出说明 BIOS 未开 VT-x/AMD-V，Intel 平台还需确认 kvm_intel 模块加载）。② 检查内核模块：lsmod | grep kvm，应看到 kvm 与 kvm_intel/kvm_amd。③ 检查设备节点：ls -l /dev/kvm 存在即 OK。Ubuntu 还可用 cpu-checker 包的 kvm-ok 命令，输出 "KVM acceleration can be used" 表示可用。另注意：Windows 宿主机上 Hyper-V 与 KVM 冲突，需 bcdedit /set hypervisorlaunchtype off 后重启。

**解析**

部署验证三步是实操笔试与面试都爱考的内容。

---

### 39. 【面试】KVM 的 NAT 网络与桥接网络有什么区别？生产环境为什么推荐桥接？

**答案**

NAT 模式：默认网络 default 在宿主机上创建 virbr0 虚拟网桥（192.168.122.1/24），由 dnsmasq 提供 DHCP/DNS，虚拟机之间可互访，访问外网靠 NAT 地址转换，类似 VMware 的 VMnet8。缺点：大流量场景下数据包 NAT 转换成为网络瓶颈。桥接模式：创建虚拟网桥 br0（brctl addbr br0），清空物理网卡 IP（ifconfig ens160 0 up），把物理网卡挂到网桥（brctl addif br0 ens160），再把 IP/网关配置到 br0 上；虚拟机网卡 <interface type='bridge'><source bridge='br0'/> 直接桥接到物理网络，获得与宿主机同网段地址，如同独立主机直连交换机，性能好。生产推荐桥接。注意：配置桥接时分步执行会断网，应使用脚本一次性执行。

**解析**

考察两种网络模型原理 + 桥接四步配置 + 为什么生产用桥接。

---

### 40. 【面试】解释 libvirt 存储池（pool）与存储卷（volume）的概念及两者关系，libvirt 支持哪些后端存储？

**答案**

存储池：把宿主机上的存储空间（本地目录/文件系统、LVM、iSCSI、NFS 网络文件系统等）映射为可被 KVM 统一使用的逻辑存储池，独立于虚拟机管理，可先建池、虚拟机需要时再灵活分配。存储卷：从存储池中划分出来的、可分配给虚拟机使用的存储设备，物理上是一个虚拟磁盘文件或真实分区，与虚拟机内的挂载点对应。关系：池是容器、卷是内容，卷必须建立在已启动的存储池中（vol-create-as --pool 池名 --name 卷名 --capacity 容量 --format 格式）。配置在 /etc/libvirt/storage/。永久池用 pool-define-as + pool-build + pool-start，临时池用 pool-create-as；卷支持创建/克隆/删除/导入导出（vol-upload/vol-download）/擦除（vol-wipe）/扩容（vol-resize，不支持缩容）。

**解析**

存储池/卷概念关系 + 支持后端 + 常用命令都是常考点。

---

### 41. 【面试】raw 与 qcow2 两种磁盘镜像格式如何对比？如何把 raw 转换成 qcow2？

**答案**

raw：老牌裸格式，性能好，指定多大就是多大（裸分配），原生不支持快照、不支持后端镜像，虚拟机迁移受限。qcow2：写时复制稀疏格式，空间动态增长、文件小，支持快照与 backing_file 后端镜像（差异盘），是 OpenStack 默认推荐格式。转换：qemu-img convert -f raw 旧盘.raw -O qcow2 新盘.qcow2，注意必须先关闭使用该磁盘的虚拟机（运行中有写锁）；转换后用 virsh edit 把 <driver type> 与 <source file> 改为新盘并启动。查看镜像信息用 qemu-img info。另注意 qemu-img resize 磁盘 +1G 可在线扩容标称容量（缩容不支持）。

**解析**

格式对比 + convert 命令 + 写锁注意事项。

---

### 42. 【面试】简述 virtio 半虚拟化 IO 的"前后端驱动"工作原理，为什么它比纯模拟设备性能好？

**答案**

virtio 将设备驱动拆成两部分：前端驱动运行在虚拟机内核中（虚拟机专用的标准 virtio 驱动），后端驱动运行在宿主机 hypervisor/QEMU 侧（统一处理真实硬件）。虚拟机内的报文/IO 请求通过前端驱动直接交给宿主机后端驱动，再由后端调用宿主机真实设备驱动发出，省去了纯模拟方式中"虚拟机完整模拟一遍硬件 + hypervisor 再重复处理"的开销，物理硬件性能可发挥约 95%（纯模拟约 60%）。Windows 客户机默认不带 virtio 驱动，需在安装系统时加载 virtio-win 驱动 ISO（块设备、网卡、Balloon 内存气球、控制台等），否则只能退化为 IDE/E1000 模拟设备，性能差甚至磁盘网卡无法识别。局限：前后端驱动方式主要适用于硬盘和网卡设备。

**解析**

virtio 原理是 IO 虚拟化的核心面试题，注意关联 Windows 场景。

---

### 43. 【面试】什么是内存气球（balloon）技术？如何查看和调整虚拟机内存？有什么限制？

**答案**

内存气球依赖虚拟机内的 virtio memballoon 设备：宿主机需要内存时"给气球充气"回收虚拟机空闲内存，虚拟机内存紧张时"放气"归还，实现虚拟机内存的动态分配，也让宿主机内存可以超配（分配总量 > 物理总量，因为实际使用远小于分配）。操作：virsh qemu-monitor-command 虚拟机 --hmp --cmd info balloon 查看当前值，balloon 512 调整为 512MB。限制：只能在 XML 中 <memory>（最大内存）范围内调整 <currentMemory>，超出无效；要突破上限需 virsh edit 修改 memory 后重启虚拟机。virsh setmem 不推荐使用（非即时生效且频繁操作易导致虚拟机异常）。

**解析**

balloon 原理 + qemu-monitor-command 用法 + 最大内存限制。

---

### 44. 【面试】内存虚拟化中，"影子页表"与 EPT/NPT 硬件辅助方案有什么区别？

**答案**

虚拟化后地址要经过两次转换：客户机虚拟地址(GVA)→客户机物理地址(GPA)→宿主机物理地址(HPA)。影子页表：VMM 为每个虚拟机维护一份"宿主机物理地址↔虚拟机物理地址"映射的影子页表，纯软件实现；缺点是维护开销大，且 TLB 缓存与虚拟机一一对应，切换虚拟机时 TLB 全部失效、命中率低。EPT（Intel）/NPT（AMD）：硬件辅助的 MMU 虚拟化，支持硬件两级页表转换，虚拟机页表与宿主机页表可同时存在于硬件中，地址转换由硬件自动完成，大幅减少 VMM 干预，提升内存虚拟化性能。TLB 虚拟化则是在缓存中增加标签（tag）区分不同虚拟机的映射，进一步优化，但命中率仍偏低。

**解析**

内存虚拟化三级地址转换 + 影子页表缺点 + EPT/NPT 是原理类高频题。

---

### 45. 【面试】克隆 Windows 虚拟机前为什么要先执行 sysprep？

**答案**

每台 Windows 安装时都会生成唯一的安全标识符 SID（whoami /user 可查看），如果直接克隆镜像，所有克隆出来的 Windows SID 都相同，在同域/网络环境中会造成身份冲突。sysprep（C:\Windows\System32\Sysprep\sysprep.exe）执行"通用化"会清理当前主机的所有定制身份信息（SID 等），勾选"通用"、关机选项选"关机"，关机后再 virt-clone 克隆；克隆机首次启动时会重新生成新的主机身份并要求重新配置。

**解析**

Windows 克隆特有流程：SID 唯一性 + sysprep 通用化。

---

### 46. 【面试】在 KVM 宿主机上，"一台虚拟机"的本质是什么？libvirtd 服务停止对运行中的虚拟机有什么影响？

**答案**

虚拟机本质上就是宿主机上的一个 qemu-kvm 进程（ps aux | grep 虚拟机名 可见完整命令行，XML 配置中的所有设备都能在进程参数中找到对应项），所以管理虚拟机与管理普通进程基本一样（极端情况下 kill 进程号也能关闭虚拟机）。每次重启虚拟机其 Id 都会变化，因为本质是进程。libvirtd 服务停止后：不影响已经在运行的虚拟机（它们继续作为进程跑），但 virsh/virt-manager 等 libvirt 管理工具将无法管理虚拟机（无法 start/shutdown/查看列表等），需重新启动 libvirtd。

**解析**

"虚拟机=进程"是理解 KVM 的关键点，也是常见追问。

---

### 47. 【面试】硬件辅助虚拟化中 VM exit / VM entry 机制是如何工作的？

**答案**

Intel VT-x 引入 VMX 两种操作模式：根模式（VMX root）与非根模式（VMX non-root）。VMM（KVM）运行在根模式下管理和调度虚拟机，虚拟机（含其内核与用户程序）运行在非根模式下。当虚拟机执行敏感/特权指令时，CPU 硬件自动触发 VM exit，控制权从虚拟机交回 VMM；VMM 模拟/处理完该指令后，通过 VM entry 把控制权还给虚拟机继续执行。AMD-V 类似：用 VMCB 保存虚拟机状态，敏感操作触发 VMEXIT，VMM 处理后 VMENTRY 返回。这样普通指令直接在硬件上执行（无需模拟），只有敏感指令才陷入 VMM，兼顾正确性与性能。

**解析**

VMX 双模式 + VM exit/entry 是 CPU 硬件辅助虚拟化的核心机制。

---
