import axios from "axios";

const API = "https://bushel-backend.onrender.com/api/notifications";

// ================= GET MY NOTIFICATIONS =================

export const getMyNotifications = async (
  token
) => {
  const { data } = await axios.get(
    `${API}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= GET ALL NOTIFICATIONS =================

export const getNotifications = async (
  token
) => {
  const { data } = await axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= MARK AS READ =================

export const markAsRead = async (
  id,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= DELETE =================

export const deleteNotification = async (
  id,
  token
) => {
  const { data } = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};