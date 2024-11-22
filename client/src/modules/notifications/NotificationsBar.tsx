import { Box, Typography, List, Drawer, IconButton } from "@mui/material";
import NotificationItem from "./NotificationItem";
import { useUserNotificationsQuery } from "../../redux/RTKqueries/postQueries";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const NotificationsBar = ({ openNotifications, setOpenNotifications }: any) => {
  const userId = localStorage.getItem("userId");
  const {
    data: notifications,
    error,
    isLoading,
  } = useUserNotificationsQuery(userId);

  return (
    <>
      <Drawer
        id="1213e"
        anchor="left"
        open={openNotifications}
        onClose={() => setOpenNotifications(!openNotifications)}
        ModalProps={{
          BackdropProps: {
            invisible: false,
            sx: { left: "250px" },
          },
        }}
        sx={{
          left: "250px",
          width: "350px",
          "& .MuiDrawer-paper": {
            transform: openNotifications
              ? "translateX(0)"
              : "translateX(250px)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "none",
            width: "350px",
            left: "250px",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={() => setOpenNotifications(!openNotifications)}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {notifications &&
            notifications.map((notification: any, index: number) => (
              <Link
                onClick={() => setOpenNotifications(!openNotifications)}
                to={`/user/${notification.sender._id}`}
                key={notification._id}
              >
                <NotificationItem key={index} notification={notification} />
              </Link>
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default NotificationsBar;
