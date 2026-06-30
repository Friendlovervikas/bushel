import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  createPayment,
  getMyPayments,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

/* ================= CUSTOMER ================= */

// Create Payment
router.post(
  "/",
  protect,
  createPayment
);

// Logged-in User Payment History
router.get(
  "/my-payments",
  protect,
  getMyPayments
);

// Get Single Payment
router.get(
  "/:id",
  protect,
  getPaymentById
);

/* ================= ADMIN ================= */

// All Payments
router.get(
  "/",
  protect,
  adminOrSubAdmin,
  getPayments
);

// Update Payment
router.put(
  "/:id",
  protect,
  admin,
  updatePayment
);

// Delete Payment
router.delete(
  "/:id",
  protect,
  admin,
  deletePayment
);

export default router;