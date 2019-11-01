import { MapProp } from 'ts-simple-automapper'
import { Type } from '@app/type/type.providers'

export class PokemonDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  slug: string

  @MapProp()
  description: string

  @MapProp()
  captured: boolean

  @MapProp()
  picture: string

  @MapProp()
  type: Type[]

  @MapProp()
  location: {}

  @MapProp()
  proportions: {}

  @MapProp()
  pokedexId: number
}
