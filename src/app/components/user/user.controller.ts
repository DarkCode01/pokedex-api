import { User } from './domain/user.entity'

export class UserController {
  _UserService: any

  constructor({
    UserService
  }: any) {
    this._UserService = UserService
  }

  public create = async (user: User) => {
    const _user = await this._UserService.create(user)
    if (_user)
      return _user
  }

  public auth = async (user: User) => {
    const _user = await this._UserService.auth(user)
    if (_user)
      return _user
  }
}


