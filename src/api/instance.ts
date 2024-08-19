import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;

    if (status === 401) {
      cookies().delete('logged');
    }
    return Promise.reject(error);
  },
);
