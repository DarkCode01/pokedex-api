import { MapProp } from 'ts-simple-automapper'

export class PokemonDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  description: string

  @MapProp()
  captured: boolean

  @MapProp()
  location: {}

  @MapProp()
  proportions: {}

  @MapProp()
  pokedexId: number
}
