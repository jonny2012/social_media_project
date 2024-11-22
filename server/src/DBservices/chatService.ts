import { Message, Room } from "../models/chatModels";
import { UserModel } from "../models/userModel";

class Service {
  // async SaveUserMessage(roomId, username, message) {
  //     const user = await User.findOne({ username });
  //     const newMessage = await Message.create({

  //         roomId,
  //         user: user.username,
  //         message,
  //     });
  //     return newMessage;
  // }
  async FindAllRoomMessages(roomId: string) {
    const Messages = await Room.findById({ _id: roomId })
      .populate("messages", "sender")
      .select({ messages: 1 })
      .sort({ createdAt: 1 });

    return Messages;
  }

  async createRoom(currentUserId: string, receiverUserId: string) {
    const findedRoom = await Room.findOne({
      users: { $all: [currentUserId, receiverUserId] },
    });
    if (!findedRoom) {
      const newRoom = await Room.create({
        users: [currentUserId, receiverUserId],
      });
      return newRoom;
    }
    return findedRoom;
  }
  async findRoom(currentUserId: string, receiverUserId: string) {
    const findedRoom = await Room.findOne({
      users: { $all: [currentUserId, receiverUserId] },
    })
      .populate("messages")
      .populate("users");
    return findedRoom;
  }
  async findAllRooms(currentUserId: string) {
    const allRooms = await Room.find({ users: { $in: [currentUserId] } })
      .populate("users")
      .select("users");
    return allRooms;
  }

  async AllUsers() {
    const user = await UserModel.find();
    return user;
  }

  async SaveRoomNewMessage(
    roomId: string,
    senderId: string,
    receiverId: string,
    message: string
  ) {
    try {
      const FindedRoom = await Room.findOne({ _id: roomId });

      const user = await UserModel.findById(senderId);
      const receiver = await UserModel.findById(receiverId);

      const newUserMessage = await Message.create({
        roomId: FindedRoom?._id,
        sender: user?._id,
        receiver: receiver?._id,
        message: message,
      });

      const updatedRoom = await Room.findByIdAndUpdate(
        { _id: FindedRoom?._id },
        { $push: { messages: newUserMessage._id } }
      );
      return newUserMessage;
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
export default new Service();
