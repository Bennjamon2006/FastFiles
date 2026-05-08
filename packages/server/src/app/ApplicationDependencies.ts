import type { RedisClientType } from "redis";

export interface ApplicationDependencies {
  redisClient: RedisClientType;
}
