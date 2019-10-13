import { User, UserDTO } from '../user.providers'

interface IProps {
  UserRepository: any
}
export class UserMapper {
  _UserRepository: any

  constructor({
    UserRepository
  }: IProps){
    this._UserRepository = UserRepository
  }

  public mapToDTO(from: any): UserDTO {
    const userDTO = new UserDTO()
    if (from)
      userDTO.name = from.name
      userDTO.email = from.email
      return userDTO
  }

  public mapToEntity = async (from: any): Promise<User> =>
    await this._UserRepository.create(from)
}
