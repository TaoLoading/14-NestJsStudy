# NestJS

## 初始化

```
安装脚手架：
$ npm i -g @nestjs/cli

创建项目：
$ nest new project-name

运行：
pnpm start
pnpm start:dev
```

## 核心文件

```
src
├── app.controller.spec.ts // 针对控制器的单元测试
├── app.controller.ts // 单个路由的基本控制器 (Controller)
├── app.module.ts // 应用程序的根模块 (Module)
├── app.service.ts // 具有单一方法的基本服务 (Service)
├── main.ts // 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例
```

