import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { validateUserSession, addSecurityHeaders, UserSession } from '@/lib/auth/config'
import { addCSPHeaders } from '@/lib/auth/csrf'
import { compressResponseMiddleware } from '@/lib/middleware/compression'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/courses(.*)',
  '/about',
  '/contact',
  '/blog(.*)',
  '/gallery(.*)',
  '/pricing(.*)',
  '/results(.*)',
  '/faculty(.*)',
  '/demo-booking(.*)',
  '/admissions(.*)',
  '/faq(.*)',
  '/testimonials(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/auth/(.*)',
  '/api/public/(.*)',
  '/api/webhooks/(.*)',
])

// Define admin routes
const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin/(.*)'])

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/student/(.*)',
  '/profile(.*)',
  '/test/(.*)',
  '/teacher/(.*)',
  '/counselor(.*)',
  '/select-role(.*)',
])

// Type guard to check if session has role property
function hasRole(session: UserSession): session is UserSession & { role: string } {
  return session.valid && typeof session.role === 'string'
}

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // ============================================
  // SEO: Redirect www to non-www (canonical domain)
  // ============================================
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(req.url)
    newUrl.host = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // Get Clerk auth state
  const { userId: clerkUserId } = await auth()

  // For protected routes, require Clerk authentication
  if (!isPublicRoute(req)) {
    if (!clerkUserId) {
      // Redirect to Clerk sign-in
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Legacy session validation for backward compatibility
  // This allows existing sessions to work alongside Clerk
  const session = await validateUserSession(req).catch(() => ({ valid: false }) as UserSession)

  // Combined auth check: either Clerk OR legacy session
  const isAuthenticated = clerkUserId || session.valid

  // Public auth routes (legacy)
  if (pathname.startsWith('/auth/')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Public admin routes (login page)
  if (pathname === '/admin/login') {
    if (hasRole(session) && session.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Protected student/parent routes
  if (isProtectedRoute(req)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/sign-in', req.url)
      loginUrl.searchParams.set('redirect_url', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protected teacher routes - allow Clerk authenticated users (page components handle role check)
  if (pathname.startsWith('/teacher/')) {
    if (!clerkUserId && (!hasRole(session) || (session.role !== 'TEACHER' && session.role !== 'ADMIN'))) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  // Protected counselor routes - allow Clerk authenticated users (page components handle role check)
  if (pathname.startsWith('/counselor') && pathname !== '/counselor-poc') {
    if (!clerkUserId && (!hasRole(session) || (session.role !== 'COUNSELOR' && session.role !== 'ADMIN'))) {
      const loginUrl = new URL('/sign-in', req.url)
      loginUrl.searchParams.set('redirect_url', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protected admin routes - allow Clerk authenticated users (AdminLayout handles role check)
  if (isAdminRoute(req) && pathname !== '/admin/login') {
    if (!clerkUserId && (!hasRole(session) || session.role !== 'ADMIN')) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Log successful admin access
    if (session.email) {
      const clientIP =
        req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
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
    if (!isAuthenticated) {
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
  if (pathname.startsWith('/api/counselor/')) {
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
  if (response.status !== 200) {
    return response
  }

  // Apply comprehensive security headers
  addSecurityHeaders(response)
  addCSPHeaders(response)

  // PERFORMANCE: Smart caching strategy
  const isStaticPage =
    pathname === '/' ||
    pathname.startsWith('/courses') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/gallery') ||
    pathname.startsWith('/pricing')

  const isProtectedPath =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/teacher') ||
    pathname.startsWith('/counselor') ||
    pathname.startsWith('/api/')

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // Only apply noindex to protected routes
  if (isProtectedPath) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive, noimageindex')
  }

  // Production headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }

  // Session information header (for debugging)
  if (process.env.NODE_ENV === 'development') {
    if (clerkUserId) {
      response.headers.set('X-Clerk-User-ID', clerkUserId)
    }
    if (session.valid) {
      response.headers.set('X-User-Role', session.role || 'unknown')
      response.headers.set('X-User-ID', session.userId || 'unknown')
    }
  }

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  if (isProtectedPath) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  } else if (isStaticPage) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=300, stale-while-revalidate=86400'
    )
  } else {
    response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
  }

  // Admin route logging
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('X-Admin-Route', 'true')
    if (process.env.NODE_ENV === 'production') {
      console.log(
        `Admin route accessed: ${pathname} from IP: ${req.headers.get('x-forwarded-for') || 'unknown'} at ${new Date().toISOString()}`
      )
    }
  }

  // Apply compression to API responses
  if (pathname.startsWith('/api/')) {
    return await compressResponseMiddleware(req, response)
  }

  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
