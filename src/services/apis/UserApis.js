import axiosInstance from './axiosService';

export const getUsers = ({ ...params }) =>
    axiosInstance.post('/api/Users/get-users', { ...params }).then((reponse) => {
        return reponse.data;
    });

export const createUpdateUser = ({ ...params }) =>
    axiosInstance.post('/api/Users/create-update-user', { ...params }).then((reponse) => {
        return reponse.data;
    });
