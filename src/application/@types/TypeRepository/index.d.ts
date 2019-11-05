import { Type } from '@app/type/type.providers'

declare global {
  interface ITypeRepository {
    create(type: any): Promise<Type>

    getTypeByName(name: string): Promise<Type|undefined>

    saveType(type: Type): Promise<Type>

    search(searchTerms: string): Promise<Type[]>
  }
}
