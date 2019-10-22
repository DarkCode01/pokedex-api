import { PokedexDTO } from './pokedex.providers'

export class PokedexController {
  constructor(
    private PokedexService: any,
  ) {}

  public get = async (username: string, user: PokedexDTO) =>
    await this.PokedexService.get(username, user)

  public list = async (query: {
    perPage: number,
    page: number,
  }) => await this.PokedexService.list(query)
}
