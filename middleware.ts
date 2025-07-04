import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const authPages = ['/login', '/verify-email'];

  if (isLogin && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/verify-email'],
};
