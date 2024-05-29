import axiosInstance from './axiosService';

export const login = ({ ...params }) =>
    axiosInstance.post('/api/Users/authenticate', { ...params }).then((reponse) => reponse.data);
