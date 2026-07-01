import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getSubscriptions,
  renewSubscription,
  cancelSubscription,
} from "../services/subscriptionService";

function Subscriptions() {
  const { user } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSubscriptions();
  }, []);

  // const loadSubscriptions = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://bushel-backend.onrender.com/api/subscriptions",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );

  //     setSubscriptions(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
const loadSubscriptions = async () => {
  try {
    const data = await getSubscriptions(user.token);
    setSubscriptions(data);
  } catch (error) {
    console.log(error);
  }
};
 const handleRenew = async (id) => {
  try {
    await renewSubscription(id, user.token);

    alert("Subscription Renewed");

    loadSubscriptions();
  } catch (error) {
    console.log(error);
  }
};


  const handleCancel = async (id) => {
  try {
    await cancelSubscription(id, user.token);

    alert("Subscription Cancelled");

    loadSubscriptions();
  } catch (error) {
    console.log(error);
  }
};

  const filtered = subscriptions.filter((sub) =>
    sub.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Subscription Management
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <input
          type="text"
          placeholder="Search Customer..."
          className="w-full border p-3 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4">Customer</th>
              <th>Plan</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((sub) => (

              <tr
                key={sub._id}
                className="border-b text-center"
              >

                <td className="p-3">
                  {sub.userId?.name}
                </td>

                <td>
                  {sub.planId?.name}
                </td>

                <td>
                  {new Date(
                    sub.startDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {new Date(
                    sub.endDate
                  ).toLocaleDateString()}
                </td>

                <td
                  className={
                    sub.status === "Active"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {sub.status}
                </td>

                <td>

                  <button
                    onClick={() => handleRenew(sub._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Renew
                  </button>

                  <button
                   onClick={() => handleCancel(sub._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Subscriptions;