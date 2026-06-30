import Cart from "../models/Cart.js";

// ================= ADD TO CART =================
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    let cartItem = await Cart.findOne({
      userId,
      productId,
    });

    if (cartItem) {
      cartItem.qty += qty || 1;

      await cartItem.save();

      return res.status(200).json(cartItem);
    }

    cartItem = await Cart.create({
      userId,
      productId,
      qty: qty || 1,
    });

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET USER CART =================
export const getCartItems = async (req, res) => {
  try {

    const userId = req.user._id;

    const cartItems = await Cart.find({
      userId,
    }).populate("productId");

    res.status(200).json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= UPDATE CART ITEM =================
export const updateCartItem = async (req, res) => {
  try {

    const cartItem = await Cart.findById(
      req.params.id
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.qty = req.body.qty;

    await cartItem.save();

    res.status(200).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= REMOVE CART ITEM =================
export const removeCartItem = async (req, res) => {
  try {

    const cartItem = await Cart.findById(
      req.params.id
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= CLEAR CART =================
export const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      userId: req.user._id,
    });

    res.status(200).json({
      message: "Cart cleared successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};