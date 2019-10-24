import { param } from 'express-validator'
import { PokemonResponses } from './pokemon.responses'

const { validator } = PokemonResponses

const getValidator = [
  param('userId', validator.userId)
    .exists()
    .toInt()
    .isInt()
]

export {
  getValidator,
}
