import redisConfig from "@/config/redis";
import webConfig from "@/config/web";
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
import { GlobalErrorMapper } from "@/core/errors";
import { HttpError } from "@/transport/http/model";
import { ModuleContext } from "@/modules/Module";
import { ModuleRegistry } from "@/modules/ModuleRegistry";

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

    this.logger.info("Context created successfully.");
  }

  private async loadModules(context: ModuleContext): Promise<void> {
    for (const ModuleClass of modules) {
      const moduleInstance = new ModuleClass();

      const exports = await moduleInstance.register(context);

      context.moduleRegistry.register(moduleInstance.name, exports);

      this.logger.info(
        `Module ${moduleInstance.name} registered successfully.`,
      );
    }
  }

  private setupStaticAssets(adapter: HttpAdapter<unknown>): void {
    if (webConfig.exists) {
      adapter.setStaticAssets({
        assetDir: webConfig.dist,
        fallbackFile: webConfig.index,
      });
      this.logger.info(
        `Static assets configured successfully from ${webConfig.dist}.`,
      );
    }
  }

  public async compose(app: Application): Promise<void> {
    if (this.initialized) return;

    const serverLogger = this.loggerFactory.create({ module: "Server" });

    const httpErrorMapper = new GlobalErrorMapper<HttpError>(
      () => {
        return new HttpError(500, "Unknown error occurred.", "UNKNOWN_ERROR");
      },
      (error) => {
        serverLogger.error("Unmapped error occurred:", { error });
      },
    );

    const adapter = new ExpressAdapter(httpErrorMapper, serverLogger);
    const server = new ExpressServer(adapter);
    const logger = this.loggerFactory.create({ module: "Application" });

    await this.loadModules({
      container: this.container,
      adapter,
      httpErrorMapper,
      moduleRegistry: new ModuleRegistry(),
    });

    this.setupStaticAssets(adapter);

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
