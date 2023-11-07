import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { Logs } from 'src/logs/logs.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  // 查询全部用户
  searchAllUser() {
    return this.userRepository.find()
  }

  // 按用户名查询用户
  searchUserByName(username: string) {
    return this.userRepository.find({ where: { username: username } })
  }

  // 按用户 id 查询用户
  searchUserById(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } })
  }

  // 添加用户
  async addUser(userInfo: User) {
    const user = await this.userRepository.create(userInfo)
    return this.userRepository.save(user)
  }

  // 修改用户
  modifyUser(userId: number, userInfo: Partial<User>) {
    return this.userRepository.update(userId, userInfo)
  }

  // 删除用户
  deleteUser(userId: number) {
    return this.userRepository.delete(userId)
  }

  // 查询用户资料
  searchProfile(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      // 配置关联表查询
      relations: {
        profile: true
      }
    })
  }

  // 查询用户日志
  async searchLogs(userId: number) {
    const user = await this.searchUserById(userId)
    return this.logsRepository.find({ where: { user: user } })
  }

  // 聚合查询日志
  searchLogsByGroup(id: number) {
    // 使用 sql 语句实现
    /* return this.logsRepository.query(
      'SELECT logs.result as result, COUNT(logs.result) as count FROM logs, user where user.id = logs.userId and user.id = 3 GROUP BY logs.result;'
    ) */

    // 使用 TypeORM 实现
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .getRawMany()
  }
}
