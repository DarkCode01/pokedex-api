import { Router, Response, Request } from 'express'

// Validators
import { createValidator, authValidator, changePassValidator } from './user.providers'

export class UserRoutes {
  private readonly api: Router = Router()

  constructor (
    private UserController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: any,
    private config: config,
    private AuthMiddleware: any
  ) {}

  public get routes(): Router {
    // @Desc    Create user
    // @Access  Public
    this.api.post('/register', createValidator as any, this.create)

    // @Desc    Authentication
    // @Access  Public
    this.api.post('/auth', authValidator as any, this.auth)

    // @Desc    Change Password
    // @Access  Private
    this.api.put(
      '/change-password',
      this.AuthMiddleware.ensureAuth,
      changePassValidator as any,
      this.changePassword
    )

    // @Desc    Forgot Password
    // @Access  Public
    this.api.post('/forgot-password', this.forgotPassword)

    return this.api
  }

  public create = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.create(req.body)
        if (user)
          return res
            .status(this.codes.CREATE)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })
  }

  public auth = (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.UserController.auth(req.body)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })
  }

  public changePassword = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.UserController.changePassword(req.user, req.body)
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })
  }

  public forgotPassword = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.UserController.forgotPassword({
          email: req.body.email,
          protocol: req.protocol,
          host: req.get('host'),
          prefixRoutes: this.config.server.prefixRoutes,
          path: '/reset_password'
        })
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })
  }
}
