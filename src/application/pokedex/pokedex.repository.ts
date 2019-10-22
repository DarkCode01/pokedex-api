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

  public async getAll(query: {
    page: number,
    perPage: number,
  }): Promise<{
    rows: Pokedex[],
    allPokedexs: number,
    pages: number
  }> {
    const page = query.page || 1
    const perPage = query.perPage || 5

    const rows = await this._Pokedex.find({
      skip: ((perPage * page) - perPage),
      take: perPage,
    })

    const pages: number = Math.ceil(rows.lenght / perPage)

    return {
      rows,
      allPokedexs: rows.lenght,
      pages
    }
  }

  public savePokedex = async (pokedex: Pokedex): Promise<Pokedex> =>
    await this._Pokedex.save(pokedex)

  public update = async (pokedex: Pokedex, update: {}): Promise<Pokedex> =>
    await this._Pokedex.merge(pokedex, update)
}
