import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith('/_next')) {
    return res;
  }
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data } = await supabase.auth.getSession();
  if (url.pathname === '/sign-up') {
    return res;
  }
  if (data.session === null && url.pathname !== '/login' && !url.pathname.startsWith('/auth')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return res;
}
