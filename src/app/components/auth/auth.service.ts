import crypto from 'crypto'

import { UserDTO } from '../user/user.providers'
import { AuthResponses } from './auth.providers'

export class AuthService {
  constructor (
    private AuthRepository: any,
    private UserMapper: any,
    private ErrorHandler: any,
    private codes: ApiCodes,
    private GenderController: any,
    private encryptPassword: any,
    private comparePassword: any,
    private JWT: any,
  ) {}

  public create = async (userPayload: any) : Promise<UserDTO> => {
    const user = await this.UserMapper.mapToEntity(userPayload)
    user.password = this.encryptPassword(user.password)

    const gender = await this.GenderController.getOrCreateGender(user.gender)
    if (gender) user.gender = gender

    const isRegistered = await this.AuthRepository.getUserByEmail(user.email)
    const usernameExists = await this.AuthRepository.getUserByUsername(user.username)

    if (isRegistered)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.emailExists
      })

    if (usernameExists)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.usernameExists
      })

    const saveUser = await this.AuthRepository.saveUser(user)
    return await this.JWT.generateToken(this.UserMapper.mapToDTO(saveUser))
  }

  public auth = async (userPayload: any) : Promise<UserDTO> => {
    const getUserByEmail = await this.AuthRepository.getUserByEmail(userPayload.emailOrUsername)
    const getUserByUsername = await this.AuthRepository.getUserByUsername(userPayload.emailOrUsername)
    const user = getUserByEmail || getUserByUsername

    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.auth.accountDoesNotExist
      })

    if (user && this.comparePassword(userPayload.password, user.password)) {
      if (!user.isActive)
        throw this.ErrorHandler.build({
          status: this.codes.UNAUTHORIZED,
          msg: AuthResponses.auth.accountIsDisable
        })

      return await this.JWT.generateToken(this.UserMapper.mapToDTO(user))
    }

    throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: AuthResponses.auth.badCredentials
    })
  }

  public changePassword = async ({ username, password, newPassword }: any) => {
    let user = await this.AuthRepository.getUserByUsername(username)

    if (user && this.comparePassword(password, user.password)) {
      if (password === newPassword)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: AuthResponses.changePassword.equal
        })

      const encryptPassword = this.encryptPassword(newPassword)
      const updatePassword = this.AuthRepository.update(user, { password: encryptPassword })
      if (updatePassword)
        await this.AuthRepository.saveUser(user)

      return AuthResponses.changePassword.success
    }

    throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: AuthResponses.changePassword.incorrect
    })
  }

  public forgotPassword = async (email: string) => {
    const user = await this.AuthRepository.getUserByEmail(email)

    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.auth.accountDoesNotExist
      })

    // Generate Token
    const token = crypto.randomBytes(20).toString('hex')
    const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    const expireDate = new Date()
    // Increase 30 minutes to the current time
    expireDate.setMinutes(expireDate.getMinutes() + 30)
    const forgotPasswordExpire = expireDate
    const updateUser = await this.AuthRepository.update(user,
      { forgotPasswordToken, forgotPasswordExpire })

    if (updateUser)
      await this.AuthRepository.saveUser(user)

    return forgotPasswordToken
  }

  public checkPasswordExpire = async (token: string) => {
    const user = await this.AuthRepository
      .getUserByForgotPasswordToken(token)

    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.forgotPass.userNotFound
      })

    return user
  }

  public resetPassword = async (token: string, password: string) => {
    const user = await this.checkPasswordExpire(token)
    if (user) {
      const updateUser = await this.AuthRepository.update(user,
        { forgotPasswordToken: null,
          forgotPasswordExpire: null,
          password
        })

      if (updateUser)
        await this.AuthRepository.saveUser(user)

        return AuthResponses.forgotPass.success
    }
  }
}
