import { User, forgotMessage, UserResponses } from './user.providers'

export class UserController {
  constructor(
    private UserService: any,
    private Email: any
  ) {}

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

  public forgotPassword = async ({
    email,
    protocol,
    host,
    prefixRoutes,
    path
  }: any) => {
    const token = await this.UserService.forgotPassword(email as string)
    if (token) {
      const resetPasswordUrl = `${protocol}://${host}${prefixRoutes}${path}/${token}`
      const sendEmail = await this.Email.build({
        to: email,
        subject: UserResponses.nodemailer.subject,
        html: forgotMessage(resetPasswordUrl)
      })
      if (sendEmail)
        return sendEmail
    }
  }
}
