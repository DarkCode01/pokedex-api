import { Response, NextFunction, Request } from 'express'

export class AuthMiddleware {
  constructor(
    private JWT: any,
    private ResponseHandler: any,
    private codes: ApiCodes
  ) {}

  public ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.get('authorization')
      if (!token)
        return res
        .status(this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build('The request does not have the authorization headers.'))

      const isValidToken = await this.JWT.verifyToken(token)
      if (isValidToken)
        req.user = isValidToken.user
        next()

    } catch (e) {
      return res
        .status(this.codes.UNAUTHORIZED)
        .send(this.ResponseHandler.build('An error occurred with the token verification.'))
    }
  }
}
