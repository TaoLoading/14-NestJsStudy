import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUser(): any {
    return this.userService.searchAllUser()
  }

  @Post()
  addUser(@Query() user: User): any {
    return this.userService.addUser(user)
  }

  @Get('/profile')
  getProfile(@Query() userId: number): any {
    return this.userService.searchProfile(1)
  }

  @Get('/log')
  getLog(@Query() userId: number): any {
    return this.userService.searchLogs(2)
  }

  @Get('/logGroup')
  async getLogGroup(@Query() userId: number): Promise<any> {
    const res = await this.userService.searchLogsByGroup(3)
    return res.map((o) => ({
      result: o.result,
      count: o.count
    }))
  }
}
