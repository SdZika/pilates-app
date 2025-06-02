'use client';

import { createContext, ReactNode } from 'react';
import { Locale } from './i18n-config';

type LocaleContextType = {
  dictionary: Record<string, string>;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider = ({
  children,
  //locale,
  dictionary,
}: {
  children: ReactNode;
  locale: Locale;
  dictionary: Record<string, string>;
}) => {
  return (
    <LocaleContext.Provider value={{ dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
};
