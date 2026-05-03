import { Router } from "express";
import RoomsController from "@/transport/http/RoomsController";

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsController.loadRoutes(roomsRouter);

export default roomsRouter;
