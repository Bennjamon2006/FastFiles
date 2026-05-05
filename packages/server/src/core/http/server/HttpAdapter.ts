import type { Controller } from "@/core/http/routing";

export interface HttpAdapter<T> {
  registerController(path: string, controller: Controller): void;
  create(): T;
}
