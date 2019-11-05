import { Type } from './type.providers'

export class TypeService implements ITypeService {
  constructor(
    private TypeMapper: any,
    private TypeRepository: ITypeRepository
  ) {}

  public create = async (name: string): Promise<Type> => {
    let type = await this.TypeRepository.getTypeByName(name)
    if (!type) {
      const newType = await this.TypeMapper.mapToEntity(name)
      type = await this.TypeRepository.saveType(newType)
    }

    return type
  }

  public getOrCreateTypes = async (types: string[]): Promise<Type[]> => {
    const pokemonTypes: Type[] = []
    types.map(async type => {
      const newtype = await this.create(type)
      pokemonTypes.push(newtype)
    })
    return pokemonTypes
  }
}
