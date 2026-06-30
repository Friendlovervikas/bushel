import axios from "axios";

const API = "http://localhost:5001/api/subscriptions";

// Get all subscriptions
export const getSubscriptions = async (token) => {
  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
// Get logged-in user's subscriptions
export const getMySubscriptions = async (token) => {
  const { data } = await axios.get(
    `${API}/my-subscriptions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Get one subscription
export const getSubscription = async (id, token) => {
  const { data } = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Create subscription
export const createSubscription = async (
  subscription,
  token
) => {
  const { data } = await axios.post(
    API,
    subscription,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Renew subscription
export const renewSubscription = async (
  id,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}/renew`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Cancel subscription
export const cancelSubscription = async (
  id,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};