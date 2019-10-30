import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from '@app/user/user.providers'

enum enumGender {
  male = 'male',
  female = 'female',
  others = 'others',
}

@Entity({ name: 'genders' })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: enumGender
  })
  name: enumGender

  @OneToMany(type => User, user => user.gender)
  users: User[]
}
