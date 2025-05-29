'use client';

import { createContext, ReactNode, useState, useEffect } from 'react';
import { getDictionary } from './i18n';
import { Locale } from './i18n-config';

type LocaleContextType = {
  dictionary: Record<string, unknown>;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider = ({ children, locale }: { children: ReactNode; locale: Locale }) => {
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    getDictionary(locale).then(setDictionary);
  }, [locale]);

  return <LocaleContext.Provider value={{ dictionary }}>{children}</LocaleContext.Provider>;
};
