import { check } from 'express-validator'

import { UserResponses } from './user.responses'

const { validator } = UserResponses

const createIsValid = [
  check('name', validator.name)
    .trim()
    .isLength({ min: 2 }),
  check('username', validator.username)
    .isLength({ min: 3 }),
  check('email', validator.email)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
  check('password', validator.password)
    .isLength({ min: 6 }),
  check('role', validator.role)
    .isLength({ min: 3 }),
]

export {
  createIsValid
}
