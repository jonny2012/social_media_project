import { Router } from "express";
import userController from "../controllers/userController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router()

router.get("/user", checkAuth, userController.getAllUsers)
router.get("/user/:id", checkAuth, userController.getAllUserDataByUserId)
router.put("/user/followers/:id", checkAuth, userController.updateFollowers)
router.put("/user/following:id", checkAuth, userController.updateUserFollowing)
router.put("/user/profile-image/:id", checkAuth, userController.updateUserProfileImage)
router.get("/search", checkAuth, userController.searchUsers)


export default router