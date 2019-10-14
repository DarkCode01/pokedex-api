import { Gender } from './gender.providers'

export class GenderService {
  private _GenderMapper: any
  private _GenderRepository: any

  constructor({
    GenderMapper,
    GenderRepository
  }: any) {
    this._GenderMapper = GenderMapper
    this._GenderRepository = GenderRepository
  }

  public getOrCreateGender = async (genderName: string) : Promise<Gender> => {
    let gender = await this._GenderRepository.getGenderByName(genderName)

    if (!gender) {
      const newGender = await this._GenderMapper.mapToEntity(genderName)
      gender = await this._GenderRepository.saveGender(newGender)
    }

    return gender
  }
}
