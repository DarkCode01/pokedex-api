import { Response, Request, NextFunction } from 'express'

declare global {
  interface routeMethod {
    build(props: {
      req: Request,
      res: Response,
      resolve: NextFunction
    }): Promise<NextFunction>
  }
}
