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
    * @description Get List of Pokedexs
    * @private
    */
    this.api.get('/pokedexs',
      this.AuthMiddleware.ensureAuth,
      this.OwnerMiddleware.isOwner,
      this.list
    )

    /**
    * @description Get Pokedex
    * @private
    */
    this.api.get('/pokedex/:uuid',
      getValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    return this.api
  }

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokedex = await this.PokedexController.get(req.params.pokedexname, req.user)
        if (pokedex)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokedex, false))
      }, req, res
    })

  public list: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const pokedexs = await this.PokedexController.list({
          perPage,
          page,
        })
        if (pokedexs)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokedexs, false))
      }, req, res
    })
}
