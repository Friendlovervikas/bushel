import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  createOrder,
  getUserOrders,
  getAllOrders,
  assignDeliveryBoy,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

/* ================= CUSTOMER ================= */

// Place Order
router.post(
  "/",
  protect,
  createOrder
);

// Customer Orders
router.get(
  "/my-orders",
  protect,
  getUserOrders
);

/* ================= ADMIN ================= */

// All Orders
router.get(
  "/",
  protect,
  adminOrSubAdmin,
  getAllOrders
);
// Assign Delivery Boy
router.put(
  "/:id/assign-delivery",
  protect,
  adminOrSubAdmin,
  assignDeliveryBoy
);

// Update Order Status
router.put(
  "/:id/status",
  protect,
  adminOrSubAdmin,
  updateOrderStatus
);
export default router;