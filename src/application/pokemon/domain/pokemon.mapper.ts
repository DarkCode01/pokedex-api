import { Mapper } from 'ts-simple-automapper'
import { Pokemon, PokemonDTO } from '../pokemon.providers'

export class PokemonMapper {
  constructor(private PokemonRepository: any) {}

  public mapToDTO(from: any): PokemonDTO {
    const pokemonDTO: PokemonDTO = new Mapper().map(from, new PokemonDTO())
    return pokemonDTO
  }

  public mapToEntity = async (from: any): Promise<Pokemon> =>
    await this.PokemonRepository.create(from)

  public mapListToDTO(pokemons: Pokemon[]): PokemonDTO[] {
    return pokemons.map(pokemon => this.mapToDTO(pokemon))
  }
}
