import { api } from '@/api/instance';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

export interface AuthParams {
  email: string;
  password: string;
}

export const login = async (params: AuthParams) => {
  try {
    return await api.post<{ token: string }>('auth/login', { ...params });
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    toast({
      variant: 'destructive',
      title: 'Ошибка',
      description: error?.response?.data?.message,
    });
  }
};

export const registration = async (params: AuthParams) => {
  try {
    return await api.post<{ token: string }>('auth/registration', {
      ...params,
    });
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    toast({
      variant: 'destructive',
      title: 'Ошибка',
      description: error?.response?.data?.message,
    });
  }
};
