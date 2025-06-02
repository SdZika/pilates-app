import { useContext } from 'react';
import { LocaleContext } from '@/lib/LocaleProvider';

export const useTranslation = () => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }

  const { dictionary } = context;

  const t = (key: string): string => {
    const result = key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, dictionary);

    return typeof result === 'string' ? result : key; // fallback to key
  };

  return { t };
};
