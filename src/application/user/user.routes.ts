import { Router, Response, Request, RequestHandler } from 'express'
import path from 'path'

// Validators
import { getValidator, updateValidator, disableValidator } from './user.providers'

export class UserRoutes implements IRoutes {
  readonly api: Router = Router()

  constructor (
    private UserController: any,
    private ResponseHandler: responseHandler,
    private RouteMethod: routeMethod,
    private codes: statusCodes,
    private AuthMiddleware: any,
    private OwnerMiddleware: any,
    private userPictureMiddleware: any,
  ) {}

  public get routes(): Router {
    /**
    * @description Get List of Users
    * @private
    */
    this.api.get('/users',
      [this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner],
      this.list
    )

    /**
    * @description Get, Update and Delete User
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
      .delete(
        getValidator as Array<any>,
        [
          this.AuthMiddleware.ensureAuth,
          this.OwnerMiddleware.isOwner
        ],
        this.delete
      )

    /**
    * @description Toggle user status
    * @private
    */
    this.api.put('/user/toggle_status/:username',
      disableValidator as Array<any>,
      [this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner],
      this.toggleStatus
    )

    /**
    * @description Upload Picture
    * @private
    */
    this.api.put('/user_picture/:username',
      [this.AuthMiddleware.ensureAuth,
      this.userPictureMiddleware],
      this.upload
    )

    /**
    * @description Get Picture
    * @public
    */
    this.api.get('/user_picture/:picture', this.picture)

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

  public upload: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.upload({
          userLogged: req.user,
          username: req.params.username,
          picture: req.file.filename,
        })
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public picture: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: () => {
        const picture = this.UserController.picture(req.params.picture)
        if (picture) res.sendFile(path.resolve(picture))
      }, req, res
    })

  public delete: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const deleted = await this.UserController.delete(req.params.username)
        if (deleted)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(deleted))
      }, req, res
    })
}
