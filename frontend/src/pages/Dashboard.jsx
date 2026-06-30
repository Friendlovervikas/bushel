import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import {
  getMySubscriptions,
} from "../services/subscriptionService";

import {
  getUserOrders,
} from "../services/orderService";

function Dashboard() {

  const { user } = useAuth();

  const [
    subscription,
    setSubscription,
  ] = useState(null);

  const [
    orders,
    setOrders,
  ] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        if (!user?.token) return;

        // ================= SUBSCRIPTION =================

       const subscriptionData =
  await getMySubscriptions(
    user.token
  );
const mySubscription =
  subscriptionData.length > 0
    ? subscriptionData[0]
    : null;

setSubscription(mySubscription);

        // ================= MY ORDERS =================

        const orderData =
          await getUserOrders(
            user.token
          );

        setOrders(orderData);

      } catch (error) {

        console.log(error);

      }

    };

    loadData();

  }, [user]);
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Welcome, {user?.name}
        </h1>

        {/* ================= STATS ================= */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-bold text-lg">
              Current Plan
            </h3>

            <p className="mt-3 text-green-600 font-semibold">
              {subscription?.planId?.name || "No Plan"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-bold text-lg">
              Expiry Date
            </h3>

            <p className="mt-3">

              {subscription
                ? new Date(
                    subscription.endDate
                  ).toLocaleDateString()
                : "N/A"}

            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-bold text-lg">
              Delivery Time
            </h3>

            <p className="mt-3">
              {user?.deliveryTime || "Not Set"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-bold text-lg">
              Subscription Status
            </h3>

            <p
              className={`mt-3 font-semibold ${
                subscription?.status === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {subscription?.status ||
                "No Subscription"}
            </p>

          </div>

        </div>

        {/* ================= ADDRESS ================= */}

        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Delivery Address
          </h2>

          <p>
            {user?.address ||
              "No Address Added"}
          </p>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            to="/renew-plan"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Renew Plan
          </Link>

          <Link
  to="/plans"
  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
  Upgrade Plan
</Link>

          <Link
            to="/products"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg"
          >
            View Products
          </Link>

          <Link
            to="/profile"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            My Profile
          </Link>

          <Link
            to="/my-orders"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            My Orders
          </Link>
          <Link
  to="/payment-history"
  className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
>
  Payment History
</Link>

        </div>

        {/* ================= RECENT ORDERS ================= */}

        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">
                    Order ID
                  </th>

                  <th className="text-left p-3">
                    Date
                  </th>

                  <th className="text-left p-3">
                    Amount
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>
                                {orders.length > 0 ? (

                  orders.slice(0, 5).map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3 font-semibold">
                        {order._id
                          .slice(-6)
                          .toUpperCase()}
                      </td>

                      <td className="p-3">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        ₹{order.totalAmount}
                      </td>

                      <td className="p-3">

                        <span
                          className={`font-semibold ${
                            order.status === "Delivered"
                              ? "text-green-600"
                              : order.status ===
                                "Processing"
                              ? "text-blue-600"
                              : order.status ===
                                "Cancelled"
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >
                      No Orders Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          <div className="mt-6">

            <Link
              to="/my-orders"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              View All Orders
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;