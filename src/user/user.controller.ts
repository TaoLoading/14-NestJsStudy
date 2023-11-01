import { Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Query('id') id: string): any {
    return this.userService.getUser(id)
  }

  @Post()
  addUser(): any {
    return this.userService.addUser()
  }
}
