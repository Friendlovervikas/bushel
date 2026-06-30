import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    // Customer
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Selected Plan
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    // Related Payment
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    // Subscription Dates
    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // Delivery Preference
    deliveryTime: {
      type: String,
      enum: ["Morning", "Evening"],
      default: "Morning",
    },

    // Delivery Address
    deliveryAddress: {
      type: String,
      default: "",
    },

    // Auto Renew
    autoRenew: {
      type: Boolean,
      default: false,
    },

    // Pause Subscription
    isPaused: {
      type: Boolean,
      default: false,
    },

    // Subscription Status
    status: {
      type: String,
      enum: [
        "Active",
        "Paused",
        "Cancelled",
        "Expired",
      ],
      default: "Active",
    },

    // Customer Notes
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);

export default Subscription;