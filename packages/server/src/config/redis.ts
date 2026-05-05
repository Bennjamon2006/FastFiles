import { RedisConnectionProvider } from "@/adapters/redis/RedisConnectionProvider";
import { env } from "@/config/env";

export default function createRedisProvider(): RedisConnectionProvider {
  const redisUrl = env.REDIS_URL;

  return new RedisConnectionProvider(redisUrl);
}
