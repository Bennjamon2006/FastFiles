import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler,
  Application,
} from "express";
import express, { Router, json, urlencoded } from "express";

import { HttpError, Request, Response } from "@/transport/http/model";
import type { RouteDefinition, Controller } from "@/transport/http/routing";
import { HttpAdapter } from "@/transport/http/server";

export default class ExpressAdapter extends HttpAdapter<Application> {
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

  private sendError(res: ExpressResponse, error: HttpError): void {
    res.status(error.statusCode).send({
      error: error.message,
      details: error.details,
      code: error.code,
    });
  }

  private createHandler(route: RouteDefinition): RequestHandler {
    return async (req: ExpressRequest, res: ExpressResponse) => {
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
      } catch (error: unknown) {
        const httpError = this.errorMapper.map(error);

        this.sendError(res, httpError);
      }
    };
  }

  private createRouter(controller: Controller, basePath: string): Router {
    const router = Router();
    const routes = controller.getRoutes();
    const controllerLogger = this.logger.child({ service: controller.name });

    for (const route of routes) {
      const handler = this.createHandler(route);

      router[route.method](route.path, handler);

      controllerLogger.info(
        `Registered route: [${route.method.toUpperCase()}] ${basePath}${route.path}`,
      );
    }

    return router;
  }

  private setupStaticAssets(app: Application): void {
    if (this.staticAssetsOptions) {
      const { assetDir, fallbackFile } = this.staticAssetsOptions;
      app.use(express.static(assetDir));

      if (fallbackFile) {
        app.get("/*any", (req, res) => {
          res.sendFile(fallbackFile, { root: assetDir });
        });
      }
    }
  }

  create(): Application {
    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: true }));

    for (const { basePath, controller } of this.controllers) {
      const controllerRouter = this.createRouter(controller, basePath);
      app.use(basePath, controllerRouter);
    }

    this.setupStaticAssets(app);

    return app;
  }
}
