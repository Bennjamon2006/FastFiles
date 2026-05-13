type ApplicationErrorDetails = Record<string, unknown>;

export default class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: ApplicationErrorDetails,
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}
