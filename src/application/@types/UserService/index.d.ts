import { UserDTO } from '@app/user/user.providers'

declare global {
  interface IUserService {
    get(username: string, userLogged: UserDTO) : Promise<UserDTO>

    list(props: {
      perPage: number,
      page: number,
    }) : Promise <{
      users: UserDTO[],
      allUsers: number,
      pages: number,
    }>

    update(props: {
      username: string,
      userLogged: UserDTO,
      changes: UserDTO
    }): Promise<UserDTO>

    toggleStatus(username: string): Promise<string>

    upload(props: {
      username: string,
      userLogged: UserDTO,
      picture: string,
    }): Promise<UserDTO>

    picture(picture: string): string

    delete(username: string): Promise<string>
  }
}
