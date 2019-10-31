import { createConnection, Connection } from 'typeorm'

export class DatabaseConnection implements DataConnection {
  public connection: Connection
  constructor (private config: config) {}

  public async connect() : Promise<Connection> {
    const {
      type,
      host,
      username,
      password,
      name: database
    } = this.config.database

    if (this.connection == undefined)
      this.connection = await createConnection({
        type: type as any,
        host,
        username,
        password,
        database,
        synchronize: true,
        cache: true,
        entities: ['**/src/**/*.entity.ts'],
        // ssl: true
      })

    return this.connection
  }

  public isConnectedInfo() {
    console.info('DB Connected...')
  }
}
