import {setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import { Spinner } from "@/components/ui/spinner";
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

   // Enable static rendering
  setRequestLocale(locale);
 
  return (
    
        <NextIntlClientProvider locale={locale}>
          <Suspense fallback={<Spinner className="mx-auto my-4" />}>
            <Navbar />
          </Suspense>
          {children}
          <Suspense fallback={<Spinner className="mx-auto my-4" />}>
            <Footer />
          </Suspense>
        </NextIntlClientProvider>
    
  );
}