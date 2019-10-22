import { UserDTO } from './user.providers'

export class UserController {
  constructor(
    private UserService: any,
  ) {}

  /**
  * @description Get User info
  *
  * @param {string} username
  * @param {UserDTO} user
  * @returns {Promise<UserDTO>}
  */
  public get = async (username: string, user: UserDTO): Promise<UserDTO> =>
    await this.UserService.get(username, user)

  /**
  * @description Get list of users
  * @private
  * @param {paginate} query
  * @returns {Promise<UserDTO[]>}
  */
  public list = async (query: {
    perPage: number,
    page: number,
  }): Promise<UserDTO[]> => await this.UserService.list(query)

  /**
  * @description Update user info
  * @param {updatePayload} query
  * @returns {Promise<UserDTO>}
  */
  public update = async (query: {
    username: string,
    userLogged: UserDTO,
    changes: UserDTO
  }): Promise<UserDTO> => await this.UserService.update(query)

  /**
  * @description Change user status
  * @example true to false \ false to true
  * @param {string} username
  * @returns {Promise<string>}
  */
  public toggleStatus = async (username: string): Promise<string> =>
    await this.UserService.toggleStatus(username)

  /**
  * @description Upload user picture
  * @param {uploadPayload} query
  * @returns {Promise<UserDTO>}
  */
  public upload = async (query: {
    username: string,
    userLogged: UserDTO,
    picture: string,
  }): Promise<UserDTO> => await this.UserService.upload(query)

  /**
  * @description Get user picture
  * @param {string} picture
  */
  public picture = (picture: string) =>
    this.UserService.picture(picture)

  /**
  * @description Delete user by username
  * @param {string} username
  * @returns {Promise<string>}
  */
  public delete = async (username: string) =>
    await this.UserService.delete(username)
}
