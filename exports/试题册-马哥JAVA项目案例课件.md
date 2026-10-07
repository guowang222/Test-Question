# 马哥JAVA项目案例课件 —— 试题册

> 共 46 题。答案与解析见《答案册-马哥JAVA项目案例课件.md》。


## JAVA项目案例笔试

### 1. 【若依】若依 RuoYi 共有几个版本，分别对应什么架构？

- **A.** 一个版本，仅单体
- **B.** 两个版本：RuoYi 和 RuoYi-Vue
- **C.** 三个版本：RuoYi(不分离的单体) / RuoYi-Vue(前后端分离) / RuoYi-Cloud(微服务)
- **D.** 四个版本，含移动端和小程序版

### 2. 【若依】若依 RuoYi 是基于什么框架开发的？采用什么开源协议？

- **A.** Spring Boot，MIT
- **B.** Spring Boot，GPL v2.0
- **C.** Django，MIT
- **D.** Spring Cloud，Apache 2.0

### 3. 【若依】Maven 打包 Java 项目、跳过测试类的标准命令是？

- **A.** mvn package
- **B.** mvn clean install
- **C.** mvn clean package -Dmaven.test.skip=true
- **D.** mvn compile

### 4. 【若依】若依单体项目构建后，可直接运行的可执行 jar 包是？

- **A.** ruoyi-common.jar
- **B.** ruoyi-system.jar
- **C.** ruoyi-admin.jar
- **D.** ruoyi-generator.jar

### 5. 【容器化】若依单体项目 Dockerfile 中使用的 Java 基础镜像是？

- **A.** openjdk:11.0.16-jre-slim
- **B.** openjdk:8u212-jre-alpine3.9
- **C.** maven:3.9.9-alpine
- **D.** nginx:1.20.0

### 6. 【容器化】Java 应用镜像的 Dockerfile 中，为什么要安装字体包 ttf-dejavu 和 fontconfig？

- **A.** 为了支持中文日志输出
- **B.** 否则应用无法生成/显示图形验证码
- **C.** 为了减小镜像体积
- **D.** 为了开启 JVM 调试

### 7. 【容器化】Java 应用采用多阶段构建(multi-stage)相比单阶段构建的主要好处是？

- **A.** 可以少写 Dockerfile
- **B.** 宿主机无需安装 JDK 与 Maven，仅需 Docker；且运行镜像不含编译工具链，体积更小
- **C.** 构建速度更快（因为不需要编译）
- **D.** 可以直接运行源码

### 8. 【容器化】多阶段构建中把编译阶段产物复制到运行阶段，使用什么指令？

- **A.** COPY --from=build
- **B.** ADD --from=build
- **C.** MOVE --from=build
- **D.** RUN cp --from=build

### 9. 【容器化】将镜像推送到自建的 HTTP Harbor 仓库前，Docker 需要做什么配置？

- **A.** 配置 registry-mirrors 加速
- **B.** 把 Harbor 加入 insecure-registries(或在 dockerd 加 --insecure-registry)，并 docker login 登录
- **C.** 修改 Docker 默认网桥网段
- **D.** 开启 SELinux

### 10. 【容器化】启动容器时使用 --add-host mysql.wang.org:10.0.0.100 的目的是？

- **A.** 给容器增加一个端口映射
- **B.** 在容器内 /etc/hosts 添加主机名到 IP 的静态解析
- **C.** 把宿主机目录挂载进容器
- **D.** 给容器指定静态 IP

### 11. 【前后端分离】若依 RuoYi-Vue 后端服务默认监听的端口是？

- **A.** 80
- **B.** 8080
- **C.** 9200
- **D.** 3306

### 12. 【前后端分离】前端 RuoYi-Vue 构建生产环境的命令是？

- **A.** npm run dev
- **B.** npm run build:prod
- **C.** mvn package
- **D.** npm start

### 13. 【前后端分离】npm 安装依赖慢时，课件推荐使用的加速源是？

- **A.** registry.npmjs.org
- **B.** registry.npmmirror.com
- **C.** pypi.aliyun.com
- **D.** maven.aliyun.com

### 14. 【前后端分离】在 Ubuntu 24.04 上用较新 Node 构建若依前端时，报错 error:0308010C:digital envelope routines::unsupported，解决办法是？

- **A.** 升级 Node 到最新版
- **B.** 设置环境变量 export NODE_OPTIONS=--openssl-legacy-provider 后重新构建
- **C.** 改用 npm install -g cnpm
- **D.** 删除 node_modules 重装

### 15. 【前后端分离】构建前端镜像时采用的两阶段基础镜像是？

- **A.** node:16.20-bullseye-slim 和 nginx:1.20.0
- **B.** maven 和 openjdk
- **C.** alpine 和 busybox
- **D.** python 和 nginx

### 16. 【前后端分离】nginx 配置中 location /prod-api/ 的作用是？

