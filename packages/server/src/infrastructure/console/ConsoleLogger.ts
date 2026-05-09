import { Logger } from "@/core/logging";
import type { LoggerContext, LogMetadata } from "@/core/logging";

export class ConsoleLogger extends Logger {
  constructor(context: LoggerContext) {
    super(context);
  }

  private get prefix(): string {
    let prefix = `[${this.context.module}]`;

    if (this.context.service) {
      prefix += ` (${this.context.service})`;
    }

    return prefix;
  }

  private toArgs(
    message: string,
    metadata?: LogMetadata,
  ): [string, LogMetadata?] {
    if (metadata) {
      return [`${this.prefix} ${message}`, metadata];
    }

    return [`${this.prefix} ${message}`];
  }

  public log(message: string, metadata?: LogMetadata): void {
    console.log(...this.toArgs(message, metadata));
  }

  public error(message: string, metadata?: LogMetadata): void {
    console.error(...this.toArgs(message, metadata));
  }

  public warn(message: string, metadata?: LogMetadata): void {
    console.warn(...this.toArgs(message, metadata));
  }

  public debug(message: string, metadata?: LogMetadata): void {
    console.debug(...this.toArgs(message, metadata));
  }

  public child(context: Partial<LoggerContext>): Logger {
    return new ConsoleLogger({
      ...this.context,
      ...context,
    });
  }
}
