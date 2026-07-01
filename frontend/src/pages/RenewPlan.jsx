import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMySubscriptions } from "../services/subscriptionService";

function RenewPlan() {
  const [duration, setDuration] = useState("Monthly");
const [subscription, setSubscription] = useState(null);

const { user } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  loadSubscription();
}, []);

const loadSubscription = async () => {
  try {
    const data = await getMySubscriptions(user.token);

    if (data.length > 0) {
      setSubscription(data[0]);
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8">
          Renew Subscription
        </h1>

        {/* Current Plan */}

        <div className="bg-green-50 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold">
            Current Plan
          </h2>

          <p className="mt-3">
            {subscription?.planId?.name || "No Plan"}
          </p>

          <p>
            Expiry Date:{" "}
{subscription
  ? new Date(subscription.endDate).toLocaleDateString()
  : "N/A"}
          </p>

          <p className="text-green-600 font-semibold mt-2">
            Active
          </p>

        </div>

        {/* Duration Selection */}

        <h2 className="text-2xl font-bold mb-4">
          Select Duration
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <button
            onClick={() => setDuration("Weekly")}
            className={`p-4 rounded-lg border ${
              duration === "Weekly"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Weekly
            <br />
            ₹299
          </button>

          <button
            onClick={() => setDuration("Monthly")}
            className={`p-4 rounded-lg border ${
              duration === "Monthly"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Monthly
            <br />
            ₹999
          </button>

          <button
            onClick={() => setDuration("Yearly")}
            className={`p-4 rounded-lg border ${
              duration === "Yearly"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Yearly
            <br />
            ₹9999
          </button>

        </div>

        {/* Summary */}

        <div className="bg-gray-50 p-6 rounded-xl mt-8">

          <h2 className="text-2xl font-bold">
            Renewal Summary
          </h2>

          <p className="mt-3">
            Selected Plan: {subscription?.planId?.name}
          </p>

          <p>
            Duration: {duration}
          </p>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-4 mt-8">

          <button
  onClick={() => {
    if (!subscription) return;

   navigate("/payment", {
  state: {
    isRenewal: true,
    subscriptionId: subscription._id,
    selectedPlan: subscription.planId,
    checkoutData: {
      address: subscription.deliveryAddress,
      deliveryTime: subscription.deliveryTime,
      name: user.name,
      mobile: user.phone,
    },
  },
});
  }}
  className="bg-green-600 text-white px-8 py-3 rounded-lg"
>
  Renew Now
</button>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
            Upgrade Plan
          </button>

        </div>

      </div>

    </div>
  );
}

export default RenewPlan;