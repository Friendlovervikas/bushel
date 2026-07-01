import axios from "axios";

const API = "https://bushel-backend.onrender.com/api/orders";

// ================= CREATE ORDER =================

export const createOrder = async (
  orderData,
  token
) => {
  const { data } = await axios.post(
    API,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= CUSTOMER ORDERS =================

export const getUserOrders = async (
  token
) => {
  const { data } = await axios.get(
    `${API}/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= ADMIN ALL ORDERS =================

export const getOrders = async (
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

// ================= UPDATE ORDER STATUS =================

export const updateOrderStatus =
  async (
    id,
    status,
    token
  ) => {
    const { data } = await axios.put(
      `${API}/${id}/status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };