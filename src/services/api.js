import axios from 'axios';

import { API_URL, AUTH_TOKEN_KEY } from '~/constants';
// TODO: Move to const or env

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000,
    transformRequest: (config) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        config.headers['Authorization'] = token ? `BEARER ${token}` : '';

        return config;
    },
});

API.interceptors.response.use(
    (response) => Promise.resolve(response.data),
    ({ response }) => {
        if (response.status === 403) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }

        return Promise.reject(response.data);
    },
);

export default API;
