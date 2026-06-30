import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";

import {
  getMyPayments,
} from "../services/paymentService";

function PaymentHistory() {

  const { user } = useAuth();

  const [
    payments,
    setPayments,
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

    loadPayments();

  }, []);

  const loadPayments = async () => {

    try {

      const data =
        await getMyPayments(
          user.token
        );

      setPayments(data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredPayments =
    payments.filter((payment) => {

      const matchesSearch =
        payment._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        payment.orderId?._id
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        payment.paymentStatus ===
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
          Payment History
        </h1>

        {/* Search & Filter */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search Payment or Order ID..."
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

              <option value="Success">
                Success
              </option>

              <option value="Failed">
                Failed
              </option>

            </select>

          </div>

        </div>

        {/* Payment Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4">
                  Payment ID
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

              </tr>

            </thead>

            <tbody>
                              {filteredPayments.length > 0 ? (

                filteredPayments.map(
                  (payment) => (

                    <tr
                      key={payment._id}
                      className="border-b text-center"
                    >

                      <td className="p-4">
                        {payment._id
                          .slice(-6)
                          .toUpperCase()}
                      </td>

                      <td>
                        {payment.orderId
                          ? payment.orderId._id
                              .slice(-6)
                              .toUpperCase()
                          : "N/A"}
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

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500"
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

export default PaymentHistory;