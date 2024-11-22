import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    image: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    description: { type: String }
})
export const PostModel = mongoose.model("Post", postSchema)