import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes = ['/my-bookings', '/admin'];

function stripLocaleFromPath(pathname: string, locales: readonly string[]) {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, '') || '/';
    }
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const strippedPath = stripLocaleFromPath(pathname, routing.locales);
  const isProtected = protectedRoutes.some(route => strippedPath.startsWith(route));

  if (isProtected) {
    return await updateSession(request);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
  ],
};
