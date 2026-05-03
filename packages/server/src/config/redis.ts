import { createClient } from "redis";
import { env } from "./env";

export let redisClient: ReturnType<typeof createClient> | null = null;

export async function connectRedis() {
  if (redisClient !== null && redisClient.isOpen) {
    console.warn("Redis client is already connected");
    return;
  }

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

export async function disconnectRedis() {
  if (redisClient === null || !redisClient.isOpen) {
    console.warn("Redis client is not connected");
    return;
  }

  try {
    await redisClient.quit();

    redisClient = null;

    console.log("Disconnected from Redis");
  } catch (err) {
    console.error("Failed to disconnect from Redis:", err);
  }
}
