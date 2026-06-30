import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    // Plan Name
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
        "Fruit Pack",
        "Juice",
        "Combo",
      ],
      required: true,
    },

    // Plan Image
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

    // Discount Price
    offerPrice: {
      type: Number,
      default: 0,
    },

    // Duration
    duration: {
      type: Number,
      required: true,
    },

    // Delivery Time
    deliveryTime: {
      type: String,
      enum: [
        "Morning",
        "Evening",
        "Both",
      ],
      default: "Morning",
    },

    // Features
    features: [
      {
        type: String,
      },
    ],

    // Plan Status
    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
      ],
      default: "Active",
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

const Plan = mongoose.model(
  "Plan",
  planSchema
);

export default Plan;