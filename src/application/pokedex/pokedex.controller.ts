import { PokedexDTO } from './pokedex.providers'
import { UserDTO } from '../user/user.providers'

export class PokedexController {
  constructor(
    private PokedexService: any,
  ) {}

  /**
  * @description Get a user's pokedex and if it doesn't exist create a pokedex.
  * @param {number} userId
  * @returns {Promise<PokedexDTO>}
  */
  public get = async (userId: number, userLogged: UserDTO): Promise<PokedexDTO> =>
    await this.PokedexService.get(userId, userLogged)

  /**
  * @description Change Pokedex status
  * @example true to false \ false to true
  * @param {number} userId
  * @returns {Promise<string>}
  */
  public toggleStatus = async (userId: number): Promise<string> =>
    await this.PokedexService.toggleStatus(userId)
}
