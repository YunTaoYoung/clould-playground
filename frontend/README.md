# Cloud Playground Frontend

React + TypeScript前端应用，提供技术学习平台的用户界面。

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Ant Design** - UI组件库
- **React Router** - 路由管理
- **Axios** - HTTP客户端
- **Zustand** - 状态管理
- **React Query** - 数据获取
- **Monaco Editor** - 代码编辑器

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 3. 构建生产版本

```bash
npm run build
```

## 项目结构

```
frontend/
├── src/
│   ├── pages/              # 页面组件
│   │   └── HomePage.tsx   # 主题市场页面
│   ├── components/         # 可复用组件
│   ├── services/           # API服务层
│   │   ├── apiClient.ts   # Axios配置
│   │   └── themeService.ts # 主题API
│   ├── stores/             # Zustand状态管理
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts       # 公共类型
│   ├── config/             # 配置文件
│   │   └── api.ts         # API端点配置
│   ├── utils/              # 工具函数
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── .env                    # 环境变量
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
└── package.json            # 依赖配置
```

## 主要功能

### 主题市场
- 浏览所有可用的学习主题
- 激活/停用主题
- 查看主题状态和详情

### 练习页面（开发中）
- Monaco代码编辑器
- 实时代码执行
- 结果展示和验证

### 历史记录（开发中）
- 查看练习历史
- 代码回放
- 统计分析

## API代理配置

Vite开发服务器已配置代理到后端API：

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
}
```

所有以 `/api` 开头的请求将被代理到 `http://localhost:8080`

## 环境变量

在 `.env` 文件中配置：

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## API服务

### themeService

```typescript
import { themeService } from './services/themeService';

// 获取所有主题
const response = await themeService.getAllThemes();

// 激活主题
await themeService.activateTheme('postgresql');

// 停用主题
await themeService.deactivateTheme('postgresql');
```

## 类型定义

所有类型定义在 `src/types/index.ts`：

```typescript
import { Theme, ThemeStatus, Exercise } from './types';
```

## 故障排除

### 端口被占用

修改 `vite.config.ts` 中的端口：

```typescript
server: {
  port: 3001,
}
```

### API连接失败

确保后端服务运行在 `http://localhost:8080`

检查代理配置和环境变量设置

### 依赖问题

```bash
# 清除node_modules并重新安装
rm -rf node_modules
npm install
```

