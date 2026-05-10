import type { HttpAdapter } from "@/transport/http/server";
import { HttpError } from "@/transport/http/model";
import type { Container } from "@/runtime/dependency-injection";
import type { ApplicationDependencies } from "@/app/ApplicationDependencies";
import { GlobalErrorMapper } from "@/core/errors";

export interface ModuleContext {
  adapter: HttpAdapter<unknown>;
  container: Container<ApplicationDependencies>;
  httpErrorMapper: GlobalErrorMapper<HttpError>;
}

export interface Module {
  register(context: ModuleContext): void | Promise<void>;
}
