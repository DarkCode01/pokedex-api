import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { getValidator } from './pokedex.providers'

export class PokedexRoutes implements IRoutes {
  readonly api: Router = Router()

  constructor (
    private PokedexController: any,
    private ResponseHandler: responseHandler,
    private RouteMethod: routeMethod,
    private codes: statusCodes,
    private AuthMiddleware: authMiddleware,
    private OwnerMiddleware: ownerMiddleware,
  ) {}

  public get routes(): Router {
    /**
    * @description Get Pokedex
    * @private
    */
    this.api.route('/:userId/pokedex')
      .get(
        getValidator as Array<any>,
        this.AuthMiddleware.ensureAuth,
        this.list
      )
      .delete(
        getValidator as Array<any>,
        [
          this.AuthMiddleware.ensureAuth,
          this.OwnerMiddleware.isOwner
        ],
        this.delete
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

  public list: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const pokedex = await this.PokedexController.list({
          userId: req.params.userId,
          userLogged: req.user,
          perPage,
          page,
        })
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

  public delete: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const deleted = await this.PokedexController.delete(req.params.userId)
        if (deleted)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(deleted))
      }, req, res
    })
}
