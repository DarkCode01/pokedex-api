import { Router } from 'express'

declare global {
  interface IRouting {
    readonly router: Router
    build(): Router
  }
}
