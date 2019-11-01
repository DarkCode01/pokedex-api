export class TypeController {
  constructor(private TypeService: any) {}

  /**
  * @description Get a type and return,
  * if it does not find,
  * create a new type.
  *
  * @param {string} name
  * @returns {Promise<Type>}
  */
  public getOrCreateTypes = async (types: string[]) =>
    await this.TypeService.getOrCreateTypes(types)
}
