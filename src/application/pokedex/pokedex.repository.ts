import { getRepository, Connection, Repository } from 'typeorm'

// Entity
import { Pokedex } from './pokedex.providers'

export class PokedexRepository {
  private _Pokedex: Repository<Pokedex>

  constructor(
    private DatabaseConnection: Connection,
    private PokemonRepository: any,
  ) {
    this.getPokedexRepository()
  }

  private async getPokedexRepository() {
    await this.DatabaseConnection.connect()
    this._Pokedex = getRepository(Pokedex)
    return this._Pokedex
  }

  public create = async (pokedex: Pokedex): Promise<Pokedex> =>
    await this._Pokedex.create(pokedex)

  public getByUserId = async (userId: number): Promise<Pokedex|undefined> =>
    await this._Pokedex.findOne({ userId })

  public save = async (pokedex: Pokedex): Promise<Pokedex> =>
    await this._Pokedex.save(pokedex)

  public update = async (pokedex: Pokedex, update: {}): Promise<Pokedex> =>
    await this._Pokedex.merge(pokedex, update)

  public delete = async (pokedex: Pokedex): Promise<Pokedex> => {
    const pokemons = await this.PokemonRepository.getAll(pokedex.id)
    if (pokemons) await this.PokemonRepository.delete(pokemons)
    return await this._Pokedex.remove(pokedex)
  }
}
