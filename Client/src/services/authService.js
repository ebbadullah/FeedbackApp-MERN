import { api } from "./api";

export const loginAdmin = async (credentials) => {
    const response = await api.post("/admin/login", credentials);
    return response.data;
};