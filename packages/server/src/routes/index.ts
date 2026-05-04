import { ExpressAdapter } from "@/adapters/ExpressAdapter";
import roomsRoutes from "@/routes/rooms.routes";

const expressAdapter = new ExpressAdapter();

expressAdapter.registerController("/rooms", roomsRoutes);

export default expressAdapter.create();
