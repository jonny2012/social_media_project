import { Response, NextFunction } from "express";
import { CustomRequest } from "../middlewares/authMiddleware.js";
import ApiError from "../errors/apiErrors";

import { UserModel } from "../models/userModel";
import { Message, Room } from "../models/chatModels";
import chatService from "./../DBservices/chatService";

class ChatController {
  async getAllMessages(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const messages = await chatService.FindAllRoomMessages(id);
      if (!messages) {
        res.status(400).json({ message: "Messages not found" });
        return;
      }
      res.json(messages);
    } catch (err) {
      console.log(err);
    }
  }
  async getAllRoomsForCurrentUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const currentUserId = req.user?.userId;
    try {
      if (!currentUserId) {
        res.status(400).json({ message: "Current user not found" });
        next(ApiError.badRequest("current user not found"));
        return;
      }
      const rooms = await chatService.findAllRooms(currentUserId);
      res.json(rooms);
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }
  async createRoomMessage(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const senderId = req.user?.userId;
    const receiverId = req.params.id;
    const message = req.body.message;
    try {
      const currentUser = await UserModel.findById(senderId);
      if (!currentUser) {
        res.status(400).json({ message: "Current user not found" });
        next(ApiError.badRequest("current user not found"));
        return;
      }
      const receiver = await UserModel.findById(receiverId);
      if (!receiver) {
        res.status(400).json({ message: "Receiver user not found" });
        next(ApiError.badRequest("Receiver user not found"));
        return;
      }
      const room = await Room.findOne({
        users: { $in: [senderId, receiverId] },
      });
      if (!room) {
        res.status(400).json({ message: "Receiver user not found" });
        next(ApiError.badRequest("Receiver user not found"));
        return;
      }

      const senderNewMessage = await Message.create({
        roomId: room._id,
        sender: currentUser._id,
        receiver: receiver._id,
        message: message,
      });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async getRoom(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const currentUser = req.user;
    const receiverUserId = req.params.id;

    try {
      if (!currentUser) {
        res.status(401).json({ message: "Authorization error" });
        next(ApiError.unauthorized("User not login"));
        return;
      }
      const room = await chatService.findRoom(
        currentUser.userId,
        receiverUserId
      );
      if (!room) {
        res.status(404).json({ message: "Room not found" });
        next(ApiError.badRequest("Room not found"));
        return;
      }

      res.json(room);
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }
}

export default new ChatController();
