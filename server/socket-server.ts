
import express from "express";
import cors from "cors"
import http from "http"
import { Server } from "socket.io";
import chatService from "./src/DBservices/chatService";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import chatRoutes from "./src/routes/chatRoutes";
configDotenv({ path: ".env" })

const URI = process.env?.URI
const socketApp = express();
socketApp.use(cors())
const socketServer = http.createServer(socketApp);

socketApp.use("/chat", chatRoutes)

const io = new Server(socketServer, {
    cors: {
        origin: '*', // Replace with your React frontend URL
        methods: ['GET', 'POST'],
    },
});
io.on('connection', async (socket) => {
    socket.on("join-room", async ({ currentUser, receiver }) => {
        const room = await chatService.createRoom(currentUser, receiver)
        socket.join(`${room._id}`)
    })

    socket.on('send-message', async ({ roomId, message, sender, receiver }) => {
        console.log(roomId)
        const newMessage = await chatService.SaveRoomNewMessage(roomId, sender, receiver, message)
        io.to(roomId).emit("receive-message", { roomId, sender, message, messageId: newMessage?._id })

    });

    socket.on('disconnect', () => {

    });
});

const appStart = async () => {
    try {
        if (!URI) {
            console.log("Error on connecting to DB")
            return
        }
        mongoose.connect(URI)
        socketServer.listen(process.env.SOCKET_PORT)
        console.log(`socket is running on port ${[process.env.SOCKET_PORT]} `)
    }
    catch (err) {
        console.log(err)
    }
}
appStart()