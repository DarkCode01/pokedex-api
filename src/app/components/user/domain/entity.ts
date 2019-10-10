import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../../../infrastructure/utils/base.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string

  @Column({
    nullable: true
  })
  surname: string

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
}
