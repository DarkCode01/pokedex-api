import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'types' })
export class Type {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
