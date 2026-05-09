import type { LoggerContext, LogMetadata } from ".";

export abstract class Logger {
  constructor(protected readonly context: LoggerContext) {}

  public abstract log(message: string, metadata?: LogMetadata): void;

  public abstract info(message: string, metadata?: LogMetadata): void;

  public abstract error(message: string, metadata?: LogMetadata): void;

  public abstract warn(message: string, metadata?: LogMetadata): void;

  public abstract debug(message: string, metadata?: LogMetadata): void;

  public abstract child(context: Partial<LoggerContext>): Logger;
}
