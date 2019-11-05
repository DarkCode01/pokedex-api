import { getRepository, Connection, Repository } from 'typeorm'

// Entity
import { User, Roles } from './user.providers'

export class UserRepository implements IUserRepository {
  private _User: Repository<User>

  constructor(
    private DatabaseConnection: Connection,
    private PokedexRepository: IPokedexRepository,
  ) {
    this.getUserRepository()
  }

  private async getUserRepository() {
    await this.DatabaseConnection.connect()
    this._User = getRepository(User)
    return this._User
  }

  public getUserByUsername = async (username: string): Promise<User|undefined> =>
    await this._User.findOne({ username })

  public getUserByEmail = async (email: string): Promise<User|undefined> =>
    await this._User.findOne({ email })

  public getById = async (id: number): Promise<User|undefined> =>
    await this._User.findOne({ id })

  public async getAll(query: {
    page: number,
    perPage: number,
  }): Promise<{
    rows: User[],
    allUsers: number,
    pages: number
  }> {
    const page = query.page || 1
    const perPage = query.perPage || 5

    const rows = await this._User.find({
      skip: ((perPage * page) - perPage),
      take: perPage,
      where: {
        role: Roles.user
      },
    })

    const count: number = await this._User.count({
      role: Roles.user
    })
    const pages: number = Math.ceil(count / perPage)

    return {
      rows,
      allUsers: count,
      pages
    }
  }

  public saveUser = async (user: User): Promise<User> =>
    await this._User.save(user)

  public delete = async (user: User): Promise<User> => {
    const pokedex = await this.PokedexRepository.getByUserId(user.id)
    if (pokedex) await this.PokedexRepository.delete(pokedex)
    return await this._User.remove(user)
  }

  public update = async (user: User, update: {}): Promise<User> =>
    await this._User.merge(user, update)
}
