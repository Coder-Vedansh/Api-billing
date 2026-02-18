import axios from "./axios";

export const generateAPIKey = async () => {
    return await axios.post("/keys/generate");
};

export const getAPIKeys = async () => {
    return await axios.get("/keys");
};

export const deleteAPIKey = async (id) => {
    return await axios.delete(`/keys/${id}`);
};

export const getUsageStats = async () => {
    return await axios.get("/usage");
};

export const getDashboardStats = async () => {
    return await axios.get("/usage/stats");
};
