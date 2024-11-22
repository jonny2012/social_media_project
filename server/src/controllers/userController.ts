import userService from "../DBservices/userService";
import ApiError from "../errors/apiErrors";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import notificationService from "../DBservices/notificationService";
import { CustomRequest } from "../middlewares/authMiddleware";

class UserController {
  async getUserById(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.params.id;
    try {
      if (!userId) {
        next(ApiError.badRequest("data not entered in params"));
        return;
      }
      const findedUser = await userService.findUserById(userId);
      if (!findedUser) {
        res.json({ message: " User not found" });
        return;
      }
      return res.json(findedUser);
    } catch (error: any) {
      next(ApiError.internal(error));
    }
  }
  async getAllUsers(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const findedUsers = await userService.findAllUsers();
      if (!findedUsers) {
        res.status(404).json({ message: " Users not found" });
        next(ApiError.badRequest("Users not found "));
      }
      return res.json(findedUsers);
    } catch (error: any) {
      next(ApiError.internal(error));
    }
  }
  async getAllUserDataByUserId(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.params.id;
    try {
      const userData = await userService.findUserByIdAndPopulate(userId);

      if (!userData) {
        res.status(404).json({ message: "Error on get userData" });
        next(ApiError.badRequest("UserId is not correct"));
      }
      return res.json(userData);
    } catch (error: any) {
      next(ApiError.internal(error));
    }
  }
  async updateUserProfileImage(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.params.id;
    const userProfileImage = req.body.profileImage;
    try {
      if (userId || userProfileImage) {
        res.status(404).json({ message: "UserID or folower Id not entered" });
        next(ApiError.badRequest("Wrong  request data"));
      }
      const userData = await userService.updateProfileImage(
        userId,
        userProfileImage
      );

      if (!userData) {
        res.status(404).json({ message: "Error on get userData" });
        next(ApiError.badRequest("UserId is not correct"));
      }
      return res.json(userData);
    } catch (error: any) {
      next(ApiError.internal(error));
      res.status(500).json({ message: "Internal server Error" });
    }
  }

  async updateFollowers(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user?.userId;
    const folowerId = req.body.folowerId;
    try {
      if (!userId || !folowerId) {
        res.status(404).json({ message: "User not found" });
        next(ApiError.badRequest("UserId or follower id wrong"));
        return;
      }
      const user = await UserModel.findById(userId);
      const targetUser = await UserModel.findById(folowerId);

      if (!user || !targetUser) {
        res.status(404).json({ message: "User not found" });
        next(ApiError.badRequest("User or follower  wrong"));
        return;
      }

      if (user.following.includes(folowerId)) {
        user.following.pull(targetUser._id);
        targetUser.follows.pull(user._id);
        await user.save();
        await targetUser.save();
        res.status(200).json({ message: "Unfollow" });
        return;
      } else {
        user.following.addToSet(targetUser._id);
        targetUser.follows.addToSet(user._id);
        await user.save();
        await targetUser.save();

        res.status(200).json({ message: "Follow" });
      }
      await notificationService.createFollowNotification(userId, folowerId);
    } catch (error: any) {
      next(ApiError.internal(error));
      res.status(500).json({ message: "Internal server Error" });
    }
  }
  async checkFollow(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const currentUser = req.user?.userId;
    const followedUser: any = req.params?.id;
    try {
      if (!followedUser || !currentUser) {
        res.status(404).json({ message: "Follower data undefined" });
        next(ApiError.badRequest("Follower data undefined"));
        return;
      }
      const user = await UserModel.findById(currentUser);

      if (user?.following.includes(followedUser)) {
        res.json({ message: "Unfollow" });
        return;
      } else {
        res.json({ message: "Follow" });
        return;
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
      next(ApiError.internal(error));
    }
  }
  async searchUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const limit = 5;
      const search = req.query.name;

      const users = await UserModel.find({
        fullName: { $regex: search, $options: "i" },
      })
        .select("_id fullName profileImage")
        .limit(limit);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
      next(ApiError.internal(error));
    }
  }
}
export default new UserController();
