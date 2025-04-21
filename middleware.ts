import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth for protected routes
  const protectedRoutes = ['/my-bookings', '/admin'];
  const adminRoutes = ['/admin'];
  const path = req.nextUrl.pathname;

  // If trying to access protected route without being logged in
  if (protectedRoutes.some(route => path.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If trying to access admin route without admin rights
  if (adminRoutes.some(route => path.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();
      
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/my-bookings/:path*',
    '/admin/:path*',
  ],
};