import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../../../container/providers'
import { Roles } from '../utils/user.roles'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  lastname: string

  @Column()
  birthdate: Date

  @Column()
  city: string

  @Column({
    unique: true
  })
  email: string

  @Column({
    unique: true
  })
  username: string

  @Column()
  password: string

  @Column({
    nullable: true
  })
  picture: string

  @Column({
    type: 'enum',
    enum: Roles
  })
  role: Roles

  @Column({
    default: true
  })
  onBoarding: boolean

  @Column({
    default: false
  })
  isActive: boolean

  @Column({
    nullable: true
  })
  forgotPasswordToken: string

  @Column({
    nullable: true
  })
  forgotPasswordExpire: Date
}
