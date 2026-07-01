import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Truck,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
  getCustomerDeliveries,
} from "../services/deliveryService";

import StatusBadge from "../components/delivery/StatusBadge";

function MyDeliveries() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [deliveries, setDeliveries] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);

      const data =
        await getCustomerDeliveries(
          user.token
        );

      setDeliveries(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries =
    useMemo(() => {
      return deliveries.filter(
        (delivery) => {
          const plan =
            delivery.subscriptionId?.planId?.name?.toLowerCase() ||
            "";

          const matchSearch =
            plan.includes(
              search.toLowerCase()
            );

          const matchStatus =
            statusFilter === "All"
              ? true
              : delivery.status ===
                statusFilter;

          return (
            matchSearch &&
            matchStatus
          );
        }
      );
    }, [
      deliveries,
      search,
      statusFilter,
    ]);

  const total = deliveries.length;

  const pending =
    deliveries.filter(
      (d) =>
        d.status === "Pending"
    ).length;

  const delivered =
    deliveries.filter(
      (d) =>
        d.status === "Delivered"
    ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold">

          Loading...

        </h1>

      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

          <div>

            <h1 className="text-4xl font-bold flex items-center gap-3">

              <Truck className="text-green-600" />

              My Deliveries

            </h1>

            <p className="text-gray-500 mt-2">

              Track all your scheduled deliveries

            </p>

          </div>

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search by plan..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10 pr-4 py-3 border rounded-xl w-72 bg-white"
            />

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">

              Total Deliveries

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {total}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">

              Pending

            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-2">

              {pending}

            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">

              Delivered

            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">

              {delivered}

            </h2>

          </div>

        </div>

        {/* Filter */}

        <div className="bg-white rounded-2xl shadow p-5 mb-8">

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Assigned</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Skipped</option>
            <option>Cancelled</option>
          </select>

        </div>

        {/* Delivery Cards */}

        {filteredDeliveries.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <h2 className="text-2xl font-bold">

              No Deliveries Found

            </h2>

            <p className="text-gray-500 mt-3">

              You don't have any deliveries matching this filter.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredDeliveries.map((delivery) => (

              <div
                key={delivery._id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {delivery.subscriptionId?.planId?.name ||
                        "Subscription"}

                    </h2>

                    <p className="text-gray-500 mt-1">

                      ₹
                      {delivery.subscriptionId?.planId?.price ||
                        0}

                    </p>

                  </div>

                  <StatusBadge
                    status={delivery.status}
                  />

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div>

                    <p className="text-gray-500">

                      Delivery Date

                    </p>

                    <p className="font-semibold">

                      {new Date(
                        delivery.deliveryDate
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">

                      Delivery Time

                    </p>

                    <p className="font-semibold flex items-center gap-2">

                      <Clock3 size={18} />

                      {delivery.deliveryTime}

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">

                      Address

                    </p>

                    <p className="font-semibold">

                      {delivery.deliveryAddress}

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">

                      Delivery Boy

                    </p>

                    <p className="font-semibold">

                      {delivery.deliveryBoy?.name ||
                        "Not Assigned Yet"}

                    </p>

                    {delivery.deliveryBoy?.phone && (

                      <p className="text-sm text-gray-500">

                        {delivery.deliveryBoy.phone}

                      </p>

                    )}

                  </div>

                </div>

                {delivery.status ===
                  "Delivered" && (

                  <div className="mt-6 flex items-center gap-2 text-green-600 font-semibold">

                    <CheckCircle2
                      size={20}
                    />

                    Successfully Delivered

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyDeliveries;