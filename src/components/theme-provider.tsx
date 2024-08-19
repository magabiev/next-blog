'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Themes } from '@/lib/constants';
import { StorageKeys, useLocalStorage } from '@/hooks/useLocalStorage';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useLocalStorage(StorageKeys.THEME);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme as Themes}
      forcedTheme={theme as Themes}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
