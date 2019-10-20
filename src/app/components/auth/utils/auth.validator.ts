import { check, checkSchema, param } from 'express-validator'
import { AuthResponses } from './auth.responses'
import { getCommonPassword as passwords } from '../../../../container/providers'

const { validator, auth, changePassword, forgotPass } = AuthResponses

const createValidator = [
  check('name', validator.name)
    .trim()
    .isLength({ min: 2 }),
  check('lastname', validator.lastname)
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
    .not().isIn(passwords() as string[])
    .withMessage(validator.commonPass)
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

const forgotPassValidator = [
  check('email', validator.email)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
]

const changePassValidator = [
  check('password', changePassword.validator.pass)
    .isLength({
      min: 6
    }),
  check('newPassword', changePassword.validator.newpass)
    .isLength({
      min: 6
    })
]

const forgotPassExpireValidator = [
  param('token', forgotPass.validator.token)
    .isLength({
      min: 10
    })
]

const resetPassValidator = [
  check('password', changePassword.validator.pass)
    .isLength({
      min: 6
    }),
  param('token', forgotPass.validator.token)
    .isLength({
      min: 10
    })
]

export {
  createValidator,
  authValidator,
  changePassValidator,
  forgotPassValidator,
  forgotPassExpireValidator,
  resetPassValidator
}
