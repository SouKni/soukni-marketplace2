import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = [
  '/account',
  '/post-ad',
  '/post-ad-voice',
  '/messages',
  '/orders',
  '/favorites',
  '/saved-searches',
  '/notifications',
  '/analytics',
  '/bulk-import',
  '/boost',
  '/diamond',
  '/review',
  '/escrow',
  '/translate',
  '/qr',
  '/setup',
  '/buyer-agent',
]

const AUTH_ROUTES = ['/auth', '/login']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\//, '/')

  const isProtected = PROTECTED_ROUTES.some(r => pathWithoutLocale.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some(r => pathWithoutLocale.startsWith(r))

  if (isProtected && !session) {
    const locale = pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}/auth?next=${pathname}`, request.url))
  }

  if (isAuthRoute && session) {
    const locale = pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
