import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import { roles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// Customer, Shop Owner, Delivery Boy, Admin
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

/* ================= SHOP OWNER & ADMIN ================= */

// Create Product
router.post(
  "/",
  protect,
  roles("shopowner", "admin"),
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  roles("shopowner", "admin"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  roles("shopowner", "admin"),
  deleteProduct
);

export default router;