import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    // Customer
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Subscription
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },

    // Order
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    // Delivery Boy
    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Shop Owner
    shopOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Delivery Date
    deliveryDate: {
      type: Date,
      required: true,
    },

    // Delivery Time
    deliveryTime: {
      type: String,
      enum: [
        "Morning",
        "Evening",
      ],
      default: "Morning",
    },

    // Delivery Address
    deliveryAddress: {
      type: String,
      required: true,
    },

    // Delivery Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Skipped",
      ],
      default: "Pending",
    },

    // OTP Verification
  

    // Delivery Notes
    notes: {
      type: String,
      default: "",
    },

    // Delivered At
    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model(
  "Delivery",
  deliverySchema
);

export default Delivery;