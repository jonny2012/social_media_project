import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const NotificationItem = ({ notification }: any) => {
  const typeOfNotification = (notificationTipe: string) => {
    if (notification && notification.type === "follow") {
      return ` New follower ${notification.sender.fullName}`;
    } else if (notification && notification.type === "like") {
      return `${notification.sender.fullName}  liked on your post`;
    }
  };
  return (
    <ListItem
      sx={{ "&:hover": { backgroundColor: "#d4d4d4" } }}
      key={notification.id}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar src={notification.profileImg} alt="profile" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1">
            {`${typeOfNotification(notification.type)}`}
          </Typography>
        }
        secondary={notification.time}
      />
      {notification.sender && (
        <Avatar
          src={`http://localhost:5000/avatar/${notification.sender.profileImage}`}
          alt="photo"
          sx={{ width: 48, height: 48, marginLeft: 2 }}
        />
      )}
    </ListItem>
  );
};
export default NotificationItem;
