import express from "express";

import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// Get all plans
router.get("/", getPlans);

// Get single plan
router.get("/:id", getPlanById);

/* ================= ADMIN ROUTES ================= */

// Create Plan
router.post(
  "/",
  protect,
  admin,
  createPlan
);

// Update Plan
router.put(
  "/:id",
  protect,
  admin,
  updatePlan
);

// Delete Plan
router.delete(
  "/:id",
  protect,
  admin,
  deletePlan
);

export default router;