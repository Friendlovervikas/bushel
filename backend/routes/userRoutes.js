import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

/* ================= PROFILE ================= */

// Get Logged In User Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;