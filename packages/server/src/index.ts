import { Server } from "node:http";
import app from "./app/server";
import { connectRedis, disconnectRedis } from "./config/redis";
import serverConfig from "./config/server";

let server: Server | null = null;

const closeServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (server && server.listening) {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Server closed successfully.");
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

const exit = async (code: number = 0) => {
  try {
    await disconnectRedis();
    await closeServer();

    process.exit(code);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

async function startServer() {
  try {
    await connectRedis();

    const { port, host } = serverConfig;

    server = app.listen(port, host, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });
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
