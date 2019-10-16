import jwt, { Secret } from 'jsonwebtoken'

export class JWT {
  _config: config

  constructor({
    config
  }: { config: config }) {
    this._config = config
  }

  public async verifyToken(token: string) : Promise<string|object> {
    const decoded = await jwt.verify(token, this._config.jwt.secret as string | Buffer)
    return decoded
  }

  public async generateToken(user: any) {
    return jwt.sign(
      { user },
      this._config.jwt.secret as Secret,
      { expiresIn: this._config.jwt.tokenExpire }
    )
  }
}

