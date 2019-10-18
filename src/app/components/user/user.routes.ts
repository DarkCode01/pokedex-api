import { Router, Response, Request } from 'express'

// Validators
import {
  createValidator,
  authValidator,
  changePassValidator
} from './user.providers'

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

    // @Desc       Change Password
    // @Access     Private
    // @Namespace  /account
    this.api.put(
      '/account/change_password',
      this.AuthMiddleware.ensureAuth,
      changePassValidator as any,
      this.changePassword
    )

    // @Desc        Forgot Password
    // @Access      Public
    // @Namespace  /account
    this.api.post(
      '/account/forgot_password',
      this.forgotPassword
    )

    // @Desc        Reset Password
    // @Access      Public
    // @Namespace  /account
    /* this.api.post(
      '/account/reset_password',
      this.resetPassword
    ) */

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
          url: this.config.forgotPass.url,
        })
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })
  }
}
