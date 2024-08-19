import axios from 'axios';
import { doLogout } from '@/lib/authUtils';
import { getCookie } from 'cookies-next';

const publicApi = ['auth/login', 'auth/registration'];

export const baseURL = 'http://localhost:5001/';

export const api = axios.create({
  baseURL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = getCookie('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    const requestUrl = error.config.url;

    // Проверяем, относится ли URL к публичным API
    const isPublicApi = publicApi.some(publicUrl =>
      requestUrl.includes(publicUrl),
    );

    if (!isPublicApi && status === 401) {
      doLogout();
    }
    return Promise.reject(error);
  },
);
