import jwt, { Secret } from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'
import { secretToken, tokenExpire } from '../../../../config'
import { Res } from '../response'

// Entity
import { User } from '../../../app/components/user/user.entity'

const Token = (user: User) => {
  user.password = ''
  return jwt.sign(
    { user },
    <Secret>secretToken,
    { expiresIn: tokenExpire }
  )
}

const Verify = (req: Request, res: Response, next: NextFunction, isImage = false) => {
  const token = isImage ? req.query.ensure : req.get('authorization')
  if (!token) {
    return res
      .status(403)
      .send(Res('The request does not have the authorization headers.'))
  }

  jwt.verify(token, <Buffer>secretToken, (err: Error, decoded: any) => {
    if (err)  { return res
      .status(401)
      .send(Res(`Ocurrió un error con la verificación del token, ${err.message}`))
    }

    req.user = decoded.user
    next()
  })
}

export {
  Verify,
  Token
}
