import { UserDTO, UserResponses } from './user.providers'

interface IProps {
  UserMapper: any
  UserRepository: any,
  ErrorHandler: any,
  codes: ApiCodes,
}

export class UserService {
  _UserMapper: any
  _UserRepository: any
  _ErrorHandler: any
  _codes: ApiCodes

  constructor({
    UserMapper,
    UserRepository,
    ErrorHandler,
    codes
  }: IProps) {
    this._UserMapper = UserMapper
    this._UserRepository = UserRepository
    this._ErrorHandler = ErrorHandler
    this._codes = codes
  }

  public create = async (userPayload: any) : Promise<UserDTO> => {
    const user = await this._UserMapper.mapToEntity(userPayload)

    const isRegistered = await this._UserRepository.getUserByEmail(user.email)
    const usernameExists = await this._UserRepository.getUserByUsername(user.username)

    if (isRegistered)
      throw this._ErrorHandler.build({
        status: this._codes.BAD_REQUEST,
        msg: UserResponses.emailExists
      })

    if (usernameExists)
      throw this._ErrorHandler.build({
        status: this._codes.BAD_REQUEST,
        msg: UserResponses.usernameExists
      })

    const saveUser = await this._UserRepository.saveUser(user)
    return this._UserMapper.mapToDTO(saveUser)
  }
}
