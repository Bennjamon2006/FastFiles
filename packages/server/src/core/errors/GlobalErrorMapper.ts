import { ErrorMapper } from "./ErrorMapper";

type ErrorMapperFallback<T extends Error> = (error: unknown) => T;

export class GlobalErrorMapper<T extends Error> {
  private readonly mappers: ErrorMapper<T>[] = [];

  constructor(
    private readonly fallback: ErrorMapperFallback<T>,
    private readonly onUnmappedError?: (error: unknown) => void,
  ) {}

  public registerMapper(mapper: ErrorMapper<T>): void {
    this.mappers.push(mapper);
  }

  public map(error: unknown): T {
    for (const mapper of this.mappers) {
      const mappedError = mapper.map(error);
      if (mappedError !== undefined) {
        return mappedError;
      }
    }

    if (this.onUnmappedError) {
      this.onUnmappedError(error);
    }

    return this.fallback(error);
  }
}
