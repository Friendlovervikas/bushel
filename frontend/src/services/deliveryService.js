import axios from "axios";

const API = "http://localhost:5001/api/deliveries";

// ================= GET ALL DELIVERIES =================

export const getDeliveries = async (token) => {
  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET MY DELIVERIES =================

export const getMyDeliveries = async (token) => {
  const { data } = await axios.get(
    `${API}/my-deliveries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= ASSIGN DELIVERY BOY =================

export const assignDeliveryBoy = async (
  id,
  deliveryBoy,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}/assign`,
    { deliveryBoy },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= UPDATE DELIVERY STATUS =================

export const updateDeliveryStatus = async (
  id,
  status,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
// ================= GET DELIVERY BY ID =================

export const getDeliveryById = async (
  id,
  token
) => {
  const { data } = await axios.get(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
export const getCustomerDeliveries = async (
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
