export interface IServer {
  start(port: number, host: string): Promise<void>;
  stop(): Promise<void>;
}
