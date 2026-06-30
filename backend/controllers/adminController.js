import User from "../models/User.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
import Delivery from "../models/Delivery.js";
// ================= DASHBOARD STATS =================

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalSubscriptions = await Subscription.countDocuments({
      status: "Active",
    });

    const pendingDeliveries =
  await Delivery.countDocuments({
    status: "Pending",
  });

    const payments = await Payment.find({
      paymentStatus: "Success",
    });

    const totalRevenue = payments.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    res.json({
  totalUsers,
  totalOrders,
  totalSubscriptions,
  totalRevenue,
  pendingDeliveries,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL CUSTOMERS =================

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= RECENT ORDERS =================

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId")
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= RECENT PAYMENTS =================

export const getRecentPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId")
      .populate("orderId");

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ================= ANALYTICS =================

export const getAnalytics = async (req, res) => {
  try {
    // Revenue by month
    const revenueChart = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "Success",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueData = revenueChart.map((item) => ({
      month: months[item._id - 1],
      revenue: item.revenue,
    }));

    // Subscription status
    const active = await Subscription.countDocuments({
      status: "Active",
    });

    const cancelled = await Subscription.countDocuments({
      status: "Cancelled",
    });

    const expired = await Subscription.countDocuments({
      status: "Expired",
    });

    const subscriptionData = [
      {
        name: "Active",
        value: active,
      },
      {
        name: "Cancelled",
        value: cancelled,
      },
      {
        name: "Expired",
        value: expired,
      },
    ];

    // Top selling products
    const productSales = {};

    const orders = await Order.find().populate(
      "products.productId"
    );

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (!item.productId) return;

        const id = item.productId._id.toString();

        if (!productSales[id]) {
          productSales[id] = {
            name: item.productId.name,
            sales: 0,
            revenue: 0,
          };
        }

        productSales[id].sales += item.quantity;

        productSales[id].revenue +=
          item.quantity * item.productId.price;
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    res.json({
      revenueData,
      subscriptionData,
      topProducts,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= UPDATE CUSTOMER =================

export const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, deliveryTime } = req.body;

    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    customer.name = name ?? customer.name;
    customer.email = email ?? customer.email;
    customer.phone = phone ?? customer.phone;
    customer.address = address ?? customer.address;
    customer.deliveryTime =
      deliveryTime ?? customer.deliveryTime;

    await customer.save();

    res.json({
      message: "Customer updated successfully",
      customer,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE CUSTOMER =================

export const deleteCustomer = async (req, res) => {
  try {

    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.deleteOne();

    res.json({
      message: "Customer deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};