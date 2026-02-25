import axios from "./axios";

export const loginUser = async (email, password) => {
    return await axios.post("/auth/login", { email, password });
};

export const registerUser = async (name, email, password) => {
    return await axios.post("/auth/register", { name, email, password });
};

export const forgotPassword = (email) => {
    return axios.post("/auth/forgot-password", { email });
};

export const resetPassword = (email, otp, newPassword) => {
    return axios.post("/auth/reset-password", { email, otp, newPassword });
};
