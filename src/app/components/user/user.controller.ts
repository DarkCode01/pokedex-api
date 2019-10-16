import { User } from './domain/user.entity'

export class UserController {
  constructor(private UserService: any) {}

  public create = async (user: User) => {
    const _user = await this.UserService.create(user)
    if (_user)
      return _user
  }

  public auth = async (user: User) => {
    const _user = await this.UserService.auth(user)
    if (_user)
      return _user
  }

  public changePassword = async (user: User, payload: any) => {
    const { username } = user
    const { password, newPassword } = payload

    const res = await this.UserService.changePassword({ username, password, newPassword })
    if (res)
      return res
  }
}


