import { Gender } from './domain/gender.entity'

export class GenderController implements IGenderController {
  constructor(private GenderService: IGenderService) {}

  /**
  * @description Get a gender and return, if it does not find,
  * create a new gender if it meets the enum of established genders.
  *
  * @param {string} name
  * @returns {Promise<Gender>}
  */
  public getOrCreateGender = async (name: string): Promise<Gender> =>
    await this.GenderService.getOrCreateGender(name)
}
