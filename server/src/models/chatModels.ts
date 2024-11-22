
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    roomId: { type: mongoose.Types.ObjectId, ref: "room" },
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
}, { timestamps: true });



const RoomSchema = new mongoose.Schema({
    room: { type: String },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "message" }]
})

const Room = mongoose.model("room", RoomSchema)
const Message = mongoose.model("message", MessageSchema);


export { Message, Room };
