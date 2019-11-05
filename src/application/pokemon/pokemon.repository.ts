import { getRepository, Connection, Repository, Like } from 'typeorm'
import slugify from '@sindresorhus/slugify'

// Entity
import { Pokemon } from './pokemon.providers'
import { Type } from '@app/type/type.providers'

export class PokemonRepository implements IPokemonRepository {
  private _Pokemon: Repository<Pokemon>

  constructor(
    private DatabaseConnection: Connection,
    private TypeRepository: ITypeRepository,
  ) {
    this.getPokemonRepository()
  }

  private async getPokemonRepository() {
    await this.DatabaseConnection.connect()
    this._Pokemon = getRepository(Pokemon)
    return this._Pokemon
  }

  public create = async (pokemon: Pokemon): Promise<Pokemon> =>
    await this._Pokemon.create(pokemon)

  public save = async (pokemon: Pokemon): Promise<Pokemon> =>
    await this._Pokemon.save(pokemon)

  public update = async (pokemon: Pokemon, update: {}): Promise<Pokemon> =>
    await this._Pokemon.merge(pokemon, update)

  public getBySlug = async (props: {
    slug: string,
    pokedexId: number,
  }): Promise<Pokemon|undefined> =>
    await this._Pokemon.findOne({ slug: props.slug, pokedexId: props.pokedexId })

  public getAll = async (pokedexId: number): Promise<Pokemon[]|undefined> =>
    await this._Pokemon.find({ pokedexId })

  public delete = async (pokemon: Pokemon|Pokemon[]): Promise<Pokemon|Pokemon[]> =>
    await this._Pokemon.remove(pokemon as Pokemon[])

  public async list(query: {
    page: number,
    perPage: number,
    pokedexId: number,
  }): Promise<{
    rows: Pokemon[],
    allPokemons: number,
    pages: number
  }> {
    const page = query.page || 1
    const perPage = query.perPage || 5

    const rows = await this._Pokemon.find({
      skip: ((perPage * page) - perPage),
      take: perPage,
      where: {
        pokedexId: query.pokedexId
      },
    })

    const count: number = await this._Pokemon.count({
      pokedexId: query.pokedexId
    })
    const pages: number = Math.ceil(count / perPage)

    return {
      rows,
      allPokemons: count,
      pages
    }
  }

  public async search(query: {
    page: number,
    perPage: number,
    searchTerms: string,
    pokedexId: number,
  }): Promise<{
    rows: Pokemon[],
    allPokemons: number,
    pages: number
  }> {
    const page = query.page || 1
    const perPage = query.perPage || 5
    const searchTerms = query.searchTerms || ''
    const { pokedexId } = query

    const getPokemonsByNameAndDesc = await this._Pokemon.find({
      skip: ((perPage * page) - perPage),
      take: perPage,
      where: [{
        name: Like(`%${searchTerms}%`),
        pokedexId,
      },
      {
        slug: Like(`%${slugify(searchTerms)}%`),
        pokedexId,
      },
      {
        description: Like(`%${searchTerms}%`),
        pokedexId,
      }],
    })

    const types: Type[] = await this.TypeRepository.search(searchTerms)
    const pokemons = await this._Pokemon.find({ pokedexId })
    const pokemonsByTypes:Pokemon[] = []
    pokemons.map(pokemon => pokemon.type.map(t =>
      types.map(type => type.name === t.name &&
        pokemonsByTypes.push(pokemon))))

    const rows = [ ...getPokemonsByNameAndDesc, ...pokemonsByTypes ]
    const pages: number = Math.ceil(rows.length / perPage)

    return {
      rows,
      allPokemons: rows.length,
      pages
    }
  }
}
