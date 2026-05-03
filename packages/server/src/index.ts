import app from "./app/server";
import { connectRedis } from "./config/redis";
import serverConfig from "./config/server";

async function startServer() {
  try {
    await connectRedis();

    const { port, host } = serverConfig;

    app.listen(port, host, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  process.exit(0);
});
