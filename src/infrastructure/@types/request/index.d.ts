import { UserDTO } from '../../../app/components/user/user.providers'

declare global {
  namespace Express {
    export interface Request {
      user?: UserDTO
    }
  }
}
