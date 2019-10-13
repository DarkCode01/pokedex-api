import { check } from 'express-validator'
import { UserResponses } from './user.responses'

const { validator } = UserResponses

const createIsValid = [
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
]

export {
  createIsValid
}
