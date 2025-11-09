# Cloud Playground Backend

Spring Boot后端服务，提供主题管理、练习执行和Kubernetes资源管理功能。

## 前置要求

- Java 17 或更高版本
- Maven 3.6+
- Docker Desktop (启用Kubernetes)
- kubectl 已配置并连接到集群

## 快速开始

### 1. 编译项目

```bash
cd backend
mvn clean install
```

### 2. 运行应用

```bash
mvn spring-boot:run
```

应用将在 `http://localhost:8080/api` 启动

### 3. 验证运行状态

访问健康检查端点：
```bash
curl http://localhost:8080/api/health
```

应该返回类似以下内容：
```json
{
  "status": "UP",
  "application": "cloud-playground-backend",
  "timestamp": "2025-11-09T19:00:00",
  "kubernetesNamespace": "cloud-playground"
}
```

### 4. 访问H2控制台

H2数据库控制台可通过以下地址访问：
```
http://localhost:8080/api/h2-console
```

连接信息：
- JDBC URL: `jdbc:h2:file:./data/cloudplayground`
- 用户名: `sa`
- 密码: (留空)

## 项目结构

```
backend/
├── src/main/java/com/cloudplayground/
│   ├── CloudPlaygroundApplication.java  # 主应用类
│   ├── config/                          # 配置类
│   │   ├── KubernetesConfig.java       # K8s客户端配置
│   │   └── WebConfig.java              # Web配置（CORS等）
│   ├── controller/                      # REST控制器
│   │   └── HealthController.java       # 健康检查
│   ├── model/                           # 数据模型
│   │   ├── entity/                     # JPA实体类
│   │   ├── dto/                        # 数据传输对象
│   │   └── enums/                      # 枚举类
│   ├── repository/                      # 数据访问层
│   ├── service/                         # 业务逻辑层
│   ├── kubernetes/                      # K8s客户端封装
│   └── executor/                        # 代码执行引擎
├── src/main/resources/
│   ├── application.yml                  # 应用配置
│   ├── schema.sql                       # 数据库Schema
│   └── themes/                          # 主题配置文件
└── pom.xml                              # Maven配置
```

## 配置说明

主要配置项在 `src/main/resources/application.yml`：

```yaml
# 服务器端口
server:
  port: 8080

# Kubernetes命名空间
kubernetes:
  namespace: cloud-playground

# 数据库位置
spring:
  datasource:
    url: jdbc:h2:file:./data/cloudplayground
```

## 开发命令

```bash
# 编译
mvn compile

# 运行测试
mvn test

# 打包
mvn package

# 清理
mvn clean

# 跳过测试编译
mvn clean install -DskipTests
```

## 数据库

使用H2嵌入式数据库，数据存储在 `./data/cloudplayground.mv.db`

主要表：
- `theme_status` - 主题状态
- `exercise_completion` - 练习完成记录
- `exercise_history` - 练习历史
- `user_config` - 用户配置

## API端点

当前可用的API端点：

### 健康检查
```
GET /api/health
```

## 下一步

- [ ] 实现ThemeService（主题管理）
- [ ] 实现ExerciseService（练习执行）
- [ ] 创建主题配置文件（PostgreSQL、MySQL等）
- [ ] 实现K8s资源管理功能

## 故障排除

### Kubernetes连接失败

确保：
1. Docker Desktop已启动并启用Kubernetes
2. kubectl能够连接到集群：`kubectl get nodes`
3. kubeconfig配置正确：`~/.kube/config`

### 端口被占用

修改 `application.yml` 中的 `server.port` 配置

### 编译错误

确保使用Java 17或更高版本：
```bash
java -version
```
