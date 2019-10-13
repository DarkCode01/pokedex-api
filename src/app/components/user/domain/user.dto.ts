import { MapProp } from 'ts-simple-automapper'

export class UserDTO {
  @MapProp()
  name: string

  @MapProp()
  lastname: string

  @MapProp()
  email: string

  @MapProp()
  username: string

  @MapProp()
  picture: string

  @MapProp()
  birthdate: Date

  @MapProp()
  city: string

  @MapProp()
  role: string

  @MapProp()
  isActive: boolean
}
