import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

// Add your protected routes here (without locale prefix)
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
  // Always run next-intl localization middleware first
  const intlResponse = intlMiddleware(request);

  // Check if current route (without locale) is protected
  const pathname = request.nextUrl.pathname;
  const strippedPath = stripLocaleFromPath(pathname, routing.locales);
  const isProtected = protectedRoutes.some(route => strippedPath.startsWith(route));

  // If it's protected, apply auth middleware
  if (isProtected) {
    return await updateSession(request);
  }

  // Otherwise, proceed with only intl response
  return intlResponse;
}


export const config = {
  matcher: [
    // Match all paths for localization
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
