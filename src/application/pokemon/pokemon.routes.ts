import { Router, Response, Request, RequestHandler } from 'express'

// Validators
import { createValidator, getValidator } from './pokemon.providers'

export class PokemonRoutes {
  private readonly api: Router = Router()

  constructor (
    private PokemonController: any,
    private ResponseHandler: any,
    private RouteMethod: any,
    private codes: statusCodes,
    private AuthMiddleware: any,
    private pokemonPictureMiddleware: any,
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

    /**
    * @description Get, User
    * @private
    */
    this.api.route('/:userId/pokemon/:slug')
      .get(
        getValidator as Array<any>,
        this.AuthMiddleware.ensureAuth,
        this.get
      )
      .delete(
        getValidator as Array<any>,
        this.AuthMiddleware.ensureAuth,
        this.delete
      )

    /**
    * @description Upload Picture
    * @private
    */
    this.api.put('/pokemon_picture/:userId/:slug',
      [
        this.AuthMiddleware.ensureAuth,
        this.pokemonPictureMiddleware
      ],
      this.upload
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

  public get: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokemon = await this.PokemonController.get({
          userId: req.params.userId,
          userLogged: req.user,
          slug: req.params.slug,
        })
        if (pokemon)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokemon, false))
      }, req, res
    })

  public delete: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const response = await this.PokemonController.delete({
          userId: req.params.userId,
          userLogged: req.user,
          slug: req.params.slug,
        })
        if (response)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(response))
      }, req, res
    })

  public upload: RequestHandler = (req: Request, res: Response) =>
    this.RouteMethod.build({
      resolve: async () => {
        const pokemon = await this.PokemonController.upload({
          userId: req.params.userId,
          userLogged: req.user,
          slug: req.params.slug,
          picture: req.file.filename,
        })
        if (pokemon)
          return res
            .status(this.codes.OK)
            .send(this.ResponseHandler.build(pokemon, false))
      }, req, res
    })
}
