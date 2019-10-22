import { Mapper } from 'ts-simple-automapper'
import { Pokedex, PokedexDTO } from '../pokedex.providers'

export class PokedexMapper {
  constructor(private PokedexRepository: any) {}

  public mapToDTO(from: any): PokedexDTO {
    const pokedexDTO: PokedexDTO = new Mapper().map(from, new PokedexDTO())
    return pokedexDTO
  }

  public mapToEntity = async (from: any): Promise<Pokedex> =>
    await this.PokedexRepository.create(from)

  public mapListToDTO(pokedexs: Pokedex[]): PokedexDTO[] {
    return pokedexs.map(pokedex => this.mapToDTO(pokedex))
  }
}
