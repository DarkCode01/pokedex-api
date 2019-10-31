import { UserDTO, UserResponses, Roles } from './user.providers'
import path from 'path'
import fs from 'fs'

export class UserService {
  constructor(
    private UserMapper: IMapper,
    private UserRepository: any,
    private GenderController: any,
    private ErrorHandler: errorHandler,
    private codes: statusCodes,
    private deleteUploadedFiles: any,
  ) {}

  public get = async (username: string, userLogged: UserDTO) : Promise<UserDTO> => {
    if (userLogged.username === username || userLogged.role === Roles.owner) {
      const user = await this.UserRepository.getUserByUsername(username)
      if (!user)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: UserResponses.userNotFound
        })

      return await this.UserMapper.mapToDTO(user)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public list = async (props: {
    perPage: number,
    page: number,
  }) : Promise <{
    users: UserDTO[],
    allUsers: number,
    pages: number,
  }> => {
    const { page, perPage } = props
    const users = await this.UserRepository.getAll({
      page,
      perPage,
    })
    if (!users && !users.rows)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.noRecords
      })

    const mapListToDTO = this.UserMapper.mapListToDTO(users.rows)
    return {
      users: mapListToDTO,
      allUsers: users.allUsers,
      pages: users.pages
    }
  }

  public update = async (props: {
    username: string,
    userLogged: UserDTO,
    changes: UserDTO
  }) => {
    const { username, userLogged, changes: payload } = props
    const changes: any = {
      name: payload.name,
      email: payload.email,
      username: payload.username,
      lastname: payload.lastname,
      birthdate: payload.birthdate,
      city: payload.city,
      gender: payload.gender,
      onBoarding: payload.onBoarding,
    }

    if (
      userLogged.username === username ||
      userLogged.role === Roles.owner
    ) {
      const user = await this.UserRepository.getUserByUsername(username)
      if (!user)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: UserResponses.userNotFound
        })

      if (changes.username && changes.username !== user.username) {
        const isUsername = await this.UserRepository.getUserByUsername(changes.username)
        if (isUsername)
          throw this.ErrorHandler.build({
            status: this.codes.BAD_REQUEST,
            msg: UserResponses.usernameExists
          })
      }

      if (changes.gender) {
        const gender = await this.GenderController.getOrCreateGender(changes.gender)
        if (gender) changes.gender = gender
      }

      if (changes.email && changes.email !== user.email) {
        const isEmail = await this.UserRepository.getUserByEmail(changes.email)
        if (isEmail)
          throw this.ErrorHandler.build({
            status: this.codes.BAD_REQUEST,
            msg: UserResponses.emailExists
          })
      }

      const update = await this.UserRepository.update(user, changes)
      if (update)
        await this.UserRepository.saveUser(user)
        return this.UserMapper.mapToDTO(update)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public toggleStatus = async (username: string): Promise<string> => {
    const user = await this.UserRepository.getUserByUsername(username)
    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.userNotFound
      })

    const update = await this.UserRepository.update(user, { isActive: !user.isActive })
    if (update)
      await this.UserRepository.saveUser(user)
    return update.isActive ? UserResponses.active : UserResponses.disable
  }

  public upload = async (props: {
    username: string,
    userLogged: UserDTO,
    picture: string,
  }): Promise<UserDTO> => {
    const { username, userLogged, picture } = props
    if (userLogged.username === username) {
      const user = await this.UserRepository.getUserByUsername(username)
      if (user) {
        // delete the file from the current user
        this.deleteUploadedFiles(`users/${user.picture}`)

        // Update user picture
        const changePicture = await this.UserRepository.update(user, { picture })
        if (changePicture)
          await this.UserRepository.saveUser(user)
          return this.UserMapper.mapToDTO(changePicture)
      }
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public picture = (picture: string): string => {
    const findPicture = path.resolve(__dirname, `../../../uploads/users/${picture}`)
    if (fs.existsSync(findPicture)) return findPicture
    else throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: UserResponses.picture
    })
  }

  public delete = async (username: string) => {
    const user = await this.UserRepository.getUserByUsername(username)
    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.userNotFound
      })

    const deleteThisUser = await this.UserRepository.delete(user)
    if (deleteThisUser)
      return UserResponses.delete
  }
}
