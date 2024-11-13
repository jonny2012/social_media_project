
import { Router } from "express";
import notificationController from "../controllers/notificationController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router()

router.get("/notification", checkAuth, notificationController.getUserNotifications )


export default router