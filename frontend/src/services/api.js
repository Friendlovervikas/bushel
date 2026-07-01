import axios from "axios";

const API = axios.create({
  baseURL: "https://bushel-backend.onrender.com/api",
});

export default API;