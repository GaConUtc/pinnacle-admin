import axiosInstance from './axiosService';

export const getRoleSelectList = () =>
    axiosInstance.get('/api/Roles/get-role-select').then((response) => response.data);
