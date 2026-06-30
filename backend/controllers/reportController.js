import PDFDocument from "pdfkit";

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import Product from "../models/Product.js";

// ================= ORDERS REPORT =================

export const ordersReport = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name")
      .populate("products.productId");

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=orders-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("Bushel Orders Report", {
        align: "center",
      });

    doc.moveDown();

    orders.forEach((order, index) => {
      doc.fontSize(14).text(
        `${index + 1}. ${
          order.userId?.name || "Unknown"
        }`
      );

      doc.text(
        `Order ID: ${order._id}`
      );

      doc.text(
        `Total: ₹${order.totalAmount}`
      );

      doc.text(
        `Status: ${order.status}`
      );

      doc.text(
        `Date: ${new Date(
          order.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown();
    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};// ================= PAYMENTS REPORT =================

export const paymentsReport = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name")
      .populate("orderId");

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=payments-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("Bushel Payments Report", {
        align: "center",
      });

    doc.moveDown();

    payments.forEach((payment, index) => {

      doc.fontSize(14).text(
        `${index + 1}. ${payment.userId?.name || "Unknown"}`
      );

      doc.text(`Amount: ₹${payment.amount}`);

      doc.text(
        `Method: ${payment.paymentMethod}`
      );

      doc.text(
        `Status: ${payment.paymentStatus}`
      );

      doc.text(
        `Date: ${new Date(
          payment.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown();

    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= CUSTOMERS REPORT =================

export const customersReport = async (req, res) => {
  try {

    const customers = await User.find().select(
      "-password"
    );

    const doc = new PDFDocument({
      margin: 40,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customers-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("Bushel Customers Report", {
        align: "center",
      });

    doc.moveDown();

    customers.forEach((customer, index) => {

      doc.fontSize(14).text(
        `${index + 1}. ${customer.name}`
      );

      doc.text(
        `Email: ${customer.email}`
      );

      doc.text(
        `Role: ${customer.role}`
      );

      doc.moveDown();

    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= PRODUCTS REPORT =================

export const productsReport = async (req, res) => {
  try {

    const products = await Product.find();

    const doc = new PDFDocument({
      margin: 40,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=products-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("Bushel Products Report", {
        align: "center",
      });

    doc.moveDown();

    products.forEach((product, index) => {

      doc.fontSize(14).text(
        `${index + 1}. ${product.name}`
      );

      doc.text(
        `Category: ${product.category}`
      );

      doc.text(
        `Price: ₹${product.price}`
      );

      doc.text(
        `Stock: ${product.stock}`
      );

      doc.moveDown();

    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= SUBSCRIPTIONS REPORT =================

export const subscriptionsReport = async (req, res) => {
  try {

    const subscriptions =
      await Subscription.find()
        .populate("userId", "name")
        .populate("planId", "name");

    const doc = new PDFDocument({
      margin: 40,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=subscriptions-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text(
        "Bushel Subscriptions Report",
        {
          align: "center",
        }
      );

    doc.moveDown();

    subscriptions.forEach(
      (subscription, index) => {

        doc.fontSize(14).text(
          `${index + 1}. ${subscription.userId?.name}`
        );

        doc.text(
          `Plan: ${subscription.planId?.name}`
        );

        doc.text(
          `Status: ${subscription.status}`
        );

        doc.text(
          `End Date: ${new Date(
            subscription.endDate
          ).toLocaleDateString()}`
        );

        doc.moveDown();

      }
    );

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};