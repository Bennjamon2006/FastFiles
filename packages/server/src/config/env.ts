import { z } from "zod";
import { config } from "dotenv";
import parseValidationError from "@/helpers/parseValidationError";

config();

const defaults = {
  PORT: 3000,
  HOST: "localhost",
  REDIS_URL: "redis://localhost:6379",
};

const nodeEnvSchema = z
  .enum(["development", "production", "test"])
  .default("development");

const NODE_ENV = (() => {
  const result = nodeEnvSchema.safeParse(process.env.NODE_ENV);

  if (!result.success) {
    console.error("Invalid NODE_ENV:", parseValidationError(result.error));
    process.exit(1);
  }

  return result.data;
})();

const getDefault = <K extends keyof typeof defaults>(key: K) => {
  if (NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return defaults[key];
};

const envSchema = z.object({
  PORT: z.coerce.number().default(() => getDefault("PORT")),
  HOST: z.string().default(() => getDefault("HOST")),
  REDIS_URL: z.string().default(() => getDefault("REDIS_URL")),
});

const getEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "Invalid environment variables:",
      parseValidationError(result.error),
    );
    process.exit(1);
  }

  return result.data;
};

export const env = {
  ...getEnv(),
  NODE_ENV,
};
