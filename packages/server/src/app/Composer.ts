import redisConfig from "@/config/redis";
import { LifeCycleManager } from "@/runtime/lifecycle";
import { Container } from "@/runtime/dependency-injection";
import Application from "./Application";
import ExpressAdapter from "@/infrastructure/express/ExpressAdapter";
import ExpressServer from "@/infrastructure/express/ExpressServer";
import { RedisConnectionProvider } from "@/infrastructure/redis/RedisConnectionProvider";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { modules } from "@/modules";
import { HttpAdapter } from "@/transport/http/server";
import type { LoggerFactory, Logger } from "@/core/logging";
import { ConsoleLoggerFactory } from "@/infrastructure/console/ConsoleLoggerFactory";

export class Composer {
  private readonly container: Container<ApplicationDependencies>;
  private readonly lifecycleManager: LifeCycleManager;
  private readonly loggerFactory: LoggerFactory = new ConsoleLoggerFactory();
  private readonly logger: Logger;
  private started: boolean = false;
  private initialized: boolean = false;

  constructor() {
    this.container = new Container();
    this.lifecycleManager = new LifeCycleManager();
    this.logger = this.loggerFactory.create({ module: "Composer" });
  }

  private createContext(): void {
    // Logging
    const loggerFactory = new ConsoleLoggerFactory();

    this.container.register("loggerFactory", () => loggerFactory, []);

    // Redis
    const redisLogger = loggerFactory.create({
      module: "Redis",
      service: "RedisConnectionProvider",
    });

    const redisProvider = new RedisConnectionProvider(
      redisConfig.url,
      redisLogger,
    );

    this.lifecycleManager.register(redisProvider);

    this.container.register(
      "redisClient",
      () => {
        const client = redisProvider.getClient();
        return client;
      },
      [],
    );

    this.logger.log("Context created successfully.");
  }

  private loadModules(adapter: HttpAdapter<unknown>): void {
    for (const ModuleClass of modules) {
      const moduleInstance = new ModuleClass();

      moduleInstance.register({
        adapter,
        container: this.container,
      });

      this.logger.log(`Module ${ModuleClass.name} registered successfully.`);
    }
  }

  public compose(app: Application): void {
    if (this.initialized) return;

    const adapter = new ExpressAdapter();
    const server = new ExpressServer(adapter);
    const logger = this.loggerFactory.create({ module: "Application" });

    this.loadModules(adapter);

    app.configure(server, adapter, logger);

    this.initialized = true;
  }

  public async start(): Promise<void> {
    if (this.started) {
      this.logger.warn("Composer has already been started.");
      return;
    }

    try {
      this.createContext();

      await this.lifecycleManager.start();
      await this.container.start();

      this.started = true;
    } catch (error) {
      this.logger.error("Failed to start composer:", { error });
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (!this.started) {
      this.logger.warn("Composer is not started or has already been stopped.");
      return;
    }

    try {
      await this.lifecycleManager.stop();
      this.started = false;
    } catch (error) {
      this.logger.error("Failed to stop composer:", { error });
    }
  }
}
