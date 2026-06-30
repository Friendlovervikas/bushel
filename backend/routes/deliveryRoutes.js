import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  getDeliveries,
  getMyDeliveries,
  getCustomerDeliveries,
  assignDeliveryBoy,
  updateDeliveryStatus,
} from "../controllers/deliveryController.js";
const router = express.Router();

/* ================= DELIVERY BOY ================= */


// My Assigned Deliveries
router.get(
  "/my-deliveries",
  protect,
  getMyDeliveries
);
router.get(
  "/my",
  protect,
  getCustomerDeliveries
);

// Update Delivery Status
router.put(
  "/:id/status",
  protect,
  updateDeliveryStatus
);




/* ================= ADMIN ================= */

// Get All Deliveries
router.get(
  "/",
  protect,
  adminOrSubAdmin,
  getDeliveries
);
// Assign Delivery Boy
router.put(
  "/:id/assign",
  protect,
  admin,
  assignDeliveryBoy
);

export default router;