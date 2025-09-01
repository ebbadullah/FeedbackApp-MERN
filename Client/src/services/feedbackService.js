import { api } from "./api";

export const submitFeedback = async (feedbackData) => {
    const response = await api.post("/feedback", feedbackData);
    return response.data;
};

export const getAllFeedbacks = async () => {
    const response = await api.get("/admin/feedbacks");
    return response.data;
};

export const exportFeedbacks = async () => {
    const response = await api.get("/admin/feedbacks/export", { responseType: "blob" });
    return response.data;
};