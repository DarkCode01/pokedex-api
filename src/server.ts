export class Server {
  constructor(
    private app: any,
    private DatabaseConnection: any
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
