import { Controller } from "@/transport/http/routing";
import { Request, Response } from "@/transport/http/model";
import { RoomsService } from "../../services/RoomsService";

export class RoomsController extends Controller {
  constructor(private readonly roomsService: RoomsService) {
    super();

    this.post("/", this.createRoom.bind(this));
    this.get("/:code", this.getRoomByCode.bind(this));
  }

  public async createRoom(request: Request) {
    const { duration } = request.body as { duration: number };
    const room = await this.roomsService.createRoom(duration);

    return Response.ok({
      room,
    });
  }

  public async getRoomByCode(request: Request) {
    const { code } = request.params as { code: string };
    const room = await this.roomsService.getRoomByCode(code);

    return Response.ok({
      room,
    });
  }
}
