import { Gender } from '../gender.providers'

export class GenderMapper {
  private _GenderRepository: any

  constructor({
    GenderRepository
  }: any){
    this._GenderRepository = GenderRepository
  }

  public mapToEntity = async (name: string): Promise<Gender> =>
    await this._GenderRepository.create({ name })
}
