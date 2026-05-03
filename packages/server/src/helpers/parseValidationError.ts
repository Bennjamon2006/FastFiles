import { ZodError, z } from "zod";

export default function parseValidationError<T>(error: ZodError<T>) {
  const formatted = z.flattenError(error).fieldErrors;
  const result: Record<string, string | string[]> = {};

  for (const key in formatted) {
    const value = formatted[key];

    if (value?.length === 1) {
      result[key] = value[0];
    } else if (value) {
      result[key] = value;
    }
  }

  return result;
}
