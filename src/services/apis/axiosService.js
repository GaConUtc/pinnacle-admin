import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/common';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) config.headers['Auth'] = `bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (reponse) => reponse,
    (error) => {
        const errorResponse = error?.response;
        if (errorResponse?.status === 401) {
            localStorage.clear(ACCESS_TOKEN);
            return <Navigate to="/login" />;
        }
        return Promise.reject(error.response?.data ?? error.response);
    },
);

export default axiosInstance;
