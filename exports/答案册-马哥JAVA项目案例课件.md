# 马哥JAVA项目案例课件 —— 答案与解析

> 共 46 题，编号与《试题册-马哥JAVA项目案例课件.md》一致。


## JAVA项目案例笔试

### 1. 【若依】若依 RuoYi 共有几个版本，分别对应什么架构？

**答案**

**C**　三个版本：RuoYi(不分离的单体) / RuoYi-Vue(前后端分离) / RuoYi-Cloud(微服务)

**解析**

【马哥JAVA项目案例课件】若依官方提供三个版本：RuoYi(单体，前后端不分离) / RuoYi-Vue(前后端分离) / RuoYi-Cloud(分布式微服务)。另有技术栈更新的 RuoYi-Cloud-Vue3 版本保持同步更新。

---

### 2. 【若依】若依 RuoYi 是基于什么框架开发的？采用什么开源协议？

**答案**

**A**　Spring Boot，MIT

**解析**

【马哥JAVA项目案例课件】若依是基于 Spring Boot 开发的轻量级 Java 快速开发框架，采用 MIT 开源协议(GVP 40.4K Stars)。它是一套全部开源的快速开发平台，免费给个人和企业使用。

---

### 3. 【若依】Maven 打包 Java 项目、跳过测试类的标准命令是？

**答案**

**C**　mvn clean package -Dmaven.test.skip=true

**解析**

【马哥JAVA项目案例课件】构建命令为 mvn clean package -Dmaven.test.skip=true。clean 清理旧产物、package 打包、-Dmaven.test.skip=true 跳过测试。多模块项目会依次对各模块执行，最终在 ruoyi-admin/target 下产出可执行的 ruoyi-admin.jar。

---

### 4. 【若依】若依单体项目构建后，可直接运行的可执行 jar 包是？

**答案**

**C**　ruoyi-admin.jar

**解析**

【马哥JAVA项目案例课件】单体项目最终产物是 ruoyi-admin/target/ruoyi-admin.jar(约 74M)，是 Spring Boot 可执行 jar，用 java -jar 直接运行。其余 ruoyi-common/ruoyi-system/ruoyi-framework/ruoyi-quartz/ruoyi-generator 是内部模块 jar，不单独运行。

---

### 5. 【容器化】若依单体项目 Dockerfile 中使用的 Java 基础镜像是？

**答案**

**B**　openjdk:8u212-jre-alpine3.9

**解析**

【马哥JAVA项目案例课件】课件 Dockerfile 使用的运行基础镜像是 openjdk:8u212-jre-alpine3.9(基于 Alpine 的 JRE 镜像，体积小)。Alpine 版 JDK 镜像常用于减小体积。

---

### 6. 【容器化】Java 应用镜像的 Dockerfile 中，为什么要安装字体包 ttf-dejavu 和 fontconfig？

**答案**

**B**　否则应用无法生成/显示图形验证码

**解析**

【马哥JAVA项目案例课件】课件明确注释『安装依赖的字体，否则无法显示验证码』。Alpine 基础镜像默认不含字体，若依登录页需要图形验证码，缺少字体将无法渲染，因此要 apk add ttf-dejavu fontconfig。

---

### 7. 【容器化】Java 应用采用多阶段构建(multi-stage)相比单阶段构建的主要好处是？

**答案**

**B**　宿主机无需安装 JDK 与 Maven，仅需 Docker；且运行镜像不含编译工具链，体积更小

**解析**

【马哥JAVA项目案例课件】多阶段构建：第一个阶段用 maven 镜像在容器内编译打包，第二个阶段只把产物 COPY --from=build 到运行镜像。好处是宿主机无需安装 Java 和 Maven(只需 Docker)、构建环境一致稳定，且最终镜像不含源码与构建工具，体积更小。

---

### 8. 【容器化】多阶段构建中把编译阶段产物复制到运行阶段，使用什么指令？

**答案**

**A**　COPY --from=build

**解析**

