import type { Controller } from "@/transport/http/routing";
import type { HttpError } from "@/transport/http/model";
import { GlobalErrorMapper } from "@/core/errors";
import { Logger } from "@/core/logging";

type StatiServecOptions = {
  assetDir: string;
  fallbackFile?: string;
};

type ControllerDefinition = {
  basePath: string;
  controller: Controller;
};

export abstract class HttpAdapter<T> {
  protected readonly controllers: ControllerDefinition[] = [];
  protected staticAssetsOptions?: StatiServecOptions;

  constructor(
    protected readonly errorMapper: GlobalErrorMapper<HttpError>,
    protected readonly logger: Logger,
  ) {}

  registerController(basePath: string, controller: Controller) {
    this.controllers.push({ basePath, controller });
  }

  public setStaticAssets(options: StatiServecOptions) {
    this.staticAssetsOptions = options;
  }

  public abstract create(): T;
}
