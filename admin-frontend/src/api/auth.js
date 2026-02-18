import axios from "./axios";

export const loginUser = async (email, password) => {
    return await axios.post("/auth/login", { email, password });
};

// Admin registration is usually manual or via Super Admin, so minimal need for public register here
