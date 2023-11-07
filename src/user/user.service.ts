import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  searchAllUser() {
    return this.userRepository.find()
  }

  searchUser(username: string) {
    return this.userRepository.find({ where: { username: username } })
  }

  async addUser(userInfo: User) {
    const user = await this.userRepository.create(userInfo)
    return this.userRepository.save(user)
  }

  modifyUser(userId: number, userInfo: Partial<User>) {
    return this.userRepository.update(userId, userInfo)
  }

  deleteUser(userId: number) {
    return this.userRepository.delete(userId)
  }
}
