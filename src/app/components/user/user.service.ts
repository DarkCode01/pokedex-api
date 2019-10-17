import { UserDTO, UserResponses } from './user.providers'
import crypto from 'crypto'

export class UserService {
  constructor(
    private UserMapper: any,
    private UserRepository: any,
    private ErrorHandler: any,
    private codes: ApiCodes,
    private GenderController: any,
    private encryptPassword: any,
    private comparePassword: any,
    private JWT: any
  ) {}

  public create = async (userPayload: any) : Promise<UserDTO> => {
    const user = await this.UserMapper.mapToEntity(userPayload)
    user.password = this.encryptPassword(user.password)

    const gender = await this.GenderController.getOrCreateGender(user.gender)
    if (gender) user.gender = gender

    const isRegistered = await this.UserRepository.getUserByEmail(user.email)
    const usernameExists = await this.UserRepository.getUserByUsername(user.username)

    if (isRegistered)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.emailExists
      })

    if (usernameExists)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.usernameExists
      })

    const saveUser = await this.UserRepository.saveUser(user)
    return await this.JWT.generateToken(this.UserMapper.mapToDTO(saveUser))
  }

  public auth = async (userPayload: any) : Promise<UserDTO> => {
    const getUserByEmail = await this.UserRepository.getUserByEmail(userPayload.emailOrUsername)
    const getUserByUsername = await this.UserRepository.getUserByUsername(userPayload.emailOrUsername)
    const user = getUserByEmail || getUserByUsername

    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.auth.accountDoesNotExist
      })

    if (user && this.comparePassword(userPayload.password, user.password)) {
      if (!user.isActive)
        throw this.ErrorHandler.build({
          status: this.codes.UNAUTHORIZED,
          msg: UserResponses.auth.accountIsDisable
        })

      return await this.JWT.generateToken(this.UserMapper.mapToDTO(user))
    }

    throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: UserResponses.auth.badCredentials
    })
  }

  public changePassword = async ({ username, password, newPassword }: any) => {
    let user = await this.UserRepository.getUserByUsername(username)

    if (user && this.comparePassword(password, user.password)) {
      if (password === newPassword)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: UserResponses.changePassword.equal
        })

      const encryptPassword = this.encryptPassword(newPassword)
      const updatePassword = this.UserRepository.update(user, { password: encryptPassword })
      if (updatePassword)
        await this.UserRepository.saveUser(user)

      return UserResponses.changePassword.success
    }

    throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: UserResponses.changePassword.incorrect
    })
  }

  public forgotPassword = async (email: string) => {
    const user = await this.UserRepository.getUserByEmail(email)

    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.auth.accountDoesNotExist
      })

    // Generate Token
    const token = crypto.randomBytes(20).toString('hex')
    const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    const forgotPasswordExpire = new Date()
    const updateUser = this.UserRepository.update(user,
      { forgotPasswordToken, forgotPasswordExpire })

    if (updateUser)
      await this.UserRepository.saveUser(user)

    return forgotPasswordToken
  }
}
