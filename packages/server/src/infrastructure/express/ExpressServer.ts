import type { Application } from "express";
import { HttpServer } from "@/core/http/server";
import { Server } from "node:http";

export default class ExpressServer extends HttpServer<Application> {
  public startServer(
    app: Application,
    port: number,
    host: string,
  ): Promise<Server> {
    return new Promise((resolve, reject) => {
      const server = app.listen(port, host, () => {
        resolve(server);
      });

      server.on("error", (err) => {
        reject(err);
      });
    });
  }
}
