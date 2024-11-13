import { Router } from "express";
import CommentController from "../controllers/commentController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router()

router.post("/comment", checkAuth, CommentController.createComment)
router.get("/comment/:postId", checkAuth, CommentController.getAllPostComments)



export default router