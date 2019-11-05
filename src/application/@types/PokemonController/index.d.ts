import { Pokemon, PokemonDTO } from '@app/pokemon/pokemon.providers'
import { UserDTO } from '@app/user/user.providers'

declare global {
  interface IPokemonController {
    create(pokemon: Pokemon, userLogged: UserDTO): Promise<PokemonDTO>

    get(query: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
    }): Promise<PokemonDTO>

    update(query: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
      changes: PokemonDTO
    }): Promise<PokemonDTO>

    delete(query: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
    }): Promise<PokemonDTO>

    upload(query: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
      picture: string,
    }): Promise<PokemonDTO>

    picture(picture: string): string

    search(query: {
      userLogged: UserDTO,
      perPage: number,
      page: number,
      searchTerms: string,
    }): Promise <{
      pokemons: PokemonDTO[],
      allPokemons: number,
      pages: number,
    }>
  }
}
