export class GenderController {
  constructor(private GenderService: any) {}

  /**
  * @description Get a gender and return, if it does not find,
  * create a new gender if it meets the enum of established genders.
  *
  * @param {string} name
  * @returns {Promise<Gender>}
  */
  public getOrCreateGender = async (name: string) =>
    await this.GenderService.getOrCreateGender(name)
}
