import { getRepository, Connection, Repository } from 'typeorm'

// Entity
import { Gender } from './gender.providers'

export class GenderRepository implements IGenderRepository {
  private _Gender: Repository<Gender>

  constructor(private DatabaseConnection: Connection) {
    this.getRepository()
  }

  private async getRepository() {
    await this.DatabaseConnection.connect()
    this._Gender = getRepository(Gender)
    return this._Gender
  }

  public create = async (gender: any): Promise<Gender> =>
    await this._Gender.create(gender as Gender)

  public getGenderByName = async (name: string): Promise<Gender|undefined> =>
    await this._Gender.findOne({ name: name as any })

  public saveGender = async (gender: Gender): Promise<Gender> =>
    await this._Gender.save(gender)
}
