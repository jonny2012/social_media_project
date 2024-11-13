import { Router } from "express";
import postController from "../controllers/postController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router()

router.post("/post", checkAuth, postController.createPost)
router.get("/post", checkAuth, postController.getAllPosts)
router.get("/post/:id", checkAuth, postController.getAllPostsByUserId)
router.put("/post/add-comment/:id",checkAuth, postController.updatePostComments)
router.put("/post/add-like/:id", checkAuth, postController.updatePostLikes)
router.put("/post/remove-like/:id", checkAuth, postController.removePostLikes)

export default router