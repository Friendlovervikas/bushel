import { Server } from "socket.io";

let io;

const allowedOrigins = [
  "http://localhost:5173",
  "https://bushel-jet.vercel.app",
  "https://generationspecial.com",
];

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User Joined: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;

export const sendNotification = (userId, notification) => {
  if (!io) {
    console.log("Socket.IO is not initialized");
    return;
  }

  io.to(userId.toString()).emit("notification", notification);
};
