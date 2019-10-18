import { Router, Response, Request } from 'express'

// Validators
import {  } from './user.providers'

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
    return this.api
  }
}
