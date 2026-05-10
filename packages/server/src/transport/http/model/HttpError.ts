type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [k: string]: Serializable };

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
    public readonly details?: Serializable,
  ) {
    super(message);
  }
}
