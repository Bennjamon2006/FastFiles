import type { RedisClientType } from "redis";
import { createClient } from "redis";
import { LifeCycle } from "@/runtime/lifecycle";
import type { Logger } from "@/core/logging";

export class RedisConnectionProvider implements LifeCycle {
  private client: RedisClientType | null = null;

  constructor(
    private readonly url: string,
    private readonly logger: Logger,
  ) {}

  public async start(): Promise<void> {
    if (this.client !== null && this.client.isOpen) {
      return;
    }

    try {
      this.client = createClient({
        url: this.url,
      });

      await this.client.connect();
      this.logger.info("Connected to Redis");
    } catch (err) {
      this.logger.error("Failed to connect to Redis:", { error: err });
      throw err;
    }
  }

  public async stop(): Promise<void> {
    if (this.client === null || !this.client.isOpen) {
      return;
    }

    try {
      await this.client.quit();
      this.client = null;

      console.log("Disconnected from Redis");
    } catch (err) {
      console.error("Failed to disconnect from Redis:", err);
    }
  }

  public getClient(): RedisClientType {
    if (this.client === null || !this.client.isOpen) {
      throw new Error("Redis client is not connected");
    }

    return this.client;
  }
}
