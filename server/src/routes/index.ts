import { Router } from "express";
import authRouter from "./authRoutes"
import  userRouter from "./userRoutes"
import postRouter from "./postRoutes"
import notificationRoutes from "./notificationRoutes"
import commentRoutes from "./commentRoutes"


const  router = Router()


router.use("/auth", authRouter)
router.use(userRouter)
router.use(postRouter)
router.use(commentRoutes)
router.use(notificationRoutes)

export default router