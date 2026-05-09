import type { RedisClientType } from "redis";
import { RoomsRepository } from "../../repositories/RoomsRepository";
import type { Room } from "domain/models";
import type { Logger } from "@/core/logging";

export class RedisRoomsRepository implements RoomsRepository {
  constructor(
    private readonly redisClient: RedisClientType,
    private readonly logger: Logger,
  ) {}

  private getKey(code: string): string {
    return `room:${code}`;
  }

  private safeParse(json: string | null, code: string): Room | null {
    if (!json) {
      return null;
    }

    try {
      return JSON.parse(json) as Room;
    } catch (e) {
      this.logger.error("Invalid JSON in Redis for room", {
        error: e,
        raw: json,
        roomCode: code,
      });

      return null;
    }
  }

  public async newRoom(room: Room): Promise<boolean> {
    const key = this.getKey(room.code);

    const result = await this.redisClient.set(key, JSON.stringify(room), {
      NX: true,
      EX: Math.ceil((room.expiresAt - room.createdAt) / 1000),
    });

    return result === "OK";
  }

  public async getRoomByCode(code: string): Promise<Room | null> {
    const key = this.getKey(code);
    const result = await this.redisClient.get(key);

    return this.safeParse(result, code);
  }
}
