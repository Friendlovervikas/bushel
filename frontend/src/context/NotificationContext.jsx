import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getMyNotifications,
} from "../services/notificationService";

import socket from "../socket";

const NotificationContext =
  createContext();

export const NotificationProvider = ({
  children,
}) => {

  const { user } = useAuth();

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

useEffect(() => {
  if (!user) {
    setNotifications([]);
    setUnreadCount(0);
    return;
  }

  loadNotifications();

  const refresh = setInterval(() => {
    loadNotifications();
  }, 5000);

  socket.on("notification", (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  });

  return () => {
    clearInterval(refresh);
    socket.off("notification");
  };
}, [user]);

  const loadNotifications =
    async () => {

      try {

        const data =
          await getMyNotifications(
            user.token
          );

        setNotifications(data);

        const unread =
          data.filter(
            (item) => !item.isRead
          );

        setUnreadCount(
          unread.length
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loadNotifications,
      }}
    >

      {children}

    </NotificationContext.Provider>

  );

};

export const useNotification =
  () =>
    useContext(
      NotificationContext
    );