import { User } from '../../../app/components/user/domain/user.entity'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
