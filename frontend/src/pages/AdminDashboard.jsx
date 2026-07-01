import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../services/adminService";

import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaShoppingCart,
  FaMoneyCheckAlt,
  FaTruck,
  FaChartBar,
  FaFileAlt,
  FaBell,
  FaUserTie,
  FaCog,
  FaAppleAlt,
} from "react-icons/fa";
function AdminDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalSubscriptions: 0,
    pendingDeliveries: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats(user.token);
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const dashboardCards = [
    {
      title: "Total Customers",
      value: stats.totalUsers,
      color: "bg-green-600",
      icon: "👥",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      color: "bg-blue-600",
      icon: "🛒",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      color: "bg-yellow-500",
      icon: "💰",
    },
    {
      title: "Subscriptions",
      value: stats.totalSubscriptions,
      color: "bg-purple-600",
      icon: "📦",
    },
    {
      title: "Pending Deliveries",
      value: stats.pendingDeliveries,
      color: "bg-red-500",
      icon: "🚚",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Statistics */}
{/* KPI Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

  {dashboardCards.map((card) => (

    <div
      key={card.title}
      className={`${card.color} rounded-2xl shadow-lg text-white p-6`}
    >

      <div className="text-4xl">

        {card.icon}

      </div>

      <h3 className="mt-5 text-lg">

        {card.title}

      </h3>

      <h2 className="text-4xl font-bold mt-3">

        {card.value}

      </h2>

    </div>

  ))}

</div>

        {/* Quick Management */}

        {/* Quick Management */}

<div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-3xl font-bold">
        Quick Management
      </h2>
      <p className="text-gray-500 mt-1">
        Manage your entire Bushel platform
      </p>
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

    {/* Customers */}

    <Link
      to="/customers"
      className="bg-blue-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
        👥
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Customers
      </p>
    </Link>

    {/* Products */}

    <Link
      to="/admin-products"
      className="bg-green-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
        🥗
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Products
      </p>
    </Link>

    {/* Plans */}

    <Link
      to="/admin-plans"
      className="bg-yellow-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-white text-2xl">
        📦
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Plans
      </p>
    </Link>

    {/* Subscription */}

    <Link
      to="/subscriptions"
      className="bg-purple-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl">
        🔄
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Subscription
      </p>
    </Link>

    {/* Orders */}

    <Link
      to="/orders"
      className="bg-indigo-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl">
        🛒
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Orders
      </p>
    </Link>

    {/* Payments */}

    <Link
      to="/payments"
      className="bg-pink-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center text-white text-2xl">
        💳
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Payments
      </p>
    </Link>

    {/* Deliveries */}

    <Link
      to="/deliveries"
      className="bg-cyan-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl">
        🚚
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Deliveries
      </p>
    </Link>

    {/* Analytics */}

    <Link
      to="/analytics"
      className="bg-orange-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl">
        📈
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Analytics
      </p>
    </Link>

    {/* Reports */}

    <Link
      to="/reports"
      className="bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl">
        📄
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Reports
      </p>
    </Link>

    {/* Staff */}

    <Link
      to="/manage-staff"
      className="bg-slate-100 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-white text-2xl">
        👨‍💼
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Staff
      </p>
    </Link>

    {/* Notifications */}

    <Link
      to="/notifications"
      className="bg-teal-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl">
        🔔
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Notifications
      </p>
    </Link>

    {/* Settings */}

    <Link
      to="/settings"
      className="bg-red-50 hover:shadow-lg hover:-translate-y-1 transition rounded-xl border p-4 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl">
        ⚙️
      </div>

      <p className="mt-3 font-semibold text-gray-700 text-sm">
        Settings
      </p>
    </Link>

  </div>

</div>


      </div>

    </div>
  );
}

export default AdminDashboard;