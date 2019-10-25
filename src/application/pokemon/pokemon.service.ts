import slugify from '@sindresorhus/slugify'

import { Pokemon, PokemonResponses } from './pokemon.providers'
import { UserDTO } from '../user/user.providers'
import { Pokedex } from '../pokedex/pokedex.providers'

export class PokemonService {
  constructor(
    private PokemonMapper: any,
    private PokemonRepository: any,
    private PokedexService: any,
    private ErrorHandler: any,
    private codes: statusCodes,
  ) {}

  public create = async (pokemonPayload: any, userLogged: UserDTO) => {
    const pokedex: Pokedex = await this.PokedexService.get(userLogged.id, userLogged)
    const pokemon: Pokemon = await this.PokemonMapper.mapToEntity(pokemonPayload)
    pokemon.slug = slugify(pokemon.name)
    pokemon.pokedex = pokedex
    const isPokemon = await this.PokemonRepository.getBySlug(pokemon.slug)
    if (isPokemon)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokemonResponses.isRegistered
      })

    if (!pokemon.slug)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokemonResponses.invalidName
      })

    const saved = await this.PokemonRepository.save(pokemon)
    if (saved)
      return this.PokemonMapper.mapToDTO(saved)
  }
}
