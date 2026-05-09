import type { Request, Response } from "@/transport/http/model";

export type HttpHandler = (request: Request) => Response | Promise<Response>;
