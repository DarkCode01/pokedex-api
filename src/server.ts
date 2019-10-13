export class Server {
  private _app: any
  private _DatabaseConnection: any

  constructor({
    app,
    DatabaseConnection
  }: any) {
    this._app = app
    this._DatabaseConnection = DatabaseConnection
  }

  public async start() : Promise<void> {
    // Connected
    const connected = await this._DatabaseConnection
      .connect()

    // Lauch Server
    if (connected)
      this._DatabaseConnection
        .isConnectedInfo() // DB Connected...

      await this._app.listen() // Running on port ${port}
  }
}
