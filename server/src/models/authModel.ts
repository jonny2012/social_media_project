import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const AuthModel = mongoose.model("Auth", authSchema)