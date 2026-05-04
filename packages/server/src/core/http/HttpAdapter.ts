import type Contrller from "./Controller";

export interface HttpAdapter<T> {
  registerController(path: string, controller: Contrller): void;
  create(): T;
}
