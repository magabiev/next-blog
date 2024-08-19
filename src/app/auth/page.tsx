'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { login, registration } from '@/api/auth';
import { Switch } from '@/components/ui/switch';
import { doLogin } from '@/lib/authUtils';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: isLogin ? login : registration,
    onSuccess: data => doLogin(data?.data.token),
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => mutate(form);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-5">
            Регистрация
            <Switch checked={isLogin} onClick={() => setIsLogin(!isLogin)} />
            Авторизация
          </CardTitle>
          <CardDescription>Введите логин и пароль</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={submit} disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Войти
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
