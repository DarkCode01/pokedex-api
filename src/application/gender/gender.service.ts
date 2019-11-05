import { Gender } from './gender.providers'

export class GenderService implements IGenderService {
  constructor(
    private GenderMapper: any,
    private GenderRepository: IGenderRepository
  ) {}

  public getOrCreateGender = async (genderName: string) : Promise<Gender> => {
    let gender = await this.GenderRepository.getGenderByName(genderName)

    if (!gender) {
      const newGender = await this.GenderMapper.mapToEntity(genderName)
      gender = await this.GenderRepository.saveGender(newGender)
    }

    return gender
  }
}
