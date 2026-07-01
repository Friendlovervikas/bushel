import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getRecentOrders,
} from "../services/adminService";
import {
  updateOrderStatus,
} from "../services/orderService";

function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] =
  useState("All");

const [dateFilter, setDateFilter] =
  useState("");
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getRecentOrders(
        user.token
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

 const updateStatus = async (
  id,
  status
) => {
  try {

    await updateOrderStatus(
      id,
      status,
      user.token
    );

    loadOrders();

  } catch (error) {

    console.log(error);

  }
};

  const filteredOrders = orders.filter(
  (order) => {

    const matchesSearch =
      order.userId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order._id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      new Date(order.createdAt)
        .toISOString()
        .split("T")[0] === dateFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate
    );

  }
);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Delivery Management
        </h1>

        {/* Search */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search Customer or Order..."
      className="border p-3 rounded-lg"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    >
      <option value="All">
        All Status
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

    <input
      type="date"
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    />

  </div>

</div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4">
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Products
                </th>

                <th>
                  Address
                </th>

                <th>
                  Time
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>
                            {filteredOrders.length > 0 ? (

                filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b text-center"
                  >

                    <td className="p-4">
                      {order._id
                        .slice(-6)
                        .toUpperCase()}
                    </td>

                    <td>
                      {order.userId?.name}
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

                    <td>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border rounded p-2"
                      >

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

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
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

export default Orders;