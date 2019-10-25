import { Pokemon, PokemonDTO } from './pokemon.providers'
import { UserDTO } from '../user/user.providers'

export class PokemonController {
  constructor(
    private PokemonService: any,
  ) {}

  /**
  * @description Create pokemon
  * @param {Pokemon} pokemon
  * @param {UserDTO} userLogged
  * @returns {Promise<PokemonDTO>}
  */
  public create = async (pokemon: Pokemon, userLogged: UserDTO): Promise<PokemonDTO> =>
    await this.PokemonService.create(pokemon, userLogged)

  /**
  * @description Get Pokemon
  *
  * @param {getPayload} query
  * @returns {Promise<PokemonDTO>}
  */
  public get = async (query: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
  }): Promise<UserDTO> =>
    await this.PokemonService.get(query)

  /**
  * @description Delete a pokemon
  *
  * @param {deletePayload} query
  * @returns {Promise<string>}
  */
  public delete = async (query: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
  }): Promise<UserDTO> =>
    await this.PokemonService.delete(query)
}
