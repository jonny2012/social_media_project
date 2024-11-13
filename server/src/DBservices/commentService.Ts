import { Comment } from './../controllers/commentController';
import { CommentModel } from './../models/commentModel';



class CommentService {


    async createComment(userId: string,postId:string, comment: string): Promise<any> {

        const newComment = await CommentModel.create({ userId,postId, comment })
        return newComment
    }

    async findAllPostComments(postId: string) {

        const postComments = await CommentModel.find({ postId: postId })
        return postComments
    }
}
export default new CommentService()