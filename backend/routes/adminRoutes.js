import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,
  getAnalytics,
  getCustomers,
  getRecentOrders,
  getRecentPayments,
  updateCustomer,
  deleteCustomer,
} from "../controllers/adminController.js";

const router = express.Router();

// ================= DASHBOARD =================

// Dashboard Cards
router.get(
  "/stats",
  protect,
  adminOrSubAdmin,
  getDashboardStats
);
// Charts + Top Products
router.get(
  "/analytics",
  protect,
  admin,
  getAnalytics
);

// ================= CUSTOMERS =================
router.put(
  "/customers/:id",
  protect,
  admin,
  updateCustomer
);

router.delete(
  "/customers/:id",
  protect,
  admin,
  deleteCustomer
);

router.get(
  "/customers",
  protect,
  adminOrSubAdmin,
  getCustomers
);

// ================= ORDERS =================

router.get(
  "/orders",
  protect,
  adminOrSubAdmin,
  getRecentOrders
);

// ================= PAYMENTS =================

router.get(
  "/payments",
  protect,
  adminOrSubAdmin,
  getRecentPayments
);
export default router;