export class TypeController {
  constructor(private TypeService: any) {}

  /**
  * @description Get a type and return, if it does not find,
  * create a new type if it meets the enum of established types.
  *
  * @param {string} name
  * @returns {Promise<Type>}
  */
  public getOrCreateType = async (name: string) =>
    await this.TypeService.getOrCreateType(name)
}
