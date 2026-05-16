import chalk from "chalk";
import { Logger } from "@/core/logging";
import type { LoggerContext, LogMetadata } from "@/core/logging";

export class ConsoleLogger extends Logger {
  private readonly HEADERS = {
    log: chalk.white.bold("[LOG]"),
    info: chalk.blue.bold("[INFO]"),
    error: chalk.red.bold("[ERROR]"),
    warn: chalk.yellow.bold("[WARN]"),
    debug: chalk.gray.bold("[DEBUG]"),
  };

  private getPrefix(type: keyof typeof this.HEADERS): string {
    const header = this.HEADERS[type];
    let modulePart = chalk.cyan(`[${this.context.module}]`);

    if (this.context.service) {
      modulePart += ` ${chalk.green(`(${this.context.service})`)}`;
    }

    return `${header} ${modulePart}`;
  }

  private toArgs(
    type: keyof typeof this.HEADERS,
    message: string,
    metadata?: LogMetadata,
  ): [string, LogMetadata?] {
    const prefix = this.getPrefix(type);

    if (metadata) {
      return [`${prefix} ${message}`, metadata];
    }

    return [`${prefix} ${message}`];
  }

  public log(message: string, metadata?: LogMetadata): void {
    const args = this.toArgs("log", message, metadata);

    console.log(...args);
  }

  public info(message: string, metadata?: LogMetadata): void {
    const args = this.toArgs("info", message, metadata);

    console.info(...args);
  }

  public error(message: string, metadata?: LogMetadata): void {
    const args = this.toArgs("error", message, metadata);

    console.error(...args);
  }

  public warn(message: string, metadata?: LogMetadata): void {
    const args = this.toArgs("warn", message, metadata);

    console.warn(...args);
  }

  public debug(message: string, metadata?: LogMetadata): void {
    const args = this.toArgs("debug", message, metadata);

    console.debug(...args);
  }

  public child(context: Partial<LoggerContext>): Logger {
    return new ConsoleLogger({
      ...this.context,
      ...context,
    });
  }
}
