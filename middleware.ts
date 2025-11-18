import { NextRequest, NextResponse } from 'next/server'
import { validateUserSession, addSecurityHeaders, UserSession } from '@/lib/auth/config'
import { addCSPHeaders } from '@/lib/auth/csrf'
import { compressResponseMiddleware } from '@/lib/middleware/compression'

// Type guard to check if session has role property
function hasRole(session: UserSession): session is UserSession & { role: string } {
  return session.valid && typeof session.role === 'string'
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Validate user session for protected routes
  const session = await validateUserSession(req).catch(() => ({ valid: false }) as UserSession)

  // Public auth routes
  if (pathname.startsWith('/auth/')) {
    // If already authenticated, redirect to dashboard
    if (session.valid) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Public admin routes (login page)
  if (pathname === '/admin/login') {
    // If already authenticated admin, redirect to dashboard
    if (hasRole(session) && session.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Protected student/parent routes
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/student/') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/test/')
  ) {
    if (!session.valid) {
      const loginUrl = new URL('/auth/signin', req.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protected teacher routes
  if (pathname.startsWith('/teacher/')) {
    if (!hasRole(session) || (session.role !== 'TEACHER' && session.role !== 'ADMIN')) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  // Protected counselor routes
  if (pathname.startsWith('/counselor') && pathname !== '/counselor-poc') {
    // DEV MODE: Skip authentication check if bypass is enabled
    if (process.env.BYPASS_CRM_AUTH === 'true') {
      console.log('[DEV MODE] Bypassing counselor route authentication in middleware')
    } else if (!hasRole(session) || (session.role !== 'COUNSELOR' && session.role !== 'ADMIN')) {
      const loginUrl = new URL('/auth/signin', req.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protected admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check if user is authenticated and has admin role
    if (!hasRole(session) || session.role !== 'ADMIN') {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Log successful admin access
    if (session.email) {
      const clientIP =
        req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      const userAgent = req.headers.get('user-agent') || 'unknown'

      console.log(
        `Admin access: ${session.email} accessed ${pathname} from ${clientIP} at ${new Date().toISOString()}`
      )
    }
  }

  // API route protection
  if (
    pathname.startsWith('/api/auth/') &&
    !pathname.includes('signin') &&
    !pathname.includes('signup') &&
    !pathname.includes('csrf-token')
  ) {
    if (!session.valid) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Authentication required',
            message: 'Please sign in to access this resource',
          },
          { status: 401 }
        )
      )
    }
  }

  // Admin API protection
  if (pathname.startsWith('/api/admin/')) {
    if (!hasRole(session) || session.role !== 'ADMIN') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Admin access required',
            message: 'You need admin privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // Teacher API protection
  if (pathname.startsWith('/api/teacher/')) {
    if (!session.valid || (session.role !== 'TEACHER' && session.role !== 'ADMIN')) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Teacher access required',
            message: 'You need teacher privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // Counselor API protection
  // NOTE: Disabled middleware auth check for API routes because Next.js 15 Edge Runtime
  // doesn't receive cookies from client fetch() calls even with credentials: 'include'
  // Authentication is handled by the route handlers using withCounselor() middleware
  if (pathname.startsWith('/api/counselor/') && false) {
    // Temporarily disabled
    if (!hasRole(session) || (session.role !== 'COUNSELOR' && session.role !== 'ADMIN')) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Counselor access required',
            message: 'You need counselor privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // Create response with enhanced security
  const response = NextResponse.next()

  // Preserve 404 and other error status codes
  // Don't modify responses that aren't 200 OK
  if (response.status !== 200) {
    return response
  }

  // Apply comprehensive security headers
  addSecurityHeaders(response)
  addCSPHeaders(response)

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive, noimageindex')

  // Development vs Production headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }

  // Session information header (for debugging)
  if (process.env.NODE_ENV === 'development' && session.valid) {
    response.headers.set('X-User-Role', session.role || 'unknown')
    response.headers.set('X-User-ID', session.userId || 'unknown')
  }

  // Permissions Policy to restrict sensitive features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  // CRITICAL: Prevent homepage and all pages from being cached to fix stuck loading screen
  // This ensures users always get the latest version
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
  )
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('Surrogate-Control', 'no-store')

  // Prevent admin routes from being cached with stronger directives
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Additional security for admin routes
    response.headers.set('X-Admin-Route', 'true')

    // Log admin access attempts (in production, this should go to secure logging)
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `Admin route accessed: ${pathname} from IP: ${req.headers.get('x-forwarded-for') || 'unknown'} at ${new Date().toISOString()}`
      )
    }
  }

  // Apply compression to API responses for better performance
  // Automatically compresses JSON and other compressible content types
  if (pathname.startsWith('/api/')) {
    return await compressResponseMiddleware(req, response)
  }

  return response
}

export const config = {
  matcher: [
    // Auth routes
    '/auth/:path*',
    '/dashboard/:path*',
    '/student/:path*',
    '/profile/:path*',
    '/test/:path*',
    '/teacher/:path*',
    '/counselor/:path*',

    // Admin routes
    '/admin/:path*',

    // API routes
    '/api/auth/:path*',
    '/api/admin/:path*',
    '/api/teacher/:path*',
    '/api/counselor/:path*',
    '/api/test/:path*',

    // All other routes (exclude static files)
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
