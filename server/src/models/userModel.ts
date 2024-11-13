import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    profileImage: { type: String },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    follows: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    bio: { type: String }
})
export const UserModel = mongoose.model("User", userSchema)