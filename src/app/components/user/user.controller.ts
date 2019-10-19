import { UserDTO } from './user.providers'

export class UserController {
  constructor(
    private UserService: any,
  ) {}

  public get = async (username: string, user: UserDTO) => {
    const _user = await this.UserService.get(username, user)
    if (_user)
      return _user
  }
}
