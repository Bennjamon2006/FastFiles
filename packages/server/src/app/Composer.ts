import type { RedisClientType } from "redis";
import createRedisProvider from "@/config/redis";
import { LifeCycleManager } from "@/runtime/lifecycle";
import { Container } from "@/runtime/dependency-injection";
import Application from "./Application";
import ExpressAdapter from "@/adapters/express/ExpressAdapter";
import ExpressServer from "@/adapters/express/ExpressServer";
import RoomsController from "@/transport/http/RoomsController";

interface ApplicationContext {
  redisClient: RedisClientType;
}

export class Composer {
  private readonly container: Container<ApplicationContext>;
  private readonly lifecycleManager: LifeCycleManager;
  private started: boolean = false;
  private initialized: boolean = false;

  constructor() {
    this.container = new Container();
    this.lifecycleManager = new LifeCycleManager();
  }

  private createContext(): void {
    const redisProvider = createRedisProvider();

    this.lifecycleManager.register(redisProvider);

    this.container.register(
      "redisClient",
      () => {
        const client = redisProvider.getClient();
        return client;
      },
      [],
    );
  }
  public compose(app: Application): void {
    if (this.initialized) return;

    this.createContext();

    const adapter = new ExpressAdapter();
    const server = new ExpressServer(adapter);

    const roomsController = new RoomsController();

    adapter.registerController("/api/rooms", roomsController);

    app.configure(server, adapter);

    this.initialized = true;
  }

  public async start(): Promise<void> {
    if (this.started) {
      console.warn("Composer has already been started.");
      return;
    }

    try {
      await this.lifecycleManager.start();
      this.started = true;
    } catch (error) {
      console.error("Failed to start composer:", error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (!this.started) {
      console.warn("Composer is not started or has already been stopped.");
      return;
    }

    try {
      await this.lifecycleManager.stop();
      this.started = false;
    } catch (error) {
      console.error("Failed to stop composer:", error);
    }
  }
}
