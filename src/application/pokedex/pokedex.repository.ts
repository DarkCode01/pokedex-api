import { getRepository, Connection } from 'typeorm'

// Entity
import { Pokedex } from './pokedex.providers'

export class PokedexRepository {
  private _Pokedex: any

  constructor(private DatabaseConnection: Connection) {
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
}
