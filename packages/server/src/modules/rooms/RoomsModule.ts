import type { Module, ModuleContext } from "@/modules/Module";
import { RoomsController } from "./transport/http/RoomsController";
import { RoomsService } from "./services/RoomsService";
import { RedisRoomsRepository } from "./infrastructure/redis/RedisRoomsRepository";
import { HttpRoomsErrorMapper } from "./transport/http/HttpRoomsErrorMapper";

type RoomsModuleExports = {
  roomsService: RoomsService;
};

export default class RoomsModule implements Module<
  "rooms",
  RoomsModuleExports
> {
  get name() {
    return "rooms" as const;
  }

  public register(context: ModuleContext): RoomsModuleExports {
    const redisClient = context.container.get("redisClient");
    const loggerFactory = context.container.get("loggerFactory");
    const logger = loggerFactory.create({
      module: "RoomsModule",
    });

    const roomsRepository = new RedisRoomsRepository(
      redisClient,
      logger.child({ service: "RedisRoomsRepository" }),
    );
    const roomsService = new RoomsService(roomsRepository);
    const controller = new RoomsController(roomsService);

    context.adapter.registerController("/api/rooms", controller);

    const roomsErrorMapper = new HttpRoomsErrorMapper();

    context.httpErrorMapper.registerMapper(roomsErrorMapper);

    return { roomsService };
  }
}
