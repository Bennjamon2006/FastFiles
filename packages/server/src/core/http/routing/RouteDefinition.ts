import type { Middleware, HttpHandler } from ".";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handler: HttpHandler;
  middlewares: Middleware[];
}
