import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { getValidator } from './pokedex.providers'

export class PokedexRoutes {
  private readonly api: Router = Router()

  constructor (
    private PokedexController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: statusCodes,
    private AuthMiddleware: any,
    private OwnerMiddleware: any,
  ) {}

  public get routes(): Router {
    /**
    * @description Get Pokedex
    * @private
    */
    this.api.get('/:userId/pokedex',
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    return this.api
  }

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokedex = await this.PokedexController.get(req.params.userId)
        if (pokedex)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokedex, false))
      }, req, res
    })
}
