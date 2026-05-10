import { DomainError } from "@/core/errors";
import type { ErrorDetails } from "@/core/errors";

export class ResourceNotFoundError extends DomainError {
  constructor(message: string, details?: ErrorDetails) {
    super("RESOURCE_NOT_FOUND", message, details);
  }
}
