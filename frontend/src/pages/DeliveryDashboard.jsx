import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getMyDeliveries,
  updateDeliveryStatus,
} from "../services/deliveryService";

function DeliveryDashboard() {
  const { user } = useAuth();

  const [deliveries, setDeliveries] =
    useState([]);

  const [search, setSearch] =
    useState("");

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
          "Delivery Updated"
        );

        loadDeliveries();

      } catch (error) {

        console.log(error);

      }

    };

  


  const filteredDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.userId?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
      return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
  Assigned Deliveries
</h1>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

      </div>

      {/* Deliveries Table */}

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
                      {delivery.userId?.name}
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
                              "Cancelled"
                            ? "text-red-600 font-semibold"
                            : "text-yellow-600 font-semibold"
                        }
                      >
                        {delivery.status}
                      </span>

                    </td>

                    <td>

                      <div className="flex gap-2 justify-center">

                        <select
                          defaultValue=""
                          onChange={(e) =>
                            handleStatus(
                              delivery._id,
                              e.target.value
                            )
                          }
                          className="border rounded p-2"
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

                        

                      </div>

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
                  No Deliveries Assigned
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DeliveryDashboard;