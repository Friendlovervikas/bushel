import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getMySubscriptions,
} from "../services/subscriptionService";
function MySubscription() {

  const { user } = useAuth();

  const [
    subscription,
    setSubscription,
  ] = useState(null);

  const [
    remainingDays,
    setRemainingDays,
  ] = useState(0);

  useEffect(() => {

    loadSubscription();

  }, []);

  const loadSubscription = async () => {

    try {

      const data =
  await getMySubscriptions(
    user.token
  );
const mySubscription =
  data.length > 0
    ? data[0]
    : null;

      setSubscription(
        mySubscription || null
      );

      if (mySubscription) {

        const today =
          new Date();

        const end =
          new Date(
            mySubscription.endDate
          );

        const diff =
          Math.ceil(
            (end - today) /
              (1000 * 60 * 60 * 24)
          );

        setRemainingDays(
          diff > 0 ? diff : 0
        );

      }

    } catch (error) {

      console.log(error);

    }

  };
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Subscription
        </h1>

        {!subscription ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-700">
              No Active Subscription
            </h2>

            <p className="mt-3 text-gray-500">
              You don't have any active subscription.
            </p>

            <Link
              to="/plans"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Browse Plans
            </Link>

          </div>

        ) : (

          <div className="bg-white rounded-xl shadow p-8">

            <div className="grid md:grid-cols-2 gap-8">

              {/* Left Side */}

              <div>

                <img
                  src={
                    subscription.planId?.image_url ||
                    subscription.planId?.image
                  }
                  alt={subscription.planId?.name}
                  className="w-full h-72 object-cover rounded-xl"
                />

              </div>

              {/* Right Side */}

              <div>

                <h2 className="text-3xl font-bold">
                  {subscription.planId?.name}
                </h2>

                <p className="mt-4 text-gray-600">
                  {subscription.planId?.description}
                </p>

                <div className="mt-8 space-y-4">

                  <p>
                    <strong>Category :</strong>{" "}
                    {subscription.planId?.category}
                  </p>

                  <p>
                    <strong>Price :</strong>{" "}
                    ₹{subscription.planId?.price}
                  </p>

                  <p>
                    <strong>Start Date :</strong>{" "}
                    {new Date(
                      subscription.startDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>End Date :</strong>{" "}
                    {new Date(
                      subscription.endDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Remaining Days :</strong>{" "}
                    {remainingDays}
                  </p>

                  <p>
                    <strong>Delivery Time :</strong>{" "}
                    {user?.deliveryTime || "Morning"}
                  </p>

                  <p>
                    <strong>Status :</strong>{" "}

                    <span
                      className={
                        subscription.status === "Active"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {subscription.status}
                    </span>

                  </p>

                </div>

                <div className="mt-8 flex gap-4">

                  <Link
                    to="/renew-plan"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg"
                  >
                    Renew Subscription
                  </Link>

                  <Link
                    to="/plans"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                  >
                    Upgrade Plan
                  </Link>

                </div>
                                {/* Plan Features */}

                <div className="mt-10">

                  <h3 className="text-2xl font-bold mb-4">
                    Plan Features
                  </h3>

                  <ul className="list-disc list-inside space-y-2">

                    {subscription.planId?.features &&
                    subscription.planId.features.length > 0 ? (

                      subscription.planId.features.map(
                        (feature, index) => (

                          <li key={index}>
                            {feature}
                          </li>

                        )
                      )

                    ) : (

                      <li>
                        No Features Available
                      </li>

                    )}

                  </ul>

                </div>

              </div>

            </div>

          </div>

        )}
              </div>

    </div>
  );
}

export default MySubscription;