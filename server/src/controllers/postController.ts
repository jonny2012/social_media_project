import postService from "../DBservices/postService"
import { NextFunction, Request, Response } from "express"
import ApiError from "../errors/apiErrors"
import fileService from "../services/fileService"
import userService from "../DBservices/userService"

interface Post {
    userId: string,
    image: string,
    likes: string[],
    comments: string[]
}

class PostController {
    async createPost(req: Request, res: Response, next: NextFunction): Promise<any> {

        const { userId }: Partial<Post> = req.body
        const { image }: any = req.files
        try {
            if (!userId) {
                res.status(400).json({ message: "Error" })
                return
            }
            const fileName = fileService.savefile(image)
            if (!fileName) {
                res.json("error on save image in database")
                return
            }
            const newPost = await postService.createPost(userId, fileName)
            await userService.updateUserPosts(newPost.userId, newPost._id)
            return res.json(newPost)
        }
        catch (error: any) {
            next(ApiError.internal(error.message))
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const allPosts = await postService.findAllPosts()
            return res.json(allPosts)
        }
        catch (error: any) {
            next(ApiError.internal(error.message))
        }
    }
    async getAllPostsByUserId(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.params.id
        try {
            const userPosts = await postService.findPostsById(userId)
            return res.json(userPosts)

        }
        catch (error: any) {
            next(ApiError.internal(error.message))
        }
    }

    async updatePostComments(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { commentId }: any = req.body
        const postId = req.params.id
        try {
            const updatedPost = await postService.updatePostComments(postId, commentId)
            res.json(updatedPost)
        }
        catch (error: any) {
            next(ApiError.internal(error.message))
        }
    }
}

export default new PostController()