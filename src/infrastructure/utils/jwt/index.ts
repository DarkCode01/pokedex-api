import jwt, { Secret } from 'jsonwebtoken'

export class JWT {
  constructor(private config: config) {}

  public async verifyToken(token: string) : Promise<string|object> {
    const decoded = await jwt.verify(token, this.config.jwt.secret as string | Buffer)
    return decoded
  }

  public async generateToken(user: any) {
    return jwt.sign(
      { user },
      this.config.jwt.secret as Secret,
      { expiresIn: this.config.jwt.tokenExpire }
    )
  }
}

