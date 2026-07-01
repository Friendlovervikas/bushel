import API from "./api";

// ================= GET DASHBOARD =================

export const getDashboardStats = async (token) => {
  const { data } = await API.get("/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET CUSTOMERS =================

export const getCustomers = async (token) => {
  const { data } = await API.get("/admin/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET ORDERS =================

export const getRecentOrders = async (token) => {
  const { data } = await API.get("/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET PAYMENTS =================

export const getRecentPayments = async (token) => {
  const { data } = await API.get("/admin/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET ANALYTICS =================

export const getAnalytics = async (token) => {
  const { data } = await API.get("/admin/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= UPDATE CUSTOMER =================

export const updateCustomer = async (
  id,
  customerData,
  token
) => {
  const { data } = await API.put(
    `/admin/customers/${id}`,
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
  const { data } = await API.delete(
    `/admin/customers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
