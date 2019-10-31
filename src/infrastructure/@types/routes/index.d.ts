import { Router } from 'express'

declare global {
  interface routing {
    readonly router: Router
    build(): Router
  }
}
