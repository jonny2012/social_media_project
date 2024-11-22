import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/apiErrors";
import userService from "./../DBservices/userService";
import postService from "./../DBservices/postService";
import commentService from "../DBservices/commentService";

export interface Comment {
  _id?: any;
  userId: any;
  postId: any;
  comment: string;
  likes?: string[];
}
class CommentController {
  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId, postId, comment }: Comment = req.body;

    try {
      const user = await userService.findUserById(userId);
      if (!user) {
        next(ApiError.badRequest("User not found"));
        return res
          .status(404)
          .json({ message: "User with this userId not found" });
      }

      const newComment = await commentService.createComment(
        userId,
        postId,
        comment
      );
      if (!newComment) {
        next(ApiError.badRequest("Eror on creating comment"));
        return res.status(404).json({ message: "Error on cresting comment" });
      }
      await postService.updatePostComments(newComment.postId, newComment._id);
      const post = await postService.findPostByPostId(postId);
      if (!post) {
        next(ApiError.badRequest("Post with whis postId not found"));
        return res
          .status(404)
          .json({ message: "Post with this postId not found" });
      }
      return res.json(post);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }

  async getAllPostComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { postId } = req.params;

    try {
      if (!postId) {
        return res.status(404).json({ message: "postId is wrong" });
      }
      const post = await postService.findPostsById(postId);
      if (!post) {
        next(ApiError.badRequest("Post with whis postId not found"));
        return res
          .status(404)
          .json({ message: "Post with whis postId not found" });
      }
      const allPostComments = await commentService.findAllPostComments(postId);

      res.json(allPostComments);
    } catch (error: any) {
      next(ApiError.internal(error.message));
      res.status(500).json(error.message);
    }
  }
}
export default new CommentController();
