import axios from "./axios";

export const loginUser = async (email, password) => {
    return await axios.post("/auth/login", { email, password });
};

export const registerUser = async (name, email, password) => {
    return await axios.post("/auth/register", { name, email, password });
};
