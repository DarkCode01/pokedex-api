import { User } from '../../../app/components/user/domain/entity'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
