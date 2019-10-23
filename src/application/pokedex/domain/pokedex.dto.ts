import { MapProp } from 'ts-simple-automapper'

export class PokedexDTO {
  @MapProp()
  userId: number

  @MapProp()
  isActive: boolean
}
