import { getRepository, Connection, Repository, Like } from 'typeorm'

// Entity
import { Type } from './type.providers'

export class TypeRepository {
  private _Type: Repository<Type>

  constructor(private DatabaseConnection: Connection) {
    this.getRepository()
  }

  private async getRepository() {
    await this.DatabaseConnection.connect()
    this._Type = getRepository(Type)
    return this._Type
  }

  public create = async (type: Type): Promise<Type> =>
    await this._Type.create(type)

  public getTypeByName = async (name: string): Promise<Type|undefined> =>
    await this._Type.findOne({ name: name as any })

  public saveType = async (type: Type): Promise<Type> =>
    await this._Type.save(type)

  public search = async (searchTerms: string): Promise<Type[]> =>
    await this._Type.find({
      where: {
        name: Like(`%${searchTerms}%`),
      }
    })
}
