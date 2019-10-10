import container from './src/container'

const App: any = container.resolve('app')
const ConnectDB: any = container.resolve('connect')

class Main {
  public static async init(): Promise<void> {
    try {
      // Connecting DB
      const connect = await ConnectDB.build()
      // Lauch Server
      if (connect)
        await App.listen()
    } catch (err) {
      console.error(err)
    }
  }
}

Main.init()
