import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Customer
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assigned Delivery Boy
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

    // Ordered Products
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: String,

        image: String,

        price: Number,

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    // Total Bill
    totalAmount: {
      type: Number,
      required: true,
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: [
        "Cash On Delivery",
        "Online",
      ],
      default: "Cash On Delivery",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    // Address
    deliveryAddress: {
      type: String,
      required: true,
    },

    deliveryTime: {
      type: String,
      enum: [
        "Morning",
        "Evening",
      ],
      default: "Morning",
    },

    deliveryDate: {
      type: Date,
      default: Date.now,
    },

    // Order Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
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

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;