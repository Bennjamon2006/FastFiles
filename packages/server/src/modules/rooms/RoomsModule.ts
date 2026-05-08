import type { Module, ModuleContext } from "@/modules/Module";
import RoomsController from "./RoomsController";

export default class RoomsModule implements Module {
  public register(context: ModuleContext) {
    const controller = new RoomsController();

    context.adapter.registerController("/api/rooms", controller);
  }
}
