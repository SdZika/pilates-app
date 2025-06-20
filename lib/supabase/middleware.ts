import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Get locale from URL
  const locale = pathname.split('/')[1]; // assumes locale is first segment

  const protectedRoutes = ['/my-bookings', '/admin'];
  const adminRoutes = ['/admin'];

  if (protectedRoutes.some(route => pathname.includes(route)) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (adminRoutes.some(route => pathname.includes(route)) && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = `/${locale}/`;
      return NextResponse.redirect(homeUrl);
    }
  }

  return response;
}
