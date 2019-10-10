import { createConnection, Connection } from 'typeorm'

export class ConnectDB {
  private connection: Connection
  private config: config

  constructor({
    config
  }: any) {
    this.config = config
  }

  public async build(): Promise<Connection> {
    const { type, host, username, password, name: database } = this.config.database

    this.connection = await createConnection({
      type: <any>type,
      host,
      username,
      password,
      database,
      synchronize: true,
      entities: ['**/app/components/**/**/entity.ts'],
      // ssl: true
    })

    if (this.connection)
      console.log('DB Connected...')
      return this.connection
  }
}
