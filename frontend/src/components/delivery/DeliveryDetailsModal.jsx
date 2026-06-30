import DeliveryCard from "./DeliveryCard";

function DeliveryDetailsModal({
  open,
  onClose,
  selectedDate,
  deliveries = [],
  onAssignBoy,
  onStatusChange,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">

      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-5">

          <div>

            <h2 className="text-3xl font-bold">

              🚚 Delivery Details

            </h2>

            <p className="text-gray-500 mt-2">

              {selectedDate
                ? selectedDate.toDateString()
                : ""}

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-red-500 hover:text-red-700"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6 overflow-y-auto max-h-[70vh]">

          {deliveries.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-bold">

                No Deliveries

              </h3>

              <p className="text-gray-500 mt-3">

                No deliveries scheduled for this date.

              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {deliveries.map((delivery) => (

                <DeliveryCard
                  key={delivery._id}
                  delivery={delivery}
                  onAssign={onAssignBoy}
                  onStatusChange={onStatusChange}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default DeliveryDetailsModal;