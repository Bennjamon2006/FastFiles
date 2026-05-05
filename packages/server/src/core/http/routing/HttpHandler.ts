import type { Request, Response } from "@/core/http/model";

export type HttpHandler = (request: Request) => Response | Promise<Response>;
