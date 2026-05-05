import type { RedisClientType } from "redis";
import { Container } from "@/dependency-injection";
import createRedisProvider from "@/config/redis";

interface Dependencies {
  redis: RedisClientType;
}

const container = new Container<Dependencies>();

container.register("redis", createRedisProvider());

export function startDependencies(): Promise<void> {
  return container.start();
}

export function stopDependencies(): Promise<void> {
  return container.stop();
}

export default function compose() {}
