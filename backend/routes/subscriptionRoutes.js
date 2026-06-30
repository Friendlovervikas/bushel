import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin, {
  adminOrSubAdmin,
} from "../middleware/adminMiddleware.js";

import {
  createSubscription,
  getSubscriptions,
  getMySubscriptions,
  getSubscriptionById,
  renewSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

/* ================= CUSTOMER ================= */

// Create Subscription
router.post(
  "/",
  protect,
  createSubscription
);

// My Subscriptions
router.get(
  "/my-subscriptions",
  protect,
  getMySubscriptions
);

// View Single Subscription
router.get(
  "/:id",
  protect,
  getSubscriptionById
);

/* ================= ADMIN ================= */

// All Subscriptions
router.get(
  "/",
  protect,
  adminOrSubAdmin,
  getSubscriptions
);

// Renew Subscription
router.put(
  "/:id/renew",
  protect,
  renewSubscription
);

// Pause Subscription
router.put(
  "/:id/pause",
  protect,
  admin,
  pauseSubscription
);

// Resume Subscription
router.put(
  "/:id/resume",
  protect,
  admin,
  resumeSubscription
);

// Cancel Subscription
router.put(
  "/:id/cancel",
  protect,
  admin,
  cancelSubscription
);

export default router;