import { Router } from 'express'

declare global {
  interface IRoutes {
    readonly api: Router
    routes: Router
  }
}
