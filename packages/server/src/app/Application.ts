import { HttpServer, HttpAdapter } from "@/transport/http/server";
import { Logger } from "@/core/logging";

export default class Application {
  private server?: HttpServer<unknown>;
  private adapter?: HttpAdapter<unknown>;
  private logger?: Logger;

  public configure<T>(
    server: HttpServer<T>,
    adapter: HttpAdapter<T>,
    logger?: Logger,
  ): void {
    if (this.server || this.adapter) {
      throw new Error("Application is already configured");
    }

    this.server = server;
    this.adapter = adapter;
    this.logger = logger;
  }

  public async start(port: number, host: string): Promise<void> {
    if (!this.server) {
      throw new Error("Server not configured");
    }

    await this.server.start(port, host);

    this.logger?.log(`Server started on ${host}:${port}`);
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      throw new Error("Server not configured");
    }

    await this.server.stop();
    this.logger?.log("Server stopped.");
  }
}
