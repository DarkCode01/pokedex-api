// Helpers
import { Response, NextFunction, Request } from 'express'

export class AuthMiddleware {
  private _jwt: any
  private _codes: ApiCodes
  private _ResponseHandler: any

  constructor({
    JWT,
    ResponseHandler,
    codes
  }: any) {
    this._jwt = JWT
    this._codes = codes
    this._ResponseHandler = ResponseHandler
  }

  public ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.get('authorization')
      if (!token)
        return res
        .status(this._codes.INTERNAL_ERROR)
        .send(this._ResponseHandler.build('The request does not have the authorization headers.'))

      const isValidToken = await this._jwt.verifyToken(token)
      if (isValidToken)
        req.user = isValidToken.user
        next()

    } catch (e) {
      return res
        .status(this._codes.UNAUTHORIZED)
        .send(this._ResponseHandler.build('An error occurred with the token verification.'))
    }
  }
}
