import container from './src/container'
const Server: any = container.resolve('server')

class Main {
  public static async init(): Promise<void> {
    try {
      // Start app and DB Connection
      await Server.start()
    } catch (err) {
      console.error(err)
      process.exit()
    }
  }
}

Main.init()
