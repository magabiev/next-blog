import { api } from '@/api/instance';

export interface Role {
  value: string;
  description: string;
  id: number;
}

export interface User {
  email: string;
  roles: Role[];
  id: number;
}

export const getMe = async () => {
  try {
    return await api.get<User>('users/me');
  } catch (e) {
    console.log('error', e);
  }
};
