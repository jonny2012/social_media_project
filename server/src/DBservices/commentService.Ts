import { Comment } from './../controllers/commentController';
import { CommentModel } from './../models/commentModel';



class CommentService {


    async createComment(userId: string, postId: string, comment: string) {

        const newComment = await CommentModel.create({ userId, postId, comment })
        return newComment
    }
}

export default new CommentService()