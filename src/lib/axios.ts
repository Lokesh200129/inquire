import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const request = async <T>(config: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => response.data as T;
    const onError = (error: AxiosError) => Promise.reject(error);
    return client(config).then(onSuccess).catch(onError);
};

export default request;