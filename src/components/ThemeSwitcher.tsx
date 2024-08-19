'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Themes } from '@/lib/constants';
import { StorageKeys, useLocalStorage } from '@/hooks/useLocalStorage';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage(StorageKeys.THEME);
  const handleThemeChange = () =>
    setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);

  return (
    <Button variant="ghost" onClick={handleThemeChange}>
      {theme === Themes.LIGHT ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeSwitcher;
