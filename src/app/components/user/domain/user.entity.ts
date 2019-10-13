import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Roles } from '../utils/user.roles'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn()
  createDate: Date

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
    default: Roles.user,
    enum: Roles
  })
  role: Roles

  @Column({
    default: true
  })
  onBoarding: boolean

  @Column({
    default: true
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
