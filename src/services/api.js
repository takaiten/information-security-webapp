import axios from 'axios';

import { API_URL, AUTH_TOKEN_KEY } from '~/constants';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Local storage token interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem(
        config.arguments?.tokenKey || AUTH_TOKEN_KEY,
    );

    config.headers['Authorization'] = token ? `Bearer ${token}` : '';

    return config;
});

API.interceptors.response.use(
    (response) => Promise.resolve({ success: true, data: response.data }),
    ({ response }) => {
        if (response?.status === 401) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }

        return Promise.reject({
            success: false,
            message: response?.data?.detail || 'Api Error',
        });
    },
);

export default API;
