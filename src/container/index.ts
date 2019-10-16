import { createContainer, asClass, asValue, asFunction } from 'awilix'

// Dependencies
import {
  Server,
  App,
  config,
  DatabaseConnection,
  Routing,
  RouteMethod,
  statusCodes,
  ApiRoutes,
  ResponseHandler,
  ErrorHandler,
  encryptPassword,
  comparePassword,
  JWT,
  AuthMiddleware,
  UserRepository,
  UserService,
  UserRoutes,
  UserController,
  UserMapper,
  GenderController,
  GenderService,
  GenderMapper,
  GenderRepository
} from './providers'

const container = createContainer()
container
  // Instances of classes
  .register({
    server: asClass(Server).singleton(),
    app: asClass(App).singleton(),
    routing: asClass(Routing).singleton(),
    DatabaseConnection: asValue(DatabaseConnection),
  })
  // Values
  .register({
    config: asValue(config),
    codes: asValue(statusCodes),
  })
  // Utils
  .register({
    encryptPassword: asValue(encryptPassword),
    comparePassword: asValue(comparePassword),
    JWT: asClass(JWT).singleton(),
  })
  // Http
  .register({
    ResponseHandler: asClass(ResponseHandler).singleton(),
    ErrorHandler: asClass(ErrorHandler).singleton(),
    RouteMethod: asClass(RouteMethod).singleton(),
  })
  // Repository
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    GenderRepository: asClass(GenderRepository).singleton(),
  })
  // Services
  .register({
    UserService: asClass(UserService).singleton(),
    GenderService: asClass(GenderService).singleton(),
  })
  // Controllers
  .register({
    UserController: asClass(UserController).singleton(),
    GenderController: asClass(GenderController).singleton(),
  })
  // Routes
  .register({
    Routes: asFunction(ApiRoutes).singleton(),
    UserRoutes: asClass(UserRoutes).singleton(),
  })
  // Mappers
  .register({
    UserMapper: asClass(UserMapper).singleton(),
    GenderMapper: asClass(GenderMapper).singleton(),
  })
  .register({
    AuthMiddleware: asClass(AuthMiddleware).singleton(),
  })

export default container
