import { PokemonDTO, PokemonResponses } from './pokemon.providers'
import { AuthResponses } from '../auth/auth.providers'
import { UserDTO, Roles, UserResponses } from '../user/user.providers'

export class PokemonService {
  constructor(
    private UserRepository: any,
    private PokemonMapper: any,
    private PokemonRepository: any,
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

    const pokemon = await this.PokemonMapper.mapToEntity({ user })
    const saved = await this.PokemonRepository.save(pokemon)
    if (saved)
      return this.PokemonMapper.mapToDTO(saved)
  }

  public get = async (userId: number, userLogged: UserDTO) => {
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      let pokemon = await this.PokemonRepository.getByUserId(userId)
      if (!pokemon) pokemon = await this.create(userId)

      return this.PokemonMapper.mapToDTO(pokemon)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }
}
