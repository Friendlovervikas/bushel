import axios from "axios";

const API = "https://bushel-backend.onrender.com/api/users";

// Get Profile
export const getProfile = async (token) => {
  const { data } = await axios.get(
    `${API}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// Update Profile
export const updateProfile = async (
  profileData,
  token
) => {
  const { data } = await axios.put(
    `${API}/profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};