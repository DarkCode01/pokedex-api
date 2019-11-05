import { Type } from './domain/type.entity'

export class TypeController implements ITypeController {
  constructor(private TypeService: ITypeService) {}

  /**
  * @description Get a type and return,
  * if it does not find,
  * create a new type.
  *
  * @param {string} name
  * @returns {Promise<Type>}
  */
  public getOrCreateTypes = async (types: string[]): Promise<Type[]> =>
    await this.TypeService.getOrCreateTypes(types)
}
