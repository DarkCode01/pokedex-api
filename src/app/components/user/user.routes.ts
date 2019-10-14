import { Router, Response, Request } from 'express'
import { validationResult } from 'express-validator'

// Validators
import { createValidator, authValidator, changePassValidator } from './user.providers'

export class UserRoutes {
  readonly api: Router
  private codes: ApiCodes
  private ResponseHandler: any
  private UserController: any

  constructor({
    UserController,
    ResponseHandler,
    codes
  }: any) {
    this.api = Router()
    this.codes = codes
    this.UserController = UserController
    this.ResponseHandler = ResponseHandler
  }

  public get routes(): Router {
    // @Desc    Create user
    // @Access  Public
    this.api.post('/register', <any>createValidator, this.create)

    // @Desc    Authentication
    // @Access  Public
    this.api.post('/auth', <any>authValidator, this.auth)

    // @Desc    Change Password
    // @Access  Private
    this.api.put('/change-password', <any>changePassValidator, this.changePassword)

    return this.api
  }

  public create = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res
        .status(this.codes.BAD_REQUEST)
        .send(this.ResponseHandler.build(errors.array(), false))

    try {
      const user = await this.UserController.create(req.body)
      if (user)
        return res
          .status(this.codes.CREATE)
          .send(this.ResponseHandler.build(user, false))

    } catch (err) {
      return res
        .status(err.statusCode || this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build(err.message))
    }
  }

  public auth = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res
        .status(this.codes.BAD_REQUEST)
        .send(this.ResponseHandler.build(errors.array(), false))

    try {
      const user = await this.UserController.auth(req.body)
      if (user)
        return res
          .status(this.codes.OK)
          .send(this.ResponseHandler.build(user, false))

    } catch (err) {
      return res
        .status(err.statusCode || this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build(err.message))
    }
  }

  public changePassword = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res
        .status(this.codes.BAD_REQUEST)
        .send(this.ResponseHandler.build(errors.array(), false))

    try {
      const response = await this.UserController.changePassword(req.user, req.body)
      if (response)
        return res
          .status(this.codes.OK)
          .send(this.ResponseHandler.build(response))

    } catch (err) {
      return res
        .status(err.statusCode || this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build(err.message))
    }
  }
}
