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
}
