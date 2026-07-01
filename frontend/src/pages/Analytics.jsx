import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useAuth } from "../context/AuthContext";

import {
  getDashboardStats,
  getAnalytics,
} from "../services/adminService";

const COLORS = [
  "#16a34a",
  "#dc2626",
  "#f59e0b",
];

function Analytics() {
  const { user } = useAuth();

  const [analyticsData, setAnalyticsData] =
    useState([]);

  const [revenueData, setRevenueData] =
    useState([]);

  const [subscriptionData,
    setSubscriptionData] =
    useState([]);

  const [topProducts,
    setTopProducts] =
    useState([]);

  // ================= DOWNLOAD REPORT =================

  const downloadReport = async (type) => {
    try {

      const response = await axios.get(
        `http://localhost:5001/api/reports/${type}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${type}-report.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

      alert("Unable to download report.");

    }
  };

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  // ================= LOAD DASHBOARD =================

  const loadStats = async () => {
    try {

      const stats =
        await getDashboardStats(
          user.token
        );

      setAnalyticsData([
        {
          title: "Total Revenue",
          value: `₹${stats.totalRevenue}`,
        },
        {
          title: "Total Orders",
          value: stats.totalOrders,
        },
        {
          title: "Active Subscriptions",
          value: stats.totalSubscriptions,
        },
        {
          title: "Total Customers",
          value: stats.totalUsers,
        },
        {
          title: "Pending Deliveries",
          value: stats.pendingDeliveries,
        },
      ]);

      const analytics =
        await getAnalytics(user.token);

      setRevenueData(
        analytics.revenueData || []
      );

      setSubscriptionData(
        analytics.subscriptionData || []
      );

      setTopProducts(
        analytics.topProducts || []
      );

    } catch (error) {

      console.log(error);

    }
  };
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

        </div>

        {/* Reports */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Download Reports
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() =>
                downloadReport("orders")
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              📄 Orders Report
            </button>

            <button
              onClick={() =>
                downloadReport("payments")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              📄 Payments Report
            </button>

            <button
              onClick={() =>
                downloadReport("customers")
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
            >
              📄 Customers Report
            </button>

            <button
              onClick={() =>
                downloadReport("products")
              }
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg"
            >
              📄 Products Report
            </button>

            <button
              onClick={() =>
                downloadReport("subscriptions")
              }
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
            >
              📄 Subscriptions Report
            </button>

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          {analyticsData.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-6"
            >

              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-3">
                {item.value}
              </p>

            </div>

          ))}

        </div>

        {/* Revenue Chart */}

        <div className="bg-white rounded-xl shadow p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Revenue Overview
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={revenueData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>
                {/* Subscription Chart */}

        <div className="bg-white rounded-xl shadow p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Subscription Statistics
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={subscriptionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {subscriptionData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Top Selling Products */}

        <div className="bg-white rounded-xl shadow p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Top Selling Products
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Product
                </th>

                <th className="text-left p-3">
                  Sales
                </th>

                <th className="text-left p-3">
                  Revenue
                </th>

              </tr>

            </thead>

            <tbody>

              {topProducts.length > 0 ? (

                topProducts.map(
                  (product, index) => (

                    <tr
                      key={index}
                      className="border-b"
                    >

                      <td className="p-3">
                        {product.name}
                      </td>

                      <td className="p-3">
                        {product.sales}
                      </td>

                      <td className="p-3">
                        ₹{product.revenue}
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center p-6 text-gray-500"
                  >
                    No Product Data
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Analytics;