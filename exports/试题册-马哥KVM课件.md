# 马哥KVM课件 —— 试题册

> 共 47 题。答案与解析见《答案册-马哥KVM课件.md》。


## KVM笔试

### 1. KVM 虚拟化方案最初由哪家公司开发，后来被哪家公司收购并成为其默认虚拟化引擎？

- **A.** XenSource → Citrix
- **B.** Qumranet → RedHat
- **C.** VMware → EMC
- **D.** Microsoft → Intel

### 2. 从实现方式上，系统级虚拟化技术通常分为以下哪四类？

- **A.** 硬件虚拟化、容器虚拟化、桌面虚拟化、网络虚拟化
- **B.** 模拟、完全虚拟化、半虚拟化、硬件辅助虚拟化
- **C.** 全虚拟化、半虚拟化、操作系统级、库级
- **D.** Type-I、Type-II、Type-III、Type-IV

### 3. 下列 hypervisor 中，属于 Type-I（裸金属型，直接运行在硬件之上）的是？

- **A.** VMware Workstation
- **B.** KVM
- **C.** VMware ESXi
- **D.** VirtualBox

### 4. 从"实现方式"与"是否依赖硬件辅助"两个维度看，KVM 的定位是？

- **A.** 半虚拟化 + 不依赖硬件
- **B.** 模拟 + 不依赖硬件
- **C.** 完全虚拟化 + 硬件辅助虚拟化
- **D.** 完全虚拟化 + 不依赖硬件

### 5. 检查 CPU 是否支持硬件辅助虚拟化，下列正确的是？

- **A.** egrep '(vmx|svm)' /proc/cpuinfo，Intel 为 vmx、AMD 为 svm
- **B.** cat /proc/meminfo | grep kvm
- **C.** lspci | grep -i virtual
- **D.** uname -r | grep kvm

### 6. 关于 KVM 体系架构三层组件分工，说法错误的是？

- **A.** kvm.ko 是内核模块，为 CPU/内存虚拟化提供核心支持
- **B.** QEMU 运行在用户空间，负责设备模拟与 IO 处理
- **C.** libvirt 提供统一管理接口，virsh/virt-manager/virt-install 基于其实现
- **D.** libvirt 是内核模块，直接负责 vCPU 调度

### 7. 安装 KVM 后宿主机默认生成的 virbr0 虚拟网卡，其作用描述正确的是？

- **A.** 类似 VMware Workstation 的 VMnet8，为虚拟机提供 NAT 上网能力
- **B.** 提供桥接模式直连外网
- **C.** 仅用于宿主机自身管理通信
- **D.** 为虚拟机分配公网 IP

### 8. libvirt 默认 NAT 网络（default 网络）使用的网段是？

- **A.** 192.168.1.0/24
- **B.** 10.0.0.0/8
- **C.** 192.168.122.0/24
- **D.** 172.17.0.0/16

### 9. virsh shutdown 能优雅关闭虚拟机，依赖虚拟机内部运行的什么服务？

- **A.** sshd
- **B.** acpid
- **C.** crond
- **D.** rsyslog

### 10. virsh create 与 virsh define 基于同一份 XML 创建虚拟机，二者的区别是？

- **A.** create 永久注册，define 临时创建
- **B.** create 临时创建（虚拟机关闭后即消失），define 永久注册到 libvirt
- **C.** 两者没有区别
- **D.** define 只能用于克隆场景

### 11. 从 virsh console 会话中退回到宿主机 shell 的组合键是？

- **A.** Ctrl+C
- **B.** Ctrl+D
- **C.** Ctrl+]
- **D.** Ctrl+Z

### 12. 关于 virsh autostart 设置虚拟机开机自启动，说法正确的是？

- **A.** 包括临时虚拟机在内的所有虚拟机都支持
- **B.** 仅已注册的持久虚拟机支持，临时虚拟机不支持
- **C.** 只支持处于运行状态的虚拟机
- **D.** 需要修改宿主机 grub 配置才能生效

### 13. 创建"持久化（永久）"存储池的正确命令组合是？

- **A.** virsh pool-create-as 一步创建并启动
- **B.** virsh pool-define-as 定义 + virsh pool-build 构建，之后 pool-start 启动
- **C.** virsh pool-autostart 直接创建
- **D.** virsh pool-start 直接创建

### 14. virsh vol-create-as 创建存储卷时未指定 --format 参数，默认的卷格式是？

- **A.** qcow2
- **B.** vmdk
- **C.** raw
- **D.** vhd

### 15. 关于 virsh vol-resize 调整存储卷容量，说法正确的是？

- **A.** 可以随意放大或缩小
- **B.** 默认支持扩容，不支持缩容
- **C.** 只能缩容不能扩容
- **D.** 调整前必须先删除卷

### 16. KVM 默认 NAT 网络模型在大流量场景下的主要问题是什么？生产环境一般改用什么模型？

- **A.** 广播风暴；改用隔离模型
- **B.** NAT 数据包转换开销成为瓶颈；改用桥接模型
- **C.** IP 地址不足；改用 IPv6
- **D.** DNS 解析慢；改用 hosts 文件

### 17. TAP 与 TUN 两种虚拟网络设备的区别是？

- **A.** TAP 模拟以太网设备、操作第二层数据帧，TUN 模拟网络层设备、操作第三层数据包
- **B.** TUN 处理二层帧，TAP 处理三层数据包
- **C.** 两者功能完全相同
- **D.** TAP 只能用于 IPv6

### 18. 关于 raw 与 qcow2 磁盘格式，说法错误的是？

