import type { Logger } from ".";
import type { LoggerContext } from ".";

export interface LoggerFactory {
  create(context: LoggerContext): Logger;
}
