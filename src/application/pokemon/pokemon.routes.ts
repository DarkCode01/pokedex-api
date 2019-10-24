import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { createValidator } from './pokemon.providers'

export class PokemonRoutes {
  private readonly api: Router = Router()

  constructor (
    private PokemonController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: statusCodes,
    private AuthMiddleware: any,
  ) {}

  public get routes(): Router {
    /**
    * @description Create pokemon
    * @private
    */
    this.api.post('/pokemon',
      createValidator as Array<any>,
      this.AuthMiddleware.ensureAuth,
      this.create
    )

    return this.api
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokemon = await this.PokemonController.create(req.body, req.user)
        if (pokemon)
          return res
            .status(this.codes.CREATE)
            .send(this.ResponseHandler.build(pokemon, false))
      }, req, res
    })
}
