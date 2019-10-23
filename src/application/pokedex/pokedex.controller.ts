import { PokedexDTO } from './pokedex.providers'

export class PokedexController {
  constructor(
    private PokedexService: any,
  ) {}

  public get = async (userId: number): Promise<PokedexDTO> =>
    await this.PokedexService.get(userId)
}
