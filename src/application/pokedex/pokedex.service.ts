import { Pokedex, PokedexResponses } from './pokedex.providers'
import { AuthResponses } from '@app/auth/auth.providers'
import { UserDTO, Roles, UserResponses } from '@app/user/user.providers'
import { PokemonDTO } from '@app/pokemon/pokemon.providers'

export class PokedexService implements IPokedexService {
  constructor(
    private UserRepository: any,
    private PokedexMapper: IMapper,
    private PokedexRepository: any,
    private PokemonRepository: IPokemonRepository,
    private PokemonMapper: any,
    private ErrorHandler: errorHandler,
    private codes: statusCodes,
  ) {}

  public create = async (userId: number): Promise<Pokedex> => {
    const user = await this.UserRepository.getById(userId)
    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.auth.accountDoesNotExist
      })

    const pokedex = await this.PokedexMapper.mapToEntity({ user })
    return await this.PokedexRepository.save(pokedex)
  }

  public get = async (userId: number, userLogged: UserDTO): Promise<Pokedex> => {
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      let pokedex = await this.PokedexRepository.getByUserId(userId)
      if (!pokedex) pokedex = await this.create(userId)

      return pokedex
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public list = async (props: {
    userId: number,
    userLogged: UserDTO,
    perPage: number,
    page: number,
  }): Promise<{
    pokemons: PokemonDTO[],
    allPokemons: number,
    pages: number,
  }> => {
    const { page, perPage, userLogged, userId } = props
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      let pokedex: Pokedex = await this.PokedexRepository.getByUserId(userId)
      if (!pokedex) pokedex = await this.create(userId)

      const pokemons: any = await this.PokemonRepository.list({
        page,
        perPage,
        pokedexId: pokedex.id
      })
      if (!pokemons && !pokemons.rows)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokedexResponses.noRecords
        })

      const mapListToDTO = this.PokemonMapper.mapListToDTO(pokemons.rows)
      return {
        pokemons: mapListToDTO,
        allPokemons: pokemons.allPokemons,
        pages: pokemons.pages
      }
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public toggleStatus = async (userId: number): Promise<string> => {
    const pokedex = await this.PokedexRepository.getByUserId(userId)
    if (!pokedex)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokedexResponses.pokedexDoesNotExist
      })

    const update = await this.PokedexRepository.update(pokedex, { isActive: !pokedex.isActive })
    if (update)
      await this.PokedexRepository.save(pokedex)
    return update.isActive ? PokedexResponses.active : PokedexResponses.disable
  }

  public delete = async (userId: number): Promise<string> => {
    const pokedex = await this.PokedexRepository.getByUserId(userId)
    if (!pokedex)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokedexResponses.pokedexDoesNotExist
      })
    await this.PokedexRepository.delete(pokedex)
    return PokedexResponses.delete
  }
}
