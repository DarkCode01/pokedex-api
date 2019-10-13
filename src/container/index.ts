import { createContainer, asClass, asValue, asFunction } from 'awilix'

// Dependencies
import {
  App,
  ConnectDB,
  config,
  Routing,
  ApiCodes,
  ApiRoutes,
  ResponseHandler,
  HttpError,
  UserRepository,
  UserService,
  UserRoutes,
  UserController,
  UserDTO,
  UserMapper,
  User
} from './providers'

const container = createContainer()
container
  // Instances of classes
  .register({
    app: asClass(App).singleton(),
    connect: asClass(ConnectDB).singleton(),
    routing: asClass(Routing).singleton(),
  })
  // Values
  .register({
    config: asValue(config),
    codes: asValue(ApiCodes),
  })
  // Http
  .register({
    ResponseHandler: asClass(ResponseHandler).singleton(),
    HttpError: asClass(HttpError).singleton(),
  })
  // Repository
  .register({
    UserRepository: asClass(UserRepository).singleton()
  })
  // Services
  .register({
    UserService: asValue(UserService),
  })
  // Controllers
  .register({
    UserController: asClass(UserController).singleton(),
  })
  // Routes
  .register({
    Routes: asFunction(ApiRoutes).singleton(),
    UserRoutes: asClass(UserRoutes).singleton(),
  })
  // Dtos
  .register({
    UserDTO: asClass(UserDTO).singleton()
  })
  // Mappers
  .register({
    UserMapper: asClass(UserMapper).singleton()
  })
  // Entities
  .register({
    User: asClass(User).singleton()
  })


export default container
