import { Router, Response, Request } from 'express'
import { validationResult } from 'express-validator'

// Validators
import { createIsValid } from './utils/user.validator'

interface IProps {
  UserController: any,
  codes: ApiCodes,
  ResponseHandler: any
}

export class UserRoutes {
  readonly api: Router
  private codes: ApiCodes
  private ResponseHandler: any
  private UserController: any

  constructor({
    UserController,
    ResponseHandler,
    codes
  }: IProps) {
    this.api = Router()
    this.codes = codes
    this.UserController = UserController
    this.ResponseHandler = ResponseHandler
  }

  public get routes(): Router {
    // @Desc    Create user
    // @Access  Public
    this.api.post('/register', createIsValid, this.create)

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
          .status(this.codes.OK)
          .send(this.ResponseHandler.build(user, false))

    } catch (err) {
      return res
        .status(err.statusCode || this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build(err.message))
    }
  }
}
