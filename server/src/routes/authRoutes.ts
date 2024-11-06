
import { Router } from "express";
import authController from "../controllers/authController";

const router = Router()
router.post("/register", authController.registerAuthUser)
router.post("/login", authController.loginAuthUser)

export default router