import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createNotification,
  getNotifications,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// ================= CREATE =================

router.post(
  "/",
  protect,
  admin,
  createNotification
);

// ================= ADMIN GET ALL =================

router.get(
  "/",
  protect,
  admin,
  getNotifications
);

// ================= USER GET MY =================

router.get(
  "/my",
  protect,
  getUserNotifications
);

// ================= MARK AS READ =================

router.put(
  "/:id/read",
  protect,
  markAsRead
);

// ================= DELETE =================

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;