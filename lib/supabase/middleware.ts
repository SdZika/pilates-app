import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, Locale } from '@/lib/i18n-config'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // ✅ Extract locale and path without locale prefix
  const segments = path.split('/');
  const possibleLocale = segments[1];
  const locale = locales.includes(possibleLocale as Locale) ? possibleLocale : null;

  // Remove locale from path if it's present (e.g. /en/my-bookings -> /my-bookings)
  const normalizedPath = locale ? `/${segments.slice(2).join('/')}` : path;
  const protectedRoutes = ['/my-bookings', '/admin'];
  const adminRoutes = ['/admin'];

  // Not authenticated
  if (protectedRoutes.some(route => normalizedPath.startsWith(route)) && !user) {
    const url = request.nextUrl.clone();
      url.pathname = `/${locale ?? 'sr'}/login`;
    return NextResponse.redirect(url);
  }

  // Admin access check
  if (adminRoutes.some(route => normalizedPath.startsWith(route)) && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile?.role) {
      url.pathname = `/${locale ?? 'sr'}`; // fallback to locale home
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}