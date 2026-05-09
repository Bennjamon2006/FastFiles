import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
  Application,
} from "express";
import express, { Router, json, urlencoded } from "express";

import { Request, Response } from "@/transport/http/model";
import type { RouteDefinition, Controller } from "@/transport/http/routing";
import type { HttpAdapter } from "@/transport/http/server";

type ControllerDefinition = {
  path: string;
  controller: Controller;
};

export default class ExpressAdapter implements HttpAdapter<Application> {
  private controllers: ControllerDefinition[] = [];

  public registerController(path: string, controller: Controller): void {
    this.controllers.push({ path, controller });
  }

  private parseRequest(req: ExpressRequest): Request {
    return new Request(
      req.body,
      req.query,
      req.params,
      req.headers,
      req.method,
      req.url,
      req.ip,
    );
  }

  private sendResponse(res: ExpressResponse, response: Response): void {
    res.status(response.status).set(response.headers).send(response.body);
  }

  private createHandler(route: RouteDefinition): RequestHandler {
    return async (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      try {
        const request = this.parseRequest(req);

        for (const middleware of route.middlewares) {
          const middlewareResponse = await middleware.handle(request);

          if (middlewareResponse) {
            this.sendResponse(res, middlewareResponse);
            return;
          }
        }

        const controllerResponse = await route.handler(request);

        this.sendResponse(res, controllerResponse);
      } catch (error) {
        next(error);
      }
    };
  }

  private createRouter(controller: Controller): Router {
    const router = Router();
    const routes = controller.getRoutes();

    for (const route of routes) {
      const handler = this.createHandler(route);

      router[route.method](route.path, handler);
    }

    return router;
  }

  create(): Application {
    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: true }));

    for (const { path, controller } of this.controllers) {
      const controllerRouter = this.createRouter(controller);
      app.use(path, controllerRouter);
    }

    return app;
  }
}
