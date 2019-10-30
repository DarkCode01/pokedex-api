import { PokedexDTO, PokedexResponses } from './pokedex.providers'
import { AuthResponses } from '@app/auth/auth.providers'
import { UserDTO, Roles, UserResponses } from '@app/user/user.providers'

export class PokedexService {
  constructor(
    private UserRepository: any,
    private PokedexMapper: any,
    private PokedexRepository: any,
    private ErrorHandler: errorHandler,
    private codes: statusCodes,
  ) {}

  public create = async (userId: number) => {
    const user = await this.UserRepository.getById(userId)
    if (!user)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: AuthResponses.auth.accountDoesNotExist
      })

    const pokedex = await this.PokedexMapper.mapToEntity({ user })
    const saved = await this.PokedexRepository.save(pokedex)
    if (saved) return saved
  }

  public get = async (userId: number, userLogged: UserDTO) => {
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
}
