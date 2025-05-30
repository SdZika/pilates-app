import { ReactNode } from 'react';
import { getDictionary } from '@/lib/i18n';
import { locales, Locale } from '@/lib/i18n-config';
import { LocaleProvider } from '@/lib/LocaleProvider';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  // ✅ Load dictionary on the server here
  const dictionary = await getDictionary(params.locale);

  return (
    <LocaleProvider locale={params.locale} dictionary={dictionary}>
      {children}
    </LocaleProvider>
  );
}
