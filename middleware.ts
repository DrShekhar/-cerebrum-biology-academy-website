import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { addSecurityHeaders } from '@/lib/auth/config'
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
  '/timetable(.*)',
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

// Helper to get user role from Clerk session claims
// NOTE: Requires setting up custom session claims in Clerk Dashboard:
// { "metadata": "{{user.public_metadata}}" }
type ClerkSessionClaims = {
  metadata?: {
    role?: string
  }
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
  const { userId, sessionClaims } = await auth()
  const userRole = (sessionClaims as ClerkSessionClaims)?.metadata?.role?.toUpperCase()

  // For non-public routes, require Clerk authentication
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Legacy auth routes redirect to Clerk
  if (pathname.startsWith('/auth/') && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Admin login page - redirect to dashboard if already admin
  if (pathname === '/admin/login') {
    if (userId && userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (userId) {
      // User is signed in but not admin - redirect to sign-in to show Clerk
      return addSecurityHeaders(NextResponse.next())
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Protected admin routes - require admin role
  // Note: Role checking happens in AdminLayout component for better UX
  // Middleware just ensures user is authenticated
  if (isAdminRoute(req) && pathname !== '/admin/login') {
    if (!userId) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Log admin access
    if (process.env.NODE_ENV === 'production') {
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      console.log(`Admin access: userId=${userId} accessed ${pathname} from ${clientIP} at ${new Date().toISOString()}`)
    }
  }

  // Protected teacher routes
  if (pathname.startsWith('/teacher/') && !userId) {
    return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(pathname), req.url))
  }

  // Protected counselor routes
  if (pathname.startsWith('/counselor') && pathname !== '/counselor-poc' && !userId) {
    const loginUrl = new URL('/sign-in', req.url)
    loginUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protected general routes
  if (isProtectedRoute(req) && !userId) {
    const loginUrl = new URL('/sign-in', req.url)
    loginUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // API route protection - admin APIs
  if (pathname.startsWith('/api/admin/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'ADMIN') {
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

  // API route protection - teacher APIs
  if (pathname.startsWith('/api/teacher/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'TEACHER' && userRole !== 'ADMIN') {
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

  // API route protection - counselor APIs
  if (pathname.startsWith('/api/counselor/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'COUNSELOR' && userRole !== 'ADMIN') {
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
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/timetable')

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

  // SEO: Add noindex for pages with query params to prevent duplicate content
  const searchQuery = req.nextUrl.search
  const pagesWithQueryParamDuplicates = ['/blog', '/courses', '/demo-booking', '/enrollments']
  if (searchQuery && pagesWithQueryParamDuplicates.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    response.headers.set('X-Robots-Tag', 'noindex, follow')
  }

  // Production headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  // Debug headers in development
  if (process.env.NODE_ENV === 'development' && userId) {
    response.headers.set('X-Clerk-User-ID', userId)
    if (userRole) {
      response.headers.set('X-User-Role', userRole)
    }
  }

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  // Cache control
  if (isProtectedPath) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  } else if (isStaticPage) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400')
  } else {
    response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
  }

  // Admin route logging
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('X-Admin-Route', 'true')
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
