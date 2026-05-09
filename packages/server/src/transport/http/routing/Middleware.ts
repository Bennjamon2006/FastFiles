import type { Request, Response } from "@/transport/http/model";

type Result = Response | void;

export abstract class Middleware {
  public abstract handle(request: Request): Result | Promise<Result>;
}
