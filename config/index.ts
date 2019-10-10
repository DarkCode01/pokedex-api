import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export default {
  server: {
    port: process.env.PORT || 4000,
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
  google: {
    clientId: process.env.CLIENT_ID,
  },
  test: {
    uri: `http://localhost`
  }
}
