import axios from "axios";

const API = "http://localhost:5001/api/plans";

// Get all plans
export const getPlans = async () => {
  const { data } = await axios.get(API);
  return data;
};

// Get one plan
export const getPlan = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

// Create plan
export const createPlan = async (
  plan,
  token
) => {
  const { data } = await axios.post(
    API,
    plan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Update plan
export const updatePlan = async (
  id,
  plan,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    plan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Delete plan
export const deletePlan = async (
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