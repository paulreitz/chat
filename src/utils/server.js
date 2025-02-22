import axios from 'axios';
import store from '../store/configureStore';

const server = process.env && process.env.NODE_ENV && process.env.NODE_ENV === "development" 
                ? 'http://localhost:3001/api'
                : '/api';

const retryTimeMs = 500;
const maxRetries = 5;

export const serverCall = (endpoint, data) => {
    return new Promise((resolve, reject) => {
        attemptCall(endpoint, data, resolve, reject, 0);
    });
}

const attemptCall = (endpoint, data, resolve, reject, attempt) => {
    const token = store.getState().user.token;
    const config = {};
    if (!!token) {
        config.headers = {'x-access-token': `Bearer ${token}`};
    }
    axios.post(`${server}/${endpoint}`, data, config)
    .then((response) => {
        resolve(response.data);
    })
    .catch((error) => {
        if (attempt < maxRetries) {
            setTimeout(() => {
                attempt++;
                attemptCall(endpoint, data, resolve, reject, attempt);
            }, attempt * retryTimeMs);
        }
        else {
            reject(error);
        }
    })
}