import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export const Configuration = {
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
  nodemailer: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.MAILER_FROM || 'Forgot Password <forgot@pokedex.com.do>',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    }
  },
  forgotPass: {
    url: process.env.AGENT_CLIENT_URI
  },
  userOptions: {
    uploads: process.env.UPLOADS_USERS || 'uploads/users/'
  },
  pokemonOptions: {
    uploads: process.env.UPLOADS_USERS || 'uploads/pokemons/'
  },
  test: {
    uri: process.env.TEST_URI
  }
}
