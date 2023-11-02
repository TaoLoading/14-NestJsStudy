import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { ConfigEnum } from 'src/enum/config.enum'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {}

  @Get()
  getUser(@Query('id') id: string): any {
    const db = this.configService.get(ConfigEnum.DB)
    console.log('db', db) // 与启动命令相关
    const dbUrl = this.configService.get('DB_URL')
    console.log('dbUrl', dbUrl) // www.taoloading.com
    return this.userService.getUser(id)
  }

  @Post()
  addUser(): any {
    return this.userService.addUser()
  }

  @Put()
  modifyUser(@Query('id') id: string): any {
    return this.userService.getUser(id)
  }
}
