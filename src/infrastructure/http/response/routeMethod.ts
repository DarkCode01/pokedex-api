import { validationResult } from 'express-validator'

export class RouteMethod implements routeMethod {
  constructor(
    private ResponseHandler: responseHandler,
    private codes: statusCodes
  ) {}

  public async build({ req, res, resolve }: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res
        .status(this.codes.BAD_REQUEST)
        .send(this.ResponseHandler.build(errors.array(), false))

    try {
      await resolve()
    } catch (err) {
      return res
        .status(err.statusCode || this.codes.INTERNAL_ERROR)
        .send(this.ResponseHandler.build(err.message))
    }
  }
}
