import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getDeliveries,
  updateDeliveryStatus,
} from "../services/deliveryService";

function Deliveries() {
  const { user } = useAuth();

  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
  useState("All");

const [dateFilter, setDateFilter] =
  useState("");

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveries(user.token);
      setDeliveries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
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
    .includes(search.toLowerCase()) ||

  delivery.deliveryAddress
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||

  delivery.deliveryTime
    ?.toLowerCase()
    .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      delivery.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      new Date(delivery.deliveryDate)
        .toISOString()
        .split("T")[0] === dateFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate
    );

  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Delivery Management
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">


  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search Customer..."
      className="border rounded-lg p-3"
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
      className="border rounded-lg p-3"
    >
      <option value="All">
        All Status
      </option>

      <option value="Pending">
        Pending
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
                  Time
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDeliveries.length > 0 ? (

                filteredDeliveries.map((delivery) => (

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
                      {delivery.deliveryTime}
                    </td>

                    <td>
                      {new Date(
                        delivery.deliveryDate
                      ).toLocaleDateString()}
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
                        className="border rounded px-3 py-2"
                      >
                        <option>
                          Pending
                        </option>

                        <option>
                          Out for Delivery
                        </option>

                        <option>
                          Delivered
                        </option>

                        <option>
                          Skipped
                        </option>

                      </select>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="p-8 text-center"
                  >
                    No Deliveries Found
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

export default Deliveries;