import axios from 'axios';
import { getToken } from '../services/auth'

const apiURL = process.env.REACT_APP_API_URL;

export default axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': `Bearer ${getToken()}`
    },
});
