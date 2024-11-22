import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../redux/RTKqueries/chatQueries";
import SideMenu from "../sideMenu/SideMenu";

const ChatSideBar = ({ open, setOpen, socket }: any) => {
  const user = localStorage.getItem("userId");

  const {
    data: rooms,
    error: roomsError,
    isLoading: roomsIsLoading,
    refetch,
  } = useGetAllRoomsQuery("");
  const [usersData, setUsersData] = useState<any[]>([]);
  useEffect(() => {
    if (rooms) {
      const mapedData = rooms.map((room: any) => {
        return room.users?.filter((userData: any, i: number) => {
          return userData._id !== user ? userData.fullName : null;
        });
      });
      setUsersData(mapedData);
    }
  }, [rooms]);

  return (
    <>
      <SideMenu />
      <Box
        sx={{
          width: "100%",
          minWidth: "70px",
          maxWidth: "200px",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h4" sx={{ padding: "16px", fontWeight: "bold" }}>
          Chats
        </Typography>
        <List>
          {usersData &&
            usersData.map((user: any, i: number) => (
              <ListItem key={i}>
                <Link to={`/chat-room/${user[0]?._id}`}>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Avatar
                      alt={user[0]?.profileImage}
                      src={`http://localhost:5000/avatar/${user[0]?.profileImage}`}
                    />
                    <ListItemText primary={`${user[0]?.fullName}`} />
                  </Box>
                </Link>
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
};
export default ChatSideBar;
