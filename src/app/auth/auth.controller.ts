import { forgotMessage, AuthResponses } from './auth.providers'
import { User } from '../user/user.providers'

export class AuthController {
  constructor(
    private AuthService: any,
    private Email: any
  ) {}

  public create = async (user: User) =>
    await this.AuthService.create(user)

  public auth = async (user: {
    email: string,
    password: string
  }) => await this.AuthService.auth(user)

  public changePassword = async (user: User, payload: any) => {
    const { username } = user
    const { password, newPassword } = payload

    const res = await this.AuthService.changePassword({ username, password, newPassword })
    if (res)
      return res
  }

  public forgotPassword = async (props: {
    email: string,
    url: string
  }) => {
    const token = await this.AuthService.forgotPassword(props.email)
    if (token) {
      const sendEmail = await this.Email.build({
        to: props.email,
        subject: AuthResponses.nodemailer.subject,
        html: forgotMessage(`${props.url}/${token}`)
      })
      if (sendEmail)
        return sendEmail
    }
  }

  public checkPasswordExpire = async (token: string) =>
    await this.AuthService.checkPasswordExpire(token)

  public resetPassword = async (token: string, password: string) =>
    await this.AuthService.resetPassword(token, password)
}
