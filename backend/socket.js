import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User Joined: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });
  });
};

export const getIO = () => io;

// ================= SEND NOTIFICATION =================

export const sendNotification = (
  userId,
  notification
) => {
  if (!io) return;

  io.to(userId.toString()).emit(
    "notification",
    notification
  );
};