import type { HttpAdapter } from "@/core/http/server";
import type { Container } from "@/runtime/dependency-injection";
import type { ApplicationDependencies } from "@/app/ApplicationDependencies";

export interface ModuleContext {
  adapter: HttpAdapter<unknown>;
  container: Container<ApplicationDependencies>;
}

export interface Module {
  register(context: ModuleContext): void | Promise<void>;
}
