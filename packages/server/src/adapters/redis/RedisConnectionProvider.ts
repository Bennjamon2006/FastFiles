import type { RedisClientType } from "redis";
import { createClient } from "redis";
import { LifeCycleDependency } from "@/dependency-injection";

export class RedisConnectionProvider implements LifeCycleDependency<RedisClientType> {
  private client: RedisClientType | null = null;

  constructor(private readonly url: string) {}

  public async start(): Promise<void> {
    if (this.client !== null && this.client.isOpen) {
      return;
    }

    try {
      this.client = createClient({
        url: this.url,
      });

      await this.client.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.error("Failed to connect to Redis:", err);

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

  public get(): RedisClientType {
    if (this.client === null || !this.client.isOpen) {
      throw new Error("Redis client is not connected");
    }

    return this.client;
  }
}
