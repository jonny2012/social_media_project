import { Router } from "express";
import postController from "../controllers/postController";

const router = Router()

router.post("/post", postController.createPost)
router.get("/post", postController.getAllPosts)
router.get("/post/:id", postController.getAllPostsByUserId)
router.put("/post/:id", postController.updatePostComments)

export default router