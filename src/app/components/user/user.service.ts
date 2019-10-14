import { UserDTO, UserResponses } from './user.providers'

export class UserService {
  private _UserMapper: any
  private _UserRepository: any
  private _ErrorHandler: any
  private _codes: ApiCodes
  private _GenderController: any
  private _encryptPassword: any
  private _jwt: any

  constructor({
    UserMapper,
    UserRepository,
    ErrorHandler,
    codes,
    GenderController,
    encryptPassword,
    JWT
  }: any) {
    this._UserMapper = UserMapper
    this._UserRepository = UserRepository
    this._ErrorHandler = ErrorHandler
    this._codes = codes
    this._GenderController = GenderController
    this._encryptPassword = encryptPassword
    this._jwt = JWT
  }

  public create = async (userPayload: any) : Promise<UserDTO> => {
    const user = await this._UserMapper.mapToEntity(userPayload)
    user.password = this._encryptPassword(user.password)

    const gender = await this._GenderController.getOrCreateGender(user.gender)
    if (gender) user.gender = gender

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
    return await this._jwt.generateToken(this._UserMapper.mapToDTO(saveUser))
  }
}
