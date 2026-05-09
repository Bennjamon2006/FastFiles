import type { Controller } from "@/transport/http/routing";

export interface HttpAdapter<T> {
  registerController(path: string, controller: Controller): void;
  create(): T;
}
