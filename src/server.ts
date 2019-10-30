import { Application } from 'express'
import { DataConnection } from '@infra/@types/dataConnection'

export class Server {
  constructor(
    private app: Application,
    private DatabaseConnection: DataConnection
  ) {}

  public async start() : Promise<void> {
    // Connected
    const connected = await this.DatabaseConnection
      .connect()

    // Lauch Server
    if (connected)
      this.DatabaseConnection
        .isConnectedInfo() // DB Connected...

      await this.app.listen() // Running on port ${port}
  }
}
