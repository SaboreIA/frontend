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
    const token = localStorage.getItem("token");
    if (token) {
      console.log(
        "✅ Token encontrado no localStorage. Anexando Authorization header."
      );
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(
        "❌ Token NÃO encontrado. Requisição enviada sem Authorization header."
      );
    }

    // If the request body is a FormData instance, remove the default JSON
    // Content-Type so the browser can set the proper multipart/form-data
    // header with boundary. Leaving the header as 'application/json'
    // causes servers to reject with 415 Unsupported Media Type.
    try {
      if (
        config.data &&
        typeof FormData !== "undefined" &&
        config.data instanceof FormData
      ) {
        if (config.headers && config.headers["Content-Type"]) {
          delete config.headers["Content-Type"];
        }
      }
    } catch (e) {
      // ignore environment issues
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
