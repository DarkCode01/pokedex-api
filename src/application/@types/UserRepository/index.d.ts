import { User } from '@app/user/user.providers'

declare global {
  interface IUserRepository {
    getUserByUsername(username: string): Promise<User|undefined>

    getUserByEmail(email: string): Promise<User|undefined>

    getById(id: number): Promise<User|undefined>

    getAll(query: {
      page: number,
      perPage: number,
    }): Promise<{
      rows: User[],
      allUsers: number,
      pages: number
    }>

    saveUser(user: User): Promise<User>

    delete(user: User): Promise<User>

    update(user: User, update: {}): Promise<User>
  }
}
