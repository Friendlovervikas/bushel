import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import staffRoutes from "./routes/staffRoutes.js";




import http from "http";
import { initSocket } from "./socket.js";

dotenv.config();

console.log("Starting Bushel backend...");

connectDB();

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/staff", staffRoutes);
/* TEST ROUTE */
app.get("/", (req, res) => {
res.send("Bushel API Running...");
});

const PORT = process.env.PORT || 5001;

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});