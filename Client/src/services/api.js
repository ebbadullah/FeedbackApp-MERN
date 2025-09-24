import axios from "axios";

// Use Render API URL for production, fallback to local proxy for dev
const baseURL = import.meta.env?.VITE_API_URL || 
  (import.meta.env?.PROD ? "https://feedbackapp-mern.onrender.com/api" : "/api");

export const api = axios.create({ baseURL });

export const setupAxiosDefaults = () => {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/admin";
            }
            return Promise.reject(error);
        }
    );
};