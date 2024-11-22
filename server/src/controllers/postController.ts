import postService from "../DBservices/postService";
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/apiErrors";
import fileService from "../services/fileService";
import userService from "../DBservices/userService";
import notificationService from "../DBservices/notificationService";
import { CustomRequest } from "../middlewares/authMiddleware";

interface Post {
  userId: any;
  image: string;
  likes: string[];
  comments: string[];
  description?: string;
}
class PostController {
  async createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId, description }: Partial<Post> = req.body;
    const { image }: any = req.files;
    try {
      if (!userId) {
        res.status(400).json({ message: "Error" });
        return;
      }
      const fileName = fileService.savefile(image);
      if (!fileName) {
        res.status(400).json("error on save image in database");
        return;
      }
      const newPost = await postService.createPost(
        userId,
        fileName,
        description
      );
      await userService.updateUserPosts(newPost.userId, newPost._id);
      return res.json(newPost);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }

  async getAllPosts(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user?.userId;
    try {
      const allPosts = await postService.findAllPosts();
      const updatedPosts = allPosts.map((post: any, i: number) => ({
        ...post,
        isFollow: post.userId.follows.includes(userId),
      }));
      return res.json(updatedPosts);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }
  async getAllPostsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.params.id;
    try {
      const userPosts = await postService.findPostsById(userId);
      return res.json(userPosts);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }

  async updatePostComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { commentId }: any = req.body;
    const postId = req.params.id;
    try {
      const updatedPost = await postService.updatePostComments(
        postId,
        commentId
      );
      res.json(updatedPost);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }

  async updatePostLikes(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.body.userId;
    const postId = req.params.id;
    const currentUserId = req.user?.userId;

    try {
      if (!currentUserId) {
        res.status(404).json({ message: "current user not defined" });
        return;
      }

      const post = await postService.findPostByPostId(postId);

      if (!post) {
        res.json({ message: "Post not found" });

        return;
      }

      const updatedPost = await postService.updateLikes(postId, currentUserId);
      await notificationService.createLikeNotification(
        currentUserId,
        userId,
        postId
      );
      res.json(updatedPost);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }
  async removePostLikes(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const currentUserId = req.user?.userId;
    const postId = req.params.id;

    try {
      if (!currentUserId) {
        res.status(404).json({ message: "current user not defined" });
        return;
      }
      const updatedPost = await postService.removeLikes(postId, currentUserId);
      res.json(updatedPost);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }
}

export default new PostController();
