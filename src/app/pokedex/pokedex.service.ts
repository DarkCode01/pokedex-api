import { PokedexDTO, PokedexResponses } from './pokedex.providers'

export class PokedexService {
  constructor(
    private PokedexMapper: any,
    private PokedexRepository: any,
    private ErrorHandler: any,
    private codes: ApiCodes,
  ) {}

  public get = async (pokedexname: string, _pokedex: PokedexDTO) => {
    /* if (_pokedex.user === pokedexname || _pokedex.role === Roles.owner) {
      const pokedex = await this.PokedexRepository.getPokedexByPokedexname(pokedexname)
      if (!pokedex)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokedexResponses.pokedexNotFound
        })

      return await this.PokedexMapper.mapToDTO(pokedex)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: PokedexResponses.unauthorized
    }) */
  }

  public list = async (props: {
    perPage: number,
    page: number,
  }) : Promise <{
    pokedexs: PokedexDTO[],
    allPokedexs: number,
    pages: number,
  }> => {
    const { page, perPage } = props
    const pokedexs = await this.PokedexRepository.getAll({
      page,
      perPage,
    })
    if (!pokedexs && !pokedexs.rows)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokedexResponses.noRecords
      })

    const mapListToDTO = this.PokedexMapper.mapListToDTO(pokedexs.rows)
    return {
      pokedexs: mapListToDTO,
      allPokedexs: pokedexs.allPokedexs,
      pages: pokedexs.pages
    }
  }
}