- **A.** 提供静态文件下载
- **B.** 反向代理到后端 API(如 proxy_pass http://后端IP:8080/)
- **C.** 重定向到登录页
- **D.** 开启 gzip 压缩

### 17. 【前后端分离】nginx 反向代理时设置 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for 的作用是？

- **A.** 压缩响应内容
- **B.** 把客户端真实 IP 透传给后端，便于后端记录真实来源
- **C.** 限制并发连接数
- **D.** 缓存后端响应

### 18. 【微服务】RuoYi-Cloud 微服务版的注册中心与配置中心选型是？

- **A.** Eureka + Config
- **B.** Nacos
- **C.** Consul + Vault
- **D.** Zookeeper + Apollo

### 19. 【微服务】RuoYi-Cloud 的流量控制框架和分布式事务组件分别选型为？

- **A.** Hystrix 和 TCC
- **B.** Sentinel 和 Seata
- **C.** Resilience4j 和 Atomikos
- **D.** Envoy 和 Saga

### 20. 【微服务】RuoYi-Cloud 中 ruoyi-gateway 网关模块监听的端口是？

- **A.** 80
- **B.** 8080
- **C.** 9200
- **D.** 9100

### 21. 【微服务】RuoYi-Cloud 中负责认证的模块及其端口是？

- **A.** ruoyi-gateway 8080
- **B.** ruoyi-auth 9200
- **C.** ruoyi-modules-system 9201
- **D.** ruoyi-visual-monitor 9100

### 22. 【微服务】用 docker-compose 部署 RuoYi-Cloud 时，默认创建的自定义网络网段是？

- **A.** 172.17.0.0/16
- **B.** 172.18.0.0/16
- **C.** 10.88.0.0/16
- **D.** 192.168.0.0/16

### 23. 【微服务】RuoYi-Cloud 的 deploy.sh 脚本支持的参数有？

- **A.** start / stop / restart
- **B.** port / base / modules / stop / rm
- **C.** up / down / build
- **D.** init / run / clean

### 24. 【微服务】docker-compose 部署 RuoYi-Cloud 时，基础服务与应用模块的启动顺序体现了什么机制？

- **A.** 端口映射机制
- **B.** depends_on 依赖关系，保证被依赖服务先启动
- **C.** 镜像分层机制
- **D.** 数据卷机制

### 25. 【微服务】RuoYi-Cloud 中 ruoyi-modules-file 文件服务默认暴露的端口是？

- **A.** 9201
- **B.** 9300
- **C.** 9100
- **D.** 8080

### 26. 【综合】关于单体、前后端分离、微服务三种形态的部署，下列说法正确的是？

- **A.** 单体只需一个 jar，最不占资源但可扩展性最差；微服务模块多、占用资源最多但可独立扩展
- **B.** 三种形态的部署难度和资源占用完全一样
- **C.** 微服务比单体占用资源更少
- **D.** 前后端分离不需要 nginx

### 27. 【综合】若依前后端分离项目默认的管理员账号和密码是？

- **A.** admin / admin
- **B.** admin / admin123
- **C.** ruoyi / 123456
- **D.** root / admin123

### 28. 【综合】在若依项目中将容器与外部 DNS 名称解耦，下列哪种做法是正确的？

- **A.** 把容器 IP 写死到配置文件里
- **B.** 给宿主机配置 DNS/域名解析，或运行时用 --add-host 给容器加 hosts 解析
- **C.** 在容器里手动编辑 /etc/resolv.conf 但不做持久化
- **D.** 关闭容器网络

### 29. 若依 RuoYi 是基于 ______ 框架开发的轻量级 Java 快速开发框架，其构建工具是 ______。

> 共 2 个空。

### 30. RuoYi-Cloud 的注册中心与配置中心选型是 ______，默认端口为 ______。

> 共 2 个空。

### 31. RuoYi-Cloud 的流量控制框架选型 ______，分布式事务选型 ______。

> 共 2 个空。

### 32. 若依微服务项目中，网关 ruoyi-gateway 端口为 ______，认证中心 ruoyi-auth 端口为 ______。

> 共 2 个空。

### 33. 若依前端构建生产环境后，静态文件输出到 ______ 目录。

> 共 1 个空。

### 34. 在 Ubuntu 24.04 上用新版 Node 构建若依前端报 OpenSSL 相关错误时，设置环境变量 ______ 可临时解决。

> 共 1 个空。


## JAVA项目案例面试

### 35. 若依 RuoYi 的三个版本（单体 / 前后端分离 / 微服务）分别是什么？如何选型？

### 36. Java 单体应用的传统部署流程是怎样的？

### 37. Java 应用容器化有哪两种构建方式？各有什么优劣？

### 38. 为什么给 Java 应用的容器镜像要安装字体包？

### 39. 前后端分离项目中 nginx 承担什么角色？关键配置如何写？

### 40. 前端在 Ubuntu 24.04 上构建报 error:0308010C 是什么原因？怎么解决？

### 41. 请描述 RuoYi-Cloud 微服务的模块组成与端口规划。

### 42. RuoYi-Cloud 的技术选型是怎样的？各解决什么问题？

### 43. 用 docker-compose 部署 RuoYi-Cloud 的完整流程和启动顺序是怎样的？

### 44. 容器之间如何实现相互通信？RuoYi-Cloud 编排是怎么做的？

### 45. 如何把一个自建 Java 应用的镜像推送到私有 Harbor 仓库并部署？

### 46. 从单体到前后端分离再到微服务，这个演进过程解决了什么问题？
