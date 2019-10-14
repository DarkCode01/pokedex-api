import { Mapper } from 'ts-simple-automapper'
import { User, UserDTO } from '../user.providers'

export class UserMapper {
  private _UserRepository: any

  constructor({
    UserRepository
  }: any){
    this._UserRepository = UserRepository
  }

  public mapToDTO(from: any): UserDTO {
    const userDTO: UserDTO = new Mapper().map(from, new UserDTO())
    return userDTO
  }

  public mapToEntity = async (from: any): Promise<User> =>
    await this._UserRepository.create(from)
}
