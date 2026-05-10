import type { Room } from "domain/models";
import type { RoomsRepository } from "../repositories/RoomsRepository";
import { RoomNotFound } from "../errors";

export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  private generateCode(length: number = 6): string {
    let result = "";

    while (result.length < length) {
      const num = Math.floor(Math.random() * 36);
      result += num.toString(36);
    }

    return result.toUpperCase();
  }

  public async createRoom(duration: number): Promise<Room> {
    let code: string;
    let success = false;
    const createdAt = Date.now();
    const expiresAt = createdAt + duration * 1000;

    do {
      code = this.generateCode();
      success = await this.roomsRepository.newRoom({
        code,
        createdAt,
        expiresAt,
      });
    } while (!success);

    return {
      code,
      createdAt,
      expiresAt,
    };
  }

  public async getRoomByCode(code: string): Promise<Room> {
    const room = await this.roomsRepository.getRoomByCode(code);

    if (!room) {
      throw new RoomNotFound(code);
    }

    return room;
  }
}
