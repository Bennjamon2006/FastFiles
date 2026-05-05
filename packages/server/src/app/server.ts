import registerRoutes from "@/routes";
import ExpressAdapter from "@/adapters/express/ExpressAdapter";
import ExpressServer from "@/adapters/express/ExpressServer";
import { IServer } from "@/core/http/Server";

export default function createServer(): IServer {
  const adapter = new ExpressAdapter();

  registerRoutes(adapter);

  const server = new ExpressServer(adapter);

  return server;
}
