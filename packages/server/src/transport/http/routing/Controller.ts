import type { Middleware, HttpHandler, HttpMethod, RouteDefinition } from ".";

type Params = [...Middleware[], HttpHandler];

export abstract class Controller {
  private routes: RouteDefinition[] = [];

  private registerRoute(method: HttpMethod, path: string, ...params: Params) {
    const handler = params[params.length - 1] as HttpHandler;
    const middlewares = params.slice(0, -1) as Middleware[];

    if (typeof handler !== "function") {
      throw new Error(
        `Invalid handler for route ${method} ${path}. Expected a function.`,
      );
    }

    this.routes.push({
      method,
      path,
      handler,
      middlewares,
    });
  }

  protected get(path: string, ...params: Params) {
    this.registerRoute("get", path, ...params);
  }

  protected post(path: string, ...params: Params) {
    this.registerRoute("post", path, ...params);
  }

  protected put(path: string, ...params: Params) {
    this.registerRoute("put", path, ...params);
  }

  protected delete(path: string, ...params: Params) {
    this.registerRoute("delete", path, ...params);
  }

  protected patch(path: string, ...params: Params) {
    this.registerRoute("patch", path, ...params);
  }

  public getRoutes() {
    return this.routes;
  }

  public get name() {
    return this.constructor.name;
  }
}
