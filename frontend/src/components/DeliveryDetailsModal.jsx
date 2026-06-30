import React from "react";

function DeliveryDetailsModal({
  open,
  onClose,
  selectedDate,
  deliveries,
  onStatusChange,
  onAssignBoy,
}){
  if (!open) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600 text-white";

      case "Pending":
        return "bg-yellow-500 text-white";

      case "Out for Delivery":
        return "bg-blue-600 text-white";

      case "Skipped":
        return "bg-red-600 text-white";

      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5">

      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <div>

            <h2 className="text-3xl font-bold">
              🚚 Delivery Details
            </h2>

            <p className="text-gray-500 mt-1">
              {selectedDate?.toDateString()}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-red-500 text-3xl font-bold"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          {deliveries.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-bold">

                No Deliveries

              </h3>

              <p className="text-gray-500 mt-2">

                No deliveries scheduled for this day.

              </p>

            </div>

          ) : (

            deliveries.map((delivery) => (

              <div
                key={delivery._id}
                className="border rounded-xl shadow-sm hover:shadow-lg transition p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold">

                      👤 {delivery.userId?.name}

                    </h3>

                    <p className="mt-3">

                      📍 {delivery.deliveryAddress}

                    </p>

                    <p>

                      🕒 {delivery.deliveryTime}

                    </p>

                    <p>

                      📅{" "}
                      {new Date(
                        delivery.deliveryDate
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      delivery.status
                    )}`}
                  >
                    {delivery.status}
                  </span>

                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                 <button
onClick={()=>
onAssignBoy(delivery)
}
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>

🚚 Assign Boy

</button>

                  <button
onClick={()=>
onStatusChange(
delivery._id,
"Out for Delivery"
)
}
className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
>

🚚 Out For Delivery

</button>

                  <button
onClick={()=>
onStatusChange(
delivery._id,
"Delivered"
)
}
className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>

✅ Delivered

</button>

                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">

                    ⏸ Pause

                  </button>

                <button
onClick={()=>
onStatusChange(
delivery._id,
"Skipped"
)
}
className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>

❌ Skip

</button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default DeliveryDetailsModal;