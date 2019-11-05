import { Mapper } from 'ts-simple-automapper'
import { Pokemon, PokemonDTO } from '../pokemon.providers'

export class PokemonMapper implements IMapper {
  constructor(private PokemonRepository: IPokemonRepository) {}

  public mapToDTO(from: any): PokemonDTO {
    const pokemonDTO: PokemonDTO = new Mapper().map(from, new PokemonDTO())
    return pokemonDTO
  }

  public mapToEntity = async (from: any): Promise<Pokemon> => {
    const pokemon = await this.PokemonRepository.create(from)
    const { latitude: lat, longitude: long, height, weight } = from
    pokemon.location = { lat, long }
    pokemon.proportions = { height, weight }
    return pokemon
  }

  public mapListToDTO(pokemons: Pokemon[]): PokemonDTO[] {
    return pokemons.map(pokemon => this.mapToDTO(pokemon))
  }
}
