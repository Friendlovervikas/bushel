import { io } from "socket.io-client";

const socket = io("https://bushel-backend.onrender.com", {
  autoConnect: false,
});

export default socket;