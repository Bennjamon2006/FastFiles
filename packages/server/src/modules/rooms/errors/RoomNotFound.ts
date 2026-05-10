import { ResourceNotFoundError } from "@/core/errors/custom";

export class RoomNotFound extends ResourceNotFoundError {
  constructor(roomCode: string) {
    super(`Room with code ${roomCode} not found.`, {
      roomCode,
    });
  }
}
