import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getUserOrders,
} from "../services/orderService";

function MyOrders() {

  const { user } = useAuth();

  const [
    orders,
    setOrders,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const data =
        await getUserOrders(
          user.token
        );

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =
        order._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        order.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });
      return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {/* ================= FILTERS ================= */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search Order ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg"
            >

              <option value="All">
                All Orders
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

        {/* ================= ORDERS TABLE ================= */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4">
                  Order ID
                </th>

                <th>
                  Date
                </th>

                <th>
                  Products
                </th>

                <th>
                  Address
                </th>

                <th>
                  Delivery Time
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>
                                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b text-center hover:bg-gray-50"
                    >

                      <td className="p-4 font-semibold">
                        {order._id
                          .slice(-6)
                          .toUpperCase()}
                      </td>

                      <td>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        {order.products?.map(
                          (item, index) => (

                            <div key={index}>

                              {item.productId?.name}

                              {" × "}

                              {item.quantity}

                            </div>

                          )
                        )}

                      </td>

                      <td>
                        {order.deliveryAddress ||
                          "N/A"}
                      </td>

                      <td>
                        {order.deliveryTime ||
                          "N/A"}
                      </td>

                      <td>
                        ₹{order.totalAmount}
                      </td>

                      <td>

                        <span
                          className={`font-semibold ${
                            order.status ===
                            "Delivered"
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
                      colSpan="7"
                      className="p-8 text-center text-gray-500"
                    >
                      No Orders Found
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

export default MyOrders;