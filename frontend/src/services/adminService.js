import axios from "axios";

const API = "http://localhost:5001/api/admin";

// ================= GET DASHBOARD =================

export const getDashboardStats = async (token) => {
  const { data } = await axios.get(
    `${API}/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= GET CUSTOMERS =================

export const getCustomers = async (token) => {
  const { data } = await axios.get(
    `${API}/customers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= GET ORDERS =================

export const getRecentOrders = async (token) => {
  const { data } = await axios.get(
    `${API}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= GET PAYMENTS =================

export const getRecentPayments = async (token) => {
  const { data } = await axios.get(
    `${API}/payments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
// ================= GET ANALYTICS =================

export const getAnalytics = async (token) => {
  const { data } = await axios.get(
    `${API}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
// ================= UPDATE CUSTOMER =================

export const updateCustomer = async (
  id,
  customerData,
  token
) => {
  const { data } = await axios.put(
    `${API}/customers/${id}`,
    customerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= DELETE CUSTOMER =================

export const deleteCustomer = async (
  id,
  token
) => {
  const { data } = await axios.delete(
    `${API}/customers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};