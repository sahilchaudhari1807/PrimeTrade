// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://primetrade-backend-pxah.vercel.app", // <- use this exact URL
  withCredentials: true // only if your backend sends/reads cookies; otherwise you can remove
});

export default api;
