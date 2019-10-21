type server = {
  port: number,
  prefixRoutes: string | undefined,
}

type database = {
  type: string | undefined,
  host: string | undefined,
  username: string | undefined,
  password: string | undefined,
  name: string | undefined,
}

type jwt = {
  secret: string | undefined,
  tokenExpire: string | undefined,
}

type nodemailer = {
  host: string | undefined,
  port: number,
  from: string | undefined,
  auth: {
    user: string | undefined,
    pass: string | undefined,
  }
}

type test = {
  uri: string | undefined
}

type forgotPass = {
  url: string
}
declare type config = {
  server: server
  database: database
  jwt: jwt
  test: test
  nodemailer: nodemailer
  forgotPass: forgotPass
}
