import { Logs } from 'src/logs/logs.entity'
import { Roles } from 'src/roles/roles.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]

  @ManyToMany(() => Roles, (roles) => roles.user)
  @JoinTable({ name: 'user_roles' }) // 中间表，多对多关系中必须存在
  roles: Roles[]

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile
}
