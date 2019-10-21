import { Gender } from '../gender.providers'

export class GenderMapper {
  constructor(private GenderRepository: any) {}

  public mapToEntity = async (name: string): Promise<Gender> =>
    await this.GenderRepository.create({ name })
}
