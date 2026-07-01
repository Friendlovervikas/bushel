import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyDeliveries } from "../services/deliveryService";

function DeliveryHistory() {
  const { user } = useAuth();

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getMyDeliveries(user.token);

      setDeliveries(
        data.filter(
          (delivery) =>
            delivery.status === "Delivered" ||
            delivery.status === "Skipped"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Delivery History
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4">Customer</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
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
                  {delivery.status}
                </td>
              </tr>
            ))}

            {deliveries.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-8 text-center"
                >
                  No Delivery History
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryHistory;