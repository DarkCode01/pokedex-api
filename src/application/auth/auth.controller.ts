import { forgotMessage, AuthResponses } from './auth.providers'
import { User, UserDTO } from '@app/user/user.providers'

export class AuthController implements IAuthController {
  constructor(
    private AuthService: IAuthService,
    private Email: IEmail
  ) {}

  /**
  * @description Create user and return token with UserDTO
  * @param {User} user
  * @returns {Promise<string>}
  */
  public create = async (user: User): Promise<UserDTO> =>
    await this.AuthService.create(user)

  /**
  * @description Authenticate user and return token with UserDTO.
  * @param {UserAuth} user
  * @returns {Promise<string>}
  */
  public auth = async (user: {
    email: string,
    password: string
  }): Promise<UserDTO> => await this.AuthService.auth(user)

  /**
  * @description Change user password, return confirmation message.
  * @param {User} user
  * @param {any} payload
  * @returns {Promise<string>}
  */
  public changePassword = async (user: UserDTO, payload: any): Promise<string> => {
    const { username } = user
    const { password, newPassword } = payload

    return await this.AuthService.changePassword({ username, password, newPassword })
  }

  /**
  * @description Forgot password.
  * @param {ForgotPayload} props
  * @returns {Promise<string>}
  */
  public forgotPassword = async (props: {
    email: string,
    url: string
  }): Promise<any> => {
    const token = await this.AuthService.forgotPassword(props.email)
    if (token) {
      return await this.Email.build({
        to: props.email,
        subject: AuthResponses.nodemailer.subject,
        html: forgotMessage(`${props.url}/${token}`)
      })
    }
  }

  /**
  * @description Verify that the forgotten token password has not yet expired.
  * @param {string} token
  * @returns {Promise<User>}
  */
  public checkPasswordExpire = async (token: string): Promise<User> =>
    await this.AuthService.checkPasswordExpire(token)

  /**
  * @description Receive the token and the new password and return confirmation message.
  * @param {string} token
  * @param {string} password
  * @returns {Promise<string>}
  */
  public resetPassword = async (token: string, password: string): Promise<any> =>
    await this.AuthService.resetPassword(token, password)
}
