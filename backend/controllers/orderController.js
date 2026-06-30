import Order from "../models/Order.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {

    const {
      products,
      totalAmount,
      deliveryAddress,
      deliveryTime,
      paymentMethod,
      notes,
    } = req.body;

    const user = await User.findById(req.user._id);

    const order = await Order.create({
      userId: req.user._id,

      products,

      totalAmount,

      deliveryAddress:
        deliveryAddress || user.address,

      deliveryTime:
        deliveryTime || user.deliveryTime,

      paymentMethod:
        paymentMethod || "Cash On Delivery",

      paymentStatus:
        paymentMethod === "Online"
          ? "Paid"
          : "Pending",

      notes,

      status: "Pending",
    });

    await Payment.create({
      userId: req.user._id,
      orderId: order._id,
      amount: totalAmount,
      paymentMethod:
        paymentMethod || "Cash On Delivery",
      paymentStatus:
        paymentMethod === "Online"
          ? "Success"
          : "Pending",
    });

    const notification =
await Notification.create({
  userId: req.user._id,
  title: "Order Placed",
  message: `Your order ${order._id
    .toString()
    .slice(-6)
    .toUpperCase()} has been placed successfully.`,
  type: "Order",
});

sendNotification(
  req.user._id,
  notification
);

    const populatedOrder =
      await Order.findById(order._id)
        .populate("userId")
        .populate("deliveryBoy")
        .populate("shopOwner")
        .populate("products.productId");

    res.status(201).json(populatedOrder);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= CUSTOMER ORDERS =================
export const getUserOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find({
      userId: req.user._id,
    })
      .populate("products.productId")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= ADMIN ALL ORDERS =================
export const getAllOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find()
      .populate("userId")
      .populate("deliveryBoy")
      .populate("shopOwner")
      .populate("products.productId")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= ASSIGN DELIVERY BOY =================
export const assignDeliveryBoy =
  async (req, res) => {
    try {

      const order =
        await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      order.deliveryBoy =
        req.body.deliveryBoy;

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

// ================= UPDATE ORDER STATUS =================
export const updateOrderStatus =
  async (req, res) => {
    try {

      const order =
        await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      order.status =
        req.body.status || order.status;

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };