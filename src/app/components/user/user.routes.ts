import { Router, Response, Request } from 'express'

// Validators
import { getValidator, Roles } from './user.providers'

export class UserRoutes {
  private readonly api: Router = Router()

  constructor (
    private UserController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: ApiCodes,
    private AuthMiddleware: any,
    private OwnerMiddleware: any,
  ) {}

  public get routes(): Router {
    // @Desc        Get List of Users
    // @Access      Private
    this.api.get('/users',
      this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner,
      this.list
    )

    // @Desc        Get User
    // @Access      Private
    this.api.get('/user/:username',
      getValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    return this.api
  }

  public get = async (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.get(req.params.username, req.user)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public list = async (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const users = await this.UserController.list({
          perPage,
          page,
        })
        if (users)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(users, false))
      }, req, res
    })
}