【马哥JAVA项目案例课件】用 COPY --from=build /RuoYi/ruoyi-admin/target/*.jar ${APP_PATH}/${APP_NAME}.jar，其中 --from=build 引用上一阶段(as build 命名)的文件系统。

---

### 9. 【容器化】将镜像推送到自建的 HTTP Harbor 仓库前，Docker 需要做什么配置？

**答案**

**B**　把 Harbor 加入 insecure-registries(或在 dockerd 加 --insecure-registry)，并 docker login 登录

**解析**

【马哥JAVA项目案例课件】私有 Harbor 若未配 HTTPS，需把域名加入 /etc/docker/daemon.json 的 insecure-registries，或在 dockerd 启动参数加 --insecure-registry harbor.wang.org，然后重启 Docker；推送前还需 docker login 认证。可用 docker info 查看 Insecure Registries 是否生效。

---

### 10. 【容器化】启动容器时使用 --add-host mysql.wang.org:10.0.0.100 的目的是？

**答案**

**B**　在容器内 /etc/hosts 添加主机名到 IP 的静态解析

**解析**

【马哥JAVA项目案例课件】--add-host 会在容器内的 /etc/hosts 中写入一条主机名到 IP 的映射。当 Docker 宿主机没有配置 DNS 域名解析时，用它在容器内解析 mysql.wang.org/redis.wang.org 这类名称，替代 DNS。

---

### 11. 【前后端分离】若依 RuoYi-Vue 后端服务默认监听的端口是？

**答案**

**B**　8080

**解析**

【马哥JAVA项目案例课件】RuoYi-Vue 后端 Spring Boot 应用默认端口 8080(可在 application.yml 中通过 server.port 修改，或用 --server.port=8888 指定)；前端 Vue 开发服务器默认 80 端口。

---

### 12. 【前后端分离】前端 RuoYi-Vue 构建生产环境的命令是？

**答案**

**B**　npm run build:prod

**解析**

【马哥JAVA项目案例课件】前端构建：开发用 npm run dev；构建测试环境 npm run build:stage；构建生产环境 npm run build:prod，产物输出到 dist 目录(含 index.html、static、html 等)。

---

### 13. 【前后端分离】npm 安装依赖慢时，课件推荐使用的加速源是？

**答案**

**B**　registry.npmmirror.com

**解析**

【马哥JAVA项目案例课件】用 npm install --registry=https://registry.npmmirror.com(淘宝 npm 镜像)。课件特别提醒不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。

---

### 14. 【前后端分离】在 Ubuntu 24.04 上用较新 Node 构建若依前端时，报错 error:0308010C:digital envelope routines::unsupported，解决办法是？

**答案**

**B**　设置环境变量 export NODE_OPTIONS=--openssl-legacy-provider 后重新构建

**解析**

【马哥JAVA项目案例课件】该错误源于新版 Node(17+)使用 OpenSSL 3，而旧版 webpack 仍用被弃用的哈希算法。临时解决：export NODE_OPTIONS=--openssl-legacy-provider 后重新执行 npm run build:prod。课件中 Ubuntu 24.04(默认不带该兼容)会报此错，而 Ubuntu 22.04(较旧 Node)不会。

---

### 15. 【前后端分离】构建前端镜像时采用的两阶段基础镜像是？

**答案**

**A**　node:16.20-bullseye-slim 和 nginx:1.20.0

**解析**

【马哥JAVA项目案例课件】前端多阶段构建：build 阶段用 node 镜像(如 node:16.20-bullseye-slim)执行 npm install 与 npm run build:prod，运行阶段用 nginx:1.20.0，并 COPY --from=build /vue/dist /usr/share/nginx/html 把静态文件放入 nginx 站点目录。

---

### 16. 【前后端分离】nginx 配置中 location /prod-api/ 的作用是？

**答案**

**B**　反向代理到后端 API(如 proxy_pass http://后端IP:8080/)

**解析**

【马哥JAVA项目案例课件】location /prod-api/ 把前端发往 /prod-api/ 的请求反向代理到后端(如 http://localhost:8080/)，并设置 Host、X-Real-IP、X-Forwarded-For 等头。前端页面自身用 location / 配合 try_files $uri $uri/ /index.html，支持 Vue 单页应用路由。

---

### 17. 【前后端分离】nginx 反向代理时设置 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for 的作用是？

**答案**

**B**　把客户端真实 IP 透传给后端，便于后端记录真实来源

**解析**

【马哥JAVA项目案例课件】经过反向代理后，后端看到的源 IP 会变成代理服务器 IP。通过 X-Real-IP / X-Forwarded-For 把真实客户端 IP 透传给后端，后端才能记录真实访问来源(日志、限流、黑名单等)。

---

### 18. 【微服务】RuoYi-Cloud 微服务版的注册中心与配置中心选型是？

**答案**

**B**　Nacos

**解析**

【马哥JAVA项目案例课件】RuoYi-Cloud 后端采用 Spring Boot、Spring Cloud & Alibaba，注册中心和配置中心均选型 Nacos，权限认证使用 Redis。Nacos 默认端口 8848(另有 9848/9849 用于 gRPC/集群)。

---

### 19. 【微服务】RuoYi-Cloud 的流量控制框架和分布式事务组件分别选型为？

**答案**

**B**　Sentinel 和 Seata

**解析**

【马哥JAVA项目案例课件】流量控制框架选型 Sentinel，分布式事务选型 Seata(RuoYi-Cloud 中有 ruoyi-common-seata 模块)。

---

### 20. 【微服务】RuoYi-Cloud 中 ruoyi-gateway 网关模块监听的端口是？

**答案**

**B**　8080

**解析**

【马哥JAVA项目案例课件】模块端口：ruoyi-ui 前端 80、ruoyi-gateway 网关 8080、ruoyi-auth 认证中心 9200、ruoyi-modules-system 9201、gen 9202、job 9203、ruoyi-file 9300、ruoyi-visual-monitor 监控中心 9100(监控台默认 ruoyi/123456)。

---

### 21. 【微服务】RuoYi-Cloud 中负责认证的模块及其端口是？

**答案**

**B**　ruoyi-auth 9200

**解析**

【马哥JAVA项目案例课件】ruoyi-auth 是认证中心模块，端口 9200。它配合 Redis(权限认证)与 Nacos 完成登录鉴权、令牌签发校验等工作。

---

### 22. 【微服务】用 docker-compose 部署 RuoYi-Cloud 时，默认创建的自定义网络网段是？

**答案**

**B**　172.18.0.0/16

**解析**

【马哥JAVA项目案例课件】docker-compose 默认创建自定义网络并使用 172.18.0.0/16 网段(docker network ls 中可见 docker_default)。各服务通过服务名在同一自定义网络内互相解析通信。

---

### 23. 【微服务】RuoYi-Cloud 的 deploy.sh 脚本支持的参数有？

**答案**

**B**　port / base / modules / stop / rm

**解析**

【马哥JAVA项目案例课件】deploy.sh 用法为 sh deploy.sh [port|base|modules|stop|rm]：port 开放防火墙端口、base 启动基础环境(ruoyi-mysql/ruoyi-redis/ruoyi-nacos，必须)、modules 启动程序模块(nginx/gateway/auth/modules-system/monitor，必须)、stop 停止、rm 删除。

---

### 24. 【微服务】docker-compose 部署 RuoYi-Cloud 时，基础服务与应用模块的启动顺序体现了什么机制？

**答案**

**B**　depends_on 依赖关系，保证被依赖服务先启动

**解析**

【马哥JAVA项目案例课件】编排中通过 depends_on 声明依赖(如 nginx 依赖 gateway、gateway 依赖 redis)，docker-compose 会按依赖顺序启动容器，避免上层服务启动时依赖尚未就绪。实践中还常配合 healthcheck 的 service_healthy 条件。

---

### 25. 【微服务】RuoYi-Cloud 中 ruoyi-modules-file 文件服务默认暴露的端口是？

**答案**

**B**　9300

**解析**

【马哥JAVA项目案例课件】ruoyi-file 文件服务端口 9300，并挂载 ./ruoyi/uploadPath:/home/ruoyi/uploadPath 用于文件上传下载的持久化。

---

### 26. 【综合】关于单体、前后端分离、微服务三种形态的部署，下列说法正确的是？

**答案**

**A**　单体只需一个 jar，最不占资源但可扩展性最差；微服务模块多、占用资源最多但可独立扩展

**解析**

【马哥JAVA项目案例课件】单体：一个 ruoyi-admin.jar + MySQL(Redis 可选)，最省资源、部署最简单，但扩展性差(整体扩容)。前后端分离：后端 jar + 前端 dist + nginx + MySQL/Redis，前后端可独立部署扩展。微服务 RuoYi-Cloud：nacos+mysql+redis+gateway+auth+system+gen+job+file+monitor+nginx 十几个容器，建议内存 8G 以上(实测约用 4.8G)，资源占用最多但每个模块可独立扩展。

---

### 27. 【综合】若依前后端分离项目默认的管理员账号和密码是？

**答案**

**B**　admin / admin123

**解析**

【马哥JAVA项目案例课件】若依 RuoYi / RuoYi-Vue / RuoYi-Cloud 登录默认用户名 admin、密码 admin123。注意监控中心(ruoyi-visual-monitor)的默认账号是 ruoyi/123456，与主应用不同；而 JumpServer 的默认是 admin/admin(v4.0.0 后 ChangeMe)，三者不要混淆。

---

### 28. 【综合】在若依项目中将容器与外部 DNS 名称解耦，下列哪种做法是正确的？

**答案**

**B**　给宿主机配置 DNS/域名解析，或运行时用 --add-host 给容器加 hosts 解析

**解析**

【马哥JAVA项目案例课件】推荐通过 DNS(如 bind9)在宿主机层面提供 mysql.wang.org、redis.wang.org 等域名解析，这样应用配置里写域名即可；若宿主机没有 DNS，则启动容器时用 --add-host 添加静态解析。注意课件提示：若 DNS 服务器就是本机，网卡要指向本机 IP 而非 127.0.0.1，否则容器拿不到宿主机 DNS 配置。

---

### 29. 若依 RuoYi 是基于 ______ 框架开发的轻量级 Java 快速开发框架，其构建工具是 ______。

**答案**

- 第 1 空：Spring Boot / SpringBoot / spring boot
- 第 2 空：Maven / maven

**解析**

【马哥JAVA项目案例课件】RuoYi 基于 Spring Boot(课件版本 2.5.15、Spring 5.3.27)，用 Maven 构建，核心命令 mvn clean package -Dmaven.test.skip=true。

---

### 30. RuoYi-Cloud 的注册中心与配置中心选型是 ______，默认端口为 ______。

**答案**

- 第 1 空：Nacos / nacos
- 第 2 空：8848

**解析**

【马哥JAVA项目案例课件】RuoYi-Cloud 注册中心与配置中心均选 Nacos，默认端口 8848(另有 9848/9849)。

---

### 31. RuoYi-Cloud 的流量控制框架选型 ______，分布式事务选型 ______。

**答案**

- 第 1 空：Sentinel / sentinel
- 第 2 空：Seata / seata

**解析**

【马哥JAVA项目案例课件】流量控制选 Sentinel，分布式事务选 Seata(RuoYi-Cloud 中有 ruoyi-common-seata 模块)。

---

### 32. 若依微服务项目中，网关 ruoyi-gateway 端口为 ______，认证中心 ruoyi-auth 端口为 ______。

**答案**

- 第 1 空：8080
- 第 2 空：9200

**解析**

【马哥JAVA项目案例课件】模块端口：gateway 8080、auth 9200、modules-system 9201、gen 9202、job 9203、file 9300、visual-monitor 9100、ui 80。

---

### 33. 若依前端构建生产环境后，静态文件输出到 ______ 目录。

**答案**

- 第 1 空：dist

**解析**

【马哥JAVA项目案例课件】npm run build:prod 构建后产物输出到 ruoyi-ui/dist 目录，再复制进 nginx 站点目录或打包进 nginx 镜像。

---

### 34. 在 Ubuntu 24.04 上用新版 Node 构建若依前端报 OpenSSL 相关错误时，设置环境变量 ______ 可临时解决。

**答案**

- 第 1 空：NODE_OPTIONS=--openssl-legacy-provider / --openssl-legacy-provider / NODE_OPTIONS / openssl-legacy-provider

**解析**

【马哥JAVA项目案例课件】export NODE_OPTIONS=--openssl-legacy-provider 后重新构建即可绕过新版 Node(OpenSSL 3)与旧 webpack 的哈希算法不兼容问题。

---


## JAVA项目案例面试

### 35. 若依 RuoYi 的三个版本（单体 / 前后端分离 / 微服务）分别是什么？如何选型？

**答案**

① RuoYi(单体)：前后端不分离，基于 Spring Boot 的轻量级快速开发框架。适合中小型项目、内部管理后台、快速交付，部署最简单(一个 jar + MySQL)。
② RuoYi-Vue(前后端分离)：后端 Spring Boot 提供 REST API，前端 Vue + Element UI 独立工程经 nginx 部署。适合需要前后端独立开发/独立部署扩展的 Web 项目。
③ RuoYi-Cloud(微服务)：基于 Spring Cloud & Alibaba 的分布式微服务架构，含 gateway、auth、modules(system/gen/job/file)、visual-monitor 等模块，使用 Nacos、Sentinel、Seata。适合大型、需要按模块独立扩展与治理的系统。
另有 RuoYi-Cloud-Vue3(技术栈升级为 Vue3 + Element Plus + Vite)保持同步更新。
三者源码不同、部署形态与资源占用依次递增：单体最省资源、微服务占用最多(建议 8G 以上内存)。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 36. Java 单体应用的传统部署流程是怎样的？

**答案**

① 环境准备：装 JDK、Maven、MySQL(若依单体还需考虑 Redis)。
② 准备数据库：建库(如 ry)、建用户并授权，导入 sql/ 下的建表脚本(ry_20240112.sql)和 quartz.sql。
③ 修改配置：在 ruoyi-admin/src/main/resources/application-druid.yml 中配置数据源 url、用户名、密码。
④ 构建：mvn clean package -Dmaven.test.skip=true，产物 ruoyi-admin/target/ruoyi-admin.jar。
⑤ 运行：java -jar ruoyi-admin.jar(可用 --server.port 指定端口)，默认端口 80/8080。
⑥ 访问验证：浏览器打开，默认账号 admin/admin123。
【衍生】用 ry.sh 脚本可带上 JVM 参数启动，如 -Xms512m -Xmx1024m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError 等。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 37. Java 应用容器化有哪两种构建方式？各有什么优劣？

**答案**

方式一：宿主机编译 + 单阶段镜像
先在宿主机上用 Maven 编译出 jar，Dockerfile 里 COPY ./ruoyi-admin/target/*.jar 进镜像。
优点：镜像构建快(编译复用宿主机缓存)。缺点：强依赖宿主机的 JDK 与 Maven 环境，环境不一致时容易出问题；构建产物与运行镜像耦合。
方式二：多阶段构建
第一个阶段用 maven 镜像(如 maven:3.9.9-eclipse-temurin-8-alpine as build)在容器内 COPY 源码并编译，第二个阶段用精简 JRE 镜像，只 COPY --from=build 把 jar 拷进来。
优点：宿主机只需 Docker(无需装 JDK/Maven)，构建环境一致、稳定；最终镜像不含源码与构建工具，体积更小。缺点：每次构建都要在容器内下载依赖，构建较慢(可缓存缓解)。
课件结论：多阶段构建『不依赖宿主机的 JAVA 和 Maven 环境，比较稳定』。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 38. 为什么给 Java 应用的容器镜像要安装字体包？

**答案**

Alpine 等精简基础镜像默认不包含任何字体。若依登录页需要生成图形验证码，验证码的渲染依赖字体库；缺少字体会导致验证码无法正常显示(或直接报错)，影响登录。
因此 Dockerfile 中在装系统依赖时执行：apk add --no-cache ttf-dejavu fontconfig(并把 apk 源换成阿里云镜像加速)。
【衍生】这类『运行期隐形依赖』是容器化的常见坑：编译能过、启动也正常，但某个功能(验证码、PDF 导出、图形报表)因缺字体/时区/字符集而异常。排查时先想到基础镜像是否过于精简。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 39. 前后端分离项目中 nginx 承担什么角色？关键配置如何写？

**答案**

角色：① 托管前端静态资源(Vue 打包后的 dist)；② 作为后端 API 的反向代理，解决跨域并统一入口；③ 支持 SPA 前端路由(history 模式)。
关键配置示例：
server {
  listen 80; server_name ryvue.wang.org;
  location / { root /data/ryvue; try_files $uri $uri/ /index.html; index index.html; }
  location /prod-api/ {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
要点：try_files ... /index.html 让刷新子路由不 404；/prod-api/ 前缀把 API 请求转给后端 8080；透传真实 IP 头便于后端记录与限流。改完用 nginx -t 检查再 nginx -s reload。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 40. 前端在 Ubuntu 24.04 上构建报 error:0308010C 是什么原因？怎么解决？

**答案**

原因：Node 17+ 内置 OpenSSL 3，禁用了一些旧的哈希算法(MD4)，而老版本 webpack / compression-webpack-plugin 仍在调用这些算法，于是报 error:0308010C:digital envelope routines::unsupported。Ubuntu 22.04 自带的 Node 较旧(如 v12)不受影响，因此同一项目在 22.04 能构建、24.04 报错。
解决办法：
① 临时(推荐)：export NODE_OPTIONS=--openssl-legacy-provider 后重新 npm run build:prod；
② 长期：升级 webpack 及插件到支持 OpenSSL 3 的版本；
③ 或用 nvm 切到旧版 Node。
【衍生】容器化构建前端时，可直接在 Dockerfile 的 build 阶段设置该环境变量，避免依赖宿主机 Node 版本。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 41. 请描述 RuoYi-Cloud 微服务的模块组成与端口规划。

**答案**

模块与端口：
① ruoyi-ui 前端 [80]；
② ruoyi-gateway 网关 [8080]；
③ ruoyi-auth 认证中心 [9200]；
④ ruoyi-api / ruoyi-api-system 接口模块；
⑤ ruoyi-common 通用模块(core / datascope / datasource / log / redis / seata / security / swagger)；
⑥ ruoyi-modules 业务模块：system [9201]、gen 代码生成 [9202]、job 定时任务 [9203]、file 文件服务 [9300]；
⑦ ruoyi-visual-monitor 监控中心 [9100]；
⑧ 中间件：Nacos [8848/9848/9849]、MySQL [3306]、Redis [6379]。
关系：前端 → nginx → gateway → 各微服务；gateway 依赖 redis；auth 依赖 redis；modules 依赖 mysql/redis；monitor 用于监控。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 42. RuoYi-Cloud 的技术选型是怎样的？各解决什么问题？

**答案**

① Spring Boot + Spring Cloud & Alibaba：微服务基础框架。
② Nacos：注册中心 + 配置中心，解决服务发现与集中配置(默认 8848 端口)。
③ Redis：权限认证(登录令牌/token)与缓存。
④ Sentinel：流量控制/熔断限流，保障服务稳定性。
⑤ Seata：分布式事务，保证跨服务数据一致性。
⑥ Vue + Element UI：前端。
⑦ 可选 RuoYi-Cloud-Vue3(Vue3 + Element Plus + Vite)版本。
【衍生】这套组合是『Spring Cloud Alibaba』的经典落地：注册配置一体化(Nacos)、网关(Gateway)、认证(OAuth/JWT+Redis)、限流(Sentinel)、事务(Seata)。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 43. 用 docker-compose 部署 RuoYi-Cloud 的完整流程和启动顺序是怎样的？

**答案**

流程：
① 装依赖：git、maven、npm、docker-compose、python3-pip，建议内存 8G 以上。
② 克隆源码并构建后端：mvn clean package -Dmaven.test.skip=true，产出各模块 jar。
③ 构建前端：npm install --registry=https://registry.npmmirror.com，npm run build:prod，产出 dist(24.04 需 NODE_OPTIONS=--openssl-legacy-provider)。
④ 准备编排文件与包：进入 docker/ 目录，执行 move.sh 把 sql、前端 dist、各模块 jar 分别挪到 mysql/nacos/nginx/ruoyi 对应目录；编排文件 docker-compose.yml 定义 nacos、mysql、redis、nginx、gateway、auth、modules-system/gen/job/file、visual-monitor。
⑤ 启动基础服务：sh deploy.sh base(即 docker-compose up -d ruoyi-mysql ruoyi-redis ruoyi-nacos)。
⑥ 启动应用模块：sh deploy.sh modules(nginx/gateway/auth/modules-system/monitor)。
⑦ 验证：docker-compose ps 看容器状态；访问 http://ruoyi.wang.org(admin/admin123)、Nacos :8848/nacos、监控台 :9100(ruoyi/123456)。
启动顺序依据 depends_on：mysql/redis/nacos → gateway/auth/system 等。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 44. 容器之间如何实现相互通信？RuoYi-Cloud 编排是怎么做的？

**答案**

原理：docker-compose 会创建一个自定义 bridge 网络(默认 172.18.0.0/16)，同一网络内的容器自带 DNS，可直接用『服务名/容器名』互相解析，无需再用 --link。
RuoYi-Cloud 的做法：
① 所有服务声明在同一个 networks(net)下；
② 用服务名作为地址，例如 jumpserver 配置里 DB_HOST=mysql、REDIS_HOST=redis；nginx 里 proxy_pass http://ruoyi-gateway:8080；
③ 通过 depends_on 与 links 声明依赖关系，保证启动顺序；
④ 需要跨主机时，则需 overlay 网络或把端口映射到宿主机后按宿主机 IP 访问。
【衍生】这也是自定义网络优于默认 bridge 的关键点——默认 bridge 不支持自动 DNS，容器互联要写 IP 或用 --link。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 45. 如何把一个自建 Java 应用的镜像推送到私有 Harbor 仓库并部署？

**答案**

① 配置信任：在 /etc/docker/daemon.json 加 "insecure-registries": ["harbor.wang.org"]，或给 dockerd 加 --insecure-registry，然后 systemctl restart docker；用 docker info 确认 Insecure Registries 已生效。
② 构建镜像：docker build -t harbor.wang.org/example/ruoyi-vue:v0.1 .
③ 登录：docker login harbor.wang.org -u wang -p wang@123。
④ (可选)打标签：docker tag ruoyi-vue:v1.0 harbor.wang.org/example/ruoyi-vue:v0.1。
⑤ 推送：docker push harbor.wang.org/example/ruoyi-vue:v0.1。
⑥ 部署：在目标主机 docker pull 后 docker run -d --name ruoyi-vue -p 82:8080 ...。若目标机无 DNS，加 --add-host mysql.wang.org:10.0.0.100 --add-host redis.wang.org:10.0.0.100。
命名规范：Harbor 镜像地址形如 <harbor域名>/<项目名>/<镜像名>:<标签>。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---

### 46. 从单体到前后端分离再到微服务，这个演进过程解决了什么问题？

**答案**

单体(RuoYi)：所有功能打成一个 jar，部署简单、开发快；但一处改动就要整体重新构建部署，无法按功能独立扩容，技术栈绑定，团队协作易冲突。
前后端分离(RuoYi-Vue)：前端变成独立 Vue 工程经 nginx 部署，后端只提供 REST API。带来的好处：前后端可并行开发、独立发布；前端静态资源可由 nginx/CDN 承载、水平扩展；后端接口可被多端(Web/App/小程序)复用。
微服务(RuoYi-Cloud)：把系统拆成 gateway、auth、system、gen、job、file 等独立服务，配合 Nacos(注册/配置)、Sentinel(限流)、Seata(分布式事务)、Redis(认证缓存)，实现按模块独立开发、部署、扩容与治理；代价是组件多、运维复杂、资源占用高(建议 8G 内存以上)。
演进本质：从『一个进程扛所有』到『按业务边界拆分 + 独立治理』，用更高的复杂度换取可扩展性、可维护性与团队协作效率。
【衍生】容器化为这种演进提供了底座——每个模块一个镜像、docker-compose 一键编排，使多服务的部署与扩缩容变得可控。

**解析**

【马哥JAVA项目案例课件】面试简答题，参考答案见答案要点。

---
