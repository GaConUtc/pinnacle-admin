import axiosInstance from './axiosService';

export const getRoleSelectList = () =>
    axiosInstance.get('/api/Roles/get-role-select').then((response) => response.data);

export const getRoles = () => axiosInstance.get('/api/Roles/get-roles').then((response) => response.data);

export const getRole = ({ ...params }) =>
    axiosInstance.get('/api/Roles/get-role', { params: params }).then((response) => response.data);

export const getModulePermissionDisplay = () =>
    axiosInstance.get('/api/Roles/get-module-permission-display').then((response) => response.data);

export const createRole = (params) =>
    axiosInstance.post('/api/Roles/create-role', { ...params }).then((response) => response.data);

export const updateRole = (params) =>
    axiosInstance.post('/api/Roles/update-role', { ...params }).then((response) => response.data);
