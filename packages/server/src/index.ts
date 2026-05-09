import Application from "./app/Application";
import serverConfig from "./config/server";
import { Composer } from "./app/Composer";

const app = new Application();
const composer = new Composer();

const exit = async (code: number = 0) => {
  try {
    await app.stop();
    await composer.stop();

    process.exit(code);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

async function startServer() {
  try {
    const { port, host } = serverConfig;

    await composer.start();
    composer.compose(app);
    await app.start(port, host);
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
