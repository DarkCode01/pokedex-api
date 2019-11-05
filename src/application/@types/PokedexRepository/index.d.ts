import { Pokedex } from '@app/pokedex/pokedex.providers'

declare global {
  interface IPokedexRepository {
    create(pokedex: Pokedex): Promise<Pokedex>

    getByUserId(userId: number): Promise<Pokedex|undefined>

    save(pokedex: Pokedex): Promise<Pokedex>

    update(pokedex: Pokedex, update: {}): Promise<Pokedex>

    delete(pokedex: Pokedex): Promise<Pokedex>
  }
}
