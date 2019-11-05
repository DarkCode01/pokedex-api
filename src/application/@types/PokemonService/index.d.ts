import { Pokemon, PokemonDTO } from '@app/pokemon/pokemon.providers'
import { UserDTO } from '@app/user/user.providers'

declare global {
  interface IPokemonService {
    create(pokemonPayload: any, userLogged: UserDTO): Promise<PokemonDTO>

    get(props: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
    }): Promise<PokemonDTO>

    delete(props: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
    }): Promise<PokemonDTO>

    upload(props: {
      userId: number,
      userLogged: UserDTO,
      slug: string,
      picture: string,
    }): Promise<PokemonDTO>

    picture(picture: string): string

    update(props: {
      userId: number,
      userLogged: UserDTO,
      changes: PokemonDTO|any,
      slug: string
    }): Promise<PokemonDTO>

    search(props: {
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
