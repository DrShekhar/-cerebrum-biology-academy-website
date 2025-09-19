import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { logAdminAccess } from '@/lib/security/auditLogger'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const token = req.auth

  // Public admin routes (login page)
  if (pathname === '/admin/login') {
    // If already authenticated admin, redirect to dashboard
    if (token?.user?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  // Protected admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check if user is authenticated and has admin role
    if (!token || token.user?.role !== 'admin') {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Log successful admin access
    if (token.user?.email) {
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      const userAgent = req.headers.get('user-agent') || 'unknown'

      logAdminAccess(token.user.email, pathname, clientIP, userAgent)
    }
  }

  // Rate limiting for API endpoints
  if (pathname.startsWith('/api/')) {
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // Enhanced rate limiting will be implemented with Redis
    // For now, add basic security headers
  }

  // Security headers for all requests
  const response = NextResponse.next()

  // Enhanced security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // Content Security Policy for enhanced XSS protection
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https: wss:; media-src 'self'; frame-src 'self' https:; base-uri 'self'; form-action 'self'"
  )

  // Permissions Policy to restrict sensitive features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  // Prevent admin routes from being cached with stronger directives
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')

    // Additional security for admin routes
    response.headers.set('X-Admin-Route', 'true')

    // Log admin access attempts (in production, this should go to secure logging)
    if (process.env.NODE_ENV === 'production') {
      console.log(`Admin route accessed: ${pathname} from IP: ${req.headers.get('x-forwarded-for') || 'unknown'} at ${new Date().toISOString()}`)
    }
  }

  return response
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}