import { User } from './domain/user.entity'

interface IProps {
  UserService: any
}

export class UserController {
  UserService: any

  constructor({
    UserService
  }: IProps) {
    this.UserService = UserService
  }

  public create = async (user: User) => {
    const _user = await this.UserService.create({ user })
    if (_user)
      return _user
  }
}
