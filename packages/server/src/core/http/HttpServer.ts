import type { Server } from "node:http";
import type { HttpAdapter } from "@/core/http/HttpAdapter";
import type { IServer } from "./Server";

export default abstract class HttpServer<T> implements IServer {
  private server?: Server;

  constructor(private readonly adapter: HttpAdapter<T>) {}

  protected abstract startServer(
    app: T,
    port: number,
    host: string,
  ): Promise<Server>;

  public async start(port: number, host: string): Promise<void> {
    if (this.server) return;

    const app = this.adapter.create();

    this.server = await this.startServer(app, port, host);
  }

  public async stop(): Promise<void> {
    if (!this.server) return;

    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.server = undefined;
          resolve();
        }
      });
    });
  }
}
