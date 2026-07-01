import axios from "axios";

const API = "https://bushel-backend.onrender.com/api/staff";

// ================= GET ALL STAFF =================

export const getAllStaff = async (token) => {
  const { data } = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ================= GET STAFF =================

export const getStaff = async (id, token) => {
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

// ================= CREATE STAFF =================

export const createStaff = async (
  staff,
  token
) => {
  const { data } = await axios.post(
    API,
    staff,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= UPDATE STAFF =================

export const updateStaff = async (
  id,
  staff,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    staff,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= DELETE STAFF =================

export const deleteStaff = async (
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

// ================= ACTIVATE / DEACTIVATE =================

export const toggleStaffStatus =
  async (id, token) => {
    const { data } = await axios.put(
      `${API}/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };