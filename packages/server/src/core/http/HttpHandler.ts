import type Request  from "./Request";
import type Response from "./Response";

export type HttpHandler = (request: Request) => Response | Promise<Response>;