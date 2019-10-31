import jwt, { Secret } from 'jsonwebtoken'
import { UserDTO } from '@app/user/user.providers'

declare global {
  interface IJWT {
    verifyToken(token: string): Promise<UserDTO|any>
    generateToken(user: any): Promise<UserDTO|any>
  }
}
