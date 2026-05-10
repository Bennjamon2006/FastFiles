import type { ErrorMapper } from "@/core/errors";
import { RoomNotFound } from "../../errors";
import { HttpError } from "@/transport/http/model";

export class HttpRoomsErrorMapper implements ErrorMapper<HttpError> {
  public map(error: unknown): HttpError | undefined {
    if (error instanceof RoomNotFound) {
      return new HttpError(404, error.message, "ROOM_NOT_FOUND", error.details);
    }
  }
}
