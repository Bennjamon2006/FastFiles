import Application from "./app/Application";
import ExpressServer from "./adapters/express/ExpressServer";
import ExpressAdapter from "./adapters/express/ExpressAdapter";
import serverConfig from "./config/server";

const app = new Application();
const adapter = new ExpressAdapter();
const server = new ExpressServer(adapter);

app.configure(server, adapter);

const exit = async (code: number = 0) => {
  try {
    await app.stop();

    process.exit(code);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

async function startServer() {
  try {
    const { port, host } = serverConfig;

    await app.start(port, host);

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
