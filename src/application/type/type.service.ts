import { Type } from './type.providers'

export class TypeService {
  constructor(
    private TypeMapper: any,
    private TypeRepository: any
  ) {}

  public getOrCreateType = async (typeName: string) : Promise<Type> => {
    let type = await this.TypeRepository.getTypeByName(typeName)

    if (!type) {
      const newType = await this.TypeMapper.mapToEntity(typeName)
      type = await this.TypeRepository.saveType(newType)
    }

    return type
  }
}
