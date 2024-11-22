import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Dispatch } from "react";

interface Props {
  currentUser: string | null;
  room: null | undefined;
  messages: any[];
  message: string | null;
  receiverUser: string | undefined;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => any;
}

const ChatWindow = ({
  currentUser,
  room,
  receiverUser,
  message,
  setMessage,
  sendMessage,
}: Props) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Chat Header */}
      {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Avatar alt="Nikita" src="/static/images/avatar/1.jpg" />
                <Box sx={{ marginLeft: '16px' }}>
                    <Typography variant="h6">nikita</Typography>
                    <Typography variant="body2">nikita - ICHgram</Typography>
                </Box>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 'auto', textTransform: 'none' }}
                >
                    View Profile
                </Button>
            </Box>

            <Box sx={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                {room && room.messages.map((msg: any, index: number) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === currentUser ? 'flex-end' : 'flex-start',
                            marginBottom: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '70%',
                                padding: '8px 16px',
                                backgroundColor: msg.sender === currentUser ? '#673ab7' : '#e0e0e0',
                                color: msg.sender === currentUser ? '#fff' : '#000',
                                borderRadius: '12px',
                            }}
                        >
                            <Typography variant="body2">{msg.message}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box> */}

      {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderTop: '1px solid #ddd',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ marginRight: '8px' }}
                />
                <Button variant="contained" onClick={sendMessage}>
                    Send
                </Button>
            </Box> */}
    </Box>
  );
};

export default ChatWindow;
