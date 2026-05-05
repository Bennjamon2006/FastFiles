import type { Request, Response } from "@/core/http/model";

type Result = Response | void;

export abstract class Middleware {
  public abstract handle(request: Request): Result | Promise<Result>;
}
