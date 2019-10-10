// Helpers
import { Verify } from '../utils/jwt'
import { Response, NextFunction, Request } from 'express'

const ensureAuth = (req: Request, res: Response, next: NextFunction) => Verify(req, res, next)

const ensureImage = (req: Request, res: Response, next: NextFunction) => Verify(req, res, next, true)

export {
  ensureAuth,
  ensureImage
}