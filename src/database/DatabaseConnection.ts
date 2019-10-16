import { createConnection, Connection } from 'typeorm'
import { config } from '../container/providers'

export class DatabaseConnection {
  public static _connection: Connection

  public static async connect() : Promise<Connection> {
    const {
      type,
      host,
      username,
      password,
      name: database
    } = config.database

    if (this._connection == undefined)
      this._connection = await createConnection({
        type: type as any,
        host,
        username,
        password,
        database,
        synchronize: true,
        entities: ['**/app/components/**/**/*.entity.ts'],
        // ssl: true
      })

    return this._connection
  }

  public static async isConnectedInfo() {
    console.info('DB Connected...')
  }
}
