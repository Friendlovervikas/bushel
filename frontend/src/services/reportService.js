import axios from "axios";

const API = "http://localhost:5001/api/reports";

// ================= ORDERS REPORT =================

export const downloadOrdersReport = async (
  token
) => {
  const response = await axios.get(
    `${API}/orders`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= PAYMENTS REPORT =================

export const downloadPaymentsReport =
  async (token) => {
    const response = await axios.get(
      `${API}/payments`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

// ================= CUSTOMERS REPORT =================

export const downloadCustomersReport =
  async (token) => {
    const response = await axios.get(
      `${API}/customers`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

// ================= PRODUCTS REPORT =================

export const downloadProductsReport =
  async (token) => {
    const response = await axios.get(
      `${API}/products`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

// ================= SUBSCRIPTIONS REPORT =================

export const downloadSubscriptionsReport =
  async (token) => {
    const response = await axios.get(
      `${API}/subscriptions`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };