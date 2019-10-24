import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { getValidator } from './pokemon.providers'

export class PokemonRoutes {
  private readonly api: Router = Router()

  constructor (
    private PokemonController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: statusCodes,
    private AuthMiddleware: any,
    private OwnerMiddleware: any,
  ) {}

  public get routes(): Router {
    /**
    * @description Get Pokemon
    * @private
    */
    this.api.get('/:userId/pokemon',
      getValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.get
    )

    return this.api
  }

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokemon = await this.PokemonController.get(req.params.userId, req.user)
        if (pokemon)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokemon, false))
      }, req, res
    })
}
