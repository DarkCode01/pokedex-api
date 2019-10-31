declare interface IMapper {
  mapToDTO(from: any): any
  mapToEntity(from: any): Promise<any>
  mapListToDTO(list: any[]): any[]
}
