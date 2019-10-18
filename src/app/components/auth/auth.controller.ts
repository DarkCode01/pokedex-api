import { forgotMessage, AuthResponses } from './auth.providers'
import { User } from '../user/user.providers'

export class AuthController {
  constructor(
    private AuthService: any,
    private Email: any
  ) {}

  public create = async (user: User) => {
    const _user = await this.AuthService.create(user)
    if (_user)
      return _user
  }

  public auth = async (user: {
    email: string,
    password: string
  }) => {
    const _user = await this.AuthService.auth(user)
    if (_user)
      return _user
  }

  public changePassword = async (user: User, payload: any) => {
    const { username } = user
    const { password, newPassword } = payload

    const res = await this.AuthService.changePassword({ username, password, newPassword })
    if (res)
      return res
  }

  public forgotPassword = async ({
    email,
    url
  }: any) => {
    const token = await this.AuthService.forgotPassword(email as string)
    if (token) {
      const sendEmail = await this.Email.build({
        to: email,
        subject: AuthResponses.nodemailer.subject,
        html: forgotMessage(`${url}/${token}`)
      })
      if (sendEmail)
        return sendEmail
    }
  }

  public checkPasswordExpire = async (token: string) => {
    const checkToken = await this.AuthService.checkPasswordExpire(token)
    if (checkToken)
      return checkToken
  }

  public resetPassword = async (token: string, password: string) => {
    const changedPass = await this.AuthService.resetPassword(token, password)
    if (changedPass)
      return changedPass
  }
}
