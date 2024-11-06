import { UserModel } from "./../models/userModel";

class UserService {
    async createUser(username: string, fullName: string, profileImage: string) {
        const newUserProfile = await UserModel.create({ username, fullName, profileImage });
        return newUserProfile;
    }

    async findUserById(id: string) {
        const findedUser = UserModel.findById(id);
        return findedUser;
    }
    async findUserByIdAndPopulate(id: string) {
        const findedUser = UserModel.findById(id).populate("posts", "follows", "following")
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
            { $push: { follows: folowerId } }
        );
        return newFolower;
    }

    async updateUserFollowings(userId: string, folowingUserId: string) {
        const newFolowingUser = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { following: folowingUserId } }
        );

        return newFolowingUser;
    }
}

export default new UserService();
