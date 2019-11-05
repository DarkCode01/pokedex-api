import slugify from '@sindresorhus/slugify'
import path from 'path'
import fs from 'fs'

import { Pokemon,  PokemonDTO, PokemonResponses } from './pokemon.providers'
import { UserDTO, Roles, UserResponses } from '@app/user/user.providers'
import { Pokedex } from '@app/pokedex/pokedex.providers'
import { Type } from '@app/type/type.providers'

export class PokemonService {
  constructor(
    private PokemonMapper: IMapper,
    private PokemonRepository: IPokemonRepository,
    private PokedexService: any,
    private TypeController: any,
    private ErrorHandler: errorHandler,
    private codes: statusCodes,
    private deleteUploadedFiles: any,
  ) {}

  public create = async (pokemonPayload: any, userLogged: UserDTO) => {
    const pokedex: Pokedex = await this.PokedexService.get(userLogged.id, userLogged)
    const pokemon: Pokemon = await this.PokemonMapper.mapToEntity(pokemonPayload)
    const type: Type[] = await this.TypeController.getOrCreateTypes(pokemonPayload.type)
    pokemon.slug = slugify(pokemon.name)
    pokemon.pokedex = pokedex
    pokemon.type = type
    const isPokemon = await this.PokemonRepository.getBySlug({
      slug: pokemon.slug,
      pokedexId: pokedex.id,
    })
    if (isPokemon)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokemonResponses.isRegistered
      })

    if (!pokemon.slug)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: PokemonResponses.invalidName
      })

    const saved = await this.PokemonRepository.save(pokemon)
    if (saved)
      return this.PokemonMapper.mapToDTO(saved)
  }

  public get = async (props: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
  }): Promise<PokemonDTO> => {
    const { userId, userLogged, slug } = props
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      const pokedex: Pokedex = await this.PokedexService.get(userId, userLogged)
      const pokemon = await this.PokemonRepository.getBySlug({
        slug,
        pokedexId: pokedex.id,
      })
      if (!pokemon)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokemonResponses.pokemonNotFound
        })

      return await this.PokemonMapper.mapToDTO(pokemon)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public delete = async (props: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
  }): Promise<PokemonDTO> => {
    const { userId, userLogged, slug } = props
    if (userLogged.id === userId || userLogged.role === Roles.owner) {
      const pokedex: Pokedex = await this.PokedexService.get(userId, userLogged)
      const pokemon = await this.PokemonRepository.getBySlug({
        slug,
        pokedexId: pokedex.id,
      })
      if (!pokemon)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokemonResponses.pokemonNotFound
        })

      const deleteThisPokemon = await this.PokemonRepository.delete(pokemon)
      if (deleteThisPokemon)
        return PokemonResponses.delete
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public upload = async (props: {
    userId: number,
    userLogged: UserDTO,
    slug: string,
    picture: string,
  }): Promise<PokemonDTO> => {
    const { userId, userLogged, slug, picture } = props
    if (userLogged.id == userId) {
      const pokedex: Pokedex = await this.PokedexService.get(userId, userLogged)
      const pokemon = await this.PokemonRepository.getBySlug({
        slug,
        pokedexId: pokedex.id,
      })
      if (!pokemon)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokemonResponses.pokemonNotFound
        })

      // delete the file from the current user
      this.deleteUploadedFiles(`pokemons/${pokemon.picture}`)

      // Update pokemon picture
      const changePicture = await this.PokemonRepository.update(pokemon, { picture })
      if (changePicture)
        await this.PokemonRepository.save(pokemon)
        return this.PokemonMapper.mapToDTO(changePicture)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public picture = (picture: string): string => {
    const findPicture = path.resolve(__dirname, `../../../uploads/pokemons/${picture}`)
    if (fs.existsSync(findPicture)) return findPicture
    else throw this.ErrorHandler.build({
      status: this.codes.BAD_REQUEST,
      msg: UserResponses.picture
    })
  }

  public update = async (props: {
    userId: number,
    userLogged: UserDTO,
    changes: PokemonDTO|any,
    slug: string
  }) => {
    const { userId, slug, userLogged, changes: payload } = props
    const { latitude: lat, longitude: long, height, weight } = payload
    const changes: any = {
      name: payload.name,
      slug: undefined,
      description: payload.description,
      captured: payload.captured,
      type: payload.type,
      location: { lat, long },
      proportions: { height, weight }
    }

    if (
      userLogged.id === userId ||
      userLogged.role === Roles.owner
    ) {
      const pokedex: Pokedex = await this.PokedexService.get(userId, userLogged)
      const pokemon: Pokemon|undefined = await this.PokemonRepository.getBySlug({
        slug,
        pokedexId: pokedex.id,
      })
      if (!pokemon)
        throw this.ErrorHandler.build({
          status: this.codes.BAD_REQUEST,
          msg: PokemonResponses.pokemonNotFound
        })

      if (changes.name) {
        const generateSlug = slugify(changes.name)
        if (generateSlug !== pokemon.slug) {
          const isPokemon = await this.PokemonRepository.getBySlug({
            slug: generateSlug,
            pokedexId: pokedex.id,
          })
          if (isPokemon)
            throw this.ErrorHandler.build({
              status: this.codes.BAD_REQUEST,
              msg: PokemonResponses.isRegistered
            })
          changes.slug = generateSlug
        }
      }

      if (changes.type)
        pokemon.type = await this.TypeController.getOrCreateTypes(changes.type)

      const update = await this.PokemonRepository.update(pokemon, { ...changes, type: undefined })
      if (update)
        await this.PokemonRepository.save(pokemon)
        return this.PokemonMapper.mapToDTO(update)
    }

    throw this.ErrorHandler.build({
      status: this.codes.UNAUTHORIZED,
      msg: UserResponses.unauthorized
    })
  }

  public search = async (props: {
    userLogged: UserDTO,
    perPage: number,
    page: number,
    searchTerms: string,
  }): Promise <{
    pokemons: PokemonDTO[],
    allPokemons: number,
    pages: number,
  }> => {
    const { page, perPage, searchTerms, userLogged } = props
    const pokedex: Pokedex = await this.PokedexService.get(userLogged.id, userLogged)
    const pokemons: any = await this.PokemonRepository.search({
      page,
      perPage,
      searchTerms,
      pokedexId: pokedex.id
    })
    if (!pokemons && !pokemons.rows)
      throw this.ErrorHandler.build({
        status: this.codes.BAD_REQUEST,
        msg: UserResponses.noRecords
      })

    const mapListToDTO = this.PokemonMapper.mapListToDTO(pokemons.rows)
    return {
      pokemons: mapListToDTO,
      allPokemons: pokemons.allPokemons,
      pages: pokemons.pages
    }
  }
}
