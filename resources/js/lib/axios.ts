import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.APP_URL || "http://localhost:8000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export { axiosInstance as axios };
