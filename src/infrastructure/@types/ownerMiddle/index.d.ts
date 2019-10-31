import { Response, NextFunction, Request } from 'express'

declare global {
  interface ownerMiddleware {
    isOwner(req: Request, res: Response, next: NextFunction): Response|undefined
  }
}
