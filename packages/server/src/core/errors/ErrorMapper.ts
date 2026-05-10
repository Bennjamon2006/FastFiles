export interface ErrorMapper<T extends Error> {
  map(error: unknown): T | undefined; // Return undefined if the error isn't in the scope of this mapper
}
