import type { RedisClientType } from "redis";
import type { LoggerFactory } from "@/core/logging";
import { GlobalErrorMapper } from "@/core/errors";
import { HttpError } from "@/transport/http/model";

export interface ApplicationDependencies {
  redisClient: RedisClientType;
  loggerFactory: LoggerFactory;
}
