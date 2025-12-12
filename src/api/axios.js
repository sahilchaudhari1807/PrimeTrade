// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://primetrade-backend-pxah.vercel.app/api",  // <- Correct URL
  withCredentials: true
});

export default api;
