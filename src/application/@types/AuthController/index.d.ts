import { User, UserDTO } from '@app/user/user.providers'

declare global {
  interface IAuthController {
    create(user: User): Promise<UserDTO>
    auth(user: {
      email: string,
      password: string
    }): Promise<UserDTO>

    changePassword(user: UserDTO, payload: any): Promise<string>

    forgotPassword(props: {
      email: string,
      url: string
    }): Promise<string>

    checkPasswordExpire(token: string): Promise<User>

    resetPassword(token: string, password: string): Promise<string>
  }
}
