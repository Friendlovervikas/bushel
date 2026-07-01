import {
  MapPin,
  Phone,
  Clock3,
  User,
  Package,
  Truck,
  CheckCircle2,
  PauseCircle,
  XCircle,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function DeliveryCard({
  delivery,
  onAssign,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition duration-300 p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold flex items-center gap-2">

            <User size={20} />

            {delivery.userId?.name || "Customer"}

          </h2>

          <p className="text-gray-500 mt-1">

            Customer Delivery

          </p>

        </div>

        <StatusBadge status={delivery.status} />

      </div>

      {/* Customer Information */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="flex items-start gap-3">

          <Phone
            className="text-green-600 mt-1"
            size={18}
          />

          <div>

            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium">
              {delivery.userId?.phone || "N/A"}
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <Clock3
            className="text-blue-600 mt-1"
            size={18}
          />

          <div>

            <p className="text-sm text-gray-500">
              Delivery Time
            </p>

            <p className="font-medium">
              {delivery.deliveryTime}
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <Package
            className="text-orange-600 mt-1"
            size={18}
          />

          <div>

            <p className="text-sm text-gray-500">
              Subscription
            </p>

            <p className="font-medium">
              {delivery.subscriptionId?.planId?.name ||
                "N/A"}
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <MapPin
            className="text-red-600 mt-1"
            size={18}
          />

          <div>

            <p className="text-sm text-gray-500">
              Address
            </p>

            <p className="font-medium">
              {delivery.deliveryAddress}
            </p>

          </div>

        </div>

      </div>

      {/* Action Buttons */}



{onStatusChange && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">

    {onAssign && (
      <button
        onClick={() => onAssign(delivery)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 flex justify-center items-center gap-2"
      >
        <Truck size={18} />
        Assign
      </button>
    )}

    <button
      onClick={() =>
        onStatusChange(
          delivery._id,
          "Out for Delivery"
        )
      }
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
    >
      Out
    </button>

    <button
      onClick={() =>
        onStatusChange(
          delivery._id,
          "Delivered"
        )
      }
      className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 flex justify-center items-center gap-2"
    >
      <CheckCircle2 size={18} />
      Done
    </button>

    <button
      onClick={() =>
        onStatusChange(
          delivery._id,
          "Skipped"
        )
      }
      className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 flex justify-center items-center gap-2"
    >
      <XCircle size={18} />
      Skip
    </button>

  </div>
)}

    </div>
  );
}

export default DeliveryCard;