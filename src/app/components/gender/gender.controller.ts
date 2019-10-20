export class GenderController {
  constructor(private GenderService: any) {}

  public getOrCreateGender = async (name: string) =>
    await this.GenderService.getOrCreateGender(name)
}
