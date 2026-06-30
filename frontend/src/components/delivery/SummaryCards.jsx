import {
  Truck,
  Clock3,
  Bike,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function SummaryCards({ deliveries = [] }) {
  const total = deliveries.length;

  const pending = deliveries.filter(
    (d) => d.status === "Pending"
  ).length;

  const outForDelivery = deliveries.filter(
    (d) => d.status === "Out for Delivery"
  ).length;

  const delivered = deliveries.filter(
    (d) => d.status === "Delivered"
  ).length;

  const skipped = deliveries.filter(
    (d) => d.status === "Skipped"
  ).length;

  const cards = [
    {
      title: "Today's Deliveries",
      value: total,
      icon: <Truck size={34} />,
      bg: "bg-indigo-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={34} />,
      bg: "bg-yellow-500",
    },
    {
      title: "Out For Delivery",
      value: outForDelivery,
      icon: <Bike size={34} />,
      bg: "bg-blue-600",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle2 size={34} />,
      bg: "bg-green-600",
    },
    {
      title: "Skipped",
      value: skipped,
      icon: <XCircle size={34} />,
      bg: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-2xl shadow-lg text-white p-6 transition duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-90">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {card.value}
              </h2>
            </div>

            <div className="opacity-90">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;