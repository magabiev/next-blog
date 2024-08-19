'use client';

import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/api/users';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const AddPost = () => {
  const router = useRouter();
  const { data: user } = useQuery<AxiosResponse<User>>({ queryKey: ['me'] });
  const isAdmin = user?.data?.roles?.some(el => el.value === 'ADMIN');
  const redirect = () => {
    if (location.pathname !== 'create-post') {
      router.push('/create-post');
    }
  };

  return (
    <Button onClick={redirect} disabled={!isAdmin} variant="ghost">
      <CirclePlus />
    </Button>
  );
};

export default AddPost;
