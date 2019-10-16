import { Connection } from 'typeorm';

declare class DataConnection extends Connection {
  isConnectedInfo(): void
}
