import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};