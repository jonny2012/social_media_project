import { Router } from "express";

import chatController from "../controllers/chatController";
import { checkAuth } from "../middlewares/authMiddleware";

const chatRoutes = Router()

chatRoutes.get("/room/:id", checkAuth, chatController.getRoom)
chatRoutes.get("/room/messages/:id", checkAuth, chatController.getAllMessages)
chatRoutes.get("/rooms", checkAuth, chatController.getAllRoomsForCurrentUser)


export default chatRoutes