import axiosInstance from './axiosService';

export const getCompanies = () => axiosInstance.get('/api/Companies/get-companies').then((response) => response.data);
export const getCompany = ({ ...params }) =>
    axiosInstance.get('/api/Companies/get-company', { params: params }).then((response) => response.data);
