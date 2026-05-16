import type { RedisClientType } from "redis";
import type { LoggerFactory } from "@/core/logging";

export interface ApplicationDependencies {
  redisClient: RedisClientType;
  loggerFactory: LoggerFactory;
}
