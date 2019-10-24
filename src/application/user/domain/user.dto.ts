import { MapProp } from 'ts-simple-automapper'

export class UserDTO {
  @MapProp()
  id: number

  @MapProp()
  uuid: string

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
  gender: {}

  @MapProp()
  city: string

  @MapProp()
  role: string

  @MapProp()
  isActive: boolean
}
