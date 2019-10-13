import { MapProp } from 'ts-simple-automapper'

export class UserDTO {
  @MapProp()
  name: string
  lastname: string
  email: string
  username: string
  picture: string
  birthdate: Date
  city: string
  role: string
  isActive: boolean
}
