import { PokedexDTO, PokedexResponses } from './pokedex.providers'
import { AuthResponses } from '../auth/auth.providers'

export class PokedexService {
  constructor(
    private UserRepository: any,
    private PokedexMapper: any,
    private PokedexRepository: any,
    private ErrorHandler: any,
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
    if (saved)
      return this.PokedexMapper.mapToDTO(saved)
  }

  public get = async (userId: number) => {
    let pokedex = await this.PokedexRepository.getByUserId(userId)
    if (!pokedex) pokedex = await this.create(userId)

    return this.PokedexMapper.mapToDTO(pokedex)
  }
}
