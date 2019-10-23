import { param } from 'express-validator'
import { PokedexResponses } from './pokedex.responses'

const { validator } = PokedexResponses

const getValidator = [
  param('userId', validator.userId)
    .exists()
    .toInt()
    .isInt()
]

export {
  getValidator,
}
