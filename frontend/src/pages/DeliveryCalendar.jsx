import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getDeliveries,
  updateDeliveryStatus,
  assignDeliveryBoy,
} from "../services/deliveryService";

import CalendarHeader from "../components/delivery/CalendarHeader";
import SummaryCards from "../components/delivery/SummaryCards";
import CalendarView from "../components/delivery/CalendarView";
import DeliveryDetailsModal from "../components/delivery/DeliveryDetailsModal";
import AssignDeliveryBoyModal from "../components/delivery/AssignDeliveryBoyModal";

function DeliveryCalendar() {
  const { user } = useAuth();

  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [selectedDeliveries, setSelectedDeliveries] =
    useState([]);

  const [selectedDelivery, setSelectedDelivery] =
    useState(null);

  const [openDetails, setOpenDetails] =
    useState(false);

  const [openAssign, setOpenAssign] =
    useState(false);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);

      const data = await getDeliveries(
        user.token
      );

      setDeliveries(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    const date = new Date(currentDate);

    date.setMonth(date.getMonth() - 1);

    setCurrentDate(date);
  };

  const handleNext = () => {
    const date = new Date(currentDate);

    date.setMonth(date.getMonth() + 1);

    setCurrentDate(date);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleRefresh = () => {
    loadDeliveries();
  };

  const handleSelectDate = (clickedDate) => {
    const filtered = deliveries.filter(
      (delivery) =>
        new Date(
          delivery.deliveryDate
        ).toDateString() ===
        clickedDate.toDateString()
    );

    setSelectedDate(clickedDate);

    setSelectedDeliveries(filtered);

    setOpenDetails(true);
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateDeliveryStatus(
        id,
        status,
        user.token
      );

      await loadDeliveries();

      handleSelectDate(selectedDate);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssignClick = (
    delivery
  ) => {
    setSelectedDelivery(delivery);

    setOpenAssign(true);
  };

  const handleAssignBoy = async (
    deliveryBoyId
  ) => {
    try {
      if (!selectedDelivery) return;

      await assignDeliveryBoy(
        selectedDelivery._id,
        deliveryBoyId,
        user.token
      );

      await loadDeliveries();

      setOpenAssign(false);

      setSelectedDelivery(null);

      handleSelectDate(selectedDate);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold">

          Loading Delivery Calendar...

        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <CalendarHeader
          search={search}
          setSearch={setSearch}
          currentDate={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onRefresh={handleRefresh}
        />

        <SummaryCards
          deliveries={deliveries}
        />

        <CalendarView
          deliveries={deliveries}
          search={search}
          currentDate={currentDate}
          setCurrentDate={
            setCurrentDate
          }
          onSelectDate={
            handleSelectDate
          }
        />

        <DeliveryDetailsModal
          open={openDetails}
          onClose={() =>
            setOpenDetails(false)
          }
          selectedDate={
            selectedDate
          }
          deliveries={
            selectedDeliveries
          }
          onAssignBoy={
            handleAssignClick
          }
          onStatusChange={
            handleStatusChange
          }
        />

        <AssignDeliveryBoyModal
          open={openAssign}
          onClose={() =>
            setOpenAssign(false)
          }
          onAssign={
            handleAssignBoy
          }
        />

      </div>

    </div>
  );
}

export default DeliveryCalendar;