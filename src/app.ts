import express, { Application } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'

export class App {
  private app: Application = express()
  private port: number

  constructor (
    private routing: IRouting,
    private config: config
  ) {
    this.port = this.config.server.port
    this.routing = routing
    this.middlewares()
    this.routes()
  }

  private routes = () => this.app.use(this.routing.build())

  private middlewares(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(compression())
  }

  public listen = async () =>
    await this.app.listen(this.port, () => console.log('Running on port', this.port))

}
