import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

/* ================= USER CART ================= */

// Get Logged-in User Cart
router.get(
  "/",
  protect,
  getCartItems
);

// Add Item to Cart
router.post(
  "/",
  protect,
  addToCart
);

// Update Quantity
router.put(
  "/:id",
  protect,
  updateCartItem
);

// Remove Item
router.delete(
  "/:id",
  protect,
  removeCartItem
);

// Clear Entire Cart
router.delete(
  "/clear/all",
  protect,
  clearCart
);

export default router;