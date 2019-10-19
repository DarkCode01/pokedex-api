import { Router, Response, Request } from 'express'

// Validators
import {
  createValidator,
  authValidator,
  changePassValidator,
  forgotPassValidator,
  forgotPassExpireValidator,
  resetPassValidator
} from './auth.providers'

export class AuthRoutes {
  private readonly api: Router = Router()

  constructor (
    private AuthController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: ApiCodes,
    private config: config,
    private AuthMiddleware: any
  ) {}

  public get routes(): Router {
    // @Desc    Create user
    // @Access  Public
    this.api.post(
      '/register',
      createValidator as Array<any>,
      this.create
    )

    // @Desc    Authentication
    // @Access  Public
    this.api.post(
      '/auth',
      authValidator as Array<any>,
      this.auth
    )

    // @Desc       Change Password
    // @Access     Private
    // @Namespace  /account
    this.api.put(
      '/account/change_password',
      this.AuthMiddleware.ensureAuth,
      changePassValidator as Array<any>,
      this.changePassword
    )

    // @Desc        Forgot Password
    // @Access      Public
    // @Namespace  /account
    this.api.post(
      '/account/forgot_password',
      forgotPassValidator as Array<any>,
      this.forgotPassword
    )

    // @Desc        Check Password Expire
    // @Access      Public
    // @Namespace  /account
    this.api.get(
      '/account/forgot_password_expire/:token',
      forgotPassExpireValidator as Array<any>,
      this.checkPasswordExpire
    )

    // @Desc        Reset Password
    // @Access      Public
    // @Namespace  /account
    this.api.put(
      '/account/reset_password/:token',
      resetPassValidator as Array<any>,
      this.resetPassword
    )

    return this.api
  }

  public create = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.AuthController.create(req.body)
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
        const user = await this.AuthController.auth(req.body)
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
        const response = await this.AuthController.changePassword(req.user, req.body)
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
        const response = await this.AuthController.forgotPassword({
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

  public checkPasswordExpire = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.AuthController.checkPasswordExpire(req.params.token)
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response, false))
      }, req, res
    })
  }

  public resetPassword = async (req: Request, res: Response) => {
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.AuthController.resetPassword(req.params.token, req.body.password)
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })
  }
}
