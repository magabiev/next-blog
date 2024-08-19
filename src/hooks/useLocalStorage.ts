import { useCallback, useEffect, useState } from 'react';

export enum StorageKeys {
  THEME = 'THEME',
}

export const useLocalStorage = (
  storageKey: StorageKeys,
): [string | null, (value: string) => void] => {
  const [_, setState] = useState<string | null>(null);
  const state = localStorage.getItem(storageKey);

  const changeListener = useCallback(() => {
    const value = localStorage.getItem(storageKey);
    setState(value);
  }, [storageKey]);

  const handleChangeValue = (value: string) => {
    localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    changeListener();
    window.addEventListener('storage', changeListener);
    return () => {
      window.removeEventListener('storage', changeListener);
    };
  }, [changeListener]);

  return [state, handleChangeValue];
};
