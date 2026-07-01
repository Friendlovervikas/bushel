import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarView({
  deliveries = [],
  currentDate,
  setCurrentDate,
  search = "",
  onSelectDate,
}) {
  // Search Filter
  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // Convert to Calendar Events
  const events = filteredDeliveries.map((delivery) => ({
    id: delivery._id,

    title: delivery.userId?.name || "Customer",

    start: new Date(delivery.deliveryDate),

    end: new Date(delivery.deliveryDate),

    status: delivery.status,

    resource: delivery,
  }));

  // Event Colors
  const eventStyleGetter = (event) => {
    let backgroundColor = "#6b7280";

    switch (event.status) {
      case "Pending":
        backgroundColor = "#f59e0b";
        break;

      case "Out for Delivery":
        backgroundColor = "#2563eb";
        break;

      case "Delivered":
        backgroundColor = "#16a34a";
        break;

      case "Skipped":
        backgroundColor = "#dc2626";
        break;

      case "Paused":
        backgroundColor = "#4b5563";
        break;

      default:
        backgroundColor = "#6b7280";
    }

    return {
      style: {
        backgroundColor,
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "4px",
        fontWeight: "600",
      },
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        popup
        date={currentDate}
        onNavigate={(date) =>
          setCurrentDate(date)
        }
        style={{
          height: 750,
        }}
        eventPropGetter={eventStyleGetter}
        onSelectSlot={(slotInfo) =>
          onSelectDate(slotInfo.start)
        }
        onSelectEvent={(event) =>
          onSelectDate(event.start)
        }
      />

    </div>
  );
}

export default CalendarView;