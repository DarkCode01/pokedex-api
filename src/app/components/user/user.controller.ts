import { User } from './domain/user.entity'

interface IProps {
  UserService: any
}

export class UserController {
  _UserService: any

  constructor({
    UserService
  }: IProps) {
    this._UserService = UserService
  }

  public create = async (user: User) => {
    const _user = await this._UserService.create(user)
    if (_user)
      return _user
  }
}
