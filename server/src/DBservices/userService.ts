import { UserModel } from "./../models/userModel";

class UserService {
  async createUser(username: string, fullName: string, profileImage: string) {
    const newUserProfile = await UserModel.create({
      username,
      fullName,
      profileImage,
    });
    return newUserProfile;
  }
  async findUserByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    return user;
  }
  async findAllUsers() {
    const users = await UserModel.find();
    return users;
  }
  async findUserById(id: string) {
    const findedUser = UserModel.findById(id);
    return findedUser;
  }
  async findUserByIdAndPopulate(id: string) {
    const findedUser = UserModel.findById(id).populate("posts");
    return findedUser;
  }
  async updateProfileImage(id: string, profile_image: string) {
    const updatedImage = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { profile_image } }
    );
    return updatedImage;
  }
  async updateUserPosts(userId: any, postId: any) {
    const newPost = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { posts: postId } }
    );
    return newPost;
  }
  async updateUserFolowers(userId: string, folowerId: string) {
    const newFolower = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { follows: folowerId } }
    );
    return newFolower;
  }

  async updateUserFollowings(userId: any, folowingUserId: string) {
    const newFolowingUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { following: folowingUserId } }
    );
    return newFolowingUser;
  }
}

export default new UserService();
