import { Router } from 'express'

export class Routing implements IRouting {
  public readonly router: Router = Router()
  constructor(
    private config: config,
    private Routes: Array<Router>
  ) {}


  public build() {
    const { prefixRoutes } = this.config.server
    this.Routes.forEach(route => this.router.use(prefixRoutes as string, route))
    return this.router
  }
}
