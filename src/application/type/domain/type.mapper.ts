import { Type } from '../type.providers'

export class TypeMapper {
  constructor(private TypeRepository: any) {}

  public mapToEntity = async (name: string): Promise<Type> =>
    await this.TypeRepository.create({ name })
}
