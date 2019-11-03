import { body, param } from 'express-validator'
import { PokemonResponses } from './pokemon.responses'

const { validator } = PokemonResponses

const createValidator = [
  body('name', validator.name)
    .trim()
    .isLength({ min: 2 }),
  body('description', validator.description)
    .trim()
    .isLength({ min: 8 }),
  body('latitude', validator.latitude)
    .optional()
    .trim()
    .isLength({ min: 3 }),
  body('longitude', validator.longitude)
    .optional()
    .trim()
    .isLength({ min: 3 }),
  body('captured', validator.captured)
    .optional()
    .isLength({ min: 4 })
    .toBoolean()
    .isBoolean(),
  body('height', validator.height)
    .optional()
    .exists(),
  body('weight', validator.weight)
    .optional()
    .exists(),
  body('type', validator.type)
    .toArray()
    .isArray()
    .custom(value => value[0]),
]

const getValidator = [
  param('userId', validator.userId)
    .exists()
    .toInt()
    .isInt(),
  param('slug', validator.slug)
    .trim()
    .isLength({ min: 2 }),
]

const updateValidator = [
  param('userId', validator.userId)
    .exists()
    .toInt()
    .isInt(),
  param('slug', validator.slug)
    .trim()
    .isLength({ min: 2 }),
  body('name', validator.name)
    .optional()
    .trim()
    .isLength({ min: 2 }),
  body('description', validator.description)
    .optional()
    .trim()
    .isLength({ min: 8 }),
  body('latitude', validator.latitude)
    .optional()
    .trim()
    .isLength({ min: 3 }),
  body('longitude', validator.longitude)
    .optional()
    .trim()
    .isLength({ min: 3 }),
  body('captured', validator.captured)
    .optional()
    .isLength({ min: 4 })
    .toBoolean()
    .isBoolean(),
  body('height', validator.height)
    .optional()
    .exists(),
  body('weight', validator.weight)
    .optional()
    .exists(),
  body('type', validator.type)
    .optional()
    .toArray()
    .isArray()
    .custom(value => value[0]),
]

export {
  createValidator,
  getValidator,
  updateValidator,
}
