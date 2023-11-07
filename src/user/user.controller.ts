import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): any {
    return this.userService.searchAllUser()
  }

  @Post()
  addUser(@Query() user: User): any {
    return this.userService.addUser(user)
  }
}
