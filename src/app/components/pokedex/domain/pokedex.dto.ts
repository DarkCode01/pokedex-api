import { MapProp } from 'ts-simple-automapper'

export class PokedexDTO {
  @MapProp()
  userId: number

  @MapProp()
  user: {}

  @MapProp()
  isActive: boolean
}
