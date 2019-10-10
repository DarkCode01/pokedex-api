import express, { Application } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'

interface IProps {
  routing: any,
  config: config
}

export class App {
  private app: Application
  private port: number
  private routing: any

  constructor({
    routing,
    config
  } : IProps) {
    this.app = express()
    this.port = config.server.port
    this.routing = routing
    this.middlewares()
    this.routes()
  }

  private routes = () => this.app.use(this.routing.build())

  private middlewares() : void {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(compression())
  }

  public async listen(): Promise<void> {
    await this.app.listen(this.port, () => console.log('Running on port', this.port))
  }
}
