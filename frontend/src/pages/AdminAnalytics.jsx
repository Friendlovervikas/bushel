import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminCharts from "../components/AdminCharts";
import {
  getProducts,
} from "../services/productService";
import {
  getOrders,
} from "../services/orderService";
import {
  getPayments,
} from "../services/paymentService";
import {
  getSubscriptions,
} from "../services/subscriptionService";
import {
  getUsers,
} from "../services/userService";

function AdminAnalytics() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    subscriptions: 0,
    payments: 0,
    revenue: 0,
  });
  const [revenueData, setRevenueData] =
  useState([]);

const [orderData, setOrderData] =
  useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        users,
        products,
        orders,
        subscriptions,
        payments,
      ] = await Promise.all([
        getUsers(user.token),
        getProducts(),
        getOrders(user.token),
        getSubscriptions(user.token),
        getPayments(user.token),
      ]);

      const revenue =
        payments.reduce(
          (sum, payment) =>
            payment.paymentStatus === "Success"
              ? sum + payment.amount
              : sum,
          0
        );
        // ================= MONTHLY REVENUE =================

const monthlyRevenue = {};

payments.forEach((payment) => {

  if (
    payment.paymentStatus !== "Success"
  )
    return;

  const month = new Date(
    payment.createdAt
  ).toLocaleString("default", {
    month: "short",
  });

  monthlyRevenue[month] =
    (monthlyRevenue[month] || 0) +
    payment.amount;

});

const revenueChart =
  Object.keys(monthlyRevenue).map(
    (month) => ({
      month,
      revenue:
        monthlyRevenue[month],
    })
  );

// ================= ORDER STATUS =================

const orderStatus = {};

orders.forEach((order) => {

  orderStatus[order.status] =
    (orderStatus[
      order.status
    ] || 0) + 1;

});

const orderChart =
  Object.keys(orderStatus).map(
    (status) => ({
      name: status,
      value:
        orderStatus[status],
    })
  );

setRevenueData(
  revenueChart
);

setOrderData(
  orderChart
);

      setStats({
        users: users.length,
        products: products.length,
        orders: orders.length,
        subscriptions:
          subscriptions.length,
        payments: payments.length,
        revenue,
      });

    } catch (error) {

      console.log(error);

    }

  };
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Total Customers
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.users}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Products
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {stats.products}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Orders
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-3">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Active Subscriptions
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {stats.subscriptions}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Payments
          </h2>

          <p className="text-4xl font-bold text-pink-600 mt-3">
            {stats.payments}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-lg">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold text-green-700 mt-3">
            ₹{stats.revenue}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Business Overview
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border rounded-lg p-6">

            <h3 className="text-xl font-semibold mb-3">
              Orders
            </h3>

            <p className="text-gray-600">
              Total Orders Received
            </p>

            <p className="text-3xl font-bold mt-2">
              {stats.orders}
            </p>

          </div>

          <div className="border rounded-lg p-6">

            <h3 className="text-xl font-semibold mb-3">
              Revenue
            </h3>

            <p className="text-gray-600">
              Total Successful Payments
            </p>

            <p className="text-3xl font-bold mt-2 text-green-600">
              ₹{stats.revenue}
            </p>

          </div>

        </div>

      </div>

<AdminCharts
  revenueData={revenueData}
  orderData={orderData}
/>
    </div>

    
  );
}

export default AdminAnalytics;