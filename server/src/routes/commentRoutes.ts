import { Router } from "express";
import CommentController from "../controllers/commentController";

const router = Router()

router.post("/comment", CommentController.createComment)



export default router