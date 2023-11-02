import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  imports: [
    // 实现了将.env 文件中的配置与 process.env 相对应，通过 ConfigService 可读取配置
    ConfigModule.forRoot({
      // 表示在全局都可以使用 ConfigService
      isGlobal: true,
      // 指定加载的环境变量文件路径
      envFilePath,
      // 将.env 文件的配置信息与其他环境变量文件共享
      load: [() => dotenv.config({ path: '.env' })]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