- **A.** raw 是老牌裸格式，性能较好，但原生不支持快照，迁移受限
- **B.** qcow2 空间动态增长、文件小、支持快照，是 OpenStack 默认推荐格式
- **C.** qcow2 支持通过 backing_file 基于后端镜像创建增量磁盘
- **D.** raw 格式也原生支持 backing_file 后端镜像

### 19. 对正在运行中的虚拟机的磁盘执行 qemu-img convert 转换格式，会发生什么？

- **A.** 正常完成转换
- **B.** 失败，报 Failed to get write lock，需先关闭虚拟机
- **C.** 转换后自动重新挂载
- **D.** 无论什么格式都能在线转

### 20. virsh setvcpus 对运行中虚拟机做 CPU 热调整的限制是？

- **A.** 只能增加，不能减少
- **B.** 只能减少，不能增加
- **C.** 可以随意增减
- **D.** 必须先重启宿主机

### 21. virsh qemu-monitor-command --hmp --cmd balloon 2048 在线调整虚拟机内存时，上限受什么约束？

- **A.** 没有任何限制
- **B.** XML 中 <memory> 定义的最大内存限制
- **C.** 磁盘剩余空间限制
- **D.** 宿主机内核版本限制

### 22. virtio-win-0.1.266 驱动 ISO 支持的最低 Windows Server 版本是？

- **A.** Windows Server 2008
- **B.** Windows Server 2012
- **C.** Windows Server 2016
- **D.** Windows Server 2019

### 23. Windows 虚拟机直接克隆会导致所有克隆机 SID 相同，克隆前应使用什么工具"通用化"去除 SID？

- **A.** diskpart
- **B.** sysprep
- **C.** sfc
- **D.** bcdedit

### 24. virt-clone 克隆虚拟机后，新虚拟机配置文件相对源虚拟机主要发生变化的是？

- **A.** 仅 name
- **B.** name、uuid、磁盘 source、mac
- **C.** name 和 memory
- **D.** 全部配置都不同

### 25. Intel EPT 与 AMD NPT 技术属于哪一类虚拟化技术？

- **A.** IO 虚拟化
- **B.** 内存（MMU）硬件辅助虚拟化
- **C.** 网络虚拟化
- **D.** GPU 虚拟化

### 26. 采用 virtio 半虚拟化前后端驱动方式的 IO 设备（磁盘/网卡），性能大约可达物理硬件的？

- **A.** 60%
- **B.** 80%
- **C.** 95%
- **D.** 100%

### 27. 执行 virt-clone 克隆虚拟机的前提条件是？

- **A.** 虚拟机处于运行状态
- **B.** 虚拟机处于关闭状态
- **C.** 虚拟机处于暂停状态
- **D.** 没有任何要求

### 28. 检查 CPU 硬件辅助虚拟化支持时，egrep '(vmx|svm)' /proc/cpuinfo 中：Intel CPU 的标志是______，AMD CPU 的标志是______。

> 共 2 个空。

### 29. KVM 的虚拟化核心以内核模块实现，其基础模块文件名为______（配合 kvm-intel.ko / kvm-amd.ko 架构特定模块工作），加载后表现为字符设备 /dev/kvm。

> 共 1 个空。

### 30. libvirt 创建的虚拟机 XML 配置文件默认保存在______目录下（该文件原则上只能用 virsh edit 编辑）。

> 共 1 个空。

### 31. cockpit 是基于 Web 的虚拟化管理平台，其默认监听端口是______。Ubuntu 中允许 root 登录需注释 /etc/cockpit/disallowed-users 中的 root 行。

> 共 1 个空。

### 32. KVM 虚拟机的 VNC 端口默认从______开始分配；virsh domdisplay 输出 vnc://localhost:0 中的 :n 表示实际端口为 5900+n。

> 共 1 个空。

### 33. 修改虚拟机 XML 配置（如磁盘格式、网卡桥接、内存上限）时，正规做法是使用命令______编辑，避免直接 vim 修改 /etc/libvirt/qemu 下的文件。

> 共 1 个空。


## KVM面试

### 34. 【面试】什么是虚拟化？虚拟化解决的核心问题与价值是什么？

### 35. 【面试】完全虚拟化、半虚拟化、硬件辅助虚拟化三者的区别是什么？各自性能如何？

### 36. 【面试】Type-I 与 Type-II hypervisor 的区别是什么？KVM 属于哪一类？

### 37. 【面试】请描述 KVM 的基本架构，说明 kvm.ko、QEMU、libvirt 三个组件各自的职责。

### 38. 【面试】拿到一台 Linux 服务器，如何验证它是否支持并已正确启用 KVM？

### 39. 【面试】KVM 的 NAT 网络与桥接网络有什么区别？生产环境为什么推荐桥接？

### 40. 【面试】解释 libvirt 存储池（pool）与存储卷（volume）的概念及两者关系，libvirt 支持哪些后端存储？

### 41. 【面试】raw 与 qcow2 两种磁盘镜像格式如何对比？如何把 raw 转换成 qcow2？

### 42. 【面试】简述 virtio 半虚拟化 IO 的"前后端驱动"工作原理，为什么它比纯模拟设备性能好？

### 43. 【面试】什么是内存气球（balloon）技术？如何查看和调整虚拟机内存？有什么限制？

### 44. 【面试】内存虚拟化中，"影子页表"与 EPT/NPT 硬件辅助方案有什么区别？

### 45. 【面试】克隆 Windows 虚拟机前为什么要先执行 sysprep？

### 46. 【面试】在 KVM 宿主机上，"一台虚拟机"的本质是什么？libvirtd 服务停止对运行中的虚拟机有什么影响？

### 47. 【面试】硬件辅助虚拟化中 VM exit / VM entry 机制是如何工作的？
