import { PokemonDTO } from './pokemon.providers'
import { UserDTO } from '../user/user.providers'

export class PokemonController {
  constructor(
    private PokemonService: any,
  ) {}

  /**
  * @description Get a user's pokemon and if it doesn't exist create a pokemon.
  * @param {number} userId
  * @returns {Promise<PokemonDTO>}
  */
  public get = async (userId: number, userLogged: UserDTO): Promise<PokemonDTO> =>
    await this.PokemonService.get(userId, userLogged)
}
