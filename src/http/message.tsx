import axios from './api';

export const createMessage = async (params: any) => {
    try {
        return axios.post('api/message', params);
    } catch (error) {
        return error;
    }
}


export const getMesssages = async (params: Object) => {
    try {
        return axios.get('api/message', { params } );
    } catch (error) {
        return error;
    }
}