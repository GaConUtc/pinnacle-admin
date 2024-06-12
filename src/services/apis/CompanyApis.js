import axiosInstance from './axiosService';

export const getCompanies = () => axiosInstance.get('/api/Companies/get-companies').then((response) => response.data);
