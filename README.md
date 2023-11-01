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
├── app.controller.ts // 控制器。包含处理传入的 HTTP 请求和响应的代码
├── app.controller.spec.ts // 针对控制器的单元测试
├── app.service.ts // 服务。包含业务逻辑代码
├── app.module.ts // 根模块。将本模块内相关代码（控制器、服务等）组合在一起
├── main.ts // 应用程序的入口文件。使用核心函数 NestFactory 来创建 Nest 应用程序的实例
```

## 常用命令

```
// 创建完整功能模块：
// 1. 生成module
nest g mo [name]
// 2. 生成controller
nest g co [name]
// 3. 生成service
nest g s [name]

// 创建基础CRUD模块：
nest g res user
```

## 热重载

配置步骤：

1. 安装包

   ```
   pnpm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
   pnpm i -D @types/webpack-env
   ```

2. 根目录创建`webpack-hmr.config.js`文件

   ```js
   const nodeExternals = require('webpack-node-externals')
   const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
   
   module.exports = function (options, webpack) {
     return {
       ...options,
       entry: ['webpack/hot/poll?100', options.entry],
       externals: [
         nodeExternals({
           allowlist: ['webpack/hot/poll?100']
         })
       ],
       plugins: [
         ...options.plugins,
         new webpack.HotModuleReplacementPlugin(),
         new webpack.WatchIgnorePlugin({
           paths: [/\.js$/, /\.d\.ts$/]
         }),
         new RunScriptWebpackPlugin({
           name: options.output.filename,
           autoRestart: false
         })
       ]
     }
   }
   
   ```

3. `main.ts`中增加 webpack 相关配置

   ```ts
   async function bootstrap() {
     const app = await NestFactory.create(AppModule)
   
     // 设置接口前缀
     app.setGlobalPrefix('api/v1')
   
     await app.listen(3000)
     console.log('启动成功，点击 http://localhost:3000/api/v1 访问')
   
     if (module.hot) {
       module.hot.accept()
       module.hot.dispose(() => app.close())
     }
   }
   ```

4. 配置启动脚本

   ```
   "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
   ```
