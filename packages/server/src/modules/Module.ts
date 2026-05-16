import type { HttpAdapter } from "@/transport/http/server";
import { HttpError } from "@/transport/http/model";
import type { Container } from "@/runtime/dependency-injection";
import type { ApplicationDependencies } from "@/app/ApplicationDependencies";
import { GlobalErrorMapper } from "@/core/errors";
import type { ModuleRegistry } from "./ModuleRegistry";
import type { ModulesExports } from "./index";

export interface ModuleContext {
  adapter: HttpAdapter<unknown>;
  container: Container<ApplicationDependencies>;
  httpErrorMapper: GlobalErrorMapper<HttpError>;
  moduleRegistry: ModuleRegistry<ModulesExports>;
}

export interface Module<Name extends string, Exports = unknown> {
  name: Name;

  register(context: ModuleContext): Exports | Promise<Exports>;
}
