import {
  Clock3,
  Bike,
  CheckCircle2,
  XCircle,
  PauseCircle,
} from "lucide-react";

function StatusBadge({ status }) {
  const statusConfig = {
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      icon: <Clock3 size={16} />,
    },

    "Out for Delivery": {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
      icon: <Bike size={16} />,
    },

    Delivered: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      icon: <CheckCircle2 size={16} />,
    },

    Skipped: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
      icon: <XCircle size={16} />,
    },

    Paused: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: <PauseCircle size={16} />,
    },
  };

  const current =
    statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: <PauseCircle size={16} />,
    };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium text-sm ${current.bg} ${current.text} ${current.border}`}
    >
      {current.icon}
      {status}
    </span>
  );
}

export default StatusBadge;