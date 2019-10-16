export class GenderController {
  constructor(private GenderService: any) {}

  public getOrCreateGender = async (name: string) => {
    const _gender = await this.GenderService.getOrCreateGender(name)
    if (_gender)
      return _gender
  }
}
