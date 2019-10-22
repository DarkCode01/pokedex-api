import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from '../../user/user.providers'

@Entity({ name: 'pokedex' })
export class Pokedex {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createDate: Date

  @Column()
  userId: number

  @Column({
    default: true
  })
  isActive: boolean

  @OneToOne(type => User)
  @JoinColumn()
  user: User
}
