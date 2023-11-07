import { User } from 'src/user/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @Column()
  method: string

  @Column({ nullable: true })
  data: string

  @Column()
  result: string

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User
}
