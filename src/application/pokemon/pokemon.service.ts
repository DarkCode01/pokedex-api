import { Pokemon } from './pokemon.providers'
import { UserDTO } from '../user/user.providers'
import { Pokedex } from '../pokedex/pokedex.providers'

export class PokemonService {
  constructor(
    private PokemonMapper: any,
    private PokemonRepository: any,
    private PokedexService: any,
  ) {}

  public create = async (pokemonPayload: any, userLogged: UserDTO) => {
    const pokedex: Pokedex = await this.PokedexService.get(userLogged.id, userLogged)
    const pokemon: Pokemon = await this.PokemonMapper.mapToEntity(pokemonPayload)
    pokemon.pokedex = pokedex

    const saved = await this.PokemonRepository.save(pokemon)
    if (saved)
      return this.PokemonMapper.mapToDTO(saved)
  }
}
