import axios from "axios";

export const api = axios.create({ baseURL: "/api" });

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