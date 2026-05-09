import type { LoggerFactory, LoggerContext } from "@/core/logging";
import { ConsoleLogger } from "./ConsoleLogger";

export class ConsoleLoggerFactory implements LoggerFactory {
  public create(context: LoggerContext): ConsoleLogger {
    return new ConsoleLogger(context);
  }
}
