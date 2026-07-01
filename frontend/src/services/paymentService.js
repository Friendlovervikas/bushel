import axios from "axios";

const API = "http://localhost:5001/api/payments";

// ================= GET MY PAYMENTS =================

export const getMyPayments = async (
  token
) => {
  const { data } = await axios.get(
    `${API}/my-payments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= GET ALL PAYMENTS =================

export const getPayments = async (
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

// ================= GET SINGLE PAYMENT =================

export const getPaymentById = async (
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

// ================= CREATE PAYMENT =================

export const createPayment = async (
  paymentData,
  token
) => {
  const { data } = await axios.post(
    API,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= UPDATE PAYMENT =================

export const updatePayment = async (
  id,
  paymentData,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= DELETE PAYMENT =================

export const deletePayment = async (
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