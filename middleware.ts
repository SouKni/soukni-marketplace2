import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Target languages optimized for Morocco, Europe, and US markets
const locales = ['en', 'fr', 'es', 'ar', 'de'];
const defaultLocale = 'en'; // English default to capture international buyers first

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
