import type { RedisClientType } from "redis";
import { RoomsRepository } from "../../repositories/RoomsRepository";
import type { Room } from "domain/models";

export class RedisRoomsRepository implements RoomsRepository {
  constructor(private readonly redisClient: RedisClientType) {}

  private getKey(code: string): string {
    return `room:${code}`;
  }

  public async newRoom(room: Room): Promise<boolean> {
    const key = this.getKey(room.code);

    const result = await this.redisClient.set(key, JSON.stringify(room), {
      NX: true,
      EX: Math.ceil((room.expiresAt - room.createdAt) / 1000),
    });

    return result === "OK";
  }
}
