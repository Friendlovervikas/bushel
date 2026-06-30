import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
} from "../controllers/staffController.js";

const router = express.Router();

// ================= ALL STAFF =================

router.get(
  "/",
  protect,
  admin,
  getAllStaff
);

// ================= SINGLE STAFF =================

router.get(
  "/:id",
  protect,
  admin,
  getStaffById
);

// ================= CREATE STAFF =================

router.post(
  "/",
  protect,
  admin,
  createStaff
);

// ================= UPDATE STAFF =================

router.put(
  "/:id",
  protect,
  admin,
  updateStaff
);

// ================= DELETE STAFF =================

router.delete(
  "/:id",
  protect,
  admin,
  deleteStaff
);

// ================= ACTIVATE / DEACTIVATE =================

router.put(
  "/:id/status",
  protect,
  admin,
  toggleStaffStatus
);

export default router;