import Payment from "../models/Payment.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket.js";

// ================= CREATE PAYMENT =================
export const createPayment = async (req, res) => {
  try {

    const {
      orderId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      razorpayPaymentId,
      razorpayOrderId,
      remarks,
    } = req.body;

    const payment = await Payment.create({
      userId: req.user._id,

      orderId,

      amount,

      paymentMethod:
        paymentMethod || "Cash On Delivery",

      paymentStatus:
        paymentStatus || "Pending",

      transactionId:
        transactionId || "",

      razorpayPaymentId:
        razorpayPaymentId || "",

      razorpayOrderId:
        razorpayOrderId || "",

      remarks:
        remarks || "",
    });

    const notification =
      await Notification.create({
        userId: req.user._id,
        title: "Payment Successful",
        message: `Your payment of ₹${payment.amount} was successful.`,
        type: "Payment",
      });

    sendNotification(
      req.user._id,
      notification
    );

    res.status(201).json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= USER PAYMENT HISTORY =================
export const getMyPayments = async (req, res) => {
  try {

    const payments = await Payment.find({
      userId: req.user._id,
    })
      .populate("orderId")
      .sort({
        createdAt: -1,
      });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= ADMIN ALL PAYMENTS =================
export const getPayments = async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate("orderId")
      .sort({
        createdAt: -1,
      });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= SINGLE PAYMENT =================
export const getPaymentById = async (req, res) => {
  try {

    const payment = await Payment.findById(
      req.params.id
    )
      .populate("userId", "name email")
      .populate("orderId");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= UPDATE PAYMENT =================
export const updatePayment = async (req, res) => {
  try {

    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    payment.paymentMethod =
      req.body.paymentMethod ||
      payment.paymentMethod;

    payment.paymentStatus =
      req.body.paymentStatus ||
      payment.paymentStatus;

    payment.transactionId =
      req.body.transactionId ||
      payment.transactionId;

    payment.razorpayPaymentId =
      req.body.razorpayPaymentId ||
      payment.razorpayPaymentId;

    payment.razorpayOrderId =
      req.body.razorpayOrderId ||
      payment.razorpayOrderId;

    payment.remarks =
      req.body.remarks ||
      payment.remarks;

    const updatedPayment =
      await payment.save();

    res.json(updatedPayment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE PAYMENT =================
export const deletePayment = async (req, res) => {
  try {

    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    await payment.deleteOne();

    res.json({
      message: "Payment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};