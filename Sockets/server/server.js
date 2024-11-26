import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New connection is established", socket.id);

  socket.emit("connected", {
    message: `You are connected to the server`,
    socket: socket.id,
  });

  socket.on("join-room", (payload) => {
    const { roomNum, name } = payload;
    socket.join(roomNum);
    io.to(roomNum).emit("join-success", {
      success: true,
      newJoin: {
        msg:`<----------- ${name} has joined the chat! ----------->`,
        socketId: socket.id,
      }
    });
  });

  socket.on("send-message", (payload) => {
    const { chatMsg, roomNum, name } = payload;

    io.to(roomNum).emit("new-chat-message", {
      message: chatMsg,
      senderName: name,
      senderSocketId: socket.id,
      roomNum
    });
  });

  socket.on("disconnect", (payload) => {
    console.log(`${socket.id} disconnected from server`, payload);
  });
});

httpServer.listen(8001, () => {
  console.log("Server successfully connected Port:: 8001");
});
