import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8080',
});

Api.interceptors.request.use(
    (config) => {
        const publicPaths = ["/health-status", "/auth/login", "/auth/register"];

        const isPublic = publicPaths.some(path => config.url?.includes(path));

        if (!isPublic) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export default Api;