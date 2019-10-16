import ioc from './src/container'
const Server: any = ioc.resolve('server')

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
