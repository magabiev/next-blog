import axios from 'axios';
import { cookies } from 'next/headers';

export const baseURL = 'http://localhost:5001/';

export const serverSideApi = axios.create({
  baseURL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

serverSideApi.interceptors.request.use(config => {
  const token = cookies().get('token')?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
