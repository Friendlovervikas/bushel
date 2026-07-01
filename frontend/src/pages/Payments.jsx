import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPayments,
  updatePayment,
  deletePayment,
} from "../services/paymentService";

function Payments() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] =
  useState("All");

const [methodFilter, setMethodFilter] =
  useState("All");

const [dateFilter, setDateFilter] =
  useState("");
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments(user.token);
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (
    id,
    paymentStatus
  ) => {
    try {
      await updatePayment(
        id,
        {
          paymentStatus,
        },
        user.token
      );

      alert("Payment Updated");

      loadPayments();

    } catch (error) {

      console.log(error);

    }
  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this payment?"
      )
    ) {
      return;
    }

    try {

      await deletePayment(
        id,
        user.token
      );

      alert("Payment Deleted");

      loadPayments();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredPayments = payments.filter(
  (payment) => {

    const matchesSearch =
      payment.userId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      payment.paymentStatus === statusFilter;

    const matchesMethod =
      methodFilter === "All" ||
      payment.paymentMethod === methodFilter;

    const matchesDate =
      !dateFilter ||
      new Date(payment.createdAt)
        .toISOString()
        .split("T")[0] === dateFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMethod &&
      matchesDate
    );

  }
);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Payment Management
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6 mb-8">

  <div className="grid md:grid-cols-4 gap-4">

    <input
      type="text"
      placeholder="Search Customer..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border rounded-lg p-3"
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="All">
        All Status
      </option>

      <option value="Pending">
        Pending
      </option>

      <option value="Success">
        Success
      </option>

      <option value="Failed">
        Failed
      </option>

    </select>

    <select
      value={methodFilter}
      onChange={(e) =>
        setMethodFilter(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="All">
        All Methods
      </option>

      <option value="UPI">
        UPI
      </option>

      <option value="Card">
        Card
      </option>

      <option value="COD">
        COD
      </option>

      <option value="Razorpay">
        Razorpay
      </option>

    </select>

    <input
      type="date"
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      className="border rounded-lg p-3"
    />

  </div>

</div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4">
                  Customer
                </th>

                <th>
                  Order ID
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Method
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
                              {filteredPayments.length > 0 ? (

                filteredPayments.map((payment) => (

                  <tr
                    key={payment._id}
                    className="border-b text-center"
                  >

                    <td className="p-4">
                      {payment.userId?.name}
                    </td>

                    <td>
                      {payment.orderId?._id
                        ?.slice(-6)
                        .toUpperCase()}
                    </td>

                    <td>
                      ₹{payment.amount}
                    </td>

                    <td>
                      {payment.paymentMethod}
                    </td>

                    <td>

                      <span
                        className={`font-semibold ${
                          payment.paymentStatus ===
                          "Success"
                            ? "text-green-600"
                            : payment.paymentStatus ===
                              "Failed"
                            ? "text-red-600"
                            : "text-orange-600"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>

                    </td>

                    <td>
                      {new Date(
                        payment.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="space-x-2">

  {isAdmin && (
    <>
      <button
        onClick={() =>
          handleStatus(
            payment._id,
            "Success"
          )
        }
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Success
      </button>

      <button
        onClick={() =>
          handleStatus(
            payment._id,
            "Failed"
          )
        }
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Failed
      </button>

      <button
        onClick={() =>
          handleDelete(
            payment._id
          )
        }
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </>
  )}

  {!isAdmin && (
    <span className="text-gray-500">
      View Only
    </span>
  )}

</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-8 text-gray-500"
                  >
                    No Payments Found
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

export default Payments;