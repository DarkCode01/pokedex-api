export class GenderController {
  private _GenderService: any

  constructor({
    GenderService
  }: any) {
    this._GenderService = GenderService
  }

  public getOrCreateGender = async (name: string) => {
    const _gender = await this._GenderService.getOrCreateGender(name)
    if (_gender)
      return _gender
  }
}
