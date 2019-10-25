import { getRepository, Connection, Repository } from 'typeorm'

// Entity
import { Pokemon } from './pokemon.providers'

export class PokemonRepository {
  private _Pokemon: Repository<Pokemon>

  constructor(private DatabaseConnection: Connection) {
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

}
