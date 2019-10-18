import { UserDTO, UserResponses } from './user.providers'

export class UserService {
  constructor(
    private UserMapper: any,
    private UserRepository: any,
    private ErrorHandler: any,
    private codes: ApiCodes,
    private JWT: any
  ) {}
}
