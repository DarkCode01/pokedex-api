import { Router } from 'express'

interface IProps {
  config: config,
  Routes: Array<Router>
}

export class Routing {
  public readonly router: Router
  private Routes: Array<Router>
  private readonly config: config

  constructor({
    config,
    Routes
  }: IProps){
    this.config = config
    this.Routes = Routes
    this.router = Router()
  }


  public build() {
    const { prefixRoutes } = this.config.server
    this.Routes.forEach(route => this.router.use(<any>prefixRoutes, route))
    return this.router
  }
}
