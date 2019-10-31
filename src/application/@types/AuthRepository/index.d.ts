import { User } from '@app/user/user.providers'

declare global {
  interface IAuthRepository {
    create(user: User): Promise<User>

    getUserByEmail(email: string): Promise<User|undefined>

    getUserByUsername(username: string): Promise<User|undefined>

    saveUser(user: User): Promise<User>

    update(user: User, update: {}): Promise<User>

    count(): Promise<number>

    getUserByForgotPasswordToken(token: string): Promise<User|undefined>
  }
}
