import { param } from 'express-validator'
import { PokedexResponses } from './pokedex.responses'

const { validator } = PokedexResponses

const getValidator = [
  param('username', validator.username)
    .isLength({
      min: 3
    })
]

export {
  getValidator
}
