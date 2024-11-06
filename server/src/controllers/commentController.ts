import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/apiErrors";
import userService from "../DBservices/userService";
import postService from "../DBservices/postService";
import commentService from "../DBservices/commentService"

export interface Comment {
    userId: string,
    postId: string,
    comment: string,
    likes?: string[]
}
class CommentController {
    async createComment(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { userId, postId, comment }: Comment = req.body
        try {
            const user = await userService.findUserById(userId)
            if (!user) {
                next(ApiError.badRequest("User not found"))
                return res.json({ message: "User with this userId not found" })
            }
            const post = await postService.findPostsById(postId)
            if (!post) {
                next(ApiError.badRequest("Post with whis postId not found"))
                return res.json({ message: "Post with this postId not found" })
            }
            const newComment = await commentService.createComment(userId, postId, comment)
            await postService.updatePostComments(newComment.postId, newComment._id)
            return res.json(newComment)
        }

        catch (err: any) {
            next(ApiError.internal(err.message))
        }
    }
}
export default new CommentController()