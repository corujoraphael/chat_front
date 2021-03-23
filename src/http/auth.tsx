import axios from './api';

export const login = async (params: any) => {
    try {
        return axios.post('auth/login', params);
    } catch (error) {
        return error;
    }
}

export const createAccount = async (params: any) => {
    try {
        return axios.post('auth/signup', params);
    } catch (error) {
        return error;
    }
}