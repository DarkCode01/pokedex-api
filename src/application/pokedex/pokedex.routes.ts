import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { getValidator } from './pokedex.providers'

export class PokedexRoutes {
  private readonly api: Router = Router()

  constructor (
    private PokedexController: any,
    private ResponseHandler: responseHandler,
    private RouteMethod: routeMethod,
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
      getValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    /**
    * @description Toggle pokedex status
    * @private
    */
    this.api.put('/:userId/pokedex/toggle_status',
      getValidator as Array<any>,
      [
        this.AuthMiddleware.ensureAuth,
        this.OwnerMiddleware.isOwner,
      ],
      this.toggleStatus
    )

    return this.api
  }

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokedex = await this.PokedexController.get(req.params.userId, req.user)
        if (pokedex)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokedex, false))
      }, req, res
    })

  public toggleStatus: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokedex = await this.PokedexController.toggleStatus(req.params.userId)
        if (pokedex)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokedex, false))
      }, req, res
    })
}
