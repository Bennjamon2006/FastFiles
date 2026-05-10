import type { ErrorDetails } from ".";

export class DomainError extends Error {
  constructor(
    public readonly type: string,
    message: string,
    public readonly details?: ErrorDetails,
  ) {
    super(message);
  }
}
