import { deleteCookie, setCookie } from 'cookies-next';

export const doLogin = (token?: string) => {
  if (token) {
    setCookie('token', token);
    location.replace('/');
  }
};

export const doLogout = () => {
  deleteCookie('token');
  location.replace('/auth');
};
