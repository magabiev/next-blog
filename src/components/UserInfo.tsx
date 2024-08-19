'use client';

import { LogOut } from 'lucide-react';
import { doLogout } from '@/lib/authUtils';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/users';

const UserInfo = () => {
  const { data } = useQuery({ queryKey: ['me'], queryFn: getMe });

  return (
    <>
      <Button variant="ghost">
        {data?.data.email}-{data?.data.roles[0].description}
      </Button>
      <Button onClick={doLogout} variant="ghost">
        <LogOut />
      </Button>
    </>
  );
};

export default UserInfo;
