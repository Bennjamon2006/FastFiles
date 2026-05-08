import { env } from "./env";

const redisConfig = {
  url: env.REDIS_URL,
};

export default redisConfig;
