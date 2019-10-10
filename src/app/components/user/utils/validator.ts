import { check } from 'express-validator'

import { UserResponses } from './responses'

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
    .isLength({ min: 6 })
]

export {
  createIsValid
}
