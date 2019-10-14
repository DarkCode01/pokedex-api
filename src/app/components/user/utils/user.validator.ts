import { check, checkSchema } from 'express-validator'
import { UserResponses } from './user.responses'

const { validator, auth } = UserResponses

const createValidator = [
  check('name', validator.name)
    .trim()
    .isLength({ min: 2 }),
  check('username', validator.username)
    .trim()
    .isLength({ min: 3 }),
  check('email', validator.email)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
  check('password', validator.password)
    .trim()
    .isLength({ min: 6 }),
  checkSchema({
    'gender': {
      in: 'body',
      matches: {
        options: [/\b(?:male|female|others)\b/],
        errorMessage: validator.gender
      }
    }
  })
]

const authValidator = [
  check('emailOrUsername', auth.validator.emailOrUsername)
    .isLength({
      min: 3
    }),
  check('password', validator.password)
    .isLength({
      min: 6
    })
]

export {
  createValidator,
  authValidator
}
