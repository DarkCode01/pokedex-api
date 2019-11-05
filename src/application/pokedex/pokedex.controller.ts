import { UserDTO } from '@app/user/user.providers'
import { PokemonDTO } from '@app/pokemon/pokemon.providers'

export class PokedexController implements IPokedexController {
  constructor(
    private PokedexService: IPokedexService,
  ) {}

  /**
  * @description Get list of pokemons
  * @param {paginate} query
  * @returns {Promise<PokemonDTO>[]}
  */
  public list = async (query: {
    userId: number,
    userLogged: UserDTO,
    perPage: number,
    page: number,
  }): Promise<{
    pokemons: PokemonDTO[],
    allPokemons: number,
    pages: number,
  }> => await this.PokedexService.list(query)

  /**
  * @description Change Pokedex status
  * @example true to false \ false to true
  * @param {number} userId
  * @returns {Promise<string>}
  */
  public toggleStatus = async (userId: number): Promise<string> =>
    await this.PokedexService.toggleStatus(userId)

  /**
  * @description Delete pokedex
  * @param {number} userId
  * @returns {Promise<string>}
  */
  public delete = async (userId: number): Promise<string> =>
    await this.PokedexService.delete(userId)
}
