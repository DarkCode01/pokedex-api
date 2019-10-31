import { UserDTO, User } from '@app/user/user.providers'

declare global {
  interface IAuthService {
    create(userPayload: any): Promise<UserDTO>

    auth(userPayload: any): Promise<UserDTO>

    changePassword(props: {
      username: string,
      password: string,
      newPassword: string
    }): Promise<string>

    forgotPassword(email: string): Promise<string>

    checkPasswordExpire(token: string): Promise<User>

    resetPassword(token: string, password: string): Promise<void>
  }
}
