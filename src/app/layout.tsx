import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import { cookies } from 'next/headers';
import { TanStackProvider } from '@/providers/TanStackProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isUserLoggedIn = cookies().get('token');
  return (
    <html lang="ru">
      <body className="overflow-hidden box-border p-10 w-screen h-screen">
        <TanStackProvider>
          <ThemeProvider>
            {isUserLoggedIn && <Header />}
            {children}
            <Toaster />
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
