import { Type } from '@app/type/type.providers'

declare global {
  interface ITypeController {
    getOrCreateTypes(types: string[]): Promise<Type[]>
  }
}
