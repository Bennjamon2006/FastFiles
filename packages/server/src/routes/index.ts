import type { HttpAdapter } from "@/core/http/HttpAdapter";
import roomsRoutes from "@/routes/rooms.routes";

export default function registerRoutes(adapter: HttpAdapter<unknown>): void {
  adapter.registerController("/rooms", roomsRoutes);
}
