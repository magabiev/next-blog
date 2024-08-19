'use client';

import { LogOut } from 'lucide-react';
import { doLogout } from '@/lib/authUtils';
import { Button } from '@/components/ui/button';

const Logout = () => {
  return (
    <Button variant="ghost">
      <LogOut onClick={doLogout} />
    </Button>
  );
};

export default Logout;
