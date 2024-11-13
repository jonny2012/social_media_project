import { NotificationModel } from "../models/notificationModel";


class NotificationService{


    async  createFollowNotification(senderId:string, receiverId:string) {
        try {
          const notification = await NotificationModel.create({
            type: "follow",
            sender: senderId,
            receiver: receiverId
          });

        } catch (error) {
          console.error("Error creating follow notification", error);
        }
      }
      async  createLikeNotification(senderId:string, receiverId:string, postId:string) {
        try {
          const notification = await NotificationModel.create({
            type: "like",
            sender: senderId,
            receiver: receiverId,
            post: postId
          });
        } catch (error) {
          console.error("Error creating like notification", error);
        }
      }



}

export default new NotificationService()