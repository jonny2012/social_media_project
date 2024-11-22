import { PostModel } from "../models/postModel";

class PostService {
  async createPost(
    userId: string,
    image: string,
    description: string | undefined
  ): Promise<any> {
    if (!description) {
      const newPost = await PostModel.create({ userId, image });
      return newPost;
    }
    const newPost = await PostModel.create({ userId, image, description });
    return newPost;
  }
  async findAllPosts() {
    const allPosts = await PostModel.find()
      .populate("userId")
      .populate({
        path: "comments",
        populate: "user",
      })
      .exec();
    return allPosts;
  }

  async findPostsById(userId: string) {
    const userPosts = await PostModel.find({ _id: userId });
    return userPosts;
  }

  async findPostByPostId(postId: string) {
    const userPost = await PostModel.findOne({ _id: postId })
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "fullName username profileImage _id",
        },
      })
      .exec();
    return userPost;
  }

  async updatePostComments(postId: string, commentId: string) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: commentId } }
    );
    return updatedPost;
  }
  async updateLikes(postId: string, userId: string) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $addToSet: { likes: userId } },
      { new: true }
    );
    return updatedPost;
  }
  async removeLikes(postId: string, userId: string) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $pull: { likes: userId } },
      { new: true }
    );
    return updatedPost;
  }
}
export default new PostService();
