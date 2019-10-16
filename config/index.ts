import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export default {
  server: {
    port: parseInt(process.env.PORT as string),
    prefixRoutes: process.env.PREFIX_ROUTES,
  },
  database: {
    type: process.env.DIALECT,
    host: process.env.DB_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },
  jwt: {
    secret: process.env.SECRET,
    tokenExpire: process.env.TOKEN_EXPIRE,
  },
  test: {
    uri: process.env.TEST_URI
  }
}
