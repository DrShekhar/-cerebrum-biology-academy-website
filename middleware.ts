import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Public admin routes (login page)
    if (pathname === '/admin/login') {
      // If already authenticated admin, redirect to dashboard
      if (token?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.next()
    }

    // Protected admin routes
    if (pathname.startsWith('/admin')) {
      // Check if user is authenticated and has admin role
      if (!token || token.role !== 'admin') {
        const loginUrl = new URL('/admin/login', req.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
      }
    }

    // Security headers for all requests
    const response = NextResponse.next()

    // Add security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

    // Prevent admin routes from being cached
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to login page without authentication
        if (pathname === '/admin/login') {
          return true
        }

        // For admin routes, require admin role
        if (pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }

        // For admin API routes, require admin role
        if (pathname.startsWith('/api/admin')) {
          return token?.role === 'admin'
        }

        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}