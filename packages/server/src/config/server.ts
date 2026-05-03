import { env } from "./env";

const serverConfig = {
  port: env.PORT,
  host: env.HOST,
};

export default serverConfig;
