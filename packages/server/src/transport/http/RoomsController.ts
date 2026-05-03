import Controller from "@/core/http/Controller";
import Response from "@/core/http/Response";

export default class RoomsController extends Controller {
  constructor() {
    super();

    this.get("/", this.getRooms);
  }

  public async getRooms() {
    return new Response(200, {
      rooms: [],
      message: "Rooms from controller",
    });
  }
}
