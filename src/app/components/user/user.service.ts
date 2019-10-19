import { UserDTO, UserResponses, Roles } from './user.providers'

export class UserService {
  constructor(
    private UserMapper: any,
    private UserRepository: any,
    private ErrorHandler: any,
    private codes: ApiCodes,
  ) {}

  public get = async (username: string, _user: UserDTO) : Promise<UserDTO> => {
    if (_user.username === username || _user.role === Roles.owner) {
      const user = await this.UserRepository.getUserByUsername(username)
      if (!user)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: UserResponses.userNotFound
        })

      return await this.UserMapper.mapToDTO(user)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }
}
