import axiosInstance from './axiosService';

export const getUsers = ({ ...params }) =>
    axiosInstance.post('/api/Users/get-users', { ...params }).then((reponse) => {
        return reponse.data;
    });

export const createUpdateUser = ({ ...params }) =>
    axiosInstance.post('/api/Users/create-update-user', { ...params }).then((reponse) => {
        return reponse.data;
    });
export const deleteUser = ({ ...params }) =>
    axiosInstance
        .delete('/api/Users/delete-user', {
            params: params,
        })
        .then((reponse) => {
            return reponse.data;
        });

export const getPermissions = () =>
    axiosInstance.get('/api/Permissions/get-permissions').then((response) => response.data);

export const updatePermission = ({ ...params }) =>
    axiosInstance.post('/api/Permissions/update-permission', { ...params }).then((response) => response.data);
