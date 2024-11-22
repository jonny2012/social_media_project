import { Router } from "express";
import userController from "../controllers/userController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router();
router.get("/user", checkAuth, userController.getAllUsers);
router.get("/user/:id", checkAuth, userController.getAllUserDataByUserId);
router.put("/user/follow", checkAuth, userController.updateFollowers);
router.get("/user/check-follow/:id", checkAuth, userController.checkFollow);
router.put(
  "/user/profile-image",
  checkAuth,
  userController.updateUserProfileImage
);
router.get("/search", checkAuth, userController.searchUsers);

export default router;
