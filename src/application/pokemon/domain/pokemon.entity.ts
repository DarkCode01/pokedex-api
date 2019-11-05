import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Pokedex } from '@app/pokedex/pokedex.providers'
import { Type } from '@app/type/type.providers'

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createDate: Date

  @Column({
    unique: true
  })
  name: string

  @Column({
    unique: true
  })
  slug: string

  @Column()
  description: string

  @Column({
    default: false
  })
  captured: boolean

  @Column({
    nullable: true
  })
  picture: string

  @Column({
    nullable: true
  })
  color: string

  @ManyToMany(type => Type, {
    eager: true
  })
  @JoinTable({
    name: 'pokemon_type'
  })
  type: Type[]

  @Column({
    type: 'simple-json',
    nullable: true
  })
  location: {
    lat: string,
    long: string,
  }

  @Column({
    type: 'simple-json',
    nullable: true
  })
  proportions: {
    height: string,
    weight: string,
  }

  @Column()
  pokedexId: number

  @ManyToOne(type => Pokedex, pokedex => pokedex)
  pokedex: Pokedex
}
