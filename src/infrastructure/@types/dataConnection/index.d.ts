import { Connection } from 'typeorm'

declare global {
  interface DataConnection {
    connection: Connection
    isConnectedInfo(): void
    connect(): Promise<Connection>
  }
}
