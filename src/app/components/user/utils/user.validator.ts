import { param } from 'express-validator'
import { UserResponses } from './user.responses'

const { validator } = UserResponses

const getValidator = [
  param('username', validator.username)
    .isLength({
      min: 3
    })
]

export {
  getValidator
}
