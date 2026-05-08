import { Controller } from "@/core/http/routing";
import { Response } from "@/core/http/model";

export default class RoomsController extends Controller {
  constructor() {
    super();

    this.get("/", this.getRooms);
  }

  public async getRooms() {
    return Response.ok({
      rooms: [],
      message: "Rooms from controller",
    });
  }
}
