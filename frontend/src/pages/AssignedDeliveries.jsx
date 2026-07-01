import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getMyDeliveries,
  updateDeliveryStatus,
} from "../services/deliveryService";

function AssignedDeliveries() {

  const { user } = useAuth();

  const [deliveries, setDeliveries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {

    loadDeliveries();

  }, []);

  const loadDeliveries = async () => {

    try {

      const data =
        await getMyDeliveries(
          user.token
        );

      setDeliveries(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleStatusChange =
    async (id, status) => {

      try {

        await updateDeliveryStatus(
          id,
          status,
          user.token
        );

        loadDeliveries();

      } catch (error) {

        console.log(error);

      }

    };

  const filteredDeliveries =
    deliveries.filter((delivery) => {

      const matchesSearch =
        delivery.userId?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        delivery.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  if (loading) {

    return (

      <div className="text-center p-10">

        Loading Deliveries...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">

          Assigned Deliveries

        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search Customer..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Assigned">
                Assigned
              </option>

              <option value="Out for Delivery">
                Out for Delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>

            </select>

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
                  Phone
                </th>

                <th>
                  Address
                </th>

                <th>
                  Date
                </th>

                <th>
                  Time
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

              {filteredDeliveries.length > 0 ? (

                filteredDeliveries.map(
                  (delivery) => (

                    <tr
                      key={delivery._id}
                      className="border-b text-center"
                    >

                      <td className="p-4">

                        {delivery.userId?.name}

                      </td>

                      <td>

                        {delivery.userId?.phone}

                      </td>

                      <td>

                        {delivery.deliveryAddress}

                      </td>

                      <td>

                        {new Date(
                          delivery.deliveryDate
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        {delivery.deliveryTime}

                      </td>

                      <td>

                        <span
                          className={
                            delivery.status ===
                            "Delivered"

                              ? "text-green-600 font-semibold"

                              : delivery.status ===
                                "Out for Delivery"

                              ? "text-blue-600 font-semibold"

                              : "text-yellow-600 font-semibold"
                          }
                        >

                          {delivery.status}

                        </span>

                      </td>

                      <td>

                        <select
                          value={delivery.status}
                          onChange={(e) =>
                            handleStatusChange(
                              delivery._id,
                              e.target.value
                            )
                          }
                          className="border rounded-lg p-2"
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Assigned">
                            Assigned
                          </option>

                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Skipped">
                            Skipped
                          </option>

                        </select>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="p-8 text-center text-gray-500"
                  >

                    No Assigned Deliveries

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

export default AssignedDeliveries;