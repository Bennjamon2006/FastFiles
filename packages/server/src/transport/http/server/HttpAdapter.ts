import type { Controller } from "@/transport/http/routing";
import type { HttpError } from "@/transport/http/model";
import { GlobalErrorMapper } from "@/core/errors";

type ControllerDefinition = {
  basePath: string;
  controller: Controller;
};

export abstract class HttpAdapter<T> {
  protected controllers: ControllerDefinition[] = [];

  constructor(protected errorMapper: GlobalErrorMapper<HttpError>) {}

  registerController(basePath: string, controller: Controller) {
    this.controllers.push({ basePath, controller });
  }

  public abstract create(): T;
}
