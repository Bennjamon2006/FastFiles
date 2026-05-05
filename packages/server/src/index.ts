import serverConfig from "./config/server";
import createServer from "./app/server";
import { startDependencies, stopDependencies } from "./app/dependencies";

const server = createServer();

const exit = async (code: number = 0) => {
  try {
    await server.stop();
    await stopDependencies();

    process.exit(code);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

async function startServer() {
  try {
    await startDependencies();
    const { port, host } = serverConfig;

    await server.start(port, host);

    console.log(`Server is running at http://${host}:${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    exit(1);
  }
}

startServer();

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  exit();
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  exit();
});

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  exit(1);
});
