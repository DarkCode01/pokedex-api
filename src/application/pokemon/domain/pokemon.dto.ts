import { MapProp } from 'ts-simple-automapper'

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
  type: string[]

  @MapProp()
  location: {}

  @MapProp()
  proportions: {}

  @MapProp()
  pokedexId: number
}
