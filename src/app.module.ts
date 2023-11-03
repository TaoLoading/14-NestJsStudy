import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigEnum } from './enum/config.enum'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  imports: [
    // 环境变量相关
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })]
    }),
    UserModule,
    // TypeOrm 相关
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get(ConfigEnum.DB_TYPE),
        host: configService.get(ConfigEnum.DB_HOST),
        port: configService.get(ConfigEnum.DB_PORT),
        username: configService.get(ConfigEnum.DB_USERNAME),
        password: configService.get(ConfigEnum.DB_PASSWORD),
        database: configService.get(ConfigEnum.DB_DATABASE),
        entities: [],
        synchronize: configService.get(ConfigEnum.DB_SYNC)
      } as TypeOrmModuleAsyncOptions)
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
