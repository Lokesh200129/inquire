import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 20000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "An unexpected error occurred";
        console.error("Axios Error:", message);
        return Promise.reject(message);
    }
);

export default axiosInstance;