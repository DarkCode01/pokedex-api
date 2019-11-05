import { Type } from '@app/type/type.providers'

declare global {
  interface ITypeService {
    create(name: string): Promise<Type>

    getOrCreateTypes(types: string[]): Promise<Type[]>
  }
}
