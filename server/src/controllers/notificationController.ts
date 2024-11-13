
import { NotificationModel } from "../models/notificationModel";
import { CustomRequest } from "../middlewares/authMiddleware";
import {Response,NextFunction } from "express";


class NotificationController {

    async  getUserNotifications(req:CustomRequest, res:Response, next:NextFunction):Promise<any> {
        const userId = req.user?.userId
      console.log(userId)
        try {
          if(!userId){
            res.status(404).json({message:"Wrong or undefined userId"})
            return
          }
          const notifications = await NotificationModel.find({ receiver: userId })
            .sort({ createdAt: -1 })
            .populate("sender", "username")     
            .lean();
            if(!notifications){
              res.status(404).json({message:"Error on get notifications"})
            }
          res.json(notifications);
        } catch (error) {
          res.status(500).json({ error: "Error fetching notifications" });
        }
      }
      async  markNotificationsAsRead(req:CustomRequest, res:Response, next:NextFunction):Promise<any> {
        const userId = req.user?.userId;
      
        try {
          await NotificationModel.updateMany(
            { receiver: userId, isRead: false },
            { $set: { isRead: true } }
          );
          res.json({ message: "Notifications marked as read" });
        } catch (error) {
          res.status(500).json({ error: "Error marking notifications as read" });
        }
      }
}

export default new NotificationController()