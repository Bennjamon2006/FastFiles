import Request from "./Request";
import Response from "./Response";

type Result = Response | void;

export default abstract class Middleware {
  public abstract handle(request: Request): Result | Promise<Result>;
}
