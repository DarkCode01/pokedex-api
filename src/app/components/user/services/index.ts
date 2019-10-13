interface IProps {
  User: any
  UserDTO: any
  UserMapper: any
  UserRepository: any
}
export class UserService {
  constructor({
    User,
    UserDTO,
    UserMapper,
    UserRepository
  }: IProps) {

  }

  public async create(user: any) {
    // return Create.build({})
  }
}
