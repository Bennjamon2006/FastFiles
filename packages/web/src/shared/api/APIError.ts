type APIErrorDetails = Record<string, unknown>;

export class APIError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
    public readonly details?: APIErrorDetails,
  ) {
    super(message);
  }
}
