interface server {
  port: number,
  prefixRoutes: string | undefined,
}

interface database {
  type: string | undefined,
  host: string | undefined,
  username: string | undefined,
  password: string | undefined,
  name: string | undefined,
}

interface jwt {
  secret: string | undefined,
  tokenExpire: string | undefined,
}

interface test {
  uri: string | undefined
}

declare interface config {
  server: server
  database: database
  jwt: jwt
  test: test
}
