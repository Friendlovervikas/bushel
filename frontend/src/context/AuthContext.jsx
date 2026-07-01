import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import socket from "../socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const getProfile = async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser?.token) return;

      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        );

        const updatedUser = {
          ...storedUser,
          ...data,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        // ================= SOCKET =================

        socket.connect();
        socket.emit("join", updatedUser._id);

      } catch (error) {
        console.log(error);

        localStorage.removeItem("user");

        socket.disconnect();

        setUser(null);
      }
    };

    getProfile();

    return () => {
      socket.disconnect();
    };
  }, []);

  const login = async (userData) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      const updatedUser = {
        ...userData,
        ...data,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      // ================= SOCKET =================

      socket.connect();
      socket.emit("join", updatedUser._id);

    } catch (error) {

      console.log(error);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      // ================= SOCKET =================

      socket.connect();
      socket.emit("join", userData._id);
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  const logout = () => {

    socket.disconnect();

    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};