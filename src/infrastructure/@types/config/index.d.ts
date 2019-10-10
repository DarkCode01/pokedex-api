interface server {
  port: number,
  prefixRoutes: string,
}

interface database {
  type: string,
  host: string,
  username: string,
  password: string,
  name: string,
}

interface jwt {
  secret: string,
  tokenExpire: string,
}

interface google {
  clientId: string,
}

interface test {
  uri: string
}

declare interface config {
  server: server
  database: database
  jwt: jwt
  google: google
  test: test
}
