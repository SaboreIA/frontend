import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:5001/api",

  withCredentials: true,

  headers: {

    "Content-Type": "application/json",

  },

});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("✅ Token encontrado no localStorage. Anexando Authorization header.");
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("❌ Token NÃO encontrado. Requisição enviada sem Authorization header.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;