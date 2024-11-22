import { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography, Button, Avatar } from "@mui/material";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import {
  useGetAllRoomsQuery,
  useGetCurrentRoomQuery,
} from "../../redux/RTKqueries/chatQueries";
import { useGetUserProfileQuery } from "../../redux/RTKqueries/userQueries";
import ChatSideBar from "./chatSideBar";
import { useSelector } from "react-redux";

const socket = io.connect("http://localhost:5003"); // Connect to the Socket.IO server

export interface Message {
  _id: string;
  roomId: string;
  sender: string;
  receiver: string;
  message: string;
}

export interface Room {
  _id: string;
  users: [string];
  messages: [Message];
}

const Chat = () => {
  const { id: receiver } = useParams();
  const user = localStorage.getItem("userId");
  const messagesEndRef = useRef<any>(null);

  const {
    data: rooms,
    error: roomsError,
    isLoading: roomsIsLoading,
    refetch: allRoomsRefetch,
  } = useGetAllRoomsQuery("");
  const {
    data: room,
    error,
    isLoading,
    refetch,
  } = useGetCurrentRoomQuery(receiver);
  const {
    data: receiverData,
    error: receiverError,
    isLoading: receiverIsLoading,
  } = useGetUserProfileQuery(receiver);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const ref = refetch();
    ref.then((data) => {
      if (data.isError) {
        refetch();
        allRoomsRefetch();
        console.log("error");
      }
    });
  }, []);

  useEffect(() => {
    socket.emit("join-room", { currentUser: user, receiver: receiver });
  }, [receiver]);

  useEffect(() => {
    if (room) {
      setMessages(room.messages);
      console.log(room);
    }
  }, [room]);
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
  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive-message", (data: any) => {
      setMessages((prevMessages) => {
        console.log(data);
        if (!prevMessages.some((msg) => msg.message === data.message)) {
          console.log(prevMessages);
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: user, message };

      setMessages((prev) => [...prev, newMessage]);
      console.log(room._id);
      socket.emit(
        "send-message",
        { roomId: room._id, message, sender: user, receiver: receiver },
        (response: any) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.message === newMessage.message ? response : msg
            )
          );
        }
      );
      setMessage("");
    }
  };
  if (isLoading || roomsIsLoading || receiverIsLoading)
    return <Box>...Loading</Box>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "80vw",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* Sidebar */}
        <ChatSideBar setOpen={setOpen} open={open} socket={socket} />

        {/* Chat Window */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            maxWidth: "100%",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Avatar
              alt="Nikita"
              src={`http://localhost:5000/avatar/${receiverData?.profileImage}`}
            />
            <Box sx={{ marginLeft: "16px" }}>
              <Typography variant="h6">{}</Typography>
              <Typography variant="body2">{receiverData?.fullName}</Typography>
            </Box>

            <Button
              variant="outlined"
              size="small"
              sx={{ marginLeft: "auto", textTransform: "none" }}
            >
              <Link to={`/user/${receiverData?._id}`}>View Profile</Link>
            </Button>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {messages &&
              messages.map((msg: any, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === user ? "flex-end" : "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: "8px 16px",
                      backgroundColor:
                        msg.sender === user ? "#673ab7" : "#e0e0e0",
                      color: msg.sender === user ? "#fff" : "#000",
                      borderRadius: "12px",
                    }}
                  >
                    <Typography variant="body2">{msg.message}</Typography>
                  </Box>
                </Box>
              ))}
            <Box ref={messagesEndRef}></Box>
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderTop: "1px solid #ddd",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ marginRight: "8px" }}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
