import axios from "axios";

const API = "http://localhost:5001/api/products";

// ================= GET ALL PRODUCTS =================

export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data;
};

// ================= GET SINGLE PRODUCT =================

export const getProductById = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

// ================= CREATE PRODUCT =================

export const createProduct = async (
  productData,
  token
) => {
  const { data } = await axios.post(
    API,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= UPDATE PRODUCT =================

export const updateProduct = async (
  id,
  productData,
  token
) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ================= DELETE PRODUCT =================

export const deleteProduct = async (
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