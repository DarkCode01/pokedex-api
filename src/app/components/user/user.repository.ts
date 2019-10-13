import { getRepository } from 'typeorm'

// Entity
import { User } from './domain/user.entity'

export class UserRepository {
  constructor(
    private _User = getRepository(User)
  ) {}

  public create = async (user: User): Promise<User> => {
    return await this._User.create({
      name: user.name,
      surname: user.surname,
      email: user.email,
      username: user.username,
      password: user.password
    })
  }
}
