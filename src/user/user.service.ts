import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  getUser(id: string) {
    if (id === '6') {
      return {
        code: 200,
        data: [
          {
            id: 6,
            name: 'Evan',
            age: 24
          }
        ],
        msg: '请求成功'
      }
    }

    return {
      code: 200,
      data: [],
      msg: '请求成功'
    }
  }

  addUser() {
    return {
      code: 200,
      data: {},
      msg: '请求成功'
    }
  }
}
