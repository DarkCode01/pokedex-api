import { Pokedex } from '@app/pokedex/pokedex.providers'
import { UserDTO } from '@app/user/user.providers'
import { PokemonDTO } from '@app/pokemon/pokemon.providers'

declare global {
  interface IPokedexController {
    list(query: {
      userId: number,
      userLogged: UserDTO,
      perPage: number,
      page: number,
    }): Promise<{
      pokemons: PokemonDTO[],
      allPokemons: number,
      pages: number,
    }>

    toggleStatus(userId: number): Promise<string>

    delete(userId: number): Promise<string>
  }
}
