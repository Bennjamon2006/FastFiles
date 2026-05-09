import type { Room } from "domain/models";

export interface RoomsRepository {
  newRoom(room: Room): Promise<boolean>;
  getRoomByCode(code: string): Promise<Room | null>;
}
