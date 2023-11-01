import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 设置接口前缀
  app.setGlobalPrefix('api/v1')

  await app.listen(3000)
  console.log('启动成功，点击 http://localhost:3000/api/v1 访问')
}
bootstrap()
