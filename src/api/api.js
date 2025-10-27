import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // Necessário para CORS com credenciais
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
