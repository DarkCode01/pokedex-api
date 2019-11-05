import { Pokedex } from '@app/pokedex/pokedex.providers'
import { UserDTO } from '@app/user/user.providers'
import { PokemonDTO } from '@app/pokemon/pokemon.providers'

declare global {
  interface IPokedexService {
    create(userId: number): Promise<Pokedex>

    get(userId: number, userLogged: UserDTO): Promise<Pokedex>

    list(props: {
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
