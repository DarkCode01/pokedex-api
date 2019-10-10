import { UserDTO } from './dto'
import { User } from './entity'

export class UserMapper {
  static mapToDTO(from: any): UserDTO {
    const userDTO = new UserDTO()
    if (from)
      userDTO.name = from.name
      userDTO.email = from.email
      return userDTO
  }

  static mapToUser(from: any): User {
    const {
      name,
      surname,
      email,
      username,
      picture
    } = from
    const user = new User()
    return user
  }
}
