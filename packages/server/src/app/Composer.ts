import type { RedisClientType } from "redis";
import redisConfig from "@/config/redis";
import { LifeCycleManager } from "@/runtime/lifecycle";
import { Container } from "@/runtime/dependency-injection";
import Application from "./Application";
import ExpressAdapter from "@/infrastructure/express/ExpressAdapter";
import ExpressServer from "@/infrastructure/express/ExpressServer";
import { RedisConnectionProvider } from "@/infrastructure/redis/RedisConnectionProvider";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { modules } from "@/modules";
import { HttpAdapter } from "@/core/http/server";
export class Composer {
  private readonly container: Container<ApplicationDependencies>;
  private readonly lifecycleManager: LifeCycleManager;
  private started: boolean = false;
  private initialized: boolean = false;

  constructor() {
    this.container = new Container();
    this.lifecycleManager = new LifeCycleManager();
  }

  private createContext(): void {
    const redisProvider = new RedisConnectionProvider(redisConfig.url);

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

  private loadModules(adapter: HttpAdapter<unknown>): void {
    for (const ModuleClass of modules) {
      const moduleInstance = new ModuleClass();

      moduleInstance.register({
        adapter,
        container: this.container,
      });

      console.log(`Module ${ModuleClass.name} registered successfully.`);
    }
  }

  public compose(app: Application): void {
    if (this.initialized) return;

    this.createContext();

    const adapter = new ExpressAdapter();
    const server = new ExpressServer(adapter);

    this.loadModules(adapter);

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
