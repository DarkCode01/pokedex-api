import slugify from '@sindresorhus/slugify'

import { Pokemon,  PokemonDTO, PokemonResponses } from './pokemon.providers'
import { UserDTO, Roles, UserResponses } from '../user/user.providers'
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
    const isPokemon = await this.PokemonRepository.getBySlug({
      slug: pokemon.slug,
      pokedexId: pokemon.pokedex.id,
    })
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

  public get = async (props: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
  }): Promise<PokemonDTO> => {
    const { userId, userLogged, slug } = props
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      const pokedex: Pokedex = await this.PokedexService.get(userId, userLogged)
      const pokemon = await this.PokemonRepository.getBySlug({
        slug,
        pokedexId: pokedex.id,
      })
      if (!pokemon)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokemonResponses.pokemonNotFound
        })

      return await this.PokemonMapper.mapToDTO(pokemon)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }
}
