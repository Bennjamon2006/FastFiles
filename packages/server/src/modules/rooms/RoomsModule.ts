import type { Module, ModuleContext } from "@/modules/Module";
import { RoomsController } from "./transport/http/RoomsController";
import { RoomsService } from "./services/RoomsService";
import { RedisRoomsRepository } from "./infrastructure/redis/RedisRoomsRepository";

export default class RoomsModule implements Module {
  public register(context: ModuleContext) {
    const redisClient = context.container.get("redisClient");

    const roomsRepository = new RedisRoomsRepository(redisClient);
    const roomsService = new RoomsService(roomsRepository);
    const controller = new RoomsController(roomsService);

    context.adapter.registerController("/api/rooms", controller);
  }
}
