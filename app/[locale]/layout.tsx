import { ReactNode } from 'react';
import { getDictionary } from '@/lib/i18n';
import { locales, Locale } from '@/lib/i18n-config';
import { LocaleProvider } from '@/lib/LocaleProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  // ✅ Load dictionary on the server here
  const { locale } = await params
  const dictionary = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <Navbar />
      {children}
      <Footer />
    </LocaleProvider>
  );
}
