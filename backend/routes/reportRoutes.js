import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  ordersReport,
  paymentsReport,
  customersReport,
  productsReport,
  subscriptionsReport,
} from "../controllers/reportController.js";

const router = express.Router();

// ================= ORDERS REPORT =================
router.get(
  "/orders",
protect,
adminOrSubAdmin,
  ordersReport
);

// ================= PAYMENTS REPORT =================
router.get(
  "/payments",
 protect,
adminOrSubAdmin,
  paymentsReport
);

// ================= CUSTOMERS REPORT =================
router.get(
  "/customers",
 protect,
adminOrSubAdmin,
  customersReport
);

// ================= PRODUCTS REPORT =================
router.get(
  "/products",
  protect,
adminOrSubAdmin,
  productsReport
);

// ================= SUBSCRIPTIONS REPORT =================
router.get(
  "/subscriptions",
 protect,
adminOrSubAdmin,
  subscriptionsReport
);

export default router;