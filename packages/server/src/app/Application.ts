import { HttpServer, HttpAdapter } from "@/transport/http/server";
import { Logger } from "@/core/logging";
import ApplicationError from "./errors/ApplicationError";

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
      throw new ApplicationError(
        "Application is already configured",
        "CONFIGURATION_ERROR",
      );
    }

    this.server = server;
    this.adapter = adapter;
    this.logger = logger;
  }

  public async start(port: number, host: string): Promise<void> {
    if (!this.server) {
      throw new ApplicationError(
        "Server not configured",
        "CONFIGURATION_ERROR",
      );
    }

    await this.server.start(port, host);

    this.logger?.info(`Server started on ${host}:${port}`);
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      throw new ApplicationError(
        "Server not configured",
        "CONFIGURATION_ERROR",
      );
    }

    await this.server.stop();
    this.logger?.info("Server stopped.");
  }
}
