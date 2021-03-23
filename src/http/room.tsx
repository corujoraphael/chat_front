import axios from './api';

export const createRoom = async (params: Object) => {
    try {
        return axios.post('api/room', params);
    } catch (error) {
        return error;
    }
}

export const editRoom = async (params: Object) => {
    try {
        return axios.put('api/room', params);
    } catch (error) {
        return error;
    }
}


export const getRooms = async (params: Object) => {
    try {
        return axios.get('api/room', { params } );
    } catch (error) {
        return error;
    }
}


export const removeRoom = async (params: Object) => {
    try {
        return axios.delete('api/room', { params });
    } catch (error) {
        return error;
    }
}