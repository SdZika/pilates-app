import { ReactNode } from 'react';
import { LocaleProvider } from '@/lib/LocaleProvider';
import { locales, Locale } from '@/lib/i18n-config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  return <LocaleProvider locale={params.locale}>{children}</LocaleProvider>;
}
