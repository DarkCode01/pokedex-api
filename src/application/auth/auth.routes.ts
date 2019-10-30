import { Router, Response, Request, RequestHandler } from 'express'

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
    private ResponseHandler: responseHandler,
    private RouteMethod: any,
    private codes: statusCodes,
    private config: config,
    private AuthMiddleware: any
  ) {}

  public get routes(): Router {
    /**
    * @description Create User
    * @public
    */
    this.api.post(
      '/register',
      createValidator as Array<any>,
      this.create
    )

    /**
    * @description Authentication
    * @public
    */
    this.api.post(
      '/auth',
      authValidator as Array<any>,
      this.auth
    )

    /**
    * @description Change Password
    * @namespace  /account
    * @private
    */
    this.api.put(
      '/account/change_password',
      this.AuthMiddleware.ensureAuth,
      changePassValidator as Array<any>,
      this.changePassword
    )

    /**
    * @description Forgot Password
    * @namespace  /account
    * @public
    */
    this.api.post(
      '/account/forgot_password',
      forgotPassValidator as Array<any>,
      this.forgotPassword
    )

    /**
    * @description Check Password Expire
    * @namespace  /account
    * @public
    */
    this.api.get(
      '/account/forgot_password_expire/:token',
      forgotPassExpireValidator as Array<any>,
      this.checkPasswordExpire
    )

    /**
    * @description Reset Password
    * @namespace  /account
    * @public
    */
    this.api.put(
      '/account/reset_password/:token',
      resetPassValidator as Array<any>,
      this.resetPassword
    )

    return this.api
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.AuthController.create(req.body)
        if (user)
          return res
            .status(this.codes.CREATE)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public auth: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const user = await this.AuthController.auth(req.body)
        if (user)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(user, false))
      }, req, res
    })

  public changePassword: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.AuthController.changePassword(req.user, req.body)
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })

  public forgotPassword: RequestHandler = (req: Request, res: Response) =>
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

  public checkPasswordExpire: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.AuthController.checkPasswordExpire(req.params.token)
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response, false))
      }, req, res
    })

  public resetPassword: RequestHandler = (req: Request, res: Response) =>
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
