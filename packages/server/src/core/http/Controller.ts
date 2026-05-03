import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
  Router,
} from "express";
import Request from "./Request";
import Response from "./Response";
import Middleware from "./Middleware";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

type Handler = (request: Request) => Response | Promise<Response>;

interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handler: Handler;
  middlewares: Middleware[];
}

type Params = [...Middleware[], Handler];

export default abstract class Controller {
  private routes: RouteDefinition[] = [];

  private registerRoute(method: HttpMethod, path: string, ...params: Params) {
    const handler = params.pop() as Handler;
    const middlewares = params as Middleware[];
    this.routes.push({ method, path, handler, middlewares });
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

  private wrapHandler(
    handler: Handler,
    middlewares: Middleware[],
  ): RequestHandler {
    return async (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      try {
        const request = new Request(
          req.body,
          req.query,
          req.params,
          req.headers,
          req.method,
          req.url,
          req.ip,
        );

        for (const middleware of middlewares) {
          const result = await middleware.handle(request);

          if (result instanceof Response) {
            res.status(result.status).set(result.headers).json(result.body);
            return;
          }
        }

        const response = await handler(request);
        res.status(response.status).set(response.headers).json(response.body);
      } catch (error) {
        next(error);
      }
    };
  }

  public loadRoutes(router: Router) {
    for (const route of this.routes) {
      const { method, path, handler, middlewares } = route;
      router[method](path, this.wrapHandler(handler, middlewares));
    }
  }
}
