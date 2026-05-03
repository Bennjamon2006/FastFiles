import { createClient } from "redis";
import { env } from "./env";

export let redisClient: ReturnType<typeof createClient>;

export async function connectRedis() {
  try {
    redisClient = createClient({
      url: env.REDIS_URL,
    });

    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  }
}
