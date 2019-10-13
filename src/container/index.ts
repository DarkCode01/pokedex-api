import { createContainer, asClass, asValue, asFunction } from 'awilix'

// Dependencies
import {
  Server,
  App,
  config,
  DatabaseConnection,
  Routing,
  statusCodes,
  ApiRoutes,
  ResponseHandler,
  ErrorHandler,
  UserRepository,
  UserService,
  UserRoutes,
  UserController,
  UserMapper,
} from './providers'

const container = createContainer()
container
  // Instances of classes
  .register({
    server: asClass(Server).singleton(),
    app: asClass(App).singleton(),
    routing: asClass(Routing).singleton(),
    DatabaseConnection: asValue(DatabaseConnection)
  })
  // Values
  .register({
    config: asValue(config),
    codes: asValue(statusCodes),
  })
  // Http
  .register({
    ResponseHandler: asClass(ResponseHandler).singleton(),
    ErrorHandler: asClass(ErrorHandler).singleton(),
  })
  // Repository
  .register({
    UserRepository: asClass(UserRepository).singleton()
  })
  // Services
  .register({
    UserService: asClass(UserService).singleton(),
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
  // Mappers
  .register({
    UserMapper: asClass(UserMapper).singleton()
  })

export default container
