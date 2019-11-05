import { Pokemon } from '@app/pokemon/pokemon.providers'

declare global {
  interface IPokemonRepository {
    create(pokemon: Pokemon): Promise<Pokemon>

    save(pokemon: Pokemon): Promise<Pokemon>

    update(pokemon: Pokemon, update: {}): Promise<Pokemon>

    getBySlug(props: {
      slug: string,
      pokedexId: number,
    }): Promise<Pokemon|undefined>

    getAll(pokedexId: number): Promise<Pokemon[]|undefined>

    delete(pokemon: Pokemon|Pokemon[]): Promise<Pokemon|Pokemon[]>

    list(query: {
      page: number,
      perPage: number,
      pokedexId: number,
    }): Promise<{
      rows: Pokemon[],
      allPokemons: number,
      pages: number
    }>

    search(query: {
      page: number,
      perPage: number,
      searchTerms: string,
      pokedexId: number,
    }): Promise<{
      rows: Pokemon[],
      allPokemons: number,
      pages: number
    }>
  }
}
