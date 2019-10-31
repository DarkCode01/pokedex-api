import { Response, NextFunction, Request } from 'express'

declare global {
  interface authMiddleware {
    ensureAuth(req: Request, res: Response, next: NextFunction): Promise<Response|undefined>
  }
}
