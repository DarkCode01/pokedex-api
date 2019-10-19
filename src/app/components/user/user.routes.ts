import { Router, Response, Request } from 'express'

// Validators
import { getValidator } from './user.providers'

export class UserRoutes {
  private readonly api: Router = Router()

  constructor (
    private UserController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: ApiCodes,
    private AuthMiddleware: any
  ) {}

  public get routes(): Router {
    // @Desc        Get User
    // @Access      Private
    this.api.get('/:username',
      getValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    return this.api
  }

  public get = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.get(req.params.username, req.user)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })
  }

}
