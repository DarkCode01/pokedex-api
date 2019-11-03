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
  }): Promise<PokemonDTO> =>
    await this.PokemonService.get(query)

  /**
  * @description Update Pokemon
  * @param {updatePayload} query
  * @returns {Promise<PokemonDTO>}
  */
  public update = async (query: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
    changes: PokemonDTO
  }): Promise<PokemonDTO> => await this.PokemonService.update(query)

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
  }): Promise<PokemonDTO> =>
    await this.PokemonService.delete(query)

  /**
  * @description Upload pokemon picture
  * @param {uploadPayload} query
  * @returns {Promise<PokemonDTO>}
  */
  public upload = async (query: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
    picture: string,
  }): Promise<PokemonDTO> => await this.PokemonService.upload(query)

  /**
  * @description Get pokemon picture
  * @param {string} picture
  */
  public picture = (picture: string) =>
    this.PokemonService.picture(picture)
}
