import { param, body, check } from 'express-validator'
// import { UserResponses } from './user.responses'
import { AuthResponses } from '../../auth/auth.providers'

const { validator } = AuthResponses

const getValidator = [
  param('username', validator.username)
    .isString()
    .isLength({
      min: 3
    })
]

const updateValidator = [
  param('username', validator.username)
    .optional()
    .isLength({
      min: 3
    }),
  body('name', validator.name)
    .optional()
    .trim()
    .isLength({ min: 2 }),
  body('lastname', validator.lastname)
    .optional()
    .trim()
    .isLength({ min: 2 }),
  check('birthdate', validator.birthdate)
    .optional()
    .trim()
    .isLength({ min: 8 }),
  check('city', validator.city)
    .optional()
    .trim()
    .isLength({ min: 3 }),
  body('email', validator.email)
    .optional()
    .isEmail()
    .normalizeEmail({ all_lowercase: true })
]

export {
  getValidator,
  updateValidator
}
