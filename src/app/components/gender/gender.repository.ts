import { getRepository, Connection } from 'typeorm'

// Entity
import { Gender } from './gender.providers'

export class GenderRepository {
  private _Gender: any

  constructor({
    DatabaseConnection
  }: any) {
    this.getRepository(DatabaseConnection)
  }

  private async getRepository(DatabaseConnection: Connection) {
    await DatabaseConnection.connect()
    this._Gender = getRepository(Gender)
    return this._Gender
  }

  public create = async (gender: Gender): Promise<Gender> => {
    return await this._Gender.create(gender)
  }

  public async getGenderByName(name: string): Promise<Gender|undefined> {
    return await this._Gender.findOne({ name })
  }

  public async saveGender(gender: Gender): Promise<Gender> {
    return await this._Gender.save(gender)
  }
}
