import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { locales, defaultLocale } from '@/lib/i18n-config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ 1. Redirect from `/` to `/en` or `/sr`
  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(request) ?? defaultLocale;
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // ✅ 2. Proceed with Supabase session + auth logic
  return await updateSession(request);
}

// ✅ 3. Match ALL localized routes (e.g. /en/my-bookings), skip static files and APIs
export const config = {
  matcher: [
    '/',
    '/((?!api|_next|.*\\..*).*)',
  ],
};

// ✅ 4. Helper: detect browser language
function getPreferredLocale(request: NextRequest): string | undefined {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return;

  const preferred = acceptLang.split(',').map(lang => lang.trim().slice(0, 2));
  return locales.find((locale) => preferred.includes(locale));
}
