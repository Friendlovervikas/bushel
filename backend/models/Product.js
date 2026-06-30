import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Product Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      required: true,
    },

    // Category
    category: {
      type: String,
      enum: [
        "Fruit",
        "Juice",
        "Meal",
        "Combo",
      ],
      required: true,
    },

    // Product Image
    image: {
      type: String,
      required: true,
    },

    // Original Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Offer Price
    offerPrice: {
      type: Number,
      default: 0,
    },

    // Available Quantity
    stock: {
      type: Number,
      default: 0,
    },

    // Product Unit
    unit: {
      type: String,
      enum: [
        "Piece",
        "Kg",
        "Gram",
        "Liter",
        "ML",
      ],
      default: "Piece",
    },

    // Product Status
    status: {
      type: String,
      enum: [
        "Available",
        "Out of Stock",
      ],
      default: "Available",
    },

    // Created By
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;