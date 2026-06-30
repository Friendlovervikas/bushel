import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Customer
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Related Order
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    // Amount
    amount: {
      type: Number,
      required: true,
    },

    // Payment Method
    paymentMethod: {
      type: String,
      enum: [
        "Cash On Delivery",
        "UPI",
        "Card",
        "Net Banking",
        "Wallet",
        "Razorpay",
      ],
      default: "Cash On Delivery",
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Success",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
    },

    // Transaction ID
    transactionId: {
      type: String,
      default: "",
    },

    // Razorpay Payment ID
    razorpayPaymentId: {
      type: String,
      default: "",
    },

    // Razorpay Order ID
    razorpayOrderId: {
      type: String,
      default: "",
    },

    // Optional Remarks
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model(
  "Payment",
  paymentSchema
);

export default Payment;