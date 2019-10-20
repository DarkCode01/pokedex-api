import jwt, { Secret } from 'jsonwebtoken'

export class JWT {
  constructor(private config: config) {}

  public verifyToken = async (token: string): Promise<string|object> =>
    await jwt.verify(token, this.config.jwt.secret as string | Buffer)

  public generateToken = async (user: any) =>
    await jwt.sign(
      { user },
      this.config.jwt.secret as Secret,
      { expiresIn: this.config.jwt.tokenExpire }
    )
}

