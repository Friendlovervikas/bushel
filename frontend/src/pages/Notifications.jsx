import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

import {
  markAsRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {

  const { user } = useAuth();

  const {
    notifications,
    loadNotifications,
  } = useNotification();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filter,
    setFilter,
  ] = useState("All");

 useEffect(() => {
  if (!user) return;

  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 5000); // Refresh every 5 seconds

  return () => clearInterval(interval);
}, [user]);

  const handleRead = async (
    id
  ) => {

    try {

      await markAsRead(
        id,
        user.token
      );

      await loadNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (
    id
  ) => {

    if (
      !window.confirm(
        "Delete this notification?"
      )
    ) {
      return;
    }

    try {

      await deleteNotification(
        id,
        user.token
      );

      await loadNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredNotifications =
    notifications.filter(
      (item) => {

        const matchesSearch =
          item.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.message
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesFilter =
          filter === "All" ||

          (filter === "Read" &&
            item.isRead) ||

          (filter === "Unread" &&
            !item.isRead);

        return (
          matchesSearch &&
          matchesFilter
        );

      }
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Notifications
        </h1>
                {/* Search & Filter */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search Notifications..."
              className="border p-3 rounded-lg"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="All">
                All Notifications
              </option>

              <option value="Read">
                Read
              </option>

              <option value="Unread">
                Unread
              </option>

            </select>

          </div>

        </div>

        {/* Notifications */}

        <div className="space-y-4">

          {filteredNotifications.length > 0 ? (

            filteredNotifications.map(
              (notification) => (

                <div
                  key={notification._id}
                  className={`rounded-xl shadow p-6 ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-green-50 border-l-4 border-green-600"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-xl font-bold">
                        {notification.title}
                      </h2>

                      <p className="text-gray-700 mt-2">
                        {notification.message}
                      </p>

                      <p className="text-sm text-gray-500 mt-3">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="space-x-2">

                      {!notification.isRead && (

                        <button
                          onClick={() =>
                            handleRead(
                              notification._id
                            )
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Read
                        </button>

                      )}

                      <button
                        onClick={() =>
                          handleDelete(
                            notification._id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              )
            )

          ) : (
                        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">

              No Notifications Found

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Notifications;