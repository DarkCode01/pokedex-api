import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { getValidator, updateValidator, disableValidator } from './user.providers'

export class UserRoutes {
  private readonly api: Router = Router()

  constructor (
    private UserController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: statusCodes,
    private AuthMiddleware: any,
    private OwnerMiddleware: any,
  ) {}

  public get routes(): Router {
    /**
    * @description Get List of Users
    * @private
    */
    this.api.get('/users',
      this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner,
      this.list
    )

    /**
    * @description Get and Update User
    * @private
    */
    this.api.route('/user/:username')
      .get(
        getValidator as Array<any>,
        this.AuthMiddleware.ensureAuth,
        this.get
      )
      .put(
        updateValidator as Array<any>,
        this.AuthMiddleware.ensureAuth,
        this.update
      )

    /**
    * @description Toggle user status
    * @private
    */
    this.api.put('/user/toggle_status/:username',
      disableValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner,
      this.toggleStatus
    )

    return this.api
  }

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.get(req.params.username, req.user)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public list: RequestHandler = (req: Request, res: Response) =>
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

  public update: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.update({
          userLogged: req.user,
          username: req.params.username,
          changes: req.body
        })
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public toggleStatus: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.toggleStatus(req.params.username)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })
}
