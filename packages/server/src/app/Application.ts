import { HttpServer, HttpAdapter } from "@/core/http/server";

export default class Application {
  private server?: HttpServer<unknown>;
  private adapter?: HttpAdapter<unknown>;

  public configure<T>(server: HttpServer<T>, adapter: HttpAdapter<T>): void {
    if (this.server || this.adapter) {
      throw new Error("Application is already configured");
    }

    this.server = server;
    this.adapter = adapter;
  }

  public async start(port: number, host: string): Promise<void> {
    if (!this.server) {
      throw new Error("Server not configured");
    }

    await this.server.start(port, host);
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      throw new Error("Server not configured");
    }

    await this.server.stop();
  }
}
