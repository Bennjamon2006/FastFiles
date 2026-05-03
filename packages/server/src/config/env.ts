import { z } from "zod";
import { config } from "dotenv";
import parseValidationError from "@/helpers/parseValidationError";

config();

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("localhost"),
});

export type Env = z.infer<typeof envSchema>;

const getEnv = (): Env => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error(
      "Invalid environment variables:",
      parseValidationError(parsedEnv.error),
    );
    process.exit(1);
  }

  return parsedEnv.data;
};

export const env = getEnv();
