import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
})
export const PostModel = mongoose.model("Post", postSchema)