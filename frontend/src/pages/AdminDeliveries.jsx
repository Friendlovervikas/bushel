import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getDeliveries,
  assignDeliveryBoy,
  updateDeliveryStatus,
} from "../services/deliveryService";

function AdminDeliveries() {
  const { user } = useAuth();

  const [deliveries, setDeliveries] =
    useState([]);

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
        await getDeliveries(
          user.token
        );

      setDeliveries(data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleAssign =
    async (
      deliveryId,
      deliveryBoy
    ) => {

      try {

        await assignDeliveryBoy(
          deliveryId,
          deliveryBoy,
          user.token
        );

        alert(
          "Delivery Boy Assigned"
        );

        loadDeliveries();

      } catch (error) {

        console.log(error);

      }

    };

  const handleStatus =
    async (
      deliveryId,
      status
    ) => {

      try {

        await updateDeliveryStatus(
          deliveryId,
          status,
          user.token
        );

        alert(
          "Status Updated"
        );

        loadDeliveries();

      } catch (error) {

        console.log(error);

      }

    };

  const filteredDeliveries =
    deliveries.filter(
      (delivery) => {

        const matchesSearch =
          delivery.userId?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          statusFilter ===
            "All" ||
          delivery.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );
      return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Delivery Management
      </h1>

      {/* Search & Filter */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search Customer..."
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

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

      </div>

      {/* Delivery Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4">
                Customer
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
                Delivery Boy
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
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

                      {
                        delivery.userId
                          ?.name
                      }

                    </td>

                    <td>

                      {
                        delivery.deliveryAddress
                      }

                    </td>

                    <td>

                      {new Date(
                        delivery.deliveryDate
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      {
                        delivery.deliveryTime
                      }

                    </td>

                    <td>

                      {delivery
                        .deliveryBoy
                        ?.name ||
                        "Not Assigned"}

                    </td>

                    <td>

                      <span
                        className={
                          delivery.status ===
                          "Delivered"
                            ? "text-green-600 font-semibold"

                            : delivery.status ===
                              "Cancelled"
                            ? "text-red-600 font-semibold"

                            : "text-yellow-600 font-semibold"
                        }
                      >

                        {
                          delivery.status
                        }

                      </span>

                    </td>

                    <td>

                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() =>
                            handleAssign(
                              delivery._id,
                              prompt(
                                "Enter Delivery Boy User ID"
                              )
                            )
                          }
                          className="bg-blue-600 text-white px-3 py-2 rounded"
                        >
                          Assign
                        </button>

                        <select
                          onChange={(e) =>
                            handleStatus(
                              delivery._id,
                              e.target.value
                            )
                          }
                          className="border rounded p-2"
                          defaultValue=""
                        >

                          <option
                            value=""
                            disabled
                          >
                            Update
                          </option>

                          <option>
                            Pending
                          </option>

                          <option>
                            Assigned
                          </option>

                          <option>
                            Out for Delivery
                          </option>

                          <option>
                            Delivered
                          </option>

                          <option>
                            Cancelled
                          </option>

                        </select>

                      </div>

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
                  No Deliveries Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDeliveries;