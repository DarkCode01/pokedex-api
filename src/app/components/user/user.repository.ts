import { getRepository, Connection } from 'typeorm'

// Entity
import { User } from './user.providers'

export class UserRepository {
  private _User: any

  constructor(private DatabaseConnection: Connection) {
    this.getUserRepository()
  }

  private async getUserRepository() {
    await this.DatabaseConnection.connect()
    this._User = getRepository(User)
    return this._User
  }

  public create = async (user: User): Promise<User> => {
    return await this._User.create(user)
  }

  public async getUserByEmail(email: string): Promise<User|undefined> {
    return await this._User.findOne({ email })
  }

  public async getUserByUsername(username: string): Promise<User|undefined> {
    return await this._User.findOne({ username })
  }

  public async saveUser(user: User): Promise<User> {
    return await this._User.save(user)
  }

  public async update(user: User, update: {}) : Promise<User> {
    return await this._User.merge(user, update)
  }
}
